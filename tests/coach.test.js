import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFeedbackInput, parseFeedback, requestFeedback } from '../src/coach.js';

const valid = { critical: '', accuracy: 'Use “depends on”.', natural_version: 'The design depends on the provider.', reusable_expression: 'It depends on…', follow_up: 'What happens if the provider is unavailable?' };

test('feedback parser accepts the required coaching structure and bounds text', () => {
  assert.deepEqual(parseFeedback(JSON.stringify(valid)), valid);
  assert.throws(() => parseFeedback('{broken'), /valid JSON/);
  assert.throws(() => parseFeedback(JSON.stringify({ accuracy: 'Only one field' })), /missing critical/);
  const long = { ...valid, accuracy: 'x'.repeat(2000) };
  assert.equal(parseFeedback(JSON.stringify(long)).accuracy.length, 1800);
});

test('feedback input limits learner text and keeps recent context concise', () => {
  const input = JSON.parse(buildFeedbackInput({ track: 'Leadership', prompt: 'Explain the choice.', answer: 'a'.repeat(6000), previousAnswers: Array.from({ length: 6 }, (_, i) => ({ prompt: `p${i}`, text: `t${i}` })) }));
  assert.equal(input.learner_response.length, 5000);
  assert.deepEqual(input.recent_context.map(item => item.prompt), ['p3', 'p4', 'p5']);
});

test('provider integration uses the Responses endpoint and validates returned JSON', async () => {
  let sent;
  const feedback = await requestFeedback({ track: 'Architecture review', prompt: 'Defend the queue.', answer: 'It improves recovery.' }, {
    apiKey: 'test-secret', model: 'test-model',
    fetchImpl: async (url, options) => {
      sent = { url, options };
      return { ok: true, json: async () => ({ output_text: JSON.stringify(valid) }) };
    }
  });
  assert.deepEqual(feedback, valid);
  assert.equal(sent.url, 'https://api.openai.com/v1/responses');
  assert.equal(sent.options.headers.Authorization, 'Bearer test-secret');
  assert.equal(JSON.parse(sent.options.body).text.format.type, 'json_schema');
});

test('provider is never called without server credentials', async () => {
  let called = false;
  await assert.rejects(requestFeedback({ answer: 'hello' }, { model: 'test', fetchImpl: async () => { called = true; } }), /OPENAI_API_KEY/);
  assert.equal(called, false);
});
