# Idea
**ID:** IDEA-0079
**Title:** OpenClaw Config Validation with User-Friendly Error Messages
**Status:** Accepted
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-16
**Last Updated:** 2026-03-18 22:31

## Summary
Improve OpenClaw's config validation to show clear, actionable error messages instead of silent crashes when invalid JSON or configuration is provided.

## Why It Matters
GitHub Issue #19653 reports that invalid JSON in config causes "Silent crash on invalid JSON — no error messages, locks out users." Users cannot access their system at all when config is malformed, with no guidance on what's wrong.

## Suggested Outcome
When config is invalid, users see:
- Specific line/field causing the error
- Clear explanation of the issue
- Suggestion for fixing it

## Suggested Acceptance Criteria
- [ ] Invalid JSON shows exact location of syntax error
- [ ] Invalid config values show acceptable ranges/formats
- [ ] Validation runs before lockout occurs
- [ ] Error messages are human-readable, not technical stack traces

## Context
Source: GitHub issue #19653 (severity: High), OpenClaw DC troubleshooting blog (2 days ago).

## Suggested Next Step
Review existing config loading code, identify validation gaps, design error message format.

## Approval Decision
Accepted on 2026-03-18 22:31 and converted to ticket OC-0028.

## Rejection Reason

## Notes
Idea accepted and converted into live ticket OC-0028.
