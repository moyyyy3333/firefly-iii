---
tags: [dashboard, home]
cssclass: home-dashboard
---

# 🧭 Hermes Vault — Home

> *Your unified command center. Every thought, every AI, every goal — connected.*

---

## Quick Nav

| Area | Link | Purpose |
|------|------|---------|
| 🤖 AI Hub | [[AI Hub]] | All AI conversations & ideas |
| 🗂 Projects | [[02 - Projects/Projects Overview\|Projects Overview]] | Active work |
| 🌱 Life | [[03 - Life/Goals/My Goals\|Goals]] | Goals, habits, journal |
| 🧠 Knowledge | [[04 - Knowledge/MOC/AI Systems MOC\|AI Systems MOC]] | Concepts & research |
| 🗓 Today | [[03 - Life/Daily Notes/{{date}}]] | Daily note |

---

## 🔴 Active Right Now

```dataview
TABLE status, ai-source, date
FROM "02 - Projects"
WHERE status = "active"
SORT date DESC
LIMIT 5
```

---

## 💡 Recent AI Ideas

```dataview
TABLE ai-source, tags, date
FROM "01 - AI Ideas"
SORT date DESC
LIMIT 8
```

---

## 📅 This Week

```dataview
TABLE file.name, tags
FROM "03 - Life/Daily Notes"
SORT file.name DESC
LIMIT 7
```

---

## 🔗 Visual Maps

- [[Canvas/AI Connections Map|AI Connections Map]] — see all AIs and ideas connected
- [[Canvas/Life Overview|Life Overview]] — your life at a glance
- [[Canvas/Hermes Architecture|Hermes Architecture]] — how the bridge works

---

> Open **Graph View** (`Ctrl/Cmd + G`) to see the full knowledge web.
