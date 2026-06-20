import nodemailer from 'nodemailer';
import { config } from './config.js';
import { complianceFooter, isSuppressed } from './compliance.js';
import { formatPrice } from './payments.js';

let transporter;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: config.email.user ? { user: config.email.user, pass: config.email.pass } : undefined,
    });
  }
  return transporter;
}

/**
 * Compose a PROPOSAL (not an invoice). It is honest about being an unsolicited
 * pitch, shows the free preview, names a price as an OFFER, links to a Stripe
 * checkout the owner opts into, and carries a working opt-out.
 */
export function buildProposalEmail(biz, { previewUrl, checkoutUrl, recipientEmail }) {
  const price = formatPrice();
  const subject = `A website I designed for ${biz.name} (free preview inside)`;

  const body = [
    `Hi ${biz.name} team,`,
    '',
    `I'm an independent web designer. I noticed ${biz.name} doesn't have much of a website yet, so`,
    `I went ahead and designed a complete one for you, on spec, to show what's possible. There's no`,
    `obligation and you don't owe anything for the preview.`,
    '',
    `Take a look here: ${previewUrl}`,
    '',
    `If you like it, I'll finish it, put it on your own domain, and keep it updated. The launch price`,
    `is ${price} (one-time)${config.stripe.hostingPriceId ? ', plus an optional low monthly plan for hosting and edits' : ''}.`,
    `If you'd like to go ahead, you can do it here whenever you're ready: ${checkoutUrl}`,
    '',
    `Either way, prefer to talk it through first? Just reply to this email or call me and we'll sort`,
    `out the details, tweaks, photos, menu, anything you want changed.`,
    '',
    `Thanks for your time,`,
    config.email.fromName,
    config.email.replyTo,
    complianceFooter({
      postalAddress: config.email.postalAddress,
      unsubscribeEmail: config.email.unsubscribeEmail,
      recipientEmail,
    }),
  ].join('\n');

  return { subject, body };
}

/**
 * Send the proposal. Respects the suppression list and DRY_RUN.
 * Returns { sent: boolean, reason?: string }.
 */
export async function sendProposal(biz, { previewUrl, checkoutUrl, recipientEmail }) {
  if (isSuppressed(recipientEmail)) {
    return { sent: false, reason: recipientEmail ? 'suppressed/opted-out' : 'no business email available' };
  }

  const { subject, body } = buildProposalEmail(biz, { previewUrl, checkoutUrl, recipientEmail });

  if (config.dryRun) {
    return { sent: false, reason: 'DRY_RUN', subject, body };
  }

  await getTransporter().sendMail({
    from: `"${config.email.fromName}" <${config.email.fromEmail}>`,
    to: recipientEmail,
    replyTo: config.email.replyTo,
    subject,
    text: body,
    headers: {
      // RFC 8058 one-click unsubscribe signal for inbox providers.
      'List-Unsubscribe': `<mailto:${config.email.unsubscribeEmail}?subject=unsubscribe>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  });

  return { sent: true, subject };
}
