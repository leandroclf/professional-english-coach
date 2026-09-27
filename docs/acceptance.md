# Acceptance report

## Automated verification

- `npm run check`: all 25 tests pass, including lesson snapshots, legacy-session continuity, exercise ordering, enabled audio across all three tracks, cloze answer feedback/transcript reveal, optional skip, Portuguese localization, AI-consent behavior, persistence and HTTP handling.
- `npm run build`: static output succeeds and includes the audio asset at `dist/src/assets/audio/tradeoff-phrase.mp3`.
- `git diff --check`: passes.
- The Colab notebook is valid nbformat JSON and every Python code cell compiles. It is an optional inspection tool and was not run in a signed-in Colab session.
- OpenSpec requirements were manually checked, synced into `openspec/specs/`, and all implemented changes archived. Strict CLI validation was unavailable because the CLI is not installed.

## Known limits accepted for this personal/family release

- The 4.36-second mono MP3 (26,463 bytes, 22.05 kHz) was generated locally with FFmpeg/libflite and is included in the current static Site build. Owner authorization enables use and public hosting. Pronunciation and voice/output rights were not independently reviewed; authorization is not legal clearance.
- No manual browser, keyboard, screen reader or mobile acceptance was performed. The owner asked to remove manual checks as release gates; the app uses native browser media controls, includes a transcript, and lets learners skip the activity.
- No video clip was authored. The Colab notebook is optional.
- No `OPENAI_API_KEY` or `OPENAI_MODEL` was available. AI behavior was exercised with a mock Responses API, not a billable live request. Generated coaching remains opt-in and unverified.
- No representative-learning study was run. The app makes no proficiency or learning-effectiveness claims.

## Optional future checks

These can be performed during personal use and do not block this release: test on the family's target mobile browsers, check speech recognition permissions and accuracy, inspect screen-reader behavior, and try a configured live AI response if credentials and cost budget are available.
