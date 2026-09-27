# Localize the interface and strengthen practice recovery

## Why

The published interface is English-only even though its intended learner is Brazilian. The current practice editor also loses an unsent response on reload, and the static hosted version can describe its unavailable AI endpoint as a server configuration problem. Small text and a remote font dependency reduce readability and add an unnecessary third-party request.

## Scope

- Add English and Brazilian Portuguese interface languages, with a persistent, accessible language switch.
- Keep practice prompts, learner responses, reusable English expressions and AI coaching content in English.
- Save and restore an in-progress response locally, clearing the draft after submit or discard.
- State accurately when AI feedback is unavailable in the hosted static build.
- Remove the remote font dependency and improve keyboard access and text readability.

## Out of scope

- Translating authored exercises, learner content or AI-generated coaching.
- Accounts, cross-device sync, analytics, or hosted learner storage.
- Enabling a paid AI API or changing the current private Site access policy.

## Acceptance

- A Portuguese browser gets PT-BR by default unless a saved choice exists; the user can switch either way without losing a practice session.
- The main interface and operational copy are available in PT-BR, while each practice challenge remains in English.
- An unfinished typed response survives reload and is removed after it is submitted or its session is discarded.
- A static Site reports AI feedback unavailable in this hosted version; a local server without credentials reports that the service is not configured.
- Automated checks and OpenSpec validation pass. Manual browser and assistive-technology checks remain recorded if this environment cannot perform them.
