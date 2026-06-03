---
title: Claude Code — Slash Commands
tags: [claude-code, tool]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude Code — Slash Commands

> Type `/name` to trigger a built-in command or a packaged [[Claude_Code_Skills|skill]].

## Purpose

Slash commands are quick entry points for common actions and for invoking
[[Claude_Code_Skills|skills]]. Built-in CLI commands include things like
`/help`, `/config`, `/clear`, and `/fast` (toggle fast mode).

## Custom commands

You can define your own commands as Markdown files (typically under a
`commands/` directory in your `.claude` config). The file body becomes the
prompt/instructions executed when the command runs, and can take arguments.

## How it relates to skills

When a user types `/<skill-name>`, Claude Code invokes the matching
[[Claude_Code_Skills|skill]]. Only commands/skills that actually exist should
be invoked — don't guess names.

## Related

- [[Claude_Code]]
- [[Claude_Code_Skills]]
- [[Claude_Code_Settings]]
