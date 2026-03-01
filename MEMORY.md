# ARR_Bot Memory

## Setup
- Dashboard: http://192.168.1.146:4000
- DB: /data/dashboard.db (NOT /tmp - persistent across restarts)
- Container: arr-dashboard

## John's Preferences
- Ideas → kanban queue
- PRs for GitHub changes
- WhatsApp for communication
- **ALWAYS backup before dashboard changes**:
  - `cp index.html index.html.backup-$(date +%Y%m%d-%H%M)`
  - `cp dashboard.db dashboard.db.backup-$(date +%Y%m%d-%H%M)`

## Active Cron Jobs
- Update Cron Jobs List: every 5 min
- GitHub Repo Review: hourly
- Daily Review: 23:00 daily

## Key Patterns & Learnings
- **Never restore database to fix UI issues** - debug actual issue instead
- Use Chrome DevTools MCP for dashboard debugging
- Kanban ideas column works well as task capture
- X Growth: use cumulative totals from API, not daily isolated stats

## X Growth Project
- Account: @MyNewClawBot
- Bot: /home/john/.openclaw/workspace/x_growth/x_growth_bot.js
- Phase B (Days 4-14): 5 posts, 10 replies, 8 follows, 25 likes/day

## Known Issues
- Gmail OAuth expired - needs re-auth
- Exec tool can hang after system compaction
