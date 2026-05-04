import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { decodeJpeg, encodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';

let tfReady = false;
let blazefaceModel = null;

async function ensureTF() {
  if (!tfReady) {
    await tf.ready();
    tfReady = true;
  }
}

async function ensureBlazeFace() {
  if (!blazefaceModel) {
    const blazeface = require('@tensorflow-models/blazeface');
    blazefaceModel = await blazeface.load();
  }
  return blazefaceModel;
}

// Call this on app mount to download BlazeFace in the background
// so the first real image doesn't stall waiting for the model.
export async function warmupModels() {
  await ensureTF();
  await ensureBlazeFace();
}

/**
 * On-device filter removal pipeline. No API key or internet needed.
 * strength: 0.5 = mild, 1.0 = normal, 1.5 = aggressive
 */
export async function restoreImage(base64Input, strength = 1.0) {
  await ensureTF();

  const raw = tf.util.encodeString(base64Input, 'base64');
  const imageTensor = decodeJpeg(raw).toFloat(); // [H, W, 3], range 0–255

  try {
    // Face-aware unsharp: strong inside face region, mild outside
    const unsharpened = await faceAwareUnsharp(imageTensor, strength);
    imageTensor.dispose();

    const stretched = await channelStretch(unsharpened);
    unsharpened.dispose();

    const contrasted = adaptiveContrast(stretched);
    stretched.dispose();

    const output = contrasted.clipByValue(0, 255).cast('int32');
    contrasted.dispose();

    const uri = await encodeAndSave(output);
    output.dispose();

    return uri;
  } catch (err) {
    imageTensor.dispose();
    throw err;
  }
}

// Runs BlazeFace; if a face is found, blends strong sharpening inside
// the face region with mild sharpening outside.
async function faceAwareUnsharp(tensor, strength) {
  const [H, W] = [tensor.shape[0], tensor.shape[1]];

  let faceBbox = null;
  try {
    const model = await ensureBlazeFace();
    // BlazeFace expects int32 [H,W,3]
    const uint8 = tensor.cast('int32');
    const preds = await model.estimateFaces(uint8, false);
    uint8.dispose();

    if (preds.length > 0) {
      faceBbox = {
        x1: preds[0].topLeft[0],
        y1: preds[0].topLeft[1],
        x2: preds[0].bottomRight[0],
        y2: preds[0].bottomRight[1],
      };
    }
  } catch {
    // If BlazeFace fails (e.g. no face or model error), fall back gracefully
  }

  if (!faceBbox) {
    return unsharpMask(tensor, 0.7 * strength);
  }

  // Two passes: aggressive for face, gentle for background
  const faceSharp = unsharpMask(tensor, 1.3 * strength);
  const bgSharp = unsharpMask(tensor, 0.25 * strength);

  // Soft mask: 1 inside face bbox (with 10% padding), 0 outside
  const mask = buildFaceMask(H, W, faceBbox);
  const maskBroad = mask.expandDims(2); // [H, W, 1] → broadcast over channels

  const result = faceSharp.mul(maskBroad).add(bgSharp.mul(tf.scalar(1).sub(maskBroad)));

  faceSharp.dispose();
  bgSharp.dispose();
  mask.dispose();
  maskBroad.dispose();

  return result;
}

// Creates a [H, W] float32 mask: 1 inside padded face bbox, 0 outside.
// Edges are feathered over ~5% of the face width for a natural blend.
function buildFaceMask(H, W, { x1, y1, x2, y2 }) {
  const padX = (x2 - x1) * 0.12;
  const padY = (y2 - y1) * 0.12;
  const featherX = (x2 - x1) * 0.05;
  const featherY = (y2 - y1) * 0.05;

  const fx1 = Math.max(0, x1 - padX);
  const fy1 = Math.max(0, y1 - padY);
  const fx2 = Math.min(W - 1, x2 + padX);
  const fy2 = Math.min(H - 1, y2 + padY);

  const data = new Float32Array(H * W);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Trapezoidal feather: ramp up from left/top edge, ramp down toward right/bottom.
      // MIN of both ramps gives 0 outside, a slope at edges, 1 in the interior.
      const inX = Math.min(
        Math.min(1, Math.max(0, (x - fx1) / Math.max(featherX, 1))),
        Math.min(1, Math.max(0, (fx2 - x) / Math.max(featherX, 1)))
      );
      const inY = Math.min(
        Math.min(1, Math.max(0, (y - fy1) / Math.max(featherY, 1))),
        Math.min(1, Math.max(0, (fy2 - y) / Math.max(featherY, 1)))
      );
      data[y * W + x] = inX * inY;
    }
  }

  return tf.tensor2d(data, [H, W]);
}

// Unsharp mask: sharpened = original + amount * (original - blurred)
function unsharpMask(tensor, amount) {
  const kernel = gaussianKernel5x5(2.0);
  const kernelTensor = tf.tensor4d(kernel, [5, 5, 1, 1]);

  const channels = tf.split(tensor, 3, 2);
  const sharpened = channels.map((ch) => {
    const expanded = ch.expandDims(0);
    const blurred = tf.conv2d(expanded, kernelTensor, 1, 'same').squeeze([0]);
    const out = ch.add(ch.sub(blurred).mul(amount));
    expanded.dispose();
    blurred.dispose();
    return out;
  });

  kernelTensor.dispose();
  channels.forEach((c) => c.dispose());

  const result = tf.concat(sharpened, 2);
  sharpened.forEach((t) => t.dispose());
  return result;
}

// Stretch each channel to [0, 255] at p2/p98 to remove color casts.
async function channelStretch(tensor) {
  const channels = tf.split(tensor, 3, 2);
  const stretched = channels.map((ch) => {
    const flat = ch.flatten();
    const n = flat.shape[0];
    const vals = flat.dataSync();
    flat.dispose();

    const sorted = Float32Array.from(vals).sort();
    const lo = sorted[Math.floor(n * 0.02)];
    const hi = sorted[Math.floor(n * 0.98)];

    if (hi <= lo) return ch;
    const out = ch.sub(lo).div(hi - lo).mul(255);
    ch.dispose();
    return out;
  });

  const result = tf.concat(stretched, 2);
  // concat copies data into a new tensor; dispose the channel slices
  stretched.forEach((t) => t.dispose());
  return result;
}

// Gamma correction toward 0.5 midpoint to undo over-brightening.
function adaptiveContrast(tensor) {
  const normalized = tensor.div(255);
  const mean = normalized.mean().dataSync()[0];
  const gamma = Math.log(0.5) / Math.log(Math.max(0.01, mean));
  const clamped = Math.min(2.0, Math.max(0.5, gamma));
  const out = normalized.pow(clamped).mul(255);
  normalized.dispose();
  return out;
}

function gaussianKernel5x5(sigma) {
  const size = 5;
  const center = Math.floor(size / 2);
  const weights = [];
  let sum = 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - center, dy = y - center;
      const w = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
      weights.push(w);
      sum += w;
    }
  }

  return weights.map((w) => w / sum);
}

async function encodeAndSave(tensor) {
  const jpegBytes = await encodeJpeg(tensor);
  const b64 = tf.util.decodeString(jpegBytes, 'base64');
  const uri = `${FileSystem.cacheDirectory}restored_${Date.now()}.jpg`;
  await FileSystem.writeAsStringAsync(uri, b64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return uri;
}
