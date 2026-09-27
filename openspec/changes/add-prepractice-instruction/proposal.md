# Add instruction before practice

## Why

The current practice path asks learners to answer true/false and multiple-choice questions before explaining the language concept. Immediate post-answer explanations support feedback, but they do not teach a new concept before its first check. The product needs an explicit teaching step before practice, with more than one way to receive the explanation.

## Scope

- Start each new lesson with a stated learning objective, a short explanation and a worked English example before its first scored-as-correct/incorrect practice check.
- Localize lesson explanations and activity directions in English and Brazilian Portuguese while keeping English target-language examples.
- Support concise written explanations as the complete baseline, with optional authored audio narration and short video demonstrations when they serve the learning objective.
- Add an audio-comprehension activity in which the learner listens to an English clip and completes a missing word or phrase; show the transcript and answer-specific explanation after submission.
- Require captions or transcripts and keyboard-operable playback for audio/video; provide a text fallback and never autoplay media.
- Keep content local-first, ungraded beyond individual practice feedback, and separate from any provider submission.
- Define an optional, local-first media-authoring workflow that may use VoiceStudio to produce draft narration, dubbed audio or transcripts. Only human-reviewed, licensed, accessible, optimized assets are included in the static site; VoiceStudio itself is not integrated into the learner-facing runtime.

## Out of scope

- Audiometry, hearing assessment, pronunciation scoring, CEFR placement or proficiency claims.
- Integrating, hosting, exposing or requiring VoiceStudio's desktop app, local API, MCP server, remote workers or model runtime for learners.
- Generating lesson curriculum autonomously or publishing unreviewed synthetic media.
- Requiring audio or video in every lesson; media is optional and must match the stated objective.
- Recording or uploading a learner's voice for listening exercises.
- User accounts, cloud media services, external learner analytics, or live human tutoring.

## Acceptance

- A new lesson presents its objective, explanation and worked example before its first exercise.
- The learner can read the explanation without playing media.
- When audio/video is provided, the learner has playback controls and equivalent text access; media does not autoplay.
- A listening-comprehension exercise requires a response before revealing the transcript, then presents the expected answer and explanation.
- English and PT-BR interfaces localize instructional explanations and directions.
- Lesson answers remain in browser storage unless a separate existing AI-consent action is explicitly offered and accepted.
- The feature makes no proficiency, hearing, pronunciation or learning-outcome claim.
- Media generation is an offline authoring step; the learner-facing site makes no runtime request to VoiceStudio or a media-generation provider.
- Every included media asset has a human-reviewed transcript/caption and recorded source, rights/license and generation provenance sufficient for future maintenance.
