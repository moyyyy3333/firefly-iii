---
tags: [dashboard, life]
---

# 🌱 Life Dashboard

> Everything that matters, in one view.

---

## 🎯 Goals Snapshot

```dataview
TABLE status, target-date, progress
FROM "03 - Life/Goals"
WHERE type = "goal"
SORT target-date ASC
```

---

## 📋 Active Habits

```dataview
TABLE frequency, streak, last-done
FROM "03 - Life/Habits"
WHERE active = true
SORT streak DESC
```

---

## 📓 Journal — Last 7 Days

```dataview
LIST
FROM "03 - Life/Daily Notes"
SORT file.name DESC
LIMIT 7
```

---

## 🏗 Projects Status

```dataview
TABLE status, priority, completion
FROM "02 - Projects"
WHERE type = "project"
SORT priority ASC
```

---

## 💰 Resources & References

```dataview
LIST
FROM "03 - Life/Resources"
SORT file.mtime DESC
LIMIT 8
```

---

## 📊 Life Areas

| Area | Status | Notes |
|------|--------|-------|
| 🏋 Health | — | |
| 💼 Work/Career | — | |
| 🧠 Learning | — | |
| 💸 Finance | — | |
| 👥 Relationships | — | |
| 🎨 Creative | — | |
| 🤖 AI Projects | — | |

---

*Update the Life Areas table weekly during your review.*
