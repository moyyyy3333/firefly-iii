// Real forensic analysis on raw pixel data from a canvas readback.
// All inputs are Uint8ClampedArray (RGBA, row-major).

export function computeForensics(originalPixels, restoredPixels, width, height) {
  const smoothingScore = detectSmoothing(originalPixels, width, height);
  const colorCastScore = detectColorCast(originalPixels, width, height);
  const fidelityScore = computeFidelity(originalPixels, restoredPixels, width, height);
  const faceSlimming = detectFaceSlimming(originalPixels, restoredPixels, width, height);

  return {
    smoothing: Math.round(smoothingScore * 100),
    colorCast: Math.round(colorCastScore * 100),
    fidelity: Math.round(fidelityScore * 10) / 10,
    faceSlimming,
  };
}

// High-frequency energy ratio: beauty filters kill high-freq detail.
function detectSmoothing(pixels, width, height) {
  let highFreqEnergy = 0;
  let totalEnergy = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const idxR = (y * width + (x + 1)) * 4;
      const idxD = ((y + 1) * width + x) * 4;

      const gray = luminance(pixels, idx);
      const grayR = luminance(pixels, idxR);
      const grayD = luminance(pixels, idxD);

      const dx = Math.abs(gray - grayR);
      const dy = Math.abs(gray - grayD);
      const grad = dx + dy;

      highFreqEnergy += grad;
      totalEnergy += gray;
    }
  }

  // Normalize: a strongly smoothed image has low gradient/energy ratio.
  // We invert so higher = more smoothing was detected/removed.
  const ratio = totalEnergy > 0 ? highFreqEnergy / totalEnergy : 0;
  // Typical unfiltered faces: ratio ~0.15–0.25. Filtered: ~0.04–0.10.
  return Math.min(1, Math.max(0, 1 - ratio / 0.2));
}

// Detect unnatural color casts (e.g. warm/cool beauty filters).
function detectColorCast(pixels, width, height) {
  let rSum = 0, gSum = 0, bSum = 0, count = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    rSum += pixels[i];
    gSum += pixels[i + 1];
    bSum += pixels[i + 2];
    count++;
  }

  const rMean = rSum / count;
  const gMean = gSum / count;
  const bMean = bSum / count;
  const overall = (rMean + gMean + bMean) / 3;

  const rDev = Math.abs(rMean - overall) / 255;
  const gDev = Math.abs(gMean - overall) / 255;
  const bDev = Math.abs(bMean - overall) / 255;

  return Math.min(1, (rDev + gDev + bDev) * 5);
}

// Structural similarity approximation (SSIM-lite) between original and restored.
function computeFidelity(orig, rest, width, height) {
  const C1 = 6.5025, C2 = 58.5225;
  let ssimSum = 0;
  const windowSize = 8;
  let windows = 0;

  for (let y = 0; y < height - windowSize; y += windowSize) {
    for (let x = 0; x < width - windowSize; x += windowSize) {
      let muX = 0, muY = 0;
      const samples = [];

      for (let wy = 0; wy < windowSize; wy++) {
        for (let wx = 0; wx < windowSize; wx++) {
          const idx = ((y + wy) * width + (x + wx)) * 4;
          const lo = luminance(orig, idx);
          const lr = luminance(rest, idx);
          muX += lo;
          muY += lr;
          samples.push([lo, lr]);
        }
      }

      const n = samples.length;
      muX /= n;
      muY /= n;

      let sigmaX = 0, sigmaY = 0, sigmaXY = 0;
      for (const [lo, lr] of samples) {
        sigmaX += (lo - muX) ** 2;
        sigmaY += (lr - muY) ** 2;
        sigmaXY += (lo - muX) * (lr - muY);
      }
      sigmaX /= n - 1;
      sigmaY /= n - 1;
      sigmaXY /= n - 1;

      const num = (2 * muX * muY + C1) * (2 * sigmaXY + C2);
      const den = (muX ** 2 + muY ** 2 + C1) * (sigmaX + sigmaY + C2);
      ssimSum += num / den;
      windows++;
    }
  }

  return windows > 0 ? Math.min(100, (ssimSum / windows) * 100) : 100;
}

// Naïve face-width comparison via edge detection on horizontal midline.
function detectFaceSlimming(orig, rest, width, height) {
  const midY = Math.floor(height / 2);

  const origWidth = estimateFaceWidth(orig, width, midY);
  const restWidth = estimateFaceWidth(rest, width, midY);

  if (origWidth === 0 || restWidth === 0) return 'Unknown';

  const diff = ((restWidth - origWidth) / restWidth) * 100;
  if (Math.abs(diff) < 2) return 'None detected';
  if (diff < 0) return `~${Math.abs(Math.round(diff))}% narrower in original`;
  return `~${Math.round(diff)}% wider restored`;
}

function estimateFaceWidth(pixels, width, y) {
  const threshold = 30;
  let left = -1, right = -1;

  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    if (luminance(pixels, idx) > threshold) {
      if (left === -1) left = x;
      right = x;
    }
  }

  return left === -1 ? 0 : right - left;
}

function luminance(pixels, idx) {
  return 0.299 * pixels[idx] + 0.587 * pixels[idx + 1] + 0.114 * pixels[idx + 2];
}
