export const STORAGE_KEY = 'professional-english-coach:v1';
const intervals = [1, 3, 7, 14, 30];

export function initialState() {
  return { version: 1, sessions: [], reviews: [], active: null };
}

export function loadState(storage) {
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    if (parsed?.version === 1 && Array.isArray(parsed.sessions) && Array.isArray(parsed.reviews) &&
        (parsed.active === null || (parsed.active && Array.isArray(parsed.active.answers)))) return parsed;
  } catch { /* Invalid local data starts a fresh session. */ }
  return initialState();
}

export function saveState(storage, state) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function startSession(state, track, now = new Date()) {
  if (state.active) throw new Error('Finish or discard the current session first.');
  return { ...state, active: { id: crypto.randomUUID(), trackId: track.id, startedAt: now.toISOString(), answers: [], index: 0 } };
}

export function submitAnswer(state, track, answer, feedback = null, prompt = null) {
  if (!state.active || state.active.trackId !== track.id) throw new Error('No matching active session.');
  const text = answer.trim();
  if (!text) throw new Error('Write a response before continuing.');
  if (state.active.index >= track.stages.length) throw new Error('Session is already complete.');
  return { ...state, active: {
    ...state.active,
    answers: [...state.active.answers, { stage: track.stages[state.active.index].label, prompt: prompt || track.stages[state.active.index].prompt, text, ...(feedback ? { feedback } : {}) }],
    index: state.active.index + 1
  } };
}

export function finishSession(state, reflection, selfRatings = {}, now = new Date()) {
  if (!state.active) throw new Error('No active session.');
  const session = { ...state.active, reflection: reflection.trim(), selfRatings, completedAt: now.toISOString() };
  return { ...state, active: null, sessions: [session, ...state.sessions] };
}

export function addReview(state, item, now = new Date()) {
  const original = item.original.trim();
  const improved = item.improved.trim();
  if (!original || !improved) throw new Error('Both expressions are required.');
  const due = new Date(now);
  due.setUTCDate(due.getUTCDate() + intervals[0]);
  return { ...state, reviews: [{ id: crypto.randomUUID(), original, improved, context: item.context.trim(), step: 0, dueAt: due.toISOString(), createdAt: now.toISOString() }, ...state.reviews] };
}

export function reviewItem(state, id, recalled, now = new Date()) {
  const reviews = state.reviews.map(item => {
    if (item.id !== id) return item;
    const step = recalled ? Math.min(item.step + 1, intervals.length - 1) : 0;
    const due = new Date(now);
    due.setUTCDate(due.getUTCDate() + intervals[step]);
    return { ...item, step, dueAt: due.toISOString(), lastReviewedAt: now.toISOString() };
  });
  return { ...state, reviews };
}

export function dueReviews(state, now = new Date()) {
  return state.reviews.filter(item => new Date(item.dueAt) <= now);
}

export function exportData(state) {
  return JSON.stringify(state, null, 2);
}
