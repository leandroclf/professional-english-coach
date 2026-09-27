# Implementation tasks

- [ ] Review research on pretesting versus instruction, multimedia learning, captions and listening-comprehension tasks; document limits and design rationale.
- [ ] Define the authored learning-unit content shape, localization workflow, media attribution and static-asset budget.
- [ ] Define a media asset manifest covering asset path, language, duration, transcript/caption, source, rights/license, attribution, generation tool/model provenance and human review status.
- [ ] Document an optional local VoiceStudio authoring workflow, including pronunciation/script review, voice/model/source rights review, and a rule against runtime API/MCP exposure or committing credentials/private recordings.
- [ ] Author a small pilot set of lesson objectives, concise explanations and worked English examples for the existing tracks.
- [ ] Add text instruction before the first practice check in new sessions.
- [ ] Add optional, accessible audio narration and/or short video only where it supports the objective; include transcripts/captions, learner-controlled playback and no autoplay.
- [ ] Add a short replayable audio-cloze exercise with transcript reveal and answer-specific explanation, plus a written path when audio is unavailable or skipped.
- [ ] Produce and human-review a small audio pilot using VoiceStudio or another authorized tool; validate English pronunciation, transcript accuracy, voice consent, model/source licenses, supported browser playback and static bundle impact before including assets.
- [ ] Record that VoiceStudio remains optional authoring infrastructure; exclude its desktop application, API, MCP server, remote workers and model runtime from the learner-facing site.
- [ ] Localize instructional explanations and directions in English and PT-BR.
- [ ] Preserve saved active-session plans, local-only storage and separate AI-consent boundaries.
- [ ] Add automated coverage for ordering, cloze reveal, localization, compatibility and no provider submission.
- [ ] Run project checks, inspect static output and review media licensing, accessibility and bundle size.
- [ ] Review whether AGPL obligations apply before copying or adapting VoiceStudio code; independently verify model and generated-asset terms before redistribution.
- [ ] Complete browser keyboard, captions/transcript, mobile and playback acceptance before marking the change shipped.
- [ ] Evaluate usability with representative learners; defer efficacy claims until a suitable outcome evaluation is completed.
- [ ] Sync accepted requirements into `openspec/specs/` and archive this change after release validation.
