# Implementation tasks

- [x] Review pretesting, multimedia-learning, captioning and listening-comprehension evidence; document limits and design rationale in `docs/research.md`.
- [x] Define bilingual lesson content, localized directions, media metadata and static-asset behavior.
- [x] Document optional local media authoring with VoiceStudio/Colab references; keep generation services out of the learner runtime and protect credentials/private recordings.
- [x] Author concise objectives, explanations and worked English examples for all tracks.
- [x] Present instruction before the first practice item; snapshot new lessons and preserve legacy sessions.
- [x] Implement learner-controlled audio/video UI with transcripts/captions and text alternatives.
- [x] Add the locally generated audio sample, record its provenance, transcript and owner authorization, and state plainly that pronunciation/output rights remain unreviewed.
- [x] Implement replayable audio cloze, answer-specific feedback, transcript reveal after submission and optional skip.
- [x] Localize lesson explanations and directions in English and PT-BR; keep target-language content in English.
- [x] Preserve local-only practice storage and existing separate AI consent.
- [x] Add automated coverage for lesson snapshots, cloze evaluation/transcript, skip, localization, legacy compatibility and enabled media.
- [x] Run `npm run check`, build static output, confirm the audio is present, validate notebook JSON, and check diffs.
- [x] Keep VoiceStudio optional and out of the learner-facing runtime; do not copy its code.
- [x] Owner waived human media/legal review and manual browser acceptance as release gates for this personal/family scope. Rights remain unverified; browser-specific issues may be fixed from use and reported feedback.
- [x] Defer representative learner/effectiveness evaluation; make no learning-gain or proficiency claims.
- [x] Sync the accepted requirements to `openspec/specs/` and archive this completed change.
