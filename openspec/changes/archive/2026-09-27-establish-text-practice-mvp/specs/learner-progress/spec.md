## ADDED Requirements

### Requirement: Manual expression review
The application MUST let the learner save an original and improved expression and schedule review; the improved expression MUST be hidden until the learner chooses to reveal it.

#### Scenario: Successful retrieval
- GIVEN a due expression and a learner who reveals it
- WHEN the learner marks it recalled
- THEN its next review is scheduled later than a retry would be

#### Scenario: Retry
- GIVEN a due expression
- WHEN the learner marks it for more practice
- THEN its review interval resets to one day

### Requirement: Data control
The application MUST provide an export of the versioned learner data and an explicit confirmation before deleting all local learner data.

#### Scenario: Export
- GIVEN saved sessions and expressions
- WHEN the learner chooses export
- THEN a JSON file with both collections is downloaded
