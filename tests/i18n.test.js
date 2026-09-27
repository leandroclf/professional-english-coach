import test from 'node:test';
import assert from 'node:assert/strict';
import { preferredLanguage, practiceCopy, trackCopy, translateMarkup } from '../src/i18n.js';
import { tracks } from '../src/data.js';

test('browser locale selects Portuguese on first visit while an explicit choice wins', () => {
  assert.equal(preferredLanguage('', 'pt-BR'), 'pt-BR');
  assert.equal(preferredLanguage('', 'pt-PT'), 'pt-BR');
  assert.equal(preferredLanguage('', 'en-US'), 'en');
  assert.equal(preferredLanguage('en', 'pt-BR'), 'en');
  assert.equal(preferredLanguage('pt-BR', 'en-US'), 'pt-BR');
});

test('localized track copy and stage directions leave practice prompts in English', () => {
  const track = tracks.find(item => item.id === 'conversation');
  assert.equal(trackCopy(track, 'pt-BR').name, 'Conversação e fluência');
  assert.equal(trackCopy(track, 'en').name, track.name);
  assert.match(track.lesson.objective['pt-BR'], /Diga o que você apoia/);
  assert.match(track.lesson.example, /^I agree with/);
  assert.equal(practiceCopy(track.stages[2].hint, 'pt-BR'), 'Ouça para identificar o custo mencionado depois de “The main trade-off is”. Você pode repetir o áudio.');
  assert.equal(track.stages[3].prompt, 'Complete this frame with a real recent decision: “I chose ___ because ___.”');
  assert.equal(track.stages[4].prompt, 'What technical decision did you make recently, and what made it difficult?');
  assert.equal(practiceCopy(track.stages[0].label, 'pt-BR'), 'Exercício rápido · verdadeiro ou falso');
  assert.equal(practiceCopy('Listening · complete the phrase', 'pt-BR'), 'Compreensão oral · complete a expressão');
});

test('Portuguese interface copy is translated without modifying protected learner content', () => {
  const markup = '<span>Practice room</span><p>__COACH_DYNAMIC_0__</p><small>STEP 2 OF 4</small><h2>1 completed session</h2>';
  assert.equal(translateMarkup(markup, 'pt-BR'), '<span>Sala de prática</span><p>__COACH_DYNAMIC_0__</p><small>ETAPA 2 DE 4</small><h2>1 sessão concluída</h2>');
  assert.equal(translateMarkup(markup, 'en'), markup);
});
