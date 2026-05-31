# Hermes Vault

An Obsidian vault + multi-AI bridge for organizing your AI ideas and life.

## Structure

```
hermes-vault/
├── vault/          ← Open THIS folder in Obsidian
│   ├── 00 - Dashboard/      Home, AI Hub, Life Dashboard
│   ├── 01 - AI Ideas/       Claude, GPT, Gemini, Hermes (Local), Synthesized
│   ├── 02 - Projects/       Active & planned projects
│   ├── 03 - Life/           Goals, Daily Notes, Habits, Resources
│   ├── 04 - Knowledge/      Concepts, Research, MOC
│   ├── Templates/           Note templates (AI Conversation, Idea, Project, Daily, Concept)
│   └── Canvas/              Visual connection maps (open these first!)
└── bridge/         ← CLI tool — ties all AIs to the vault
```

## Quick Start

### 1. Open the Vault in Obsidian
1. Download [Obsidian](https://obsidian.md) (free)
2. Open → "Open folder as vault" → select `hermes-vault/vault/`
3. Install community plugins when prompted (Dataview, Templater)
4. Open `Canvas/AI Connections Map.canvas` to see the visual overview

### 2. See Visual Connections
- **Graph view:** `Cmd/Ctrl + G` — your entire knowledge web
- **Canvas maps:** `Canvas/AI Connections Map`, `Canvas/Life Overview`, `Canvas/Hermes Architecture`

### 3. Set Up the Bridge (optional but powerful)
```bash
cd bridge
npm install
cp config.example.json config.json
# Add your API keys to config.json
node index.js chat --ai claude "Hello!"
```

### 4. Install Community Plugins
In Obsidian: Settings → Community plugins → Browse, install:
- **Dataview** — powers all the dynamic tables in dashboards
- **Templater** — makes templates interactive
- **Kanban** — for project boards
- **Graph Analysis** — enhances the graph view

## Visual Maps

| Canvas | Shows |
|--------|-------|
| `AI Connections Map` | All 4 AIs → Hermes hub → vault sections |
| `Life Overview` | You at center, all life areas as spokes |
| `Hermes Architecture` | Technical flow of the bridge |

## Note-Taking Workflow

```
1. Have an AI conversation
2. hermes chat --ai claude "Question" (auto-saves)
   OR manually use Templates/AI Conversation
3. Extract key ideas → Templates/AI Idea
4. Synthesize across AIs → 01 - AI Ideas/Synthesized/
5. Move promising ideas → 02 - Projects/
6. Daily review → 03 - Life/Daily Notes/
```
