# Learning path

## Requirements

### Requirement: Progressive bilingual lessons
The app SHALL provide eight original lessons with English/PT-BR explanations and English practice. Recognition MUST be the default and end after true/false and multiple choice. Guided mode SHALL add ordering, optional listening and one sentence. Applied mode SHALL then add transfer, scripted dialogue and rewriting.

#### Scenario: A beginner completes a short lesson
- GIVEN recognition mode and an explanation
- WHEN the learner answers the two closed questions and continues through feedback
- THEN the lesson completes without requiring prose.

### Requirement: Retrieval and transparent feedback
Objective responses SHALL be checked locally, with rationale and answer shown after submission. Transcript assistance and skips MUST be recorded and excluded from unassisted accuracy. Open responses MUST be labeled ungraded. Mixed review SHALL draw from multiple studied lessons when available.

#### Scenario: Listening accessibility
- GIVEN an optional listening activity
- WHEN the learner reveals text or skips audio
- THEN progress remains possible and the activity is marked assisted or skipped.

### Requirement: Recommendations and persistence
The app SHALL schedule delayed review with documented heuristics, prefer due lessons, retain drafts and outcomes locally, and include learning state in export/delete. Activity counts MUST NOT be represented as proficiency.

#### Scenario: Incorrect retrieval
- GIVEN a run with an incorrect objective answer
- WHEN the run completes
- THEN the lesson is due again after one day and the dashboard displays its review status.

### Requirement: Media and learner control
Every lesson SHALL include original audio with transcript, playback speed controls and no autoplay. One original video SHALL include captions and a full textual alternative. Weekly goals SHALL be adjustable and use local calendar days without punitive streak loss.

#### Scenario: Existing learner upgrades
- GIVEN v1 data without learning state
- WHEN the learning view is opened
- THEN a default learning state is used and existing sessions and reviews are preserved.
