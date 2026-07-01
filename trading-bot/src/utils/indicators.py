"""
Technical indicators — pure numpy/pandas, no external TA library required.
All functions accept pandas Series/DataFrames and return Series.
"""

import pandas as pd
import numpy as np


# ── Trend ─────────────────────────────────────────────────────────────────

def ema(close: pd.Series, period: int) -> pd.Series:
    return close.ewm(span=period, adjust=False).mean()


def sma(close: pd.Series, period: int) -> pd.Series:
    return close.rolling(period).mean()


def macd(close: pd.Series, fast=12, slow=26, signal=9) -> pd.DataFrame:
    fast_ema = ema(close, fast)
    slow_ema = ema(close, slow)
    macd_line = fast_ema - slow_ema
    signal_line = ema(macd_line, signal)
    histogram = macd_line - signal_line
    return pd.DataFrame({"macd": macd_line, "signal": signal_line, "histogram": histogram})


def adx(high: pd.Series, low: pd.Series, close: pd.Series, period=14) -> pd.Series:
    tr = _true_range(high, low, close)
    atr_vals = tr.ewm(span=period, adjust=False).mean()

    up_move = high.diff()
    down_move = -low.diff()

    pos_dm = np.where((up_move > down_move) & (up_move > 0), up_move, 0.0)
    neg_dm = np.where((down_move > up_move) & (down_move > 0), down_move, 0.0)

    pos_dm = pd.Series(pos_dm, index=close.index).ewm(span=period, adjust=False).mean()
    neg_dm = pd.Series(neg_dm, index=close.index).ewm(span=period, adjust=False).mean()

    pdi = 100 * pos_dm / atr_vals
    ndi = 100 * neg_dm / atr_vals
    dx = 100 * np.abs(pdi - ndi) / (pdi + ndi).replace(0, np.nan)
    return dx.ewm(span=period, adjust=False).mean()


def supertrend(
    high: pd.Series, low: pd.Series, close: pd.Series,
    period: int = 10, multiplier: float = 3.0
) -> pd.Series:
    """Returns +1 (bullish) or -1 (bearish) direction."""
    atr_vals = atr(high, low, close, period)
    hl2 = (high + low) / 2
    upper = hl2 + multiplier * atr_vals
    lower = hl2 - multiplier * atr_vals

    direction = pd.Series(1, index=close.index, dtype=float)
    for i in range(1, len(close)):
        if close.iloc[i] > upper.iloc[i - 1]:
            direction.iloc[i] = 1
        elif close.iloc[i] < lower.iloc[i - 1]:
            direction.iloc[i] = -1
        else:
            direction.iloc[i] = direction.iloc[i - 1]
    return direction


# ── Momentum ──────────────────────────────────────────────────────────────

def rsi(close: pd.Series, period: int = 14) -> pd.Series:
    delta = close.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.ewm(com=period - 1, adjust=False).mean()
    avg_loss = loss.ewm(com=period - 1, adjust=False).mean()
    rs = avg_gain / avg_loss.replace(0, np.nan)
    return 100 - (100 / (1 + rs))


def stoch_rsi(close: pd.Series, period=14, smooth1=3, smooth2=3) -> pd.DataFrame:
    rsi_vals = rsi(close, period)
    rsi_min = rsi_vals.rolling(period).min()
    rsi_max = rsi_vals.rolling(period).max()
    raw_k = (rsi_vals - rsi_min) / (rsi_max - rsi_min).replace(0, np.nan)
    k = raw_k.rolling(smooth1).mean() * 100
    d = k.rolling(smooth2).mean()
    return pd.DataFrame({"k": k, "d": d})


def williams_r(high: pd.Series, low: pd.Series, close: pd.Series, period=14) -> pd.Series:
    hh = high.rolling(period).max()
    ll = low.rolling(period).min()
    return -100 * (hh - close) / (hh - ll).replace(0, np.nan)


# ── Volatility ────────────────────────────────────────────────────────────

def _true_range(high: pd.Series, low: pd.Series, close: pd.Series) -> pd.Series:
    prev_close = close.shift(1)
    tr1 = high - low
    tr2 = (high - prev_close).abs()
    tr3 = (low - prev_close).abs()
    return pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)


def atr(high: pd.Series, low: pd.Series, close: pd.Series, period=14) -> pd.Series:
    return _true_range(high, low, close).ewm(span=period, adjust=False).mean()


def bollinger(close: pd.Series, period=20, std=2.0) -> pd.DataFrame:
    mid = close.rolling(period).mean()
    std_dev = close.rolling(period).std()
    upper = mid + std * std_dev
    lower = mid - std * std_dev
    width = (upper - lower) / mid.replace(0, np.nan)
    pct_b = (close - lower) / (upper - lower).replace(0, np.nan)
    return pd.DataFrame({"upper": upper, "mid": mid, "lower": lower, "width": width, "pct_b": pct_b})


def keltner(high: pd.Series, low: pd.Series, close: pd.Series, period=20, atr_mult=2.0) -> pd.DataFrame:
    mid = ema(close, period)
    atr_vals = atr(high, low, close, period)
    return pd.DataFrame({
        "upper": mid + atr_mult * atr_vals,
        "mid": mid,
        "lower": mid - atr_mult * atr_vals,
    })


# ── Volume ────────────────────────────────────────────────────────────────

def obv(close: pd.Series, volume: pd.Series) -> pd.Series:
    direction = np.sign(close.diff()).fillna(0)
    return (direction * volume).cumsum()


def vwap(high: pd.Series, low: pd.Series, close: pd.Series, volume: pd.Series) -> pd.Series:
    typical = (high + low + close) / 3
    return (typical * volume).cumsum() / volume.cumsum()


def money_flow_index(
    high: pd.Series, low: pd.Series, close: pd.Series,
    volume: pd.Series, period=14
) -> pd.Series:
    typical = (high + low + close) / 3
    raw_mf = typical * volume
    pos_mf = raw_mf.where(typical > typical.shift(1), 0.0)
    neg_mf = raw_mf.where(typical < typical.shift(1), 0.0)
    pos_sum = pos_mf.rolling(period).sum()
    neg_sum = neg_mf.rolling(period).sum()
    mfr = pos_sum / neg_sum.replace(0, np.nan)
    return 100 - (100 / (1 + mfr))


# ── Market-structure helpers ───────────────────────────────────────────────

def pivot_highs(close: pd.Series, left=5, right=5) -> pd.Series:
    result = pd.Series(False, index=close.index)
    arr = close.values
    for i in range(left, len(arr) - right):
        if arr[i] == arr[i - left: i + right + 1].max():
            result.iloc[i] = True
    return result


def pivot_lows(close: pd.Series, left=5, right=5) -> pd.Series:
    result = pd.Series(False, index=close.index)
    arr = close.values
    for i in range(left, len(arr) - right):
        if arr[i] == arr[i - left: i + right + 1].min():
            result.iloc[i] = True
    return result


def higher_highs_higher_lows(close: pd.Series, lookback=20) -> pd.Series:
    def _classify(window):
        mid = len(window) // 2
        first_half = window[:mid]
        second_half = window[mid:]
        if second_half.max() > first_half.max() and second_half.min() > first_half.min():
            return 1
        if second_half.max() < first_half.max() and second_half.min() < first_half.min():
            return -1
        return 0
    return close.rolling(lookback).apply(_classify, raw=False)


def volume_surge(volume: pd.Series, period=20, threshold=2.0) -> pd.Series:
    avg = volume.rolling(period).mean()
    return volume > avg * threshold
