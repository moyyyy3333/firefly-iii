import dotenv from 'dotenv';
dotenv.config();

const num = (v, d) => (v === undefined || v === '' ? d : Number(v));
const bool = (v, d) => (v === undefined || v === '' ? d : String(v).toLowerCase() === 'true');
const list = (v) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : []);

export const config = {
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
    allowedUserIds: list(process.env.TELEGRAM_ALLOWED_USER_IDS),
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: process.env.ANTHROPIC_MODEL || 'claude-opus-4-8',
  },
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    sitePriceCents: num(process.env.SITE_PRICE_CENTS, 9900),
    currency: process.env.SITE_CURRENCY || 'usd',
    hostingPriceId: process.env.STRIPE_HOSTING_PRICE_ID || '',
  },
  email: {
    host: process.env.SMTP_HOST,
    port: num(process.env.SMTP_PORT, 587),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    fromName: process.env.FROM_NAME || 'Your Studio',
    fromEmail: process.env.FROM_EMAIL,
    replyTo: process.env.REPLY_TO_EMAIL || process.env.FROM_EMAIL,
    postalAddress: process.env.SENDER_POSTAL_ADDRESS || '',
    unsubscribeEmail: process.env.UNSUBSCRIBE_EMAIL || '',
  },
  previews: {
    baseUrl: process.env.PREVIEW_BASE_URL || 'http://localhost:8080',
    port: num(process.env.PREVIEW_PORT, 8080),
    ttlHours: num(process.env.PREVIEW_TTL_HOURS, 36),
    studioName: process.env.FROM_NAME || 'Your Studio',
  },
  maxOutreachPerRun: num(process.env.MAX_OUTREACH_PER_RUN, 25),
  dryRun: bool(process.env.DRY_RUN, true),
};

/** Throw early if something required for a given capability is missing. */
export function assertConfig(keys = []) {
  const checks = {
    telegram: () => config.telegram.token,
    anthropic: () => config.anthropic.apiKey,
    places: () => config.googleMapsApiKey,
    stripe: () => config.stripe.secretKey,
    email: () =>
      config.email.host && config.email.fromEmail && config.email.postalAddress && config.email.unsubscribeEmail,
  };
  const missing = keys.filter((k) => !checks[k]?.());
  if (missing.length) {
    throw new Error(
      `Missing configuration for: ${missing.join(', ')}. Copy .env.example to .env and fill these in.`,
    );
  }
}
