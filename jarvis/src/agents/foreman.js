import { callClaude } from '../integrations/claude.js';
import { runWorker, WORKER_NAMES } from './workers/index.js';
import { runQA } from './qa.js';
import { writeNote } from '../integrations/obsidian.js';
import { loadHandover, saveHandover, logTask, logArtifact } from '../state/handover.js';
import agentConfig from '../../config/agents.json' assert { type: 'json' };
import chalk from 'chalk';

const { system, maxTokens, model } = agentConfig.foreman;
const FOREMAN_MODEL = process.env.FOREMAN_MODEL || model;

async function planTasks(goal, handover) {
  const prompt = `
GOAL:
${goal}

PREVIOUS SHIFT HANDOVER:
${JSON.stringify(handover, null, 2)}

AVAILABLE WORKERS: ${WORKER_NAMES.join(', ')}

Break this goal into tasks. Return a JSON array of task objects. Each object must have:
- id: string (e.g. "task-1")
- worker: one of ${WORKER_NAMES.join(' | ')}
- description: string (what this worker needs to do)
- input: string (the exact prompt/brief to send the worker)
- successCriteria: string (how QA should judge the output)
- writeToObsidian: boolean (true if output should be saved to vault)
- obsidianFolder: string (folder name in vault, only if writeToObsidian is true)

Return ONLY valid JSON. No prose before or after.
`.trim();

  const raw = await callClaude(FOREMAN_MODEL, system, prompt, maxTokens);

  const match = raw.match(/\[[\s\S]*\]/);
  if (!match) throw new Error(`Foreman did not return valid JSON task list:\n${raw}`);
  return JSON.parse(match[0]);
}

async function writeForemanHandover(goal, tasks, results) {
  const prompt = `
GOAL: ${goal}

COMPLETED TASKS AND OUTPUTS:
${JSON.stringify(results, null, 2)}

Write the shift handover log. Include:
1. Summary of what was accomplished
2. Any open issues or follow-ups
3. Recommended tasks for the next shift
4. Key artifacts produced and where to find them

Be concise. This will be read by the next shift's foreman.
`.trim();

  return callClaude(FOREMAN_MODEL, system, prompt, 2048);
}

export async function runFactory(goal) {
  console.log(chalk.bold.cyan('\n🏭 JARVIS FACTORY STARTING'));
  console.log(chalk.cyan(`Goal: ${goal}\n`));

  const handover = await loadHandover();
  handover.currentGoal = goal;
  await saveHandover(handover);

  console.log(chalk.yellow('📋 Foreman planning tasks...'));
  const tasks = await planTasks(goal, handover);
  console.log(chalk.yellow(`   ${tasks.length} tasks planned\n`));

  const results = [];

  for (const task of tasks) {
    console.log(chalk.blue(`⚙️  [${task.worker.toUpperCase()}] ${task.description}`));

    let result;
    try {
      result = await runWorker(task.worker, task.input);
    } catch (err) {
      console.log(chalk.red(`   ✗ Worker failed: ${err.message}`));
      results.push({ task, output: null, qa: null, error: err.message });
      continue;
    }

    console.log(chalk.magenta(`   🔍 QA checking...`));
    const qa = await runQA(task, result.output);

    if (qa.passed) {
      console.log(chalk.green(`   ✓ PASS`));
    } else {
      console.log(chalk.red(`   ✗ FAIL — ${qa.report.slice(0, 120)}...`));
    }

    if (task.writeToObsidian && qa.passed) {
      const filename = `${task.id}-${task.worker}-${Date.now()}.md`;
      const filepath = await writeNote(
        task.obsidianFolder || 'Jarvis',
        filename,
        result.output,
        { task: task.id, worker: task.worker, goal, date: new Date().toISOString().slice(0, 10) }
      );
      console.log(chalk.gray(`   📝 Saved to Obsidian: ${filepath}`));
      await logArtifact(task.id, filepath, task.description);
    }

    await logTask({ taskId: task.id, worker: task.worker, passed: qa.passed });
    results.push({ task, output: result.output, qa });
  }

  console.log(chalk.yellow('\n📝 Writing shift handover log...'));
  const handoverLog = await writeForemanHandover(goal, tasks, results);

  const updatedHandover = await loadHandover();
  updatedHandover.notes.push({ date: new Date().toISOString(), log: handoverLog });
  if (updatedHandover.notes.length > 10) updatedHandover.notes.shift();
  await saveHandover(updatedHandover);

  await writeNote(
    'Jarvis/Handovers',
    `handover-${new Date().toISOString().slice(0, 10)}-${Date.now()}.md`,
    handoverLog,
    { type: 'handover', goal, date: new Date().toISOString().slice(0, 10) }
  );

  console.log(chalk.bold.green('\n✅ FACTORY SHIFT COMPLETE\n'));
  console.log(chalk.white('--- HANDOVER LOG ---'));
  console.log(handoverLog);
  console.log(chalk.white('--------------------\n'));

  return { tasks, results, handoverLog };
}
