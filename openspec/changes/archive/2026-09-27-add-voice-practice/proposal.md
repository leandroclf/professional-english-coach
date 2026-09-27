# Add voice practice and oral presentation

## Why
Text responses cannot demonstrate spontaneous oral fluency, pronunciation or real-time interaction, which are central to the learner's goal.

## Proposed scope
- Microphone capture with clear consent and controls for retention/deletion.
- Real-time role-play, interruptions and presentation Q&A; optional transcript and replay.
- Rubrics for intelligibility, discourse, interaction and task fulfillment; compare human and automated judgments before release.
- Accessibility fallback for text and captions, device/browser compatibility and cost budget.

## MVP implementation update

The first voice increment uses browser `SpeechRecognition` when available and inserts the transcript into an editable response field; `SpeechSynthesis` can read prompts aloud. It does not save raw audio or calculate a pronunciation score. Recognition support varies by browser and may use browser-managed services, so the UI keeps text entry available and tells the learner to review the transcript. Reliable cross-browser audio capture, replay and human-calibrated oral assessment remain future work.

## Dependency
Resolve privacy, architecture and evaluation plans before choosing speech providers or publishing numeric fluency scores.
