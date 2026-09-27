# AI feedback design

## Request path

The browser sends one response to the same-origin local Node server only after the learner checks the per-response consent box. The server calls the OpenAI Responses API using `OPENAI_API_KEY` and `OPENAI_MODEL` from its process environment. The browser never receives the key. No content is logged or persisted by the server; the structured suggestion is saved with that session in local browser storage.

## Feedback contract

Strict JSON schema returns: comprehension-critical concern, one priority language correction, an observed/preferred form pair, natural professional rewrite, reusable expression, and a follow-up question. Empty critical, accuracy and correction-pair fields mean none identified. Follow-up questions replace the next authored prompt for that session only. The learner can accept a correction into the review deck; repeated identical pairs are grouped and rescheduled locally. Responses are suggestions, not assessed grades. JSON is validated before rendering; all values are HTML escaped.

## Limits and safety

The local server binds to loopback by default, rejects oversized requests, rejects hidden paths, and has a request timeout. There is no provider call without both credentials and an explicit learner action. Browser storage remains local. This MVP has no per-user authentication or cloud deployment design; do not expose this server publicly as configured.

## Release gate

Create and human-rate representative learner responses before claiming coaching accuracy. Check meaning preservation, overcorrection, follow-up relevance, malformed output fallback and latency/cost. The current test suite validates contract and failure paths, not pedagogical quality.
