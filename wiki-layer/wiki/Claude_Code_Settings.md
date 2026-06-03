---
title: Claude Code — Settings & Permissions
tags: [claude-code, tool]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude Code — Settings & Permissions

> `settings.json` configures the Claude Code harness: permissions, environment
> variables, hooks, and more.

## What lives here

- **Permissions** — allow/deny rules for tools and specific commands, so
  routine actions don't prompt every time
- **Environment variables** — values injected into the session
- **[[Claude_Code_Hooks|Hooks]]** — automated behavior on lifecycle events
- General preferences (model, theme, etc.)

## Files

- Project settings: `.claude/settings.json` (and `settings.local.json`)
- User/global settings under the user's `~/.claude/` directory

## Permission modes

Tools run behind a user-selected permission mode. A denied call means the user
declined it — adjust the approach rather than retrying the same call verbatim.

## Related

- [[Claude_Code]]
- [[Claude_Code_Hooks]]
- [[Claude_Code_MCP]]
