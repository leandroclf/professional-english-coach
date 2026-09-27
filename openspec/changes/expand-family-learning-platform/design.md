# Design questions and dependencies

Family profiles must isolate all existing v1 sessions, review cards and learning runs, not just new content. Restore must reject invalid structure and offer explicit replacement/merge semantics. Offline caching must be keyed to build version and preserve unfinished question snapshots across updates.

Hosted AI requires supported backend deployment, provider credentials, consent and cost limits. Pronunciation scoring requires actual audio input and a calibrated model; speech-to-text confidence is not a substitute. Human practice requires participants and intentional sharing. Richer media/content can use the original-authoring pipeline without a human review gate, while retaining honest provenance.
