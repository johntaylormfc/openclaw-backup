# STATUS_RULES.md

## Ticket Status Values

| Status | Meaning |
|--------|---------|
| **new** | Not started, accepted and ready for cron pickup |
| **in-progress** | Active work underway (cron owns this) |
| **done** | Work complete, awaiting John's sign-off |
| **complete** | John has confirmed, fully done |
| **blocked** | Waiting on external input (blocker must be documented) |

## Transitions
- idea → new (John accepts)
- idea → rejected (John rejects — archived)
- new → in-progress (cron picks up)
- in-progress → done (cron finishes work)
- in-progress → blocked (issue hit, blocker documented)
- blocked → new (John unblocks — cron will pick up again)
- done → complete (John confirms work is done)
- done → in-progress (John finds issues, kicks back)

## Mandatory Rules
- Ideas go in idea/ only — never in new/in-progress directly
- Only OC-#### prefixed tickets go in new/ (accepted ideas become tickets)
- Always document the exact blocker when moving to blocked
- Never mark done unless all acceptance criteria are genuinely met
- done is a review gate — John must actively confirm before complete
- Status must reflect reality, not effort
