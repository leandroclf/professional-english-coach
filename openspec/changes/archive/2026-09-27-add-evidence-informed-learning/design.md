# Design

A separate learning module uses optional state.learning within the existing v1 export. Existing sessions remain unchanged. Lesson content is versioned and authored in code. Active runs snapshot their questions. Recognition is the default: two closed questions and no mandatory prose. Guided and applied modes extend in order, with explicit learner selection.

Objective attempts record correct/incorrect, confidence and assistance; open responses are never scored. Feedback requires an explicit Continue action. A transcript is always available for accessibility; using it marks the listening attempt assisted. Skips are excluded from accuracy. Initial attempts, not repeated retries, drive the run summary. Recommendations prioritize due units, then unseen units, then least recently studied. Intervals 1/3/7/14/30 days and thresholds are transparent product heuristics, not a validated adaptive algorithm.

Audio is generated locally with FFmpeg/libflite and owner authorization inherited from the prior release. No voice cloning. Captioned video is an original static instructional sequence, not a human demonstration. Media must exist in the built artifact. No learner content is sent by this module.
