"""
Event-driven backtester — fixed wager model.

Each trade places a fixed dollar wager (min_wager–max_wager).
Applies realistic assumptions: 0.1% slippage, commission handled by RiskManager.
No lookahead bias — signals only see data up to bar i.
"""

import pandas as pd
import numpy as np
from dataclasses import dataclass
from typing import Optional

from src.strategies.base import BaseStrategy, Signal
from src.risk.manager import RiskManager, Position
from config.settings import (
    STARTING_CAPITAL,
    MIN_WAGER,
    MAX_WAGER,
    MAX_OPEN_POSITIONS,
    TRAILING_STOP_PCT,
)

SLIPPAGE = 0.001      # 0.1% slippage on each fill
COMMISSION = 0.001    # 0.1% per fill, passed into RiskManager


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
    avg_win_pct: float
    avg_loss_pct: float
    avg_wager: float
    total_fees: float
    roi_on_wagered: float
    final_capital: float
    equity_curve: pd.Series
    trade_log: list

    def print_summary(self):
        print(f"\n{'='*60}")
        print(f"  {self.strategy.upper()} | {self.symbol}")
        print(f"{'='*60}")
        print(f"  Trades:           {self.trades}")
        print(f"  Win Rate:         {self.win_rate*100:.1f}%")
        print(f"  Avg Wager:        ${self.avg_wager:.2f}")
        print(f"  Avg Win:          ${self.avg_win:.2f}  ({self.avg_win_pct:.1f}% on wager)")
        print(f"  Avg Loss:         ${self.avg_loss:.2f}  ({self.avg_loss_pct:.1f}% on wager)")
        print(f"  Profit Factor:    {self.profit_factor:.2f}x")
        print(f"  Total Fees:       ${self.total_fees:.2f}")
        print(f"  ROI on wagered:   {self.roi_on_wagered:.1f}%")
        print(f"  Total P&L (net):  ${self.total_pnl:,.2f}")
        print(f"  Total Return:     {self.total_return_pct:.1f}%")
        print(f"  Max Drawdown:     {self.max_drawdown_pct:.1f}%")
        print(f"  Sharpe Ratio:     {self.sharpe_ratio:.2f}")
        print(f"  Final Capital:    ${self.final_capital:,.2f}")
        print(f"{'='*60}\n")


class BacktestEngine:
    def __init__(
        self,
        strategy: BaseStrategy,
        starting_capital: float = STARTING_CAPITAL,
        min_wager: float = MIN_WAGER,
        max_wager: float = MAX_WAGER,
        slippage: float = SLIPPAGE,
        commission: float = COMMISSION,
        trailing_stop_pct: Optional[float] = TRAILING_STOP_PCT,
    ):
        self.strategy = strategy
        self.starting_capital = starting_capital
        self.min_wager = min_wager
        self.max_wager = max_wager
        self.slippage = slippage
        self.commission = commission
        self.trailing_stop_pct = trailing_stop_pct

    def run(self, df: pd.DataFrame, symbol: str) -> BacktestResult:
        rm = RiskManager(
            capital=self.starting_capital,
            min_wager=self.min_wager,
            max_wager=self.max_wager,
            max_open_positions=MAX_OPEN_POSITIONS,
            commission=self.commission,
        )

        equity_curve = []

        for i in range(len(df)):
            bar = df.iloc[i]
            date_str = str(df.index[i].date()) if hasattr(df.index[i], "date") else str(df.index[i])

            # Evaluate open positions against today's bar first
            for pos in list(rm.open_positions):
                rm.evaluate_position(
                    pos,
                    high=bar["high"],
                    low=bar["low"],
                    close=bar["close"],
                    date=date_str,
                    trail_pct=self.trailing_stop_pct,
                )

            # Generate signals using only data up to bar i (no lookahead)
            if i >= 230:
                slice_df = df.iloc[:i + 1]
                slice_signals = self.strategy.generate_signals(slice_df, symbol)

                if slice_signals:
                    latest_sig = slice_signals[-1]

                    if latest_sig.direction == "exit":
                        # Close all open positions for this symbol on exit signal
                        exit_price = bar["close"] * (1 - self.slippage)
                        for pos in list(rm.open_positions):
                            if pos.symbol == symbol and not pos.closed:
                                rm.close_position(pos, exit_price, date_str, "signal_exit")

                    elif latest_sig.direction in ("long", "short") and rm.can_open():
                        entry_with_slip = latest_sig.entry_price * (
                            1 + self.slippage if latest_sig.direction == "long"
                            else 1 - self.slippage
                        )
                        # Commission is handled inside open_position; no double-deduction
                        rm.open_position(
                            symbol=symbol,
                            price=entry_with_slip,
                            stop_loss=latest_sig.stop_loss,
                            take_profit=latest_sig.take_profit,
                            side=latest_sig.direction,
                            date=date_str,
                            confidence=latest_sig.confidence,
                        )

            # Mark-to-market equity: free cash + deployed wagers + unrealised P&L
            unrealised = sum(
                (bar["close"] - p.entry_price) * p.size if p.side == "long"
                else (p.entry_price - bar["close"]) * p.size
                for p in rm.open_positions
            )
            deployed = sum(p.wager for p in rm.open_positions)
            equity_curve.append(rm.capital + deployed + unrealised)

        # Close remaining positions at final bar
        last_bar = df.iloc[-1]
        last_date = str(df.index[-1].date()) if hasattr(df.index[-1], "date") else str(df.index[-1])
        rm.force_close_all({symbol: last_bar["close"]}, last_date)

        equity_series = pd.Series(equity_curve, index=df.index)
        s = rm.summary()

        return BacktestResult(
            symbol=symbol,
            strategy=self.strategy.name,
            trades=s.get("trades", 0),
            wins=s.get("wins", 0),
            losses=s.get("losses", 0),
            win_rate=s.get("win_rate", 0),
            total_pnl=s.get("total_pnl", 0),
            total_return_pct=(s.get("total_pnl", 0) / self.starting_capital) * 100,
            profit_factor=s.get("profit_factor", 0),
            max_drawdown_pct=self._max_drawdown(equity_series),
            sharpe_ratio=self._sharpe(equity_series),
            avg_win=s.get("avg_win", 0),
            avg_loss=s.get("avg_loss", 0),
            avg_win_pct=s.get("avg_win_pct", 0),
            avg_loss_pct=s.get("avg_loss_pct", 0),
            avg_wager=s.get("avg_wager", 0),
            total_fees=s.get("total_fees", 0),
            roi_on_wagered=s.get("roi_on_wagered", 0),
            final_capital=s.get("final_capital", self.starting_capital),
            equity_curve=equity_series,
            trade_log=rm.trade_log,
        )

    def _max_drawdown(self, equity: pd.Series) -> float:
        peak = equity.cummax()
        drawdown = (equity - peak) / peak
        return drawdown.min() * 100

    def _sharpe(self, equity: pd.Series, risk_free: float = 0.05) -> float:
        returns = equity.pct_change().dropna()
        if returns.std() == 0:
            return 0
        excess = returns.mean() * 252 - risk_free
        return excess / (returns.std() * np.sqrt(252))
