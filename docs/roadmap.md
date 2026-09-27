# Roadmap and release gates

## 0. Foundation — implemented, browser acceptance pending

Text scenarios, local history, manual expression review, export/delete and unit tests. Acceptance: run the application in a browser, complete all stages, refresh mid-session, verify review reveal and export, check mobile layout and keyboard navigation.

## 1. Research and measurement

The product has a four-axis self-reflection form, but it has no validated outcome measure. Interview the learner about real meeting formats and pain points. Define baseline speaking and writing samples; establish a rubric and human-rated evaluation set. Determine which tasks should be practiced three days weekly, how long they take in practice and how errors should recur. Decide acceptable outcome metrics before claiming improvement.

## 2. Adaptive feedback

See `openspec/changes/add-ai-feedback/`. Opt-in OpenAI Responses API feedback, a strict schema, unverified-suggestion labels and adaptive follow-up are implemented. Gate: human-rated quality and safety sample, browser acceptance and latency/cost budget. An accept/reject workflow is still needed before adding generated expressions to the review deck.

## 3. Voice and presentation

See `openspec/changes/add-voice-practice/`. Browser dictation into an editable response and prompt playback are implemented. Gate: target-browser acceptance and accent/domain transcription evaluation. Audio recording, replay, real-time turn taking and oral scoring require a separate design; any rubric needs calibrated human comparison.

## 4. Longitudinal product

Learner model, goals, scenario authoring, cross-device storage and progress reports. Gate: privacy and account model, migration from local export, measured retention and evidence that adaptive scheduling helps compared with the baseline.

Prioritize the next step using observed use, not the number of features. The local app has no cloud hosting or user account; optional AI calls incur provider API charges.
