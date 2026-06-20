# Restaurant Site Bot

A Telegram-triggered pipeline that turns **one prompt** into a batch of finished work:

1. **Discover** — finds restaurants in an area that have no website or only a weak
   social/aggregator presence (Google Places).
2. **Design & build** — generates a complete, **award-quality** website for each one with
   Claude (`claude-opus-4-8`), driven by an opinionated senior-art-director brief.
3. **Offer** — creates a **Stripe Checkout** link so the owner can pay *if they choose to*.
4. **Reach out** — emails the business a **proposal** (free spec preview + price as an offer),
   with a working opt-out.

```
run family-owned Italian restaurants in Boston
```

## Pricing

Default launch price: **$99 one-time** (`SITE_PRICE_CENTS=9900`), with an optional low monthly
hosting/edits plan (`STRIPE_HOSTING_PRICE_ID`).

Why $99: the build is automated, so marginal cost per site is a few dollars of API calls. At $99
it's an easy "yes" for a small restaurant (less than a single slow night), beats the "I'll do it
myself with AI" objection because *you've already done it for them and will host + maintain it*, and
still leaves a strong margin at volume. Treat it as a configurable lever — raise it for higher-touch
markets, keep it low where you want pure throughput. Change `SITE_PRICE_CENTS` to adjust.

## Expiring, watermarked previews

Each generated site is served through a small preview server (`npm run serve`) instead of a plain
static host, so the link can expire and carry a watermark:

- **Dies 36h after first open** — the clock starts when the recipient opens it, not when you send it
  (`PREVIEW_TTL_HOURS`). After that the link returns *410 Gone* with a "reply for a fresh link" note.
- **Watermarked** — the business name + "Preview by <your studio>" is tiled across the page, so any
  screenshot is obviously your unfinished, branded work.
- **Honest limit:** you *cannot* block screenshots or screen recording on the web — no site can. The
  watermark + light right-click/save deterrents are the realistic version of that ask.

Run `npm run serve` alongside `npm start`, and set `PREVIEW_BASE_URL` to wherever the preview server
is publicly reachable.

## What this does NOT do (on purpose)

To keep you on the right side of the law and out of scam territory, this pipeline deliberately
**does not**:

- **Send invoices.** It sends a *proposal* with a checkout link. An invoice asserts a debt is owed;
  billing someone for work they never ordered is unsolicited-invoice fraud (FTC Act). The owner only
  pays after they opt in.
- **Send SMS/texts.** Automated marketing texts to numbers you scraped violate the **TCPA**
  ($500–$1,500 per message). Outreach is email-only.
- **Harvest personal contact info.** Discovery reads only publicly listed *business* details. You
  supply a recipient email only where you have a publicly published business address you're
  permitted to contact (`biz.email`).

Every email is **CAN-SPAM compliant**: identified as an advertisement, includes a real postal
address, and carries a working one-click opt-out that is honored via `suppression.json`.

`DRY_RUN=true` (the default) builds sites and drafts emails but sends nothing — use it until you're
happy with output.

## Setup

```bash
cd restaurant-site-bot
npm install
cp .env.example .env   # fill in keys
npm run once -- "taquerias in San Antonio"   # CLI test, no Telegram needed
npm start                                     # start the Telegram bot
```

Generated sites are written to `out/<slug>/index.html`. Wire `publishUrl()` in `pipeline.js` /
`index.js` to push them to your host (S3, Netlify, Vercel, etc.) and return the live preview URL.

## Compliance checklist before going live

- [ ] Set a real `SENDER_POSTAL_ADDRESS` and a monitored `UNSUBSCRIBE_EMAIL`.
- [ ] Only ever set `biz.email` to a publicly published business address.
- [ ] Honor opt-outs promptly (replies of "stop"/"unsubscribe" → `suppress(email)`).
- [ ] Confirm B2B cold-email rules for your jurisdiction (stricter under GDPR/CASL/etc.).
- [ ] Keep `DRY_RUN=true` until you've reviewed sample output.
