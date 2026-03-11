# Idea

**ID:** IDEA-0028
**Title:** Plex API Library Scan Automation After Downloads
**Status:** Accepted
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-09
**Last Updated:** 2026-03-11 21:30

## Summary
Use the Plex API to automatically trigger library scans after Radarr imports new media, ensuring newly downloaded content appears in Plex without manual refresh.

## Why It Matters
Currently new media may not appear in Plex immediately after download completes. Plex Pro Week '25 highlighted API capabilities for automation. This improves UX by eliminating the need to manually trigger "Scan Library Filesystem" in Plex.

## Suggested Outcome
Automatic library refresh triggered when Radarr successfully imports a download, keeping Plex library in sync with minimal delay.

## Suggested Acceptance Criteria
- [ ] Identify Plex API endpoint for triggering library scans
- [ ] Create automation script/cron job to call Plex API after Radarr imports
- [ ] Test library scan triggers on new media imports
- [ ] Verify media appears in Plex without manual refresh
- [ ] Add to ARR stack automation documentation

## Context
Source: https://www.plex.tv/en-gb/blog/plex-pro-week-25-api-unlocked/
Related: Existing Radarr and Plex setup in /home/john/ARR/

## Suggested Next Step
Research Plex API authentication and library scan endpoint, then prototype automation.

## Approval Decision
Accepted on 2026-03-11 21:30 and converted to ticket OC-0012.

## Rejection Reason

## Notes
Idea accepted and converted into live ticket OC-0012.
