# OpenClaw Kanban Process

## Purpose

This document defines the standard Kanban workflow for OpenClaw tickets.

The aim is to provide clear visibility into:
- what was attempted
- what was completed
- what failed
- why decisions were made
- what is blocking progress
- what the user must do to remove blockers

The key principle is simple:

> A ticket is only **Complete** when all required work has been finished and evidenced.
> If any required task cannot be completed, the ticket must move to **Blocked**.

---

## Core Workflow

```text
Idea -> New -> In Progress -> Blocked / Complete
```

### Status meanings

#### Idea
A rough thought, improvement, or possible task that has not yet been shaped into executable work.

Use when:
- the request is still exploratory
- the scope is unclear
- there is not yet enough detail to begin

Minimum fields:
- Title
- Summary
- Why it may matter

#### New
A defined ticket that is ready to be picked up.

Use when:
- the goal is clear
- acceptance criteria exist
- there is enough context to start

Minimum fields:
- Title
- Goal
- Acceptance Criteria
- Context
- Priority
- Owner/Agent

#### In Progress
Work has actively started.

Use when:
- an agent has reviewed the ticket
- execution has begun
- actions and decisions are being logged

Required updates while in progress:
- actions attempted
- results
- decisions made
- reasons for decisions
- current next step

#### Blocked
The ticket cannot currently be completed.

Use immediately when:
- a required step fails
- a dependency is missing
- credentials, permissions, or approvals are missing
- a technical issue prevents completion
- user action is required before work can continue

This is a mandatory rule:

> If the final required outcome cannot be achieved right now, the ticket must be moved to **Blocked**.

A ticket can still contain completed sub-steps and still be **Blocked** overall.

#### Complete
The full ticket outcome has been achieved and evidenced.

Use only when:
- all required acceptance criteria are met
- all mandatory sub-steps are complete
- evidence has been logged
- no unresolved blocker remains
- no user action is still required

---

## Status Movement Rules

### Idea -> New
Move when the ticket has enough clarity to begin work.

### New -> In Progress
Move when an agent actively starts execution.

### In Progress -> Complete
Move only when:
- all acceptance criteria are met
- required deliverables exist
- validation has been performed
- evidence is logged
- no unresolved blocker remains

### In Progress -> Blocked
Move immediately when:
- a required step cannot be completed
- completion depends on missing access, approvals, credentials, or dependencies
- a tool, service, or environment prevents further progress
- manual intervention is required

### Blocked -> In Progress
Move only when:
- the blocker has actually been removed
- the unblock action is recorded
- the next execution step is clear

### Blocked -> Complete
Do not move directly unless the missing work has been completed and logged. In most cases, a blocked ticket should return to **In Progress** first.

---

## Golden Rule for Completion

A ticket must **never** be marked **Complete** just because some useful work was done.

Partial progress is valuable, but partial progress is not completion.

If even one required task remains unfinished because it could not be completed, then:
- the subtask should be marked as failed or blocked
- the overall ticket should be marked **Blocked**

---

## Required Ticket Fields

From **New** onward, every ticket should include the following.

## Identity
- Ticket ID
- Title
- Status
- Created Date
- Created By
- Owner / Agent
- Last Updated

## Intent
- Goal
- Why this matters
- Acceptance Criteria

## Context
- Environment
- Repo / project / path
- Relevant URLs or services
- Constraints or assumptions
- Dependencies

## Execution Log
- Action taken
- Result
- Why the action was taken
- Evidence / output
- Next step

## Current Status Details
- Current state
- Progress summary
- Next action
- Risks / confidence notes

## If Blocked
- Blocker type
- Exact blocker description
- Why it prevents completion
- What has already been completed
- User action required
- Evidence of blocker
- Resume instructions

## If Complete
- Deliverables
- Validation performed
- Final outcome against acceptance criteria
- Known limitations, if any

---

## Required Blocked Ticket Format

Whenever a ticket is moved to **Blocked**, the update must use this structure.

### Blocker Summary
A plain-English description of what could not be completed.

### What Was Completed
List the parts that were successfully finished.

### What Failed
State the exact step that failed.

### Why It Failed
Describe the reason, error, dependency, or limitation.

### Evidence
Include relevant URLs, error text, logs, outputs, or test results.

### Why This Blocks Completion
Explain why the ticket cannot honestly be considered complete.

### What You Need To Do
State exactly what the user must do to remove the blocker.

### Next Step After Unblock
State the first action that should happen once the blocker is removed.

---

## Standard Blocked Example

```markdown
## Blocker Summary
Could not complete Business Central sandbox validation.

## What Was Completed
- Created repo structure
- Generated AL extension scaffold
- Prepared container script
- Validated config inputs

## What Failed
- Container did not provide a reliably usable BC web client endpoint

## Why It Failed
- Business Central sign-in failed on the expected URL
- Access only worked with an added tenant parameter

## Evidence
- Tested URL: http://192.168.1.228:8082/BC/
- Working variant: http://192.168.1.228:8082/BC/?tenant=default

## Why This Blocks Completion
- The extension cannot be fully validated and published against the intended environment until access is stable

## What You Need To Do
- Confirm the correct target URL format
- Fix or recreate the container auth/web client configuration
- Confirm whether tenant=default should always be used

## Next Step After Unblock
- Re-test web client
- Publish extension
- Perform compile/publish validation
- Close ticket only if publish succeeds
```

---

## Subtask Handling

Each ticket should include a checklist of major steps.

Example:
- [ ] Analyse request
- [ ] Create solution files
- [ ] Create or update environment
- [ ] Validate result
- [ ] Commit and push changes
- [ ] Write summary

Rule:

> If any required subtask is blocked, the overall ticket becomes **Blocked** even if other subtasks are complete.

This preserves useful partial progress without falsely reporting completion.

---

## Activity Log Standard

To provide visibility on what was done and why, every ticket must keep a chronological activity log.

Each entry should include:
- timestamp
- action
- result
- why the action was taken
- evidence or output
- next step

### Example

```markdown
2026-03-06 10:14
Checked existing container ports.
Found 8080 already in use.
Used 8082 instead to avoid conflict.
Next: create container with revised mapping.

2026-03-06 10:19
Created container script successfully.
Container launched but BC sign-in failed on the expected URL.
This blocks reliable validation.
Next: move ticket to Blocked and request environment confirmation.
```

---

## Definition of Complete

A ticket is **Complete** only if all of the following are true:
- requested outcome achieved
- all required subtasks completed
- evidence recorded
- blocker list empty
- no user action required
- plain-English summary written

If any of the above is false, the ticket is not complete.

---

## Optional Supporting Field: Outcome State

Alongside Kanban status, tickets may include an additional field:

- Succeeded
- Partial
- Blocked
- Failed

This helps distinguish situations such as:
- **In Progress + Partial**
- **Blocked + Partial**
- **Complete + Succeeded**

This is useful because agent workflows often create partial value before hitting a blocker.

---

## Recommended Ticket Template

```markdown
# Ticket
**ID:** OC-####
**Title:**
**Status:** Idea / New / In Progress / Blocked / Complete
**Outcome State:** Succeeded / Partial / Blocked / Failed
**Owner:**
**Created:**
**Last Updated:**

## Goal
What is this ticket trying to achieve?

## Why
Why does this matter?

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Context
Environment, repo, paths, URLs, assumptions, dependencies.

## Task Checklist
- [ ] Analyse
- [ ] Implement
- [ ] Validate
- [ ] Commit / push
- [ ] Summarise

## Activity Log
Chronological record of actions, outputs, and reasons.

## Current Position
What has been done so far?

## Blocker
What is preventing completion right now?
What does the user need to do to unblock it?

## Next Step
What happens next once unblocked?

## Completion Summary
Only filled in when the ticket is truly complete.
```

---

## Required Agent Behaviour

Every OpenClaw agent working against this board must follow these rules:

1. Never mark a ticket **Complete** unless every required acceptance criterion has been met.
2. Move a ticket to **Blocked** immediately when a required outcome cannot be achieved.
3. When blocking a ticket, clearly state:
   - what was done
   - what failed
   - why it failed
   - why it prevents completion
   - exactly what the user must do to unblock it
4. Always maintain an activity log showing what was done and why.
5. Do not hide failed attempts, retries, or partial outcomes.
6. Do not treat partial progress as final success.

---

## Practical Summary

The OpenClaw board should give the user immediate answers to these questions:
- What is being worked on?
- What has already been done?
- Why was each action taken?
- What is blocked?
- Why is it blocked?
- What do I need to do next?
- Is the ticket truly complete, or only partially progressed?

That visibility is the point of the process.

A ticket system that hides blockers or marks partial work as complete is not trustworthy. This process is designed to prevent that.

