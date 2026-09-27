import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { units, questionsFor } from '../src/curriculum.js';
import { initialState, loadState, saveState, exportData, STORAGE_KEY } from '../src/engine.js';
import { learningState, startLearning, beginLearning, answerLearning, continueLearning, learningDraft, revealLearningHelp, recommendUnits, learningMetrics, setLearningPreferences } from '../src/learning-engine.js';
import { renderLearning } from '../src/learning-view.js';

const now = new Date('2026-09-21T12:00:00Z');
function complete(state, id, { mode = 'recognition', time = now, wrong = false, assisted = false } = {}) {
  state = startLearning(state, id, mode, false, time);
  if (state.learning.active.phase === 'lesson') state = beginLearning(state);
  while (state.learning.active) {
    const q = state.learning.active.questions[state.learning.active.index];
    if (assisted) state = revealLearningHelp(state);
    const answer = wrong && q.options ? q.options.find(o => o.value !== q.answer).value : q.answer ?? 'My own meaningful response.';
    state = answerLearning(state, answer);
    state = continueLearning(state, time);
  }
  return state;
}

test('all eight lessons have bilingual instruction and valid progressive content', () => {
  assert.equal(units.length, 8);
  assert.equal(new Set(units.map(u => u.id)).size, units.length);
  for (const unit of units) {
    assert.ok(unit.explanation.en && unit.explanation['pt-BR'] && unit.rationale['pt-BR']);
    assert.ok(unit.example.includes(unit.missing));
    assert.equal(questionsFor(unit).length, 2);
    assert.equal(questionsFor(unit, 'guided').length, 5);
    assert.equal(questionsFor(unit, 'applied').length, 8);
    assert.deepEqual(questionsFor(unit, 'applied').map(q => q.type), ['choice','choice','order','listen','write','write','write','write']);
    for (const q of questionsFor(unit)) assert.ok(q.options.some(o => o.value === q.answer));
    const result = complete(initialState(), unit.id, { mode: 'applied' });
    assert.equal(result.learning.records[unit.id].correct, 4);
    assert.equal(result.learning.records[unit.id].total, 4);
  }
});

test('legacy state is unchanged and recognition completes without written answers', () => {
  const original = initialState();
  assert.equal(learningState(original).mode, 'recognition');
  assert.equal(original.learning, undefined);
  const state = complete(original, 'introductions');
  assert.equal(state.learning.runs[0].answers.length, 2);
  assert.deepEqual(state.sessions, original.sessions);
  assert.equal(state.learning.active, null);
  assert.equal(state.learning.records.introductions.dueAt, '2026-09-22T12:00:00.000Z');
});

test('feedback must be acknowledged and malformed/double submission is rejected', () => {
  let state = startLearning(initialState(), 'introductions');
  assert.throws(() => answerLearning(state, 'true'), /No unanswered/);
  assert.throws(() => startLearning(state, 'requests'), /already active/);
  state = beginLearning(state);
  assert.throws(() => answerLearning(state, 'x'), /Invalid choice/);
  assert.throws(() => answerLearning(state, '', 'unsure', true), /required/);
  state = answerLearning(state, 'true');
  assert.equal(state.learning.active.index, 0);
  assert.throws(() => answerLearning(state, 'true'), /No unanswered/);
  state = continueLearning(state);
  assert.equal(state.learning.active.index, 1);
});

test('draft and help survive storage round trip and export', () => {
  const memory = new Map(), storage = { getItem: key => memory.get(key), setItem: (key, value) => memory.set(key, value) };
  let state = beginLearning(startLearning(initialState(), 'requests'));
  state = learningDraft(state, 'true'); state = revealLearningHelp(state);
  saveState(storage, state); state = loadState(storage);
  assert.equal(state.learning.active.draft, 'true');
  assert.equal(state.learning.active.assisted, true);
  assert.equal(JSON.parse(exportData(state)).learning.active.draft, 'true');
  assert.ok(memory.has(STORAGE_KEY));
});

test('assistance and skips do not inflate unassisted accuracy; writing is ungraded', () => {
  const assisted = complete(initialState(), 'introductions', { assisted: true });
  assert.equal(learningMetrics(assisted).total, 0);
  let state = beginLearning(startLearning(initialState(), 'introductions', 'guided'));
  for (let i=0; i<3; i++) { state = answerLearning(state, state.learning.active.questions[i].answer); state = continueLearning(state); }
  state = answerLearning(state, '', 'unsure', true); state = continueLearning(state);
  state = answerLearning(state, 'I am Sam. I work on the website.'); state = continueLearning(state);
  assert.equal(state.learning.runs[0].answers[3].skipped, true);
  assert.equal(state.learning.runs[0].answers[4].correct, null);
  assert.equal(learningMetrics(state).total, 3);
});

test('delayed retrieval advances spacing, same-day repetition does not, and errors reset it', () => {
  let state = complete(initialState(), 'introductions');
  state = complete(state, 'introductions');
  assert.equal(state.learning.records.introductions.step, 0);
  state = complete(state, 'introductions', { time: new Date('2026-09-22T12:00:00Z') });
  assert.equal(state.learning.records.introductions.step, 1);
  assert.equal(state.learning.records.introductions.dueAt, '2026-09-25T12:00:00.000Z');
  state = complete(state, 'introductions', { wrong: true, time: new Date('2026-09-25T12:00:00Z') });
  assert.equal(state.learning.records.introductions.step, 0);
  assert.equal(state.learning.records.introductions.mistakes.length, 2);
  assert.equal(recommendUnits(state, new Date('2026-09-26T12:00:00Z'))[0].id, 'introductions');
});

test('due review begins with retrieval; new lessons show instruction first', () => {
  const state = complete(initialState(), 'introductions');
  assert.equal(startLearning(state, 'introductions', 'recognition', false, new Date('2026-09-22T12:00:00Z')).learning.active.phase, 'question');
  assert.equal(startLearning(state, 'requests').learning.active.phase, 'lesson');
});

test('mixed retrieval combines studied units and weekly goals count unique local days', () => {
  let state = complete(initialState(), 'introductions');
  state = complete(state, 'requests');
  const mixed = startLearning(state, 'introductions', 'applied', true);
  assert.equal(mixed.learning.active.mode, 'recognition');
  assert.equal(new Set(mixed.learning.active.questions.map(q => q.unitId)).size, 2);
  assert.equal(learningMetrics(state, now).days, 1);
  state = setLearningPreferences(state, 5, 'guided');
  assert.equal(state.learning.goal, 5);
  assert.throws(() => setLearningPreferences(state, 100, 'guided'), /Invalid/);
  assert.equal(learningMetrics(state, new Date('2026-09-28T12:00:00Z')).days, 0);
});

test('both interfaces expose beginner modes, media alternatives and explicit feedback', () => {
  const escape = s => String(s).replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  for (const lang of ['en', 'pt-BR']) {
    let state = initialState();
    assert.match(renderLearning(state, lang, escape), /learning-preferences/);
    state = startLearning(state, 'introductions');
    const introduction = renderLearning(state, lang, escape);
    assert.match(introduction, /kind="captions"/);
    assert.match(introduction, /introductions.mp3/);
    state = beginLearning(state); state = answerLearning(state, 'false');
    assert.match(renderLearning(state, lang, escape), /role="status"/);
    assert.match(renderLearning(state, lang, escape), /learn-continue/);
  }
});

test('every curriculum media file exists with original script and captions', async () => {
  const manifest = JSON.parse(await readFile('content/learning-media/manifest.json', 'utf8'));
  for (const unit of units) {
    assert.equal((await readFile(`content/learning-media/${unit.id}.txt`, 'utf8')).trim(), unit.example);
    assert.ok((await stat(`src/assets/audio/${unit.id}.mp3`)).size > 1000);
    assert.equal(manifest.audio.find(a => a.id === unit.id).transcript, unit.example);
  }
  assert.ok((await stat('src/assets/video/introductions.mp4')).size > 1000);
  assert.match(await readFile('src/assets/video/introductions.vtt', 'utf8'), /^WEBVTT/);
});
