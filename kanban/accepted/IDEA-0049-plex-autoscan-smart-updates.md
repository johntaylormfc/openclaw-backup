# Idea
**ID:** IDEA-0049
**Title:** Implement Plex Autoscan for Smart Library Updates
**Status:** Accepted
**Suggested Priority:** High
**Source:** Cron
**Created:** 2026-03-11
**Last Updated:** 2026-03-11 22:50

## Summary
Add plex_autoscan to the ARR stack to replace full library scans with targeted folder scans. When Sonarr/Radarr imports a file, plex_autoscan will only scan that specific folder instead of triggering a full Plex library refresh.

## Why It Might Matter
Full library scans in Plex are slow and resource-intensive. plex_autoscan can reduce import times from minutes/hours to seconds by only scanning the imported folder. This is especially valuable for large media libraries.

## Suggested Outcome
- Install plex_autoscan container alongside the ARR stack
- Configure Sonarr/Radarr to use plex_autoscan for notification callbacks
- Measure and document import time improvements

## Suggested Acceptance Criteria
- [ ] plex_autoscan container deployed and running
- [ ] Sonarr/Radarr configured to notify plex_autoscan on import
- [ ] Verified only target folder is scanned, not full library
- [ ] Import time measured before/after

## Context
Source: Reddit r/docker and GitHub (l3uddz/plex_autoscan)
- https://github.com/l3uddz/plex_autoscan
- Related: OC-0012 handles basic Plex API scanning; this enhances it with smart folder targeting

## Suggested Next Step
Accept this idea → convert to ticket → research plex_autoscan configuration → deploy test container

## Approval Decision
Accepted on 2026-03-11 22:50 and converted to ticket OC-0015.

## Rejection Reason

## Notes
Idea accepted and converted into live ticket OC-0015.
