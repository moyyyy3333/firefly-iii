---
title: Model Context Protocol (MCP)
tags: [mcp, concept]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Model Context Protocol (MCP)

> An open protocol for connecting LLMs to external tools and data sources
> through a standard interface.

## What it is

MCP standardizes how an AI app (the **client/host**) talks to **servers** that
expose tools, resources, and prompts. Instead of hand-wiring every integration,
an app speaks MCP and can use any compliant server (GitHub, databases,
file stores, SaaS apps, etc.).

## Why it matters

- One integration standard instead of N bespoke ones
- Servers are reusable across different AI hosts
- It's how [[Claude_Code]] connects to outside systems — see [[Claude_Code_MCP]]

## Building blocks

- **Tools** — callable functions (see [[Tool_Use]])
- **Resources** — readable data the model can pull in
- **Prompts** — reusable prompt templates a server offers

## Security note

MCP servers can be powerful (write access to repos, databases, deploys). Treat
their outputs as untrusted external data, and connect only servers you trust.

## Related

- [[Tool_Use]]
- [[Claude_Code_MCP]]
- [[Agent_SDK]]
