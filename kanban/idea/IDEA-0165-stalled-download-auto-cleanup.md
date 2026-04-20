# Idea
**ID:** IDEA-0165
**Title:** Stalled download auto-cleanup for Transmission
**Status:** Pending Review
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-04-20
**Last Updated:** 2026-04-20

## Summary
Use the transmission-remote API to detect downloads stalled at 0 bytes for more than 4 hours. Automatically pause or remove stalled torrents and optionally alert via WhatsApp. Run as a nightly cron.

## Why It Might Matter
Stalled downloads block queue progress and fill disk space without completing. Manually checking Transmission is tedious. Auto-cleanup keeps the queue moving and frees disk space automatically.

## Suggested Outcome
If accepted, this idea should be converted into a live ticket with clear acceptance criteria and put into kanban/new.

## Suggested Acceptance Criteria
- [ ] Scope is clear enough to become a live ticket