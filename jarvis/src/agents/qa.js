import { callClaude } from '../integrations/claude.js';
import { callHermes, isHermesAvailable } from '../integrations/hermes.js';
import agentConfig from '../../config/agents.json' assert { type: 'json' };

const { system, maxTokens } = agentConfig.qa;

export async function runQA(taskSpec, workerOutput) {
  const prompt = `
ORIGINAL TASK SPEC:
${JSON.stringify(taskSpec, null, 2)}

WORKER OUTPUT:
${workerOutput}

Perform your QA check now.
`.trim();

  let report;
  const hermesUp = await isHermesAvailable();
  if (process.env.WORKER_MODEL === 'hermes' && hermesUp) {
    report = await callHermes(system, prompt);
  } else {
    report = await callClaude('claude-haiku-4-5-20251001', system, prompt, maxTokens);
  }

  const passed = /\bPASS\b/i.test(report);
  return { passed, report };
}
