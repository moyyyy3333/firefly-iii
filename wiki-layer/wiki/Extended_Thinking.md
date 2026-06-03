---
title: Extended Thinking
tags: [api, concept]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Extended Thinking

> Giving Claude an explicit reasoning budget to work through hard problems
> before answering.

## What it is

For difficult tasks (math, complex planning, multi-constraint reasoning), the
model can be allocated additional "thinking" budget to reason step by step,
improving accuracy at the cost of extra tokens/latency.

## When to use it

- Hard, multi-step problems where a wrong answer is expensive
- Planning phases of agentic work (see [[Agent_SDK]] / [[Claude_Code]])

## When to skip it

- Simple, latency-sensitive, or high-volume calls — prefer a faster model like
  [[Claude_Haiku]] instead.

## Related

- [[Claude_API]]
- [[Claude_Models]]
