# Idea
**ID:** 0007-arr-hardlink-optimizer
**Title:** ARR Hardlink Disk Space Saver - Optimize media file storage with hardlinks
**Status:** Pending Review
**Suggested Priority:** High
**Source:** Cron
**Created:** 2026-04-27
**Last Updated:** 2026-04-27

## Summary
Configure Docker volumes to use hardlinks between radarr/sonarr download and media folders. When a download completes in the download client folder, a post-processing script creates a hardlink in the media folder (same filesystem, instant copy, no extra disk space). Saves ~2x disk usage by avoiding duplicate media files.

## Why It Matters
- John's ARR stack currently likely copies files (duplicating disk usage)
- Hardlinks are instant and use zero additional space
- Setup requires matching filesystem + Docker volume config
- One-time setup that pays ongoing dividends

## Suggested Outcome
- [ ] Review and evaluate
- [ ] Check current Docker volume paths: `docker volume inspect arr-{media,downloads}`