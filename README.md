# Professional English Coach

![CI](https://github.com/leandroclf/professional-english-coach/actions/workflows/ci.yml/badge.svg)

A text-first practice space for advanced English in backend engineering, architecture reviews, technical leadership and presentations. The goal is to practice formulating and defending ideas before seeing the next prompt.

## Run locally

Requires Node.js 20+. No package installation is required. The practice app works without an AI API key; speech recognition depends on browser support.

```bash
npm run dev
# open http://localhost:4173

npm run check
```

The web app uses browser-native JavaScript modules and stores learner data in your browser's `localStorage`. The interface is available in English and Brazilian Portuguese; practice prompts, learner responses and coaching suggestions remain in English. The language choice and unfinished response draft are also stored locally. There is no account or external learner-data persistence. The interface uses system fonts and makes no web-font request.

The local Node server keeps provider credentials out of the browser. To enable optional AI feedback, copy `.env.example` to `.env` and set `OPENAI_API_KEY` and `OPENAI_MODEL` to a supported model in your OpenAI API account. API use is billed separately from a ChatGPT subscription. After the learner opts in for a response, the app sends its prompt, response and up to three recent responses to the configured provider. The `.env` file is ignored by Git. The server binds to `127.0.0.1` by default and does not log learner text. Never commit credentials.

## Hosted version

The private Sites deployment serves the static practice app over HTTPS. Practice sessions, history, review items, interface language and unfinished response drafts remain in the learner's browser storage. Browser speech features depend on browser support. The local Node server's optional AI feedback endpoint is not included in the static hosted build, so the hosted interface reports AI feedback as unavailable.

## Current experience

- Conversation, technical leadership and presentation tracks, each with sequential prompts and reflection.
- Gradual practice in each track: true/false, multiple choice, a one-sentence guided response, then open-ended professional responses.
- Immediate explanations for the two recognition checks; the guided sentence is ungraded and all activities are practice, not a proficiency score.
- Optional text exchange with the AI coach after the authored exercises, when the configured local service is available and the learner opts in.
- Unfinished session recovery, completed session history and manual review of responses.
- Manually captured expressions with reveal-first retrieval practice and 1/3/7/14/30-day scheduling.
- Learner-approved correction pairs, grouped into a local error log with repeat counts.
- Optional browser dictation with an editable transcript and text-to-speech prompt playback where the browser supports it.
- Per-response consent-based AI feedback via the OpenAI Responses API, with a strict structured response and a server-side key.
- Learner self-reflection ratings for fluency, precision, professional vocabulary and argumentation.
- JSON export and confirmed deletion of all local data.
- English and Brazilian Portuguese interface localization, independent from English practice content.
- Local recovery of an unfinished response draft after a page reload.

This release supports spoken dictation and listening, but it does **not** assess pronunciation, oral fluency, CEFR level or learning outcomes. Speech recognition is browser dependent and may use a browser-managed service; this app stores only the transcript. Always review it before submission. AI feedback is a suggestion, not a verified correction. After all authored exercises, an enabled local server can provide a text response and one follow-up exchange with separate consent at each submission; this is not a continuous conversation. Otherwise, the session moves to reflection. The self-ratings are reflective notes, not proficiency scores. Validate corrections before adding them to the review deck. Human-led conversation practice is a possible future stage and is not available in this release.

## Specification-driven workflow

The project follows [OpenSpec](https://openspec.dev/docs/setup): `openspec/config.yaml` holds context; `openspec/changes/` contains the proposals, designs, testable delta specs and task lists for the practice MVP, progressive exercises, AI feedback, voice practice, and English/PT-BR localization with draft recovery. Some changes remain active pending manual browser or human-rated evaluation. When a change passes its acceptance gates, verify it, sync its requirements into `openspec/specs/`, then archive it. Avoid describing a proposal as shipped functionality.

## Project map

| Path | Responsibility |
|---|---|
| `src/data.js` | Practice scenarios and reusable expressions |
| `src/engine.js` | Pure state transitions and review scheduling |
| `src/app.js` | Browser UI and actions |
| `src/i18n.js` | Interface language selection and localized copy |
| `src/coach.js` | Response schema, input shaping and provider request |
| `server.js` | Local-only static server and optional feedback endpoint |
| `scripts/build-static.mjs` | Static asset build for Sites hosting |
| `tests/` | Session, review and persistence behavior |
| `docs/research.md` | Research rationale and limits |
| `docs/roadmap.md` | Prioritized implementation stages and release gates |
| `docs/acceptance.md` | Completed automated checks and remaining manual acceptance |
| `openspec/changes/` | Current and proposed behavior changes |

## Privacy and limitations

All practice content remains in the browser profile on this device. Browser data can be cleared; use Export data regularly if you need a backup. The JSON export contains the complete practice history and should be handled accordingly. There is no synchronization between devices. The app does not collect analytics.

## Contributing

For a change, add or update an OpenSpec proposal, delta requirements with scenarios, design decisions and tasks; implement it and run `npm run check`. Add focused tests for behavioral changes. Do not add automated quality claims without an evaluation plan and validation evidence. The Web Speech API has uneven browser support, especially for recognition; test the target browsers before relying on voice features.
