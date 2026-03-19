# Ticket: Docker Stack Health Agent

## Description
Create an autonomous health monitoring agent for the Docker ARR stack. This agent should:
- Continuously monitor container health and status
- Auto-restart failed containers when safe
- Alert via WhatsApp when issues require human intervention
- Log health checks and actions taken

## Context
This is the **ARR_Health_Ops** sub-agent we configured earlier but haven't yet deployed as a continuous background process.

## Implementation Options
1. **Sub-agent with heartbeat** - Configure ARR_Health_Ops with a heartbeat cron (every 5 min) that does health checks
2. **Dedicated cron jobs** - Multiple isolated cron jobs: container health check, disk space alert, service restart
3. **Hybrid** - Heartbeat for monitoring, isolated agent for auto-remediation

## Acceptance Criteria
- [ ] ARR_Health_Ops agent can check container status via Docker API
- [ ] Auto-restart works for known safe containers (ARR stack)
- [ ] WhatsApp alert fires when restart fails or disk < 15%
- [ ] Agent runs on schedule without blocking main agent
- [ ] Health checks logged for audit trail

## Priority: High

## Status
- **Stage**: new
- **Created**: 2026-03-19
- **Updated**: 2026-03-19

## Notes
Previously rejected AI Media Recommender idea converted to this ticket.
