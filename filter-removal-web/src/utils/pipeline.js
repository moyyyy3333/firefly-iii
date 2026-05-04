import * as tf from '@tensorflow/tfjs'

let blazefaceModel = null

async function ensureBlazeFace() {
  if (!blazefaceModel) {
    const blazeface = await import('@tensorflow-models/blazeface')
    blazefaceModel = await blazeface.load()
  }
  return blazefaceModel
}

export async function warmup() {
  await tf.ready()
  await ensureBlazeFace()
}

// Load image URL into a canvas resized to max 768px wide
function loadImageToCanvas(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const scale = Math.min(1, 768 / img.naturalWidth)
      const w = Math.round(img.naturalWidth * scale)
      const h = Math.round(img.naturalHeight * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      resolve(canvas)
    }
    img.onerror = reject
    img.src = url
  })
}

async function tensorToDataUrl(tensor) {
  const canvas = document.createElement('canvas')
  canvas.width = tensor.shape[1]
  canvas.height = tensor.shape[0]
  const clipped = tensor.clipByValue(0, 255)
  const safe = tf.where(tf.isNaN(clipped), tf.zerosLike(clipped), clipped)
  clipped.dispose()
  const uint8 = safe.cast('int32')
  safe.dispose()
  await tf.browser.toPixels(uint8, canvas)
  uint8.dispose()
  return canvas.toDataURL('image/jpeg', 0.92)
}

export async function restoreImage(objectUrl, strength = 1.0) {
  await tf.ready()
  const canvas = await loadImageToCanvas(objectUrl)
  const imageTensor = tf.browser.fromPixels(canvas).toFloat()

  try {
    const unsharpened = await faceAwareUnsharp(imageTensor, canvas, strength)
    imageTensor.dispose()

    const stretched = channelStretch(unsharpened)
    unsharpened.dispose()

    const contrasted = adaptiveContrast(stretched)
    stretched.dispose()

    const dataUrl = await tensorToDataUrl(contrasted)
    contrasted.dispose()

    return dataUrl
  } catch (err) {
    imageTensor.dispose()
    throw err
  }
}

async function faceAwareUnsharp(tensor, canvas, strength) {
  const [H, W] = [tensor.shape[0], tensor.shape[1]]
  let faceBbox = null

  try {
    const model = await ensureBlazeFace()
    const preds = await model.estimateFaces(canvas, false)
    if (preds.length > 0) {
      faceBbox = {
        x1: preds[0].topLeft[0], y1: preds[0].topLeft[1],
        x2: preds[0].bottomRight[0], y2: preds[0].bottomRight[1],
      }
    }
  } catch { /* no face, fall through */ }

  if (!faceBbox) return unsharpMask(tensor, 0.7 * strength)

  const faceSharp = unsharpMask(tensor, 1.3 * strength)
  const bgSharp = unsharpMask(tensor, 0.25 * strength)
  const mask = buildFaceMask(H, W, faceBbox)
  const maskBroad = mask.expandDims(2)

  const result = faceSharp.mul(maskBroad).add(bgSharp.mul(tf.scalar(1).sub(maskBroad)))
  faceSharp.dispose(); bgSharp.dispose(); mask.dispose(); maskBroad.dispose()
  return result
}

function buildFaceMask(H, W, { x1, y1, x2, y2 }) {
  const padX = (x2 - x1) * 0.12, padY = (y2 - y1) * 0.12
  const featherX = Math.max((x2 - x1) * 0.05, 1)
  const featherY = Math.max((y2 - y1) * 0.05, 1)
  const fx1 = Math.max(0, x1 - padX), fy1 = Math.max(0, y1 - padY)
  const fx2 = Math.min(W - 1, x2 + padX), fy2 = Math.min(H - 1, y2 + padY)
  const data = new Float32Array(H * W)

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const inX = Math.min(
        Math.min(1, Math.max(0, (x - fx1) / featherX)),
        Math.min(1, Math.max(0, (fx2 - x) / featherX))
      )
      const inY = Math.min(
        Math.min(1, Math.max(0, (y - fy1) / featherY)),
        Math.min(1, Math.max(0, (fy2 - y) / featherY))
      )
      data[y * W + x] = inX * inY
    }
  }
  return tf.tensor2d(data, [H, W])
}

function unsharpMask(tensor, amount) {
  const kernel = gaussianKernel5x5(2.0)
  const kernelTensor = tf.tensor4d(kernel, [5, 5, 1, 1])
  const channels = tf.split(tensor, 3, 2)
  const sharpened = channels.map(ch => {
    const expanded = ch.expandDims(0)
    const blurred = tf.conv2d(expanded, kernelTensor, 1, 'same').squeeze([0])
    const out = ch.add(ch.sub(blurred).mul(amount))
    expanded.dispose(); blurred.dispose()
    return out
  })
  kernelTensor.dispose(); channels.forEach(c => c.dispose())
  const result = tf.concat(sharpened, 2)
  sharpened.forEach(t => t.dispose())
  return result
}

function channelStretch(tensor) {
  const channels = tf.split(tensor, 3, 2)
  const stretched = channels.map(ch => {
    const flat = ch.flatten()
    const vals = flat.dataSync()
    flat.dispose()
    const sorted = Float32Array.from(vals).sort()
    const n = sorted.length
    const lo = sorted[Math.floor(n * 0.02)]
    const hi = sorted[Math.floor(n * 0.98)]
    if (hi <= lo) return ch
    const out = ch.sub(lo).div(hi - lo).mul(255)
    ch.dispose()
    return out
  })
  const result = tf.concat(stretched, 2)
  stretched.forEach(t => t.dispose())
  return result
}

function adaptiveContrast(tensor) {
  const clamped = tensor.clipByValue(0, 255)
  const normalized = clamped.div(255)
  clamped.dispose()
  const mean = normalized.mean().dataSync()[0]
  const gamma = Math.min(2.0, Math.max(0.5, Math.log(0.5) / Math.log(Math.max(0.01, mean))))
  const out = normalized.pow(gamma).mul(255)
  normalized.dispose()
  return out
}

function gaussianKernel5x5(sigma) {
  const size = 5, center = 2
  const weights = []
  let sum = 0
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const w = Math.exp(-((x - center) ** 2 + (y - center) ** 2) / (2 * sigma * sigma))
      weights.push(w); sum += w
    }
  }
  return weights.map(w => w / sum)
}

export function computeForensics(origCanvas, restoredDataUrl) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      const small = 200
      const scale = small / origCanvas.width
      const w = small, h = Math.round(origCanvas.height * scale)

      const c1 = document.createElement('canvas'); c1.width = w; c1.height = h
      const c2 = document.createElement('canvas'); c2.width = w; c2.height = h
      c1.getContext('2d').drawImage(origCanvas, 0, 0, w, h)
      c2.getContext('2d').drawImage(img, 0, 0, w, h)

      const orig = c1.getContext('2d').getImageData(0, 0, w, h).data
      const rest = c2.getContext('2d').getImageData(0, 0, w, h).data

      resolve({
        smoothing: Math.round(detectSmoothing(orig, w, h) * 100),
        colorCast: Math.round(detectColorCast(orig, w, h) * 100),
        fidelity: Math.round(computeSSIM(orig, rest, w, h) * 10) / 10,
        faceSlimming: detectFaceSlimming(orig, rest, w, h),
      })
    }
    img.src = restoredDataUrl
  })
}

function lum(px, i) { return 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2] }

function detectSmoothing(px, w, h) {
  let hf = 0, tot = 0
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const g = lum(px, (y * w + x) * 4)
      hf += Math.abs(g - lum(px, (y * w + x + 1) * 4)) + Math.abs(g - lum(px, ((y + 1) * w + x) * 4))
      tot += g
    }
  }
  return Math.min(1, Math.max(0, 1 - (hf / Math.max(tot, 1)) / 0.2))
}

function detectColorCast(px, w, h) {
  let r = 0, g = 0, b = 0, n = px.length / 4
  for (let i = 0; i < px.length; i += 4) { r += px[i]; g += px[i + 1]; b += px[i + 2] }
  const avg = (r + g + b) / 3 / n
  return Math.min(1, (Math.abs(r / n - avg) + Math.abs(g / n - avg) + Math.abs(b / n - avg)) / 255 * 5)
}

function computeSSIM(a, b, w, h) {
  const C1 = 6.5025, C2 = 58.5225, ws = 8
  let sum = 0, n = 0
  for (let y = 0; y < h - ws; y += ws) {
    for (let x = 0; x < w - ws; x += ws) {
      let mx = 0, my = 0
      const samples = []
      for (let wy = 0; wy < ws; wy++) for (let wx = 0; wx < ws; wx++) {
        const i = ((y + wy) * w + (x + wx)) * 4
        const la = lum(a, i), lb = lum(b, i)
        mx += la; my += lb; samples.push([la, lb])
      }
      const nn = samples.length; mx /= nn; my /= nn
      let sx = 0, sy = 0, sxy = 0
      for (const [la, lb] of samples) { sx += (la - mx) ** 2; sy += (lb - my) ** 2; sxy += (la - mx) * (lb - my) }
      sx /= nn - 1; sy /= nn - 1; sxy /= nn - 1
      sum += ((2 * mx * my + C1) * (2 * sxy + C2)) / ((mx ** 2 + my ** 2 + C1) * (sx + sy + C2))
      n++
    }
  }
  return n > 0 ? Math.min(100, (sum / n) * 100) : 100
}

function detectFaceSlimming(a, b, w, h) {
  const mid = Math.floor(h / 2)
  const aw = faceWidth(a, w, mid), bw = faceWidth(b, w, mid)
  if (!aw || !bw) return 'Unknown'
  const diff = ((bw - aw) / bw) * 100
  if (Math.abs(diff) < 2) return 'None detected'
  return diff < 0 ? `~${Math.abs(Math.round(diff))}% narrower in original` : `~${Math.round(diff)}% wider restored`
}

function faceWidth(px, w, y) {
  let l = -1, r = -1
  for (let x = 0; x < w; x++) { if (lum(px, (y * w + x) * 4) > 30) { if (l === -1) l = x; r = x } }
  return l === -1 ? 0 : r - l
}
