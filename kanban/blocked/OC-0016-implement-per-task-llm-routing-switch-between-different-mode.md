# Ticket
**ID:** OC-0016
**Title:** Implement Per-Task LLM Routing (Switch Between Different Models)
**Status:** Blocked
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-11 22:51
**Last Updated:** 2026-03-11 22:51

## Goal
Enable OpenClaw to route different types of tasks to different LLM providers (e.g., use Claude Max for complex reasoning, cheaper APIs for simple tasks). YouTube tutorials highlight this as a key feature - using different LLMs per task and switching between Claude Max vs API.

## Why
This work was accepted from idea IDEA-0047.

## Acceptance Criteria
- [ ] **Scope is confirmed** ← BLOCKED: awaiting John's scope decisions
- [ ] Work is started by moving ticket to In Progress ✓ (2026-03-19)
- [ ] Activity log is maintained ✓
- [ ] Ticket is blocked if a required dependency prevents completion ✓ (scope)
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0047
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [ ] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-19 01:00 UTC
  **Action:** Picked up ticket — moved from kanban/new/ → kanban/in-progress/
  **Result:** Scope analysis complete, immediately blocked on scope decisions
  **Why:** First acceptance criterion is "Scope is confirmed" — architectural decisions (provider list, routing triggers, cost preferences, API key readiness) require John's input. No implementation can begin responsibly without scope.
  **Evidence:** openclaw.json has only minimax provider; no routing engine present; routing approach (per-agent, per-tag, automatic, manual) not defined.
  **Next Step:** John to confirm scope decisions (providers, routing triggers, cost prefs, API keys available)
- **Timestamp:** 2026-03-18 08:03
  **Action:** Status review — file was in in-progress/ but status field was "New"
  **Result:** Moved to kanban/new/ — ticket was never actually picked up
  **Why:** Folder/status mismatch found during stale review
  **Evidence:** File had no in-progress activity, status field was "New"
  **Next Step:** Agent can pick up when requested

- **Timestamp:** 2026-03-11 22:51  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  
  **Why:** User accepted idea IDEA-0047  
  **Evidence:** Created via accept_idea.py  
  **Next Step:** Agent can pick up the ticket when requested

## Current Position
Ticket moved to in-progress 2026-03-19 01:00 UTC. Immediate blocker: scope not confirmed. Analysis complete — ticket is waiting on John's scope decisions before any implementation can begin.

## Blocker

### Blocker Summary
Scope must be confirmed before any implementation. Three key architectural decisions are needed.

### What Was Completed
- Reviewed OpenClaw config (~/.openclaw/openclaw.json)
- Mapped current setup: single provider (minimax), two models (M2.5, M2.7), default agent model = minimax/MiniMax-M2.7
- Confirmed no existing per-task routing layer is present
- Identified relevant agents: main, arr_bc_dev, arr_builder, arr_health_ops, arr_ledger, arr_researcher

### What Failed
- Cannot proceed: ticket's first acceptance criterion is "Scope is confirmed" — no implementation is valid without scope.

### Why It Failed
- The ticket requires architectural decisions only John can make:
  1. Which LLM providers to add (e.g., Anthropic Claude Max/3.5, OpenAI GPT-4.5, Google Gemini, local Ollama, other)
  2. What task categories/routing triggers to use (by agent? by task type tag? by complexity/size? by channel?)
  3. Whether routing should be fully automatic or user-directed per-task

### Evidence
- Current openclaw.json has only `minimax` provider with two models
- No routing rules, agent overrides, or per-task model selectors present
- OpenClaw model config supports `providers` and per-agent `model` overrides but no routing engine is evident

### Why This Blocks Completion
- Without scope, any implementation could be wrong direction — wrong providers, wrong routing triggers, wrong UX.

### What You Need To Do
**Decide the following:**

1. **Providers** — Which LLM providers do you want added to OpenClaw? (e.g., Anthropic Claude Max/3.5 Sonnet/3.7, OpenAI GPT-4o, Google Gemini, local Ollama, other)

2. **Routing triggers** — How should OpenClaw decide which model to use for a given task?
   - Option A: Per-agent default overrides (e.g., arr_ledger always uses Claude)
   - Option B: Per-task directive (e.g., agent/skill tags like `[complex]`, `[quick]`, `[reasoning]` that map to specific models)
   - Option C: Fully automatic — based on task complexity/size estimation
   - Option D: Manual per-task — user types `/model claude` or similar before tasks
   - Option E: Hybrid of above

3. **Cost/complexity preference** — For each category, which model should be the default?

4. **API keys** — Do you have API keys ready for the providers you want, or should I configure env-var based auth?

### Next Step After Unblock
Once scope is confirmed I will:
- Add the new provider configs to ~/.openclaw/openclaw.json
- Configure routing rules / agent model overrides as agreed
- Document the routing schema
- Validate with a test task
- Move to review

## Completion Summary
Not complete.
