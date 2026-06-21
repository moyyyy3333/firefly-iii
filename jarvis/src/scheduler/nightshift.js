import cron from 'node-cron';
import { drainNightShiftQueue } from '../state/handover.js';
import { runFactory } from '../agents/foreman.js';
import chalk from 'chalk';

const SCHEDULE = process.env.NIGHTSHIFT_CRON || '0 2 * * *';

export function startNightShift() {
  console.log(chalk.bold.blue(`🌙 Night shift scheduled: ${SCHEDULE}`));

  cron.schedule(SCHEDULE, async () => {
    console.log(chalk.blue(`\n🌙 NIGHT SHIFT STARTING — ${new Date().toISOString()}`));

    const queue = await drainNightShiftQueue();

    if (queue.length === 0) {
      console.log(chalk.gray('   No tasks in night shift queue. Standing down.'));
      return;
    }

    console.log(chalk.blue(`   ${queue.length} task(s) queued\n`));

    for (const task of queue) {
      try {
        await runFactory(task.goal);
      } catch (err) {
        console.error(chalk.red(`   Night shift task failed: ${err.message}`));
      }
    }

    console.log(chalk.bold.blue('🌙 NIGHT SHIFT COMPLETE\n'));
  });
}

export async function runNightShiftNow() {
  console.log(chalk.bold.blue(`\n🌙 NIGHT SHIFT (manual run) — ${new Date().toISOString()}`));
  const queue = await drainNightShiftQueue();

  if (queue.length === 0) {
    console.log(chalk.gray('   No tasks in queue.'));
    return;
  }

  for (const task of queue) {
    await runFactory(task.goal);
  }
}
