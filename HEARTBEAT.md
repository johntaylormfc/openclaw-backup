# HEARTBEAT.md

## SMART MEMORY LOADING (do this first, every heartbeat)
1. Read memory/projects.md — compact project registry
2. Read MEMORY.md — curated long-term memory
3. Only load daily notes (memory/YYYY-MM-DD.md) when asked about specific past work

## Checklist (every heartbeat)
- [ ] Update heartbeat-state.json: active project, current task, blockers
- [ ] Check dashboard (port 5000): `curl -s http://192.168.1.146:5000 | head -c 100` → restart if fail
- [ ] Check kanban: `curl -s http://localhost:4000/api/kanban | jq '.ideas | length'`
- [ ] Pick backlog task → work → complete

## Before Dashboard Changes
Backup first:
- Dashboard: `cp /home/john/ARR/dashboard/index.html index.html.backup-$(date +%Y%m%d-%H%M)`
- Database: `cp /home/john/.openclaw/workspace/dashboard-data/dashboard.db dashboard.db.backup-$(date +%Y%m%d-%H%M)`
- Sync: `docker cp index.html arr-dashboard:/app/index.html`

## Memory Maintenance (once/day)
- Read/create today's memory file
- Log significant events
- Update MEMORY.md

<!-- managed-memory-status:start -->
## Memory Status
- QMD Memory Refresh: **disabled**
- Semantic Memory Index: **disabled**
- Weekly MEMORY.md Auto-Curation: **enabled**
<!-- managed-memory-status:end -->
