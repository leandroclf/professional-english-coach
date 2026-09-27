# Acceptance report

## Automated checks completed

- `npm run check`: 12 tests pass, including session persistence, adaptive prompts, retrieval scheduling, AI response parsing, provider failure handling, HTTP status behavior and hidden-file blocking.
- Local server smoke check: `/` returns `200`, `/api/status` reports feedback unavailable when credentials are absent, and `/.env.example` returns `403`.
- OpenSpec CLI strict validation: all 3 active changes pass (`add-ai-feedback`, `add-voice-practice`, `establish-text-practice-mvp`); OpenSpec Doctor reports a valid root.
- OpenSpec status: planning artifacts are complete for all 3 changes. Each still has manual acceptance or research quality tasks open, listed below.
- GitHub Actions CI on `main`: successful for commit `25969178f2201aee91c73ece7848651e045cb471`.

## Checks still requiring a browser or personal credentials

- Visual layout, keyboard-only interaction, microphone permission flow and real speech-recognition behavior were not manually tested. Playwright was present, but downloading Chromium returned an empty/corrupt archive, so there is no browser executable in this environment.
- No `OPENAI_API_KEY` or `OPENAI_MODEL` was available. Provider behavior was tested with a mock Responses API, not a billable live request.
- Correction quality and the learner's accent/domain transcription quality need a human-rated sample. The current self-ratings and generated suggestions do not establish learning gains or proficiency.

## Manual acceptance checklist

1. Configure `OPENAI_API_KEY` and a supported `OPENAI_MODEL` in a local `.env`; start with `npm run dev`.
2. Complete each track, reload during an unfinished session, and confirm prior answers remain.
3. Opt in to AI feedback for one response; confirm the next prompt uses the returned follow-up. Submit another response without opting in and confirm it remains local.
4. Test speech recognition in the target desktop and mobile browsers, including denial of microphone permission and recognition failure. Confirm typed input still works and the transcript is editable.
5. Test keyboard navigation, screen reader labels, narrow viewport layout, JSON export/import handling and data deletion.
