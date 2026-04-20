# Idea
**ID:** IDEA-0166
**Title:** Media file naming enforcer before import
**Status:** Pending Review
**Suggested Priority:** Low
**Source:** Cron
**Created:** 2026-04-20
**Last Updated:** 2026-04-20

## Summary
Create a cron job that scans the download folder before Sonarr/Radarr import, validates file naming against their naming conventions, renames files to match expected patterns, and logs any files that can't be matched. Reduces "File not found" import errors.

## Why It Matters
Sonarr/Radarr fail to import releases with non-standard naming. Manually renaming per-release is tedious. Enforcing correct naming before import reduces failed imports and manual fixing.

## Suggested Outcome
If accepted, this idea should be converted into a live ticket with clear acceptance criteria and put into kanban/new.

## Suggested Acceptance Criteria
- [ ] Scope is clear enough to become a live ticket