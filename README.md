# Professional English Coach

A text-first practice space for advanced English in backend engineering, architecture reviews, technical leadership and presentations. The goal is to practice formulating and defending ideas before seeing the next prompt.

## Run locally

Requires Python 3 for the static server and Node.js 20+ for tests. No install or API key is required.

```bash
npm run dev
# open http://localhost:4173

npm run check
```

The web app uses browser-native JavaScript modules and stores data in your browser's `localStorage`. No account, server or automatic language assessment exists. The optional Google Fonts CSS request can be removed for a fully offline presentation; fallback system fonts are configured.

## Current experience

- Conversation, technical leadership and presentation tracks, each with sequential prompts and reflection.
- Unfinished session recovery, completed session history and manual review of responses.
- Manually captured expressions with reveal-first retrieval practice and 1/3/7/14/30-day scheduling.
- JSON export and confirmed deletion of all local data.

This release practices written formulation of spoken scenarios. It does **not** assess pronunciation, oral fluency, grammar, CEFR level or learning outcomes. Authored prompts do not adapt to an answer. Use corrections from a qualified source or your own verified notes before adding them to the review deck.

## Specification-driven workflow

The project follows [OpenSpec](https://openspec.dev/docs/setup): `openspec/config.yaml` holds context; `openspec/changes/establish-text-practice-mvp/` contains proposal, design, testable delta specs and task list. The first change stays active pending browser acceptance checks. Future changes for AI feedback and voice practice have separate proposals. When a change passes acceptance, verify it, sync its requirements into `openspec/specs/`, then archive it. Avoid describing a proposal as shipped functionality.

## Project map

| Path | Responsibility |
|---|---|
| `src/data.js` | Practice scenarios and reusable expressions |
| `src/engine.js` | Pure state transitions and review scheduling |
| `src/app.js` | Browser UI and actions |
| `tests/` | Session, review and persistence behavior |
| `docs/research.md` | Research rationale and limits |
| `docs/roadmap.md` | Prioritized implementation stages and release gates |
| `openspec/changes/` | Current and proposed behavior changes |

## Privacy and limitations

All practice content remains in the browser profile on this device. Browser data can be cleared; use Export data regularly if you need a backup. The JSON export contains the complete practice history and should be handled accordingly. There is no synchronization between devices. The app does not collect analytics.

## Contributing

For a change, add or update an OpenSpec proposal, delta requirements with scenarios, design decisions and tasks; implement it and run `npm run check`. Add focused tests for behavioral changes. Do not add automated quality claims without an evaluation plan and validation evidence.
