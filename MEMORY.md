# ARR_Bot Memory

## CRITICAL: The Site (Dashboard)
- **URL**: http://192.168.1.146:5000 (port 4000 = old, ignore)
- Port 5000 = NEW BC Dev Limited Dashboard with API
- Edit in /home/john/ARR/dashboard-v2/, NOT /home/john/ARR/dashboard/

## Dashboard Architecture
- Frontend: /home/john/ARR/dashboard-v2/ (React + Vite)
- Build: `npm run build`
- Containers: arr-dashboard (4000), arr-dashboard-v2 (5000, nginx)

## When Dashboard Breaks
1. Check containers running: `docker ps`
2. Rebuild: `cd /home/john/ARR/dashboard-v2 && npm run build`
3. Restart: `docker restart arr-dashboard arr-dashboard-v2`

## Mission Control (OC-0035)
- **URL:** http://192.168.1.146:5001/
- **Token:** hx4nEu4W2ZoXsiEfWRCAQcgDsNzzht7kpBUfsGHhqxzEsgHhLll2g39woASs1c

## ARR Stack
| Service | URL | API Key |
|---------|-----|---------|
| Sonarr | http://192.168.1.146:8989 | e990b7b615554edeaca78919ade1e975 |
| Radarr | http://192.168.1.146:7878 | a43e5fe67a7d45c7a488aaa93c78f0a1 |
| Prowlarr | http://192.168.1.146:9696 | 17756336779d494b92c56ac4095dab9a |

## John's Preferences
- Ideas → kanban queue
- PRs for GitHub changes
- WhatsApp for communication
- ALWAYS backup before dashboard changes

## Key Patterns
- Never restore database to fix UI issues
- Use Chrome DevTools MCP for dashboard debugging
- Gmail OAuth tokens expire mid-month - re-auth needed
- BC containers require `?tenant=default` after restart

## Known Issues
- Exec tool can hang after system compaction
- Google Drive sync: Service Account quota limits
- Vector memory flush: disabled (Gemini 403 errors)
- Health-watcher was broken (docker:24-cli API 1.43 vs host Docker 29.2.1 requiring API 1.44) — FIXED 2026-03-21 by upgrading to docker:27-cli

## BC Container (GSPRO)
| Container | Web Port | URL |
|-----------|----------|-----|
| bcdev | 18205 | http://192.168.1.228:18205/BC/?tenant=default |
| glapproval | 18206 | http://192.168.1.228:18206/BC/?tenant=default |

Credentials: john / John1234 (lowercase!)

## Cloudflare Tunnel
- Tunnel name: "openclaw"
- PID: 176958 (running on Beelink)
- DNS: openclaw.bcdev.co.uk - pending verification

## Voice Transcription
- **Deepgram Nova-2** for voice messages
- Script: `/home/john/.openclaw/workspace/scripts/transcribe.js`
- Usage: `node transcribe.js <audio_file.ogg>`
- API key stored in script (5eac7fadeb745001af5576b5b17ac2127a0d3327)
- Whisper is NOT installed — do not try to use it

## Memory System
- Daily notes: memory/YYYY-MM-DD.md (load on-demand)
- MEMORY.md: curated long-term brain
- projects.md: compact project registry
- Vector memory: DISABLED (March 5, 2026)
- **Backup**: /home/john/.openclaw/scripts/memory-backup.sh (cron daily 03:00) → /home/john/ARR/backup/memory/ (14 snapshots)

Last updated: 2026-03-25

## Daily Notes (March 24, 2026)

### What Went Well
- System heartbeat passed (02:25 UTC)
- Dashboard port 5000 healthy
- Cloudflare tunnel (PID 176958) running stably
- No blocked tickets
- Kanban backlog stable (no new ideas added)

### What Could Be Improved
- Daily memory notes are minimal - more context could be captured
- Ideas directory shows 6 in heartbeat but was empty on check - possible cleanup or timing mismatch

### Patterns/Learnings
- System running smoothly with minimal intervention needed
- Backlog management stabilizing after March 23 spike

---

## Daily Notes (March 23, 2026)

### What Went Well
- Both system heartbeats passed (04:24 and 22:55 UTC)
- WhatsApp gateway auto-recovered from brief 499/503 status disconnections
- Dashboard port 5000 remained healthy throughout

### What Could Be Improved
- 6 new ideas added in one day - significant influx to backlog, needs prioritization
- Brief WhatsApp disconnections (statuses 499/503) - root cause worth investigating if persistent

### Patterns/Learnings
- Kanban ideas grew rapidly (0 → 6 in a day) - backlog management needed
- Auto-recovery mechanisms working well for WhatsApp gateway
- ARR-related automation ideas dominate the new backlog

---

## Weekly Summary (March 15-22, 2026)

### This Week's Key Fixes
- **Docker Health Agent** (March 21): Upgraded docker:24-cli → docker:27-cli to fix API version mismatch. Health-watcher now auto-restarts unhealthy containers.
- **Transmission RPC** (March 18): Fixed unauthenticated RPC access (security fix)
- **OAuth bugs** (March 18): Fixed calendar-to-todoist and email-to-todoist using wrong creds file
- **Backup retention** (March 18): Added 14-day ARR backup retention, freed 2.3GB
- **Memory consolidation** (March 22): Archived bloated research files and old daily notes

### Infrastructure
- Cloudflare tunnel "openclaw" running (PID 176958)
- All 33 cron jobs healthy with 0 consecutive errors
- Arnold (OpenClaw restore & hardening) completed March 17

### Known Issues
- 30 ideas in kanban/idea/ backlog - needs prioritization
- Vector memory disabled (Gemini 403 errors)
- OAuth tokens expire mid-month - needs proactive refresh
- DNS CNAME openclaw.bcdev.co.uk pending verification

### Patterns
- Docker API version mismatch causes SILENT failures - container Docker client must match or exceed host API version
- Duplicate tickets keep appearing for same OC numbers - ticket lifecycle management needs review
- OAuth tokens expire mid-month - needs proactive refresh schedule

---
*Memory curated: 2026-03-22 (weekly)*

## Memory System Upgrades (2026-03-26)
- Memory flush threshold: raised from 4000 → 13000 tokens (was too aggressive)
- Session transcript capture: fixed cron to read from actual sessions dir (/home/john/.openclaw/agents/main/sessions/)
- Transcript manager: rewritten to parse OpenClaw JSONL format, detect topics, extract decisions
- Daily memory log: now pulls from session-summaries.json with topic + decision summaries
- QMD backend: enabled (was builtin). QMD installed at /home/john/.openclaw/agents/main/qmd/
- Hybrid search: enabled (BM25 + vector, 70/30 split)
- MMR deduplication: enabled (lambda=0.7)
- Temporal decay: enabled (30-day half-life for daily notes)
- Session memory indexing: enabled (experimental)

Last updated: 2026-03-26
