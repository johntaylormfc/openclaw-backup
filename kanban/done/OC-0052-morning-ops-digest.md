# Ticket: OC-0052
**Title:** Morning Ops Digest — Enhanced Standup
**Status:** new
**Priority:** low
**Created:** 2026-04-16
**Source:** Idea 0001 (github awesome-openclaw-usecases)

## Problem
Current 08:00 standup sends a basic WhatsApp with weather, Todoist, container count, and calendar. Doesn't give John operational context for the day.

## Proposed Solution
Expand the standup to include:
- Disk space trending (vs 7 days ago)
- Container health summary (any unhealthy, any new since yesterday)
- Kanban activity overnight (new tickets, blocked, decisions made)
- ARR activity (recent downloads, radarr/sonarr status)
- Any cron failures or errors from overnight logs
- Open issues from MEMORY.md that need attention today

## References
- Existing: `/home/john/.openclaw/scripts/daily-standup.js`
- Related: kanban/idea/0001-web-awesome-openclaw-use-cases---github.md (rejected)

## Outcome
John has a single morning message with everything he needs to start the day, instead of checking 5 different dashboards.

## Notes
Low priority — doesn't block anything. Build incrementally: start with disk trending, then layer in other sections.
