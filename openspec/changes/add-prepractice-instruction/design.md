# Design: teach, model, then practice

## Learning unit

Each new lesson begins with a small authored unit containing a learning objective, concise explanation, a correct English example, and (when useful) a common-error contrast. The lesson introduces language for one workplace communication goal, such as stating a trade-off or disagreeing constructively. Keep the explanation focused enough to read quickly; it is preparation, not a long lecture.

The proposed sequence is:

1. Show the objective and the explanation before asking the learner to answer.
2. Show one worked English example with a short explanation of the pattern.
3. Offer optional audio narration or a short video demonstration only when the format adds value to the objective.
4. Use true/false and multiple-choice checks, with feedback after each response.
5. Where listening is an objective, play a short English clip and ask the learner to type the missing word or phrase. Keep the transcript hidden until submission, allow replay, then reveal the transcript and explain the answer.
6. Continue to the existing one-sentence frame, open professional response, optional consent-based text coach turn, and reflection.

The sequence should not force every learner through every media format. Each lesson's objective determines whether listening practice or optional media is present. The learner can skip optional audio/video and continue with the written equivalent.

## Content and media model

Represent each lesson as authored, version-controlled content rather than provider-generated instruction. Keep the objective, localized explanation and directions, English model example, exercise data and optional media metadata together so their ordering is reviewable. A listening exercise needs an audio asset, an expected missing word/phrase, a replay control and transcript text. Store asset attribution and license information with each non-original media asset.

The implementation stores the bilingual lesson unit with the new session plan so active sessions keep their curriculum snapshot; pre-existing sessions without that unit keep their original stage plan and do not receive new activities mid-session. Optional audio exercises are included in new plans only when the asset catalog marks the file, human review and rights review approved. The build rejects a catalog item marked approved when its static file is absent or review gates are incomplete. Candidate files live outside `src/` and are not copied into the site.

## Optional media-authoring workflow

VoiceStudio is a candidate local production tool, not a product dependency. An author may use it to draft English narration, dub an existing instructional clip, or create a draft transcript. Authoring can also use another tool or a human speaker; no lesson may depend on VoiceStudio being installed or running. Keep source text and editable originals with the content-authoring materials where licensing permits, and publish only reviewed, browser-playable assets in the static bundle.

Reference for the candidate tool: [VoiceStudio repository](https://github.com/debpalash/VoiceStudio), including its [MCP documentation](https://github.com/debpalash/VoiceStudio/tree/main/docs/mcp) and repository license. Recheck the repository and the selected model's current terms at the time of adoption; this reference does not approve or require the tool.

Before an asset is accepted, a reviewer must check pronunciation of technical vocabulary, names, acronyms and contractions; compare speech with the approved script; verify transcript or captions against the final rendered audio/video; check rights for the source, model and voice (including explicit permission for any cloned voice); and test playback at normal speed on supported target browsers and a narrow mobile viewport. Record the generation tool/version and model/license when known, along with asset path, language, transcript/caption path, source, rights/license, attribution and reviewer status. Do not commit API keys, private source recordings, or assets whose redistribution rights are unclear.

For video, VoiceStudio may assist with dubbing or transcription but is not treated as a video lesson authoring or curriculum system. Video remains optional; provide captions and a transcript, learner-controlled playback, and a written route through the same objective. Keep audio/video short and measure the static build impact before expanding the catalog. Prefer widely supported static media formats and verify the final encodings in browsers used for acceptance.

Do not call a VoiceStudio local API/MCP server from the hosted learner experience or expose it to the network as part of this change. The static site has no protected backend boundary for such a service. Any future online speech-generation, transcription, or learner-audio processing capability requires a separate architecture and security/privacy proposal, explicit consent and cost review. Before incorporating VoiceStudio code into this repository, separately review its AGPL terms and each model's license; using a tool to create an asset does not by itself grant redistribution rights to that asset.

## Accessibility and localization

Use the existing English/PT-BR interface preference for explanation and activity directions. Keep English examples and listening content as target-language material. Provide English captions/transcripts for all audio and video. Make playback, replay and answer submission keyboard-operable; do not autoplay; preserve typed drafts. Text must remain available when media playback is unavailable. The first version does not require translated dubbing or subtitles for every clip.

## Privacy and evaluation boundaries

The feature plays authored media but does not record audio, access the microphone, or send learner answers to a provider. Learner responses continue through the existing local-storage flow. Existing opt-in AI interaction remains separate and only appears at its current point in the session. Individual objective-item feedback is practice feedback, not a proficiency score. Do not claim that the new sequence improves learning until it has been evaluated with representative learners and suitable outcome measures.

## Compatibility and rollout

Add instructional content to new session plans only. Keep saved in-progress stage plans unchanged and preserve legacy sessions through the existing compatibility path. The first release should use a small number of authored units to validate usability, media accessibility, content length and static bundle size before expanding the lesson catalog.

## Risks and gates

- Long explanations can recreate the initial-response burden. Review them for clarity and keep them concise.
- Audio/video can create accessibility, licensing and static-bundle risks. Every asset must have a transcript/caption, controls, source record and a text path. Synthetic voices can mispronounce technical language or imply endorsement; require human review and voice rights.
- VoiceStudio's local API/MCP and optional remote modes add avoidable deployment and security complexity if used at runtime; keep the initial workflow offline and authoring-only.
- Cloze distractors can test domain knowledge instead of English listening. Choose blanks that match the stated English-language objective and explain the answer without grading general competence.
- A single user cannot establish learning effectiveness. Gather usability feedback first; evaluate learning outcomes separately before making efficacy claims.
