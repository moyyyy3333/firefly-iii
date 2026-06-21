import fs from 'fs/promises';
import path from 'path';

const VAULT = process.env.OBSIDIAN_VAULT_PATH || './obsidian-vault';

function vaultPath(...parts) {
  return path.join(VAULT, ...parts);
}

export async function writeNote(folder, filename, content, frontmatter = {}) {
  const dir = vaultPath(folder);
  await fs.mkdir(dir, { recursive: true });

  const fm = Object.keys(frontmatter).length
    ? `---\n${Object.entries(frontmatter).map(([k, v]) => `${k}: ${v}`).join('\n')}\n---\n\n`
    : '';

  const filepath = path.join(dir, filename.endsWith('.md') ? filename : `${filename}.md`);
  await fs.writeFile(filepath, fm + content, 'utf8');
  return filepath;
}

export async function appendToNote(folder, filename, content) {
  const filepath = vaultPath(folder, filename.endsWith('.md') ? filename : `${filename}.md`);
  await fs.mkdir(vaultPath(folder), { recursive: true });
  await fs.appendFile(filepath, '\n' + content, 'utf8');
  return filepath;
}

export async function readNote(folder, filename) {
  const filepath = vaultPath(folder, filename.endsWith('.md') ? filename : `${filename}.md`);
  return fs.readFile(filepath, 'utf8');
}

export async function listNotes(folder) {
  const dir = vaultPath(folder);
  try {
    const files = await fs.readdir(dir);
    return files.filter(f => f.endsWith('.md'));
  } catch {
    return [];
  }
}
