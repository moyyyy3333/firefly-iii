// Calls Replicate-hosted GFPGAN for face restoration.
// Set REPLICATE_API_TOKEN in your environment or app config.
const REPLICATE_API = 'https://api.replicate.com/v1/predictions';
const GFPGAN_VERSION = 'a3bes3b2-9bb4-4c0a-a2e2-b07bcbe2b9e7'; // tencentarc/gfpgan v1.4

export async function restoreImage(base64Image, apiToken) {
  if (!apiToken) throw new Error('REPLICATE_API_TOKEN is required');

  const dataUri = `data:image/jpeg;base64,${base64Image}`;

  const createRes = await fetch(REPLICATE_API, {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: GFPGAN_VERSION,
      input: {
        img: dataUri,
        version: 'v1.4',
        scale: 2,
      },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Replicate create failed: ${err}`);
  }

  const prediction = await createRes.json();
  return pollUntilDone(prediction.id, apiToken);
}

async function pollUntilDone(id, apiToken, attempts = 0) {
  if (attempts > 60) throw new Error('Inference timed out after 60 attempts');

  await new Promise((r) => setTimeout(r, 2000));

  const res = await fetch(`${REPLICATE_API}/${id}`, {
    headers: { Authorization: `Token ${apiToken}` },
  });

  const prediction = await res.json();

  if (prediction.status === 'succeeded') {
    return prediction.output; // URL to restored image
  }
  if (prediction.status === 'failed') {
    throw new Error(`Inference failed: ${prediction.error}`);
  }

  return pollUntilDone(id, apiToken, attempts + 1);
}
