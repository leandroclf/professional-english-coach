# Research basis and design hypotheses

This is a research-informed product rationale, not evidence that this application improves proficiency. Evidence from other learners and settings must be tested for the intended user and task.

| Design choice | Evidence and interpretation | Limit |
|---|---|---|
| Workplace scenarios and interaction | The CEFR Companion Volume includes descriptors for interaction, mediation and phonological control. Dialogue-based computer-assisted language-learning research reports speaking-development benefits across studies. We model architecture review, disagreement and presentation as meaningful tasks. | The first release is text-only and scripted, so evidence about dialogue and oral skill cannot be directly transferred to this experience. |
| Feedback after learner output | A meta-analysis of classroom oral corrective feedback reports beneficial effects on targeted language development. A later release can test delayed feedback and revised output. | The study does not validate AI-generated corrections or this product's proposed three-tier rubric. The current app provides no automated correction. |
| Retrieval and distributed practice | L2 vocabulary research finds useful effects of retrieval and spacing; research on distributed practice also examines fluency development. We prompt learners to recall improved expressions before revealing them. | Exact intervals vary by material and retention goal. The 1/3/7/14/30-day sequence is a product hypothesis, not an evidence-derived optimal schedule. |
| Presentation rubric | CEFR can guide observable communication descriptors. The proposed context → problem → constraints → options → decision → trade-offs → results structure supports clearer technical argument. | That structure is a product convention, not a published CEFR rubric or validated assessment scale. |

## Primary sources

1. Council of Europe, [CEFR Companion Volume (2020)](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions).
2. [Dialogue-based computer-assisted language learning systems for second language speaking development: A three-level meta-analysis](https://www.cambridge.org/core/journals/recall/article/dialoguebased-computerassisted-language-learning-systems-for-second-language-speaking-development-a-threelevel-metaanalysis/31847710516602398819C5E594038E7B), *ReCALL*.
3. [Oral feedback in classroom SLA: A meta-analysis](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/abs/oral-feedback-in-classroom-sla/4999EE1C8379B2BF026B148EAF373CA1), *Studies in Second Language Acquisition*.
4. [A review of laboratory studies of adult second language vocabulary training](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/review-of-laboratory-studies-of-adult-second-language-vocabulary-training/18F0A5D1FFC829CE05931B2EEE83124A/share/9612bae4e131a6e3d9d0b0aacac044f5587eb6e0), *Studies in Second Language Acquisition*.
5. [The effects of distributed practice on second language fluency development](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/effects-of-distributed-practice-on-second-language-fluency-development/4F6787916C198376CAD222934D3B37E4), *Studies in Second Language Acquisition*.
6. [Optimizing distributed practice online](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/optimizing-distributed-practice-online/C833408A4C3BAD939CA39EA734423BB7), *Studies in Second Language Acquisition*.
7. OpenAI, [Developer quickstart](https://platform.openai.com/docs/quickstart/make-your-first-api-request), documenting the server-side Responses API pattern. The coach integration uses a structured response and keeps the API key on the local server.
8. MDN, [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) and [SpeechRecognition compatibility notes](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition), documenting the separate synthesis/recognition interfaces and limited browser availability of recognition.

## Validation plan

Measure completion and usability first. For learning outcomes, collect repeated, comparable baseline and follow-up tasks scored independently by qualified human raters using a defined rubric for task fulfillment, coherence, language accuracy and interaction. Oral outcomes require oral tasks. Predefine how raters handle disagreements and compare changes over time, while accounting for task familiarity and practice effects. Avoid a numeric fluency score until reliability and validity are assessed.
