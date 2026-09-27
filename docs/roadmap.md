# Roadmap and release gates

## 0. Foundation — implemented, browser acceptance pending

Text scenarios, progressive true/false and multiple-choice practice, a short guided sentence, open responses, optional post-exercise AI text exchange, local history, manual expression review, export/delete and unit tests. Each new session now begins with an objective, concise localized explanation and English worked example before the first check. A short optional audio-cloze with transcript is enabled using a locally generated sample under the owner's personal-use authorization. Its voice/output rights were not independently reviewed, as accepted by the owner. The sequence is research-informed but has not been evaluated for learning outcomes in this product. Automated tests and static-build validation are the current acceptance gate; usability and browser-specific issues can be corrected from observed feedback.

## 1. Research and measurement

The product has a four-axis self-reflection form, but it has no validated outcome measure. Interview the learner about real meeting formats and pain points. Define baseline speaking and writing samples; establish a rubric and human-rated evaluation set. Determine which tasks should be practiced three days weekly, how long they take in practice and how errors should recur. Decide acceptable outcome metrics before claiming improvement.

## 2. Adaptive feedback

See `openspec/changes/add-ai-feedback/`. Opt-in OpenAI Responses API feedback, a strict schema, unverified-suggestion labels, adaptive follow-up and learner-approved error-pattern capture are implemented. Gate: human-rated quality and safety sample, browser acceptance, latency/cost budget and correction validation.

## 3. Voice and presentation

See `openspec/changes/add-voice-practice/`. Browser dictation into an editable response and prompt playback are implemented. Gate: target-browser acceptance and accent/domain transcription evaluation. Audio recording, replay, real-time turn taking and oral scoring require a separate design; any rubric needs calibrated human comparison.

### Media authoring pilot

See `openspec/changes/archive/2026-09-27-add-prepractice-instruction/`. A Colab-compatible optional inspection notebook and a locally generated audio sample support lesson media. The clip is included under the owner's explicit authorization; rights and pronunciation are recorded as not independently reviewed. No learner voice, VoiceStudio server or generated-media service is sent to or hosted by the app.

## 4. Longitudinal product

Learner model, goals, scenario authoring, cross-device storage and progress reports. Gate: privacy and account model, migration from local export, measured retention and evidence that adaptive scheduling helps compared with the baseline.

Prioritize the next step using observed use, not the number of features. The Sites-hosted build is static. It keeps learner data and language preferences in local browser storage and does not include the local Node server's optional AI feedback endpoint. The application has no user account or cross-device sync. If provider-backed feedback is added to hosting later, it needs an explicit API-cost budget and the existing per-response consent.

## 5. Human conversation practice — future discovery

Explore human-led sessions only after validating the guided-to-open-to-AI text progression. Define tutor identity and vetting, scheduling, safeguarding, learner-content handling, consent, moderation, accessibility and operating costs before building any matching or live conversation features. No human tutor feature is present today.

## Evidence-informed learning release — September 2026

Shipped: eight bilingual micro-lessons, 64 authored activities at maximum support progression, eight new synthetic audio clips, one captioned original video, recognition/guided/applied modes, due/error-based recommendations, mixed retrieval, explicit feedback, help tracking, weekly goals and persistent learning history. See [competitive analysis](competitive-analysis.md) for the complete implementation matrix and prioritized future dependencies.

The broader roadmap remains proposed: family profiles, validated backup restore, offline/PWA, hosted AI with cost controls, recording and pronunciation evaluation, richer lexical/content banks, reminders, human interaction and cloud sync. They are not marked implemented merely because they are listed. Human quality reviews remain optional future evaluation, not release gates for this owner's personal/family use.
