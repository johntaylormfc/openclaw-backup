# Idea

**ID:** IDEA-0027
**Title:** ARR Docker PUID/PGID Optimization for Media Server
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-09
**Last Updated:** 2026-03-09

## Summary
Implement proper PUID (Process UID) and PGID (Process GID) settings for all ARR stack Docker containers based on current best practices. This ensures correct file ownership permissions for media files and accessed by Plex/Emby.

## Why It Might Matter
Incorrect PUID/PGID settings cause permission denied errors, failed imports, and media not appearing in Plex. The corelab.tech guide documents the recommended approach for 2025/2026.

## Suggested Outcome
All ARR containers use consistent PUID/PGID matching the media storage user, eliminating permission-related import failures.

## Suggested Acceptance Criteria
- [ ] Document current PUID/PGID settings in use
- [ ] Compare against best practice recommendations
- [ ] Update docker-compose.yml with optimized values
- [ ] Test file access across all containers
- [ ] Verify media imports work correctly

## Context
Source: https://corelab.tech/arr-stack-docker-compose-guide/
Related: Existing ARR stack at /home/john/ARR/

## Suggested Next Step
Review current docker-compose.yml PUID/PGID values and compare with recommendations.

## Approval Decision
Pending

## Rejection Reason

## Notes
May require container restart. Consider testing on non-production first.
