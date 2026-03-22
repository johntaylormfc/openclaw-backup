# Idea
**ID:** IDEA-REVIEW-0092
**Title:** Surface auth profile cooldown and billing-disable state in `openclaw status`
**Status:** Rejected
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-19
**Last Updated:** 2026-03-22 17:48

## Summary
When OpenClaw's model failover system marks an auth profile as in cooldown (rate-limit backoff) or billing-disabled, this state is only visible by directly reading `~/.openclaw/agents/<agentId>/agent/auth-profiles.json`. This makes it difficult for operators to understand why a model fallback occurred without grepping logs or reading JSON. This idea proposes surfacing active cooldowns and billing-disabled profiles in `openclaw status` and `openclaw health --json`.

## Why It Might Matter
Model failover is a core reliability feature, but its operational state is opaque. If a user asks "why is the bot using a different model?" or "why did it switch to a cheaper fallback?", the answer requires diving into JSON files. Making cooldown/billing-disable states visible in status commands would close an observability gap and help users understand their current failover state at a glance.

## Suggested Outcome
`openclaw status` and/or `openclaw health --json` output should include a section listing:
- Which profiles are in cooldown (and for how long)
- Which profiles are billing-disabled (and for how long)
- Current auth profile rotation order

## Suggested Acceptance Criteria
- [ ] `openclaw status` shows active cooldowns with provider, profile ID, and remaining cooldown time
- [ ] `openclaw status` shows billing-disabled profiles with remaining disable time and reason
- [ ] `openclaw health --json` includes cooldown/disabled profiles in its health snapshot
- [ ] State is read from `auth-profiles.json` `usageStats` without requiring log parsing

## Context
- Auth profile state: `~/.openclaw/agents/<agentId>/agent/auth-profiles.json` under `usageStats`
- Cooldown format: `cooldownUntil` timestamp
- Billing disable format: `disabledUntil` + `disabledReason`
- Cooldown backoff: 1m → 5m → 25m → 1h cap for rate limits; 5h → 24h cap for billing
- Docs: https://docs.openclaw.ai/concepts/model-failover
- Related accepted idea IDEA-0077 (Reliability Monitoring & Auto-Recovery) covers auto-recovery broadly

## Suggested Next Step
Check the current `openclaw status` output fields and `openclaw health --json` schema. Identify where profile state summary could be injected from `auth-profiles.json`.

## Approval Decision
Rejected on 2026-03-22 17:48.

## Rejection Reason
Useful but secondary - auth failures show in cron job failures. Deferred until OAuth monitoring becomes a pain point.

## Notes
Idea rejected on 2026-03-22 17:48. Reason: Useful but secondary - auth failures show in cron job failures. Deferred until OAuth monitoring becomes a pain point.
