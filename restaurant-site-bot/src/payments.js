import Stripe from 'stripe';
import { config } from './config.js';

/**
 * Create a Stripe Checkout link for the buyer to pay IF they choose to.
 *
 * This is a checkout (an offer they opt into), NOT an invoice. We never assert
 * that money is owed for work nobody ordered. The buyer only pays after they
 * say yes.
 */
export async function createCheckoutLink(biz, siteUrl) {
  const stripe = new Stripe(config.stripe.secretKey);

  const lineItems = [
    {
      price_data: {
        currency: config.stripe.currency,
        unit_amount: config.stripe.sitePriceCents,
        product_data: {
          name: `Custom website for ${biz.name}`,
          description: 'One-time launch price: design, build, and go-live of your new website.',
        },
      },
      quantity: 1,
    },
  ];

  if (config.stripe.hostingPriceId) {
    lineItems.push({ price: config.stripe.hostingPriceId, quantity: 1 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: config.stripe.hostingPriceId ? 'subscription' : 'payment',
    line_items: lineItems,
    success_url: 'https://example.com/thank-you?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/no-thanks',
    metadata: { restaurant: biz.name, placeId: biz.placeId || '', preview: siteUrl || '' },
  });

  return session.url;
}

export function formatPrice() {
  const amount = (config.stripe.sitePriceCents / 100).toFixed(2);
  return `${config.stripe.currency.toUpperCase()} ${amount}`;
}
