# Idea
**ID:** IDEA-0159
**Title:** Docker Image Update Watcher for ARR Stack
**Status:** Rejected
**Suggested Priority:** Medium
**Source:** Weekly Idea Dump (Cron)
**Created:** 2026-03-30

## Summary
A scheduled cron that periodically checks whether newer Docker image tags are available for John's ARR containers (Sonarr, Radarr, Prowlarr, PlexAutoscan, etc.) and sends a WhatsApp/Mission Control alert — without auto-updating, keeping control in John's hands.

## Why It Might Matter
ARR containers run best when kept up to date, but manually checking each image is tedious. A lightweight watcher surfaces updates as a weekly digest, so nothing falls dangerously out of date without John noticing.

## Suggested Outcome
- [ ] Evaluate if this overlaps with existing healthcheck automation (IDEA-0105)
- [ ] Decide: digest-style weekly alert vs. per-image notification
- [ ] Accept and scope, or reject
