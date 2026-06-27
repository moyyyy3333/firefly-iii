# CLAUDE.md — Project Overview

## Repository Layout

This repo contains five distinct projects:

| Directory | Name | Stack | Purpose |
|---|---|---|---|
| `app/` | Firefly III | PHP / Laravel | Personal finance manager (the original open-source app) |
| `filter-removal-app/` | Unmask (mobile) | React Native / Expo / TensorFlow.js | On-device AI filter removal from photos |
| `filter-removal-web/` | Unmask (web) | React / Vite | Browser version of Unmask, deployed to GitHub Pages |
| `neo/` | Neo Security Guard | React Native / Expo | Mobile security monitoring app |
| `hermes/` | Hermes Bot | Python / python-telegram-bot | Telegram bot (`@neo6morpheus9bot`) for Firefly III |

## Project-specific notes

### Firefly III (`app/`)
- Laravel PHP application; entry point is `index.php`
- CI scripts live in `.ci/` — run linting with `.ci/phpcs.sh`, static analysis with `.ci/phpstan.sh`
- Tests: `phpunit.xml` / `tests/`
- Config: `config/`; environment: `.env.example` (copy to `.env`)

### Unmask mobile (`filter-removal-app/`)
- Expo ~50, React Native 0.73, TensorFlow.js 4.x
- All ML runs on-device (no server calls for inference)
- `src/api/` — TF.js model loading helpers
- `src/components/` — UI components
- `src/utils/` — image processing utilities
- Start: `expo start`

### Unmask web (`filter-removal-web/`)
- Vite + React; builds to `dist/` (gitignored — built by CI)
- GitHub Actions workflow deploys to GitHub Pages automatically on push to `main`
- Start: `npm run dev`; build: `npm run build`

### Neo Security Guard (`neo/`)
- Expo ~52, React Native 0.76
- `src/screens/` — screen components
- `src/services/` — device/network services
- `src/theme.js` — design tokens
- Start: `expo start`

### Hermes Bot (`hermes/`)
- Python Telegram bot; Telegram username: `@neo6morpheus9bot`
- Connects to Firefly III via its REST API to answer finance queries over Telegram
- Commands: `/balance`, `/transactions`, `/bills`, `/budgets`, `/help`
- `bot.py` — entry point (polling mode by default; set `WEBHOOK_URL` in `.env` for webhook mode)
- `commands.py` — Telegram command handlers
- `firefly_client.py` — Firefly III API client
- `config.py` — reads configuration from `.env`
- Setup: `cp hermes/.env.example hermes/.env`, fill in `TELEGRAM_BOT_TOKEN` and `FIREFLY_API_TOKEN`, then `pip3 install -r hermes/requirements.txt && python3 hermes/bot.py`
- The bot token for `@neo6morpheus9bot` comes from @BotFather on Telegram
- `FIREFLY_API_TOKEN` is a personal access token from Firefly III → Profile → OAuth → Personal Access Tokens
- `TELEGRAM_ALLOWED_CHAT_IDS` (optional) restricts which chat IDs can use the bot

### Firefly III Telegram notification channel
- Firefly III sends Telegram notifications via a custom channel driver: `app/Notifications/Channels/TelegramChannel.php`
- Registered in `AppServiceProvider` — no external package needed
- Requires two encrypted config values in the Firefly III DB: `telegram_bot_token` and `telegram_chat_id` (set via the admin panel)
- All notification classes already have `toTelegram()` methods and return `['telegram']` from `via()`

## AI Agent PR Instructions

All AI-assisted commits and PRs **must** include:

1. An `Assisted-by` footer in every commit message:
   ```
   Assisted-by: [Model Name] via [Tool Name]
   ```
   Example: `Assisted-by: Claude claude-sonnet-4-6 via Claude Code`

2. Two lines from a Bruce Springsteen song in the PR body. Example:
   ```
   I'm ten years burnin' down the road
   Nowhere to run, ain't got nowhere to go
   ```

## Branch naming

Claude-created branches follow the pattern `claude/<short-description>-<id>`.

## Key files

- `agents.md` — source of the AI agent PR rules above
- `Neuroooo` — reference to `https://github.com/juspay/neurolink.git`
- `.ci/` — CI scripts for PHP linting, static analysis, and rector
- `.github/workflows/` — GitHub Actions (CI + GitHub Pages deploy for Unmask web)
