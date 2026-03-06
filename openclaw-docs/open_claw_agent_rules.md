# OpenClaw Agent Rules

## Purpose

This file gives every OpenClaw agent a short, enforceable operating standard for working with Kanban tickets.

The goal is to make agent behaviour predictable, auditable, and trustworthy.

---

## Non-Negotiable Rules

### 1. Never mark partial work as complete
A ticket is only **Complete** when every required acceptance criterion has been met and evidence has been recorded.

If any required part of the ticket cannot be completed, the ticket must not be marked complete.

### 2. Move blocked work to Blocked immediately
If a required dependency, technical issue, missing permission, missing input, or failed step prevents completion, move the ticket to **Blocked** immediately.

Do not leave blocked work in **In Progress** just because some useful work was done.

### 3. Always explain what was done and why
Every meaningful action must be logged in plain English.

Each log entry should state:
- what was done
- what happened
- why that action was taken
- what should happen next

### 4. Always state the real blocker
When a ticket is blocked, state the real cause clearly.

Do not hide behind vague wording such as:
- encountered issue
- failed unexpectedly
- needs review
- unable to continue

Instead, state the exact blocker, evidence, and user action required.

### 5. Always tell the user what they need to do
A blocked ticket must always include a clear user action list.

The user should be able to read the blocker section and immediately know:
- what stopped progress
- why that matters
- what to fix or confirm
- what will happen once the blocker is removed

### 6. Do not hide retries or failed attempts
Retries, failed commands, failed validations, and abandoned approaches must be logged.

A trustworthy system shows the path taken, not just the final state.

### 7. Do not invent success
Do not claim a test passed, a deployment succeeded, or an environment is ready unless there is real evidence.

If validation has not been performed, say so explicitly.

### 8. Do not close tickets with unresolved required work
If any mandatory subtask remains incomplete, the ticket must remain **In Progress** or move to **Blocked**.

### 9. Keep outputs practical
All updates should help the user take action.

Status updates should be written so the user can quickly answer:
- what is happening
- what has already been done
- what is blocked
- what needs to happen next

### 10. Prefer honesty over optimism
If something is uncertain, incomplete, unvalidated, or assumed, state that clearly.

---

## Required Behaviour By Status

### Idea
- Capture rough opportunity or request
- Record why it may matter
- Do not start execution yet

### New
- Confirm the ticket has a clear goal
- Define acceptance criteria
- Record sufficient context to begin

### In Progress
- Log each major action
- Record outputs and reasoning
- Keep next step current
- Move to Blocked immediately if completion becomes impossible

### Blocked
A blocked ticket update must always include:
- blocker summary
- what was completed
- what failed
- why it failed
- evidence
- why this prevents completion
- what the user must do
- next step after unblock

### Complete
Only use when:
- all acceptance criteria are satisfied
- required validation is done
- required deliverables exist
- no unresolved blocker remains
- no user action is required for completion

---

## Required Activity Log Format

Each significant action should be logged using this structure:

```markdown
**Timestamp:** YYYY-MM-DD HH:MM
**Action:** What was done
**Result:** What happened
**Why:** Why this action was taken
**Evidence:** Logs, URLs, outputs, screenshots, files, or test results
**Next Step:** What should happen next
```

---

## Required Blocked Ticket Format

Use this exact structure whenever a ticket is blocked.

```markdown
## Blocker Summary
What could not be completed?

## What Was Completed
-

## What Failed
-

## Why It Failed
-

## Evidence
-

## Why This Blocks Completion
-

## What You Need To Do
-

## Next Step After Unblock
-
```

---

## Decision Rules

When deciding ticket status, use these rules:

### Mark as Complete only if all are true
- requested outcome achieved
- all required subtasks complete
- validation performed
- evidence recorded
- no blocker remains
- no user action still required

### Mark as Blocked if any are true
- required step failed
- dependency missing
- environment unavailable
- access or credentials missing
- user input or approval needed
- validation cannot be completed
- final outcome cannot honestly be claimed

---

## Short Enforcement Prompt

Use the following instruction for any agent operating against the OpenClaw board:

> Follow the Kanban process strictly. Never mark a ticket Complete unless all required acceptance criteria are met and evidenced. If any required task cannot be completed, move the ticket to Blocked immediately. When blocking a ticket, state exactly what was done, what failed, why it failed, why it prevents completion, what the user must do to unblock it, and what the next step will be once unblocked. Always maintain a clear activity log showing what was done and why.

---

## Practical Test

Before changing any ticket to **Complete**, the agent should ask:

1. Is the requested outcome actually finished?
2. Are all mandatory subtasks done?
3. Has validation really happened?
4. Is there any unresolved blocker?
5. Does the user still need to do something before the result is usable?

If the answer to any of these is **no** or **yes, there is a blocker**, the ticket must not be marked **Complete**.

---

## Final Principle

The Kanban board must reflect reality.

Not effort.
Not optimism.
Not partial progress.

Reality.

