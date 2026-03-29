# ARR_Bot Memory

**OPERATING MODEL:** OPERATING_MODEL.md

## Dashboard (CRITICAL)
- URL: http://192.168.1.146:5000 (4000 = old, ignore)
- Edit: /home/john/ARR/dashboard-v2/ | Build: `npm run build` | Restart: `docker restart arr-dashboard arr-dashboard-v2`

## Mission Control
DELETED (March 2026) — was at http://192.168.1.146:5001/

## ARR Stack
- Sonarr: http://192.168.1.146:8989 | e990b7b615554edeaca78919ade1e975
- Radarr: http://192.168.1.146:7878 | a43e5fe67a7d45c7a488aaa93c78f0a1
- Prowlarr: http://192.168.1.146:9696 | 17756336779d494b92c56ac4095dab9a

## BC Container (GSPRO)
- bcdev (18205): http://192.168.1.228:18205/BC/?tenant=default
- glapproval (18206): http://192.168.1.228:18206/BC/?tenant=default
- Creds: john / John1234 (lowercase!) | Add `?tenant=default` after restart

## Cloudflare Tunnel
Name: "openclaw" | PID: 176958 (Beelink) | DNS: openclaw.bcdev.co.uk - pending

## Voice Transcription
Deepgram Nova-2 via /home/john/.openclaw/workspace/scripts/transcribe.js
`node transcribe.js <audio_file.ogg>` | Key: 5eac7fadeb745001af5576b5b17ac2127a0d3327

## Memory System
- Daily: memory/YYYY-MM-DD.md | Long-term: MEMORY.md | Projects: memory/projects.md
- Backup: /home/john/.openclaw/scripts/memory-backup.sh (cron 03:00) → /home/john/ARR/backup/memory/

## John's Preferences
Ideas → kanban | PRs for GitHub | WhatsApp | ALWAYS backup before dashboard | Never restore DB to fix UI

## Open Issues
Vector memory DISABLED (Gemini 403, Mar 5) | OAuth expiry mid-month | ARR health errors | 30+ idea backlog | DNS CNAME pending

## This Week (March 23-29)
System stable, 33 cron jobs healthy, Cloudflare tunnel running, Dashboard 5000 healthy, Arnold restore done Mar 17

## Key Decisions (March 2026)
Session capture → 20:30 UTC | Docker exec to extract undocumented Radarr API key | Mission Control deleted (duplicate/unneeded)

*Curated: 2026-03-29*