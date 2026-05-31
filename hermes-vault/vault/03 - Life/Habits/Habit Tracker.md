---
tags: [habits, life, tracker]
type: habit-index
---

# 📊 Habit Tracker

---

## Active Habits

| Habit | Frequency | Streak | Last Done | Why |
|-------|-----------|--------|-----------|-----|
| Morning review | Daily | 0 | — | Clarity |
| AI session log | Daily | 0 | — | Stay organized |
| Evening capture | Daily | 0 | — | Don't lose ideas |
| Weekly vault review | Weekly | 0 | — | Synthesis |
| Deep work block | Daily | 0 | — | Progress |

---

## Habit Stack

*Do these in sequence — they're linked.*

**Morning (15 min):**
1. Open vault → Daily Note
2. Set today's intention
3. Review active projects

**Evening (10 min):**
1. Log AI sessions
2. Capture ideas from today
3. Set tomorrow's #1 task

**Weekly (30 min — Sunday):**
1. Review all AI ideas
2. Synthesize anything worth keeping
3. Update project statuses
4. Trim stale notes

---

## Tracking

Add `habit-log` notes in this folder using the format:

```
---
type: habit-log
date: YYYY-MM-DD
habits-done: [morning-review, ai-log]
habits-missed: []
notes: ""
---
```

```dataview
TABLE habits-done, habits-missed, date
FROM "03 - Life/Habits"
WHERE type = "habit-log"
SORT date DESC
LIMIT 14
```
