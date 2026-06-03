---
title: Claude Code — Subagents
tags: [claude-code, tool]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude Code — Subagents

> Delegate a scoped task to a separate agent with its own context and tools.

## Purpose

Subagents let the main session hand off complex, multi-step, or
search-heavy work. The subagent runs independently and returns only its final
result, which keeps the main context focused on conclusions rather than raw
file dumps.

## Common agent types

- A **general-purpose** agent for open-ended research / multi-step tasks
- A read-only **exploration** agent for broad codebase searches
- A **planning** agent for designing an implementation strategy
- Specialized agents (e.g. a guide for Claude Code / API questions)

## When to use

- Broad fan-out searches across many files where you only need the conclusion
- Independent chunks of work that can run in parallel
- Tasks that match a specialized agent's purpose

## Tips

- Launch independent subagents in parallel for concurrency.
- Continue an existing agent (with its context) instead of starting fresh when
  follow-up is needed.

## Related

- [[Claude_Code]]
- [[Claude_Code_Skills]]
- [[Agent_SDK]]
