# Concorrência e decisões de produto

Revisão: 27/09/2026. Consulta direcionada a fontes oficiais de produto e artigos originais/meta-análises; não é uma revisão sistemática exaustiva. Não foram compradas assinaturas nem executados testes comparativos dos aplicativos. Disponibilidade de recursos pode variar por curso, dispositivo e plano. Páginas comerciais descrevem recursos; não demonstram, por si, eficácia pedagógica.

## Referências de produto

| Produto e fonte oficial | Padrão observado | Decisão implementada | Limite |
|---|---|---|---|
| [Duolingo Practice Hub](https://blog.duolingo.com/guide-to-duolingo-practice-hub/) e [Max](https://blog.duolingo.com/duolingo-max/) | Central de prática, revisão de erros/palavras, Roleplay e Video Call | Biblioteca, revisão misturada e ensaio contextual com roteiro | O ensaio local está identificado como roteiro, sem fingir conversa com IA. IA existente depende de servidor configurado e consentimento. |
| [Busuu Study Plan](https://www.busuu.com/en/english/personalized-study-plan-busuu-premium) | Plano de estudo e recomendações considerando progresso e erros | Meta semanal, próximo passo por vencimento e histórico de questões | Recomendação determinística, sem modelo preditivo ou prazo prometido para fluência. |
| [Babbel Method](https://www.babbel.com/the-babbel-method) e [Review](https://support.babbel.com/hc/en-us/articles/360037496932-Memorizing-vocabulary) | Explicação, linguagem contextual, revisão e prática de estruturas | Microlições, exemplos, áudio, produção guiada e captura de expressões | Conteúdo original; não reproduz curso ou exercícios proprietários. |
| [ELSA AI](https://elsaspeak.com/en/ai/) | Cenários para praticar e feedback após a interação | Contextos profissionais, pergunta de interlocutor, comparação com modelo e reescrita | Sem avaliação fonética, nota de pronúncia ou interação de voz em tempo real nesta versão. |

## Pacote entregue

1. Oito microlições: apresentação, esclarecimentos, atualizações, pedidos, trade-offs, discordância, evidências e recuperação.
2. Explicações e instruções em inglês/PT-BR; exemplos e respostas de prática em inglês.
3. Reconhecimento como padrão: verdadeiro/falso → múltipla escolha, sem exigir escrita livre.
4. Modo guiado: ordenação de partes → lacuna por escuta → frase própria com estrutura.
5. Modo de aplicação: transferência para uma situação pessoal → interlocutor com roteiro → reescrita e explicação da mudança.
6. Feedback visível antes do próximo exercício, com resposta e razão.
7. Autoavaliação de confiança, com reflexão quando uma resposta confiante estiver incorreta.
8. Ajuda sob demanda; respostas com ajuda não elevam a contagem de acertos sem ajuda.
9. Oito novos áudios sintéticos, transcrição, velocidade 0,75×/1× e escuta opcional.
10. Um vídeo instrucional próprio de nove segundos, com legendas e alternativa textual.
11. Biblioteca pesquisável e exploração livre dos temas.
12. Revisão espaçada por lição: 1/3/7/14/30 dias; erro reinicia o intervalo.
13. Repetição no mesmo dia não aumenta o intervalo; recuperação correta em outro dia pode aumentá-lo.
14. Recomendação: vencidas primeiro, depois inéditas, depois menos recentes; ordenação transparente.
15. Revisão misturada de até quatro lições estudadas; fallback de uma lição quando ainda não houver histórico.
16. Meta flexível de 1/3/5/7 dias por semana, contada por dias locais distintos, sem punição de sequência.
17. Histórico de respostas, rascunho persistente, resumo de acertos objetivos e estados de ajuda/pulo.
18. Captura de expressão contextual no baralho existente; exportação e exclusão incluem a nova trilha.

O total de atividades autoradas no modo de aplicação é 64 (oito por lição); os modos menores usam subconjuntos, não exercícios adicionais. Os três formatos profissionais anteriores continuam disponíveis separadamente.

## Sugestões futuras, com dependências reais

| Prioridade | Evolução | Por que fica proposta |
|---|---|---|
| Alta | Perfis familiares com exportação/importação por pessoa | Precisa de migração e isolamento de dados completos, incluindo a prática antiga; nomes na tela não bastam. |
| Alta | Importação validada de backup e recuperação de conflitos | Exportação atual existe; restauração exige validação estrutural e regras de substituição. |
| Alta | PWA/offline com atualização de cache | Precisa evitar conteúdo antigo e conflitos de versões em sessões salvas. |
| Alta | Banco maior de variantes e tarefas equivalentes | O banco atual tem oito unidades originais; evitar memorizar a posição da alternativa requer variantes revisadas por consistência. |
| Alta | IA hospedada para feedback e diálogo com múltiplos turnos | Requer backend, segredo de API, limites de custo e consentimento; o host atual é estático. |
| Média | Gravação/reprodução local e shadowing com comparação humana | Requer permissões de microfone, ciclo de vida dos arquivos e compatibilidade real de navegadores. |
| Média | Avaliação de pronúncia por fonema e inteligibilidade | Reconhecimento de texto não mede pronúncia; exige motor e avaliação do erro em diferentes sotaques. |
| Média | Mais vozes, sotaques e vídeos contextualizados | Pipeline de autoria pronto; diversidade deve ter propósito pedagógico e alternativas acessíveis. |
| Média | Dicionário contextual, famílias de palavras e collocations | Exige dados lexicais consistentes; o baralho atual recebe frases completas. |
| Média | Leitura extensiva e textos graduados por objetivo | Exige corpus autorado/adequado, perguntas e controle da carga linguística. |
| Média | Agenda, lembretes e calendário pessoal | Precisa de permissões e serviço de notificações; a meta atual é local e sem notificações. |
| Média | Rubricas descritivas e portfólio com comparação longitudinal | Atividades comparáveis e critérios confiáveis antes de chamar evolução de proficiência. |
| Média | Avaliação adaptativa inicial e alinhamento a descritores CEFR | Não converter poucos acertos em nível certificado; exige banco, calibração e validação. |
| Média | Revisão adaptativa por item e estimativa de retenção | O agendamento atual é por lição; algoritmo mais sofisticado exige histórico e avaliação de previsão. |
| Futura | Tutor humano, dupla de estudo e feedback comunitário | Dependem de participantes, consentimento e gestão de compartilhamento. |
| Futura | Sincronização entre dispositivos e contas | Exige autenticação, armazenamento e políticas de recuperação/exclusão. |
| Futura | Currículos por profissão e situações familiares | Expandir o mesmo formato para entrevistas, viagens, escola e atendimento. |
| Futura | Experimentos de eficácia e retenção de longo prazo | Requer dados voluntários, tarefas comparáveis e desenho de avaliação; não é bloqueio para uso pessoal. |

Não foram adicionados ranking público, anúncios ou penalidades por erro: não são necessários para o objetivo familiar. Esta seleção cobre recursos executáveis com qualidade verificável no ambiente atual; “todas as sugestões possíveis” não é um escopo finito nem um critério de aceite testável.
