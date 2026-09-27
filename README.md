Warning: truncated output (original token count: 1618)
Total output lines: 71

# Professional English Coach

![CI](https://github.com/leandroclf/professional-english-coach/actions/workflows/ci.yml/badge.svg)

A text-first practice space for advanced English in backend engineering, architecture reviews, technical leadership and presentations. The goal is to practice formulating and defending ideas before seeing the next prompt.

New sessions begin with a short bilingual learning objective, explanation and English worked example before true/false and multiple-choice practice. An optional replayable audio-cloze uses a locally generated English sample with an in-app transcript. The owner authorized personal/family use and accepted public hosting; pronunciation and tool/voice output rights were not independently reviewed. Learner responses continue to stay local unless the learner separately opts into the existing AI text feedback.

## Learning path / Trilha de aprendizagem

Open **Learning path / Trilha de aprendizagem** for eight new bilingual micro-lessons with original audio. The default Recognition mode ends after true/false and multiple choice. Guided mode adds sentence ordering, optional listening completion and one sentence; Applied mode adds real-life transfer, scripted dialogue and rewriting. The first lesson also includes a captioned instructional video.

The local planner suggests due lessons, then new topics. Feedback, assistance tracking, confidence reflection, weekly goals, mixed retrieval and searchable lessons are available without an API key. Answers and drafts persist locally and are included in History → Export data / Delete all data. Open responses are ungraded; activity counts are not proficiency scores. The scripted dialogue is not AI.

Research and implementation decisions: [competitive analysis (Portuguese)](docs/competitive-analysis.md), [academic rationale](docs/research.md), [current learning-path spec](openspec/specs/learning-path/spec.md). Broader suggestions and dependencies are explicitly tracked as future work.

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

The Sites deployment serves the static practice app over HTTPS. Practice sessions, history, review items, interface language and unfinished response drafts remain in the learner's browser storage. Browser speech features depend on browser support. The local Node server's optional AI feedback endpoint is not included in the static hosted build, so the hosted interface reports AI feedback as unavailable. Current requirements in `openspec/specs/` describe the implemented text practice, progressive exercises, pre-practice lessons and audio, AI feedback, voice input, and English/PT-BR localization. Browser-specific checks and human-rated AI-quality evaluation are deferred product-quality work; they are not represented as completed evaluations or learning evidence.

## Project map

| Path | Responsibility |
|---|---|
| `src/data.js` | Practice scenarios and reusable expressions |
| `src/curriculum.js` | Eight original bilingual lessons and progressive exercise definitions |
| `src/learning-engine.js` | Learning runs, recommendations, goals and review scheduling |
| `src/learning-view.js` | Learning library, lesson UI and history |
| `src/engine.js` | Pure state transitions and review scheduling |
| `src/app.js` | Browser UI and actions |
| `src/i18n.js` | Interface language selection and localized copy |
| `src/media-assets.js` | Static lesson media metadata and owner authorization |
| `src/coach.js` | Response schema, input shaping and provider request |
| `server.js` | Local-only static server and optional feedback endpoint |
| `scripts/build-static.mjs` | Static asset build for Sites hosting |
| `tests/` | Session, review and persistence behavior |
| `docs/research.md` | Research rationale and limits |
| `docs/roadmap.md` | Prioritized implementation stages and release gates |
| `docs/acceptance.md` | Completed automated checks and remaining manual acceptance |
| `content/media-candidates/` | Authored audio script and media provenance manifest |
| `notebooks/lesson_media_review.ipynb` | Optional Colab-compatible inspection notebook for authored audio |
| `openspec/changes/` | Current and proposed behavior changes |

## Privacy and limitations

All practice content remains in the browser profile on this device. Browser data can be cleared; use Export data regularly if you need a backup. The JSON export contains the complete practice history and should be handled accordingly. There is no synchronization between devices. The app does not collect analytics.

## Contributing

For a change, add or update an OpenSpec proposal, delta requirements with scenarios, design decisions and tasks; implement it and run `npm run check`. Add focused tests for behavioral changes. Do not add automated quality claims without an evaluation plan and validation evidence. The Web Speech API has uneven browser support, especially for recognition; test the target browsers before relying on voice features.
