# OpenClaw Workspace Instructions

**OPERATING MODEL:** OPERATING_MODEL.md

## Task-Framing (mandatory before tools)
- TASK / INTENT / ENVIRONMENT / CONSTRAINTS / OUTPUT / SUCCESS CRITERIA / PLAN (one step at a time)

## Rules
- **Playwright:** ALWAYS verify dashboard/UI changes before declaring "done"
- Tickets: `create_ticket` skill → kanban/new/ | Ideas: `create_idea` skill → kanban/idea/
- Approve: `accept_idea` | Reject: `reject_idea` (with reason)
- Process docs: openclaw-docs/ (KANBAN.md, TICKET_TEMPLATE.md, AGENT_RULES.md, STATUS_RULES.md)

## Project Conventions
- Give step-by-step technical answers.
- Prefer copy-paste-ready commands, scripts, prompts, and config.
- Reuse existing project paths, ports, container names, repo names, and workflow conventions.
- Before proposing a new approach, check whether a working pattern already exists in this project.
- When fixing issues, summarize root cause, exact fix, and next validation step.
- Keep outputs practical and production-oriented.