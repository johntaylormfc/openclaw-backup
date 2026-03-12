# Idea

**ID:** IDEA-0055
**Title:** ARR Stack Hardlink Storage Optimization
**Status:** Idea
**Suggested Priority:** High
**Source:** Cron
**Created:** 2026-03-12
**Last Updated:** 2026-03-12

## Summary
Implement and document proper hardlink configuration for the ARR stack to avoid duplicating media files. This saves disk space and enables instant file moves between download and media folders.

## Why It Matters
The 2026 ARR stack guides (corelab.tech, oneuptime.com) emphasize that hardlinks are critical for:
- **Disk space savings**: No file duplication when copying from downloads to media
- **Instant moves**: Atomic moves instead of copy+delete
- **Seedbox efficiency**: Better ratio keeping on torrent trackers
- **Storage efficiency**: Essential for large media libraries

Current ARR stack may not be using hardlinks correctly, causing unnecessary disk usage.

## Suggested Outcome
Verify and fix hardlink configuration in current docker-compose.yml, document best practices.

## Suggested Acceptance Criteria
- [ ] All containers share same root media path
- [ ] Downloads folder and media folders on same filesystem
- [ ] Docker volumes configured for atomic moves
- [ ] Test: verify hardlinks work (inode check)
- [ ] Document hardlink requirements for future changes

## Context
Based on: corelab.tech "The Philosophy: Hunting Down the Perfect Setup" - hardlinks are fundamental to efficient ARR stacks.
Requires: All ARR containers + download client share /data volume.

## Suggested Next Step
Review current /home/john/ARR/docker-compose.yml volume mappings, verify all containers share same root path.

## Approval Decision
Pending

## Rejection Reason

## Notes
Related to IDEA-0029 (config backup) - if we regenerate compose, we need to ensure hardlinks are properly configured.
