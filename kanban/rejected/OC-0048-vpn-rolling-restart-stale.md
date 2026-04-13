# Idea
**ID:** (new — author on review)
**Title:** OC-0048 stale — VPN-aware rolling restart orchestrator never progressed
**Ticket:** OC-0048
**Status:** Review
**Priority:** Medium
**Author:** review-stale-tickets cron
**Created:** 2026-04-12 08:04

## Problem
OC-0048 was auto-picked up by `pick-up-new-tickets` cron on 2026-04-11 05:07 and has had zero activity since. The ticket defines a clear, high-value improvement (graceful rolling restart of ARR containers when gluetun VPN reconnects), but no Analyse/Prepare/Implement work has started.

## Why this needs attention
VPN reconnections leave dependent containers in a broken state. The fix is well-scoped. The ticket is sitting stale in "In Progress" with no owner and no activity log entries beyond creation.

## Suggested next steps
1. Assign an owner or let the cron agent pick it up seriously
2. Start the Analyse step — document the exact restart order and health-check approach
3. If blocked on a dependency (e.g. gluetun health endpoint), surface the blocker explicitly

## Urgency
Medium — the stack is currently not self-healing after VPN restarts. Low effort to implement with high reliability payoff.
