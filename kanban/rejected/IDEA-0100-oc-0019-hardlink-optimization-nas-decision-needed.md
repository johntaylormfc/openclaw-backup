# Idea
**ID:** IDEA-0100
**Title:** OC-0019 - Choose ARR Hardlink Optimization Approach
**Status:** Rejected
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-20 00:01
**Last Updated:** 2026-03-22 04:02

## Summary
OC-0019 analysis is complete and confirmed hardlinks can't work across Synology NFS exports — each share is its own export boundary. The ticket is effectively blocked and needs John to choose one of three documented approaches.

## Why It Might Matter
Without choosing an approach, the ARR stack will continue using copy operations instead of hardlinks — meaning double the disk space usage and slower file operations. The ticket has been in-progress since March 19th with no decision from John.

## Suggested Outcome
John picks an approach from the three options in OC-0019's blocker section.

## Suggested Acceptance Criteria
- [ ] John chooses Option 1 (consolidate NFS exports on Synology), OR
- [ ] John chooses Option 2 (accept copying, document and close), OR
- [ ] John provides an alternative approach, OR
- [ ] John rejects this idea

## Context
- Blocked ticket: /home/john/.openclaw/workspace/kanban/blocked/OC-0019-arr-stack-hardlink-storage-optimization.md
- Status shows "In-Progress" but is effectively blocked
- Three options in blocker section:
  1. Consolidate Synology NFS exports (/volume1 single share) + update compose — enables hardlinks
  2. Accept current state — ARR apps copy files, extra disk used, no NAS changes needed
  3. Something else John suggests
- Live test confirmed: `ln /mnt/nas/complete/.hl_test /mnt/nas/tv/.hl_test` → Invalid cross-device link

## Suggested Next Step
Request John pick an option from the blocker section of OC-0019.

## Approval Decision
Rejected on 2026-03-22 04:02.
