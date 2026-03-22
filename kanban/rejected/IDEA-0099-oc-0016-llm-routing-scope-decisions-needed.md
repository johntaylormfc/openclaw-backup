# Idea
**ID:** IDEA-0099
**Title:** OC-0016 - Resolve LLM Routing Scope Decisions
**Status:** Rejected
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-20 00:01
**Last Updated:** 2026-03-22 17:26

## Summary
OC-0016 (Per-Task LLM Routing) has been blocked since March 19th. OpenClaw has only MiniMax configured and no routing layer exists. Four architectural decisions are needed from John before any implementation can start.

## Why It Might Matter
Per-task LLM routing could significantly reduce API costs (using cheap models for simple tasks) while giving access to stronger models for complex reasoning. But without John's input on providers, routing triggers, and cost preferences, the ticket is dead in the water.

## Suggested Outcome
John provides scope decisions documented in OC-0016's blocker section, or explicitly closes the ticket.

## Suggested Acceptance Criteria
- [ ] John answers the 4 scope questions in OC-0016's blocker section, OR
- [ ] John rejects this idea (per-task routing not needed right now)

## Context
- Blocked ticket: /home/john/.openclaw/workspace/kanban/blocked/OC-0016-implement-per-task-llm-routing-switch-between-different-mode.md
- OpenClaw currently: minimax only, no routing rules
- Four outstanding decisions in ticket blocker:
  1. Which LLM providers to add (Claude Max/3.5, GPT-4o, Gemini, Ollama?)
  2. What routing triggers to use (per-agent, per-tag, automatic, manual?)
  3. Cost/complexity preferences per category
  4. API keys available or env-var based auth?

## Suggested Next Step
Request John answer the four scope questions in OC-0016's blocker section.

## Approval Decision
Rejected on 2026-03-22 17:26.
