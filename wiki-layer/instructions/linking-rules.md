# Linking & Metadata Rules

## Frontmatter schema

Every note in `wiki/` MUST begin with YAML frontmatter:

```yaml
---
title: Human Readable Title
tags: [claude, claude-code, ...]   # lowercase, kebab-case
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: stable | draft | stub
source: where this came from (raw/ filename, URL, or "model-knowledge")
---
```

Required fields: `title`, `tags`, `created`, `updated`, `status`.

## Filenames & wikilinks

- File names use `Title_Case_With_Underscores.md`.
- Link with `[[Title_Case_With_Underscores]]`; optionally alias for prose:
  `[[Claude_Code_Hooks|hooks]]`.
- The link target is the filename **without** the `.md` extension.

## Tag vocabulary (keep it small)

| Tag | Use for |
|---|---|
| `claude` | The model family / product |
| `model` | A specific model (Opus/Sonnet/Haiku) |
| `claude-code` | The agentic CLI and its features |
| `api` | Claude API / SDK topics |
| `mcp` | Model Context Protocol |
| `concept` | General idea / workflow |
| `moc` | Map-of-content / index notes |

## Structure of a note

1. Frontmatter
2. `# Title`
3. One-paragraph summary (the "answer first")
4. Body sections
5. `## Related` — explicit `[[wikilinks]]`
6. `## Changelog` (optional) — dated edits

## Maps of content (MOC)

`[[index]]` is the root MOC. Each major area may have its own MOC that links
down to detail notes. Every note should be reachable from `[[index]]` in a few
hops.
