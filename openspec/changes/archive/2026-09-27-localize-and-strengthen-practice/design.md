# Design: localized interface and resilient practice

## Language selection

Keep the app as a single page. Detect PT-BR from `navigator.language` for a first visit and otherwise use English. Store an explicit choice under a separate localStorage key so deleting learner progress does not reset the language. Translate interface labels, directions, dates, notices and track descriptions. Keep authored English practice questions, responses, saved expressions and AI suggestions unchanged. Set the document's `lang` attribute to match the selected interface language.

## Draft recovery

Add an optional `draft` field to the current active session. Persist it on editor input, restore it into the response field after reload, and clear it on successful submission or when the session is discarded. Keep existing v1 stored sessions valid when the field is absent. Do not persist microphone audio; dictated text follows the same editable draft path as typed text.

## Capability and privacy clarity

Treat a missing or unsuccessful `/api/status` endpoint as a static-hosted capability limit. Treat a successful status response with `feedbackAvailable: false` as a local/server configuration limit. The existing disabled consent control continues to prevent transmission in both states. Remove the Google Fonts import and use system font stacks to avoid a third-party font request.

## Accessibility and readability

Add a skip link, a keyboard-operable language control with pressed state, and visible focus styling. Increase frequently used labels, buttons, help text and status copy to readable sizes while preserving the existing responsive structure. Localize formatted dates and set `<html lang>` whenever the language changes.

## Verification

Unit tests cover default/saved locale selection, translated UI with protected dynamic content, translation of track labels and stage hints, and draft persistence/clearing. Existing behavior tests remain unchanged. Validate the emitted static bundle and OpenSpec change. Browser layout, speech permissions and screen-reader behavior remain manual acceptance items.
