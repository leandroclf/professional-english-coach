# Design: recognition to guided sentence production

## Sequence

Every new track begins with the existing true/false and multiple-choice practice checks, then presents one short typed sentence using a track-specific frame, then continues to authored open responses. Prompts ask learners to supply their own experience and reasons; the sentence frame reduces the amount of language the learner must plan at once without providing a model answer to copy.

## Data and compatibility

The new stage is part of the `track.stages` plan captured by `startSession`. The existing `legacyStages` fallback keeps active sessions without a saved stage plan on their original order. Responses continue to use the existing local draft and answer history paths. The guided activity has no correctness evaluator, score or provider call. The final authored stage retains the existing optional, per-response AI consent.

## Localization and access

The interface label, short-step hint and placeholder have English and Brazilian Portuguese UI copy. The scaffold itself remains English because practice content and responses are intentionally English. Reuse the existing required textarea, keyboard flow, voice disclosure and draft persistence; reduce the guided editor to three rows.

## Verification

Test each track's four-step progression and that its guided output is recorded without a correctness evaluation, and run `npm run check` plus `npm run build`. Review the generated static bundle. Browser visual, keyboard and mobile acceptance remains manual when a supported browser is available.

## Risks

The frame could feel too prescriptive or add friction for an advanced learner. Keep it to one short activity per track, let the learner write in their own words, and gather usability feedback before expanding the scaffold or adapting difficulty automatically.
