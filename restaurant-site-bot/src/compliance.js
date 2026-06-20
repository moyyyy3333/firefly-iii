import fs from 'node:fs';
import path from 'node:path';
import { config } from './config.js';

const FILE = path.join(config.dataDir, 'suppression.json');

/**
 * Opt-out / suppression list. CAN-SPAM requires that opt-outs are honored within
 * 10 business days and that you never email a suppressed address again.
 *
 * Anyone who replies "stop"/"unsubscribe", or who you add manually, goes here.
 */
function load() {
  try {
    return new Set(JSON.parse(fs.readFileSync(FILE, 'utf8')));
  } catch {
    return new Set();
  }
}

function save(set) {
  fs.writeFileSync(FILE, JSON.stringify([...set], null, 2), 'utf8');
}

export function isSuppressed(email) {
  if (!email) return true; // no address => cannot lawfully contact
  return load().has(email.toLowerCase());
}

export function suppress(email) {
  if (!email) return;
  const set = load();
  set.add(email.toLowerCase());
  save(set);
}

/**
 * The CAN-SPAM footer every commercial email must carry:
 * identification as an ad, a real postal address, and a working opt-out.
 */
export function complianceFooter({ postalAddress, unsubscribeEmail, recipientEmail }) {
  const unsubLink = `mailto:${unsubscribeEmail}?subject=${encodeURIComponent('Unsubscribe ' + (recipientEmail || ''))}&body=${encodeURIComponent('Please remove me from your list.')}`;
  return [
    '',
    '----',
    'This is a one-time advertising message from an independent web studio.',
    `If you would rather not hear from us, just reply "STOP" or unsubscribe here: ${unsubLink}`,
    "We will honor your request and you won't be contacted again.",
    postalAddress,
  ].join('\n');
}
