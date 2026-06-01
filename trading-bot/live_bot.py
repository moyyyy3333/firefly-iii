"""
Live / Paper trading bot — runs on a schedule, checks current signals,
logs to console and trades.json.

Usage (paper mode, default):
  python live_bot.py

Usage (live, requires API keys in .env):
  PAPER_TRADING=false python live_bot.py

Runs once then exits — schedule via cron or a systemd timer:
  # Daily at market open (9:35 AM ET):
  35 9 * * 1-5 cd /path/to/trading-bot && python live_bot.py >> bot.log 2>&1
"""

import sys
import json
import time
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, ".")

from config.settings import (
    PAPER_TRADING, STARTING_CAPITAL, MIN_WAGER, MAX_WAGER,
    CRYPTO_SYMBOLS, STOCK_SYMBOLS,
)
from src.data.fetcher import fetch_ohlcv, fetch_fear_greed
from src.strategies import MomentumStrategy, MeanReversionStrategy, TrendFollowingStrategy
from src.strategies.regime_filter import RegimeFilter
from src.risk.manager import RiskManager

WATCHLIST = ["BTC-USD", "ETH-USD", "SPY", "QQQ", "AAPL", "NVDA"]
STATE_FILE = Path("paper_positions.json")
LOG_FILE = Path("trades.json")

# Lookback window for signal generation
LOOKBACK_DAYS = 400


def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"capital": STARTING_CAPITAL, "positions": [], "trade_log": []}


def save_state(state: dict):
    STATE_FILE.write_text(json.dumps(state, indent=2, default=str))


def log_trade(trade: dict):
    log = []
    if LOG_FILE.exists():
        log = json.loads(LOG_FILE.read_text())
    log.append(trade)
    LOG_FILE.write_text(json.dumps(log, indent=2, default=str))


def run():
    now = datetime.now(timezone.utc).isoformat()
    print(f"\n{'='*60}")
    print(f"  Trading Bot {'[PAPER]' if PAPER_TRADING else '[LIVE]'} — {now}")
    print(f"{'='*60}\n")

    state = load_state()
    capital = state["capital"]
    print(f"  Capital: ${capital:,.2f}")

    # Sentiment filter — avoid longs when greed is extreme
    fg = fetch_fear_greed()
    if fg:
        val = fg["current_value"]
        label = fg["current_label"]
        print(f"  Fear & Greed: {val} ({label})")
        if val >= 80:
            print("  ⚠ Extreme Greed — reducing long signals")
        elif val <= 20:
            print("  ⚠ Extreme Fear — potential buy opportunity (confirm with price action)")

    strategies = [
        MomentumStrategy(),
        MeanReversionStrategy(),
        TrendFollowingStrategy(),
    ]

    all_signals = []

    for symbol in WATCHLIST:
        print(f"\n  Analyzing {symbol}...")
        try:
            from datetime import timedelta, date
            end = date.today().isoformat()
            start = (date.today() - timedelta(days=LOOKBACK_DAYS)).isoformat()
            df = fetch_ohlcv(symbol, start, end)

            if len(df) < 230:
                print(f"    Not enough data ({len(df)} bars)")
                continue

            # Regime filter
            regime_filter = RegimeFilter(df)
            current_regime = regime_filter.regime(len(df) - 1)
            print(f"    Regime: {current_regime}")

            for strategy in strategies:
                signals = strategy.generate_signals(df, symbol)
                if signals:
                    latest = signals[-1]
                    # Filter by regime
                    if latest.direction == "long" and current_regime == "trending_down":
                        continue
                    if latest.direction == "short" and current_regime == "trending_up":
                        continue
                    # Apply greed filter
                    if fg and fg["current_value"] >= 80 and latest.direction == "long":
                        continue

                    from src.risk.manager import RiskManager as _RM
                    tier = _RM.wager_tier(latest.confidence)
                    print(f"    [{strategy.name}] {latest.direction.upper()} signal — "
                          f"entry: ${latest.entry_price:.2f}, "
                          f"stop: ${latest.stop_loss:.2f}, "
                          f"target: ${latest.take_profit:.2f} | "
                          f"bet size: {tier} (confidence {latest.confidence:.0%}) | "
                          f"{latest.reason}")
                    all_signals.append({
                        "symbol": symbol,
                        "strategy": strategy.name,
                        "direction": latest.direction,
                        "entry": latest.entry_price,
                        "stop": latest.stop_loss,
                        "target": latest.take_profit,
                        "confidence": latest.confidence,
                        "reason": latest.reason,
                        "regime": current_regime,
                        "timestamp": now,
                    })
        except Exception as e:
            print(f"    Error: {e}")
            continue

    # --- Paper trading execution -------------------------------------------
    if all_signals and PAPER_TRADING:
        rm = RiskManager(
            capital=capital,
            min_wager=MIN_WAGER,
            max_wager=MAX_WAGER,
            max_open_positions=5,
        )
        # Restore open positions
        for p_data in state.get("positions", []):
            from src.risk.manager import Position
            pos = Position(**p_data)
            rm.open_positions.append(pos)

        print(f"\n  Processing {len(all_signals)} signal(s)...")

        for sig in sorted(all_signals, key=lambda x: x["confidence"], reverse=True):
            if sig["direction"] == "exit":
                # Close any open position for this symbol
                for pos in list(rm.open_positions):
                    if pos.symbol == sig["symbol"] and not pos.closed:
                        from src.data.fetcher import fetch_ohlcv
                        rm.close_position(pos, sig["entry"], now, "signal_exit")
                        print(f"  ✗ CLOSED {pos.symbol} on exit signal @ ${sig['entry']:.2f} | pnl=${pos.pnl:.2f}")
                        log_trade({**sig, "action": "exit", "pnl": pos.pnl})

            elif sig["direction"] in ("long", "short"):
                pos = rm.open_position(
                    symbol=sig["symbol"],
                    price=sig["entry"],
                    stop_loss=sig["stop"],
                    take_profit=sig["target"],
                    side=sig["direction"],
                    date=now,
                    confidence=sig.get("confidence", 1.0),
                )
                if pos:
                    print(f"  ✓ OPENED {sig['direction'].upper()} {sig['symbol']} "
                          f"wager=${pos.wager:.2f} × {pos.size:.6f} units @ ${pos.entry_price:.2f} "
                          f"| stop=${pos.stop_loss:.2f} target=${pos.take_profit:.2f}")
                    log_trade({**sig, "action": "open", "size": pos.size, "wager": pos.wager})

        # Save updated state — include all Position fields so restore works
        state["capital"] = rm.capital
        state["positions"] = [
            {
                "symbol": p.symbol,
                "entry_price": p.entry_price,
                "stop_loss": p.stop_loss,
                "take_profit": p.take_profit,
                "size": p.size,
                "wager": p.wager,          # required — was missing, caused TypeError on reload
                "side": p.side,
                "entry_date": p.entry_date,
                "fees": p.fees,
                "pnl": p.pnl,
                "closed": p.closed,
                "exit_price": p.exit_price,
                "exit_date": p.exit_date,
                "trailing_stop": p.trailing_stop,
            }
            for p in rm.open_positions
        ]
        save_state(state)

    if not all_signals:
        print("\n  No actionable signals today — holding cash.")

    print(f"\n  Open positions: {len(state.get('positions', []))}")
    print(f"  Capital: ${state['capital']:,.2f}\n")


if __name__ == "__main__":
    run()
