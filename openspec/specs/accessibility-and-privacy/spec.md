## ADDED Requirements

### Requirement: Keyboard access and readable controls
The application MUST expose a keyboard-accessible language control, a skip link to the main content, and visible keyboard focus on interactive controls. Frequently used labels, buttons, instructions and status text MUST remain readable at supported viewport sizes.

#### Scenario: Keyboard-only navigation
- GIVEN the application is open
- WHEN the learner uses the keyboard to navigate
- THEN the learner can reach the language control and main content
- AND the focused interactive control has a visible focus indicator

### Requirement: No third-party font request
The application MUST use system font stacks and MUST NOT request web fonts from a third-party font service.

#### Scenario: Load the hosted application
- GIVEN the static application is loaded
- WHEN its stylesheets are evaluated
- THEN no Google Fonts stylesheet or font request is required to render the interface
