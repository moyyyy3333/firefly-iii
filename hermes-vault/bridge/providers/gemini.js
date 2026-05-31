import { GoogleGenerativeAI } from '@google/generative-ai';

export async function query(prompt, config) {
  const genAI = new GoogleGenerativeAI(config.apiKey);
  const model = genAI.getGenerativeModel({ model: config.model || 'gemini-1.5-pro' });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export const name = 'Gemini';
export const id = 'gemini';
export const color = '#4285F4';
