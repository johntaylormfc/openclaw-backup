# Idea
**ID:** 0005-arr-docker-healthcheck-automation
**Title:** ARR Docker Healthcheck Automation - Auto-restart unhealthy containers based on download queues
**Status:** Pending Review
**Suggested Priority:** High
**Source:** Cron
**Created:** 2026-04-27
**Last Updated:** 2026-04-27

## Summary
Add custom healthcheck scripts to Radarr/Sonarr/Prowlarr containers that monitor queue status via API. If queue stalls (0 downloads for X hours) or API returns errors, auto-restart the container. Currently Docker healthchecks only check if the port responds, not actual functionality.

## Why It Might Matters
- ARR services can hang silently (API responds but downloads stalled)
- Manual intervention often required to notice stalled downloads
- Automated recovery reduces maintenance burden
- Works alongside existing Docker auto-restart policy

## Suggested Outcome
- [ ] Review and evaluate
- [ ] Create docker-compose.yml healthcheck override