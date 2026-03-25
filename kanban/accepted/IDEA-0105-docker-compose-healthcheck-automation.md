# Idea
**ID:** IDEA-0105
**Title:** Docker Compose Healthcheck Automation for ARR Containers
**Status:** Accepted
**Suggested Priority:** High
**Source:** Cron
**Created:** 2026-03-23 08:00
**Last Updated:** 2026-03-25 06:47

## Summary
Add proper healthcheck configurations to all ARR containers in docker-compose.yml and create a monitoring script that alerts when any container becomes unhealthy. Currently, most ARR services lack healthchecks, making it hard to detect downtime early.

## Why It Might Matter
ARR containers can stop responding without obvious symptoms. Healthchecks would provide early warning via the dashboard or WhatsApp notification, preventing missed downloads and reducing downtime.

## Suggested Outcome
- Update docker-compose.yml with healthcheck entries for Sonarr, Radarr, Lidarr, qBittorrent, Plex, Jellyseerr, Overseerr
- Create a monitoring script that polls health status and alerts on failures
- Display container health status in the dashboard

## Suggested Acceptance Criteria
- [ ] All ARR containers have working healthcheck configurations
- [ ] Monitoring script can detect unhealthy containers within 5 minutes
- [ ] Alert notification sent to WhatsApp when container goes unhealthy
- [ ] Dashboard shows green/red status for each container

## Context
- Current docker-compose: /home/john/ARR/docker-compose.yml
- ARR services: Sonarr, Radarr, Lidarr, Readarr, Plex, qBittorrent, SABnzbd, Jellyseerr, Overseerr, Bazarr, Whisparr
- Notification channel: WhatsApp via arr-webhook-notifier (port 9001)

## Suggested Next Step
Review docker-compose.yml healthcheck syntax for each service and draft a monitoring script.

## Approval Decision
Accepted on 2026-03-25 06:47 and converted to ticket OC-0030.

## Notes
Idea accepted and converted into live ticket OC-0030.
