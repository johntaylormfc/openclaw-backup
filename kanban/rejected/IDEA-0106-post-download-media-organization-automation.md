# Idea
**ID:** IDEA-0106
**Title:** Post-Download Media Organization Automation
**Status:** Rejected
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-23 08:00
**Last Updated:** 2026-03-25 06:48

## Summary
Create an automation that organizes downloaded media files into structured subfolders (by genre, year, or resolution) after Radarr/Sonarr imports them. This would help with library browsing and reduce manual sorting.

## Why It Matters
After downloads complete, media sits in generic folders. Automatically moving files into genre/year subfolders improves library navigation and makes it easier to find content without relying on Plex metadata alone.

## Suggested Outcome
- Script runs after import completion via Radarr/Sonarr custom scripts
- Moves files into folders like /Movies/Action/, /Movies/2024/, /TV/Drama/
- Uses file metadata (or Plex API) to determine genre/year
- Skips hardlink moves to preserve storage efficiency

## Suggested Acceptance Criteria
- [ ] Script triggers on Radarr import event
- [ ] Correctly sorts at least 80% of media into appropriate folders
- [ ] Hardlinks remain intact (no file duplication)
- [ ] Handles failed categorization gracefully (keeps original path)

## Context
- Download folder: /home/john/arr-media/
- Media storage: configured in Radarr/Sonarr
- Plex library: http://192.168.1.146:32400
- Custom scripts folder: /home/john/ARR/scripts/

## Suggested Next Step
Test Plex API or file metadata to determine genre/year, then draft the organization script.

## Approval Decision
Rejected on 2026-03-25 06:48.

## Notes
Idea rejected on 2026-03-25 06:48. Reason: Hardlinks and Plex metadata categorization are complex to get right; not worth the risk of breaking the library right now.
