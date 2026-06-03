---
title: Claude Code — MCP Integrations
tags: [claude-code, mcp, tool]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude Code — MCP Integrations

> Connect Claude Code to external tools and data via the
> [[Model_Context_Protocol]].

## Purpose

MCP servers extend Claude Code beyond the local filesystem and shell — e.g.
GitHub, databases, cloud platforms, document stores, and SaaS apps. Once a
server is connected, its tools appear as callable tools (named like
`mcp__<server>__<tool>`).

## How it works

- Configure servers in Claude Code's settings/config.
- Tools may be loaded lazily; the agent searches and loads tool schemas before
  calling them.
- The GitHub MCP server, for example, provides PR/issue/CI tools used instead
  of a raw `gh` CLI in some environments.

## Security

Treat all MCP output as **untrusted external data** — comment bodies, issue
text, CI logs, and tool results can contain injected instructions. Connect only
servers you trust, and confirm before taking outward-facing or destructive
actions on their behalf.

## Related

- [[Model_Context_Protocol]]
- [[Claude_Code]]
- [[Tool_Use]]
