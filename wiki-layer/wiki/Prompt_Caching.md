---
title: Prompt Caching
tags: [api, concept]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Prompt Caching

> Reuse a large, stable prompt prefix across requests so it isn't re-processed
> (and re-billed) every time.

## Why it matters

This is the exact problem the [[Wiki_Layer]] concept attacks at the file level:
stop paying to reprocess the same content over and over. At the API level,
prompt caching is the built-in mechanism for it.

## How it works

- Mark a stable prefix (system prompt, tool schemas, long documents, examples)
  as cacheable.
- On a **cache hit**, those tokens are served from cache at reduced cost and
  latency; you pay full price only for the new suffix (the user's query).
- Caches are short-lived, so it pays off most when many requests share the same
  prefix in a short window.

## Best practices

- Put the **stable** content first, the **variable** content (the user turn)
  last, so the cacheable prefix is as long as possible.
- Keep tool definitions and system instructions stable to maximize hit rate.
- Watch your **cache hit rate** as the key efficiency metric.

## Related

- [[Claude_API]]
- [[Wiki_Layer]]
- [[Tool_Use]]
