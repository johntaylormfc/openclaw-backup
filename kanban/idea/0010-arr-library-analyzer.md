# Idea
**ID:** 0010-arr-library-analyzer
**Title:** ARR Library Analyzer Dashboard - Visualize collection quality
**Status:** Pending Review
**Suggested Priority:** Low
**Source:** Cron
**Created:** 2026-05-04
**Last Updated:** 2026-05-04

## Summary
Create a lightweight Python/Node script that queries Radarr/Sonarr APIs and generates a weekly "library health" report: duplicate files, missing quality profiles, low-quality releases (SD when HD exists), unwatched media older than X days. Can display via existing dashboard or send as WhatsApp summary.

## Why It Might Matter
- John's collection grows over time, quality degrades without maintenance
- Manual review of library is time-consuming
- Identifies low-value files to delete (frees space)
- Helps enforce quality standards across the stack

## Suggested Outcome
- [ ] Review and evaluate
- [ ] Prototype: Radarr API `/api/v3/movie?hasFile=true` + Tautulli integration for playback data