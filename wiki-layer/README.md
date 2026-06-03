# Wiki Layer — Claude AI & Claude Code

An **LLM Wiki / "Wiki Layer"**: the LLM cleans, structures, and links source
material **once** into an organized Markdown knowledge base, then operates on
that clean base instead of re-reading raw files on every query.

This particular Wiki Layer documents **Claude AI** (the models / API) and
**Claude Code** (the agentic CLI).

## Layout

```
wiki-layer/
├── raw/            # immutable source files — never edited by hand
├── wiki/           # clean, linked Markdown knowledge base (the workspace)
└── instructions/   # rules + templates that drive the structuring agent
    └── templates/
```

## How to use it

1. Drop original sources (HTML, PDF, notes, screenshots) into `raw/`.
2. Run the structuring agent with `instructions/agent-system-prompt.md`.
3. Open `wiki-layer/` as an [Obsidian](https://obsidian.md) vault to get the
   graph view, backlinks, and full-text search.
4. Going forward, tell the model: *"Work with my wiki in `wiki-layer/wiki/`."*

## Conventions

- Every note carries YAML frontmatter (see `instructions/linking-rules.md`).
- Links between notes use Obsidian wikilinks: `[[Page_Name]]`.
- Start at [[index]] (the map of content).

> Concept popularized in a thread by @bonsaixbt, attributed to Andrej Karpathy.
> This repo implements the idea locally; nothing here is uploaded anywhere.
