# Idea
**ID:** 0009-arr-api-webhooks
**Title:** ARR API Webhook Router - Trigger external actions on download events
**Status:** Pending Review
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-05-04
**Last Updated:** 2026-05-04

## Summary
Set up Sonarr/Radarr webhook notifications to trigger external actions: (1) Run a custom script when downloads complete (e.g., notify Telegram, update Plex library), (2) Trigger re-indexing when Prowlarr finds new indexers, (3) Send failure alerts to Discord. Uses built-in webhook support in ARR apps or a lightweight listener container.

## Why It Might Matter
- ARR apps have event systems but they're underutilized
- Can automate post-download workflows (notify, refresh Plex, move files)
- Replaces manual checks for completed downloads
- One-time setup enables many automated workflows

## Suggested Outcome
- [ ] Review and evaluate
- [ ] Configure Sonarr webhook: Settings → Connect → Webhook → Custom script