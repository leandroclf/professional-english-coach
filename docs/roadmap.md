# Roadmap and release gates

## 0. Foundation — implemented, browser acceptance pending

Text scenarios, progressive true/false and multiple-choice practice, a short guided sentence, open responses, optional post-exercise AI text exchange, local history, manual expression review, export/delete and unit tests. This sequence is research-informed but has not been evaluated for learning outcomes in this product. Acceptance: run the application in a browser, complete all stages, refresh mid-session, verify review reveal and export, check mobile layout and keyboard navigation.

## 1. Research and measurement

The product has a four-axis self-reflection form, but it has no validated outcome measure. Interview the learner about real meeting formats and pain points. Define baseline speaking and writing samples; establish a rubric and human-rated evaluation set. Determine which tasks should be practiced three days weekly, how long they take in practice and how errors should recur. Decide acceptable outcome metrics before claiming improvement.

## 2. Adaptive feedback

See `openspec/changes/add-ai-feedback/`. Opt-in OpenAI Responses API feedback, a strict schema, unverified-suggestion labels, adaptive follow-up and learner-approved error-pattern capture are implemented. Gate: human-rated quality and safety sample, browser acceptance, latency/cost budget and correction validation.

## 3. Voice and presentation

See `openspec/changes/add-voice-practice/`. Browser dictation into an editable response and prompt playback are implemented. Gate: target-browser acceptance and accent/domain transcription evaluation. Audio recording, replay, real-time turn taking and oral scoring require a separate design; any rubric needs calibrated human comparison.

## 4. Longitudinal product

Learner model, goals, scenario authoring, cross-device storage and progress reports. Gate: privacy and account model, migration from local export, measured retention and evidence that adaptive scheduling helps compared with the baseline.

Prioritize the next step using observed use, not the number of features. The Sites-hosted build is static and private. It keeps learner data and language preferences in local browser storage and does not include the local Node server's optional AI feedback endpoint. The application has no user account or cross-device sync. If provider-backed feedback is added to hosting later, it needs an explicit API-cost budget and the existing per-response consent.

## 5. Human conversation practice — future discovery

Explore human-led sessions only after validating the guided-to-open-to-AI text progression. Define tutor identity and vetting, scheduling, safeguarding, learner-content handling, consent, moderation, accessibility and operating costs before building any matching or live conversation features. No human tutor feature is present today.
