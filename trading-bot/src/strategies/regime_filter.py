"""
Market regime detection — only trade when conditions are right.

Three regimes:
  TRENDING_UP    — take long momentum / trend signals
  TRENDING_DOWN  — take short signals or stay flat
  CHOPPY         — mean-reversion only, reduce size

Based on: 200-day SMA slope, ADX strength, and Bollinger Band width percentile.
"""

import pandas as pd
import numpy as np
from src.utils.indicators import ema, adx, bollinger  # pure numpy/pandas implementation


class RegimeFilter:
    def __init__(self, df: pd.DataFrame):
        self.df = df
        self._compute()

    def _compute(self):
        c = self.df["close"]
        h = self.df["high"]
        l = self.df["low"]

        self.ema200 = ema(c, 200)
        self.ema50 = ema(c, 50)
        self.adx = adx(h, l, c, 14)
        bb = bollinger(c, 20, 2)
        self.bb_width = bb["width"]
        # Width percentile over last 252 bars (1 year)
        self.bb_width_pct = self.bb_width.rolling(252).rank(pct=True)

    def regime(self, idx: int) -> str:
        """Return 'trending_up', 'trending_up', 'trending_down', or 'choppy'."""
        try:
            price = self.df["close"].iloc[idx]
            adx_val = self.adx.iloc[idx]
            e200 = self.ema200.iloc[idx]
            e50 = self.ema50.iloc[idx]
            bb_pct = self.bb_width_pct.iloc[idx]
        except IndexError:
            return "unknown"

        if pd.isna(adx_val) or pd.isna(e200):
            return "unknown"

        # Strong trend: ADX > 25 and price above/below key EMAs
        if adx_val > 25:
            if price > e200 and e50 > e200:
                return "trending_up"
            if price < e200 and e50 < e200:
                return "trending_down"

        # Bollinger width in bottom 30th percentile = compression / chop
        if not pd.isna(bb_pct) and bb_pct < 0.30:
            return "choppy"

        # Mild trend
        if price > e200:
            return "trending_up"
        return "trending_down"

    def series(self) -> pd.Series:
        regimes = []
        for i in range(len(self.df)):
            regimes.append(self.regime(i))
        return pd.Series(regimes, index=self.df.index)
