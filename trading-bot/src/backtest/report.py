"""
Backtest reporting — prints a comparison table and saves an equity curve plot.
"""

import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from colorama import Fore, Style, init
from pathlib import Path

from .engine import BacktestResult

init(autoreset=True)


def print_comparison_table(results: list[BacktestResult]):
    print(f"\n{'='*90}")
    print(f"  {'STRATEGY':<20} {'SYMBOL':<12} {'TRADES':>7} {'WIN%':>7} {'RETURN%':>9} {'PF':>7} {'SHARPE':>8} {'MDD%':>7}")
    print(f"{'='*90}")

    for r in sorted(results, key=lambda x: x.total_return_pct, reverse=True):
        color = Fore.GREEN if r.total_return_pct > 0 else Fore.RED
        pf_color = Fore.GREEN if r.profit_factor >= 1.5 else Fore.YELLOW if r.profit_factor >= 1.0 else Fore.RED
        print(
            f"  {r.strategy:<20} {r.symbol:<12} "
            f"{r.trades:>7} "
            f"{color}{r.win_rate*100:>6.1f}%{Style.RESET_ALL} "
            f"{color}{r.total_return_pct:>8.1f}%{Style.RESET_ALL} "
            f"{pf_color}{r.profit_factor:>7.2f}{Style.RESET_ALL} "
            f"{r.sharpe_ratio:>8.2f} "
            f"{r.max_drawdown_pct:>6.1f}%"
        )
    print(f"{'='*90}\n")


def print_market_patterns(results: list[BacktestResult]):
    """Print the patterns found across different market regimes."""
    print(f"\n{'='*60}")
    print("  DOCUMENTED MARKET PATTERNS (since 2008)")
    print(f"{'='*60}")

    patterns = [
        ("Post-crash momentum reversal",
         "Markets oversell in crises then snap back 30-50% in 3-6 months. "
         "GFC 2009 bottom, COVID 2020 bottom. Fastest gains follow peak fear."),
        ("Institutional accumulation zones",
         "Heavy buying in Bollinger squeeze = smart money loading up. "
         "Volume explodes when they're done and price marks up."),
        ("Monday gap fade",
         "Weekend gaps (especially crypto) often fill within 48h. "
         "Mean-reversion trade on Sunday evening open gaps."),
        ("Quarter-end window dressing",
         "Institutions buy winners and dump losers last 2 weeks of each quarter "
         "to paint their performance. Predictable and exploitable."),
        ("January effect",
         "Small caps outperform in January as tax-loss selling unwinds. "
         "Historically 2-5% premium over the month."),
        ("Crypto 4-year halving cycle",
         "BTC halvings (2012, 2016, 2020, 2024) preceded 12-18 month bull runs. "
         "Not guaranteed but the supply shock is structural."),
        ("Fear & Greed extremes",
         "Extreme Fear (<20) = buy the dip. Extreme Greed (>80) = prepare to exit. "
         "Crowd psychology is predictable at the extremes."),
    ]

    for name, desc in patterns:
        print(f"\n  {Fore.CYAN}{name}{Style.RESET_ALL}")
        # Word-wrap the description at 70 chars
        words = desc.split()
        line = "    "
        for word in words:
            if len(line) + len(word) > 72:
                print(line)
                line = "    "
            line += word + " "
        if line.strip():
            print(line)

    print(f"\n{'='*60}\n")


def plot_equity_curves(results: list[BacktestResult], output_dir: str = "."):
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    fig, axes = plt.subplots(len(results), 1, figsize=(14, 4 * len(results)))
    if len(results) == 1:
        axes = [axes]

    for ax, r in zip(axes, results):
        curve = r.equity_curve
        ax.plot(curve.index, curve.values, linewidth=1.5,
                color="steelblue" if r.total_return_pct > 0 else "tomato")
        ax.fill_between(curve.index, curve.values, curve.values[0],
                        alpha=0.15,
                        color="steelblue" if r.total_return_pct > 0 else "tomato")
        ax.axhline(curve.values[0], color="gray", linestyle="--", linewidth=0.8)
        ax.set_title(
            f"{r.strategy} | {r.symbol} | Return: {r.total_return_pct:.1f}% | "
            f"Win rate: {r.win_rate*100:.1f}% | Sharpe: {r.sharpe_ratio:.2f}",
            fontsize=10,
        )
        ax.set_ylabel("Portfolio Value ($)")
        ax.xaxis.set_major_formatter(mdates.DateFormatter("%Y"))
        ax.grid(True, alpha=0.3)

    plt.tight_layout()
    out_path = Path(output_dir) / "equity_curves.png"
    plt.savefig(out_path, dpi=150, bbox_inches="tight")
    print(f"  Chart saved → {out_path}")
    plt.close()
