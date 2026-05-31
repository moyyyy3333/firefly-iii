# Hermes Bridge

Multi-AI CLI that saves every conversation directly to your Obsidian vault.

## Setup

```bash
cd hermes-vault/bridge
npm install
cp config.example.json config.json
# Edit config.json with your API keys
```

## Commands

### Chat with one AI
```bash
node index.js chat --ai claude "What's the best way to learn systems design?"
node index.js chat --ai gpt "Explain transformer architecture simply"
node index.js chat --ai gemini "What are the latest AI research trends?"
node index.js chat --ai hermes "Keep this private — analyze my business idea"
```

### Compare all AIs on the same question
```bash
node index.js compare "What programming language should I learn in 2026?"
```
This saves a comparison note in `01 - AI Ideas/Synthesized/`.

### Import an existing conversation
```bash
node index.js import --ai gpt --title "GPT brainstorm on product ideas" chat.txt
```

### See today's activity
```bash
node index.js brief
```

### Search your vault
```bash
node index.js search "machine learning"
node index.js search "product idea"
```

## Local Hermes Setup (Ollama)

```bash
# Install Ollama
brew install ollama   # macOS
# Linux: curl -fsSL https://ollama.com/install.sh | sh

# Start Ollama
ollama serve

# Pull Hermes model (pick one based on your RAM)
ollama pull nous-hermes3          # ~5GB, needs 8GB RAM
ollama pull nous-hermes3:8b       # ~5GB, solid quality
ollama pull nous-hermes3:70b      # ~40GB, best quality
```

Then in `config.json` set `providers.hermes.enabled = true`.

## Where Notes Are Saved

| AI | Folder |
|----|--------|
| Claude | `vault/01 - AI Ideas/Claude/` |
| ChatGPT | `vault/01 - AI Ideas/GPT/` |
| Gemini | `vault/01 - AI Ideas/Gemini/` |
| Hermes (Local) | `vault/01 - AI Ideas/Hermes (Local)/` |
| Comparisons | `vault/01 - AI Ideas/Synthesized/` |
