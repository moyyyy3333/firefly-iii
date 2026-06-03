---
title: Tool Use
tags: [api, concept]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Tool Use

> Letting Claude call functions/tools you define, so it can act on the world
> instead of only producing text.

## How it works

1. You describe tools (name, description, JSON-schema input) in the request.
2. The model decides when to call a tool and emits a structured tool call.
3. Your code runs the tool and returns the result.
4. The model incorporates the result and continues — possibly calling more
   tools — until it produces a final answer.

## Where it shows up

- The [[Claude_API]] exposes tool use directly.
- [[Claude_Code]] is built on tool use: its file edits, shell commands, and
  searches are tools.
- [[Model_Context_Protocol]] (MCP) is a standard way to expose external tools
  and data as tools the model can call.

## Tips

- Write crisp tool descriptions and tight schemas; the model relies on them.
- Keep tool schemas stable to benefit from [[Prompt_Caching]].

## Related

- [[Claude_API]]
- [[Model_Context_Protocol]]
- [[Claude_Code]]
