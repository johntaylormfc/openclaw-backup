# ARR_Bot Memory

**OPERATING MODEL:** OPERATING_MODEL.md

Dashboard: 192.168.1.146:5000 (4000=old) | src: /home/john/ARR/dashboard-v2/ | build: `npm run build` | restart: `docker restart arr-dashboard arr-dashboard-v2`

ARR: Sonarr :8989 | Radarr :7878 | Prowlarr :9696 | keys: memory/credentials.md

GSPro 192.168.1.228: WinRM bot/BotBotBot! p5985 BcCH6.1.11 | SSH bot/BotBotBot! | admin john/M0therwell9! | VHD lock: `docker rm`

BC: JTTest 7146-47,8082 | glapproval 7151-52 | custcontacts 7148-49,8081 | creds john/John1234 | ?tenant=default

CF: openclaw | PID 176958 Beelink | DNS openclaw.bcdev.co.uk — pending

Voice: Deepgram Nova-2 | /home/john/.openclaw/workspace/scripts/transcribe.js | key: memory/credentials.md

Memory: daily=memory/YYYY-MM-DD.md | longterm=MEMORY.md | backup=/home/john/.openclaw/scripts/memory-backup.sh→/home/john/ARR/backup/memory/ (cron 03:00)

John: Ideas→kanban | PRs→GitHub | WhatsApp | backup b.dashboard | never restore DB for UI

Open: GLApproval AL0219→re-encode 8 .al UTF-8 NO BOM C:\ProgramData\BcContainerHelper\Extensions\glapproval\my\GLAccApproval\src\ | Vector Gemini 403 | OAuth midmonth | DNS CNAME pending

Decisions: capture 20:30 UTC | MC deleted dup | WinRM Apr2026

## 2026-04-13 Learning: Daily Review Pattern Established
- System operating smoothly on weekends
- All cron jobs running (auto-recovery, health checks, dashboard backups, ARR log monitor, cron triage)
- Kanban idea threshold (>=3) working - prevents idea bloat during quiet periods
- No new ideas needed: 0 ideas in folder (threshold met for "don't add more")

## 2026-04-12 Learning: Weekly Curation
- OAuth token expiration patterns: Drive backup `invalid_grant`, similar to Gmail
- Weekend triage: 9 ideas → 6 rejected (generic), 3 accepted → tickets OC-0048, OC-0049, OC-0050
- Routine cron running: auto-recovery, health checks, dashboard backups, GitHub backup
- Kanban idea threshold working: 7 ideas present (>=3) → no new ideas added

## 2026-04-11 Learning: OAuth Token Expiration Recurring
- Drive backup FAILED: `invalid_grant` - refresh token invalid/expired/revoked
- Pattern: similar to Gmail OAuth issues
- Fix needed: re-authenticate backup script credentials

## 2026-04-11 Learning: Weekend Triage Effective
- 9 ideas in kanban/idea → 6 rejected (generic/web listicles), 3 accepted (ARR-native)
- Created tickets OC-0048, OC-0049, OC-0050 from accepted ideas
- Kanban: 0 idea/3 new/0 blocked/181 rejected

## Open Issues (as of 2026-04-12)
- node-llama-cpp missing → memory search BROKEN; fix: `npm i -g openclaw@latest` or set provider to gemini/openai
- Telegram bot 409 Conflict → dual getUpdates polling; second instance running
- clawdbot-dashboard.service broken: CHDIR /home/john/.cargo/bin/cargo (dir missing)
## 2026-04-14 RDP Black Screen Fix (Beelink)
- Symptom: RDP login → black screen, xfwm4 had died on :10 session (stale 11 days)
- Fix: `xfwm4 --replace --display=:10.0` + `xfdesktop --display=:10.0` on existing :10 session
- If that fails: RDP client → Display → Colors=High(16-bit), Experience → untick bitmap caching

## Open Issues
- mission-control.service broken: CHDIR /usr/bin/node (dir missing)
- GLApproval AL0219 encoding: 8 .al files need re-encode to UTF-8 NO BOM on GSPRO
- Vector Gemini 403
- OAuth token refresh failures (Drive backup, Gmail)
- DNS CNAME openclaw.bcdev.co.uk pending