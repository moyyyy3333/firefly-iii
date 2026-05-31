import OpenAI from 'openai';

export async function query(prompt, config) {
  const client = new OpenAI({ apiKey: config.apiKey });

  const response = await client.chat.completions.create({
    model: config.model || 'gpt-4o',
    max_tokens: config.maxTokens || 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
}

export const name = 'ChatGPT';
export const id = 'gpt';
export const color = '#10A37F';
