# Roadmap and release gates

## 0. Foundation — implemented, browser acceptance pending

Text scenarios, local history, manual expression review, export/delete and unit tests. Acceptance: run the application in a browser, complete all stages, refresh mid-session, verify review reveal and export, check mobile layout and keyboard navigation.

## 1. Research and measurement

Interview the learner about real meeting formats and pain points. Define baseline speaking and writing samples; establish a rubric and human-rated evaluation set. Determine which tasks should be practiced three days weekly, how long they take in practice and how errors should recur. Decide acceptable outcome metrics before claiming improvement.

## 2. Adaptive feedback

See `openspec/changes/add-ai-feedback/`. Introduce opt-in provider configuration, structured suggestions, transparent uncertainty, accept/reject flow and evaluation harness. Protect original responses and avoid storing unverified generated corrections as facts. Gate: quality and safety against the human-rated sample plus latency/cost budget.

## 3. Voice and presentation

See `openspec/changes/add-voice-practice/`. Capture speech, give transcript and replay controls, support responsive role-play and realistic Q&A. Gate: consent, retention controls, browser coverage, accessibility and calibrated human comparison for any oral rubric.

## 4. Longitudinal product

Learner model, goals, scenario authoring, cross-device storage and progress reports. Gate: privacy and account model, migration from local export, measured retention and evidence that adaptive scheduling helps compared with the baseline.

Prioritize the next step using observed use, not the number of features. The first release intentionally has no backend service or cloud spend.
