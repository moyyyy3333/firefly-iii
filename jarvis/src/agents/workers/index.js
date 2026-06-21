import { callClaude } from '../../integrations/claude.js';
import { callHermes, isHermesAvailable } from '../../integrations/hermes.js';
import agentConfig from '../../../config/agents.json' assert { type: 'json' };

const WORKER_MODEL = process.env.WORKER_MODEL || 'hermes';

async function callWorkerModel(systemPrompt, userMessage) {
  if (WORKER_MODEL === 'hermes') {
    const available = await isHermesAvailable();
    if (available) return callHermes(systemPrompt, userMessage);
    console.warn('[worker] Hermes unavailable, falling back to Claude haiku');
    return callClaude('claude-haiku-4-5-20251001', systemPrompt, userMessage);
  }
  return callClaude(WORKER_MODEL, systemPrompt, userMessage);
}

export async function runWorker(workerName, taskInput) {
  const config = agentConfig.workers[workerName];
  if (!config) throw new Error(`Unknown worker: ${workerName}`);

  const prompt = `
TASK:
${typeof taskInput === 'string' ? taskInput : JSON.stringify(taskInput, null, 2)}
`.trim();

  const output = await callWorkerModel(config.system, prompt);
  return { worker: workerName, role: config.role, input: taskInput, output };
}

export const WORKER_NAMES = Object.keys(agentConfig.workers);
