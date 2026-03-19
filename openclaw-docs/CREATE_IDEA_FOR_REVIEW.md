# Create Idea For Review

Use this template when creating an idea to flag a stale ticket for review.

**Source:** This idea was created during stale ticket review

## Template

```
# Idea
**ID:** IDEA-####
**Title:** [Brief title for the review request]
**Status:** Idea
**Suggested Priority:** Low / Medium / High
**Source:** Cron/Agent
**Created:** [YYYY-MM-DD]
**Last Updated:** [YYYY-MM-DD]

## Summary
This idea flags the following ticket for review:

**Ticket:** [path/to/ticket.md]
**Status:** [current status]
**Last Activity:** [date or "unknown"]

## Why It Might Matter
[Explain why this ticket appears stale or needs review]

## Suggested Outcome
- [ ] Review the ticket
- [ ] Either: Resume work, block with reason, or complete if appropriate

## Context
- Ticket file: /home/john/.openclaw/workspace/kanban/in-progress/[ticket-name].md
- Reviewer should check activity log and status accuracy

## Suggested Next Step
Review the ticket and take appropriate action per AGENT_RULES.md

## Approval Decision
Pending

## Notes
[Any additional context about why this ticket was flagged]
```

## Notes
- Do not create duplicate ideas for the same ticket
- Only flag tickets that genuinely appear abandoned or inconsistent
- Include the full ticket path so reviewers can easily find it
