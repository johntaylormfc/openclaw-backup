# Idea
**ID:** IDEA-0160
**Title:** ARR Config Rolling Backup Cron
**Status:** Done
**Suggested Priority:** High
**Source:** Weekly Idea Dump (Cron)
**Created:** 2026-03-30

## Summary
A daily cron that backs up the entire /home/john/ARR config directory (docker-compose.yml, config files, app data) to a local rotating backup folder (e.g., rolling 7-day retention) and optionally pushes to a remote location. Prevents config loss from container misadventures or disk failures.

## Why It Might Matter
John's ARR stack is the backbone of his media setup. A single bad docker-compose edit or a corrupted config file can take down the whole stack. Automated rolling backups mean there's always a recent known-good state to roll back to.

## Suggested Outcome
- [ ] Map backup source and destination paths
- [ ] Decide retention policy (7-day rolling vs. weekly/monthly)
- [ ] Accept and scope, or reject
