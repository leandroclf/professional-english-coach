# Acceptance report

## Automated verification

- `npm run check`: all 35 tests pass, including lesson snapshots, legacy-session continuity, exercise ordering, enabled audio across all three tracks, cloze answer feedback/transcript reveal, optional skip, Portuguese localization, AI-consent behavior, persistence and HTTP handling.
- `npm run build`: static output succeeds and includes the audio asset at `dist/src/assets/audio/tradeoff-phrase.mp3`.
- `git diff --check`: passes.
- The Colab notebook is valid nbformat JSON and every Python code cell compiles. It is an optional inspection tool and was not run in a signed-in Colab session.
- OpenSpec requirements were manually checked, synced into `openspec/specs/`, and all implemented changes archived. Strict CLI validation was unavailable because the CLI is not installed.

## Known limits accepted for this personal/family release

- The 4.36-second mono MP3 (26,463 bytes, 22.05 kHz) was generated locally with FFmpeg/libflite and is included in the current static Site build. Owner authorization enables use and public hosting. Pronunciation and voice/output rights were not independently reviewed; authorization is not legal clearance.
- No manual browser, keyboard, screen reader or mobile acceptance was performed. The owner asked to remove manual checks as release gates; the app uses native browser media controls, includes a transcript, and lets learners skip the activity.
- One nine-second original instructional video with English captions and a complete textual alternative is included. The Colab notebook is optional.
- No `OPENAI_API_KEY` or `OPENAI_MODEL` was available. AI behavior was exercised with a mock Responses API, not a billable live request. Generated coaching remains opt-in and unverified.
- No representative-learning study was run. The app makes no proficiency or learning-effectiveness claims.

## Optional future checks

These can be performed during personal use and do not block this release: test on the family's target mobile browsers, check speech recognition permissions and accuracy, inspect screen-reader behavior, and try a configured live AI response if credentials and cost budget are available.

## Evidence-informed learning path verification

- Eight lessons × eight activities in Applied mode; default Recognition mode has two closed questions. Guided mode has five.
- Added tests cover every lesson, explicit feedback transitions, invalid and duplicate submissions, legacy data preservation, storage/export, help/skip exclusions, ungraded writing, same-day spacing protection, error reset, mixed retrieval and local weekly goals.
- Both English and PT-BR render paths checked at component level; this does not constitute browser or screen-reader acceptance.
- Eight original MP3s and one MP4/VTT pair are generated and packaged. FFprobe reports a nine-second video, 59,636 bytes. Build checks require every referenced asset and transcript.
- Research source verification corrected two prior author attributions. Competitor claims are first-party feature descriptions, not independent effectiveness evidence.
- Remaining service-dependent and platform work is proposed in `expand-family-learning-platform`; no claim that all conceivable features are implemented.
