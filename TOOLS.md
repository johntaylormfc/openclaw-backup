# TOOLS.md - Local Notes

Environment-specific config. Keep skills separate.

## Chrome DevTools MCP
- **Use for:** Dashboard testing, debugging UI issues, clicking buttons
- **How:** 
  1. Start: `browser action=start profile=chrome` (or use relay)
  2. Take snapshot: `browser action=snapshot`
  3. Click: `browser action=act request='{"kind":"click","ref":"e20"}'`
- **Always use** when testing/fixing dashboard issues

## Ollama (Local LLM)

## TTS
- Preferred voice: "Nova"

## Dashboard
- URL: http://192.168.1.146:4000
- DB: /data/dashboard.db (NOT /tmp - persistent across restarts)
- Container: arr-dashboard

## X Growth Bot
- Location: /home/john/.openclaw/workspace/x_growth/x_growth_bot.js
- Auth: /home/john/.openclaw/workspace/x_growth/.x_auth.json
- Tracking: /home/john/.openclaw/workspace/x_growth/x_engagement_tracking.md
- Metrics log: /home/john/.openclaw/workspace/x_growth/x_metrics_log.csv
- Commands:
  - `node x_growth_bot.js metrics` - real-time X API stats
  - `node x_growth_bot.js status` - daily limits progress
  - `node x_growth_bot.js run` - scheduled content

## Crypto Bot
- Sync cron job syncs crypto.json to dashboard container
- Logs at: /tmp/crypto.json
