export const tracks = [
  {
    id: 'conversation', number: '01', name: 'Conversation & fluency', day: 'MONDAY', minutes: 15,
    intro: 'Think aloud. Explain a technical decision before the conversation gets comfortable.',
    stages: [
      { label: 'Warm-up', minutes: 2, prompt: 'What technical decision did you make recently, and what made it difficult?', hint: 'State the decision first, then the constraint that mattered most.' },
      { label: 'Conversation', minutes: 5, prompt: 'You are in an architecture review. Explain why you chose asynchronous processing for a document pipeline. I am a skeptical teammate.', hint: 'Context → choice → effect. Give a concrete example.' },
      { label: 'Pressure round', minutes: 3, prompt: 'The extra queue adds operational overhead. Why is the simpler synchronous approach insufficient?', hint: 'Acknowledge the cost, then explain the failure mode you are avoiding.' },
      { label: 'Upgrade', minutes: 5, prompt: 'Restate your argument in fewer words. What would you say in a real meeting?', hint: 'Try: “The main trade-off is…”' }
    ]
  },
  {
    id: 'leadership', number: '02', name: 'Technical leadership', day: 'WEDNESDAY', minutes: 15,
    intro: 'Challenge assumptions, negotiate trade-offs and keep the discussion constructive.',
    stages: [
      { label: 'Warm-up', minutes: 2, prompt: 'Describe a time you changed your mind after a teammate challenged your design.', hint: 'What changed your mind?' },
      { label: 'Design discussion', minutes: 5, prompt: 'A teammate wants to couple five external providers directly to the core domain. Propose an integration boundary.', hint: 'Explain ownership, substitution and observability.' },
      { label: 'Pressure round', minutes: 3, prompt: 'This abstraction will take another sprint. What measurable benefit justifies it now?', hint: 'Separate evidence from assumptions.' },
      { label: 'Upgrade', minutes: 5, prompt: 'Summarize your recommendation to a product stakeholder in four sentences.', hint: 'Connect technical cost to delivery risk.' }
    ]
  },
  {
    id: 'presentation', number: '03', name: 'Presentation & Q&A', day: 'FRIDAY', minutes: 20,
    intro: 'Present an architecture decision, then defend it against hard questions.',
    stages: [
      { label: 'Opening', minutes: 3, prompt: 'Present a migration from synchronous processing to an event-driven architecture. Start with the context and the problem.', hint: 'Context → problem → constraints.' },
      { label: 'Decision', minutes: 6, prompt: 'Present the options you considered, your decision, the trade-offs, and the result you expect to measure.', hint: 'Options → decision → trade-offs → evidence.' },
      { label: 'Q&A · failure', minutes: 4, prompt: 'A critical dependency is down for two hours. How does the design recover, and what happens to messages already in flight?', hint: 'Discuss retries, idempotency, DLQ and observability.' },
      { label: 'Q&A · business', minutes: 4, prompt: 'The new design costs more. What evidence would convince you that the migration is worth it?', hint: 'Name a baseline and a success criterion.' },
      { label: 'Closing', minutes: 3, prompt: 'Close the presentation with your recommendation, remaining uncertainty and next validation step.', hint: 'End with a decision request.' }
    ]
  }
];

// Short, low-pressure English checks precede every open-ended professional prompt.
const foundations = [
  {
    label: 'Quick check · true or false', mode: 'true_false', minutes: 1,
    prompt: 'True or false: “I am agree with this design” is correct English.',
    hint: 'Choose the sentence form you would use in a meeting.',
    options: [{ value: 'True', label: 'True' }, { value: 'False', label: 'False' }],
    correctAnswer: 'False', explanation: 'Use “I agree with this design.” The verb agree does not take am here.'
  },
  {
    label: 'Quick check · multiple choice', mode: 'multiple_choice', minutes: 1,
    prompt: 'Which sentence clearly presents a technical trade-off?',
    hint: 'Look for both the cost and the benefit.',
    options: [
      { value: 'A', label: 'The queue maybe good.' },
      { value: 'B', label: 'The main trade-off is added latency in exchange for better isolation.' },
      { value: 'C', label: 'Queue is because we choose.' }
    ],
    correctAnswer: 'B', explanation: 'A clear trade-off names both sides: added latency and better isolation.'
  }
];

for (const track of tracks) {
  track.legacyStages = track.stages;
  track.stages = [...foundations.map(stage => ({ ...stage, options: stage.options.map(option => ({ ...option })) })), ...track.legacyStages];
}

export const expressions = [
  'The main trade-off is…',
  'From an operational standpoint…',
  'I would challenge that assumption.',
  'Let me rephrase that.',
  'What concerns me most is…'
];
