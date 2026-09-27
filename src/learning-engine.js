import { units, questionsFor, learningModes } from './curriculum.js';

const delays = [1, 3, 7, 14, 30];
const norm = text => String(text).normalize('NFKC').toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ').trim();
export const learningState = state => state.learning ?? { goal: 3, mode: 'recognition', records: {}, runs: [], active: null };
const withLearning = (state, learning) => ({ ...state, learning });
export function setLearningPreferences(state, goal, mode) {
  if (![1, 3, 5, 7].includes(goal) || !learningModes.includes(mode)) throw new Error('Invalid preference');
  return withLearning(state, { ...learningState(state), goal, mode });
}
export function recommendUnits(state, now = new Date()) {
  const records = learningState(state).records;
  return [...units].sort((a, b) => {
    const rank = unit => { const r = records[unit.id]; return !r ? [1, units.indexOf(unit)] : new Date(r.dueAt) <= now ? [0, Date.parse(r.dueAt)] : [2, Date.parse(r.lastAt)]; };
    const x = rank(a), y = rank(b); return x[0] - y[0] || x[1] - y[1];
  });
}
export function startLearning(state, unitId, mode = learningState(state).mode, mixed = false, now = new Date()) {
  const learning = learningState(state);
  if (learning.active) throw new Error('A lesson is already active');
  const unit = units.find(item => item.id === unitId);
  if (!unit || !learningModes.includes(mode)) throw new Error('Unknown lesson');
  const candidates = recommendUnits(state, now).filter(item => learning.records[item.id]).slice(0, 4);
  const isDue = learning.records[unitId] && new Date(learning.records[unitId].dueAt) <= now;
  const questions = mixed ? (candidates.length ? candidates : [unit]).map(item => questionsFor(item)[1]) : questionsFor(unit, mode);
  return withLearning(state, { ...learning, active: { unitId, mode: mixed ? 'recognition' : mode, mixed, questions: structuredClone(questions), index: 0, answers: [], draft: '', assisted: false, phase: mixed || isDue ? 'question' : 'lesson', startedAt: now.toISOString() } });
}
export function beginLearning(state) {
  const learning = learningState(state);
  if (!learning.active || learning.active.phase !== 'lesson') throw new Error('No lesson introduction');
  return withLearning(state, { ...learning, active: { ...learning.active, phase: 'question' } });
}
export function learningDraft(state, draft) {
  const learning = learningState(state);
  if (!learning.active || learning.active.phase !== 'question') return state;
  return withLearning(state, { ...learning, active: { ...learning.active, draft: String(draft).slice(0, 4000) } });
}
export function revealLearningHelp(state) {
  const learning = learningState(state);
  if (!learning.active || learning.active.phase !== 'question') return state;
  return withLearning(state, { ...learning, active: { ...learning.active, assisted: true } });
}
export function answerLearning(state, text, confidence = 'unsure', skip = false) {
  const learning = learningState(state), active = learning.active;
  if (!active || active.phase !== 'question') throw new Error('No unanswered question');
  const question = active.questions[active.index];
  if (skip && !question.optional) throw new Error('This question is required');
  text = String(text ?? '').trim().slice(0, 4000);
  if (!skip && !text) throw new Error('An answer is required');
  if (!skip && question.options && !question.options.some(option => option.value === text)) throw new Error('Invalid choice');
  if (!['unsure', 'confident'].includes(confidence)) throw new Error('Invalid confidence');
  const answer = { id: question.id, unitId: question.unitId, type: question.type, prompt: question.prompt, responseLabel: question.options?.find(option => option.value === text)?.label.en ?? text, text: skip ? '' : text, skipped: skip, assisted: active.assisted, confidence, correct: skip || !question.answer ? null : norm(text) === norm(question.answer) };
  return withLearning(state, { ...learning, active: { ...active, phase: 'feedback', answers: [...active.answers, answer], draft: '' } });
}
export function continueLearning(state, now = new Date()) {
  const learning = learningState(state), active = learning.active;
  if (!active || active.phase !== 'feedback') throw new Error('Review feedback first');
  if (active.index + 1 < active.questions.length) return withLearning(state, { ...learning, active: { ...active, index: active.index + 1, phase: 'question', draft: '', assisted: false } });
  const records = { ...learning.records };
  for (const unitId of new Set(active.answers.map(answer => answer.unitId))) {
    const objective = active.answers.filter(a => a.unitId === unitId && a.correct !== null && !a.assisted);
    const wrong = objective.some(a => !a.correct);
    const previous = records[unitId];
    // Only successful retrieval on a later calendar day can lengthen spacing.
    const delayed = previous && localDay(new Date(previous.lastAt)) !== localDay(now);
    const step = !objective.length || wrong ? 0 : delayed ? Math.min((previous.step ?? 0) + 1, delays.length - 1) : (previous?.step ?? 0);
    const due = new Date(now); due.setDate(due.getDate() + delays[step]);
    records[unitId] = { step, dueAt: due.toISOString(), lastAt: now.toISOString(), correct: objective.filter(a => a.correct).length, total: objective.length, mistakes: objective.filter(a => !a.correct).map(a => a.id), mode: active.mode };
  }
  const { questions, ...run } = active;
  return withLearning(state, { ...learning, records, active: null, runs: [{ ...run, completedAt: now.toISOString() }, ...learning.runs] });
}
export function pauseLearning(state) {
  const learning = learningState(state);
  return withLearning(state, { ...learning, active: null });
}
export function localDay(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
export function learningMetrics(state, now = new Date()) {
  const learning = learningState(state);
  const weekStart = new Date(now); weekStart.setHours(0, 0, 0, 0); weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + 6) % 7);
  const days = new Set(learning.runs.filter(run => new Date(run.completedAt) >= weekStart && new Date(run.completedAt) <= now).map(run => localDay(new Date(run.completedAt))));
  const answers = learning.runs.flatMap(run => run.answers).filter(a => a.correct !== null && !a.assisted && !a.skipped);
  return { days: days.size, total: answers.length, correct: answers.filter(a => a.correct).length, due: Object.values(learning.records).filter(r => new Date(r.dueAt) <= now).length, studied: Object.keys(learning.records).length };
}
