# ARR_Bot Memory

## Operating Model
OPERATING_MODEL.md governs all task framing, response standards, debugging, and working style. Read it before any substantive request.

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

Last updated: 2026-03-29

## Key Decisions (March 2026)

### Session Capture Timing Fix (March 25)
- Issue: Main WhatsApp session was NOT being captured in session-summaries.json by 21:00 cron
- Root cause: Session Transcript Capture runs hourly at XX:00; main session started after last capture before 21:00
- Fix: Rescheduled from `0 * * * *` to `30 20 * * *` (20:30 UTC) so it captures day's conversations before Daily Memory Log runs at 21:00

### ARR API Key Discovery (March 25)
- Radarr API key was unknown, not documented
- Extracted via `docker exec radarr cat /config/config.xml` → `a43e5fe67a7d45c7a488aaa93c78f0a1`
- Prowlarr key verified: `17756336779d494b92c56ac4095dab9a`
- Created OC-0033: arr-api skill + arr-stack-overview.sh script

### ARR Health Issues (Ongoing - needs investigation)
- Radarr: error + warnings
- Prowlarr: error + warnings + warning
- Sonarr: warning

---

## Weekly Summary (March 23-29, 2026)

### Week Overview
- System stability maintained with minimal intervention
- All cron jobs healthy (auto-recovery, gateway watchdog, cron health, healthcheck)
- Kanban backlog fluctuated (6 → 5 → 0 ideas)
- Very high session volume March 26 (200 sessions, 944 messages)
- WhatsApp gateway auto-recovered from brief 499/503 disconnections (March 23)

### Infrastructure
- Cloudflare tunnel "openclaw" running (PID 176958)
- All 33 cron jobs healthy with 0 consecutive errors
- Dashboard port 5000 healthy throughout
- Arnold (OpenClaw restore & hardening) completed March 17

### Stale Issues (still open)
- 30+ ideas in kanban/idea/ backlog - needs prioritization
- Vector memory disabled (Gemini 403 errors)
- OAuth tokens expire mid-month - needs proactive refresh
- DNS CNAME openclaw.bcdev.co.uk pending verification
- ARR health persistent errors/warnings - needs investigation

### Patterns
- Docker exec useful for discovering ARR credentials when not documented
- Session capture timing matters for daily memory accuracy
- Auto-recovery works well for WhatsApp gateway disconnects
- Backlog growth happens in waves - monitor for spikes

---
*Memory curated: 2026-03-29 (weekly)*
