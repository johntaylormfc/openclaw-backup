# Idea

**ID:** IDEA-0066
**Title:** Readarr Audiobook & Ebook Automation Integration
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-14
**Last Updated:** 2026-03-14

## Summary
Add Readarr (ebook and audiobook automation from the *Arr family) to the ARR stack. Recent 2026 guides and Reddit discussions show Readarr has matured, offering automated book collection management similar to Sonarr/Radarr.

## Why It Might Matter
- Completes the media automation stack (TV → Movies → Music → Books)
- Readarr syncs with Prowlarr for indexer management
- New 2026 guides show Docker Compose patterns for Readarr
- Audiobookshelf integration for audiobooks makes complete library
- Alternative tools like ReadMeABook (v1.1.0 released Feb 2026) offer enhanced features

## Suggested Outcome
OpenClaw can install and configure Readarr for ebook/audiobook automation with Audiobookshelf.

## Suggested Acceptance Criteria
- [ ] Research Readarr Docker configuration
- [ ] Create Readarr + Audiobookshelf Docker Compose setup
- [ ] Document Prowlarr indexer integration for books
- [ ] Explore ReadMeABook as alternative/enhancement

## Context
- rapidseedbox.com: "Readarr Guide (2026): What It Is, Audiobooks and Alternatives"
- docker.recipes: "Readarr Book Manager Docker Compose"
- Reddit r/selfhosted: "ReadMeABook v1.1.0 - Audiobook automation for Plex & Audiobookshelf"
- Reddit: Multiple threads on Readarr alternatives (LazyLibrarian, Shelfmark)

## Suggested Next Step
Accept this idea to create a ticket for implementing Readarr integration.

## Approval Decision
Pending

## Rejection Reason

## Notes
Part of complete media automation ecosystem. Could combine with IDEA-0053 (Whisper subtitles) for audiobook processing.
