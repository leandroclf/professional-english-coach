# Add evidence-aware AI feedback

## Why
The text MVP requires the learner to supply their own corrections. Context-sensitive, actionable feedback could help, provided it is evaluated rather than assumed accurate.

## Proposed scope
- Opt-in provider-backed feedback after each response: comprehension-critical, language accuracy and natural professional phrasing.
- Keep learner response, suggested revision and rationale distinct; let the learner accept/reject each suggestion.
- Adaptive next prompt that refers to the answer and tests retrieval of recurring errors.
- Versioned feedback rubric, human-rated evaluation set, privacy controls, cost ceiling and failure fallback.

## Gate before implementation
Define evaluation data and human review rubric for correctness, pedagogical usefulness, overcorrection, hallucination and latency. Never display an automated CEFR level without validation.
