---
tags: [goals, life]
type: goals-index
---

# 🎯 My Goals

> *A goal without a plan is just a wish.*

---

## 2026 Goals

| Goal | Area | Target | Status | Progress |
|------|------|--------|--------|----------|
| | | | | |

---

## 90-Day Goals

| Goal | Deadline | Why It Matters | Status |
|------|----------|----------------|--------|
| | | | |

---

## Weekly Goals

```dataview
TABLE target-date, status
FROM "03 - Life/Goals"
WHERE type = "goal" AND timeframe = "weekly"
SORT target-date ASC
```

---

## Goal Setting Framework

### The 3 Questions
1. **What** — specifically what do I want?
2. **Why** — what's the real motivation?
3. **How** — what are the next 3 actions?

### AI-Assisted Goal Review
Use this prompt with any AI:
> "Here are my current goals: [list]. What blind spots am I missing? What's the most important one to focus on first? What would make each goal more specific and measurable?"

---

## Completed Goals

```dataview
TABLE completion-date, area
FROM "03 - Life/Goals"
WHERE type = "goal" AND status = "complete"
SORT completion-date DESC
```
