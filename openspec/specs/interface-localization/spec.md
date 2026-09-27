## ADDED Requirements

### Requirement: Interface language selection
The application MUST provide English and Brazilian Portuguese interface languages. On a first visit it MUST choose Brazilian Portuguese when the browser's primary language is Portuguese, and English otherwise. A saved user choice MUST take precedence and persist separately from learner practice data.

#### Scenario: Portuguese browser on first visit
- GIVEN the learner has not chosen an interface language
- AND the browser language begins with `pt`
- WHEN the application opens
- THEN interface labels, instructions, notices and formatted dates use Brazilian Portuguese
- AND practice prompts remain in English

#### Scenario: Change language during a session
- GIVEN an unfinished practice session
- WHEN the learner switches between English and Brazilian Portuguese
- THEN the current session and saved answers remain intact
- AND practice prompts and learner responses remain unchanged

#### Scenario: Saved preference takes precedence
- GIVEN the learner previously selected a language
- WHEN the application opens in a browser configured for a different language
- THEN the previously selected interface language is used

### Requirement: Recoverable response draft
The application MUST persist the current editable response locally during an unfinished practice session and restore it when that session is reopened. It MUST clear the draft after accepting the answer or discarding the session.

#### Scenario: Restore an unfinished response
- GIVEN an active session and a partially typed answer
- WHEN the page reloads before submission
- THEN the typed answer is restored in the response editor

#### Scenario: Submit or discard a draft
- GIVEN an active session with an unsent response draft
- WHEN the learner submits the answer or confirms discarding the session
- THEN the submitted answer is retained in the session or the discarded draft is removed

### Requirement: Accurate hosted capability status
The application MUST accurately distinguish an unavailable hosted AI endpoint from an unconfigured local feedback server, and MUST keep the consent control disabled whenever feedback is unavailable.

#### Scenario: Static hosted build
- GIVEN the status endpoint is absent or unsuccessful
- WHEN the learner views the AI feedback control
- THEN the application says AI feedback is not included in the hosted version
- AND the consent control is disabled

#### Scenario: Local server without credentials
- GIVEN the status endpoint reports that feedback is unavailable
- WHEN the learner views the AI feedback control
- THEN the application says the local/server integration is not configured
- AND the consent control is disabled
