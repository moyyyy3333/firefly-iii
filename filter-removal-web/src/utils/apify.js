const BASE = 'https://api.apify.com/v2'

function detectPlatform(url) {
  if (/instagram\.com/.test(url)) return 'instagram'
  if (/tiktok\.com/.test(url)) return 'tiktok'
  return null
}

async function runActor(actorId, input, token) {
  const res = await fetch(
    `${BASE}/acts/${encodeURIComponent(actorId)}/runs?token=${encodeURIComponent(token)}&waitForFinish=60`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }
  )
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText)
    throw new Error(`Apify error ${res.status}: ${msg}`)
  }
  const { data } = await res.json()
  if (data.status !== 'SUCCEEDED') throw new Error(`Actor finished with status: ${data.status}`)
  return data.defaultDatasetId
}

async function getDatasetItems(datasetId, token) {
  const res = await fetch(
    `${BASE}/datasets/${datasetId}/items?token=${encodeURIComponent(token)}`
  )
  if (!res.ok) throw new Error('Failed to read Apify dataset')
  return res.json()
}

// Given a public Instagram or TikTok post URL, returns the CDN image URL.
export async function fetchPostImageUrl(postUrl, token) {
  const p = detectPlatform(postUrl)
  if (!p) throw new Error('Paste an Instagram or TikTok post URL')

  let actorId, input, pickUrl

  if (p === 'instagram') {
    actorId = 'apify/instagram-scraper'
    input = { directUrls: [postUrl], resultsType: 'posts', resultsLimit: 1 }
    pickUrl = item => item.displayUrl ?? item.imageUrl
  } else {
    actorId = 'clockworks/tiktok-scraper'
    input = { postURLs: [postUrl], resultsLimit: 1, download: false }
    pickUrl = item => item.videoMeta?.coverUrl ?? item.covers?.[0]
  }

  const datasetId = await runActor(actorId, input, token)
  const items = await getDatasetItems(datasetId, token)
  if (!items.length) throw new Error('No post found at that URL')
  const imageUrl = pickUrl(items[0])
  if (!imageUrl) throw new Error('Could not extract image from post')
  return imageUrl
}

// Attempts to fetch the CDN image URL as a local object URL.
// Instagram/TikTok CDNs often block CORS, so on failure this returns null
// and callers should surface the raw URL to the user instead.
export async function cdnUrlToObjectUrl(imageUrl) {
  try {
    const res = await fetch(imageUrl, { mode: 'cors' })
    if (!res.ok) return null
    const blob = await res.blob()
    return URL.createObjectURL(blob)
  } catch {
    return null
  }
}
