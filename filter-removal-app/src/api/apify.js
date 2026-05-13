import * as FileSystem from 'expo-file-system';

const BASE = 'https://api.apify.com/v2';

function detectPlatform(url) {
  if (/instagram\.com/.test(url)) return 'instagram';
  if (/tiktok\.com/.test(url)) return 'tiktok';
  return null;
}

async function runActor(actorId, input, token) {
  const res = await fetch(
    `${BASE}/acts/${encodeURIComponent(actorId)}/runs?token=${encodeURIComponent(token)}&waitForFinish=60`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }
  );
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`Apify error ${res.status}: ${msg}`);
  }
  const { data } = await res.json();
  if (data.status !== 'SUCCEEDED') throw new Error(`Actor finished with status: ${data.status}`);
  return data.defaultDatasetId;
}

async function getDatasetItems(datasetId, token) {
  const res = await fetch(
    `${BASE}/datasets/${datasetId}/items?token=${encodeURIComponent(token)}`
  );
  if (!res.ok) throw new Error('Failed to read Apify dataset');
  return res.json();
}

// Given a public Instagram or TikTok post URL and an Apify token, downloads
// the post's image to the app cache directory and returns its local URI.
export async function fetchPostImageUri(postUrl, token) {
  const p = detectPlatform(postUrl);
  if (!p) throw new Error('Paste an Instagram or TikTok post URL');

  let actorId, input, pickUrl;

  if (p === 'instagram') {
    actorId = 'apify/instagram-scraper';
    input = { directUrls: [postUrl], resultsType: 'posts', resultsLimit: 1 };
    pickUrl = item => item.displayUrl ?? item.imageUrl;
  } else {
    actorId = 'clockworks/tiktok-scraper';
    input = { postURLs: [postUrl], resultsLimit: 1, download: false };
    pickUrl = item => item.videoMeta?.coverUrl ?? item.covers?.[0];
  }

  const datasetId = await runActor(actorId, input, token);
  const items = await getDatasetItems(datasetId, token);
  if (!items.length) throw new Error('No post found at that URL');

  const imageUrl = pickUrl(items[0]);
  if (!imageUrl) throw new Error('Could not extract image from post');

  const dest = `${FileSystem.cacheDirectory}apify_${Date.now()}.jpg`;
  const { uri, status } = await FileSystem.downloadAsync(imageUrl, dest);
  if (status !== 200) throw new Error('Failed to download image from CDN');
  return uri;
}
