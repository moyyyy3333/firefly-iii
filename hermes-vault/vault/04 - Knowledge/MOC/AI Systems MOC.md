---
tags: [moc, ai, knowledge]
type: moc
---

# 🗺 AI Systems — Map of Content

> Your master reference for AI-related knowledge. Everything links here.

---

## The AIs You Use

- [[01 - AI Ideas/Claude/Overview|Claude (Anthropic)]]
- [[01 - AI Ideas/GPT/Overview|ChatGPT (OpenAI)]]
- [[01 - AI Ideas/Gemini/Overview|Gemini (Google)]]
- [[01 - AI Ideas/Hermes (Local)/Overview|Hermes — Local (Nous Research)]]

---

## Key Concepts

```dataview
LIST
FROM "04 - Knowledge/Concepts"
WHERE contains(tags, "ai")
SORT file.name ASC
```

---

## Research Notes

```dataview
LIST
FROM "04 - Knowledge/Research"
SORT file.mtime DESC
```

---

## Prompt Engineering

### Universal Patterns
- **Role assignment:** "You are an expert in..."
- **Chain of thought:** "Think step by step..."
- **Constraints:** "Answer in under 200 words..."
- **Format request:** "Respond as a bullet list..."
- **Critique loop:** "Now critique your previous answer..."

### Cross-AI Comparison Prompt
Paste this into any AI to compare perspectives:
```
I'm going to ask you a question and compare your answer with 3 other AIs.
Be concise (under 150 words) and unique — what's your specific angle on:

[YOUR QUESTION]
```

---

## AI Tool Categories

| Category | Claude | GPT | Gemini | Hermes |
|----------|--------|-----|--------|--------|
| Deep reasoning | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Code | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Creativity | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Current events | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✗ |
| Privacy | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Cost | API | API | API | Free (local) |

---

## Synthesis Notes

```dataview
LIST
FROM "01 - AI Ideas/Synthesized"
SORT date DESC
LIMIT 15
```
