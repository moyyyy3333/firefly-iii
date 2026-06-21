import fetch from 'node-fetch';

const BASE_URL = process.env.HERMES_BASE_URL || 'http://localhost:11434';
const MODEL = process.env.HERMES_MODEL || 'hermes3';

export async function callHermes(systemPrompt, userMessage) {
  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Hermes error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.message.content;
}

export async function isHermesAvailable() {
  try {
    const res = await fetch(`${BASE_URL}/api/tags`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}
