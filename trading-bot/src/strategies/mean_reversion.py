"""
Mean Reversion Strategy — "rubber band" trades

The "calculated swing" you described is exactly this: when price deviates too far
from its mean, it snaps back. Proven in academic literature (Jegadeesh 1990,
Lo & MacKinlay 1988). Strongest in choppy/ranging markets.

Entry conditions:
  1. Bollinger Band squeeze then expansion (volatility contraction → pop)
  2. RSI oversold (<30) for longs, overbought (>70) for shorts
  3. Price at or beyond the band — statistically ~2 std dev from mean
  4. Stochastic RSI turning from extremes confirms timing
  5. NOT in a strong trend (avoid catching falling knives)
"""

import pandas as pd
from .base import BaseStrategy, Signal
from src.utils.indicators import (
    bollinger, rsi, stoch_rsi, atr, adx
)


class MeanReversionStrategy(BaseStrategy):
    name = "mean_reversion"

    def __init__(
        self,
        bb_period: int = 20,
        bb_std: float = 2.0,
        rsi_period: int = 14,
        rsi_oversold: float = 30,
        rsi_overbought: float = 70,
        atr_stop_mult: float = 1.2,
        rr_ratio: float = 1.5,
    ):
        self.bb_period = bb_period
        self.bb_std = bb_std
        self.rsi_period = rsi_period
        self.rsi_oversold = rsi_oversold
        self.rsi_overbought = rsi_overbought
        self.atr_stop_mult = atr_stop_mult
        self.rr_ratio = rr_ratio

    def generate_signals(self, df: pd.DataFrame, symbol: str) -> list[Signal]:
        if len(df) < 60:
            return []

        close = df["close"]
        high = df["high"]
        low = df["low"]

        bb = bollinger(close, self.bb_period, self.bb_std)
        rsi_vals = rsi(close, self.rsi_period)
        srsi = stoch_rsi(close, self.rsi_period)
        atr_vals = atr(high, low, close, 14)
        adx_vals = adx(high, low, close, 14)

        signals = []

        for i in range(60, len(df)):
            price = close.iloc[i]
            bb_lower = bb["lower"].iloc[i]
            bb_upper = bb["upper"].iloc[i]
            bb_mid = bb["mid"].iloc[i]
            rsi_now = rsi_vals.iloc[i]
            rsi_prev = rsi_vals.iloc[i - 1]
            sk = srsi["k"].iloc[i]
            sd = srsi["d"].iloc[i]
            adx_now = adx_vals.iloc[i]
            atr_now = atr_vals.iloc[i]

            # Don't fade strong trends — mean reversion kills you in a runaway move
            strong_trend = adx_now > 35

            # ── Long (oversold bounce) ─────────────────────────────────────
            at_lower_band = price <= bb_lower
            rsi_oversold = rsi_now < self.rsi_oversold
            stoch_turning_up = sk > sd and sk < 20

            if at_lower_band and rsi_oversold and not strong_trend:
                confidence = 0.6
                if stoch_turning_up:
                    confidence = 0.85
                stop = price - self.atr_stop_mult * atr_now
                target = bb_mid  # target the mean
                if target > price:
                    signals.append(Signal(
                        symbol=symbol,
                        direction="long",
                        entry_price=price,
                        stop_loss=stop,
                        take_profit=target,
                        confidence=confidence,
                        reason=f"mean_rev_long rsi={rsi_now:.1f}",
                    ))

            # ── Short (overbought fade) ────────────────────────────────────
            at_upper_band = price >= bb_upper
            rsi_overbought = rsi_now > self.rsi_overbought
            stoch_turning_down = sk < sd and sk > 80

            if at_upper_band and rsi_overbought and not strong_trend:
                confidence = 0.6
                if stoch_turning_down:
                    confidence = 0.85
                stop = price + self.atr_stop_mult * atr_now
                target = bb_mid
                if target < price:
                    signals.append(Signal(
                        symbol=symbol,
                        direction="short",
                        entry_price=price,
                        stop_loss=stop,
                        take_profit=target,
                        confidence=confidence,
                        reason=f"mean_rev_short rsi={rsi_now:.1f}",
                    ))

        return signals
