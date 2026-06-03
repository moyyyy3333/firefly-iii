---
title: Claude Code — Hooks
tags: [claude-code, tool]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude Code — Hooks

> User-defined commands that Claude Code runs automatically on lifecycle events.

## Purpose

Hooks let you automate behavior that should happen **every time** some event
occurs — not at the model's discretion, but enforced by the harness. This is
how you implement "from now on, whenever X happens, do Y" rules.

## Common event types

- **SessionStart** — e.g. ensure deps are installed / tests can run in a fresh
  cloud session
- **PreToolUse / PostToolUse** — inspect, gate, or react to tool calls
- **Stop** — run something when Claude finishes a turn

A hook can intercept a tool call; its output is treated as feedback.

## Where they live

Hooks are configured in `settings.json` (see [[Claude_Code_Settings]]).
Because they are executed by the harness rather than the model, they're the
right mechanism for guarantees that plain instructions can't provide.

## Related

- [[Claude_Code]]
- [[Claude_Code_Settings]]
- [[Claude_Code_on_the_Web]]
