import 'dotenv/config';
import chalk from 'chalk';
import { runFactory } from './agents/foreman.js';
import { startNightShift, runNightShiftNow } from './scheduler/nightshift.js';
import { loadHandover, queueNightShift } from './state/handover.js';

const [,, command, ...args] = process.argv;

async function showStatus() {
  const state = await loadHandover();
  console.log(chalk.bold.cyan('\n📊 JARVIS STATUS'));
  console.log(chalk.white(`Last updated: ${state.lastUpdated || 'never'}`));
  console.log(chalk.white(`Current goal: ${state.currentGoal || 'none'}`));
  console.log(chalk.white(`Completed tasks: ${state.completedTasks.length}`));
  console.log(chalk.white(`Artifacts: ${state.artifacts.length}`));
  console.log(chalk.white(`Night shift queue: ${state.nightShiftQueue.length} tasks`));
  if (state.artifacts.length > 0) {
    console.log(chalk.white('\nLatest artifacts:'));
    state.artifacts.slice(-5).forEach(a => {
      console.log(chalk.gray(`  • ${a.name} → ${a.location}`));
    });
  }
  if (state.notes.length > 0) {
    console.log(chalk.yellow('\n--- Last Handover ---'));
    console.log(state.notes[state.notes.length - 1].log.slice(0, 500));
    console.log(chalk.yellow('---------------------'));
  }
}

async function main() {
  switch (command) {
    case 'foreman': {
      const goal = args.join(' ');
      if (!goal) {
        console.error(chalk.red('Usage: npm run foreman -- "Your goal here"'));
        process.exit(1);
      }
      await runFactory(goal);
      break;
    }

    case 'nightshift': {
      if (args[0] === 'now') {
        await runNightShiftNow();
      } else if (args[0] === 'queue') {
        const goal = args.slice(1).join(' ');
        if (!goal) {
          console.error(chalk.red('Usage: node src/index.js nightshift queue "Your goal"'));
          process.exit(1);
        }
        await queueNightShift({ goal });
        console.log(chalk.green(`✓ Queued for night shift: "${goal}"`));
      } else {
        startNightShift();
        console.log(chalk.cyan('Night shift daemon running. Press Ctrl+C to stop.'));
      }
      break;
    }

    case 'status': {
      await showStatus();
      break;
    }

    default: {
      console.log(chalk.bold.cyan('\n🤖 JARVIS — Agent Factory\n'));
      console.log(chalk.white('Commands:'));
      console.log(chalk.white('  node src/index.js foreman "Write a research report on X"'));
      console.log(chalk.white('  node src/index.js status'));
      console.log(chalk.white('  node src/index.js nightshift         — start daemon'));
      console.log(chalk.white('  node src/index.js nightshift now     — run queue immediately'));
      console.log(chalk.white('  node src/index.js nightshift queue "Goal"  — add to queue\n'));
    }
  }
}

main().catch(err => {
  console.error(chalk.red(`\n✗ Fatal: ${err.message}`));
  process.exit(1);
});
