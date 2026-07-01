"""
Central config. Copy .env.example to .env and set your exchange API keys.
All trading defaults are conservative — tune per-strategy after backtesting.
"""

import os
from dotenv import load_dotenv

load_dotenv()

# --- Capital & risk -------------------------------------------------------
STARTING_CAPITAL = float(os.getenv("STARTING_CAPITAL", "500"))
MAX_OPEN_POSITIONS = int(os.getenv("MAX_OPEN_POSITIONS", "5"))

# --- Fixed wager sizing (replaces % risk model) ---------------------------
# Each trade risks a fixed dollar amount regardless of account size.
# Tune MIN_WAGER/MAX_WAGER to your comfort level ($25–$100).
MIN_WAGER = float(os.getenv("MIN_WAGER", "25"))
MAX_WAGER = float(os.getenv("MAX_WAGER", "50"))    # conservative default; raise to 100 as account grows

# --- Defaults -------------------------------------------------------------
DEFAULT_STOP_LOSS_PCT = 0.04      # 4% hard stop on crypto (covers normal noise)
DEFAULT_TAKE_PROFIT_PCT = 0.08    # 8% target → 2:1 R/R on a 4% stop
TRAILING_STOP_PCT = 0.025

# --- Data -----------------------------------------------------------------
CRYPTO_SYMBOLS = ["BTC-USD", "ETH-USD", "SOL-USD", "BNB-USD", "AVAX-USD"]
STOCK_SYMBOLS = ["SPY", "QQQ", "AAPL", "MSFT", "NVDA", "AMZN", "TSLA"]
FOREX_SYMBOLS = ["EURUSD=X", "GBPUSD=X", "USDJPY=X"]

# --- Backtest window ------------------------------------------------------
BACKTEST_START = "2008-01-01"   # catches the GFC and every cycle since
BACKTEST_END = "2026-01-01"

# --- Exchange API keys (paper trading by default) -------------------------
EXCHANGE_API_KEY = os.getenv("EXCHANGE_API_KEY", "")
EXCHANGE_SECRET = os.getenv("EXCHANGE_SECRET", "")
PAPER_TRADING = os.getenv("PAPER_TRADING", "true").lower() == "true"
