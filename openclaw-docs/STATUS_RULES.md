# STATUS_RULES.md

## Ticket Status Values

| Status | Meaning |
|--------|---------|
| **new** | Not started, ready to pick up |
| **in-progress** | Active work underway |
| **blocked** | Waiting on external input (document what) |
| **review** | Work complete, awaiting verification |
| **done** | Fully complete, criteria met |

## Transitions
- new → in-progress (when picked up)
- in-progress → blocked (when stuck)
- blocked → in-progress (when unblocked)
- in-progress → review (when work done)
- review → done (when verified)
- review → in-progress (if issues found)

## Mandatory
- Always include reason when moving to blocked
- Never mark done without meeting acceptance criteria
- Update status when work progresses
