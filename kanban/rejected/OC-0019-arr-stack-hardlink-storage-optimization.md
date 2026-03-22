# Ticket: ARR Stack Hardlink Storage Optimization
**ID:** OC-0019
**Title:** ARR Stack Hardlink Storage Optimization
**Status:** Rejected
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Arnold (agent)
**Created:** 2026-03-18 22:28
**Last Updated:** 2026-03-22 19:04

## Goal
Implement and document proper hardlink configuration for the ARR stack to avoid duplicating media files. This saves disk space and enables instant file moves between download and media folders.

## Why
This work was accepted from idea IDEA-0055.

## Acceptance Criteria
- [x] Scope is confirmed
- [x] Work is started by moving ticket to In Progress
- [x] Activity log is maintained
- [x] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0055
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [x] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-18 22:28
  **Action:** Ticket created from accepted idea
  **Result:** Ticket added to kanban/new
  **Why:** User accepted idea IDEA-0055
  **Evidence:** Created via accept_idea.py
  **Next Step:** Agent can pick up the ticket when requested

- **Timestamp:** 2026-03-19 11:00
  **Action:** Analysis completed — hardlinks blocked by NAS export architecture
  **Result:** Ticket in-progress; blocker identified
  **Why:** NFS exports on Synology prevent cross-mount hardlinks; fix requires Synology reconfiguration
  **Evidence:**
    - `ln /mnt/nas/complete/.hl_test /mnt/nas/tv/.hl_test` → `Invalid cross-device link`
    - Synology exports separate NFS shares: /volume1/Complete, /volume1/TV, /volume1/Movies
    - Sonarr copyUsingHardlinks: true (API confirmed)
    - Radarr copyUsingHardlinks: true (API confirmed)
    - docker-compose.yml mounts correctly aligned
  **Next Step:** Awaiting John's decision on approach (see Blocker section)

## Current Position
Analysis complete. Sonarr and Radarr have hardlinks correctly enabled, docker-compose mount layout is correct. Hardlinks cannot function because Synology exposes /volume1/Complete, /volume1/TV, /volume1/Movies as separate NFS exports — NFS prevents hardlinks across export boundaries. Synology-level issue.

## Blocker

### Blocker Summary
Synology NFS export architecture prevents hardlinks between /mnt/nas/complete and media directories.

### What Was Completed
- Confirmed all NAS mounts share Device 0,58 (same NFS filesystem)
- Verified Sonarr copyUsingHardlinks: true via API
- Verified Radarr copyUsingHardlinks: true via API
- docker-compose mount layout verified correct
- Live test: ln across /mnt/nas/complete -> /mnt/nas/tv → Invalid cross-device link

### What Failed
Hardlink creation between /mnt/nas/complete and media dirs — NFS cross-export boundary.

### Why It Failed
Synology exports each subdir as separate NFS share. NFSv3 treats each export as separate filesystem for hardlink purposes, even sharing same BTRFS volume.

### Evidence
```
$ ln /mnt/nas/complete/.hl_test /mnt/nas/tv/.hl_test
ln: failed to create hard link: Invalid cross-device link

$ mount | grep volume1
192.168.1.164:/volume1/Complete /mnt/nas/complete nfs
192.168.1.164:/volume1/TV      /mnt/nas/tv      nfs
192.168.1.164:/volume1/Movies  /mnt/nas/movies  nfs
```

### Why This Blocks Completion
Fix requires NAS-level reconfiguration. Cannot be done via docker-compose or inside containers.

### What You Need To Decide
Choose one:

1. Consolidate NFS exports on Synology (recommended): Export /volume1 as single share. Update docker-compose.yml to mount /mnt/nas as one bind. Enables hardlinks across all ARR dirs. Requires Synology config + compose update.

2. Accept current state (copying, no hardlinks): ARR apps will copy files. Extra disk space but no NAS changes. Document and close as working-but-not-optimal.

3. Something else? Tell me.

### Next Step After Unblock
- Option 1: Draft Synology steps + docker-compose changes
- Option 2: Document findings and close ticket

## Completion Summary
Not complete.
