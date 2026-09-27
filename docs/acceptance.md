# Acceptance report

## Automated checks completed

- `npm run check`: 17 tests pass, including session persistence, response-draft recovery, interface localization, adaptive prompts, duplicate error-pattern grouping, retrieval scheduling, AI response parsing, provider failure handling, HTTP status behavior and hidden-file blocking.
- `npm run build`: static output is generated successfully; a build scan confirms no Google Fonts references remain.
- Local server smoke check: `/` returns `200`, `/api/status` reports feedback unavailable when credentials are absent, and `/.env.example` returns `403`.
- OpenSpec CLI strict validation previously passed for the 3 pre-existing changes (`add-ai-feedback`, `add-voice-practice`, `establish-text-practice-mvp`); OpenSpec Doctor reported a valid root.
- The new localization change includes proposal, design, delta specs and tasks. Its strict CLI validation could not be run because the OpenSpec CLI is not installed in this environment; artifacts were reviewed manually.
- The 3 pre-existing changes still have manual acceptance or research quality tasks open, listed below.
- GitHub Actions CI on `main`: successful for commit `25969178f2201aee91c73ece7848651e045cb471`.

## Checks still requiring a browser or personal credentials

- Visual layout, keyboard-only interaction, microphone permission flow and real speech-recognition behavior were not manually tested. Playwright was present, but downloading Chromium returned an empty/corrupt archive, so there is no browser executable in this environment.
- No `OPENAI_API_KEY` or `OPENAI_MODEL` was available. Provider behavior was tested with a mock Responses API, not a billable live request.
- Correction quality and the learner's accent/domain transcription quality need a human-rated sample. The current self-ratings and generated suggestions do not establish learning gains or proficiency.

## Manual acceptance checklist

1. Configure `OPENAI_API_KEY` and a supported `OPENAI_MODEL` in a local `.env`; start with `npm run dev`.
2. Complete each track, reload during an unfinished session, and confirm prior answers remain.
3. Open with a Portuguese browser locale, switch to English and back, reload, and confirm the choice persists while practice prompts remain in English.
4. Opt in to AI feedback for one response; confirm the next prompt uses the returned follow-up. Submit another response without opting in and confirm it remains local.
5. Test speech recognition in the target desktop and mobile browsers, including denial of microphone permission and recognition failure. Confirm typed input still works and the transcript is editable.
6. Test keyboard navigation, screen reader labels, narrow viewport layout, JSON export contents and confirmed data deletion.
