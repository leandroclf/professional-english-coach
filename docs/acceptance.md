# Acceptance report

## Automated checks completed

- `npm run check`: 20 tests pass, including the true/false → multiple-choice → guided sentence → open response progression, legacy-session continuity, ungraded learner-generated output, AI follow-up conversation, session persistence, response-draft recovery, Portuguese localization, review scheduling, provider handling and HTTP behavior.
- `npm run build`: static output is generated successfully; a build scan confirms no Google Fonts references remain.
- Local server smoke check: `/` returns `200`, `/api/status` reports feedback unavailable when credentials are absent, and `/.env.example` returns `403`.
- OpenSpec CLI strict validation previously passed for the 3 pre-existing changes (`add-ai-feedback`, `add-voice-practice`, `establish-text-practice-mvp`); OpenSpec Doctor reported a valid root.
- The localization and progressive-exercise changes include proposals, designs, delta specs and tasks. Strict CLI validation could not be run because the OpenSpec CLI is not installed in this environment; artifacts were reviewed manually.
- The 3 pre-existing changes still have manual acceptance or research quality tasks open, listed below.
- GitHub Actions CI on `main`: successful for commit `25969178f2201aee91c73ece7848651e045cb471`.

## Checks still requiring a browser or personal credentials

- Visual layout, keyboard-only interaction, microphone permission flow and real speech-recognition behavior were not manually tested. Playwright was present, but downloading Chromium returned an empty/corrupt archive, so there is no browser executable in this environment.
- No `OPENAI_API_KEY` or `OPENAI_MODEL` was available. Provider behavior was tested with a mock Responses API, not a billable live request.
- Correction quality and the learner's accent/domain transcription quality need a human-rated sample. The current self-ratings and generated suggestions do not establish learning gains or proficiency.

## Manual acceptance checklist

1. Configure `OPENAI_API_KEY` and a supported `OPENAI_MODEL` in a local `.env`; start with `npm run dev`.
2. Complete each track, confirm the true/false and multiple-choice checks, then the one-sentence frame and open responses; reload during an unfinished session to confirm answers and the original stage order remain.
3. Open with a Portuguese browser locale, switch to English and back, reload, and confirm the choice persists while practice prompts remain in English.
4. After all authored prompts, opt in to the AI exchange; confirm its follow-up becomes one final conversation turn. Submit without opting in and confirm the session moves to reflection and the response remains local.
5. Test speech recognition in the target desktop and mobile browsers, including denial of microphone permission and recognition failure. Confirm typed input still works and the transcript is editable.
6. Test keyboard navigation, screen reader labels, narrow viewport layout, JSON export contents and confirmed data deletion.
