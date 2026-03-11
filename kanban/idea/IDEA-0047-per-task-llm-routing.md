# Idea
**ID:** IDEA-0047
**Title:** Implement Per-Task LLM Routing (Switch Between Different Models)
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-11
**Last Updated:** 2026-03-11

## Summary
Enable OpenClaw to route different types of tasks to different LLM providers (e.g., use Claude Max for complex reasoning, cheaper APIs for simple tasks). YouTube tutorials highlight this as a key feature - using different LLMs per task and switching between Claude Max vs API.

## Why It Matters
Cost optimization and performance balance. Not every task requires the most expensive model. Routing simple tasks to cheaper APIs while reserving powerful models for complex reasoning could significantly reduce API costs while maintaining quality where it matters.

## Suggested Outcome
A configuration system that defines which LLM to use based on:
- Task type (file operations, search, analysis, etc.)
- Complexity threshold
- User preference

## Suggested Acceptance Criteria
- [ ] Document current multi-LLM support status in OpenClaw
- [ ] Create routing configuration schema
- [ ] Define default routing rules for ARR stack tasks
- [ ] Test cost/performance tradeoffs

## Context
- Source: YouTube - Duncan Rogoff "OpenClaw Use Cases" (chapters include "How to use different LLMs per task", "How to switch Claude Max vs API")
- Related: IDENTITY.md, existing model configuration

## Suggested Next Step
Research current LLM configuration options and document what's possible with existing setup.

## Approval Decision
Pending

## Rejection Reason

## Notes
This idea came from the YouTube Ideas cron job scanning for OpenClaw tutorials.
