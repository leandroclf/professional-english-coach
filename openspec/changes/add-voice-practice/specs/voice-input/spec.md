## ADDED Requirements

### Requirement: Optional speech input
The application MUST offer dictation when the browser supports speech recognition, insert recognized text into an editable response, and retain typed input as a fallback.

#### Scenario: Recognition unavailable
- GIVEN a browser without SpeechRecognition
- WHEN the learner selects dictation
- THEN the app explains the limitation and keeps text entry available

#### Scenario: Review transcript
- GIVEN speech recognition returns a transcript
- WHEN recognition ends
- THEN the transcript remains editable and the learner can correct it before sending

### Requirement: Prompt playback
The application SHOULD read the current prompt aloud when browser speech synthesis is available.

#### Scenario: Adaptive prompt playback
- GIVEN the prior answer produced an AI follow-up
- WHEN the learner requests read-aloud
- THEN the app reads the follow-up currently displayed
