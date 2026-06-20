import TelegramBot from 'node-telegram-bot-api';
import { config, assertConfig } from './config.js';
import { runPipeline } from './pipeline.js';
import { registerPreview } from './previews.js';

/**
 * The Telegram trigger. Send the bot a message like:
 *   run pizzerias in Astoria, Queens
 * and it kicks off the whole pipeline, streaming progress back to the chat.
 */
assertConfig(['telegram', 'anthropic', 'places', 'stripe']);

const bot = new TelegramBot(config.telegram.token, { polling: true });
const allowed = new Set(config.telegram.allowedUserIds.map(String));

function isAuthorized(msg) {
  if (allowed.size === 0) return true; // no allowlist configured -> open (set one in prod!)
  return allowed.has(String(msg.from?.id));
}

bot.onText(/^\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    [
      'Restaurant site bot ready.',
      '',
      'Send: run <search query>',
      'e.g. "run family-owned Italian restaurants in Boston"',
      '',
      config.dryRun ? '⚠️ DRY_RUN is ON — sites are built but no emails are sent.' : 'Live mode: proposals will be emailed.',
    ].join('\n'),
  );
});

bot.onText(/^run\s+(.+)/i, async (msg, match) => {
  if (!isAuthorized(msg)) {
    return bot.sendMessage(msg.chat.id, 'Not authorized.');
  }
  const query = match[1].trim();
  const chatId = msg.chat.id;

  const onProgress = (text) => bot.sendMessage(chatId, text).then(() => {}).catch(() => {});

  try {
    await runPipeline({
      query,
      onProgress,
      // Expiring, watermarked preview link (run the preview server: `npm run serve`).
      publishUrl: async (slug, biz) =>
        registerPreview(slug, { business: biz.name, recipient: biz.email || '' }),
    });
  } catch (err) {
    onProgress(`Pipeline error: ${err.message}`);
  }
});

console.log('Bot is polling. Send it "/start" in Telegram.');
