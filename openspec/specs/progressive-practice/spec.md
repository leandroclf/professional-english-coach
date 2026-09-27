# Progressive practice Specification

## Requirements

### Requirement: Progress from recognition to extended production
Each new session MUST begin with its saved lesson explanation, then progress through a true/false check, a multiple-choice check, an optional audio cloze when configured, one short guided sentence, and the track's authored open responses in that order.

#### Scenario: Learner completes a new practice track
- **GIVEN** a learner starts any track
- **WHEN** they advance through its authored activities
- **THEN** the bilingual objective, explanation and example appear before the first check
- **AND** true/false precedes multiple choice
- **AND** the optional audio cloze appears before guided sentence production when that asset is enabled
- **AND** guided production precedes the track's open responses

#### Scenario: Learner submits a guided sentence
- **GIVEN** the learner is on a guided sentence activity
- **WHEN** they submit a non-empty response
- **THEN** the response is saved with stage and prompt locally
- **AND** the app does not label it correct or incorrect or assign a proficiency score

### Requirement: Explain closed-answer responses
The application MUST give immediate answer-specific feedback for true/false, multiple-choice and audio-cloze answers. Audio transcripts MUST remain hidden until an answer is submitted and MUST be revealed afterward.

#### Scenario: Learner submits a correct or incorrect choice
- **GIVEN** the learner submits a true/false or multiple-choice option
- **WHEN** the app evaluates the answer
- **THEN** it shows correctness, the expected response and a concise explanation

#### Scenario: Learner completes or skips audio cloze
- **GIVEN** a session includes the optional listening activity
- **WHEN** the learner submits a phrase or skips the activity
- **THEN** a submitted phrase receives answer feedback and reveals the transcript
- **AND** a skip is recorded as skipped rather than as a learner response
- **AND** the learner can replay the clip and continue without it

### Requirement: Preserve existing sessions and consent boundaries
The app MUST preserve the saved order of an in-progress session and MUST NOT send lesson answers to an AI provider without separate explicit learner consent. The optional AI conversation turn MUST only be offered after authored open-ended practice.

#### Scenario: Learner resumes a prior session
- **GIVEN** an unfinished session was created before a curriculum change and has no saved stage plan
- **WHEN** the learner resumes it
- **THEN** it follows its legacy stage order

#### Scenario: Learner completes authored practice
- **GIVEN** a learner submits a guided or authored answer
- **WHEN** the answer is recorded
- **THEN** it remains in local browser state
- **AND** provider submission is offered only at its existing consent boundary

### Requirement: Keep practice and assessment claims bounded
The application MUST present closed-answer exercises as practice and MUST NOT infer proficiency, CEFR status, hearing ability, pronunciation ability or verified learning outcomes from responses.

#### Scenario: Learner sees answer feedback
- **GIVEN** the app evaluates a closed-answer exercise
- **WHEN** it presents correctness and an explanation
- **THEN** it does not infer a proficiency level or certify learning outcomes
