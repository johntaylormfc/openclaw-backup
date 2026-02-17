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
- Memory search needs API key configuration

## Completed Recently
- Fixed sidebar navigation in dashboard (rebuilt container)
- Migrated kanban/notes from JSON to SQLite
- Dashboard health monitoring added to heartbeat

