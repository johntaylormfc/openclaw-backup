# Idea
**ID:** IDEA-0072
**Title:** DUMB Stack (Zurg + Riven) - Debrid-Based Infinite Storage Integration
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-15
**Last Updated:** 2026-03-15

## Summary
Implement the DUMB (Debrid Unlimited Media Bridge) stack which combines Zurg (cloud storage mounting), Riven (automation brain), and Plex/Jellyfin into a unified Docker container. This enables "infinite storage" by treating Real-Debrid cloud content as local media.

## Why It Might Matter
Traditional ARR stacks require local storage for media files. The DUMB approach mounts cloud debrid services as local filesystems, allowing access to massive content libraries without local storage costs. Ideal for users with limited local storage who want access to large media collections.

## Suggested Outcome
A working DUMB stack that allows Plex/Jellyfin to browse and stream content directly from Real-Debrid cloud storage, with Riven automating content discovery and downloads.

## Suggested Acceptance Criteria
- [ ] Zurg container configured with Real-Debrid API
- [ ] Cloud storage appears as local filesystem to Plex
- [ ] Riven automation finds and organizes content
- [ ] Plex streams cloud content seamlessly
- [ ] VPN (Gluetun) integrated for security

## Context
- Reference: corelab.tech/ultimate-plex-debrid-guide/
- Uses Docker container that packages Zurg + Riven + Plex
- Requires Real-Debrid subscription
- Different from hardlinks (IDEA-0055) - this is cloud storage, not local optimization

## Suggested Next Step
Research Real-Debrid pricing, test DUMB stack in isolated environment, then document integration approach.

## Approval Decision
Pending

## Rejection Reason

## Notes
Discovered via web search for "Ultimate Plex Server 2026" and media server guides. This is a different approach from traditional local storage ARR stacks.
