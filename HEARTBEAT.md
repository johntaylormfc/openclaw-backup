# HEARTBEAT.md

## SMART MEMORY LOADING (do this first, every heartbeat)
1. Read memory/projects.md — compact project registry
2. Read MEMORY.md — curated long-term memory
3. Only load daily notes (memory/YYYY-MM-DD.md) when asked about specific past work

## Checklist (every heartbeat)
- [ ] Update heartbeat-state.json: active project, current task, blockers
- [ ] Check dashboard (port 5000): `curl -s http://192.168.1.146:5000 | head -c 100` → restart if fail
- [ ] Check kanban: `ls ~/.openclaw/workspace/kanban/idea/*.md 2>/dev/null | wc -l` (ideas) + `ls ~/.openclaw/workspace/kanban/new/*.md 2>/dev/null | wc -l` (new)
- [ ] Pick backlog task → work → complete

## Before Dashboard Changes
Backup first:
- Dashboard: `cp /home/john/ARR/dashboard-v2/index.html index.html.backup-$(date +%Y%m%d-%H%M)`
- Database: `cp /home/john/.openclaw/workspace/dashboard-data/dashboard.db dashboard.db.backup-$(date +%Y%m%d-%H%M)`
- Sync: `docker cp index.html arr-dashboard-v2:/app/`

## Memory Maintenance (once/day)
- Read/create today's memory file
- Log significant events
- Update MEMORY.md

<!-- managed-memory-status:start -->
## Memory Status
- QMD Memory Backend: **enabled** (BM25 + vector hybrid, MMR, temporal decay)
- Session Transcript Capture: **enabled** (hourly, sessions → session-summaries.json)
- Daily Memory Log: **enabled** (21:00 weekdays, reads session-summaries.json)
- Weekly MEMORY.md Auto-Curation: **enabled** (Sundays 05:00)
- Memory Flush Threshold: **13000 tokens** (was 4000 — now captures meaningful content)
<!-- managed-memory-status:end -->
