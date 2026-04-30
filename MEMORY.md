# ARR_Bot Memory

**OPERATING MODEL:** OPERATING_MODEL.md

## Dashboard
192.168.1.146:5000 | src: /home/john/ARR/dashboard-v2/ | build: `npm run build` | ext: johntaylormfc.ddns.net

## ARR Ports
Sonarr :8989 | Radarr :7878 | Prowlarr :9696 | keys: memory/credentials.md

## GSPro 192.168.1.228
WinRM bot/BotBotBot! p5985 | SSH bot/BotBotBot! | admin john/M0therwell9!

## Credentials
keys: memory/credentials.md | OpenCF PID 176958 Beelink | DNS openclaw.bcdev.co.uk pending

## Voice
Deepgram Nova-2 | /home/john/.openclaw/workspace/scripts/transcribe.js

## John
Ideas→kanban | PRs→GitHub | WhatsApp | backup b.dashboard | never restore DB for UI

## Open Issues
- GLApproval AL0219 encoding: 8 .al files need UTF-8 NO BOM on GSPro
- Gmail OAuth: needs manual browser flow
- Drive OAuth scope error since Apr 14
- DNS CNAME pending: openclaw.bcdev.co.uk
- fe28d320 cron job skipping (payload.kind misconfigured)

## Patterns
- WhatsApp 499 disconnects ~30min cycle, self-heals within ~3s
- Snapshot backups every 2 days: 1.0-1.7 MB
- Gateway log staleness → false DOWN detections (watchdog cron fixed)
- RAM pressure triggers hermes SIGKILL

## 2026-04-26 Weekly Summary
- ✅ Snapshot backups (Apr 19,20,21,22,25)
- ✅ Hermes file handoff live (Apr 21) - cron 64e0a4372611
- ✅ Gateway watchdog keepalive added (Apr 23)
- ✅ Dashboard stable all week

## 2026-04-27 Daily Review
- ✅ Gateway watchdog passed all checks
- ✅ ARR stack healthy
- ✅ OpenClaw updated to 2026.4.25 (aa36ee6)
- ✅ WhatsApp auto-reconnecting after 499s
- fe28d320 cron job still skipping

## 2026-04-29 Promotions
- hermes_handoff.js working (OpenClaw ↔ Hermes task handoff)
- Gateway uptime ~271k-385k seconds after restart

## 2026-04-30 Daily Review (Apr 29)
### What went well
- Snapshot backup ✅ (2.0 MB to Drive, 1 old snapshot pruned)
- ARR weekly backup ✅ (40.9 MB)
- Gateway uptime strong (~39.8h before restart, recovered in ~5min)
- WhatsApp 499 cycling continues to self-heal — pattern now stable
- MiniMax Guard check passed | Inbox Zero held | Use Case Hunter quiet

### What could be improved
- Gateway ~5min downtime (Apr 29) — no Docker/ARR healthcheck triggered
  → **Opportunity:** Add post-restart Docker health verification step to gateway watchdog
- fe28d320 cron job still skipping (known, low priority)
- No Drive health verification after snapshot upload (scope error since Apr 14 persists)

### New patterns/learnings
- Gateway restart cycles are healthy — new PID up quickly, WhatsApp recovers
- Snapshot upload to Drive succeeds even with known OAuth scope issue
  → implies scope error is non-blocking for Drive writes (maybe read-only flag)
- ARR Docker containers unaffected by gateway restart — isolation is good

### Ideas (pending review)
- Post-restart Docker healthcheck hook for gateway watchdog
- fe28d320 cron payload.kind fix
- Drive OAuth scope error resolution (read-only vs read-write scope)

## Promoted From Short-Term Memory (2026-04-30)

<!-- openclaw-memory-promotion:memory:memory/2026-04-23.md:3:3 -->
- Gateway log kept going stale every ~15 min causing false DOWN detections. Added */4 cron to touch gateway.log. WhatsApp notifications returning 404 (channel not configured). [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-23.md:3-3]
<!-- openclaw-memory-promotion:memory:memory/2026-04-23.md:20:23 -->
- Time: 2026-04-23T20:33:14.523Z Topics: openclaw Messages: 1 Summary: [cron:95c94692-2469-43c1-81fc-1913481b378d Session Transcript Capture] Capture session transcripts: cd /home/john/.openclaw/workspace/scripts && node [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-23.md:20-23]
<!-- openclaw-memory-promotion:memory:memory/2026-04-23.md:26:29 -->
- Time: 2026-04-23T20:33:14.523Z Topics: dashboard, memory, openclaw, health Messages: 4 Summary: [cron:healthcheck-hourly-001 Hourly Health Snapshot] Run healthcheck: ~/.openclaw/workspace/tools/openclaw_healthcheck.sh Current time: Thursday, Apri [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-23.md:26-29]
<!-- openclaw-memory-promotion:memory:memory/2026-04-23.md:33:36 -->
- Time: 2026-04-23T20:33:14.522Z Topics: email, openclaw, bc Messages: 3 Summary: [cron:5d6d8f30-d40e-4330-a623-1d0cd5ba2635 Email to Todoist] Run: node /home/john/.openclaw/workspace/scripts/email-to-todoist.js Current time: Thursd [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-23.md:33-36]
