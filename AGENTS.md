# AGENTS.md

**OPERATING MODEL:** OPERATING_MODEL.md

## Task-Framing (mandatory before tools)
TASK / INTENT / ENVIRONMENT / CONSTRAINTS / OUTPUT / SUCCESS CRITERIA / PLAN

## Rules
- **Playwright:** ALWAYS verify dashboard/UI changes before declaring "done"
- Tickets: `create_ticket` → kanban/new/ | Ideas: `create_idea` → kanban/idea/
- Approve: `accept_idea` | Reject: `reject_idea` (with reason)
- Process docs: openclaw-docs/ (KANBAN.md, TICKET_TEMPLATE.md, AGENT_RULES.md, STATUS_RULES.md)

## Conventions
- Step-by-step technical answers, copy-paste-ready commands/scripts
- Reuse existing paths, ports, container names, workflow conventions
- Before new approach: check for working pattern in project
- Fixes: root cause → exact fix → validation step
- Keep outputs practical and production-oriented
