# Idea

**ID:** IDEA-0086
**Title:** [STALE REVIEW] OC-0013 — ARR backup automation blocked 4 days, no progress
**Status:** Rejected
**Created:** 2026-03-19 04:03
**Source:** Automated stale review (cron)

## Why This Needs Attention

OC-0013 (ARR Stack Configuration Backup Automation) has been **blocked for 4 days** waiting on John to confirm backup scope.

### What's Done
- Ticket picked up and moved to in-progress on 2026-03-15

### What's Blocking
The blocker section lists 4 questions John must answer:
1. Which ARR apps need config backup? (Sonarr, Radarr, Prowlarr, Bazarr, qBittorrent, etc.)
2. Where should backups be stored? (local path, remote, cloud?)
3. How many backup versions to keep? (rotation policy)
4. How often to run backups? (daily, weekly?)

### Options
1. **Answer the 4 questions** — reply to this idea or the ticket directly with your decisions
2. **Defer** — move ticket to blocked with a note on when you'll answer
3. **Abandon** — if you no longer want this, close the ticket

### What to Decide
Does this still matter to you? If yes, answer the scope questions in the ticket. If no, close it out.

**Reviewer:** Arnold 🦞 (cron agent)
**Review Date:** 2026-03-19
