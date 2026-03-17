# Crypto Trading Bot Plan

## Overview
Create an autonomous crypto trading bot similar to the stock bot, using Coinbase Advanced Trade API with paper trading (sandbox mode).

---

## Platform Choice

### **Simulated Paper Trading** (Using yfinance)
- ✅ Free market data (no API keys needed)
- ✅ Real-time prices
- ✅ Full control over simulation
- ✅ Works immediately
- ⚠️ No real order execution (simulated portfolio)

### Alternatives (for later)
- **Coinbase Advanced Trade**: Sandbox has limited data
- **Binance Testnet**: Requires API keys from testnet.binancefuture.com

---

## Bot Architecture

### File Structure
```
/home/john/.openclaw/workspaces/CRYPTO_Trader/
├── crypto_bot.py          # Main trading bot
├── watchdog.py            # Auto-restart if stuck
├── backtest.py            # Historical testing
├── requirements.txt       # Dependencies
└── logs/
    ├── trading_YYYYMMDD.log
    ├── metrics.json       # Performance tracking
    └── trades.csv
```

### Dependencies
```
coinbase-advancedtrade-python
pandas
numpy
requests
```

---

## Strategy (Based on Research)

### Initial Strategy: RSI + MACD + Volume
Same proven approach as stock bot, adapted for crypto:

1. **RSI(14)** - Buy below 35, sell above 65
2. **MACD(12,26,9)** - Confirm momentum
3. **Volume filter** - Confirm moves with volume
4. **Daily trend** - Only trade with daily trend

### Key Differences from Stocks
- **24/7 market** - Check every 5 minutes (like stocks)
- **Higher volatility** - Wider stops needed
- **More pairs** - Can diversify across many cryptos
- **No market hours** - Always active

---

## Risk Management (Crypto-Adapted)

| Parameter | Stock Bot | Crypto Bot |
|-----------|-----------|------------|
| Stop Loss | 3% | 5% (more volatile) |
| Take Profit | 15% | 20% |
| Max Position | 10% | 8% (more volatile) |
| Max Exposure | 80% | 60% |
| Drawdown Pause | 10% | 15% |
| Drawdown Stop | 20% | 25% |

---

## Symbols to Trade

### Tier 1 - High Liquidity
BTC-USD, ETH-USD, SOL-USD, XRP-USD, ADA-USD

### Tier 2 - Mid Cap
DOGE-USD, DOT-USD, MATIC-USD, LINK-USD, AVAX-USD

### Tier 3 - Altcoins (Later)
Add after testing: 20-30 symbols

---

## Autonomous Learning Features

### 1. Parameter Optimization
- Test RSI variations (10, 14, 21)
- Test MACD variations (8/17/9, 12/26/9)
- Track which work best

### 2. Symbol Performance Tracking
- Track win rate per symbol
- Favor best-performing pairs

### 3. Strategy Switching
- Detect market regime (trending vs ranging)
- Switch between momentum/mean reversion

### 4. Weekly Review
- Analyze week's trades
- Auto-suggest parameter tweaks

---

## Dashboard Integration

### New Section: "Crypto Trading"
- Portfolio value (paper $100k start)
- Current positions
- Today's trades
- Performance metrics (same as stocks)

### Dashboard Updates
- Add crypto.json to dashboard sync
- New tab/section for crypto

---

## Implementation Phases

### Phase 1: Basic Bot (This Week)
- [ ] Get Coinbase API keys (sandbox)
- [ ] Set up project structure
- [ ] Connect to sandbox API
- [ ] Basic RSI + MACD strategy
- [ ] Position management
- [ ] Logging & metrics

### Phase 2: Enhancements (Next Week)
- [ ] Add volume filters
- [ ] Add daily trend filter
- [ ] Implement stop loss/take profit
- [ ] Add to dashboard

### Phase 3: Autonomous Learning (Month 1)
- [ ] Parameter optimization runner
- [ ] Symbol performance tracking
- [ ] Weekly auto-review

---

## Estimated Timeline

| Phase | Effort | Duration |
|-------|--------|----------|
| Phase 1 | Setup + basic bot | 1-2 days |
| Phase 2 | Enhancements | 2-3 days |
| Phase 3 | Learning features | 1 week |
| Testing | Paper trading | 2-4 weeks |

---

## Next Steps

1. **Generate Coinbase API keys** (sandbox/testnet)
2. **Install dependencies**
3. **Create bot structure**
4. **Run basic test**

Do you want me to proceed with Phase 1?
