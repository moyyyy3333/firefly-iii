"""
Momentum Strategy — "trend is your friend until it bends"

Entry conditions (long):
  1. Price above 200 EMA (macro regime filter)
  2. RSI crosses above 50 from below (momentum shift)
  3. MACD histogram turns positive
  4. Volume surge confirms the move
  5. ADX > 20 (trend has strength)

The documented "institutional oscillation" you described is real — large players
accumulate in a tight range then mark up aggressively. This strategy catches the
breakout from those accumulation zones using volume as the tell.
"""

import pandas as pd
from .base import BaseStrategy, Signal
from src.utils.indicators import (
    ema, rsi, macd, adx, atr, volume_surge
)


class MomentumStrategy(BaseStrategy):
    name = "momentum"

    def __init__(
        self,
        rsi_period: int = 14,
        macd_fast: int = 12,
        macd_slow: int = 26,
        macd_signal: int = 9,
        atr_stop_mult: float = 1.5,
        rr_ratio: float = 2.0,
    ):
        self.rsi_period = rsi_period
        self.macd_fast = macd_fast
        self.macd_slow = macd_slow
        self.macd_signal = macd_signal
        self.atr_stop_mult = atr_stop_mult
        self.rr_ratio = rr_ratio

    def generate_signals(self, df: pd.DataFrame, symbol: str) -> list[Signal]:
        if len(df) < 230:
            return []

        close = df["close"]
        high = df["high"]
        low = df["low"]
        vol = df["volume"]

        e200 = ema(close, 200)
        e50 = ema(close, 50)
        rsi_vals = rsi(close, self.rsi_period)
        macd_df = macd(close, self.macd_fast, self.macd_slow, self.macd_signal)
        adx_vals = adx(high, low, close, 14)
        atr_vals = atr(high, low, close, 14)
        vol_surge = volume_surge(vol, 20, 1.8)

        signals = []

        for i in range(230, len(df)):
            price = close.iloc[i]
            prev_price = close.iloc[i - 1]

            # ── Long entry ────────────────────────────────────────────────
            macro_bullish = price > e200.iloc[i] and e50.iloc[i] > e200.iloc[i]
            rsi_cross_up = rsi_vals.iloc[i] > 50 and rsi_vals.iloc[i - 1] <= 50
            macd_positive = (
                macd_df["histogram"].iloc[i] > 0
                and macd_df["histogram"].iloc[i - 1] <= 0
            )
            strong_trend = adx_vals.iloc[i] > 20
            volume_confirms = vol_surge.iloc[i]

            long_score = sum([macro_bullish, rsi_cross_up, macd_positive, strong_trend, volume_confirms])

            if long_score >= 3 and (rsi_cross_up or macd_positive):
                stop = price - self.atr_stop_mult * atr_vals.iloc[i]
                target = price + self.rr_ratio * (price - stop)
                signals.append(Signal(
                    symbol=symbol,
                    direction="long",
                    entry_price=price,
                    stop_loss=stop,
                    take_profit=target,
                    confidence=long_score / 5,
                    reason=f"momentum_long score={long_score}",
                ))

            # ── Short entry ───────────────────────────────────────────────
            macro_bearish = price < e200.iloc[i] and e50.iloc[i] < e200.iloc[i]
            rsi_cross_down = rsi_vals.iloc[i] < 50 and rsi_vals.iloc[i - 1] >= 50
            macd_negative = (
                macd_df["histogram"].iloc[i] < 0
                and macd_df["histogram"].iloc[i - 1] >= 0
            )

            short_score = sum([macro_bearish, rsi_cross_down, macd_negative, strong_trend, volume_confirms])

            if short_score >= 3 and (rsi_cross_down or macd_negative):
                stop = price + self.atr_stop_mult * atr_vals.iloc[i]
                target = price - self.rr_ratio * (stop - price)
                signals.append(Signal(
                    symbol=symbol,
                    direction="short",
                    entry_price=price,
                    stop_loss=stop,
                    take_profit=target,
                    confidence=short_score / 5,
                    reason=f"momentum_short score={short_score}",
                ))

        return signals
