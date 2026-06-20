import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { config } from './config.js';
import { DESIGNER_SYSTEM_PROMPT, buildSiteUserPrompt } from './designPrompt.js';

const OUT_DIR = path.resolve('out');

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function stripFences(text) {
  // The prompt asks for raw HTML, but be defensive about stray markdown fences.
  const fenced = text.match(/```(?:html)?\s*([\s\S]*?)```/i);
  const html = fenced ? fenced[1] : text;
  const start = html.indexOf('<!DOCTYPE');
  return (start >= 0 ? html.slice(start) : html).trim();
}

/**
 * Generate one award-quality website for a business and write it to out/<slug>/index.html.
 * Returns { slug, dir, file, html }.
 */
export async function generateSite(biz) {
  const client = new Anthropic({ apiKey: config.anthropic.apiKey });

  const msg = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 16000,
    system: DESIGNER_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildSiteUserPrompt(biz) }],
  });

  const raw = msg.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
  const html = stripFences(raw);
  if (!html.toLowerCase().includes('<html')) {
    throw new Error(`Generation for "${biz.name}" did not return a valid HTML document.`);
  }

  const slug = slugify(biz.name) || `site-${Date.now()}`;
  const dir = path.join(OUT_DIR, slug);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'index.html');
  fs.writeFileSync(file, html, 'utf8');

  return { slug, dir, file, html };
}
