"""
Position sizing and risk management — fixed wager model.

Each trade places a fixed dollar wager ($25–$100). The number of units
bought = wager / price, which works for fractional crypto buying.
The stop and target define your R/R — the wager size defines max loss.

Example: $50 wager on BTC at $60,000
  units = 50 / 60000 = 0.000833 BTC
  stop at -4%  → lose $2.00
  target at +8% → gain $4.00  (2:1 R/R)
"""

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class Position:
    symbol: str
    entry_price: float
    stop_loss: float
    take_profit: float
    size: float           # number of units (fractional for crypto)
    wager: float          # dollar amount placed
    side: str             # "long" | "short"
    entry_date: str = ""
    trailing_stop: Optional[float] = None
    fees: float = 0.0     # total fees paid (entry + exit)
    pnl: float = 0.0      # net P&L after fees
    closed: bool = False
    exit_price: Optional[float] = None
    exit_date: str = ""


@dataclass
class RiskManager:
    capital: float
    min_wager: float = 25.0
    max_wager: float = 50.0
    max_open_positions: int = 5
    commission: float = 0.001   # 0.1% per fill (entry and exit)
    open_positions: list = field(default_factory=list)
    closed_positions: list = field(default_factory=list)
    trade_log: list = field(default_factory=list)

    def position_size(self, price: float, wager: float) -> float:
        """Units to buy = wager / price. Works for fractional crypto."""
        if price <= 0:
            return 0.0
        return wager / price

    def _wager_for(self, confidence: float = 1.0) -> float:
        """
        Three-tier wager sizing driven by signal confidence (0–1):

          SMALL  (confidence < 0.50) → min_wager          e.g. $25
          MEDIUM (confidence 0.50–0.79) → midpoint         e.g. $62
          LARGE  (confidence ≥ 0.80) → max_wager           e.g. $100

        Confidence is set by each strategy based on how many conditions
        align simultaneously — more confirmations = bigger bet.
        Never exceeds 20% of total equity regardless of tier.
        """
        if confidence < 0.50:
            wager = self.min_wager
        elif confidence < 0.80:
            wager = (self.min_wager + self.max_wager) / 2
        else:
            wager = self.max_wager
        # Cap at 20% of total equity (free cash + deployed)
        deployed = sum(p.wager for p in self.open_positions if not p.closed)
        total_equity = self.capital + deployed
        return min(wager, total_equity * 0.20)

    @staticmethod
    def wager_tier(confidence: float) -> str:
        if confidence < 0.50:
            return "SMALL"
        if confidence < 0.80:
            return "MEDIUM"
        return "LARGE"

    def can_open(self) -> bool:
        active = [p for p in self.open_positions if not p.closed]
        if len(active) >= self.max_open_positions:
            return False
        # Use total equity (free cash + deployed) as the basis for the 80% cap
        # so the cap doesn't shrink as positions are opened.
        deployed = sum(p.wager for p in active)
        total_equity = self.capital + deployed
        return deployed < total_equity * 0.80

    def open_position(
        self,
        symbol: str,
        price: float,
        stop_loss: float,
        take_profit: float,
        side: str = "long",
        date: str = "",
        confidence: float = 1.0,
    ) -> Optional["Position"]:
        if not self.can_open():
            return None
        wager = self._wager_for(confidence)
        if wager < self.min_wager:
            return None
        size = self.position_size(price, wager)
        if size <= 0:
            return None
        entry_fee = wager * self.commission
        self.capital -= wager + entry_fee
        pos = Position(
            symbol=symbol,
            entry_price=price,
            stop_loss=stop_loss,
            take_profit=take_profit,
            size=size,
            wager=wager,
            side=side,
            entry_date=date,
            fees=entry_fee,
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
        gross_pnl = (
            (exit_price - pos.entry_price) * pos.size if pos.side == "long"
            else (pos.entry_price - exit_price) * pos.size
        )
        exit_fee = abs(exit_price * pos.size) * self.commission
        pos.fees += exit_fee
        pos.pnl = gross_pnl - exit_fee       # net P&L on this trade
        pos.closed = True
        pos.exit_price = exit_price
        pos.exit_date = date
        # Return wager + gross gain, minus the exit commission
        self.capital += pos.wager + gross_pnl - exit_fee
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
            "wager": pos.wager,
            "fees": pos.fees,
            "pnl": pos.pnl,
            "pnl_pct": (pos.pnl / pos.wager) * 100 if pos.wager else 0,
            "reason": reason,
        })

    def close_position(self, pos: Position, exit_price: float, date: str, reason: str = "signal_exit"):
        """Explicitly close a position at a given price (e.g. on exit signal)."""
        if not pos.closed:
            self._close(pos, exit_price, date, reason)

    def force_close_all(self, prices: dict, date: str):
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
        total_fees = sum(t["fees"] for t in trades)
        total_wagered = sum(t["wager"] for t in trades)
        avg_win = sum(t["pnl"] for t in wins) / len(wins) if wins else 0
        avg_loss = sum(t["pnl"] for t in losses) / len(losses) if losses else 0
        avg_win_pct = sum(t["pnl_pct"] for t in wins) / len(wins) if wins else 0
        avg_loss_pct = sum(t["pnl_pct"] for t in losses) / len(losses) if losses else 0
        return {
            "trades": len(trades),
            "wins": len(wins),
            "losses": len(losses),
            "win_rate": len(wins) / len(trades) if trades else 0,
            "total_pnl": total_pnl,
            "total_fees": total_fees,
            "total_wagered": total_wagered,
            "avg_wager": total_wagered / len(trades),
            "avg_win": avg_win,
            "avg_loss": avg_loss,
            "avg_win_pct": avg_win_pct,
            "avg_loss_pct": avg_loss_pct,
            "profit_factor": abs(avg_win / avg_loss) if avg_loss else float("inf"),
            "roi_on_wagered": (total_pnl / total_wagered * 100) if total_wagered else 0,
            "final_capital": self.capital,
        }
