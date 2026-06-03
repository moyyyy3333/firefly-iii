---
title: Wiki Layer (LLM Wiki)
tags: [concept]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: "thread by @bonsaixbt, attributed to Andrej Karpathy"
---

# Wiki Layer (LLM Wiki)

> Have the LLM clean, structure, and link your data **once** into a knowledge
> base, then operate on that base instead of re-reading raw files every query.

## The problem it solves

LLMs waste tokens re-reading the same documents, lose context across files, and
miss relationships between them — which hurts both cost and answer quality. The
API-level analogue of this fix is [[Prompt_Caching]].

## The structure

Three core folders:

1. **`raw/`** — immutable source files (the single source of truth)
2. **`wiki/`** — clean, linked Markdown the model maintains and works against
3. **instructions/templates** — rules for cleaning, linking, metadata, updates

## The workflow

1. Put existing materials in `raw/`.
2. Run a structuring agent (e.g. [[Claude_Code]]) to clean → convert to
   Markdown → apply templates → add `[[wikilinks]]` and metadata.
3. Open the folder in **Obsidian** for a graph view, backlinks, and search.
4. Going forward: *"Work with my wiki in `wiki/`"* instead of re-uploading files.

## Claimed benefits

- Large token savings on repeated queries
- Better accuracy (pre-cleaned, interconnected)
- Scales to hundreds/thousands of notes
- Stays local/private

## This repo

`wiki-layer/` is a concrete implementation of this idea, documenting
[[Claude]] and [[Claude_Code]]. Start at [[index]].

## Related

- [[Prompt_Caching]]
- [[Claude_Code]]
- [[index]]
