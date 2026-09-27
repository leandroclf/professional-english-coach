# progressive-practice Specification

## Requirements

### Requirement: Bridge recognition and extended production
New practice sessions MUST progress from true/false recognition to multiple-choice recognition, then to one short contextualized sentence-production task before the track's authored open responses.

#### Scenario: Learner starts a new track
- **GIVEN** a learner starts any track
- **WHEN** they complete the first three activities
- **THEN** the activities are true/false, multiple choice, and guided sentence production, in that order
- **AND** the guided activity asks for the learner's own idea in one sentence
- **AND** later track activities accept open-ended responses

#### Scenario: Learner submits a guided sentence
- **GIVEN** the learner is on a guided sentence activity
- **WHEN** they submit a non-empty response
- **THEN** the response is saved with the stage and prompt in local session state
- **AND** the app does not label it correct or incorrect or assign a proficiency score

### Requirement: Preserve existing sessions and consent boundaries
The app MUST preserve the saved order of an in-progress session, and MUST keep the guided activity outside provider-backed AI feedback.

#### Scenario: Learner resumes a prior session
- **GIVEN** an unfinished session was created before this change and has no saved stage plan
- **WHEN** the learner resumes it
- **THEN** it follows the legacy stage order

#### Scenario: Learner completes the guided activity
- **GIVEN** a learner submits the guided sentence
- **WHEN** it is recorded
- **THEN** it remains in local browser state
- **AND** no provider submission is offered for this activity
- **AND** existing separate consent rules still apply only to the existing final authored response and AI turn
