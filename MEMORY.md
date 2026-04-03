# ARR_Bot Memory

**OPERATING MODEL:** OPERATING_MODEL.md

## Dashboard
- URL: http://192.168.1.146:5000 (4000 = old, ignore)
- Edit: /home/john/ARR/dashboard-v2/ | Build: `npm run build` | Restart: `docker restart arr-dashboard arr-dashboard-v2`

## ARR Stack
- Sonarr: http://192.168.1.146:8989 | API key in memory/credentials.md
- Radarr: http://192.168.1.146:7878 | API key in memory/credentials.md
- Prowlarr: http://192.168.1.146:9696 | API key in memory/credentials.md

## GSPro PC (192.168.1.228)
- **WinRM** (primary): bot / BotBotBot! | Port 5985 | Basic auth + AllowUnencrypted | BcContainerHelper 6.1.11
- SSH: bot / BotBotBot! (backup)
- Admin user: john / M0therwell9!
- Docker Windowsfilter VHD lock — `docker rm` works as bot user

## BC Containers on GSPro (WinRM)
- JTTest: ports 7146-7147, 8082 | healthy
- glapproval: ports 7151-7152 | healthy
- custcontacts: ports 7148-7149, 8081 | healthy
- Credentials: john / John1234 | Always use `?tenant=default` in URL
- New containers: sandbox + GB + latest SaaS + fresh download | name = app name

## Cloudflare Tunnel
Name: "openclaw" | PID: 176958 (Beelink) | DNS: openclaw.bcdev.co.uk - pending

## Voice Transcription
Deepgram Nova-2 via /home/john/.openclaw/workspace/scripts/transcribe.js
`node transcribe.js <audio_file.ogg>` | Key in memory/credentials.md

## Memory System
- Daily: memory/YYYY-MM-DD.md | Long-term: MEMORY.md | Projects: memory/projects.md
- Backup: /home/john/.openclaw/scripts/memory-backup.sh (cron 03:00) → /home/john/ARR/backup/memory/

## John's Preferences
Ideas → kanban | PRs for GitHub | WhatsApp | ALWAYS backup before dashboard | Never restore DB to fix UI

## Open Issues
- GLApproval AL compilation BLOCKED: AL0219 "string literal expected" on Caption/field() strings — root cause is encoding mismatch (files likely Windows-1252 interpreted as UTF-8); fix = re-encode all 8 .al files to UTF-8 NO BOM on GSPRO at `C:\ProgramData\BcContainerHelper\Extensions\glapproval\my\GLAccApproval\src\`
- Cron jobs may not be firing: all `lastRun`/`nextRun` fields null as of April 3; verify scheduler health
- Vector memory DISABLED (Gemini 403) | OAuth mid-month | ARR health errors | DNS CNAME pending

## Key Decisions
Session capture → 20:30 UTC | Mission Control deleted (duplicate) | WinRM setup Apr 2026 for GSPro access
