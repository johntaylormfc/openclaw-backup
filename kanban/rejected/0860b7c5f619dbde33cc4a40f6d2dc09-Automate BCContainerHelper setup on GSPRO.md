# Ticket

**ID:** 0860b7c5f619dbde33cc4a40f6d2dc09
**Title:** Automate BCContainerHelper setup on GSPRO
**Status:** Rejected
**Column:** blocked
**Priority:** Medium
**Created:** 2026-03-05T23:00:44.894Z
**Last Updated:** 2026-03-22 19:04
**Created By:** user
**Type:** task

## Summary
Research and implement automated BCContainerHelper initialization for GSPRO Docker to prevent BC containers from exiting after 4 minutes

## Acceptance Criteria
- [ ] Investigate why BC containers exit after 4 minutes on GSPRO
- [ ] Identify BCContainerHelper initialization requirements
- [ ] Implement automated setup or document workaround
- [ ] Test and verify containers stay running

## Status
- **Stage**: blocked
- **Created**: 2026-03-05T23:00:44.894Z
- **Updated**: 2026-03-22T18:30:00.000Z

## Blocker

**GSPRO Docker Desktop is not running.** The Docker service (com.Docker.service) is running but Docker Desktop application itself is not running. This makes the Windows container named pipe (`npipe:////./pipe/docker_engine`) inaccessible.

**What John needs to decide:**
1. **Option A — Manual fix:** RDP/VNC into GSPRO (192.168.1.228), log in, and start Docker Desktop manually, then switch to Windows containers mode
2. **Option B — Automated fix:** Set up Docker Desktop to start automatically on login (or as a scheduled task), using the Windows task scheduler or a startup script

## Investigation Findings

### Current State (2026-03-22)
- Docker service: **Running** (`com.Docker.service`)
- Docker Desktop app: **Not running**
- Docker API pipe: **Inaccessible** (`npipe:////./pipe/docker_engine`)
- BcContainerHelper: **Installed** (versions 6.1.11 and 6.0.37 available)
- Last Docker Desktop shutdown: **2026-03-11 14:29 UTC** (crashed, not restarted)

### Historical Context
- BC containers were working around March 6-11, 2026
- Containers crashed with exit code `3221225786` (ACCESS_VIOLATION) on March 11
- Docker service has been in a broken state since then (no restart)
- The 4-minute BC container exit issue from March 4-5 was apparently resolved by the OC-0003 script, but the underlying Docker Desktop instability remains

### Root Cause
Docker Desktop application needs to be running for Windows containers to work. The service alone isn't sufficient. Docker Desktop must be started (which initializes the Windows container subsystem) and configured to use Windows containers (not Linux containers).

## Activity Log
- 2026-03-22T18:30:00.000Z | 🟡 Picked up from new | Arnold
- 2026-03-22T18:30:00.000Z | 🔍 Investigating GSPRO BC container setup...
- 2026-03-22T18:30:00.000Z | 🟥 Blocked: Docker Desktop not running on GSPRO
