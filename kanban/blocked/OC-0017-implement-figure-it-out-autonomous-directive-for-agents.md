# Ticket
**ID:** OC-0017
**Title:** Implement "Figure It Out" Autonomous Directive for Agents
**Status:** Blocked
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-11 22:51
**Last Updated:** 2026-03-19 02:00

## Goal
Add a "Figure It Out" directive/configuration option that enables OpenClaw agents to make autonomous decisions when encountering unknown tasks, rather than asking the user for clarification. This appears to be a key feature highlighted in popular YouTube tutorials (Duncan Rogoff's "OpenClaw Use Cases" video has 101k views).

## Why
Users want AI assistants that can handle unexpected situations independently. Without this directive, agents constantly prompt users for guidance on unfamiliar tasks, reducing productivity. The "Figure It Out" directive could significantly improve agent autonomy and reduce user interruption fatigue.

## Acceptance Criteria
- [ ] Scope is confirmed
- [ ] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0046
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [ ] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-11 22:51
  **Action:** Ticket created from accepted idea
  **Result:** Ticket added to kanban/new
  **Why:** User accepted idea IDEA-0046
  **Evidence:** Created via accept_idea.py
  **Next Step:** Agent can pick up the ticket when requested

- **Timestamp:** 2026-03-19 02:00
  **Action:** Ticket moved to in-progress then immediately blocked
  **Result:** Cannot proceed — scope not defined
  **Why:** Ticket lacks any technical specification. It references a YouTube video (Duncan Rogoff's "OpenClaw Use Cases" 101k views) but does not describe what "Figure It Out" actually does, where it lives in OpenClaw (system prompt, config, skill), or what specific behavior changes are expected.
  **Evidence:** Ticket reviewed — no implementation details, no config paths, no acceptance criteria beyond generic ones
  **Next Step:** Awaiting John to define the scope

## Current Position
Blocked — waiting for John to clarify what "Figure It Out" directive means in technical terms.

## Blocker

### Blocker Summary
Scope not defined — ticket describes a concept (autonomous decision-making on unknown tasks) but provides no technical specifics about how to implement it in OpenClaw.

### What Was Completed
Ticket reviewed. OpenClaw workspace structure examined (skills/, config/, openclaw docs). No existing "Figure It Out" directive found.

### What Failed
Cannot implement — no clear target for changes.

### Why It Failed
Ticket was created from an idea without converting it into a concrete technical plan. It references a YouTube video but does not describe the specific feature being requested.

### Evidence
- No "Figure It Out" directive exists in `~/.npm-global/lib/node_modules/openclaw/`
- No matching config option in `~/.openclaw/`
- No existing skill implements this behavior
- Ticket has no technical acceptance criteria beyond generic kanban items

### Why This Blocks Completion
Arnold cannot build something without knowing:
1. What to change (system prompt, config, skill, something else?)
2. What behavior to implement
3. What "autonomous decisions on unknown tasks" actually means in code

### What You Need To Do
Answer these questions so the ticket can be scoped:
1. **What is "Figure It Out"?** Describe what you want agents to do differently when they encounter an unknown task — do they try harder before asking, make assumptions, run commands, search the web, something else?
2. **Where should this live?** Is it a system prompt addition (affecting all agents), a per-session config flag, a new skill, or something else?
3. **What specifically changes?** Give an example: "When an agent sees a task it doesn't recognise, it should [specific action] instead of asking me"
4. **Is this tied to the YouTube video?** Can you describe or link to what Duncan Rogoff's video shows? That would help me understand the intended behavior.

### Next Step After Unblock
Once John clarifies the scope, Arnold will implement the directive as a system prompt addition, a workspace config option, or a skill — whichever is most appropriate.
