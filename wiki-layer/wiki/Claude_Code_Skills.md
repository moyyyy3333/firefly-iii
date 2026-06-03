---
title: Claude Code — Skills
tags: [claude-code, tool]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude Code — Skills

> Packaged, reusable capabilities Claude Code can load and run for specialized
> tasks.

## Purpose

A skill bundles domain knowledge and a procedure so Claude can perform a
specialized task consistently (e.g. running a deep-research workflow, doing a
code review, initializing project docs). Skills are surfaced to the model and
invoked — often via a [[Claude_Code_Slash_Commands|slash command]] `/skill-name`.

## How to use

- Invoke an available skill by name (e.g. `/code-review`, `/init`).
- Skills may accept arguments.
- Only invoke skills that are actually available in the session; never invent
  skill names.

## Examples of skill types

- Research / report generation
- Code review and security review
- Repo/project initialization and config updates
- Running or verifying the app

## Related

- [[Claude_Code]]
- [[Claude_Code_Slash_Commands]]
- [[Claude_Code_Subagents]]
