# ARR_Bot Memory

## Current Setup
- Dashboard: http://192.168.1.146:4000
- Database: SQLite (/tmp/dashboard.db) - much more stable than JSON files

## John's Preferences
- Ideas go to kanban queue, not done immediately
- Use PRs for GM repo changes
- WhatsApp for communication
- No usage alerts - let it run and see how long until limit

## Kanban Workflow
- Backlog/Todo → pick up → work → complete
- 3 columns: Ideas, Backlog/Todo, In Progress
- Completed hidden by default (button to show)

## Second Brain
- Notes stored in SQLite database
- Tags: business-central, openclaw, arr, docker, ideas, general
- Web clipper for URLs

## Active Cron Jobs (Feb 2026)
- Update Cron Jobs List: every 5 min
- GitHub Repo Review: hourly
- Idea dump: every 6 hours
- Daily Review: 23:00 daily

## Known Issues (to fix)
- YouTube scan jobs failing (cron delivery target missing)

## New Capabilities (Feb 18 2026)
- **chrome-devtools-mcp**: Can debug dashboard visually via mcporter
- **GitHub version control**: Dashboard code at johntaylormfc/arr-dashboard
- **Self-test API**: http://localhost:4000/api/self-test for health checks
- **dashboard-debug skill**: /home/john/openclaw/skills/dashboard-debug/SKILL.md

Always use mcporter + chrome-devtools-mcp when debugging dashboard issues - check console errors before declaring fix complete.
- Memory search needs API key configuration

## Completed Recently
- Fixed sidebar navigation in dashboard (rebuilt container)
- Migrated kanban/notes from JSON to SQLite
- Dashboard health monitoring added to heartbeat

## Pattern: Weekend Inactivity (Feb 2026)
- Weekends (Sat-Sun) consistently show no activity
- Last active days: Fridays before going dormant
- Daily Review cron runs even on weekends but finds minimal activity
- Action: Added "Weekend Activity Pattern" idea - decide whether to accept rest periods or schedule maintenance tasks

## Daily Review Insights
- Review cron runs at 23:00 daily
- Memory files tend to be sparse on weekends
- System successfully identifies patterns and adds ideas to kanban

