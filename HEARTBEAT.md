# HEARTBEAT.md

## SMART MEMORY LOADING (do this first, every heartbeat)
Before anything else, load context efficiently:
1. Read memory/projects.md — compact project registry (~1K tokens)
2. Read MEMORY.md — curated long-term memory (~3K tokens)
3. Only load daily notes (memory/YYYY-MM-DD.md) when asked about specific past work
4. Only run vector search when a specific question about past work comes up

This gives full context at ~10% of the token cost. Daily notes are archives, not runtime docs.

## Before Dashboard Changes
Backup first:
- Dashboard: `cp /home/john/ARR/dashboard/index.html index.html.backup-$(date +%Y%m%d-%H%M)`
- Database: `cp /home/john/.openclaw/workspace/dashboard-data/dashboard.db dashboard.db.backup-$(date +%Y%m%d-%H%M)`
- Sync: `docker cp index.html arr-dashboard:/app/index.html`

## Checklist (every heartbeat)
- [ ] Update heartbeat-state.json: active project, current task, blockers
- [ ] Check dashboard (port 5000): `curl -s http://192.168.1.146:5000 | head -c 100` → restart if fail
- [ ] Check kanban: `curl -s http://localhost:4000/api/kanban | jq '.ideas | length'`
- [ ] Pick backlog task → work → complete

## Memory Maintenance (once/day)
- Read/create today's memory file
- Log significant events
- Update MEMORY.md

## Vector Memory Flush (every heartbeat)
Run: python3 ~/.openclaw/workspace/skills/vector-memory/scripts/memory_flush.py
If total_stored = 0, that is fine — means nothing new to embed.
