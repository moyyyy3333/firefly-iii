import fs from 'fs/promises';
import path from 'path';

const STATE_FILE = path.resolve('./logs/handover.json');

const empty = () => ({
  lastUpdated: null,
  currentGoal: null,
  completedTasks: [],
  pendingTasks: [],
  artifacts: [],
  notes: [],
  nightShiftQueue: [],
});

export async function loadHandover() {
  try {
    const raw = await fs.readFile(STATE_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return empty();
  }
}

export async function saveHandover(state) {
  state.lastUpdated = new Date().toISOString();
  await fs.mkdir(path.dirname(STATE_FILE), { recursive: true });
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

export async function logTask(taskEntry) {
  const state = await loadHandover();
  state.completedTasks.push({ ...taskEntry, completedAt: new Date().toISOString() });
  await saveHandover(state);
}

export async function logArtifact(name, location, description) {
  const state = await loadHandover();
  state.artifacts.push({ name, location, description, createdAt: new Date().toISOString() });
  await saveHandover(state);
}

export async function queueNightShift(task) {
  const state = await loadHandover();
  state.nightShiftQueue.push({ ...task, queuedAt: new Date().toISOString() });
  await saveHandover(state);
}

export async function drainNightShiftQueue() {
  const state = await loadHandover();
  const queue = [...state.nightShiftQueue];
  state.nightShiftQueue = [];
  await saveHandover(state);
  return queue;
}
