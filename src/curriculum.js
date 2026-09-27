const bilingual = (en, pt) => ({ en, 'pt-BR': pt });

// Original authored examples. Level names describe activity support, not CEFR.
export const units = [
  {
    id: 'introductions', title: bilingual('Introduce yourself', 'Apresente-se'), skill: bilingual('Everyday foundations', 'Fundamentos do cotidiano'),
    explanation: bilingual('Use “I am” for your name or role, and “I work on” for a project. A short introduction needs only two clear ideas.', 'Use “I am” para nome ou função e “I work on” para um projeto. Uma apresentação curta precisa de apenas duas ideias claras.'),
    example: 'I am Alex. I work on the payments team.', meaning: 'Sou Alex. Trabalho na equipe de pagamentos.',
    statement: '“I am Alex” can introduce your name.', truth: 'true',
    choices: ['I work on the payments team.', 'I working the payments team.', 'I works on the payments team.'], correct: 0,
    rationale: bilingual('With I, use work. “Work on” identifies a project or team assignment.', 'Com I, use work. “Work on” indica um projeto ou uma área de atuação.'),
    chunks: ['I work', 'on', 'the payments team.'], missing: 'payments',
    frame: 'I am ___. I work on ___.', transfer: 'Introduce yourself to a new teammate. Mention one thing you are working on.',
    partner: 'Nice to meet you. What are you working on this week?', model: 'I am working on a simpler checkout flow this week.',
    tip: bilingual('Check: name or role, current work, one clear sentence for each idea.', 'Confira: nome ou função, trabalho atual, uma frase clara para cada ideia.')
  },
  {
    id: 'clarification', title: bilingual('Ask for clarification', 'Peça esclarecimentos'), skill: bilingual('Listening repair', 'Esclarecimento na escuta'),
    explanation: bilingual('Use “Could you + verb” for a polite request. Ask about the exact word or idea you missed instead of pretending to understand.', 'Use “Could you + verbo” para um pedido educado. Pergunte sobre a palavra ou ideia que não entendeu em vez de fingir que compreendeu.'),
    example: 'Could you explain the deadline again?', meaning: 'Você poderia explicar o prazo novamente?',
    statement: '“Could you explain?” is a polite request.', truth: 'true',
    choices: ['Could you explains the deadline?', 'Could you explain the deadline?', 'Could you explaining the deadline?'], correct: 1,
    rationale: bilingual('After could, use the base form explain, without -s or -ing.', 'Depois de could, use a forma básica explain, sem -s ou -ing.'),
    chunks: ['Could you', 'explain', 'the deadline again?'], missing: 'deadline',
    frame: 'Could you explain ___ again?', transfer: 'You missed one requirement in a meeting. Ask a specific clarification question.',
    partner: 'Which part would you like me to explain?', model: 'Could you explain which task needs to be finished first?',
    tip: bilingual('Check: polite request, specific uncertainty, question mark.', 'Confira: pedido educado, dúvida específica, ponto de interrogação.')
  },
  {
    id: 'updates', title: bilingual('Give a progress update', 'Dê uma atualização'), skill: bilingual('Workplace communication', 'Comunicação no trabalho'),
    explanation: bilingual('Separate completed work from current work. Use “I finished” for a completed action and “I am working on” for work in progress.', 'Separe o trabalho concluído do atual. Use “I finished” para uma ação concluída e “I am working on” para trabalho em andamento.'),
    example: 'I finished the tests. I am working on the report.', meaning: 'Terminei os testes. Estou trabalhando no relatório.',
    statement: '“I finished the tests” describes work still in progress.', truth: 'false',
    choices: ['I am finish the tests yesterday.', 'I finished the tests yesterday.', 'I finishing the tests yesterday.'], correct: 1,
    rationale: bilingual('Finished marks a completed past action. “Am working” describes current work.', 'Finished indica uma ação passada concluída. “Am working” descreve trabalho atual.'),
    chunks: ['I finished', 'the tests', 'yesterday.'], missing: 'report',
    frame: 'I finished ___. I am working on ___.', transfer: 'Give a two-sentence update about a real task and your next step.',
    partner: 'What is your next step after that?', model: 'I will share the report with the team tomorrow.',
    tip: bilingual('Check: distinguish finished work, current work and next step.', 'Confira: diferencie trabalho concluído, atual e próximo passo.')
  },
  {
    id: 'requests', title: bilingual('Make a clear request', 'Faça um pedido claro'), skill: bilingual('Collaboration', 'Colaboração'),
    explanation: bilingual('A useful request names an action and a time. Use “Could you review … by …?” to make both visible. “By Friday” means no later than Friday.', 'Um pedido útil indica uma ação e um prazo. Use “Could you review … by …?” para explicitar ambos. “By Friday” significa até sexta-feira.'),
    example: 'Could you review the proposal by Friday?', meaning: 'Você poderia revisar a proposta até sexta-feira?',
    statement: '“By Friday” means only after Friday.', truth: 'false',
    choices: ['Could you review the proposal by Friday?', 'Could you reviewed the proposal by Friday?', 'Could you reviewing the proposal by Friday?'], correct: 0,
    rationale: bilingual('Could takes the base verb review. By introduces the latest acceptable time.', 'Could exige o verbo básico review. By introduz o prazo máximo.'),
    chunks: ['Could you', 'review the proposal', 'by Friday?'], missing: 'Friday',
    frame: 'Could you ___ by ___?', transfer: 'Ask a teammate for help with a specific task and a realistic deadline.',
    partner: 'Friday is difficult. Would Monday work?', model: 'Monday works if we can share an initial outline on Friday.',
    tip: bilingual('Check: action, deadline and a constructive response to constraints.', 'Confira: ação, prazo e resposta construtiva às limitações.')
  },
  {
    id: 'tradeoffs', title: bilingual('Explain a trade-off', 'Explique uma escolha com custos'), skill: bilingual('Technical reasoning', 'Argumentação técnica'),
    explanation: bilingual('Name both a cost and a benefit. “In exchange for” connects what you give up to what you gain. Avoid presenting a decision as having no downside.', 'Apresente um custo e um benefício. “In exchange for” conecta o que você perde ao que ganha. Evite apresentar uma decisão como se não tivesse desvantagens.'),
    example: 'We accept higher cost in exchange for faster delivery.', meaning: 'Aceitamos um custo maior em troca de uma entrega mais rápida.',
    statement: 'A trade-off can include both a cost and a benefit.', truth: 'true',
    choices: ['The design is good because good.', 'We accept higher cost in exchange for faster delivery.', 'We choose because the design.'], correct: 1,
    rationale: bilingual('Higher cost is the downside; faster delivery is the benefit.', 'Higher cost é a desvantagem; faster delivery é o benefício.'),
    chunks: ['We accept higher cost', 'in exchange for', 'faster delivery.'], missing: 'faster delivery',
    frame: 'We accept ___ in exchange for ___.', transfer: 'Explain a real trade-off to someone outside your technical team.',
    partner: 'What would make that cost unacceptable?', model: 'The cost would be unacceptable if it exceeded our monthly budget.',
    tip: bilingual('Check: one specific cost, one benefit, a condition for reconsidering.', 'Confira: um custo específico, um benefício, uma condição para reconsiderar.')
  },
  {
    id: 'disagreement', title: bilingual('Disagree constructively', 'Discorde de forma construtiva'), skill: bilingual('Leadership', 'Liderança'),
    explanation: bilingual('Acknowledge the other view before naming your concern. Use “I see your point, but …” and propose a next step. Challenge the idea with a reason.', 'Reconheça a outra visão antes de apresentar sua preocupação. Use “I see your point, but …” e proponha um próximo passo. Questione a ideia com uma razão.'),
    example: 'I see your point, but I am concerned about the risk.', meaning: 'Entendo seu ponto, mas estou preocupado com o risco.',
    statement: '“I see your point” always means you fully agree.', truth: 'false',
    choices: ['You are wrong. End of discussion.', 'I see your point, but I am concerned about the risk.', 'No because no.'], correct: 1,
    rationale: bilingual('Acknowledging a view is not the same as agreeing. Naming a concern keeps the discussion specific.', 'Reconhecer uma visão não significa concordar. Apresentar uma preocupação torna a discussão específica.'),
    chunks: ['I see your point,', 'but I am concerned', 'about the risk.'], missing: 'risk',
    frame: 'I see your point, but I am concerned about ___.', transfer: 'Disagree with a proposed deadline and suggest one practical alternative.',
    partner: 'What alternative would you suggest?', model: 'I would suggest a smaller first release so we can test the risky part.',
    tip: bilingual('Check: acknowledgment, reason, practical alternative.', 'Confira: reconhecimento, razão, alternativa prática.')
  },
  {
    id: 'evidence', title: bilingual('Support a recommendation', 'Fundamente uma recomendação'), skill: bilingual('Presentation', 'Apresentação'),
    explanation: bilingual('Connect a recommendation to evidence with because. Distinguish what you measured from what you expect. One test does not prove every future outcome.', 'Conecte uma recomendação à evidência com because. Diferencie o que mediu do que espera. Um teste não prova todos os resultados futuros.'),
    example: 'I recommend a pilot because the results are promising.', meaning: 'Recomendo um projeto-piloto porque os resultados são promissores.',
    statement: '“Because” can introduce a reason for a recommendation.', truth: 'true',
    choices: ['I recommend a pilot because the results are promising.', 'I recommend a pilot because.', 'I recommend because a pilot results.'], correct: 0,
    rationale: bilingual('Because links the recommendation to a complete reason. Promising results still leave uncertainty.', 'Because conecta a recomendação a uma razão completa. Resultados promissores ainda deixam incerteza.'),
    chunks: ['I recommend a pilot', 'because', 'the results are promising.'], missing: 'pilot',
    frame: 'I recommend ___ because ___.', transfer: 'Recommend a small experiment. Name the evidence and one uncertainty.',
    partner: 'How will you decide whether the pilot succeeded?', model: 'We will compare completion time with the current baseline.',
    tip: bilingual('Check: recommendation, evidence, uncertainty, measurable next step.', 'Confira: recomendação, evidência, incerteza, próximo passo mensurável.')
  },
  {
    id: 'recovery', title: bilingual('Explain a recovery plan', 'Explique um plano de recuperação'), skill: bilingual('Problem solving', 'Resolução de problemas'),
    explanation: bilingual('Use “If + present, we will + verb” for a possible future situation and its response. Keep the condition and action explicit.', 'Use “If + presente, we will + verbo” para uma situação futura possível e sua resposta. Deixe a condição e a ação explícitas.'),
    example: 'If the service fails, we will retry the request.', meaning: 'Se o serviço falhar, tentaremos a solicitação novamente.',
    statement: '“If the service fails” names a condition.', truth: 'true',
    choices: ['If the service fail, we retrying.', 'If the service fails, we will retry the request.', 'If service failing, we will retries.'], correct: 1,
    rationale: bilingual('Service is singular, so use fails. After will, use the base verb retry.', 'Service é singular, então use fails. Depois de will, use o verbo básico retry.'),
    chunks: ['If the service fails,', 'we will retry', 'the request.'], missing: 'retry',
    frame: 'If ___, we will ___.', transfer: 'Explain a possible failure and a recovery action to a nontechnical stakeholder.',
    partner: 'What happens if the first recovery attempt does not work?', model: 'We will pause new requests and notify the support team.',
    tip: bilingual('Check: condition, response, next step if the response fails.', 'Confira: condição, resposta, próximo passo se a resposta falhar.')
  }
];

export const learningModes = ['recognition', 'guided', 'applied'];
export function questionsFor(unit, mode = 'recognition') {
  if (!learningModes.includes(mode)) throw new Error('Invalid learning mode');
  const questions = [
    { id: `${unit.id}:tf`, unitId: unit.id, type: 'choice', label: bilingual('True or false', 'Verdadeiro ou falso'), prompt: unit.statement, options: [{ value: 'true', label: bilingual('True', 'Verdadeiro') }, { value: 'false', label: bilingual('False', 'Falso') }], answer: unit.truth },
    { id: `${unit.id}:mc`, unitId: unit.id, type: 'choice', label: bilingual('Multiple choice', 'Múltipla escolha'), prompt: 'Choose the clearest correct sentence.', options: unit.choices.map((label, i) => ({ value: String(i), label: bilingual(label, label) })), answer: String(unit.correct) }
  ];
  if (mode !== 'recognition') questions.push(
    { id: `${unit.id}:order`, unitId: unit.id, type: 'order', label: bilingual('Build a sentence', 'Monte uma frase'), prompt: 'Put the parts in order.', chunks: [...unit.chunks].reverse(), answer: unit.chunks.join(' ') },
    { id: `${unit.id}:listen`, unitId: unit.id, type: 'listen', label: bilingual('Listen and complete', 'Ouça e complete'), prompt: unit.example.replace(unit.missing, '_____'), answer: unit.missing, optional: true },
    { id: `${unit.id}:guided`, unitId: unit.id, type: 'write', label: bilingual('Guided production', 'Produção guiada'), prompt: unit.frame }
  );
  if (mode === 'applied') questions.push(
    { id: `${unit.id}:transfer`, unitId: unit.id, type: 'write', label: bilingual('Apply it to your life', 'Aplique à sua vida'), prompt: unit.transfer },
    { id: `${unit.id}:roleplay`, unitId: unit.id, type: 'write', label: bilingual('Scripted role rehearsal · not AI', 'Ensaio com roteiro · sem IA'), prompt: unit.partner },
    { id: `${unit.id}:rewrite`, unitId: unit.id, type: 'write', label: bilingual('Rewrite and explain', 'Reescreva e explique'), prompt: 'Rewrite your earlier response more clearly. What did you change and why?' }
  );
  return questions;
}
