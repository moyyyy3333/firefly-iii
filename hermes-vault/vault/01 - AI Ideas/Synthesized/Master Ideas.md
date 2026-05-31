---
tags: [synthesis, ideas, master]
type: index
---

# Master Ideas — Synthesized from All AIs

> When multiple AIs agree or when I've distilled an insight across sources.

---

## All Synthesized Ideas

```dataview
TABLE ai-source, rating, date, tags
FROM "01 - AI Ideas/Synthesized"
WHERE type = "synthesis"
SORT rating DESC, date DESC
```

---

## By Theme

### 🤖 AI & Technology
```dataview
LIST
FROM "01 - AI Ideas/Synthesized"
WHERE contains(tags, "ai-technology")
SORT date DESC
```

### 💡 Product Ideas
```dataview
LIST
FROM "01 - AI Ideas/Synthesized"
WHERE contains(tags, "product")
SORT date DESC
```

### 🧠 Mental Models
```dataview
LIST
FROM "01 - AI Ideas/Synthesized"
WHERE contains(tags, "mental-model")
SORT date DESC
```

### 🔬 Research Directions
```dataview
LIST
FROM "01 - AI Ideas/Synthesized"
WHERE contains(tags, "research")
SORT date DESC
```

---

## Process: How to Synthesize

1. Ask the same question to 2+ AIs
2. Use template `Templates/AI Idea` to capture each response
3. Create a synthesis note here comparing them
4. Rate the idea 1-5 in the `rating` frontmatter
5. Tag with relevant concept tags
6. Link to any related [[04 - Knowledge/]] notes

---

*Good synthesis = where the AIs agree + where they interestingly disagree.*
