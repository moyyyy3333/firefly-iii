"""
Central config. Copy .env.example to .env and set your exchange API keys.
All trading defaults are conservative — tune per-strategy after backtesting.
"""

import os
from dotenv import load_dotenv

load_dotenv()

# --- Capital & risk -------------------------------------------------------
STARTING_CAPITAL = float(os.getenv("STARTING_CAPITAL", "10000"))
MAX_RISK_PER_TRADE = float(os.getenv("MAX_RISK_PER_TRADE", "0.02"))   # 2% per trade
MAX_OPEN_POSITIONS = int(os.getenv("MAX_OPEN_POSITIONS", "5"))
MAX_PORTFOLIO_RISK = float(os.getenv("MAX_PORTFOLIO_RISK", "0.10"))    # 10% total

# --- Defaults -------------------------------------------------------------
DEFAULT_STOP_LOSS_PCT = 0.03      # 3% hard stop
DEFAULT_TAKE_PROFIT_PCT = 0.06    # 6% target → 2:1 R/R
TRAILING_STOP_PCT = 0.02

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
