# Proposed family platform requirements

## ADDED Requirements

### Requirement: Isolated family learning
A future implementation SHALL keep each learner's sessions, drafts, reviews and goals separate and SHALL preserve existing data during migration.

#### Scenario: Switching learner
- GIVEN two local learner profiles
- WHEN the user switches profiles
- THEN only the selected profile's learning data is shown.

### Requirement: Honest service availability
Future AI, pronunciation and human-interaction capabilities MUST report availability accurately and MUST obtain product-level consent before sending learner content to a provider or participant.

#### Scenario: Provider unavailable
- GIVEN no configured AI backend
- WHEN the learner opens conversation practice
- THEN local scripted practice remains available and live AI is marked unavailable.
