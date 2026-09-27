import { tracks, expressions } from './data.js';
import { STORAGE_KEY, loadState, saveState, startSession, submitAnswer, finishSession, addReview, reviewItem, dueReviews, exportData, initialState } from './engine.js';

const root = document.querySelector('#app');
let state = loadState(localStorage);
let view = 'overview';
let revealedReview = null;
let notice = '';
let feedbackAvailable = false;
let recognition = null;

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const dateLabel = value => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value));
const ratingLabels = { fluency: 'Fluency', precision: 'Precision', vocabulary: 'Professional vocabulary', argumentation: 'Argumentation' };
const ratingFields = () => Object.entries(ratingLabels).map(([key, label]) => `<label for="rating-${key}">${label} <span class="muted">(1 = needs work, 5 = felt strong)</span></label><select id="rating-${key}" name="rating-${key}"><option value="">Not rated</option>${[1,2,3,4,5].map(value => `<option value="${value}">${value}</option>`).join('')}</select>`).join('');
const feedbackCard = (feedback, context = '') => `<div class="feedback-box"><span class="eyebrow">COACH SUGGESTION · REVIEW BEFORE REUSE</span>${feedback.critical ? `<p><strong>Clarity:</strong> ${escapeHtml(feedback.critical)}</p>` : ''}${feedback.accuracy ? `<p><strong>Language:</strong> ${escapeHtml(feedback.accuracy)}</p>` : ''}${feedback.observed_form && feedback.preferred_form ? `<p><strong>Pattern:</strong> ${escapeHtml(feedback.observed_form)} → ${escapeHtml(feedback.preferred_form)}</p><button class="button subtle" data-action="save-correction" data-original="${escapeHtml(feedback.observed_form)}" data-improved="${escapeHtml(feedback.preferred_form)}" data-context="${escapeHtml(context)}">Add this correction to review ↗</button>` : ''}<p><strong>Natural version:</strong> ${escapeHtml(feedback.natural_version)}</p><p><strong>Reusable expression:</strong> ${escapeHtml(feedback.reusable_expression)}</p><p><strong>Follow-up:</strong> ${escapeHtml(feedback.follow_up)}</p></div>`;

function update(next) { state = next; saveState(localStorage, state); render(); }
function setNotice(message) { notice = message; render(); }
function navigation() {
  return `<aside class="sidebar"><a class="brand" href="#overview"><span class="brand-mark">P<span>↗</span></span><span>PROFESSIONAL<br><strong>ENGLISH COACH</strong></span></a>
    <div class="side-label">YOUR WORKSPACE</div>
    <nav aria-label="Main navigation">
      <a href="#overview" class="nav-link ${view === 'overview' ? 'active' : ''}">◫ <span>Overview</span></a>
      <a href="#practice" class="nav-link ${view === 'practice' ? 'active' : ''}">◉ <span>Practice room</span></a>
      <a href="#reviews" class="nav-link ${view === 'reviews' ? 'active' : ''}">◇ <span>Review deck</span>${dueReviews(state).length ? `<b>${dueReviews(state).length}</b>` : ''}</a>
      <a href="#history" class="nav-link ${view === 'history' ? 'active' : ''}">▤ <span>History</span></a>
    </nav>
    <div class="sidebar-bottom"><div class="profile-icon">L</div><div><strong>Your learning space</strong><small>Private on this device</small></div></div>
  </aside>`;
}

function header(title, subtitle) {
  return `<div class="page-top"><div><p class="eyebrow">THE WORKSPACE / ${escapeHtml(view.toUpperCase())}</p><h1>${title}</h1><p class="subtext">${subtitle}</p></div><div class="top-actions"><span class="status-dot"></span> Learning in progress</div></div>`;
}

function overview() {
  const completed = state.sessions.length;
  const due = dueReviews(state).length;
  return `${header('Speak with clarity.<br><em>Lead with confidence.</em>', 'Deliberate practice for the conversations that matter at work.')}
    <section class="hero"><div><span class="pill">YOUR NEXT MOVE</span><h2>${state.active ? 'Your practice is waiting.' : 'Make your thinking heard.'}</h2>
    <p>${state.active ? 'Continue where you left off. Your answers are saved on this device.' : 'A focused session is a small investment in how you communicate every day.'}</p><a class="button primary" href="#practice">${state.active ? 'Continue session' : 'Start a practice session'} <span>↗</span></a></div><div class="hero-art" aria-hidden="true"><div class="orbit one"></div><div class="orbit two"></div><div class="orbit three"></div><div class="core">✦</div></div></section>
    <div class="section-title"><div><span class="eyebrow">AT A GLANCE</span><h2>Your progress</h2></div><span class="muted">Built one conversation at a time</span></div>
    <div class="stats"><div class="stat"><span>COMPLETED SESSIONS</span><strong>${completed.toString().padStart(2, '0')}</strong><small>Keep showing up</small></div><div class="stat"><span>EXPRESSIONS TO REVIEW</span><strong>${due.toString().padStart(2, '0')}</strong><small>${due ? 'Ready for retrieval' : 'All caught up'}</small></div><div class="stat"><span>LAST PRACTICED</span><strong class="date-stat">${completed ? dateLabel(state.sessions[0].completedAt) : '—'}</strong><small>${completed ? tracks.find(t => t.id === state.sessions[0].trackId)?.name ?? 'Practice' : 'Your journey starts here'}</small></div></div>
    ${completed && state.sessions[0].selfRatings && Object.keys(state.sessions[0].selfRatings).length ? `<div class="panel ratings-panel"><div><span class="eyebrow">LATEST SELF-ASSESSMENT</span><p class="muted">Reflection aid, not a proficiency score.</p></div><div class="rating-summary">${Object.entries(ratingLabels).map(([key, label]) => `<div><span>${label}</span><strong>${escapeHtml(state.sessions[0].selfRatings[key] ?? '—')}<small> / 5</small></strong></div>`).join('')}</div></div>` : ''}
    <div class="section-title track-heading"><div><span class="eyebrow">THE WEEKLY RHYTHM</span><h2>Three ways to grow</h2></div><a href="#practice" class="text-link">Explore practice →</a></div>
    <div class="track-grid">${tracks.map(t => `<a href="#practice" class="track-card"><span class="track-number">${t.number} / ${t.day}</span><div class="track-symbol">${t.id === 'conversation' ? '◌' : t.id === 'leadership' ? '◇' : '▧'}</div><h3>${escapeHtml(t.name)}</h3><p>${escapeHtml(t.intro)}</p><span class="track-foot">${t.minutes} MINUTES <span>↗</span></span></a>`).join('')}</div>
    <p class="footnote">Practice is text based in this first release. Scores and language corrections are not generated automatically.</p>`;
}

function practice() {
  if (state.active) {
    const track = tracks.find(t => t.id === state.active.trackId);
    if (!track) return `<div class="panel"><h2>Unknown track</h2><button data-action="discard">Discard session</button></div>`;
    const stage = track.stages[state.active.index];
    const lastAnswer = state.active.index > 0 ? state.active.answers[state.active.index - 1] : null;
    const lastFeedback = lastAnswer?.feedback;
    const stagePrompt = stage && state.active.index > 0 ? state.active.answers[state.active.index - 1]?.feedback?.follow_up || stage.prompt : stage?.prompt;
    return `${header('Practice room', 'Respond in English before seeing the next challenge.')}
      <div class="practice-layout"><div class="panel practice-panel"><div class="progress-top"><span class="eyebrow">${escapeHtml(track.name.toUpperCase())}</span><span>STEP ${Math.min(state.active.index + 1, track.stages.length)} OF ${track.stages.length}</span></div>
      <div class="progress-bar"><span style="width:${Math.round(state.active.index / track.stages.length * 100)}%"></span></div>
      ${stage ? `<span class="stage-label">${escapeHtml(stage.label)} · ABOUT ${stage.minutes} MIN</span><h2>${escapeHtml(stagePrompt)}</h2><p class="muted">${escapeHtml(stage.hint)}</p>${lastFeedback ? feedbackCard(lastFeedback, lastAnswer.prompt) : ''}
      <form id="answer-form"><input type="hidden" name="prompt" value="${escapeHtml(stagePrompt)}"><label for="answer">Your response</label><textarea id="answer" name="answer" required rows="8" placeholder="Write what you would say in the meeting…"></textarea><div class="voice-tools"><p class="voice-disclosure">Speech recognition may use a browser-managed service. This app stores only the transcript; review it before sending.</p><button type="button" class="button subtle" data-action="dictate">🎙 ${recognition ? 'Stop dictation' : 'Dictate in English'}</button><button type="button" class="button subtle" data-action="read-prompt">▶ Read prompt aloud</button><span id="voice-status" role="status">Voice support depends on your browser.</span></div>
      <label class="consent-row"><input type="checkbox" name="ai-consent" ${feedbackAvailable ? '' : 'disabled'}><span><strong>Get optional AI feedback</strong><small>${feedbackAvailable ? 'This sends the current prompt, your response and up to 3 recent responses to the configured AI provider. Suggestions are unverified; review before using them.' : 'AI feedback is unavailable until the server is configured. Your answer stays on this device.'}</small></span></label>
      <div class="form-actions"><button class="button primary" type="submit">Save & continue →</button><button type="button" class="button subtle" data-action="discard">Discard session</button></div></form>
      ` : `<span class="stage-label">REFLECTION</span><h2>What will you say differently next time?</h2><p class="muted">Review your answers, then write one practical takeaway. Your self-assessment is yours; this version does not grade your English.</p><form id="finish-form"><label for="reflection">Your takeaway (optional)</label><textarea id="reflection" name="reflection" rows="4" placeholder="One thing I want to improve is…"></textarea><div class="rating-fields">${ratingFields()}</div><button class="button primary" type="submit">Complete session →</button></form>`}</div>
      <aside class="panel context-panel"><span class="eyebrow">YOUR SESSION</span><h3>${escapeHtml(track.name)}</h3><p>${escapeHtml(track.intro)}</p><div class="context-divider"></div><span class="eyebrow">RESPONSES</span>${state.active.answers.length ? state.active.answers.map(a => `<details><summary>${escapeHtml(a.stage)}</summary><p>${escapeHtml(a.text)}</p></details>`).join('') : '<p class="muted">Your responses will appear here as you go.</p>'}</aside></div>`;
  }
  return `${header('Choose your practice.', 'Three focused formats for technical communication in English.')}
  <div class="selection-grid">${tracks.map(t => `<article class="panel selection-card"><span class="eyebrow">${t.day} · ${t.minutes} MINUTES</span><div class="big-symbol">${t.number}</div><h2>${escapeHtml(t.name)}</h2><p>${escapeHtml(t.intro)}</p><p class="muted">${t.stages.length} prompts · write at your own pace</p><button data-action="start" data-track="${t.id}" class="button primary">Begin session ↗</button></article>`).join('')}</div><p class="footnote">The suggested time is a guide. There is no automatic timer or live conversation partner in this version.</p>`;
}

function reviews() {
  const due = dueReviews(state);
  return `${header('Review deck', 'Save useful expressions and bring them back into active use.')}
  <div class="two-column"><section class="panel"><span class="eyebrow">DUE TODAY · ${due.length}</span><h2>Recall before revealing.</h2>${due.length ? due.map(item => `<div class="review-card"><small>ORIGINAL EXPRESSION</small><p>${escapeHtml(item.original)}</p>${revealedReview === item.id ? `<div class="reveal"><small>YOUR IMPROVED VERSION</small><strong>${escapeHtml(item.improved)}</strong>${item.context ? `<p>${escapeHtml(item.context)}</p>` : ''}</div><div class="form-actions"><button data-action="review-retry" data-id="${item.id}" class="button subtle">Practice again</button><button data-action="review-recalled" data-id="${item.id}" class="button primary">I recalled it</button></div>` : `<button data-action="reveal" data-id="${item.id}" class="button subtle">Reveal expression →</button>`}</div>`).join('') : '<p class="empty-note">Nothing due now. Add a phrase you would like to reuse at work.</p>'}</section>
  <section class="panel"><span class="eyebrow">BUILD YOUR DECK</span><h2>Capture a better way to say it.</h2><p class="muted">Add corrections from a teacher, colleague, or your own reflection. This app does not verify the correction.</p><form id="review-form"><label for="original">What you said or want to improve</label><input id="original" name="original" required maxlength="300" placeholder="It depends of the provider"><label for="improved">Improved expression</label><input id="improved" name="improved" required maxlength="300" placeholder="It depends on the provider"><label for="context">Where would you use it? (optional)</label><input id="context" name="context" maxlength="300" placeholder="In an architecture review"><button class="button primary" type="submit">Add to review deck ↗</button></form><div class="context-divider"></div><span class="eyebrow">USEFUL STARTERS</span><ul class="expression-list">${expressions.map(e => `<li>${escapeHtml(e)}</li>`).join('')}</ul></section></div>
  ${state.reviews.length ? `<div class="panel all-reviews"><h2>All expressions <span class="count">${state.reviews.length}</span></h2>${state.reviews.map(item => `<div class="review-row"><div><strong>${escapeHtml(item.improved)}</strong><small>From: ${escapeHtml(item.original)}</small>${item.occurrences > 1 ? `<small>Pattern recorded ${item.occurrences} times</small>` : ''}</div><span>Next: ${dateLabel(item.dueAt)}</span><button class="icon-button" data-action="remove-review" data-id="${item.id}" aria-label="Remove expression">×</button></div>`).join('')}</div>` : ''}`;
}

function history() {
  return `${header('Your history', 'A record of the arguments you practiced and the ideas you sharpened.')}
    <div class="panel history-panel"><div class="history-head"><div><span class="eyebrow">YOUR RECORD</span><h2>${state.sessions.length} completed ${state.sessions.length === 1 ? 'session' : 'sessions'}</h2></div><div class="form-actions"><button class="button subtle" data-action="export">Export data</button><button class="button danger" data-action="clear">Delete all data</button></div></div>
    ${state.sessions.length ? state.sessions.map(s => `<details class="history-item"><summary><span><strong>${escapeHtml(tracks.find(t => t.id === s.trackId)?.name ?? s.trackId)}</strong><small>${dateLabel(s.completedAt)} · ${s.answers.length} responses</small></span><span>View session +</span></summary>${s.answers.map(a => `<div class="history-answer"><small>${escapeHtml(a.stage)} · ${escapeHtml(a.prompt)}</small><p>${escapeHtml(a.text)}</p>${a.feedback ? feedbackCard(a.feedback, a.prompt) : ''}</div>`).join('')}<div class="history-answer">${s.selfRatings && Object.keys(s.selfRatings).length ? `<small>SELF-REFLECTION RATINGS · NOT A PROFICIENCY SCORE</small><p>${Object.entries(ratingLabels).filter(([key]) => s.selfRatings[key]).map(([key,label]) => `${escapeHtml(label)}: ${escapeHtml(s.selfRatings[key])}/5`).join(" · ")}</p>` : ""}</div><div class="history-answer"><small>REFLECTION</small><p>${escapeHtml(s.reflection || 'No reflection recorded.')}</p></div></details>`).join('') : '<p class="empty-note">Your completed sessions will appear here. Start with one focused practice.</p>'}</div>`;
}

function render() {
  view = ['overview', 'practice', 'reviews', 'history'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'overview';
  root.innerHTML = `${navigation()}<main class="main"><div class="content">${notice ? `<div class="notice" role="status">${escapeHtml(notice)} <button data-action="dismiss" aria-label="Dismiss notification">×</button></div>` : ''}${({ overview, practice, reviews, history })[view]()}</div><footer>PROFESSIONAL ENGLISH COACH <span>THINK CLEARLY. SPEAK CONFIDENTLY.</span></footer></main>`;
}

root.addEventListener('submit', async event => {
  event.preventDefault();
  try {
    const data = new FormData(event.target);
    if (event.target.id === 'answer-form') {
      const answer = data.get('answer');
      const active = state.active;
      const track = tracks.find(t => t.id === active.trackId);
      const prompt = data.get('prompt');
      let feedback = null;
      if (data.get('ai-consent') === 'on') {
        const button = event.target.querySelector('[type="submit"]'); button.disabled = true; button.textContent = 'Coach is reviewing…';
        try {
          const response = await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ track: track.name, prompt, answer, previousAnswers: active.answers }) });
          const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Coach feedback is unavailable.');
          feedback = result;
        } catch (error) { notice = `${error.message} Your response will still be saved.`; }
      }
      if (state.active?.id !== active.id) return;
      update(submitAnswer(state, track, answer, feedback, prompt));
    }
    if (event.target.id === 'finish-form') {
      const selfRatings = Object.keys(ratingLabels).reduce((ratings, key) => { const value = data.get(`rating-${key}`); if (value) ratings[key] = Number(value); return ratings; }, {});
      update(finishSession(state, data.get('reflection') || '', selfRatings)); location.hash = '#history';
    }
    if (event.target.id === 'review-form') { update(addReview(state, Object.fromEntries(data))); setNotice('Expression saved. Your first review is due tomorrow.'); }
  } catch (error) { setNotice(error.message); }
});

root.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action, track, id } = button.dataset;
  if (action === 'dismiss') { notice = ''; render(); }
  if (action === 'read-prompt') {
    if (!('speechSynthesis' in window)) return setNotice('Read aloud is not supported in this browser.');
    const active = state.active; const track = active && tracks.find(t => t.id === active.trackId); const nextPrompt = track?.stages[active.index];
    const prompt = active?.index > 0 ? active.answers[active.index - 1]?.feedback?.follow_up || nextPrompt?.prompt : nextPrompt?.prompt;
    speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(prompt));
  }
  if (action === 'dictate') {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return setNotice('Speech recognition is not supported here. You can still type your response.');
    if (recognition) { recognition.stop(); recognition = null; button.textContent = '🎙 Dictate in English'; return; }
    recognition = new SpeechRecognition(); recognition.lang = 'en-US'; recognition.continuous = true; recognition.interimResults = false;
    const textarea = root.querySelector('#answer'); const status = root.querySelector('#voice-status');
    recognition.onresult = event => { const words = Array.from(event.results).slice(event.resultIndex).map(result => result[0].transcript.trim()).join(' '); textarea.value = `${textarea.value}${textarea.value && words ? ' ' : ''}${words}`; textarea.dispatchEvent(new Event('input', { bubbles: true })); };
    recognition.onerror = () => { recognition = null; if (status) status.textContent = 'Microphone recognition failed. You can continue by typing.'; button.textContent = '🎙 Dictate in English'; };
    recognition.onend = () => { recognition = null; const current = root.querySelector('[data-action="dictate"]'); if (current) current.textContent = '🎙 Dictate in English'; if (status) status.textContent = 'Dictation stopped. Review and edit your transcript.'; };
    recognition.start(); button.textContent = '■ Stop dictation'; if (status) status.textContent = 'Listening. Review the transcript before submitting.';
  }
  if (action === 'start') { update(startSession(state, tracks.find(t => t.id === track))); location.hash = '#practice'; }
  if (action === 'discard' && confirm('Discard this unfinished session?')) update({ ...state, active: null });
  if (action === 'reveal') { revealedReview = id; render(); }
  if (action === 'review-recalled' || action === 'review-retry') { update(reviewItem(state, id, action === 'review-recalled')); revealedReview = null; }
  if (action === 'save-correction') {
    const next = addReview(state, { original: button.dataset.original, improved: button.dataset.improved, context: button.dataset.context || '' });
    const entry = next.reviews.find(item => item.original.toLowerCase() === button.dataset.original.toLowerCase() && item.improved.toLowerCase() === button.dataset.improved.toLowerCase());
    update(next); setNotice(entry?.occurrences > 1 ? `Saved. This pattern has been recorded ${entry.occurrences} times.` : 'Correction added to your review deck.');
  }
  if (action === 'remove-review' && confirm('Remove this expression?')) update({ ...state, reviews: state.reviews.filter(item => item.id !== id) });
  if (action === 'export') { const blob = new Blob([exportData(state)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'professional-english-coach-data.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
  if (action === 'clear' && confirm('Delete all local sessions, reviews and unfinished work? This cannot be undone.')) { localStorage.removeItem(STORAGE_KEY); state = initialState(); render(); }
});

addEventListener('hashchange', render);
render();
fetch('/api/status').then(response => response.json()).then(result => { feedbackAvailable = Boolean(result.feedbackAvailable); if (view === 'practice' && state.active) render(); }).catch(() => {});
