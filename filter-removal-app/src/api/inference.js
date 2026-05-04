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
 * Full client-side filter removal pipeline. No API key needed.
 *
 * Steps:
 *   1. Decode JPEG → float32 tensor [H, W, 3]
 *   2. Unsharp mask  — recovers texture erased by beauty-filter Gaussian blur
 *   3. Channel stretch — removes per-channel color casts (warm/cool filters)
 *   4. Adaptive contrast — restores natural luminance range
 *   5. Encode → JPEG → local file URI
 */
export async function restoreImage(base64Input, _ignoredToken) {
  await ensureTF();

  return tf.tidy(() => {
    // --- Decode ---
    const raw = tf.util.encodeString(base64Input, 'base64');
    const imageTensor = decodeJpeg(raw).toFloat(); // [H, W, 3], range 0–255

    // --- 1. Unsharp mask (sigma≈2, amount=0.7) ---
    const unsharpened = unsharpMask(imageTensor, 0.7);

    // --- 2. Per-channel stretch (remove color cast) ---
    const stretched = channelStretch(unsharpened);

    // --- 3. Adaptive contrast (gamma correction toward 0.5 midpoint) ---
    const contrasted = adaptiveContrast(stretched);

    // Clamp and cast back to uint8
    const output = contrasted.clipByValue(0, 255).cast('int32');

    return encodeAndSave(output);
  });
}

// Unsharp mask: sharpened = original + amount * (original - blurred)
function unsharpMask(tensor, amount) {
  // 5×5 Gaussian kernel, sigma≈2
  const sigma = 2.0;
  const kernel = gaussianKernel5x5(sigma);
  const kernelTensor = tf.tensor4d(kernel, [5, 5, 1, 1]);

  // Process each channel independently
  const channels = tf.split(tensor, 3, 2); // [H, W, 1] x3
  const sharpened = channels.map((ch) => {
    const expanded = ch.expandDims(0); // [1, H, W, 1]
    const blurred = tf.conv2d(expanded, kernelTensor, 1, 'same').squeeze([0]);
    return ch.add(ch.sub(blurred).mul(amount));
  });

  return tf.concat(sharpened, 2); // [H, W, 3]
}

// Stretch each channel to [0, 255] based on its 2nd and 98th percentile.
function channelStretch(tensor) {
  const channels = tf.split(tensor, 3, 2);
  const stretched = channels.map((ch) => {
    const flat = ch.flatten();
    const sorted = flat.gather(tf.argsort(flat));
    const n = sorted.shape[0];
    const lo = sorted.gather([Math.floor(n * 0.02)]).dataSync()[0];
    const hi = sorted.gather([Math.floor(n * 0.98)]).dataSync()[0];
    if (hi <= lo) return ch;
    return ch.sub(lo).div(hi - lo).mul(255);
  });
  return tf.concat(stretched, 2);
}

// Mild gamma correction: push midtones toward 128 (undo over-brightening).
function adaptiveContrast(tensor) {
  const normalized = tensor.div(255);
  const mean = normalized.mean().dataSync()[0];
  // If image is too bright (mean > 0.6), darken slightly, and vice versa
  const targetMean = 0.5;
  const gamma = Math.log(targetMean) / Math.log(Math.max(0.01, mean));
  const clamped = gamma < 0.5 ? 0.5 : gamma > 2.0 ? 2.0 : gamma;
  return normalized.pow(clamped).mul(255);
}

// Precomputed 5×5 Gaussian kernel weights (normalized).
function gaussianKernel5x5(sigma) {
  const size = 5;
  const center = Math.floor(size / 2);
  let weights = [];
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
  const jpegBytes = await encodeJpeg(tensor, 92);
  const b64 = tf.util.decodeString(jpegBytes, 'base64');
  const uri = `${FileSystem.cacheDirectory}restored_${Date.now()}.jpg`;
  await FileSystem.writeAsStringAsync(uri, b64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return uri;
}
