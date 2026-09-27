# Browser voice practice design

Use Web Speech API recognition to insert an English transcript into the existing editable response field. Use speech synthesis to read the current prompt, including any adaptive follow-up. Do not record or retain raw audio. Preserve text input as the always-available fallback and ask the learner to review the transcript before submission.

Speech recognition support is limited and implementation-dependent across browsers; this feature is progressive enhancement. Browser recognition may use a browser-managed service, so do not imply that the voice path is necessarily local. The app currently has no pronunciation scoring, transcript-confidence model, audio replay or validated speaking assessment.
