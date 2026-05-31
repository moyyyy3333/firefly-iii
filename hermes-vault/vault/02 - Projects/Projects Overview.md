---
tags: [projects, dashboard]
type: index
---

# 🏗 Projects Overview

## Active Projects

```dataview
TABLE status, priority, target-date, completion
FROM "02 - Projects"
WHERE type = "project" AND status = "active"
SORT priority ASC
```

## Planned Projects

```dataview
TABLE priority, tags
FROM "02 - Projects"
WHERE type = "project" AND status = "planned"
SORT priority ASC
```

## Completed Projects

```dataview
TABLE completion, file.mtime
FROM "02 - Projects"
WHERE type = "project" AND status = "complete"
SORT file.mtime DESC
LIMIT 10
```

---

## Starting a New Project

1. `Cmd/Ctrl + P` → "Create new note from template" → **Project**
2. Save it in `02 - Projects/`
3. Set status, priority, and target-date in frontmatter
4. Link to the AI ideas that spawned it
5. Add to the active projects table above (it auto-populates via Dataview)

---

## Project Lifecycle

```
Idea (01 - AI Ideas) → Planned → Active → Complete
```
