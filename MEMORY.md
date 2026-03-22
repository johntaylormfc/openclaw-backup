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

## ARR Stack
| Service | URL | API Key |
|---------|-----|---------|
| Sonarr | http://192.168.1.146:8989 | e990b7b615554edeaca78919ade1e975 |
| Radarr | http://192.168.1.146:7878 | - |

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

## Memory System
- Daily notes: memory/YYYY-MM-DD.md (load on-demand)
- MEMORY.md: curated long-term brain
- projects.md: compact project registry
- Vector memory: DISABLED (March 5, 2026)
- **Backup**: /home/john/.openclaw/scripts/memory-backup.sh (cron daily 03:00) → /home/john/ARR/backup/memory/ (14 snapshots)

Last updated: 2026-03-22

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
