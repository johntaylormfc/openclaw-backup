# Idea
**ID:** IDEA-REVIEW-OC0019
**Title:** OC-0019 Follow-up: Synology NAS Hardlink Approach Decision
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-19 18:00
**Last Updated:** 2026-03-19 18:00

## Summary
OC-0019 (ARR Hardlink Storage Optimization) is correctly configured in ARR apps (Sonarr/Radarr both have copyUsingHardlinks: true) but hardlinks fail because Synology exports /volume1/Complete, /volume1/TV, /volume1/Movies as separate NFS shares. John needs to choose: (1) consolidate Synology exports to enable hardlinks, (2) accept copy-only mode and document it, or (3) another approach.

## Why It Might Matter
Without hardlinks, ARR apps copy files instead of hardlinking — doubling disk usage for new downloads. If the NAS can be reconfigured, hardlinks would save significant disk space and enable instant imports.

## Suggested Outcome
John picks an option and the ticket progresses or closes with a documented conclusion.

## Suggested Acceptance Criteria
- [ ] John chooses Option 1 (consolidate NFS export), Option 2 (accept copy-only), or provides alternative
- [ ] If Option 1: draft Synology + docker-compose change plan
- [ ] If Option 2: document hardlinks-not-possible on NFS and close ticket as working-but-not-optimal

## Context
- Blocked ticket: OC-0019 (/home/john/.openclaw/workspace/kanban/blocked/OC-0019-arr-stack-hardlink-storage-optimization.md)
- Synology NFS exports: separate shares for Complete, TV, Movies
- Live test confirms: `ln` across mounts → Invalid cross-device link
- ARR apps: hardlinks correctly enabled in config

## Suggested Next Step
Ask john which option he prefers. If no response in a week, nudge again.

## Approval Decision
Pending

## Rejection Reason

## Notes
ARR apps are already configured correctly — the blocker is entirely NAS-level. John's call on whether to reconfigure Synology or accept the limitation.
