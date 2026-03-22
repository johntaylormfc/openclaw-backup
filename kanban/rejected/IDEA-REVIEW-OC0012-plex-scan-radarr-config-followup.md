# Idea
**ID:** IDEA-REVIEW-OC0012
**Title:** OC-0012 Follow-up: Complete Radarr Plex Scan Script Configuration
**Status:** Rejected
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-19 18:00
**Last Updated:** 2026-03-22 18:30

## Summary
The Plex library scan automation (OC-0012) is implemented and tested — the script at /home/john/ARR/scripts/plex-scan-trigger.sh works and returns HTTP 200 for both Movies and TV libraries. The only remaining step is for john to configure Radarr's Connect settings to call this script automatically on import/upgrade events.

## Why It Might Matter
Without this config step, new downloads won't trigger Plex library scans automatically. John has to manually refresh Plex after each download, defeating the purpose of the automation.

## Suggested Outcome
John configures Radarr (Settings → Connect → Custom Script) per the instructions in the blocked ticket, then the automation is complete and working end-to-end.

## Suggested Acceptance Criteria
- [ ] John configures Radarr Connect Custom Script pointing to /home/john/ARR/scripts/plex-scan-trigger.sh
- [ ] On-import and on-upgrade events are enabled in the script config
- [ ] A test download confirms Plex library updates without manual refresh

## Context
- Blocked ticket: OC-0012 (/home/john/.openclaw/workspace/kanban/blocked/OC-0012-plex-api-library-scan-automation-after-downloads.md)
- Script location: /home/john/ARR/scripts/plex-scan-trigger.sh
- Radarr UI: http://192.168.1.146:7878
- Log file: /home/john/ARR/logs/plex-scan-trigger.log

## Suggested Next Step
John opens Radarr at Settings → Connect → Add Custom Script and adds the script. Cron can send a reminder if not done within a week.

## Approval Decision
Rejected on 2026-03-22 18:30.

## Rejection Reason
Manual step - script ready, John to configure Radarr Connect settings in UI when convenient

## Notes
Idea rejected on 2026-03-22 18:30. Reason: Manual step - script ready, John to configure Radarr Connect settings in UI when convenient
