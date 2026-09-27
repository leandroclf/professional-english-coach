# Acceptance report

## Automated checks completed

- Current working change: `npm run check` passes 25 tests, including bilingual pre-practice lesson plans, preservation of legacy sessions, media approval gating, cloze answer normalization/transcript reveal, optional skip behavior and media MIME types. Re-run after the final edits before release.
- The FFmpeg/libflite pilot generator produced a 4.36-second mono MP3 (26,463 bytes, 22.05 kHz). The MP3 is Git-ignored, not included in `dist`, and its human pronunciation/transcript and redistribution checks remain pending. The Colab review notebook is syntactically valid but has not been run in a signed-in Colab session.
- `npm run check`: 20 tests pass, including the true/false → multiple-choice → guided sentence → open response progression, legacy-session continuity, ungraded learner-generated output, AI follow-up conversation, session persistence, response-draft recovery, Portuguese localization, review scheduling, provider handling and HTTP behavior.
- `npm run build`: static output is generated successfully; a build scan confirms no Google Fonts references remain.
- Local server smoke check: `/` returns `200`, `/api/status` reports feedback unavailable when credentials are absent, and `/.env.example` returns `403`.
- OpenSpec CLI strict validation previously passed for the 3 pre-existing changes (`add-ai-feedback`, `add-voice-practice`, `establish-text-practice-mvp`); OpenSpec Doctor reported a valid root.
- The localization and progressive-exercise changes include proposals, designs, delta specs and tasks. Strict CLI validation could not be run because the OpenSpec CLI is not installed in this environment; artifacts were reviewed manually.
- The 3 pre-existing changes still have manual acceptance or research quality tasks open, listed below.
- GitHub Actions CI on `main`: successful for commit `25969178f2201aee91c73ece7848651e045cb471`.

## Checks still requiring a browser or personal credentials

- OpenSpec CLI strict validation is not available in this environment. The current proposal's pending review and release tasks have not been archived.
- Visual layout, keyboard-only interaction, microphone permission flow and real speech-recognition behavior were not manually tested. Playwright was present, but downloading Chromium returned an empty/corrupt archive, so there is no browser executable in this environment.
- The candidate audio needs a human to listen in Colab or another player and confirm the pronunciation, transcript, target-browser playback and redistribution terms before the asset can be added to the static bundle. No video lesson was created because an authored, reviewed clip is not available.
- No `OPENAI_API_KEY` or `OPENAI_MODEL` was available. Provider behavior was tested with a mock Responses API, not a billable live request.
- Correction quality and the learner's accent/domain transcription quality need a human-rated sample. The current self-ratings and generated suggestions do not establish learning gains or proficiency.

## Manual acceptance checklist

1. Configure `OPENAI_API_KEY` and a supported `OPENAI_MODEL` in a local `.env`; start with `npm run dev`.
2. Complete each track, read the objective/explanation/worked example, then confirm true/false and multiple-choice checks, one-sentence frame and open responses; reload during an unfinished session to confirm answers and its saved stage order remain.
3. Open with a Portuguese browser locale, switch to English and back, reload, and confirm the choice persists while practice prompts remain in English.
4. After all authored prompts, opt in to the AI exchange; confirm its follow-up becomes one final conversation turn. Submit without opting in and confirm the session moves to reflection and the response remains local.
5. Test speech recognition in the target desktop and mobile browsers, including denial of microphone permission and recognition failure. Confirm typed input still works and the transcript is editable.
6. Test keyboard navigation, screen reader labels, narrow viewport layout, JSON export contents and confirmed data deletion.
7. After the media reviewer and rights checks are approved, mark the asset approved, add its file under `src/assets/audio/`, rebuild, and test native audio controls, replay, skip, hidden-before-submit transcript and post-submit transcript on desktop/mobile browsers. Do not approve the candidate solely from this automated report.
