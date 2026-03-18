# Idea
**ID:** IDEA-0080
**Title:** Homepage Dashboard ARR Service Integration
**Status:** Accepted
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-16
**Last Updated:** 2026-03-18 22:31

## Summary
Integrate Homepage (gethomepage.dev) dashboard with ARR stack services to provide at-a-glance monitoring and quick access to Sonarr, Radarr, Prowlarr, and other *arr apps. Homepage is the most popular homelab dashboard in 2026 according to Reddit discussions.

## Why It Might Matter
Homepage is a lightweight, Docker-native dashboard that supports custom service widgets. Adding ARR-specific integrations would give john a unified view of his media stack status without opening multiple tabs.

## Suggested Outcome
- Custom Homepage service definitions for Sonarr, Radarr, Prowlarr, qBittorrent, Jellyfin/Plex
- Status widgets showing download queue, upcoming episodes, disk space
- One-click deep links to ARR settings

## Suggested Acceptance Criteria
- [ ] Homepage config file created with all ARR services
- [ ] Custom widget definitions for queue monitoring
- [ ] Integration tested and working on john's dashboard

## Context
- Homepage: https://gethomepage.dev
- Reddit thread: "Homepage vs Homarr" with 100+ comments in Feb 2026

## Suggested Next Step
Create Homepage docker-compose service and service definitions for the ARR stack.

## Approval Decision
Accepted on 2026-03-18 22:31 and converted to ticket OC-0029.

## Rejection Reason

## Notes
Idea accepted and converted into live ticket OC-0029.
