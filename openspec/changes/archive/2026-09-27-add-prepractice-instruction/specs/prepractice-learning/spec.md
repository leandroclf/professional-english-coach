# prepractice-learning Specification

## Requirements

### Requirement: Explain new material before the first practice check
Every new lesson MUST state its learning objective and show a concise explanation and worked English example before the first true/false or multiple-choice check.

#### Scenario: Learner starts a new lesson
- **GIVEN** a learner begins a new lesson
- **WHEN** the lesson opens
- **THEN** its objective, explanation and worked example appear before the first practice question
- **AND** the explanation introduces the target pattern rather than revealing an answer to the upcoming question

#### Scenario: Learner chooses written instruction
- **GIVEN** the lesson includes optional audio or video
- **WHEN** the learner does not play that media or the browser cannot play it
- **THEN** the core explanation and worked example remain available as text
- **AND** the learner can proceed through the lesson

### Requirement: Select modalities based on the learning objective
Lessons MUST use written instruction as a complete baseline and MAY include optional authored audio narration or video demonstration when the medium supports the stated objective. Audio and video MUST NOT autoplay and MUST provide equivalent text access.

#### Scenario: Lesson provides audio or video
- **GIVEN** an authored lesson includes audio or video
- **WHEN** the learner opens the lesson
- **THEN** playback is initiated only by the learner
- **AND** controls are keyboard-operable
- **AND** audio has a transcript and video has captions or a transcript
- **AND** the source and license of externally sourced media are recorded

### Requirement: Keep media authoring separate from the learner runtime
The lesson experience MUST use version-controlled static media assets and MUST NOT require VoiceStudio or call its desktop app, local API, MCP server, remote workers or model runtime. VoiceStudio MAY be used as an optional local authoring tool. Every included asset MUST have documented provenance and text alternative, with independent review status clearly recorded. For this personal/family project, the owner MAY explicitly authorize use without human or rights review; this authorization MUST NOT be represented as legal clearance.

#### Scenario: Owner authorizes a generated narration without review
- **GIVEN** an author uses VoiceStudio or another tool to draft lesson audio
- **WHEN** the asset is prepared for a lesson
- **THEN** the asset has a transcript, source/generation provenance and explicit authorization metadata
- **AND** unreviewed pronunciation and rights status are stated as unreviewed
- **AND** the learner-facing site consumes only the static asset with owner authorization

#### Scenario: VoiceStudio is unavailable
- **GIVEN** a learner opens a lesson
- **WHEN** VoiceStudio is not installed or running
- **THEN** all lesson and media playback features included in the site continue to work

#### Scenario: Owner has not authorized an asset
- **GIVEN** an asset's source, voice permission, model terms or redistribution rights are unclear
- **WHEN** the lesson package is reviewed
- **THEN** that asset remains excluded until its owner authorization is recorded
- **AND** recorded authorization does not imply that rights were independently verified

#### Scenario: Future online voice service is proposed
- **GIVEN** a future change proposes calling a VoiceStudio API/MCP service or processing learner audio remotely
- **WHEN** that change is designed
- **THEN** it receives a separate architecture, authentication, security, privacy, consent and cost review
- **AND** this static-media proposal does not expose the local authoring service to learners

### Requirement: Practice listening comprehension without recording the learner
A lesson MAY provide an audio-comprehension cloze task when listening comprehension is part of its stated objective. The task MUST let the learner replay the authored clip, submit a missing word or phrase before seeing its transcript, and receive the expected answer and a concise explanation afterward. It MUST NOT record or transmit learner audio.

#### Scenario: Learner completes an audio cloze
- **GIVEN** the lesson includes a listening-comprehension objective and an audio cloze
- **WHEN** the learner listens and submits a missing word or phrase
- **THEN** the app reveals the transcript and expected answer after submission
- **AND** provides a concise explanation related to the lesson objective
- **AND** does not produce a proficiency, hearing or pronunciation score

#### Scenario: Learner cannot or does not use audio
- **GIVEN** the lesson includes an audio cloze
- **WHEN** audio playback is unavailable or the learner skips optional media
- **THEN** a written equivalent is available or the learner can continue without the audio activity

### Requirement: Localize instructional directions and protect learner content
Lesson explanations and activity directions MUST be available in English and Brazilian Portuguese. English examples and audio remain target-language material. Lesson responses MUST remain in local browser storage and MUST NOT be sent to a provider without the existing separate, explicit AI consent.

#### Scenario: Learner uses the Portuguese interface
- **GIVEN** the learner selects Brazilian Portuguese
- **WHEN** an instructional lesson or activity is presented
- **THEN** its explanation and directions use Brazilian Portuguese
- **AND** target-language examples and listening content remain in English

#### Scenario: Learner completes an instruction activity
- **GIVEN** a learner submits an answer to an instruction-linked exercise
- **WHEN** it is saved
- **THEN** it remains local
- **AND** no AI-provider transmission occurs unless the learner separately opts in at the existing AI-feedback stage
