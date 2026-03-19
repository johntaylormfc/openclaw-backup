# Idea

**ID:** IDEA-0083
**Title:** [STALE REVIEW] OC-0012 — Plex scan trigger needs Radarr config (6 days idle)
**Status:** pending-review
**Created:** 2026-03-19 00:03
**Source:** Automated stale review

## Why This Needs Attention

OC-0012 (Plex API Library Scan Automation After Downloads) has been **blocked for 6 days** with implementation complete.

### What's Done
- Script created at `/home/john/ARR/scripts/plex-scan-trigger.sh`
- Tested successfully — logs show HTTP 200 for both Movies (section 1) and TV Shows (section 2)

### What's Blocking
User must configure Radarr UI to call the script automatically:
1. Open Radarr UI: http://192.168.1.146:7878
2. Settings → Connect → Add Custom Script
3. Name: "Plex Library Scan", On Import/On Upgrade/On Download Folder Imported: ✅
4. Path: `/home/john/ARR/scripts/plex-scan-trigger.sh`

### Options
1. **Do it now** — configure Radarr per the steps above and move ticket to review
2. **Defer** — move ticket back to blocked with a note on when you'll do it
3. **Abandon** — if you no longer want this feature, close the ticket

### What to Decide
Does this still matter to you? If yes, configure Radarr. If no, close it out.

**Reviewer:** john
**Review Date:** 2026-03-19
