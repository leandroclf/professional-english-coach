# Design: progressive exercise formats

Each current practice track receives the same two short authored exercises before its existing prompts: a true-or-false grammar check and a multiple-choice exercise about expressing a technical trade-off. The examples teach usable English rather than testing backend engineering knowledge. Their content remains in English in both interface locales.

Stages declare an optional answer mode and, for closed-answer stages, a list of choices, the expected value, and a short explanation. Stages without a mode continue to use the existing free-text editor. The practice view uses required radio controls for the two closed-answer modes; the existing submission transition stores the selected label and an evaluation result with the answer. The next stage displays the result and explanation. No aggregate score or learner rating is introduced.

AI feedback stays hidden during the two guided checks and all authored open-ended prompts. On the final authored prompt, learners can opt in to the existing server-side feedback call. If the provider returns a follow-up question, the session adds one final AI conversation stage: the learner responds to that question, then can opt in once more for the provider's reply. It is a short text exchange, not a continuous conversation or spoken-fluency assessment. No learner text is sent without explicit consent at each submission. When the service is unavailable or the learner does not opt in, the session proceeds directly to reflection.

New sessions snapshot their stage plan so future authored changes cannot reorder a learner's unfinished work. Existing in-progress sessions from before this change have no snapshot, so they continue with the prior stage order retained as a compatibility plan. Existing historical answers do not need migration; completed sessions omit the stage snapshot because each answer already stores its prompt and stage label.

The interface uses existing runtime translation behavior for English/PT-BR labels. New navigation and mode copy is added to the Portuguese dictionary; exercise prompts, choices and explanations stay in English, consistent with existing product behavior.

Human-led practice is a later stage requiring product and privacy design. It is described only as a future direction and is not included in current UI or capability claims.
