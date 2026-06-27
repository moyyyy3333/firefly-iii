import os
from dotenv import load_dotenv

load_dotenv()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_ALLOWED_CHAT_IDS = [
    int(x.strip())
    for x in os.getenv("TELEGRAM_ALLOWED_CHAT_IDS", "").split(",")
    if x.strip()
]

FIREFLY_BASE_URL = os.getenv("FIREFLY_BASE_URL", "http://localhost")
FIREFLY_API_TOKEN = os.getenv("FIREFLY_API_TOKEN", "")

WEBHOOK_PORT = int(os.getenv("WEBHOOK_PORT", "8443"))
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "")  # e.g. https://yourdomain.com
