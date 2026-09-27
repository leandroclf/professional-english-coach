import test from 'node:test';
import assert from 'node:assert/strict';
import { tracks } from '../src/data.js';
import { initialState, startSession, submitAnswer, finishSession, addReview, reviewItem, dueReviews, loadState, saveState, STORAGE_KEY } from '../src/engine.js';

test('a session preserves staged answers and completed history', () => {
  const track = tracks[2];
  let state = startSession(initialState(), track, new Date('2026-09-27T12:00:00Z'));
  assert.throws(() => submitAnswer(state, track, '   '), /Write a response/);
  for (const stage of track.stages) state = submitAnswer(state, track, `Response to ${stage.label}`);
  state = finishSession(state, 'State the evidence first.', new Date('2026-09-27T12:20:00Z'));
  assert.equal(state.active, null);
  assert.equal(state.sessions[0].answers.length, 5);
  assert.equal(state.sessions[0].reflection, 'State the evidence first.');
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
