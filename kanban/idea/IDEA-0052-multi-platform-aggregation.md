# Idea
**ID:** IDEA-0052
**Title:** Multi-Platform Message Aggregation View
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-12
**Last Updated:** 2026-03-12

## Summary
Create a unified dashboard view that aggregates messages from all connected platforms (WhatsApp, Telegram, Discord, Slack, iMessage, Signal, Teams, etc.) into a single inbox interface, with conversation threading and cross-platform reply capability.

## Why It Matters
OpenClaw now supports 10+ messaging platforms simultaneously (per the 2026 blog). Multiple YouTube tutorials show users connecting various platforms, but there's no unified way to view and respond to messages across all channels. This would improve UX significantly for power users.

## Suggested Outcome
Dashboard shows unified inbox with messages from all platforms, visual indicators of source platform, ability to reply from within the dashboard, and conversation threading across platforms if user identity is linked.

## Suggested Acceptance Criteria
- [ ] Dashboard page showing messages from all connected platforms
- [ ] Visual platform indicators (icons/colors for WhatsApp, Telegram, etc.)
- [ ] Message history with pagination
- [ ] Reply functionality from dashboard
- [ ] Platform connection status indicators
- [ ] Notification badge for unread messages
- [ ] Search across all platform messages

## Context
- Source: OpenClaw 2026 blog features list and YouTube tutorial reviews
- Related: existing dashboard at port 5000

## Suggested Next Step
Survey which messaging platforms are currently configured, design unified message schema, prototype inbox UI component.

## Approval Decision
Pending

## Rejection Reason

## Notes
May require API work on platform connectors to enable historical message retrieval. Could start with read-only view before implementing replies.
