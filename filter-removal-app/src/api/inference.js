import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { decodeJpeg, encodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';

let tfReady = false;

async function ensureTF() {
  if (!tfReady) {
    await tf.ready();
    tfReady = true;
  }
}

/**
 * On-device filter removal pipeline. No API key or internet needed.
 *
 * Steps:
 *   1. Decode JPEG → float32 tensor [H, W, 3]
 *   2. Unsharp mask  — recovers texture erased by beauty-filter Gaussian blur
 *   3. Channel stretch — removes per-channel color casts (warm/cool filters)
 *   4. Adaptive contrast — restores natural luminance range
 *   5. Encode → JPEG → local file URI
 */
export async function restoreImage(base64Input) {
  await ensureTF();

  // Decode outside tidy so we can manage tensor lifetimes manually
  const raw = tf.util.encodeString(base64Input, 'base64');
  const imageTensor = decodeJpeg(raw).toFloat(); // [H, W, 3], range 0–255

  try {
    const unsharpened = unsharpMask(imageTensor, 0.7);
    imageTensor.dispose();

    // channelStretch calls dataSync, must run outside tidy
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

// Unsharp mask: sharpened = original + amount * (original - blurred)
function unsharpMask(tensor, amount) {
  const kernel = gaussianKernel5x5(2.0);
  const kernelTensor = tf.tensor4d(kernel, [5, 5, 1, 1]);

  const channels = tf.split(tensor, 3, 2);
  const sharpened = channels.map((ch) => {
    const expanded = ch.expandDims(0); // [1, H, W, 1]
    const blurred = tf.conv2d(expanded, kernelTensor, 1, 'same').squeeze([0]);
    return ch.add(ch.sub(blurred).mul(amount));
  });

  kernelTensor.dispose();
  channels.forEach((c) => c.dispose());

  return tf.concat(sharpened, 2);
}

// Stretch each channel to [0, 255] based on its 2nd/98th percentile.
async function channelStretch(tensor) {
  const channels = tf.split(tensor, 3, 2);
  const stretched = channels.map((ch) => {
    const flat = ch.flatten();
    const n = flat.shape[0];
    const vals = flat.dataSync(); // synchronous read for percentile math
    flat.dispose();

    const sorted = Float32Array.from(vals).sort();
    const lo = sorted[Math.floor(n * 0.02)];
    const hi = sorted[Math.floor(n * 0.98)];

    if (hi <= lo) return ch;
    const out = ch.sub(lo).div(hi - lo).mul(255);
    ch.dispose();
    return out;
  });

  return tf.concat(stretched, 2);
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

// Precomputed 5×5 Gaussian kernel weights (normalized).
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
  const jpegBytes = await encodeJpeg(tensor); // single arg — no quality param in tfjs-rn
  const b64 = tf.util.decodeString(jpegBytes, 'base64');
  const uri = `${FileSystem.cacheDirectory}restored_${Date.now()}.jpg`;
  await FileSystem.writeAsStringAsync(uri, b64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return uri;
}
