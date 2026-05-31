#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

import * as claudeProvider from './providers/claude.js';
import * as openaiProvider from './providers/openai.js';
import * as geminiProvider from './providers/gemini.js';
import * as ollamaProvider from './providers/ollama.js';

import { writeConversation, writeComparison } from './vault/writer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ────────────────────────────────────────────────────────────────────

function loadConfig() {
  const configPath = path.join(__dirname, 'config.json');
  if (!fs.existsSync(configPath)) {
    console.error(chalk.red('✗ config.json not found.'));
    console.error(chalk.yellow('  Run: cp config.example.json config.json'));
    console.error(chalk.yellow('  Then fill in your API keys.'));
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

const PROVIDERS = {
  claude: claudeProvider,
  gpt: openaiProvider,
  gemini: geminiProvider,
  hermes: ollamaProvider,
};

function getProvider(aiId, config) {
  const provider = PROVIDERS[aiId];
  if (!provider) {
    console.error(chalk.red(`Unknown AI: "${aiId}". Choose from: claude, gpt, gemini, hermes`));
    process.exit(1);
  }
  const providerConfig = config.providers[aiId];
  if (!providerConfig?.enabled) {
    console.error(chalk.yellow(`⚠ ${aiId} is disabled in config.json`));
    process.exit(1);
  }
  return { provider, providerConfig };
}

function resolveVaultPath(config) {
  const raw = config.vaultPath || '../vault';
  return path.resolve(__dirname, raw);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function printHeader() {
  console.log(chalk.magenta('\n  🪽  Hermes Bridge — Multi-AI Vault\n'));
}

function aiLabel(id) {
  const colors = {
    claude: chalk.hex('#FF6B35'),
    gpt: chalk.hex('#10A37F'),
    gemini: chalk.hex('#4285F4'),
    hermes: chalk.hex('#8B5CF6'),
  };
  const names = {
    claude: 'Claude',
    gpt: 'ChatGPT',
    gemini: 'Gemini',
    hermes: 'Hermes (Local)',
  };
  const fn = colors[id] || chalk.white;
  return fn(`[${names[id] || id}]`);
}

async function askQuestion(prompt) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(prompt, ans => { rl.close(); resolve(ans); }));
}

// ── Commands ──────────────────────────────────────────────────────────────────

program
  .name('hermes')
  .description('Multi-AI bridge for your Obsidian vault')
  .version('1.0.0');

// hermes chat --ai claude "What is the best way to learn Rust?"
program
  .command('chat')
  .description('Chat with a single AI and save to vault')
  .option('-a, --ai <name>', 'AI to use: claude | gpt | gemini | hermes', 'claude')
  .option('-s, --save', 'Save response to vault (default: true)', true)
  .option('--no-save', 'Do not save to vault')
  .argument('[prompt]', 'Your question (omit for interactive mode)')
  .action(async (promptArg, opts) => {
    printHeader();
    const config = loadConfig();
    const { provider, providerConfig } = getProvider(opts.ai, config);

    let prompt = promptArg;
    if (!prompt) {
      prompt = await askQuestion(chalk.cyan(`You → ${aiLabel(opts.ai)}: `));
    }

    const spinner = ora(`Asking ${aiLabel(opts.ai)}...`).start();

    try {
      const response = await provider.query(prompt, providerConfig);
      spinner.stop();

      console.log('\n' + aiLabel(opts.ai) + '\n');
      console.log(chalk.white(response));
      console.log();

      if (opts.save) {
        const title = prompt.substring(0, 60);
        const vaultPath = resolveVaultPath(config);
        const filePath = writeConversation(vaultPath, opts.ai, title, prompt, response);
        console.log(chalk.green(`✓ Saved → ${path.relative(process.cwd(), filePath)}`));
      }
    } catch (err) {
      spinner.fail(`${aiLabel(opts.ai)} failed: ${err.message}`);
      process.exit(1);
    }
  });

// hermes compare "What's the best programming language to learn in 2026?"
program
  .command('compare')
  .description('Ask all enabled AIs the same question and compare responses')
  .option('-a, --ais <list>', 'Comma-separated AIs to compare', 'claude,gpt,gemini,hermes')
  .argument('<prompt>', 'Your question')
  .action(async (prompt, opts) => {
    printHeader();
    const config = loadConfig();
    const aiList = opts.ais.split(',').map(s => s.trim());

    console.log(chalk.cyan(`Comparing: ${aiList.join(', ')}`));
    console.log(chalk.white(`Question: ${prompt}\n`));

    const responses = {};
    const errors = {};

    await Promise.all(
      aiList.map(async aiId => {
        const providerConfig = config.providers[aiId];
        if (!providerConfig?.enabled) {
          errors[aiId] = 'disabled in config';
          return;
        }
        const provider = PROVIDERS[aiId];
        if (!provider) {
          errors[aiId] = 'unknown provider';
          return;
        }

        const spinner = ora(`${aiLabel(aiId)} thinking...`).start();
        try {
          const response = await provider.query(prompt, providerConfig);
          spinner.succeed(aiLabel(aiId));
          responses[aiId] = response;
        } catch (err) {
          spinner.fail(`${aiLabel(aiId)}: ${err.message}`);
          errors[aiId] = err.message;
        }
      })
    );

    console.log('\n' + chalk.magenta('─'.repeat(60)) + '\n');

    for (const [aiId, response] of Object.entries(responses)) {
      console.log(aiLabel(aiId));
      console.log(chalk.white(response));
      console.log('\n' + chalk.gray('─'.repeat(40)) + '\n');
    }

    if (Object.keys(errors).length > 0) {
      console.log(chalk.yellow('Errors:'));
      for (const [ai, err] of Object.entries(errors)) {
        console.log(chalk.yellow(`  ${ai}: ${err}`));
      }
    }

    if (Object.keys(responses).length > 0) {
      const vaultPath = resolveVaultPath(config);
      const title = prompt.substring(0, 60);
      const filePath = writeComparison(vaultPath, title, prompt, responses);
      console.log(chalk.green(`\n✓ Comparison saved → ${path.relative(process.cwd(), filePath)}`));
    }
  });

// hermes import --ai gpt --title "My conversation" conversation.txt
program
  .command('import')
  .description('Import a text conversation file into the vault')
  .option('-a, --ai <name>', 'Which AI this conversation is from', 'gpt')
  .option('-t, --title <title>', 'Note title')
  .argument('<file>', 'Path to text file containing the conversation')
  .action(async (file, opts) => {
    printHeader();
    const config = loadConfig();

    if (!fs.existsSync(file)) {
      console.error(chalk.red(`File not found: ${file}`));
      process.exit(1);
    }

    const content = fs.readFileSync(file, 'utf8');
    const title = opts.title || path.basename(file, path.extname(file));
    const vaultPath = resolveVaultPath(config);

    const filePath = writeConversation(vaultPath, opts.ai, title, '[imported]', content);
    console.log(chalk.green(`✓ Imported → ${path.relative(process.cwd(), filePath)}`));
  });

// hermes brief  — show today's vault activity
program
  .command('brief')
  .description("Print today's saved conversations and ideas")
  .action(async () => {
    printHeader();
    const config = loadConfig();
    const vaultPath = resolveVaultPath(config);

    const today = new Date().toISOString().split('T')[0];
    const aiFolder = path.join(vaultPath, '01 - AI Ideas');

    let found = 0;
    const dirs = ['Claude', 'GPT', 'Gemini', 'Hermes (Local)', 'Synthesized'];

    for (const dir of dirs) {
      const folder = path.join(aiFolder, dir);
      if (!fs.existsSync(folder)) continue;
      const files = fs.readdirSync(folder).filter(f => f.startsWith(today) && f.endsWith('.md'));
      for (const f of files) {
        console.log(chalk.green(`  ✓ [${dir}]`) + chalk.white(` ${f}`));
        found++;
      }
    }

    if (found === 0) {
      console.log(chalk.yellow('  No conversations saved today yet.'));
      console.log(chalk.gray('  Try: hermes chat --ai claude "Your question"'));
    } else {
      console.log(chalk.magenta(`\n  ${found} note(s) saved today. Open Obsidian to explore.\n`));
    }
  });

// hermes search "machine learning"
program
  .command('search')
  .description('Search vault notes by keyword')
  .argument('<query>', 'Search term')
  .action(async (query, opts) => {
    printHeader();
    const config = loadConfig();
    const vaultPath = resolveVaultPath(config);

    const results = [];

    function searchDir(dir) {
      if (!fs.existsSync(dir)) return;
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
          searchDir(fullPath);
        } else if (entry.name.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.toLowerCase().includes(query.toLowerCase())) {
            const match = content
              .split('\n')
              .find(l => l.toLowerCase().includes(query.toLowerCase()));
            results.push({ file: path.relative(vaultPath, fullPath), match: match?.trim() });
          }
        }
      }
    }

    searchDir(vaultPath);

    if (results.length === 0) {
      console.log(chalk.yellow(`  No results for "${query}"`));
    } else {
      console.log(chalk.cyan(`  ${results.length} result(s) for "${query}":\n`));
      for (const r of results) {
        console.log(chalk.green(`  ${r.file}`));
        if (r.match) console.log(chalk.gray(`    ${r.match.substring(0, 100)}`));
      }
    }
    console.log();
  });

program.parse();
