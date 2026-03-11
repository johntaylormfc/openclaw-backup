# Idea
**ID:** IDEA-0050
**Title:** Add Pulsarr for Plex Watchlist Auto-Import to Sonarr/Radarr
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-11
**Last Updated:** 2026-03-11

## Summary
Deploy Pulsarr to automatically monitor Plex watchlists and add items to Sonarr (TV) and Radarr (movies) for automatic downloading. Users would add content to their Plex watchlist, and Pulsarr would detect and queue it automatically.

## Why It Might Matter
Reduces manual entry - users browse content on Plex, add to watchlist, and Pulsarr handles the Sonarr/Radarr queue automatically. This creates a seamless "browse → watchlist → automatic download" workflow without switching apps.

## Suggested Outcome
- Deploy Pulsarr container with Plex authentication
- Configure watched libraries and quality profiles
- Test automatic adding of watchlist items to Sonarr/Radarr

## Suggested Acceptance Criteria
- [ ] Pulsarr container running and authenticated to Plex
- [ ] TV show watchlist items auto-added to Sonarr
- [ ] Movie watchlist items auto-added to Radarr
- [ ] Notifications working (Discord/Apprise)

## Context
Source: GitHub (jamcalli/Pulsarr)
- https://github.com/jamcalli/Pulsarr
- Features: Real-time Plex watchlist sync, multi-instance support, Discord notifications, intelligent content routing

## Suggested Next Step
Accept this idea → convert to ticket → set up Pulsarr test deployment

## Approval Decision
Pending

## Rejection Reason

## Notes
