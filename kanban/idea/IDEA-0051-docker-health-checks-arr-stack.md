# Idea
**ID:** IDEA-0051
**Title:** Add Docker Health Checks to ARR Stack Containers
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-11
**Last Updated:** 2026-03-11

## Summary
Add proper Docker health checks to Sonarr, Radarr, Prowlarr, and other ARR containers in docker-compose.yml. Health checks enable Docker to detect unhealthy containers and auto-restart them, improving stack reliability.

## Why It Matters
Without health checks, Docker doesn't know if an ARR app is actually responding or hung. Health checks provide:
- Automatic detection of stuck/unresponsive containers
- Auto-restart capability via restart: unless-stopped
- Better monitoring visibility

## Suggested Outcome
- Research API endpoints for each ARR app health check
- Add healthcheck config to docker-compose.yml for each container
- Configure restart policy to leverage health checks

## Suggested Acceptance Criteria
- [ ] Health checks added for Sonarr, Radarr, Prowlarr, qBittorrent
- [ ] Health check intervals reasonable (30s-2min)
- [ ] Restart policy updated to use health-aware restart
- [ ] Verify health checks actually detect app responsiveness

## Context
Source: Reddit r/sonarr and Docker guides
- Reddit thread on healthcheck command for docker-compose
- Docker Compose Health Checks guide available online
- ARR apps typically expose /api or /ping endpoints for health checking

## Suggested Next Step
Accept this idea → convert to ticket → research specific health check commands for each ARR app

## Approval Decision
Pending

## Rejection Reason

## Notes
