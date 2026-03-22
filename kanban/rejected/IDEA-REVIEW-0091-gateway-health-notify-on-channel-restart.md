# Idea
**ID:** IDEA-REVIEW-0091
**Title:** Gateway health monitor — notify on channel auto-restart
**Status:** Rejected
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-19
**Last Updated:** 2026-03-22 18:41

## Summary
When the gateway's built-in health monitor restarts a channel (WhatsApp, Telegram, etc.), it currently does so silently. The operator only discovers this by reading logs or noticing the gap in message history. This idea proposes a configurable notification — via cron webhook or chat announce — whenever the health monitor triggers a channel restart.

## Why It Might Matter
Reliability monitoring that only acts but never reports creates invisible failures. If a channel keeps dropping and restarting every hour, the operator has no awareness unless they actively watch logs. Notification on health-monitor restart events would make intermittent channel instability visible and actionable, enabling root-cause investigation before the channel degrades further or gets stuck in a restart loop (bounded by `channelMaxRestartsPerHour`).

## Suggested Outcome
A gateway config flag (e.g., `gateway.channelHealthNotify: true`) that, when enabled, fires a webhook POST or delivers a brief cron-style announce to the configured channel whenever the health monitor restarts a channel. The notification should include: channel name, account ID, restart count in the last hour, and time of restart.

## Suggested Acceptance Criteria
- [ ] Health monitor restart events are captured as a gateway hook/event
- [ ] Config option exists to enable/disable restart notifications
- [ ] Webhook delivery mode works with existing cron webhook infrastructure
- [ ] Announcement delivery to chat channels works
- [ ] Restart count (from `channelMaxRestartsPerHour` rolling window) is included in the payload

## Context
- OpenClaw health monitor: `gateway.channelHealthCheckMinutes`, `gateway.channelStaleEventThresholdMinutes`, `gateway.channelMaxRestartsPerHour`
- Per-channel override: `channels.<provider>.healthMonitor.enabled`
- Docs: https://docs.openclaw.ai/gateway/health.md
- Existing accepted idea IDEA-0077 (Reliability Monitoring & Auto-Recovery) covers auto-recovery but not visibility/notification of those recovery events.

## Suggested Next Step
Scope the health monitor event hook surface. Identify where in the gateway code restart events are triggered and whether they already emit an internal event that could be wired to a notification handler.

## Approval Decision
Rejected on 2026-03-22 18:41.

## Rejection Reason
Already implemented today - gateway-watchdog.js running every 5 minutes.

## Notes
Idea rejected on 2026-03-22 18:41. Reason: Already implemented today - gateway-watchdog.js running every 5 minutes.
