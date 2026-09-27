# Implementation tasks

- [x] Add local server feedback endpoint using server environment credentials.
- [x] Require explicit per-response consent and keep the API key out of the browser.
- [x] Validate structured feedback and preserve learner answers on provider failure.
- [x] Use returned follow-up as the next prompt; retain the original next prompt as fallback.
- [x] Add unit and integration tests for schema, credential absence, endpoint status and static file safety.
- [ ] Run browser interaction checks with a human review of real provider feedback.
- [ ] Create a human-rated quality set and measure correction quality, latency and API cost before treating this change as release complete.
