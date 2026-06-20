import { findLeads } from './discovery.js';
import { generateSite } from './generator.js';
import { createCheckoutLink } from './payments.js';
import { sendProposal } from './outreach.js';
import { config } from './config.js';

/**
 * One trigger -> the whole pipeline:
 *   1. Find restaurants with no/weak website.
 *   2. Generate an award-quality spec site for each.
 *   3. Create a Stripe checkout offer.
 *   4. Send a compliant proposal email (or dry-run draft it).
 *
 * `onProgress(msg)` streams human-readable status back to the caller (e.g. Telegram).
 * `publishUrl(slug)` maps a generated site's slug to a hosted preview URL.
 */
export async function runPipeline({ query, onProgress = () => {}, publishUrl } = {}) {
  const results = [];
  const limit = config.maxOutreachPerRun;

  await onProgress(`Searching for restaurants with weak/no web presence: "${query}"...`);
  const leads = await findLeads(query, { limit });
  await onProgress(`Found ${leads.length} candidate${leads.length === 1 ? '' : 's'}.`);

  for (const [i, biz] of leads.entries()) {
    const tag = `(${i + 1}/${leads.length}) ${biz.name}`;
    try {
      await onProgress(`${tag}: designing site...`);
      const site = await generateSite(biz);

      const previewUrl = publishUrl ? await publishUrl(site.slug) : `file://${site.file}`;

      await onProgress(`${tag}: creating checkout offer...`);
      const checkoutUrl = await createCheckoutLink(biz, previewUrl);

      // recipientEmail must be a publicly published BUSINESS email you are
      // permitted to contact. Discovery does not harvest it; supply biz.email
      // from your own vetted source if/when available.
      const outreach = await sendProposal(biz, {
        previewUrl,
        checkoutUrl,
        recipientEmail: biz.email || '',
      });

      const status = outreach.sent
        ? 'proposal sent'
        : `not sent (${outreach.reason})`;
      await onProgress(`${tag}: ${status}.`);

      results.push({ name: biz.name, previewUrl, checkoutUrl, outreach });
    } catch (err) {
      await onProgress(`${tag}: failed — ${err.message}`);
      results.push({ name: biz.name, error: err.message });
    }
  }

  const built = results.filter((r) => r.previewUrl).length;
  const sent = results.filter((r) => r.outreach?.sent).length;
  await onProgress(
    `Done. Built ${built} site${built === 1 ? '' : 's'}, sent ${sent} proposal${sent === 1 ? '' : 's'}.` +
      (config.dryRun ? ' (DRY_RUN: nothing was emailed.)' : ''),
  );

  return results;
}
