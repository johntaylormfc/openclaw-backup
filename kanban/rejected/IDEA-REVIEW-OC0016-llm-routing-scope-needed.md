# Idea
**ID:** IDEA-REVIEW-OC0016
**Title:** OC-0016 Follow-up: Per-Task LLM Routing Scope Decisions
**Status:** Rejected
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-19 18:00
**Last Updated:** 2026-03-22 18:31

## Summary
OC-0016 (Per-Task LLM Routing) was picked up 2026-03-19 but immediately blocked again — it needs john's scope decisions on: which providers to add (Anthropic, OpenAI, Ollama, etc.), how routing should be triggered (per-agent, per-tag, automatic, manual), and cost/complexity preferences per task type.

## Why It Might Matter
LLM routing could reduce costs and improve response quality by matching task types to the right models. Without john's input the ticket cannot advance and is effectively stalled.

## Suggested Outcome
John answers the routing questions in the blocked ticket, or decides to park/close the idea.

## Suggested Acceptance Criteria
- [ ] John specifies which LLM providers to add to OpenClaw
- [ ] John chooses routing trigger approach (per-agent, per-tag, auto, manual, hybrid)
- [ ] John confirms API key availability for new providers
- [ ] Ticket moves to In Progress or is rejected

## Context
- Blocked ticket: OC-0016 (/home/john/.openclaw/workspace/kanban/blocked/OC-0016-implement-per-task-llm-routing-switch-between-different-mode.md)
- Current: single provider (minimax), two models, no routing engine
- Ticket was picked up 2026-03-19 01:00 UTC by cron, immediately blocked

## Suggested Next Step
Ask john directly: "Which LLM providers do you want for routing, and how should routing decisions be made?" If no answer in 7 days, suggest closing or parking.

## Approval Decision
Rejected on 2026-03-22 18:31.

## Rejection Reason
Duplicate of IDEA-0099 which was already closed. No cost benefit to routing - MiniMax flat rate.

## Notes
Idea rejected on 2026-03-22 18:31. Reason: Duplicate of IDEA-0099 which was already closed. No cost benefit to routing - MiniMax flat rate.
