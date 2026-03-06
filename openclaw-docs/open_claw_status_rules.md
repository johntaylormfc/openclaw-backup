# OpenClaw Status Rules

## Purpose

This file defines exactly how ticket status should be chosen and changed inside the OpenClaw Kanban board.

Its purpose is to stop tickets being moved based on optimism, partial progress, or vague judgement.

Status must always reflect the real current state of the ticket.

---

## Allowed Statuses

```text
Idea -> New -> In Progress -> Blocked / Complete
```

---

## Status Definitions

### Idea
Use when the item is still just a rough thought, request, or opportunity.

The work is not yet properly defined.

Use Idea when:
- the scope is still unclear
- acceptance criteria do not yet exist
- there is not yet enough context to start safely

Do not use Idea if the work is already clear enough to begin.

---

### New
Use when the ticket is sufficiently defined and is ready to be picked up.

Use New when:
- the goal is clear
- acceptance criteria exist
- required context is available
- the ticket is ready for execution

Do not use New once active work has started.

---

### In Progress
Use when active work has started and the ticket is still realistically completable without immediate user intervention.

Use In Progress when:
- execution has started
- actions are being taken
- the next step is known
- no hard blocker currently prevents continuation

A ticket may remain In Progress if there are minor issues that do not stop completion.

Do not leave a ticket In Progress when a required dependency or failed step prevents completion.

---

### Blocked
Use when the ticket cannot currently be completed.

This is the most important control state in the system.

Use Blocked when any of the following is true:
- a required step failed
- a dependency is unavailable
- credentials, permissions, or approvals are missing
- a service, environment, model, or tool prevents progress
- user input is required before work can continue
- validation cannot be completed
- the final required outcome cannot honestly be achieved right now

A ticket may be partly successful and still be Blocked overall.

That is normal and expected.

Do not avoid Blocked just because useful partial work was delivered.

---

### Complete
Use only when the full requested outcome has been achieved.

Use Complete only when all of the following are true:
- all acceptance criteria are satisfied
- all mandatory subtasks are complete
- required validation has been performed
- evidence has been recorded
- no unresolved blocker remains
- no further user action is required for the requested outcome to be considered finished

If any one of the above is false, the ticket is not Complete.

---

## Status Transition Rules

### Idea -> New
Move when the work becomes clear enough to begin.

Required before moving:
- clear goal
- basic context
- acceptance criteria

### New -> In Progress
Move when active execution starts.

Required before moving:
- owner or agent assigned
- first real action being taken

### In Progress -> Blocked
Move immediately when completion is no longer possible without external resolution.

Examples:
- missing credential
- failed environment
- unavailable dependency
- permission denied
- missing user decision
- failed validation that cannot be resolved autonomously

### In Progress -> Complete
Move only when all completion requirements are met.

Never move to Complete simply because the majority of work is done.

### Blocked -> In Progress
Move only when the blocker has genuinely been removed and the next action is known.

Do not move back to In Progress just because someone intends to retry later.

### Blocked -> Complete
Avoid direct movement.

Normally, a blocked ticket should return to In Progress, complete the missing work, and then move to Complete.

---

## Fast Decision Test

Use this decision test whenever status is being updated.

### Choose Complete if:
- the requested outcome is fully delivered
- validation is done
- no required work remains
- no blocker remains

### Choose Blocked if:
- required work cannot continue right now
- the user must do something first
- a dependency or environment issue prevents completion
- an unresolved failure stops progress

### Choose In Progress if:
- active work is continuing
- the next step is known
- no current hard blocker exists

### Choose New if:
- the ticket is ready to start
- work has not actually started yet

### Choose Idea if:
- the ticket is still only a rough concept

---

## Anti-Patterns To Avoid

### Wrong: Keeping blocked work In Progress
This hides the true state of the ticket.

### Wrong: Marking a ticket Complete because most of it worked
This gives false confidence and damages trust.

### Wrong: Moving to Blocked without explaining the user action required
This creates visibility without usefulness.

### Wrong: Moving to New when execution has already begun
This makes the board inaccurate.

### Wrong: Using vague blocker language
Examples of bad blocker wording:
- issue encountered
- problem detected
- task incomplete
- needs attention

Always say exactly what failed and why.

---

## Required Blocked Ticket Content

Whenever a ticket is set to Blocked, the ticket update must contain:
- blocker summary
- what was completed
- what failed
- why it failed
- evidence
- why it prevents completion
- what the user must do
- next step after unblock

---

## Required Complete Ticket Content

Whenever a ticket is set to Complete, the ticket update must contain:
- summary of what was delivered
- evidence or artifacts produced
- validation performed
- final result against acceptance criteria
- any known limitations

---

## Example Judgements

### Example 1
Container script created, container started, but BC URL access fails and user must confirm config.

**Correct status:** Blocked

Reason: useful progress exists, but the requested environment is not actually ready.

### Example 2
AL extension files created and compiled successfully, pushed to repo, acceptance criteria all met.

**Correct status:** Complete

Reason: requested outcome delivered and evidenced.

### Example 3
Ticket is fully defined, but no work has started yet.

**Correct status:** New

Reason: ready to begin, but execution has not started.

### Example 4
Agent is actively testing and still has valid next steps, with no unresolved external dependency.

**Correct status:** In Progress

Reason: work is continuing and completion is still possible.

---

## Short Status Rule Prompt

> Choose status based on reality, not effort. Use Complete only when the full requested outcome is finished and evidenced. Use Blocked immediately when a required step or dependency prevents completion. A ticket may contain useful partial progress and still be Blocked overall.

---

## Final Rule

If the user reads the board, the status should tell the truth instantly.

That is the standard.

