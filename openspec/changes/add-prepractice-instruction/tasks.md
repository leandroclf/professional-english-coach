# Implementation tasks

- [x] Review research on pretesting versus instruction, multimedia learning, captions and listening-comprehension tasks; document limits and design rationale in `docs/research.md`.
- [x] Define the authored learning-unit content shape, localization workflow, media attribution and static-asset budget.
- [x] Define a media asset manifest covering asset path, language, duration, transcript/caption, source, rights/license, attribution, generation tool/model provenance and human review status.
- [x] Document VoiceStudio as an optional local authoring tool, including pronunciation/script review, voice/model/source rights review, a Colab-compatible review workflow, and a rule against runtime API/MCP exposure or committing credentials/private recordings.
- [x] Author concise lesson objectives, explanations and worked English examples for all three tracks.
- [x] Add text instruction before the first practice check in new sessions; save the lesson snapshot with new sessions and preserve legacy plans.
- [x] Implement gated optional audio/video presentation with learner-controlled native playback and transcript/caption support; no unreviewed media is enabled or copied into the static build.
- [x] Implement the replayable audio-cloze stage, answer-specific feedback, transcript reveal after submission and optional skip; keep the stage disabled until its media asset is approved.
- [ ] Have a human review the audio pilot for pronunciation, transcript accuracy, browser playback, voice/model/source rights and redistribution before enabling it in the site.
- [x] Keep VoiceStudio optional authoring infrastructure; exclude its desktop application, API, MCP server, remote workers and model runtime from the learner-facing site.
- [x] Localize instructional explanations and directions in English and PT-BR while keeping target-language examples in English.
- [x] Preserve existing active-session plans, local-only storage and separate AI-consent boundaries.
- [x] Add automated coverage for lesson snapshots, cloze evaluation/transcript reveal, skip behavior, localization, legacy compatibility and media approval gating.
- [x] Run project checks, build the static output, inspect generated files, validate the Colab notebook and verify that the unreviewed candidate is excluded.
- [x] Confirm no VoiceStudio code was copied or adapted. Review the applicable model and generated-asset terms before any redistribution.
- [ ] Complete browser keyboard, captions/transcript, mobile and playback acceptance before marking the change shipped.
- [ ] Evaluate usability with representative learners; defer efficacy claims until a suitable outcome evaluation is completed.
- [ ] Sync accepted requirements into `openspec/specs/` and archive this change after release validation.
