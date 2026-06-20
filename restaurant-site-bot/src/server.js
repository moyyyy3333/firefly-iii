import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { config } from './config.js';
import { openPreview, watermarkHtml } from './previews.js';

/**
 * Serves the expiring, watermarked previews.
 *
 * - The 36h clock starts on first open (configurable via PREVIEW_TTL_HOURS).
 * - After it expires the link returns 410 Gone.
 * - Every served page is watermarked. (See previews.js: true screenshot/record
 *   blocking is not possible on the web.)
 */
const app = express();
const OUT_DIR = path.resolve('out');

app.get('/p/:token', (req, res) => {
  const { status, record } = openPreview(req.params.token);

  if (status === 'notfound') {
    return res.status(404).send('Preview not found.');
  }
  if (status === 'expired') {
    return res
      .status(410)
      .send(
        '<h1>This preview has expired</h1><p>The 36-hour window has closed. ' +
          'Reply to our email and we’ll happily send you a fresh link.</p>',
      );
  }

  const file = path.join(OUT_DIR, record.slug, 'index.html');
  if (!fs.existsSync(file)) return res.status(404).send('Preview not found.');

  const html = watermarkHtml(fs.readFileSync(file, 'utf8'), record);
  res.set('Cache-Control', 'no-store');
  res.type('html').send(html);
});

app.get('/', (_req, res) => res.send('Preview server up.'));

app.listen(config.previews.port, () => {
  console.log(`Preview server on :${config.previews.port} (base ${config.previews.baseUrl})`);
});
