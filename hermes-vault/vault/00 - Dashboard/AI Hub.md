---
tags: [dashboard, ai]
---

# 🤖 AI Hub — Unified Intelligence Center

> All your AI conversations, ideas, and syntheses in one place.

---

## The Four AIs

| AI | Folder | Best For | Notes |
|----|--------|----------|-------|
| [[01 - AI Ideas/Claude/Overview\|Claude]] | `01 - AI Ideas/Claude/` | Deep reasoning, code, writing | Anthropic |
| [[01 - AI Ideas/GPT/Overview\|ChatGPT]] | `01 - AI Ideas/GPT/` | General tasks, plugins, browsing | OpenAI |
| [[01 - AI Ideas/Gemini/Overview\|Gemini]] | `01 - AI Ideas/Gemini/` | Multimodal, Google integration | Google |
| [[01 - AI Ideas/Hermes (Local)/Overview\|Hermes (Local)]] | `01 - AI Ideas/Hermes (Local)/` | Private, offline, fast | Nous Research via Ollama |

---

## Recent Conversations

```dataview
TABLE ai-source, summary, date
FROM "01 - AI Ideas"
WHERE type = "conversation"
SORT date DESC
LIMIT 10
```

---

## Top Ideas by AI

```dataview
TABLE ai-source, rating, date
FROM "01 - AI Ideas"
WHERE type = "idea" AND rating >= 4
SORT rating DESC, date DESC
LIMIT 10
```

---

## Synthesized Insights

```dataview
LIST
FROM "01 - AI Ideas/Synthesized"
SORT date DESC
LIMIT 10
```

---

## Capture a New Conversation

Use the template: `Templates/AI Conversation`

```
Cmd/Ctrl + P → "Create new note from template" → AI Conversation
```

---

## How Ideas Flow

```
AI Conversation → Extract Key Ideas → [[01 - AI Ideas/Synthesized/Master Ideas|Master Ideas]]
                                    ↓
                             [[04 - Knowledge/]]
                                    ↓
                           [[02 - Projects/]]
```
