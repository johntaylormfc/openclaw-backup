# ARR_Bot Memory

## Setup
- Dashboard: http://192.168.1.146:4000
- DB: SQLite (/tmp/dashboard.db)

## John's Preferences
- Ideas → kanban queue, not done immediately
- PRs for GitHub repo changes
- WhatsApp for communication
- No usage alerts
- **ALWAYS backup dashboard AND database before making any changes**
  - Dashboard: `cp /home/john/ARR/dashboard/index.html /home/john/ARR/dashboard/index.html.backup-$(date +%Y%m%d-%H%M)`
  - Database: `cp /home/john/.openclaw/workspace/dashboard-data/dashboard.db /home/john/.openclaw/workspace/dashboard-data/dashboard.db.backup-$(date +%Y%m%d-%H%M)`
  - Also copy to container: `docker cp /path/to/index.html arr-dashboard:/app/index.html`

## Kanban Workflow
- Backlog → pick up → work → complete

## Second Brain
- SQLite DB with tags: business-central, openclaw, arr, docker, ideas, general

## Active Cron Jobs
- Update Cron Jobs List: every 5 min
- GitHub Repo Review: hourly
- Daily Review: 23:00 daily

## Capabilities (Feb 18 2026)
- chrome-devtools-mcp for visual debugging
- GitHub: johntaylormfc/arr-dashboard
- Self-test API: http://localhost:4000/api/self-test

Use mcporter + chrome-devtools-mcp for dashboard debugging.

## Completed Recently
- Fixed sidebar navigation, migrated to SQLite, added health monitoring

## Known Issues
- YouTube scan jobs failing

## Daily Review (Feb 17)
- Dashboard cleanup completed: removed CPU/memory/disk stats, updated quick actions to local IP
- Sidebar navigation fixed
- 6/7 cron jobs healthy
- GitHub repo reviews generating many kanban ideas (26 total)
- Pattern: hourly automated scans create steady idea flow

## Daily Review (Feb 18)
- Skills installed: QMD (bun-based markdown search), Agent Browser, Supermemory, Prompt Guard
- Dashboard fixes: drag-drop reordering, duplicate column sortOrder, async/await for reorder API

## Command Center 2.0 (Feb 20 2026)
### Board Meeting System
- Auto-triggers when backlog task picked up → moves to in-progress
- Agent selection based on task keywords:
  - crypto/trading → agent-trading, arr_crypto_trader, agent-coder
  - code/PR/GitHub → agent-coder, agent-main
  - Business Central → agent-coder
  - email/Todoist → agent-main, agent-research
  - everything else → all agents
- Captures: participants, reasoning, transcript, plan, subtasks
- Auto-completes when task completed
- Activity tracked for each agent

### Trading Bots (Autonomous)
- ARR_Trader: manages stock bot, full autonomy
- ARR_Crypto_Trader: manages crypto bot, full autonomy
- Removed management cron jobs

### Dashboard Storage
- Database: /home/john/.openclaw/workspace/dashboard-data/dashboard.db
- Container mounts: /data for DB, /tmp for crypto logs
- Persistent across restarts

### Recent Fixes
- Crypto tab now shows real-time data (was showing 0)
- File permissions fixed on /tmp/crypto.json
- Auto-refresh every 5 minutes
- GitHub Repo Review completed all 49 repos (significant achievement)
- Kanban persistence fixed (removed migrateFromJson)
- Pattern: Dashboard has recurring issues with drag-drop and sorting - may need refactoring
