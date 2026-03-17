# Idea

**ID:** IDEA-0053
**Title:** ARR Stack Local Whisper AI Subtitle Generation
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-12
**Last Updated:** 2026-03-12

## Summary
Add local Whisper AI subtitle generation to the ARR stack using a Docker container with GPU support. This would allow automatic subtitle downloading via Bazarr and fallback to local AI generation when external subtitle providers fail.

## Why It Might Matter
The 2026 ARR stack guides (corelab.tech) highlight Whisper AI as a key addition for "AI-powered subtitles with Whisper." Having local subtitle generation means:
- Better privacy (no external API calls)
- Works for rare content without external subtitle providers
- Fills gaps when Bazarr can't find subtitles
- GPU-accelerated on modern hardware

## Suggested Outcome
A fully integrated Whisper AI container connected to Bazarr for automatic subtitle fallback.

## Suggested Acceptance Criteria
- [ ] Whisper AI container runs in Docker stack
- [ ] GPU passthrough configured (if hardware supports)
- [ ] Bazarr configured to use local Whisper as fallback
- [ ] Test subtitle generation on sample media file

## Context
Source: corelab.tech "Definitive Arr Docker Compose Guide (2026)"
Docker image: jellyfin-whisper-lab/whisper-container
Requires: NVIDIA GPU or CPU-only mode

## Suggested Next Step
Research Whisper Docker images, test GPU passthrough, configure Bazarr integration.

## Approval Decision
Pending

## Rejection Reason

## Notes
This builds on existing IDEA-0028 (Plex library scan) and could complement IDEA-0049 (Plex autoscan).
