---
title: Claude API
tags: [claude, api]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude API

> The programmatic interface for building applications on Claude (formerly the
> Anthropic API).

## What it is

A REST API with official SDKs (Python `anthropic`, TypeScript
`@anthropic-ai/sdk`, and others) for sending messages to Claude models and
receiving responses. It also powers higher-level constructs like the
[[Agent_SDK]].

## Core capabilities

- **Messages** — multi-turn conversations with system prompts
- **[[Tool_Use]]** — let the model call your functions / external tools
- **[[Prompt_Caching]]** — reuse expensive prompt prefixes to cut cost/latency
- **[[Extended_Thinking]]** — allocate reasoning budget for hard problems
- **Streaming**, **batch**, **files**, and **citations**

## Good practices

- Choose a model deliberately — see [[Claude_Models]]. Default to the latest,
  most capable model and step down only for cost/latency.
- Add [[Prompt_Caching]] whenever a large, stable prefix (system prompt, docs,
  tool schemas) is reused across requests.

## Related

- [[Claude_Models]]
- [[Prompt_Caching]]
- [[Tool_Use]]
- [[Extended_Thinking]]
- [[Agent_SDK]]
- [[Model_Context_Protocol]]
