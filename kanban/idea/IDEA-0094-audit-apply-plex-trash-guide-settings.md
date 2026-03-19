# Idea

**ID:** IDEA-0094
**Title:** Audit and Apply Plex TRaSH Guide Recommended Settings
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-19
**Last Updated:** 2026-03-19

## Summary
 John's Plex container runs with default settings from the LinuxServer image. The TRaSH Guides (officially collaborated with Radarr/Sonarr developers) list specific Plex settings that improve performance, save disk space, and reduce unnecessary work — including database cache size, thumbnail generation, IPv6, and media deletion policies.

## Why It Might Matter
 Default Plex settings are not optimised for an ARR stack. Specific issues likely present in John's setup:
- **Database cache**: defaults to 40MB — TRaSH recommends 1024–2048MB for larger libraries
- **Video preview thumbnails**: enabled by default, consumes significant disk I/O and CPU — TRaSH recommends "Never"
- **Media deletion**: Plex may delete files independently of Sonarr/Radarr — TRaSH recommends keeping this disabled
- **IPv6**: TRaSH recommends disabled unless IPv6 is fully verified working
- **LAN Networks**: needs explicit configuration when Plex runs in host network mode alongside Docker
- **Scheduled vs on-add generation**: intro/credits/chapter markers set to "on media add" cause performance spikes — TRaSH recommends scheduling these as background tasks

## Suggested Outcome
 Plex running with TRaSH-recommended settings, with a documented change log of what was changed and why.

## Suggested Acceptance Criteria
- [ ] Review current Plex settings in the Plex Web UI (Settings → Library, Settings → Network)
- [ ] Apply TRaSH-recommended settings: Database Cache to 1024MB (or 2048MB), preview thumbnails to Never, allow media deletion Disabled, IPv6 Disabled
- [ ] Configure LAN Networks if needed for Docker host networking
- [ ] Change intro/credits/chapter marker generation from "on add" to scheduled task
- [ ] Verify Plex remote access works correctly after any network changes

## Context
- Plex container: `lscr.io/linuxserver/plex`, runs in `network_mode: host`
- TRaSH Guide reference: https://trash-guides.info/Plex/Tips/Plex-media-server/
- Plex claim token not currently set — may need to be added for initial setup
- No explicit `ADVERTISE_IP` env var set in docker-compose

## Suggested Next Step
 Open Plex Web UI at http://192.168.1.146:32400/web, go through Settings → Library and Settings → Network, and compare against TRaSH guide recommendations. Apply changes incrementally and test playback.

## Approval Decision
Pending

## Rejection Reason

## Notes
 Source: TRaSH Guide Plex Media Server Settings (https://trash-guides.info/Plex/Tips/Plex-media-server/). This is distinct from OC-0012 which focuses on Sonarr/Radarr triggering Plex library rescans — this idea is about general Plex performance and correctness settings.
