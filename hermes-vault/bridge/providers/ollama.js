import fetch from 'node-fetch';

export async function query(prompt, config) {
  const baseUrl = config.baseUrl || 'http://localhost:11434';
  const model = config.model || 'nous-hermes3';

  const response = await fetch(`${baseUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.statusText}. Is Ollama running? Try: ollama serve`);
  }

  const data = await response.json();
  return data.response;
}

export const name = 'Hermes (Local)';
export const id = 'hermes';
export const color = '#8B5CF6';
