import test from 'node:test';
import assert from 'node:assert/strict';
import { createAppServer } from '../server.js';

async function withServer(config, run) {
  const server = createAppServer(config);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  try { await run(`http://127.0.0.1:${address.port}`); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test('status does not expose secrets and identifies unavailable coaching', async () => {
  await withServer({ apiKey: '', model: '' }, async base => {
    const response = await fetch(`${base}/api/status`);
    assert.deepEqual(await response.json(), { feedbackAvailable: false });
  });
});

test('feedback endpoint does not call provider when keys are missing', async () => {
  let called = false;
  await withServer({ apiKey: '', model: 'test', fetchImpl: async () => { called = true; } }, async base => {
    const response = await fetch(`${base}/api/feedback`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: 'Question', answer: 'Answer' }) });
    assert.equal(response.status, 503);
    assert.match((await response.json()).error, /OPENAI_API_KEY/);
  });
  assert.equal(called, false);
});

test('feedback endpoint returns structured provider suggestions without logging the response', async () => {
  const expected = { critical: '', accuracy: '', natural_version: 'That design improves recovery.', reusable_expression: 'The trade-off is…', follow_up: 'How will you measure recovery time?' };
  let providerRequest;
  await withServer({ apiKey: 'server-secret', model: 'coach-model', fetchImpl: async (url, options) => {
    providerRequest = { url, options };
    return { ok: true, json: async () => ({ output_text: JSON.stringify(expected) }) };
  } }, async base => {
    const response = await fetch(`${base}/api/feedback`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: 'Defend the choice.', answer: 'It improves recovery.' }) });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), expected);
  });
  assert.equal(providerRequest.url, 'https://api.openai.com/v1/responses');
  assert.equal(providerRequest.options.headers.Authorization, 'Bearer server-secret');
});

test('app serves its entry point and rejects unsupported methods', async () => {
  await withServer({ apiKey: '', model: '' }, async base => {
    assert.equal((await fetch(base)).status, 200);
    assert.equal((await fetch(`${base}/.git/config`)).status, 403);
    assert.equal((await fetch(`${base}/api/status`, { method: 'DELETE' })).status, 405);
  });
});
