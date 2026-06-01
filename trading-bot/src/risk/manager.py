"""
Position sizing and risk management.

Core principle: control how much capital is at risk, not just how many shares.
A 2% risk per trade means if the stop is hit, you lose 2% of account equity —
regardless of position size.
"""

from dataclasses import dataclass, field
from typing import Optional
import pandas as pd


@dataclass
class Position:
    symbol: str
    entry_price: float
    stop_loss: float
    take_profit: float
    size: float           # number of units
    side: str             # "long" | "short"
    entry_date: str = ""
    trailing_stop: Optional[float] = None
    pnl: float = 0.0
    closed: bool = False
    exit_price: Optional[float] = None
    exit_date: str = ""


@dataclass
class RiskManager:
    capital: float
    max_risk_pct: float = 0.02       # risk per trade
    max_open_positions: int = 5
    max_portfolio_risk_pct: float = 0.10
    open_positions: list = field(default_factory=list)
    closed_positions: list = field(default_factory=list)
    trade_log: list = field(default_factory=list)

    def position_size(
        self,
        price: float,
        stop_loss: float,
        side: str = "long",
    ) -> float:
        """
        Kelly-inspired fixed-fractional sizing.
        risk_amount = capital × risk_pct
        size        = risk_amount / |price - stop_loss|
        """
        risk_amount = self.capital * self.max_risk_pct
        stop_distance = abs(price - stop_loss)
        if stop_distance == 0:
            return 0.0
        raw_size = risk_amount / stop_distance
        # Cap at 20% of capital in any single position
        max_size = (self.capital * 0.20) / price
        return min(raw_size, max_size)

    def can_open(self) -> bool:
        active = [p for p in self.open_positions if not p.closed]
        if len(active) >= self.max_open_positions:
            return False
        # Check total portfolio risk
        total_risk = sum(
            abs(p.entry_price - p.stop_loss) * p.size / self.capital
            for p in active
        )
        return total_risk < self.max_portfolio_risk_pct

    def open_position(
        self,
        symbol: str,
        price: float,
        stop_loss: float,
        take_profit: float,
        side: str = "long",
        date: str = "",
    ) -> Optional[Position]:
        if not self.can_open():
            return None
        size = self.position_size(price, stop_loss, side)
        if size <= 0:
            return None
        pos = Position(
            symbol=symbol,
            entry_price=price,
            stop_loss=stop_loss,
            take_profit=take_profit,
            size=size,
            side=side,
            entry_date=date,
        )
        self.open_positions.append(pos)
        return pos

    def update_trailing_stop(self, pos: Position, current_price: float, trail_pct: float):
        if pos.side == "long":
            new_stop = current_price * (1 - trail_pct)
            if pos.trailing_stop is None or new_stop > pos.trailing_stop:
                pos.trailing_stop = new_stop
        else:
            new_stop = current_price * (1 + trail_pct)
            if pos.trailing_stop is None or new_stop < pos.trailing_stop:
                pos.trailing_stop = new_stop

    def evaluate_position(
        self,
        pos: Position,
        high: float,
        low: float,
        close: float,
        date: str,
        trail_pct: Optional[float] = None,
    ) -> str:
        """Check if stop or target was hit. Returns 'stop', 'target', or 'open'."""
        if pos.closed:
            return "closed"

        if trail_pct:
            self.update_trailing_stop(pos, close, trail_pct)

        effective_stop = pos.trailing_stop if pos.trailing_stop else pos.stop_loss

        if pos.side == "long":
            if low <= effective_stop:
                self._close(pos, effective_stop, date, "stop")
                return "stop"
            if high >= pos.take_profit:
                self._close(pos, pos.take_profit, date, "target")
                return "target"
        else:
            if high >= effective_stop:
                self._close(pos, effective_stop, date, "stop")
                return "stop"
            if low <= pos.take_profit:
                self._close(pos, pos.take_profit, date, "target")
                return "target"
        return "open"

    def _close(self, pos: Position, exit_price: float, date: str, reason: str):
        if pos.side == "long":
            pos.pnl = (exit_price - pos.entry_price) * pos.size
        else:
            pos.pnl = (pos.entry_price - exit_price) * pos.size
        pos.closed = True
        pos.exit_price = exit_price
        pos.exit_date = date
        self.capital += pos.pnl
        self.closed_positions.append(pos)
        self.open_positions = [p for p in self.open_positions if not p.closed]
        self.trade_log.append({
            "symbol": pos.symbol,
            "side": pos.side,
            "entry_date": pos.entry_date,
            "exit_date": date,
            "entry": pos.entry_price,
            "exit": exit_price,
            "size": pos.size,
            "pnl": pos.pnl,
            "reason": reason,
        })

    def force_close_all(self, prices: dict[str, float], date: str):
        for pos in list(self.open_positions):
            if not pos.closed and pos.symbol in prices:
                self._close(pos, prices[pos.symbol], date, "eod_close")

    def summary(self) -> dict:
        trades = self.trade_log
        if not trades:
            return {"trades": 0}
        wins = [t for t in trades if t["pnl"] > 0]
        losses = [t for t in trades if t["pnl"] <= 0]
        total_pnl = sum(t["pnl"] for t in trades)
        avg_win = sum(t["pnl"] for t in wins) / len(wins) if wins else 0
        avg_loss = sum(t["pnl"] for t in losses) / len(losses) if losses else 0
        return {
            "trades": len(trades),
            "wins": len(wins),
            "losses": len(losses),
            "win_rate": len(wins) / len(trades) if trades else 0,
            "total_pnl": total_pnl,
            "avg_win": avg_win,
            "avg_loss": avg_loss,
            "profit_factor": abs(avg_win / avg_loss) if avg_loss else float("inf"),
            "final_capital": self.capital,
        }
