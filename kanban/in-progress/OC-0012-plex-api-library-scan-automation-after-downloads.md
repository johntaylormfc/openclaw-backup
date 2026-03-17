# Ticket

**ID:** OC-0012
**Title:** Plex API Library Scan Automation After Downloads
**Status:** Blocked
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-11 21:30
**Last Updated:** 2026-03-13 05:34

## Goal
Use the Plex API to automatically trigger library scans after Radarr imports new media, ensuring newly downloaded content appears in Plex without manual refresh.

## Why
This work was accepted from idea IDEA-0028.

## Acceptance Criteria
- [x] Scope is confirmed
- [x] Work is started by moving ticket to In Progress
- [x] Activity log is maintained
- [x] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0028
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [x] Analyse request
- [x] Prepare approach
- [x] Implement changes
- [x] Validate result
- [ ] Write summary

## Activity Log

### Entries

- **Timestamp:** 2026-03-13 05:34  
  **Action:** Implementation completed - script created and tested  
  **Result:** Created /home/john/ARR/scripts/plex-scan-trigger.sh - a shell script that triggers Plex library scans via API  
  **Why:** Core implementation required for automation  
  **Evidence:** Script tested successfully - logs show HTTP 200 for both Movies (section 1) and TV Shows (section 2) library sections  
  **Next Step:** Configure Radarr to call this script on import events

- **Timestamp:** 2026-03-13 05:30  
  **Action:** Ticket moved to In Progress  
  **Result:** Picked up oldest ticket from kanban/new  
  **Why:** Cron job processing next approved live ticket  
  **Evidence:** Ticket moved from /kanban/new to /kanban/in-progress  
  **Next Step:** Analyse request and implement automation

- **Timestamp:** 2026-03-11 21:30  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  
  **Why:** User accepted idea IDEA-0028  
  **Evidence:** Created via accept_idea.py  
  **Next Step:** Agent can pick up the ticket when requested

## Current Position

Implementation complete. Script created and tested. Awaiting Radarr configuration to complete integration.

## Blocker

### Blocker Summary
User action required to complete integration

### What Was Completed
- Created Plex scan trigger script at /home/john/ARR/scripts/plex-scan-trigger.sh
- Script uses Plex API token (BkG3zmDp2Jzp2muueUZC) to trigger library refresh
- Tested successfully - logs at /home/john/ARR/logs/plex-scan-trigger.log show successful API calls for both Movies (section 1) and TV Shows (section 2) libraries

### What Failed
- Cannot configure Radarr via API to call the script automatically (Radarr UI requires admin access for Connect settings)

### Why It Failed
Radarr's connect/settings configuration requires authenticated UI access. API requires admin authentication which is not available in current context.

### Evidence
- Script tested manually: `curl -X POST http://localhost:32400/library/sections/1/refresh -H "X-Plex-Token: BkG3zmDp2Jzp2muueUZC"` returns HTTP 200
- Log file shows successful scans: /home/john/ARR/logs/plex-scan-trigger.log

### Why This Blocks Completion
The script is ready and working, but Radarr needs to be configured to call it automatically when new media is imported. This configuration must be done via the Radarr UI (Settings > Connect > Add Custom Script).

### What You Need To Do

Configure Radarr to call the Plex scan trigger script:

1. Open Radarr UI: http://192.168.1.146:7878
2. Go to **Settings** → **Connect**
3. Click **+** to add a new connection
4. Select **Custom Script**
5. Configure:
   - **Name:** Plex Library Scan
   - **On Import:** ✅ (checked)
   - **On Upgrade:** ✅ (checked)
   - **On Download Folder Imported:** ✅ (checked)
   - **Path:** `/home/john/ARR/scripts/plex-scan-trigger.sh`
6. Save settings

### Next Step After Unblock

Once Radarr is configured to call the script, verify the integration works by:
1. Triggering a manual download in Radarr
2. Checking the log file at /home/john/ARR/logs/plex-scan-trigger.log to confirm scan is triggered
3. Verifying new content appears in Plex without manual refresh

## Completion Summary

Not complete. Implementation done, awaiting user to configure Radarr UI to enable automation.