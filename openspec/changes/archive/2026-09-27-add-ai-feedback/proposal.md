# Add evidence-aware AI feedback

## Why
The text MVP requires the learner to supply their own corrections. Context-sensitive, actionable feedback could help, provided it is evaluated rather than assumed accurate.

## Proposed scope
- Opt-in provider-backed feedback after each response: comprehension-critical, language accuracy and natural professional phrasing.
- Keep learner response, suggested revision and rationale distinct; let the learner accept/reject each suggestion.
- Adaptive next prompt that refers to the answer and tests retrieval of recurring errors.
- Versioned feedback rubric, human-rated evaluation set, privacy controls, cost ceiling and failure fallback.

## MVP implementation update

The local MVP now includes an opt-in feedback request through a same-origin server route. It uses the OpenAI Responses API with `OPENAI_API_KEY` and `OPENAI_MODEL` supplied only to the server environment. Responses must match a strict JSON schema; original answers remain saved locally and are not sent unless the learner checks the consent box. The first release presents feedback as suggestions, not verified corrections. Provider-backed evaluation, latency/cost telemetry and rubric validation remain release gates.

## Gate before implementation
Define evaluation data and human review rubric for correctness, pedagogical usefulness, overcorrection, hallucination and latency. Never display an automated CEFR level without validation.
