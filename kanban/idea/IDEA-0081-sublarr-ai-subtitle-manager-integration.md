# Idea
**ID:** IDEA-0081
**Title:** Sublarr AI Subtitle Manager Integration
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-16
**Last Updated:** 2026-03-16

## Summary
Add Sublarr to the ARR stack as a modern alternative to Bazarr. Sublarr is a vibe-coded, self-hosted subtitle manager with automatic downloading, LLM-powered translation, and *arr compatibility.

## Why It Might Matter
Bazarr can be slow and sometimes gets stuck searching for subtitles. Sublarr offers a modern alternative with AI translation support (for anime and foreign media), better performance, and a cleaner interface. Reddit users are actively discussing it as a Bazarr replacement.

## Suggested Outcome
- Sublarr container added to docker-compose.yml
- Configured to integrate with Sonarr and Radarr
- Language settings aligned with existing preferences
- Test subtitle download for a recent download

## Suggested Acceptance Criteria
- [ ] Sublarr container deployed and accessible
- [ ] Connected to Sonarr and Radarr
- [ ] Successfully downloaded subtitles for test media
- [ ] Compared to Bazarr for potential replacement

## Context
- Sublarr GitHub: https://github.com/theroyaltnetrunner/sublarr
- Reddit: "Sublarr – self-hosted subtitle manager with download, tools & optional LLM translation" (March 2026)
- Bazarr is already in the stack but has performance issues

## Suggested Next Step
Deploy Sublarr as a test alongside Bazarr, compare functionality.

## Approval Decision
Pending

## Rejection Reason

## Notes
Could replace or supplement Bazarr. Different from IDEA-0053 (Whisper AI subtitle generation) - Sublarr downloads existing subtitles and can translate via LLM.
