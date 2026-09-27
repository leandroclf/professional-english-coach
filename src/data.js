import { isMediaAssetApproved, mediaAssets } from './media-assets.js';

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

const learningUnit = {
  objective: {
    en: 'Say what you support and name a cost and a benefit of a technical decision.',
    'pt-BR': 'Diga o que você apoia e apresente um custo e um benefício de uma decisão técnica.'
  },
  explanation: {
    en: 'To agree, say “I agree with + an idea or thing.” Do not put “am” before agree. To compare two sides, say “The main trade-off is [cost] in exchange for [benefit].”',
    'pt-BR': 'Para concordar, diga “I agree with + uma ideia ou coisa”. Não use “am” antes de agree. Para comparar dois lados, diga “The main trade-off is [custo] in exchange for [benefício].”'
  },
  example: 'I agree with adding a queue. The main trade-off is higher latency in exchange for better isolation.',
  mediaAssetIds: [],
  breakdown: {
    en: 'The first sentence says what the speaker supports. The second names the cost (higher latency) and benefit (better isolation).',
    'pt-BR': 'A primeira frase diz o que a pessoa apoia. A segunda apresenta o custo (maior latência) e o benefício (melhor isolamento).'
  }
};

const listeningClozeCandidate = {
  label: 'Listening · complete the phrase', mode: 'audio_cloze', optional: true, minutes: 1,
  prompt: 'Complete the sentence: “The main trade-off is ___ in exchange for better isolation.”',
  hint: 'Listen for the cost named after “The main trade-off is”. You can replay the clip.',
  placeholder: 'Type the missing phrase…',
  acceptedAnswers: ['higher latency'],
  correctAnswer: 'higher latency',
  explanation: 'The speaker names “higher latency” as the cost and “better isolation” as the benefit.',
  transcript: 'The main trade-off is higher latency in exchange for better isolation.',
  mediaAssetId: 'tradeoff-phrase'
};

// Short, low-pressure English checks precede every open-ended professional prompt.
const foundations = [
  {
    label: 'Quick check · true or false', mode: 'true_false', minutes: 1,
    prompt: 'True or false: “I am agree with adding a queue” is correct English.',
    hint: 'Choose the sentence form you would use to agree with a recommendation.',
    options: [{ value: 'True', label: 'True' }, { value: 'False', label: 'False' }],
    correctAnswer: 'False', explanation: 'Use “I agree with adding a queue.” The verb agree does not take am here.'
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

const guidedFrames = {
  conversation: {
    prompt: 'Complete this frame with a real recent decision: “I chose ___ because ___.”',
    hint: 'Write one specific sentence. State the choice and the reason from your own experience.'
  },
  leadership: {
    prompt: 'Complete this frame for a real design discussion: “I see the concern. I would recommend ___ because ___.”',
    hint: 'Keep the tone constructive. Add one reason that connects to the team’s goal.'
  },
  presentation: {
    prompt: 'Complete this frame for a real technical decision: “I recommend ___ because the evidence shows ___.”',
    hint: 'Name a concrete decision and the evidence you would use to support it.'
  }
};

for (const track of tracks) {
  track.lesson = { ...learningUnit };
  track.legacyStages = track.stages;
  const copiedFoundations = foundations.map(stage => ({ ...stage, options: stage.options.map(option => ({ ...option })) }));
  const listeningStages = isMediaAssetApproved(listeningClozeCandidate.mediaAssetId)
    ? [{ ...listeningClozeCandidate, media: mediaAssets[listeningClozeCandidate.mediaAssetId] }]
    : [];
  track.stages = [...copiedFoundations, ...listeningStages, {
    label: 'Guided sentence · one idea', mode: 'guided_response', minutes: 2,
    ...guidedFrames[track.id], placeholder: 'Write one sentence in your own words…'
  }, ...track.legacyStages];
}

export { listeningClozeCandidate };

export const expressions = [
  'The main trade-off is…',
  'From an operational standpoint…',
  'I would challenge that assumption.',
  'Let me rephrase that.',
  'What concerns me most is…'
];
