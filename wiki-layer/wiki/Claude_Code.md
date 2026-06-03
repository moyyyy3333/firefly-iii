---
title: Claude Code
tags: [claude-code, moc]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude Code

> Anthropic's agentic coding tool: Claude that can read, edit, and run your
> codebase through real tools.

## What it is

Claude Code is an AI pair-programmer that operates directly on a project. It
reads files, edits them, runs shell commands and tests, searches the codebase,
and uses [[Tool_Use]] / [[Model_Context_Protocol|MCP]] integrations — driven by
a capable model such as [[Claude_Opus]].

## Where it runs

- **CLI** in the terminal
- **Desktop app** (Mac / Windows)
- **Web app** at claude.ai/code — see [[Claude_Code_on_the_Web]]
- **IDE extensions** (VS Code, JetBrains)

## Core feature areas

- [[Claude_Code_Slash_Commands]] — invoke commands / skills with `/name`
- [[Claude_Code_Skills]] — packaged, reusable capabilities
- [[Claude_Code_Subagents]] — delegate to specialized agents
- [[Claude_Code_Hooks]] — run your own logic on lifecycle events
- [[Claude_Code_MCP]] — connect external tools and data
- [[Claude_Code_Settings]] — `settings.json`, permissions, env vars
- [[Claude_Code_on_the_Web]] — cloud/remote execution

## Notes

- A **fast mode** uses Opus with faster output (toggle with `/fast`); it does
  **not** downgrade to a smaller model.
- Project conventions can be captured in a `CLAUDE.md` file that Claude Code
  reads automatically.

## Related

- [[Claude]]
- [[Agent_SDK]]
- [[Tool_Use]]
- [[Wiki_Layer]]
