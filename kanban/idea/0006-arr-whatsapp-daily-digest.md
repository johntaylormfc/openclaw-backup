# Idea
**ID:** 0006-arr-whatsapp-daily-digest
**Title:** ARR WhatsApp Daily Digest Agent - Automated media download summary
**Status:** Pending Review
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-04-27
**Last Updated:** 2026-04-27

## Summary
AI agent that queries Radarr/Sonarr APIs each evening and sends a WhatsApp summary: "Downloads today: X added, Y completed, Z failed. Active queue: N items." Uses existing WhatsApp channel plugin to send formatted messages.

## Why It Might Matter
- John currently checks dashboard manually to see download progress
- Automated digest replaces daily manual check
- Can include fail alerts (notify if downloads stuck > 24h)
- Builds on existing WhatsApp integration

## Suggested Outcome
- [ ] Review and evaluate
- [ ] Prototype using Prowlarr/Sonarr API calls + message tool