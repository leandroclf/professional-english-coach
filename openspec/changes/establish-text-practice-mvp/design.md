# Design

## Decisions

1. Browser-native ES modules with no runtime dependency. Run through a static server; `node --test` verifies pure session/review logic. This reduces setup cost for the initial single-user prototype.
2. `localStorage` stores a versioned snapshot. Responses are private to the current browser profile, but browser storage is not encrypted or a durable backup. Export enables portability. No telemetry is sent by the app.
3. The session engine is deterministic: prompts are authored, responses are never scored. Corrections are entered by the learner and explicitly described as unverified.
4. Review intervals start at 1, 3, 7, 14 and 30 days. Recall advances one step; a retry returns to one day. These are product defaults to evaluate, not a research-validated optimum for this learner.

## Trade-offs

- Text practice supports planning and argument structure, but cannot measure spoken fluency, pronunciation or turn taking.
- `localStorage` is simple, but unavailable across devices; quota and deletion by the browser can cause loss. Future account sync requires a separate consent and privacy design.
- Scripted challenge prompts do not respond to the learner's answer. Interactive coaching belongs in a later change with quality evaluations.

## Data shape

`{ version: 1, sessions: Session[], reviews: Review[], active: ActiveSession|null }`. The code rejects unknown versions and malformed top-level collections. Future migrations must preserve or explicitly export prior user data.

## Security and accessibility

User content is escaped before HTML rendering. External links/scripts and server calls are absent; the optional web-font request is cosmetic. Inputs have labels; buttons and disclosures are keyboard accessible. Automated accessibility review remains a later task.
