# Idea
**ID:** 0008-arr-resource-monitor
**Title:** ARR Docker Resource Monitor - Auto-alert on container resource spikes
**Status:** Pending Review
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-05-04
**Last Updated:** 2026-05-04

## Summary
Add a monitoring script that polls Docker stats API (CPU, memory, network I/O) for ARR containers every 5 minutes. Alert via WhatsApp if any container exceeds thresholds (e.g., Sonarr >80% CPU for >10min, Radarr >90% memory). Helps catch runaway processes before they crash the container or affect other services.

## Why It Might Matter
- ARR containers can hang due to resource exhaustion (import loops, API spam)
- Docker stats alone requires manual SSH to check
- Early warning prevents downtime and manual restarts
- Can reuse existing WhatsApp integration for alerts

## Suggested Outcome
- [ ] Review and evaluate
- [ ] Prototype: `docker stats --no-stream --format "{{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"` + cron