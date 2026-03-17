# Idea
**ID:** IDEA-0071
**Title:** Launcharr - Plex-Authenticated ARR Dashboard Integration
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-15
**Last Updated:** 2026-03-15

## Summary
Integrate Launcharr as a unified homepage/dashboard for the ARR stack with Plex authentication. Launcharr provides role-based access control (admin, co-admin, user), unified dashboard with app overviews, and app launch modes (iframe, new-tab, disabled).

## Why It Might Matter
Currently, managing the ARR stack requires jumping between multiple tabs for Sonarr, Radarr, Prowlarr, etc. Launcharr consolidates everything into one clean interface with Plex as the identity provider, making it easier for households with multiple users to access the media stack.

## Suggested Outcome
A working Launcharr container integrated with the existing ARR stack and Plex, providing a unified entry point for all media management apps.

## Suggested Acceptance Criteria
- [ ] Launcharr container deployed and accessible
- [ ] Plex authentication working
- [ ] Role-based visibility configured for admin/user roles
- [ ] All ARR apps (Sonarr, Radarr, Prowlarr) accessible from dashboard
- [ ] Custom apps/categories configured

## Context
- GitHub: https://github.com/MickyGX/launcharr
- Reddit discussion: r/sonarr/comments/1r5kzyv
- Docker-based, no external dependencies beyond Plex auth

## Suggested Next Step
Deploy Launcharr as a Docker container, configure Plex authentication, and map ARR app URLs.

## Approval Decision
Pending

## Rejection Reason

## Notes
Discovered via web search for ARR stack tutorials and automation tools.
