# progressive-practice Specification

## Requirements

### Requirement: Progress from recognition to production
The practice experience MUST present a true-or-false exercise, then a multiple-choice exercise, before presenting open-ended prompts in every track.

#### Scenario: Learner begins a track
- **GIVEN** a learner starts any existing practice track
- **WHEN** the first two stages are presented
- **THEN** the first stage is a required true-or-false exercise
- **AND** the second stage is a required multiple-choice exercise
- **AND** later authored stages accept open-ended text responses

### Requirement: Explain closed-answer responses
The practice experience MUST give immediate answer-specific feedback for the true-or-false and multiple-choice exercises.

#### Scenario: Learner submits a correct choice
- **GIVEN** a learner selects the expected option
- **WHEN** the learner continues to the next stage
- **THEN** the app identifies the response as correct
- **AND** provides a concise explanation

#### Scenario: Learner submits an incorrect choice
- **GIVEN** a learner selects an unexpected option
- **WHEN** the learner continues to the next stage
- **THEN** the app identifies the response as incorrect
- **AND** shows the expected answer and a concise explanation

### Requirement: Preserve local-first and consent controls
The app MUST keep introductory and open-ended responses in local browser storage and MUST NOT send them to the AI provider without explicit learner consent. An AI conversation turn MUST only be offered after all authored open-ended prompts are complete.

#### Scenario: Learner completes a guided exercise
- **GIVEN** a learner is on either of the first two stages
- **WHEN** the learner submits an answer
- **THEN** the app stores it locally with its answer-specific evaluation
- **AND** does not offer an AI provider submission for that stage

#### Scenario: Learner reaches the final AI conversation stage
- **GIVEN** a learner has completed the two guided stages and all authored open-ended prompts
- **AND** has opted into AI feedback on the final authored prompt
- **WHEN** the provider returns a follow-up question
- **THEN** the app offers one final text response stage
- **AND** offers to send that response only with separate learner consent
- **AND** proceeds to reflection after that stage

#### Scenario: Learner does not opt into AI or the service is unavailable
- **GIVEN** a learner completes the authored open-ended prompts
- **WHEN** the learner has not opted into AI or the service is unavailable
- **THEN** the app proceeds to reflection without an AI conversation stage

### Requirement: Keep assessment claims bounded
The app MUST present the closed-answer exercises as practice and MUST NOT convert these responses into a proficiency or CEFR score.

#### Scenario: Learner sees answer feedback
- **GIVEN** the app evaluates a closed-answer exercise
- **WHEN** it presents correctness and an explanation
- **THEN** it does not infer a proficiency level or certify learning outcomes
