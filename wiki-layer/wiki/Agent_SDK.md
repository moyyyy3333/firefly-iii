---
title: Claude Agent SDK
tags: [api, concept]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude Agent SDK

> A toolkit for building custom agents on Claude — the same foundations that
> power [[Claude_Code]].

## What it is

The Agent SDK packages the agent loop (model + [[Tool_Use]] + context
management) so developers can build their own agentic applications without
re-implementing orchestration. [[Claude_Code]] itself runs on top of this
foundation.

## What it gives you

- A managed agent loop: plan → call tools → observe → continue
- Tool/permission plumbing and context-window management
- A path to ship terminal, server, or app-embedded agents

## Related

- [[Claude_API]]
- [[Claude_Code]]
- [[Tool_Use]]
- [[Model_Context_Protocol]]
