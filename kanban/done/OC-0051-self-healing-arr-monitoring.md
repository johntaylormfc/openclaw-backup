# Ticket: OC-0051
**Title:** Self-Healing ARR Monitoring — Enhanced Auto-Recovery
**Status:** in-progress
**Priority:** medium
**Created:** 2026-04-16
**Source:** Idea 0001 (github awesome-openclaw-usecases)

## Problem
Current `auto-recovery.js` handles basic container restarts but doesn't diagnose failure causes or attempt targeted remediation.

## Proposed Solution
Enhance the existing auto-recovery infrastructure to:
- Log failure patterns before restart (disk pressure, OOM, port conflicts)
- Implement targeted fixes per failure type (not just restart)
- Track recurrence — if same container fails 3x in 24h, alert instead of retry
- Add a "diagnose mode" that inspects logs before acting

## References
- Existing: `/home/john/.openclaw/workspace/scripts/auto-recovery.js`
- Existing: `/home/john/.openclaw/workspace/scripts/arr-log-monitor.sh`
- Related: kanban/idea/0001-web-awesome-openclaw-use-cases---github.md (rejected)

## Outcome
Fewer repeated container failures, less noise in logs, faster Mean Time To Recovery.
