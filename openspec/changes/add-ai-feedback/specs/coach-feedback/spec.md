## ADDED Requirements

### Requirement: Explicit consent for provider processing
The application MUST send a learner response to the configured AI provider only after the learner explicitly opts in for that response. Provider credentials MUST remain on the server.

#### Scenario: Consent unchecked
- GIVEN AI feedback is configured
- WHEN the learner submits a response without opting in
- THEN the response is saved locally and no provider request is made

#### Scenario: Consent checked
- GIVEN a provider is configured and the learner opts in
- WHEN the response is submitted
- THEN the server sends the prompt and response to the provider and stores valid structured feedback with the session

#### Scenario: Provider unavailable
- GIVEN credentials are missing or the provider fails
- WHEN the learner submits an opted-in response
- THEN the answer is still saved and the learner sees a useful failure message

### Requirement: Reviewable coaching suggestions
The application MUST show suggestions separately from learner text and MUST NOT describe them as verified corrections or CEFR assessment.

#### Scenario: Follow-up adapts the next prompt
- GIVEN the provider returns a follow-up question
- WHEN the learner advances to the next stage
- THEN that follow-up is shown and the authored next prompt remains available as fallback
