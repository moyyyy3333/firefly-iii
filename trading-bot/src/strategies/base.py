"""
Abstract base class every strategy must implement.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Optional
import pandas as pd


@dataclass
class Signal:
    symbol: str
    direction: str          # "long" | "short" | "exit"
    entry_price: float
    stop_loss: float
    take_profit: float
    confidence: float = 1.0  # 0-1, used to scale position size
    reason: str = ""


class BaseStrategy(ABC):
    name: str = "base"

    @abstractmethod
    def generate_signals(self, df: pd.DataFrame, symbol: str) -> list[Signal]:
        """
        Given OHLCV DataFrame, return a list of Signal objects.
        Called once per bar in backtesting; called on latest data for live trading.
        """

    def _atr_stop(self, df: pd.DataFrame, idx: int, side: str, atr_mult: float = 1.5) -> float:
        """Compute ATR-based stop from a given bar index."""
        from src.utils.indicators import atr as calc_atr
        a = calc_atr(df["high"], df["low"], df["close"])
        price = df["close"].iloc[idx]
        atr_val = a.iloc[idx]
        if side == "long":
            return price - atr_mult * atr_val
        return price + atr_mult * atr_val

    def _rr_target(self, entry: float, stop: float, ratio: float = 2.0, side: str = "long") -> float:
        risk = abs(entry - stop)
        if side == "long":
            return entry + risk * ratio
        return entry - risk * ratio
