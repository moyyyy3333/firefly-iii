import Anthropic from '@anthropic-ai/sdk';

export async function query(prompt, config) {
  const client = new Anthropic({ apiKey: config.apiKey });

  const response = await client.messages.create({
    model: config.model || 'claude-sonnet-4-6',
    max_tokens: config.maxTokens || 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].text;
}

export const name = 'Claude';
export const id = 'claude';
export const color = '#FF6B35';
