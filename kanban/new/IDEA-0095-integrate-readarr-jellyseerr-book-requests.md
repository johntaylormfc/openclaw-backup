# Idea

**ID:** IDEA-0095
**Title:** Integrate Readarr Into Jellyseerr/Overseerr Book Request Flow
**Status:** Idea
**Suggested Priority:** Low
**Source:** Cron
**Created:** 2026-03-19
**Last Updated:** 2026-03-19

## Summary
 John has Readarr (port 8787) and Calibre-Web (port 8083) running alongside Jellyseerr (port 5055) and Overseerr (port 5056). Currently, users can request movies and TV via the request portals but cannot request books — Readarr and Calibre-Web operate outside the automated ARR pipeline. Integrating Readarr would complete the ARR stack automation for all media types.

## Why It Might Matter
 With Jellyseerr and Overseerr in place, book requests currently require manual intervention: the user must discover the book, manually add it to Readarr, or request via Calibre-Web which doesn't trigger automated download workflows. Connecting Readarr to the request portals would give john a fully automated media server covering movies, TV, music, and books.

## Suggested Outcome
 Readarr is selectable as a service in Jellyseerr or Overseerr, allowing book requests to flow through Readarr's automated download pipeline.

## Suggested Acceptance Criteria
- [ ] Verify Jellyseerr supports Readarr integration (check Jellyseerr docs/settings → Services)
- [ ] If supported: add Readarr as a service in Jellyseerr UI with correct URL and API key
- [ ] If Jellyseerr doesn't support Readarr: check if Overseerr does (Overseerr and Jellyseerr share similar codebases)
- [ ] If neither supports Readarr natively: document alternative — Calibre-Web webhook, or a simple script triggered by a Tautulli/Plex webhook
- [ ] Test the full flow: request a book via Jellyseerr → Readarr picks it up → download completes → Calibre-Web serves it

## Context
- Services running: Jellyseerr (port 5055), Overseerr (port 5056), Readarr (port 8787), Calibre-Web (port 8083)
- Readarr API docs: http://192.168.1.146:8787/api
- Jellyseerr GitHub: https://github.com/fallenbagel/jellyseerr — check compatibility with Readarr
- John uses WhatsApp for notifications — arr-webhook-notifier (port 9001) is available for custom webhook routing

## Suggested Next Step
 Check Jellyseerr Settings → Services in the Web UI to see if Readarr appears as an option. If not, check Jellyseerr GitHub issues or docs for Readarr support status.

## Approval Decision
Pending

## Rejection Reason

## Notes
 This is a UX/completeness improvement for the ARR stack. Not urgent — books are a lower-volume media type. Source: general ARR stack best practices and Jellyseerr/Overseerr documentation patterns.
