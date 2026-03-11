# Idea

**ID:** IDEA-0025
**Title:** OpenClaw Restore Points / Snapshot System
**Status:** Accepted
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-09
**Last Updated:** 2026-03-11 21:29

## Summary
Implement a restore point/snapshot system for OpenClaw that allows users to easily backup and restore their configuration, memory, skills, and channel settings.

## Why It Matters
Users frequently experiment with OpenClaw configurations, skills, and settings. A restore point system would allow safe experimentation by enabling quick rollbacks when things break. YouTube tutorials mention "OpenClaw Restore Points" as a requested feature.

## Suggested Outcome
A command or cron-based system that creates restore points (tar/zip archives) of OpenClaw state including: config.yaml, memory/, skills/, .env, and channel credentials. Users can list, restore, and delete restore points.

## Suggested Acceptance Criteria
- [ ] Can create restore points with timestamped names
- [ ] Can list available restore points
- [ ] Can restore from any restore point
- [ ] Can delete old restore points
- [ ] Handles memory/, skills/, config.yaml, and .env

## Context
From YouTube search results:
- "OpenClaw Keeps Breaking!!!! Get ClawLauncher to fix it!" 
- "New! OpenClaw Restore Points!" - mentioned in OpenClaw Tutorial Videos playlist
- Multiple tutorials show users having trouble with configurations breaking

## Suggested Next Step
Create a CLI tool or shell script that bundles the key OpenClaw directories into restore points and provides restore functionality.

## Approval Decision
Accepted on 2026-03-11 21:29 and converted to ticket OC-0011.

## Rejection Reason


## Notes
Idea accepted and converted into live ticket OC-0011.
