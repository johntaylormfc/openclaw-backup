# KANBAN.md - Project Board

## Columns
| Column | Purpose |
|--------|---------|
| idea | Cron-generated suggestions for John to review |
| new | Accepted tickets, ready for cron to pick up |
| in-progress | Cron is actively working the ticket |
| done | Work complete, awaiting John's sign-off |
| complete | John has confirmed, fully done |
| blocked | Issue hit, blocker documented, needs John's input |

## Workflow
1. Cron creates idea → John accepts or rejects
2. Accepted → moves to new (ticket is live)
3. Cron picks up from new → moves to in-progress
4. Work hits a blocker → moves to blocked (blocker clearly documented)
5. John unblocks → moves back to new → cron picks up again
6. Cron finishes → moves to done (notifies John)
7. John reviews → confirms complete/ or pushes back to new with note

## Tags
- `[bug]` - defect
- `[feature]` - new capability
- `[admin]` - maintenance/ops
- `[docs]` - documentation
