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

export function stagesForSession(active, track) {
  return active.stagePlan ?? track.legacyStages ?? track.stages;
}

export function startSession(state, track, now = new Date()) {
  if (state.active) throw new Error('Finish or discard the current session first.');
  const stagePlan = track.stages.map(stage => ({ ...stage, ...(stage.options ? { options: stage.options.map(option => ({ ...option })) } : {}) }));
  return { ...state, active: { id: crypto.randomUUID(), trackId: track.id, startedAt: now.toISOString(), answers: [], index: 0, draft: '', stagePlan } };
}

export function submitAnswer(state, track, answer, feedback = null, prompt = null) {
  if (!state.active || state.active.trackId !== track.id) throw new Error('No matching active session.');
  const text = answer.trim();
  if (!text) throw new Error('Write a response before continuing.');
  const stages = stagesForSession(state.active, track);
  const isAiConversation = state.active.index === stages.length && Boolean(state.active.conversationPrompt);
  if (state.active.index >= stages.length && !isAiConversation) throw new Error('Session is already complete.');
  const stage = stages[state.active.index] ?? { label: 'AI conversation', prompt: state.active.conversationPrompt };
  const recordedText = stage.options?.find(option => option.value === text)?.label ?? text;
  const evaluation = stage.correctAnswer ? {
    correct: text === stage.correctAnswer,
    correctAnswer: stage.options.find(option => option.value === stage.correctAnswer)?.label ?? stage.correctAnswer,
    explanation: stage.explanation
  } : null;
  const active = {
    ...state.active,
    answers: [...state.active.answers, { stage: stage.label, prompt: prompt || stage.prompt, text: recordedText, ...(evaluation ? { evaluation } : {}), ...(feedback ? { feedback } : {}) }],
    index: state.active.index + 1,
    draft: ''
  };
  if (!isAiConversation && state.active.index === stages.length - 1 && feedback?.follow_up) active.conversationPrompt = feedback.follow_up;
  return { ...state, active };
}

export function saveDraft(state, draft) {
  if (!state.active) return state;
  return { ...state, active: { ...state.active, draft: String(draft ?? '') } };
}

export function finishSession(state, reflection, selfRatings = {}, now = new Date()) {
  if (!state.active) throw new Error('No active session.');
  const { stagePlan, ...sessionData } = state.active;
  const session = { ...sessionData, reflection: reflection.trim(), selfRatings, completedAt: now.toISOString() };
  return { ...state, active: null, sessions: [session, ...state.sessions] };
}

export function addReview(state, item, now = new Date()) {
  const original = item.original.trim();
  const improved = item.improved.trim();
  if (!original || !improved) throw new Error('Both expressions are required.');
  const due = new Date(now);
  due.setUTCDate(due.getUTCDate() + intervals[0]);
  const normalize = value => value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const match = state.reviews.find(review => normalize(review.original) === normalize(original) && normalize(review.improved) === normalize(improved));
  if (match) return { ...state, reviews: state.reviews.map(review => review.id === match.id ? { ...review, occurrences: (review.occurrences ?? 1) + 1, step: 0, dueAt: due.toISOString(), lastSeenAt: now.toISOString(), context: item.context.trim() || review.context } : review) };
  return { ...state, reviews: [{ id: crypto.randomUUID(), original, improved, context: item.context.trim(), occurrences: 1, step: 0, dueAt: due.toISOString(), createdAt: now.toISOString() }, ...state.reviews] };
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
