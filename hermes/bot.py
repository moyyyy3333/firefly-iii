#!/usr/bin/env python3
"""
Hermes — Firefly III Telegram Bot (@neo6morpheus9bot)

Runs in polling mode by default. Set WEBHOOK_URL in .env to use webhook mode.
"""

import logging

from telegram.ext import Application, CommandHandler

from config import TELEGRAM_BOT_TOKEN, WEBHOOK_URL, WEBHOOK_PORT
from commands import start, balance, transactions, bills, budgets, help_command

logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger("hermes")


def main() -> None:
    if not TELEGRAM_BOT_TOKEN:
        raise RuntimeError("TELEGRAM_BOT_TOKEN is not set. Copy .env.example to .env and fill it in.")

    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("balance", balance))
    app.add_handler(CommandHandler("transactions", transactions))
    app.add_handler(CommandHandler("bills", bills))
    app.add_handler(CommandHandler("budgets", budgets))

    if WEBHOOK_URL:
        logger.info("Starting in webhook mode on port %d", WEBHOOK_PORT)
        app.run_webhook(
            listen="0.0.0.0",
            port=WEBHOOK_PORT,
            webhook_url=f"{WEBHOOK_URL}/telegram-webhook",
        )
    else:
        logger.info("Starting in polling mode — @neo6morpheus9bot is live")
        app.run_polling()


if __name__ == "__main__":
    main()
