# Idea

**ID:** IDEA-0029
**Title:** ARR Stack Configuration Backup Automation
**Status:** Accepted
**Suggested Priority:** High
**Source:** Cron
**Created:** 2026-03-09
**Last Updated:** 2026-03-11 21:30

## Summary
Implement automated backups of all ARR application configurations (Sonarr, Radarr, Prowlarr, qBittorrent, etc.) to a separate backup location with rotation.

## Why It Matters
ARR configurations contain indexers, quality profiles, download client settings, and UI customizations. Without backups, restoring after a container reset or failure requires manual reconfiguration. The DIY Media Server 2025 year in review highlighted config backup as a common best practice.

## Suggested Outcome
Daily automated backup of /home/john/ARR/ config directories to a backup location with 7-day rotation, easily restorable.

## Suggested Acceptance Criteria
- [ ] Identify all config directories to back up (config/ folders for each app)
- [ ] Create backup script with timestamp and rotation
- [ ] Set up daily cron job for backups
- [ ] Test restore process from backup
- [ ] Document backup location and restore procedure

## Context
Source: https://diymediaserver.com/post/2025-year-in-review/
Related: Existing ARR stack at /home/john/ARR/

## Suggested Next Step
Map out all config directories and create initial backup script.

## Approval Decision
Accepted on 2026-03-11 21:30 and converted to ticket OC-0013.

## Rejection Reason

## Notes
Idea accepted and converted into live ticket OC-0013.
