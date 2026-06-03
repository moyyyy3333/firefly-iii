---
title: Claude Models
tags: [claude, model, moc]
created: 2026-06-03
updated: 2026-06-03
status: stable
source: model-knowledge
---

# Claude Models

> How to choose between the three Claude 4.x tiers.

The most recent Claude model family is **Claude 4.x**. It comes in three tiers
that trade capability against speed and cost:

| Tier | Model | Model ID | Pick when… |
|---|---|---|---|
| [[Claude_Opus]] | Opus 4.8 | `claude-opus-4-8` | You need the strongest reasoning / hardest tasks |
| [[Claude_Sonnet]] | Sonnet 4.6 | `claude-sonnet-4-6` | You want a strong default — balanced quality/cost |
| [[Claude_Haiku]] | Haiku 4.5 | `claude-haiku-4-5-20251001` | You need speed and low cost at scale |

## Choosing

- **Default to the latest, most capable model** when building AI applications;
  drop to a smaller tier only when latency or cost demands it.
- Mixed pipelines are common: a capable model plans/decides, a fast model
  handles high-volume sub-steps.

## Related

- [[Claude]]
- [[Claude_Opus]]
- [[Claude_Sonnet]]
- [[Claude_Haiku]]
- [[Claude_API]]
