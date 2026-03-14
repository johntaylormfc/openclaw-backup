# Idea

**ID:** IDEA-0065
**Title:** Lidarr + Soulseek Music Automation Integration
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-14
**Last Updated:** 2026-03-14

## Summary
Add Lidarr (music automation) with Soulseek (slskd) as a download client to the ARR stack. Reddit threads from early 2026 show this is a growing trend for music automation, offering an alternative to torrent/Usenet for rare or obscure music.

## Why It Might Matter
- Soulseek has unique music catalog not available on traditional indexers
- New 2026 guides show slskd + Gluetun VPN integration pattern
- Soularr provides automation layer similar to Sonarr for music
- Complements existing TV/movie automation with complete media coverage

## Suggested Outcome
OpenClaw can install and configure Lidarr with Soulseek download client alongside existing ARR stack.

## Suggested Acceptance Criteria
- [ ] Research slskd Docker configuration with Gluetun VPN
- [ ] Create Lidarr + slskd Docker Compose setup
- [ ] Document Soulseek advantages for rare music
- [ ] Test automation workflow for music downloads

## Context
- Reddit r/selfhosted: "GUIDE: Use Soulseek as a download client for Lidarr" (Feb 2026)
- Reddit r/Lidarr: Soulseek integration guides
- corelab.tech 2026 ARR stack guide mentions Lidarr

## Suggested Next Step
Accept this idea to create a ticket for implementing Lidarr + Soulseek integration.

## Approval Decision
Pending

## Rejection Reason

## Notes
Related to IDEA-0054 (docker compose generator) - would be another component option.
