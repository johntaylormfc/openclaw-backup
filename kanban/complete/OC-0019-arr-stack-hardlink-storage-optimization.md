# Ticket
**ID:** OC-0019
**Title:** ARR Stack Hardlink Storage Optimization
**Status:** done
**Outcome State:** Complete
**Priority:** Low
**Owner:** Arnold 🦞
**Created:** 2026-03-11 21:29
**Last Updated:** 2026-03-19 20:38

## Goal
Optimize ARR stack to use hardlinks instead of copying files, saving disk space.

## What Was Found
- Synology NAS exports each subdirectory as a separate NFS share:
  - `/volume1/Complete` → `/mnt/nas/complete`
  - `/volume1/TV` → `/mnt/nas/tv`
  - `/volume1/Movies` → `/mnt/nas/movies`
- NFS treats each export as a separate filesystem — hardlinks cannot cross between them
- ARR apps fall back to copying files instead of hardlinking

## Decision
**Leave as-is** — John confirmed no NAS reconfiguration wanted.

## Acceptance Criteria
- [x] Analysis complete — root cause identified
- [x] Decision made: leave it
- [x] Ticket closed

## Activity Log
### Entries
- **Timestamp:** 2026-03-19 20:38
  **Action:** John confirmed: "Leave it"
  **Result:** Closed — ARR apps will copy instead of hardlink, extra disk usage accepted

## Current Position
Complete — no changes made, accepted as-is.

## Completion Summary
**OC-0019 closed as Complete.** Hardlinks don't work across NAS subexports — ARR apps copy files instead. John accepted the extra disk usage, no NAS changes needed.