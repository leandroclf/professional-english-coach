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

The web app uses browser-native JavaScript modules and stores learner data in your browser's `localStorage`. There is no account or external persistence. A local server provides the optional feedback endpoint; no automated language assessment or scoring is included. The optional Google Fonts CSS request can be removed for a fully offline presentation; fallback system fonts are configured.

The local Node server keeps provider credentials out of the browser. To enable optional AI feedback, copy `.env.example` to `.env` and set `OPENAI_API_KEY` and `OPENAI_MODEL` to a supported model in your OpenAI API account. API use is billed separately from a ChatGPT subscription. The app sends a response to the configured provider only after the learner opts in on that response. The `.env` file is ignored by Git. The server binds to `127.0.0.1` by default and does not log learner text. Never commit credentials.

## Current experience

- Conversation, technical leadership and presentation tracks, each with sequential prompts and reflection.
- Unfinished session recovery, completed session history and manual review of responses.
- Manually captured expressions with reveal-first retrieval practice and 1/3/7/14/30-day scheduling.
- Learner-approved correction pairs, grouped into a local error log with repeat counts.
- Optional browser dictation with an editable transcript and text-to-speech prompt playback where the browser supports it.
- Per-response consent-based AI feedback via the OpenAI Responses API, with a strict structured response and a server-side key.
- Learner self-reflection ratings for fluency, precision, professional vocabulary and argumentation.
- JSON export and confirmed deletion of all local data.

This release supports spoken dictation and listening, but it does **not** assess pronunciation, oral fluency, CEFR level or learning outcomes. Speech recognition is browser dependent; always review the transcript. AI feedback is a suggestion, not a verified correction. When enabled, its follow-up question becomes the next prompt; otherwise the authored challenge is used. The self-ratings are reflective notes, not proficiency scores. Validate corrections before adding them to the review deck.

## Specification-driven workflow

The project follows [OpenSpec](https://openspec.dev/docs/setup): `openspec/config.yaml` holds context; `openspec/changes/establish-text-practice-mvp/` contains proposal, design, testable delta specs and task list. The first change stays active pending browser acceptance checks. Future changes for AI feedback and voice practice have separate proposals. When a change passes acceptance, verify it, sync its requirements into `openspec/specs/`, then archive it. Avoid describing a proposal as shipped functionality.

## Project map

| Path | Responsibility |
|---|---|
| `src/data.js` | Practice scenarios and reusable expressions |
| `src/engine.js` | Pure state transitions and review scheduling |
| `src/app.js` | Browser UI and actions |
| `src/coach.js` | Response schema, input shaping and provider request |
| `server.js` | Local-only static server and optional feedback endpoint |
| `tests/` | Session, review and persistence behavior |
| `docs/research.md` | Research rationale and limits |
| `docs/roadmap.md` | Prioritized implementation stages and release gates |
| `docs/acceptance.md` | Completed automated checks and remaining manual acceptance |
| `openspec/changes/` | Current and proposed behavior changes |

## Privacy and limitations

All practice content remains in the browser profile on this device. Browser data can be cleared; use Export data regularly if you need a backup. The JSON export contains the complete practice history and should be handled accordingly. There is no synchronization between devices. The app does not collect analytics.

## Contributing

For a change, add or update an OpenSpec proposal, delta requirements with scenarios, design decisions and tasks; implement it and run `npm run check`. Add focused tests for behavioral changes. Do not add automated quality claims without an evaluation plan and validation evidence. The Web Speech API has uneven browser support, especially for recognition; test the target browsers before relying on voice features.
