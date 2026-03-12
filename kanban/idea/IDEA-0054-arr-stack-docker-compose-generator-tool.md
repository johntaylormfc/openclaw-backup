# Idea

**ID:** IDEA-0054
**Title:** ARR Stack Docker-Compose Generator Tool
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-12
**Last Updated:** 2026-03-12

## Summary
Create a local docker-compose.yml generator for the ARR stack that takes user paths and preferences and outputs a complete, production-ready compose file. Similar to the corelab.tech generator but running locally.

## Why It Matters
The 2026 guides (corelab.tech, oneuptime.com) emphasize that the ARR stack has grown complex with 10+ containers. Manually writing docker-compose.yml is error-prone. A local generator would:
- Ensure correct volume mappings for hardlinks
- Auto-configure network segmentation
- Include proper health checks
- Handle VPN container configurations
- Support adding/removing components easily

## Suggested Outcome
A script/tool that generates /home/john/ARR/docker-compose.yml from a simple config.

## Suggested Acceptance Criteria
- [ ] Generator script accepts media paths and preferences
- [ ] Outputs valid docker-compose.yml with Sonarr, Radarr, Prowlarr, Lidarr, Bazarr, qBittorrent
- [ ] Includes health checks for all containers
- [ ] Handles Gluetun VPN configuration
- [ ] Includes network segmentation (internal-proxy)

## Context
Based on: corelab.tech "Ultimate Arr Stack Generator" pattern (2026)
Similar tools exist online but local version ensures privacy and offline use.

## Suggested Next Step
Research existing generators, design config format, create bash/python script.

## Approval Decision
Pending

## Rejection Reason

## Notes
Would complement existing IDEA-0029 (ARR config backup automation) - together they form a complete config management solution.
