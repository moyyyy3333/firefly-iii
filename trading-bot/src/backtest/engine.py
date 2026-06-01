"""
Event-driven backtester.

Iterates bar-by-bar so stop/target hits on the same bar as entry are possible.
Applies realistic assumptions: 0.1% slippage, no lookahead bias.
"""

import pandas as pd
import numpy as np
from copy import deepcopy
from dataclasses import dataclass
from typing import Optional

from src.strategies.base import BaseStrategy, Signal
from src.risk.manager import RiskManager, Position
from config.settings import (
    STARTING_CAPITAL,
    MAX_RISK_PER_TRADE,
    MAX_OPEN_POSITIONS,
    DEFAULT_STOP_LOSS_PCT,
    DEFAULT_TAKE_PROFIT_PCT,
    TRAILING_STOP_PCT,
)

SLIPPAGE = 0.001      # 0.1% slippage on each fill
COMMISSION = 0.001    # 0.1% round-trip


@dataclass
class BacktestResult:
    symbol: str
    strategy: str
    trades: int
    wins: int
    losses: int
    win_rate: float
    total_pnl: float
    total_return_pct: float
    profit_factor: float
    max_drawdown_pct: float
    sharpe_ratio: float
    avg_win: float
    avg_loss: float
    final_capital: float
    equity_curve: pd.Series
    trade_log: list

    def print_summary(self):
        print(f"\n{'='*60}")
        print(f"  {self.strategy.upper()} | {self.symbol}")
        print(f"{'='*60}")
        print(f"  Trades:         {self.trades}")
        print(f"  Win Rate:       {self.win_rate*100:.1f}%")
        print(f"  Total Return:   {self.total_return_pct:.1f}%")
        print(f"  Total P&L:      ${self.total_pnl:,.2f}")
        print(f"  Profit Factor:  {self.profit_factor:.2f}x")
        print(f"  Max Drawdown:   {self.max_drawdown_pct:.1f}%")
        print(f"  Sharpe Ratio:   {self.sharpe_ratio:.2f}")
        print(f"  Avg Win:        ${self.avg_win:,.2f}")
        print(f"  Avg Loss:       ${self.avg_loss:,.2f}")
        print(f"  Final Capital:  ${self.final_capital:,.2f}")
        print(f"{'='*60}\n")


class BacktestEngine:
    def __init__(
        self,
        strategy: BaseStrategy,
        starting_capital: float = STARTING_CAPITAL,
        slippage: float = SLIPPAGE,
        commission: float = COMMISSION,
        trailing_stop_pct: Optional[float] = TRAILING_STOP_PCT,
    ):
        self.strategy = strategy
        self.starting_capital = starting_capital
        self.slippage = slippage
        self.commission = commission
        self.trailing_stop_pct = trailing_stop_pct

    def run(self, df: pd.DataFrame, symbol: str) -> BacktestResult:
        rm = RiskManager(
            capital=self.starting_capital,
            max_risk_pct=MAX_RISK_PER_TRADE,
            max_open_positions=MAX_OPEN_POSITIONS,
        )

        # Re-generate bar-by-bar for proper event simulation (no lookahead)
        equity_curve = []

        rm2 = RiskManager(
            capital=self.starting_capital,
            max_risk_pct=MAX_RISK_PER_TRADE,
            max_open_positions=MAX_OPEN_POSITIONS,
        )

        for i in range(len(df)):
            bar = df.iloc[i]
            date_str = str(df.index[i].date()) if hasattr(df.index[i], "date") else str(df.index[i])

            # Evaluate open positions against today's bar
            for pos in list(rm2.open_positions):
                rm2.evaluate_position(
                    pos,
                    high=bar["high"],
                    low=bar["low"],
                    close=bar["close"],
                    date=date_str,
                    trail_pct=self.trailing_stop_pct,
                )

            # Check for new signals on the slice up to and including bar i
            # Use only data up to bar i to prevent lookahead
            if i >= 230:
                slice_df = df.iloc[:i + 1]
                slice_signals = self.strategy.generate_signals(slice_df, symbol)

                # Only process the LAST signal (the one from bar i)
                if slice_signals:
                    latest_sig = slice_signals[-1]
                    if latest_sig.direction in ("long", "short") and rm2.can_open():
                        entry_with_slip = latest_sig.entry_price * (
                            1 + self.slippage if latest_sig.direction == "long"
                            else 1 - self.slippage
                        )
                        cost = entry_with_slip * COMMISSION
                        rm2.capital -= cost
                        rm2.open_position(
                            symbol=symbol,
                            price=entry_with_slip,
                            stop_loss=latest_sig.stop_loss,
                            take_profit=latest_sig.take_profit,
                            side=latest_sig.direction,
                            date=date_str,
                        )

            equity_curve.append(rm2.capital + sum(
                (bar["close"] - p.entry_price) * p.size
                if p.side == "long"
                else (p.entry_price - bar["close"]) * p.size
                for p in rm2.open_positions
            ))

        # Close any remaining positions at last bar's close
        last_bar = df.iloc[-1]
        last_date = str(df.index[-1].date()) if hasattr(df.index[-1], "date") else str(df.index[-1])
        rm2.force_close_all({symbol: last_bar["close"]}, last_date)

        equity_series = pd.Series(equity_curve, index=df.index)
        summary = rm2.summary()

        return BacktestResult(
            symbol=symbol,
            strategy=self.strategy.name,
            trades=summary.get("trades", 0),
            wins=summary.get("wins", 0),
            losses=summary.get("losses", 0),
            win_rate=summary.get("win_rate", 0),
            total_pnl=summary.get("total_pnl", 0),
            total_return_pct=(summary.get("total_pnl", 0) / self.starting_capital) * 100,
            profit_factor=summary.get("profit_factor", 0),
            max_drawdown_pct=self._max_drawdown(equity_series),
            sharpe_ratio=self._sharpe(equity_series),
            avg_win=summary.get("avg_win", 0),
            avg_loss=summary.get("avg_loss", 0),
            final_capital=summary.get("final_capital", self.starting_capital),
            equity_curve=equity_series,
            trade_log=rm2.trade_log,
        )

    def _max_drawdown(self, equity: pd.Series) -> float:
        peak = equity.cummax()
        drawdown = (equity - peak) / peak
        return drawdown.min() * 100

    def _sharpe(self, equity: pd.Series, risk_free: float = 0.05) -> float:
        returns = equity.pct_change().dropna()
        if returns.std() == 0:
            return 0
        # Annualised assuming daily bars
        excess = returns.mean() * 252 - risk_free
        return excess / (returns.std() * np.sqrt(252))
