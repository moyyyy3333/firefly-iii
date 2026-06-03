---
title: Claude Code on the Web
tags: [claude-code, tool]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude Code on the Web

> Running Claude Code in a managed, cloud-based remote execution environment
> instead of on your local machine.

## What it is

A session runs in an isolated, ephemeral container in the cloud. The repository
is cloned fresh when the container starts, and the container is reclaimed after
inactivity — so **anything worth keeping must be committed and pushed**.

## How sessions start

A session can be launched from the web, mobile/desktop apps, a GitHub Action,
or other integrations.

## Environment configuration

- **Network policy** governs outbound access (chosen when the environment is
  created).
- **Setup scripts** and **environment variables** prepare the container — a
  good fit for a [[Claude_Code_Hooks|SessionStart hook]] that installs deps and
  verifies tests/linters run.
- GitHub interactions go through the [[Claude_Code_MCP|GitHub MCP server]]
  rather than a local `gh` CLI.

Docs: https://code.claude.com/docs/en/claude-code-on-the-web

## Related

- [[Claude_Code]]
- [[Claude_Code_Hooks]]
- [[Claude_Code_MCP]]
