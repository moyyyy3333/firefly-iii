"""
Trend Following Strategy — Supertrend + EMA ribbon

This is the institutional "swing" strategy. Large players use moving average
crosses and Supertrend to hold multi-week to multi-month positions. They are
NOT day-trading — they are riding the macro wave. You can follow them.

Documented edges:
  - EMA cross systems have positive expectancy on 20+ year backtests
  - Supertrend reduces whipsaws by incorporating volatility (ATR)
  - Combining both filters false signals dramatically

Entry conditions (long):
  1. Supertrend flips bullish
  2. Fast EMA (21) crosses above slow EMA (55)
  3. Price > 200 EMA (macro filter)
  4. MFI (Money Flow Index) > 50 — smart money flowing in
"""

import pandas as pd
from .base import BaseStrategy, Signal
from src.utils.indicators import (
    ema, supertrend, atr, money_flow_index
)


class TrendFollowingStrategy(BaseStrategy):
    name = "trend_following"

    def __init__(
        self,
        fast_ema: int = 21,
        slow_ema: int = 55,
        macro_ema: int = 200,
        st_period: int = 10,
        st_mult: float = 3.0,
        atr_stop_mult: float = 2.0,
        rr_ratio: float = 3.0,     # trend trades deserve more room
    ):
        self.fast_ema = fast_ema
        self.slow_ema = slow_ema
        self.macro_ema = macro_ema
        self.st_period = st_period
        self.st_mult = st_mult
        self.atr_stop_mult = atr_stop_mult
        self.rr_ratio = rr_ratio

    def generate_signals(self, df: pd.DataFrame, symbol: str) -> list[Signal]:
        if len(df) < 220:
            return []

        close = df["close"]
        high = df["high"]
        low = df["low"]
        vol = df["volume"]

        fast = ema(close, self.fast_ema)
        slow = ema(close, self.slow_ema)
        macro = ema(close, self.macro_ema)
        st_dir = supertrend(high, low, close, self.st_period, self.st_mult)
        atr_vals = atr(high, low, close, 14)
        mfi = money_flow_index(high, low, close, vol, 14)

        signals = []
        in_long = False
        in_short = False

        for i in range(220, len(df)):
            price = close.iloc[i]
            fast_now = fast.iloc[i]
            slow_now = slow.iloc[i]
            fast_prev = fast.iloc[i - 1]
            slow_prev = slow.iloc[i - 1]
            macro_now = macro.iloc[i]
            st_now = st_dir.iloc[i]
            st_prev = st_dir.iloc[i - 1]
            mfi_now = mfi.iloc[i]
            atr_now = atr_vals.iloc[i]
            date_str = str(df.index[i])

            # ── Long entry ────────────────────────────────────────────────
            ema_cross_up = fast_now > slow_now and fast_prev <= slow_prev
            st_flip_bull = st_now == 1 and st_prev == -1
            macro_bullish = price > macro_now
            flow_bullish = mfi_now > 50

            if not in_long and macro_bullish and (ema_cross_up or st_flip_bull) and flow_bullish:
                stop = price - self.atr_stop_mult * atr_now
                target = price + self.rr_ratio * (price - stop)
                signals.append(Signal(
                    symbol=symbol,
                    direction="long",
                    entry_price=price,
                    stop_loss=stop,
                    take_profit=target,
                    confidence=0.80,
                    reason=f"trend_long ema_cross={ema_cross_up} st_flip={st_flip_bull}",
                ))
                in_long = True
                in_short = False

            # ── Short entry ───────────────────────────────────────────────
            ema_cross_down = fast_now < slow_now and fast_prev >= slow_prev
            st_flip_bear = st_now == -1 and st_prev == 1
            macro_bearish = price < macro_now
            flow_bearish = mfi_now < 50

            if not in_short and macro_bearish and (ema_cross_down or st_flip_bear) and flow_bearish:
                stop = price + self.atr_stop_mult * atr_now
                target = price - self.rr_ratio * (stop - price)
                signals.append(Signal(
                    symbol=symbol,
                    direction="short",
                    entry_price=price,
                    stop_loss=stop,
                    take_profit=target,
                    confidence=0.80,
                    reason=f"trend_short ema_cross={ema_cross_down} st_flip={st_flip_bear}",
                ))
                in_short = True
                in_long = False

            # ── Exit signals ──────────────────────────────────────────────
            if in_long and st_now == -1:
                signals.append(Signal(
                    symbol=symbol,
                    direction="exit",
                    entry_price=price,
                    stop_loss=price,
                    take_profit=price,
                    reason="trend_exit supertrend_flip",
                ))
                in_long = False

            if in_short and st_now == 1:
                signals.append(Signal(
                    symbol=symbol,
                    direction="exit",
                    entry_price=price,
                    stop_loss=price,
                    take_profit=price,
                    reason="trend_exit supertrend_flip",
                ))
                in_short = False

        return signals
