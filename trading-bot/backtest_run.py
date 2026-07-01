"""
Run historical backtests across multiple strategies and symbols.

Usage:
  python backtest_run.py                          # default symbols, all strategies
  python backtest_run.py --symbols BTC-USD ETH-USD
  python backtest_run.py --strategy momentum
  python backtest_run.py --start 2015-01-01 --end 2024-01-01
"""

import sys
import argparse
sys.path.insert(0, ".")

from config.settings import (
    BACKTEST_START, BACKTEST_END,
    CRYPTO_SYMBOLS, STOCK_SYMBOLS, STARTING_CAPITAL,
    MIN_WAGER, MAX_WAGER,
)
from src.data.fetcher import fetch_ohlcv
from src.strategies import MomentumStrategy, MeanReversionStrategy, TrendFollowingStrategy
from src.backtest import BacktestEngine, print_comparison_table, plot_equity_curves, print_market_patterns


STRATEGIES = {
    "momentum": MomentumStrategy(),
    "mean_reversion": MeanReversionStrategy(),
    "trend_following": TrendFollowingStrategy(),
}


def main():
    parser = argparse.ArgumentParser(description="Trading Bot Backtester")
    parser.add_argument("--symbols", nargs="+", default=["BTC-USD", "SPY", "QQQ", "ETH-USD"])
    parser.add_argument("--strategy", choices=list(STRATEGIES.keys()) + ["all"], default="all")
    parser.add_argument("--start", default=BACKTEST_START)
    parser.add_argument("--end", default=BACKTEST_END)
    parser.add_argument("--capital", type=float, default=STARTING_CAPITAL)
    parser.add_argument("--min-wager", type=float, default=MIN_WAGER, help="Min wager per trade ($)")
    parser.add_argument("--max-wager", type=float, default=MAX_WAGER, help="Max wager per trade ($)")
    parser.add_argument("--plot", action="store_true", help="Save equity curve chart")
    parser.add_argument("--patterns", action="store_true", help="Print documented market patterns")
    args = parser.parse_args()

    if args.patterns:
        print_market_patterns([])

    strategies_to_run = (
        list(STRATEGIES.values())
        if args.strategy == "all"
        else [STRATEGIES[args.strategy]]
    )

    print(f"\n  Fetching data for {len(args.symbols)} symbol(s)...")
    data = {}
    for sym in args.symbols:
        try:
            data[sym] = fetch_ohlcv(sym, args.start, args.end)
            print(f"  ✓ {sym}: {len(data[sym])} bars ({args.start} → {args.end})")
        except Exception as e:
            print(f"  ✗ {sym}: {e}")

    if not data:
        print("No data fetched. Check your symbols and network connection.")
        sys.exit(1)

    all_results = []
    for strategy in strategies_to_run:
        for symbol, df in data.items():
            print(f"\n  Running {strategy.name} on {symbol}...")
            try:
                engine = BacktestEngine(
                    strategy,
                    starting_capital=args.capital,
                    min_wager=args.min_wager,
                    max_wager=args.max_wager,
                )
                result = engine.run(df, symbol)
                result.print_summary()
                all_results.append(result)
            except Exception as e:
                print(f"  Error: {e}")
                import traceback
                traceback.print_exc()

    if len(all_results) > 1:
        print_comparison_table(all_results)

    if args.plot and all_results:
        plot_equity_curves(all_results, output_dir="./charts")

    # Print honest performance summary
    print("  PERFORMANCE NOTE:")
    print("  Win rate alone is misleading. A 55% win rate with 2:1 R/R")
    print("  = profitable. An 80% win rate with 0.5:1 R/R = losing money.")
    print("  Focus on profit factor (>1.5 is good) and Sharpe ratio (>1.0).")
    print("  Past performance ≠ future results. Always paper trade first.\n")


if __name__ == "__main__":
    main()
