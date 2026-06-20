import { assertConfig } from './config.js';
import { runPipeline } from './pipeline.js';

/**
 * CLI entry for testing without Telegram:
 *   node src/runOnce.js "taquerias in San Antonio"
 */
const query = process.argv.slice(2).join(' ').trim();
if (!query) {
  console.error('Usage: node src/runOnce.js "<search query>"');
  process.exit(1);
}

assertConfig(['anthropic', 'places', 'stripe']);

await runPipeline({
  query,
  onProgress: (text) => console.log(`• ${text}`),
  publishUrl: async (slug) => `https://preview.yourstudio.com/${slug}/`,
});
