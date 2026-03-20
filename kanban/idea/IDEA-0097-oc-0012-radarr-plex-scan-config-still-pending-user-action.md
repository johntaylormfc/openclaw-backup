# Idea
**ID:** IDEA-0097
**Title:** OC-0012 - Complete Radarr Plex Scan Configuration
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-20 00:01
**Last Updated:** 2026-03-20 00:01

## Summary
OC-0012 (Plex API Library Scan Automation) has been in Blocked status since March 13th. The trigger script is written and tested, but Radarr still needs manual UI configuration to call it on import events. This is a recurring stale ticket — user needs to configure Radarr Connect settings.

## Why It Might Matter
Without this configuration, new media from Radarr won't automatically trigger Plex library scans. John has to manually refresh Plex to see new content — defeating the purpose of the automation that was already implemented.

## Suggested Outcome
John either completes the Radarr UI configuration (Settings → Connect → Custom Script) or explicitly decides to close the ticket as wont-fix.

## Suggested Acceptance Criteria
- [ ] John configures Radarr per the instructions in OC-0012, OR
- [ ] John rejects this idea with a reason (e.g., manual Plex refresh is fine, or using Plex automatic scanning)

## Context
- Blocked ticket: /home/john/.openclaw/workspace/kanban/blocked/OC-0012-plex-api-library-scan-automation-after-downloads.md
- Script already exists: /home/john/ARR/scripts/plex-scan-trigger.sh
- Radarr UI: http://192.168.1.146:7878 → Settings → Connect → Add Custom Script
- Log file: /home/john/ARR/logs/plex-scan-trigger.log

## Suggested Next Step
Ping John directly to complete the Radarr configuration. If no response in 2 weeks, move OC-0012 to rejected/done with note that config was never completed.

## Approval Decision
Pending
