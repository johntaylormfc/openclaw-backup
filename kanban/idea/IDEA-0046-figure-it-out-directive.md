# Idea
**ID:** IDEA-0046
**Title:** Implement "Figure It Out" Autonomous Directive for Agents
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-11
**Last Updated:** 2026-03-11

## Summary
Add a "Figure It Out" directive/configuration option that enables OpenClaw agents to make autonomous decisions when encountering unknown tasks, rather than asking the user for clarification. This appears to be a key feature highlighted in popular YouTube tutorials (Duncan Rogoff's "OpenClaw Use Cases" video has 101k views).

## Why It Might Matter
Users want AI assistants that can handle unexpected situations independently. Without this directive, agents constantly prompt users for guidance on unfamiliar tasks, reducing productivity. The "Figure It Out" directive could significantly improve agent autonomy and reduce user interruption fatigue.

## Suggested Outcome
Agents should have a configurable autonomy level that determines when they attempt to solve problems independently vs. when they ask for help. This could be tied to the existing SOUL.md / identity system.

## Suggested Acceptance Criteria
- [ ] Document what the "Figure It Out" directive does
- [ ] Add configuration option in workspace files
- [ ] Define autonomy levels (e.g., ask always / ask for major decisions / figure out everything)
- [ ] Test with ARR stack agent scenarios

## Context
- Source: YouTube - Duncan Rogoff "OpenClaw Use Cases that are Actually Helpful!" (16 min, 101k views)
- Related: SOUL.md, AGENTS.md, skill system

## Suggested Next Step
Research how other OpenClaw users implement this directive and document best practices for john's ARR stack.

## Approval Decision
Pending

## Rejection Reason

## Notes
This idea came from the YouTube Ideas cron job scanning for OpenClaw tutorials.
