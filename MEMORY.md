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

## BC Container (GSPRO)
| Container | Web Port | URL |
|-----------|----------|-----|
| bcdev | 18205 | http://192.168.1.228:18205/BC/?tenant=default |
| glapproval | 18206 | http://192.168.1.228:18206/BC/?tenant=default |

Credentials: john / John1234 (lowercase!)

## Memory System
- Daily notes: memory/YYYY-MM-DD.md (load on-demand)
- MEMORY.md: curated long-term brain
- projects.md: compact project registry
- Vector memory: DISABLED (March 5, 2026)

Last updated: 2026-03-17

## Daily Review Insights (March 17, 2026)
- Arnold (OpenClaw restore & hardening) completed successfully
- Memory audit fully restored - 23 files, runbooks created in harbor/
- QMD implementation provides fallback when vector memory disabled
- All 41 cron jobs healthy with 0 consecutive errors
- OAuth tokens consistently expire mid-month - needs proactive refresh (recurring)
- Weekend memory capture shows gaps (March 16 missing) - verify Saturday cron

## Daily Review Insights (March 14, 2026)
- Weekend memory capture working reliably at 10:00
- Persistent issues from prior weeks still blocking:
  - Calendar/Todoist OAuth scope problems
  - Vector memory disabled (Gemini 403)
  - gdrive-sync cron timeout
- Pattern: OAuth tokens expire mid-month - needs proactive refresh schedule

## Daily Review Insights (March 18, 2026)
- M2.7 now primary model - awaiting API availability
- Fixed calendar-to-todoist and email-to-todoist OAuth bugs (wrong creds file)
- Set up Deepgram voice transcription (API key configured)
- Cleaned 6 stopped containers
- Added 14-day ARR backup retention - freed 2.3GB
- Fixed Transmission RPC auth (was unauthenticated - security risk)
- Git remote added: https://github.com/johntaylormfc/openclaw-backup
- Deleted ARR_Trader workspace (john requested)
- Git filter-branch run to remove secrets from history
