## ADDED Requirements

### Requirement: Staged practice tracks
The application MUST offer conversation, technical leadership and presentation tracks, showing one prompt at a time with a suggested duration and allowing the learner to submit an English text response before proceeding.

#### Scenario: Complete a presentation
- GIVEN the learner starts the presentation track
- WHEN the learner answers every prompt and completes the reflection
- THEN the session and its answers appear in history with the completion date

#### Scenario: Empty answer
- GIVEN an active stage
- WHEN the learner submits whitespace only
- THEN the stage does not advance

### Requirement: Honest assessment boundary
The application MUST not label authored prompts, learner-entered corrections or session counts as automated language assessment or CEFR proficiency scores.

#### Scenario: Review without automated feedback
- GIVEN a completed session
- WHEN the learner reads the history
- THEN the original response is available without fabricated grading or correction

### Requirement: Recover unfinished work
The application MUST persist a submitted stage and allow a learner to continue the active session after a browser refresh.

#### Scenario: Refresh
- GIVEN one submitted answer in an active session
- WHEN the page is reloaded in the same browser profile
- THEN the next prompt and earlier answer remain available
