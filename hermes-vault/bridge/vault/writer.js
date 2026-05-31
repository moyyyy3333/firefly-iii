import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60);
}

function buildFrontmatter(fields) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map(v => `"${v}"`).join(', ')}]`);
    } else if (typeof value === 'string') {
      lines.push(`${key}: "${value.replace(/"/g, '\\"')}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

export function writeConversation(vaultPath, aiId, title, prompt, response, config = {}) {
  const date = format(new Date(), 'yyyy-MM-dd');
  const time = format(new Date(), 'HH:mm');
  const fileName = `${date}-${slugify(title)}.md`;

  const aiFolderMap = {
    claude: 'Claude',
    gpt: 'GPT',
    gemini: 'Gemini',
    hermes: 'Hermes (Local)',
  };

  const folder = path.join(
    vaultPath,
    '01 - AI Ideas',
    aiFolderMap[aiId] || aiId
  );

  fs.mkdirSync(folder, { recursive: true });

  const frontmatter = buildFrontmatter({
    type: 'conversation',
    'ai-source': aiId,
    date,
    summary: title,
    rating: '',
    tags: ['conversation', aiId],
  });

  const content = [
    frontmatter,
    '',
    `# ${title}`,
    '',
    `**Date:** ${date} ${time}`,
    `**AI:** ${aiId}`,
    '',
    '---',
    '',
    '## My Prompt',
    '',
    prompt,
    '',
    '---',
    '',
    `## ${aiId.charAt(0).toUpperCase() + aiId.slice(1)}'s Response`,
    '',
    response,
    '',
    '---',
    '',
    '## Key Takeaways',
    '',
    '- ',
    '',
    '## Ideas Extracted',
    '',
    '- [ ] → [[01 - AI Ideas/Synthesized/Master Ideas]]',
    '',
    '## Related Notes',
    '',
    '- ',
  ].join('\n');

  const filePath = path.join(folder, fileName);
  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

export function writeComparison(vaultPath, title, prompt, responses) {
  const date = format(new Date(), 'yyyy-MM-dd');
  const time = format(new Date(), 'HH:mm');
  const fileName = `${date}-compare-${slugify(title)}.md`;

  const folder = path.join(vaultPath, '01 - AI Ideas', 'Synthesized');
  fs.mkdirSync(folder, { recursive: true });

  const aiIds = Object.keys(responses);

  const frontmatter = buildFrontmatter({
    type: 'comparison',
    'ai-source': 'all',
    date,
    summary: title,
    rating: '',
    tags: ['comparison', 'synthesis', ...aiIds],
  });

  let responseBlocks = '';
  for (const [aiId, text] of Object.entries(responses)) {
    responseBlocks += `\n### ${aiId.charAt(0).toUpperCase() + aiId.slice(1)}\n\n${text}\n\n---\n`;
  }

  const content = [
    frontmatter,
    '',
    `# Compare: ${title}`,
    '',
    `**Date:** ${date} ${time}`,
    `**AIs compared:** ${aiIds.join(', ')}`,
    '',
    '---',
    '',
    '## The Question',
    '',
    prompt,
    '',
    '---',
    '',
    '## Responses',
    responseBlocks,
    '',
    '## My Synthesis',
    '',
    '*What do they agree on?*',
    '',
    '*Where do they differ — and why is that interesting?*',
    '',
    '*Best insight overall:*',
    '',
    '## Actions / Next Steps',
    '',
    '- [ ] ',
  ].join('\n');

  const filePath = path.join(folder, fileName);
  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

export function writeDailyBrief(vaultPath, summaries) {
  const date = format(new Date(), 'yyyy-MM-dd');
  const fileName = `${date}.md`;
  const folder = path.join(vaultPath, '03 - Life', 'Daily Notes');

  fs.mkdirSync(folder, { recursive: true });

  const existing = path.join(folder, fileName);
  let existingContent = '';
  if (fs.existsSync(existing)) {
    existingContent = fs.readFileSync(existing, 'utf8');
  }

  const briefSection = [
    '',
    '## 🤖 AI Sessions Today',
    '',
    ...summaries.map(s => `- **${s.ai}** — ${s.summary}`),
    '',
  ].join('\n');

  const finalContent = existingContent
    ? existingContent + briefSection
    : briefSection;

  fs.writeFileSync(existing, finalContent, 'utf8');
  return existing;
}
