# Implementation tasks

- [x] Add local server feedback endpoint using server environment credentials.
- [x] Require explicit per-response consent and keep the API key out of the browser.
- [x] Validate structured feedback and preserve learner answers on provider failure.
- [x] Use returned follow-up as the next prompt; retain the original next prompt as fallback.
- [x] Let the learner accept an observed/preferred correction pair into the review deck and group repeated patterns locally.
- [x] Add unit and integration tests for schema, credential absence, endpoint status and static file safety.
- [x] Defer browser review of live provider feedback; no provider credentials were available and the owner requested no human gate. Mocked endpoint and failure behavior are covered by automated tests.
- [x] Defer human-rated quality, latency and API-cost evaluation to future product research; suggestions remain clearly unverified and provider use is opt-in.
