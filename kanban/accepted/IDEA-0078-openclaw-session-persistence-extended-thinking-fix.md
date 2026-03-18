# Idea
**ID:** IDEA-0078
**Title:** OpenClaw Session Persistence Fix for Extended Thinking
**Status:** Accepted
**Suggested Priority:** High
**Source:** Cron
**Created:** 2026-03-16
**Last Updated:** 2026-03-18 22:31

## Summary
Fix the session persistence bug that causes 400 errors when resuming sessions that used Anthropic's extended thinking feature.

## Why It Matters
Users report (vpn07.com blog, GitHub Issue #40512) that after restarting OpenClaw or resuming a session that used extended thinking, they receive 400 errors and cannot continue their session. This breaks long-running workflows and creates data loss.

## Suggested Outcome
Sessions with extended thinking resume correctly, or graceful fallback when incompatible.

## Suggested Acceptance Criteria
- [ ] Sessions with extended thinking can be resumed after restart
- [ ] Clear error message when session is incompatible
- [ ] Graceful fallback (start new session or strip thinking) instead of 400 error
- [ ] Documentation of any session limitations

## Context
Source: vpn07.com blog post (2026), GitHub issue #40512, YouTube tutorials showing 24/7 agents.

## Suggested Next Step
Investigate the specific incompatibility between Anthropic extended thinking and OpenClaw session persistence, test with various thinking budgets.

## Approval Decision
Accepted on 2026-03-18 22:31 and converted to ticket OC-0027.

## Rejection Reason

## Notes
Idea accepted and converted into live ticket OC-0027.
