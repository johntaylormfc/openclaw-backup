# Idea
**ID:** IDEA-0061
**Title:** ARR Stack FlareSolverr CAPTCHA Bypass Integration
**Status:** Idea
**Suggested Priority:** Low
**Source:** Cron
**Created:** 2026-03-13
**Last Updated:** 2026-03-13

## Summary
Add FlareSolverr integration to the ARR stack. FlareSolverr is a proxy server that helps bypass Cloudflare and CAPTCHA challenges, enabling Prowlarr and Jackett to access indexers that would otherwise be blocked.

## Why It Might Matter
- Many private torrent/indexer sites use Cloudflare protection
- CAPTCHAs block automated API calls from Sonarr/Radarr/Prowlarr
- FlareSolverr enables access to a wider range of indexers
- Improves automation reliability for media discovery
- Works alongside Gluetun VPN for complete privacy stack

## Suggested Outcome
OpenClaw can deploy FlareSolverr as part of the ARR stack with proper configuration for Prowlarr/Jackett integration.

## Suggested Acceptance Criteria
- [ ] Research FlareSolverr deployment and configuration
- [ ] Create Docker Compose configuration for FlareSolverr
- [ ] Document Prowlarr integration (Indexer Proxy settings)
- [ ] Document Jackett integration if applicable
- [ ] Note rate limiting and ethical usage considerations

## Context
- https://www.rapidseedbox.com/blog/flaresolverr-guide
- https://corelab.tech/arr-stack-docker-compose-guide/
- Runs on port 8191 by default
- Requires browser instance (chromium-based) for solving challenges

## Suggested Next Step
Accept this idea to create a ticket for implementing FlareSolverr integration.

## Approval Decision
Pending
