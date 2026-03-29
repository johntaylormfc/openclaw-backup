# HEARTBEAT.md — Arnold 🦞

**OPERATING MODEL:** OPERATING_MODEL.md

## Memory Loading
1. memory/projects.md 2. MEMORY.md 3. memory/YYYY-MM-DD.md only on-demand

## Checklist
1. **Assess:** Active project? Task? Blockers? Next step?
2. **Health:** Dashboard `curl -s http://192.168.1.146:5000 | head -c 100` | Gateway `curl -s http://127.0.0.1:18789` | Docker `docker ps | grep -v healthy`
3. **Kanban:** Ideas/New/In-progress/Blocked counts
4. **Task logic:** blockers → clear | active → continue | new tickets → work | ideas >= 3 → triage | else → monitor
5. **Before changes:** Backup both index.html and dashboard.db with timestamps

## Daily
Log to memory/YYYY-MM-DD.md. Update MEMORY.md for new learnings.

## Paths
Dashboard: http://192.168.1.146:5000 | Mission Control: http://192.168.1.146:5001/
ARR skills: /home/john/.openclaw/workspace/skills/arr-api/ | Kanban: /home/john/.openclaw/workspace/kanban/

**Memory:** QMD enabled | Session capture 20:30 UTC | Daily log 21:00 | Auto-curation Sundays 05:00 | Flush 13000 tokens