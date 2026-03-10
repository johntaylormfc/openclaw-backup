# Idea

**ID:** IDEA-0048
**Title:** TRaSH Guides Custom Formats Auto-Sync
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-10
**Last Updated:** 2026-03-10

## Summary
Implement automated sync of Custom Formats from TRaSH Guides collection to Radarr and Sonarr, keeping quality definitions up-to-date without manual updates.

## Why It Might Matter
TRaSH Guides maintains a comprehensive collection of Custom Formats for Radarr and Sonarr that get updated regularly as streaming services change their quality tiers. Manually importing these is tedious. Automating the sync ensures optimal quality detection without maintenance overhead.

## Suggested Outcome
Weekly automated import of latest Custom Formats from TRaSH Guides, keeping Radarr/Sonarr quality profiles optimized.

## Suggested Acceptance Criteria
- [ ] Identify TRaSH Guides Custom Formats JSON/RSS source
- [ ] Create sync script to import Custom Formats to Radarr
- [ ] Create sync script to import Custom Formats to Sonarr
- [ ] Set up weekly cron job for sync
- [ ] Test sync on non-production first
- [ ] Document manual override process if needed

## Context
Source: https://trash-guides.info/Radarr/radarr-setup-custom-formats/
Related: Existing Radarr/Sonarr at /home/john/ARR/

## Suggested Next Step
Research TRaSH Guides API or download mechanism for Custom Formats.

## Approval Decision
Pending

## Rejection Reason

## Notes
May need to filter which Custom Formats to import to avoid conflicts with existing custom profiles.
