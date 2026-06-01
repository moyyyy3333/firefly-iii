"""
Market data fetcher — yfinance for stocks/crypto/forex.
Returns clean pandas DataFrames with OHLCV columns.
"""

import yfinance as yf
import pandas as pd
import requests
import time
from typing import Optional


def fetch_ohlcv(
    symbol: str,
    start: str,
    end: str,
    interval: str = "1d",
    retries: int = 3,
) -> pd.DataFrame:
    """Download OHLCV data for any yfinance-supported symbol."""
    for attempt in range(retries):
        try:
            ticker = yf.Ticker(symbol)
            df = ticker.history(start=start, end=end, interval=interval, auto_adjust=True)
            if df.empty:
                raise ValueError(f"No data returned for {symbol}")
            df.index = pd.to_datetime(df.index, utc=True).tz_localize(None)
            df = df[["Open", "High", "Low", "Close", "Volume"]].rename(
                columns=str.lower
            )
            df.dropna(inplace=True)
            return df
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
            else:
                raise RuntimeError(f"Failed to fetch {symbol}: {e}") from e


def fetch_multi(
    symbols: list[str],
    start: str,
    end: str,
    interval: str = "1d",
) -> dict[str, pd.DataFrame]:
    """Fetch multiple symbols. Returns {symbol: DataFrame}."""
    result = {}
    for sym in symbols:
        try:
            result[sym] = fetch_ohlcv(sym, start, end, interval)
            print(f"  ✓ {sym}: {len(result[sym])} bars")
        except Exception as e:
            print(f"  ✗ {sym}: {e}")
    return result


def fetch_fear_greed() -> Optional[dict]:
    """Alternative.me Fear & Greed Index — useful sentiment filter for crypto."""
    try:
        r = requests.get(
            "https://api.alternative.me/fng/?limit=30&format=json", timeout=10
        )
        data = r.json()["data"]
        return {
            "current_value": int(data[0]["value"]),
            "current_label": data[0]["value_classification"],
            "history": [
                {"date": d["timestamp"], "value": int(d["value"])} for d in data
            ],
        }
    except Exception:
        return None
