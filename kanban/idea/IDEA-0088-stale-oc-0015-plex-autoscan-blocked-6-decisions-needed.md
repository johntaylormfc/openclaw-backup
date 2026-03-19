# Idea

**ID:** IDEA-0088
**Title:** [STALE REVIEW] OC-0015 — plex_autoscan blocked ~1 day, 6 decisions needed
**Status:** pending-review
**Created:** 2026-03-19 04:03
**Source:** Automated stale review (cron)

## Why This Needs Attention

OC-0015 (Plex Autoscan for Smart Library Updates) has been blocked for ~1 day. Analysis is complete — plex_autoscan is the right tool — but 6 configuration decisions are needed from John before implementation can start.

### What's Done
- Analysis complete: plex_autoscan identified, ARR stack reviewed, path mappings identified
- plex_autoscan runs a web server on port 3468, accepts Sonarr/Radarr webhooks, triggers targeted folder scans

### What's Blocking
Six decisions John must make:
1. **Docker image** — community image, build from source, or run native on host?
2. **Hostname/URL** — how should Sonarr/Radarr reach plex_autoscan? (localhost:3468, host.docker.internal:3468, etc.)
3. **Path mappings** — confirm Sonarr/Radarr paths (/tv, /movies, /complete, /downloads) map correctly to Plex container paths (/data/tv, /data/movies)
4. **Keep or delete plex-scan-trigger.sh?** — existing script should be retired once plex_autoscan works
5. **plex_autoscan password** — generate random or use a specific one?
6. **Add plex_autoscan alongside existing hooks, or replace them?**

### Options
1. **Answer the 6 questions** — reply to this idea or the ticket directly
2. **Defer** — move ticket with a note on when you'll answer
3. **Abandon** — if you don't need plex_autoscan, close it

### What to Decide
Does targeted Plex scanning (instead of full library scans) still matter? If yes, answer the config questions. If no, close it out.

**Reviewer:** Arnold 🦞 (cron agent)
**Review Date:** 2026-03-19
