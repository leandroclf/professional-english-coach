import test from 'node:test';
import assert from 'node:assert/strict';
import { tracks, listeningClozeCandidate } from '../src/data.js';
import { isMediaAssetApproved } from '../src/media-assets.js';
import { initialState, startSession, stagesForSession, saveDraft, submitAnswer, skipOptionalStage, finishSession, addReview, reviewItem, dueReviews, loadState, saveState, STORAGE_KEY } from '../src/engine.js';

test('a session preserves staged answers and completed history', () => {
  const track = tracks[2];
  let state = startSession(initialState(), track, new Date('2026-09-27T12:00:00Z'));
  assert.throws(() => submitAnswer(state, track, '   '), /Write a response/);
  for (const stage of track.stages) state = submitAnswer(state, track, `Response to ${stage.label}`);
  state = finishSession(state, 'State the evidence first.', { fluency: 3, argumentation: 4 }, new Date('2026-09-27T12:20:00Z'));
  assert.equal(state.active, null);
  assert.equal(state.sessions[0].answers.length, track.stages.length);
  assert.equal(state.sessions[0].reflection, 'State the evidence first.');
  assert.deepEqual(state.sessions[0].selfRatings, { fluency: 3, argumentation: 4 });
  assert.equal('lessonPlan' in state.sessions[0], false);
});

test('every track progresses from recognition through guided production to open responses', () => {
  for (const track of tracks) {
    assert.deepEqual(track.stages.slice(0, 3).map(stage => stage.mode), ['true_false', 'multiple_choice', 'guided_response']);
    assert.equal(track.stages[3].mode, undefined);
    let state = startSession(initialState(), track);
    state = submitAnswer(state, track, 'False');
    assert.equal(state.active.answers[0].evaluation.correct, true);
    state = submitAnswer(state, track, 'A');
    assert.equal(state.active.answers[1].text, 'The queue maybe good.');
    assert.equal(state.active.answers[1].evaluation.correct, false);
    assert.equal(state.active.answers[1].evaluation.correctAnswer, 'The main trade-off is added latency in exchange for better isolation.');
    state = submitAnswer(state, track, 'I chose asynchronous processing because it improves recovery.');
    assert.equal(state.active.answers[2].evaluation, undefined);
    assert.equal(state.active.answers[2].stage, 'Guided sentence · one idea');
    assert.match(state.active.answers[2].prompt, /Complete this frame/);
    state = submitAnswer(state, track, 'I would explain the trade-off with a concrete example.');
    assert.equal(state.active.answers[3].evaluation, undefined);
  }
});

test('an unfinished session from the previous curriculum keeps its original stage order', () => {
  const track = tracks[0];
  let state = startSession(initialState(), track);
  state = submitAnswer(state, track, 'False');
  const { stagePlan, lessonPlan, ...legacyActive } = state.active;
  assert.equal(lessonPlan.objective.en.length > 0, true);
  legacyActive.index = 1;
  state = { ...state, active: legacyActive };
  assert.equal(stagesForSession(state.active, track)[1].label, 'Conversation');
  state = submitAnswer(state, track, 'I would explain the decision and trade-offs.');
  assert.equal(state.active.answers.at(-1).stage, 'Conversation');
});

test('new sessions save the bilingual lesson plan while legacy sessions remain unchanged', () => {
  const track = tracks[0];
  const state = startSession(initialState(), track);
  assert.equal(state.active.lessonPlan.objective.en, track.lesson.objective.en);
  assert.equal(state.active.lessonPlan.objective['pt-BR'], track.lesson.objective['pt-BR']);
  assert.notEqual(state.active.lessonPlan, track.lesson);

  const { lessonPlan, ...legacyActive } = state.active;
  assert.equal(lessonPlan.objective.en.length > 0, true);
  assert.equal(legacyActive.lessonPlan, undefined);
  assert.equal(stagesForSession(legacyActive, track)[0].mode, 'true_false');
});

test('unreviewed audio candidates are excluded from new learner sessions', () => {
  assert.equal(isMediaAssetApproved(listeningClozeCandidate.mediaAssetId), false);
  assert.equal(tracks.some(track => track.stages.some(stage => stage.mode === 'audio_cloze')), false);
});

test('audio cloze accepts case and terminal punctuation, then reveals its transcript', () => {
  const track = {
    ...tracks[0],
    stages: [listeningClozeCandidate, ...tracks[0].stages]
  };
  let state = startSession(initialState(), track);
  state = submitAnswer(state, track, 'HIGHER LATENCY!');
  const answer = state.active.answers[0];
  assert.equal(answer.evaluation.correct, true);
  assert.equal(answer.evaluation.correctAnswer, 'higher latency');
  assert.match(answer.evaluation.transcript, /higher latency/);
  assert.equal(answer.feedback, undefined);
});

test('optional listening can be skipped without recording a learner response', () => {
  const track = { ...tracks[0], stages: [listeningClozeCandidate, ...tracks[0].stages] };
  let state = startSession(initialState(), track);
  state = skipOptionalStage(state, track);
  assert.equal(state.active.index, 1);
  assert.deepEqual(state.active.answers[0], {
    stage: listeningClozeCandidate.label,
    prompt: listeningClozeCandidate.prompt,
    text: '',
    skipped: true
  });
  assert.throws(() => skipOptionalStage(state, track), /Only an optional activity can be skipped/);
});

test('a generated follow-up prompt is preserved with the learner answer', () => {
  const track = tracks[0];
  let state = startSession(initialState(), track);
  const generatedPrompt = 'What evidence would show the queue is worth its cost?';
  state = submitAnswer(state, track, 'A queue protects us from provider downtime.', { follow_up: generatedPrompt }, 'Why did you choose asynchronous processing?');
  assert.equal(state.active.answers[0].prompt, 'Why did you choose asynchronous processing?');
  assert.equal(state.active.answers[0].feedback.follow_up, generatedPrompt);
});

test('an opted-in AI follow-up opens one final conversation turn after open-ended practice', () => {
  const track = tracks[0];
  let state = startSession(initialState(), track);
  for (let index = 0; index < track.stages.length - 1; index++) {
    const stage = track.stages[index];
    state = submitAnswer(state, track, stage.correctAnswer ?? `Response to ${stage.label}`);
  }
  const finalStage = track.stages.at(-1);
  const followUp = 'What evidence would convince the team?';
  state = submitAnswer(state, track, 'I would compare failure rates and recovery time.', { follow_up: followUp });
  assert.equal(state.active.index, track.stages.length);
  assert.equal(state.active.conversationPrompt, followUp);
  state = submitAnswer(state, track, 'I would compare both measures against the current baseline.', { follow_up: 'A second question' }, followUp);
  assert.equal(state.active.answers.at(-1).stage, 'AI conversation');
  assert.equal(state.active.index, track.stages.length + 1);
  assert.throws(() => submitAnswer(state, track, 'More'), /Session is already complete/);
  assert.equal(finalStage.mode, undefined);
});

test('review recall advances spacing and a retry resets it', () => {
  const now = new Date('2026-09-27T12:00:00Z');
  let state = addReview(initialState(), { original: 'depends of', improved: 'depends on', context: 'Review' }, now);
  assert.equal(dueReviews(state, now).length, 0);
  assert.equal(dueReviews(state, new Date('2026-09-28T12:00:00Z')).length, 1);
  const id = state.reviews[0].id;
  state = reviewItem(state, id, true, new Date('2026-09-28T12:00:00Z'));
  assert.equal(state.reviews[0].dueAt, '2026-10-01T12:00:00.000Z');
  state = reviewItem(state, id, false, new Date('2026-10-01T12:00:00Z'));
  assert.equal(state.reviews[0].dueAt, '2026-10-02T12:00:00.000Z');
});

test('repeated corrections are grouped and scheduled for another retrieval attempt', () => {
  const first = new Date('2026-09-27T12:00:00Z');
  let state = addReview(initialState(), { original: 'depends of', improved: 'depends on', context: 'Provider review' }, first);
  const id = state.reviews[0].id;
  state = addReview(state, { original: 'Depends of!', improved: 'depends on', context: 'Architecture review' }, new Date('2026-09-28T12:00:00Z'));
  assert.equal(state.reviews.length, 1);
  assert.equal(state.reviews[0].id, id);
  assert.equal(state.reviews[0].occurrences, 2);
  assert.equal(state.reviews[0].context, 'Architecture review');
  assert.equal(state.reviews[0].dueAt, '2026-09-29T12:00:00.000Z');
});

test('local state round trip and invalid version handling', () => {
  const memory = new Map();
  const storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  let state = startSession(initialState(), tracks[0]);
  state = submitAnswer(state, tracks[0], 'I chose a queue for resilience.');
  saveState(storage, state);
  assert.equal(loadState(storage).active.answers[0].text, 'I chose a queue for resilience.');
  storage.setItem(STORAGE_KEY, '{"version": 999}');
  assert.deepEqual(loadState(storage), initialState());
});

test('an unfinished response draft survives reload and clears after submission', () => {
  const memory = new Map();
  const storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  let state = startSession(initialState(), tracks[0]);
  state = saveDraft(state, 'I would isolate the provider behind a port.');
  saveState(storage, state);
  state = loadState(storage);
  assert.equal(state.active.draft, 'I would isolate the provider behind a port.');
  state = submitAnswer(state, tracks[0], state.active.draft);
  assert.equal(state.active.draft, '');
  assert.equal(state.active.answers[0].text, 'I would isolate the provider behind a port.');
});
