# HEARTBEAT.md

# Keep empty (or comments only) to skip heartbeats.

## Before Dashboard Changes
Backup first:
- Dashboard: `cp /home/john/ARR/dashboard/index.html index.html.backup-$(date +%Y%m%d-%H%M)`
- Database: `cp /home/john/.openclaw/workspace/dashboard-data/dashboard.db dashboard.db.backup-$(date +%Y%m%d-%H%M)`
- Sync: `docker cp index.html arr-dashboard:/app/index.html`

## Checklist (every heartbeat)
- [ ] Update heartbeat-state.json: active project, current task, blockers
- [ ] Check dashboard: `curl -s http://192.168.1.146:4000 | head -c 100` → restart if fail
- [ ] Check kanban: `curl -s http://localhost:4000/api/kanban | jq '.ideas | length'`
- [ ] Pick backlog task → work → complete
- [ ] X Growth (evening): `node x_growth_bot.js metrics` + `status`
- [ ] Trading: `curl -s http://localhost:4000/api/trading | jq '.portfolio, .pnl'`

## Memory Maintenance (once/day)
- Read/create today's memory file
- Log significant events
- Update MEMORY.md
