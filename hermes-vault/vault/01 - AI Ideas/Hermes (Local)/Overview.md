---
tags: [ai, hermes, local, overview]
ai-source: hermes
---

# Hermes — Local AI (Nous Research via Ollama)

> *100% private, offline, fast. Nous Hermes 3 running on your machine.*

## Why Local?
- Complete privacy — nothing leaves your machine
- No API costs
- Always available offline
- Customizable system prompts

## Setup
```bash
# Install Ollama
brew install ollama   # macOS
# or download from https://ollama.com

# Pull Hermes 3 model
ollama pull nous-hermes3

# Or larger version for better quality
ollama pull nous-hermes3:8b
ollama pull nous-hermes3:70b   # needs ~40GB RAM
```

## Running via Hermes Bridge
```bash
cd hermes-vault/bridge
node index.js chat --ai hermes "Your question here"
```

## My Conversations

```dataview
TABLE summary, date, rating
FROM "01 - AI Ideas/Hermes (Local)"
WHERE type = "conversation"
SORT date DESC
```

## Related
- [[01 - AI Ideas/Synthesized/Master Ideas]]
- [[00 - Dashboard/AI Hub]]
- [[Canvas/Hermes Architecture]]
