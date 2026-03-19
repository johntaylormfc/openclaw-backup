# Idea

**ID:** IDEA-0096
**Title:** Set Up Tautulli Notifications for New Plex Library Additions
**Status:** Idea
**Suggested Priority:** Low
**Source:** Cron
**Created:** 2026-03-19
**Last Updated:** 2026-03-19

## Summary
 John's Tautulli (port 8181) monitors Plex stream activity but currently has no notification configured for new media being added to Plex libraries. The TRaSH guide recommends triggering Plex library scans when media is imported — but proactively notifying john (via WhatsApp) when new content arrives would give visibility into what's being added and whether the ARR pipeline is working end-to-end.

## Why It Might Matter
 With Sonarr and Radarr automatically importing downloads, john has no easy way to see what new content landed in Plex without manually checking. A Tautulli notification script that fires when new movies/TV episodes appear in Plex — and sends a summary via the existing arr-webhook-notifier to WhatsApp — would close the visibility gap. This complements OC-0012 (Plex scan trigger) rather than replacing it.

## Suggested Outcome
 Tautulli configured with a notification agent that calls a script or webhook whenever new content is added to Plex, delivering a short summary (title, library, quality) to WhatsApp.

## Suggested Acceptance Criteria
- [ ] Identify Tautulli's "New Movie" / "New Episode" notification triggers in Tautulli settings
- [ ] Write a small notification script (or use Tautulli's built-in webhook) that posts to arr-webhook-notifier
- [ ] Configure Tautulli to fire the notification on library additions (not just streams)
- [ ] Test end-to-end: trigger a test Sonarr/Radarr import → verify WhatsApp message received
- [ ] Document the notification format (e.g., "🎬 New: Movie Name (2024) | 1080p | Library: Movies")

## Context
- Tautulli already running on port 8181 with Plex logs mounted read-only
- arr-webhook-notifier already running on port 9001 with WhatsApp enabled
- OC-0012 Plex scan trigger script already exists at /home/john/ARR/scripts/plex-scan-trigger.sh
- Tautulli supports custom notification scripts and webhooks natively

## Suggested Next Step
 Open Tautulli at http://192.168.1.146:8181 → Settings → Notification Agents → Add a new agent using "Custom Script" or "Webhook". Point it at the arr-webhook-notifier endpoint or write a small shell script that formats the payload for WhatsApp.

## Approval Decision
Pending

## Rejection Reason

## Notes
 Distinct from OC-0012 (which is about triggering Plex to scan after Radarr imports). This is about notifying john after the scan completes and new content is visible. Could potentially reuse the existing arr-webhook-notifier. Source: TRaSH Plex Autoscan documentation and Tautulli community scripts.
