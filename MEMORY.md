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

## IMPORTANT - Dashboard Issues
**ALWAYS use Chrome DevTools MCP** when:
- Testing/fixing dashboard UI issues
- Clicking buttons to verify they work
- Taking snapshots to debug
- Checking page structure

Use mcporter + chrome-devtools-mcp for dashboard debugging.

## Completed Recently
- Fixed sidebar navigation, migrated to SQLite, added health monitoring

## Known Issues
- YouTube scan jobs failing (needs investigation)

## Patterns & Learnings (Feb 20)
- Kanban ideas column is working well as a capture mechanism for follow-up tasks
- Trading bot improvements are incremental and well-documented
- Command Center 2.0 is providing structured agent collaboration

## X Growth Project (Feb 24, 2026)
- Account: @MyNewClawBot
- API connected, credits purchased
- Bot: /home/john/.openclaw/workspace/x_growth/x_growth_bot.js
- Auth: /home/john/.openclaw/workspace/x_growth/.x_auth.json

### Phase Limits (Updated Feb 24)
- **Phase A (Days 1-3):** 2 posts, 4 replies, 4 follows, 16 likes
- **Phase B (Days 4-14):** 5 posts, 10 replies, 8 follows, 25 likes  
- **Phase C (Day 15+):** 10 posts, 20 replies, 15 follows, 50 likes

### Cron Jobs
- Hourly: metrics check
- 8am, 1pm, 6pm: scheduled content runs

### Commands
- `node x_growth_bot.js status` - check limits
- `node x_growth_bot.js metrics` - get real-time stats
- `node x_growth_bot.js run` - run scheduled content

## Daily Review (Feb 23 - Monday)
- Gateway was down ~20 hours on Feb 22 (recovered)
- Created safe deploy workflow: deploy-dashboard.sh, smoke-test.sh, CHANGE_LOG.md
- X Growth project started (Phase A)
- Terminal/exec tool timing out issues after compaction
- X API replies blocked - manual replies sent
- Key learning: Use /data/dashboard.db NOT /tmp (persistent path)
- Key learning: NEVER restore database to fix UI issues

## Daily Review (Feb 22 - Sunday)
- Weekend day with minimal logged activity
- Agent Task Execution System active: board meetings now execute tasks automatically
- Research tasks create research documents automatically
- UI updated to show current/recent tasks per agent

## Daily Review (Feb 20)
- Trading bot significant upgrades: multi-timeframe confirmation, MACD, volume filtering, dynamic position sizing based on conviction score
- Freelance Dev Work added to kanban (Business Central extensions)
- All 14 cron jobs healthy - ARR Config Backup now working
- Bot restarted successfully with new indicators at ~22:24
- Command Center 2.0 board meeting system fully operational

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

## Daily Review (Feb 24, 2026)
### What Went Well
- Command Center 2.0 fully implemented with retry/block functionality
- Dashboard fixes completed: duplicate sidebar button ID, Agent Tasks section added
- Full dashboard audit completed
- X Growth Phase A progressing (5 posts, 6 replies, 3 follows, 12 likes)
- Added 3 MCP servers (Puppeteer, Notion, PostgreSQL)
- Safe deploy workflow established

### What Could Be Improved
- Exec tool stuck issues - commands not returning reliably
- Crypto bot downtime (~10 hours) - need better monitoring/alerts
- X Growth dashboard numbers showing stale data
- Gateway cron delivery issues affecting reliability

### New Patterns & Learnings
- **Never restore database to fix UI issues** - causes more problems than it solves
- **Use /data/dashboard.db NOT /tmp** - persistent path across restarts
- Exec tool hangs after system compaction - may need process management improvements
- Crypto bot needs proactive health monitoring to catch downtime earlier

### Action Items Generated
- Add crypto bot health monitoring to heartbeat checks
- Fix exec tool reliability (investigate timeout/compaction issues)
- X Growth dashboard needs automated refresh mechanism

## Daily Review (Feb 26 - Wednesday)
### X Growth Project
- Phase B started (Days 4-14)
- **Key Learning:** Always use cumulative totals from X API, never view daily in isolation
- Updated x_engagement_tracking.md to reflect:
  - API-sourced account stats (followers, following, tweets)
  - Cumulative activity from CSV log
  - Phase B limits: 5 posts, 10 replies, 8 follows, 25 likes/day
- Current cumulative: 8 posts, 10 replies, 9 follows, 33 likes, 1 follower

### Crypto Bot Sync
- Cron job running successfully, syncs crypto.json to dashboard container
- Runtime ~14s per sync

### Dashboard
- Database path confirmed: `/data/dashboard.db` (persistent across restarts)
- Container mount: `/data` for DB, `/tmp` for crypto logs

### Patterns Reinforced
- **Never restore database to fix UI issues** - always debug the actual issue
- Use Chrome DevTools MCP for dashboard UI debugging
- Exec tool can hang after system compaction - use process management

## Daily Review (Feb 27 - Thursday)
### What Went Well
- Dashboard healthy after container restart
- Trading portfolio strong at $100,532
- Crypto sync working, container now healthy
- GitHub PR ready (Contract Revenue Analytics - feature/contract-health-score-v2)

### What Could Be Improved
- Gmail OAuth expired Feb 21 - needs re-authentication
- X Growth: Phase B limits exceeded but continued per user instruction

### Patterns & Learnings
- Container health monitoring catching issues proactively
- System self-healing: dashboard container restart resolved unhealthy state

### X Growth Project - TAKING OWNERSHIP
- **Issue identified**: Bot posting garbage content ("Good morning, what's your top priority?")
- **Action taken**: 
  - Created x_content_bank_v2.md with 20+ actual valuable posts
  - Manually posted 3 high-value tweets (AI tips, productivity, networking)
  - Liked 16 relevant tweets in niche
  - Created x_daily_workflow.md for consistent execution
- **Lesson learned**: Never automate without active management
- **Current phase**: Phase B (Day 5)
- **Today's stats**: 4 posts, 16 likes, 0 replies, 0 follows
