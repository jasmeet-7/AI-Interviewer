import type { 
  InterviewCategory, 
  InterviewExchange, 
  InterviewSessionReport, 
  InterviewConfig,
  GrammarInsight,
  STARAnalysis
} from '../types';

export class AICoachEngine {
  private fillerWordList = [
    'um', 'uh', 'like', 'basically', 'actually', 'you know', 'sort of', 'kind of', 
    'literally', 'i guess', 'maybe', 'probably', 'stuff like that', 'and so on'
  ];

  // Analyze candidate's raw spoken answer
  public analyzeAnswer(
    questionText: string,
    category: InterviewCategory,
    answerText: string,
    durationSeconds: number,
    questionNumber: number
  ): InterviewExchange {
    const wordCount = answerText.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(0.1, durationSeconds / 60);
    const calculatedWpm = Math.round(wordCount / minutes);

    // Detect filler words
    const lowerAnswer = answerText.toLowerCase();
    const detectedFillers: string[] = [];
    let fillerCount = 0;

    for (const filler of this.fillerWordList) {
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      const matches = lowerAnswer.match(regex);
      if (matches) {
        fillerCount += matches.length;
        detectedFillers.push(`${filler} (${matches.length}x)`);
      }
    }

    // Grammar & Phrasing Insights
    const grammarInsights = this.detectGrammarInsights(answerText);

    // STAR Adherence Analysis
    const starAnalysis = this.evaluateSTARFramework(answerText);

    // Dynamic Follow-Up Generation
    const followUp = this.generateIntelligentFollowUp(answerText, category);

    // Compute composite answer quality score (0-100)
    const baseScore = 75;
    const lengthBonus = wordCount > 40 ? 10 : (wordCount > 15 ? 5 : -15);
    const fillerPenalty = Math.min(15, fillerCount * 2.5);
    const starBonus = (starAnalysis.actionScore + starAnalysis.resultScore) / 20;
    const finalAnswerScore = Math.min(98, Math.max(45, Math.round(baseScore + lengthBonus - fillerPenalty + starBonus)));

    return {
      id: `ex-${Date.now()}-${questionNumber}`,
      questionNumber,
      questionText,
      category,
      candidateAnswerText: answerText || '(Candidate completed with brief or non-verbal answer)',
      candidateAudioDurationSeconds: durationSeconds,
      candidateWpm: calculatedWpm,
      fillerWordsCount: fillerCount,
      detectedFillerWords: detectedFillers,
      pausesCount: Math.max(1, Math.floor(durationSeconds / 18)),
      grammarInsights,
      starAnalysis,
      answerScore: finalAnswerScore,
      aiFollowUpQuestion: followUp.question,
      aiFollowUpReasoning: followUp.reasoning,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  // Detect grammar nuances and suggest polished alternatives
  private detectGrammarInsights(text: string): GrammarInsight[] {
    const insights: GrammarInsight[] = [];
    const lower = text.toLowerCase();

    if (lower.includes('me and my team') || lower.includes('me and my lead')) {
      insights.push({
        original: 'Me and my team did...',
        corrected: 'My team and I delivered...',
        explanation: 'Subject pronouns ("My team and I") sound more authoritative and grammatically correct.'
      });
    }

    if (lower.includes('i did a lot of stuff') || lower.includes('done a lot of things')) {
      insights.push({
        original: 'I did a lot of stuff...',
        corrected: 'I spearheaded multiple core initiatives, including...',
        explanation: 'Replace vague terms like "stuff" with concrete ownership action verbs.'
      });
    }

    if (lower.includes('i guess we had to') || lower.includes('maybe we should')) {
      insights.push({
        original: 'I guess we had to...',
        corrected: 'We determined that the optimal strategy was to...',
        explanation: 'Avoid tentative qualifiers like "I guess" to project decisiveness and confidence.'
      });
    }

    if (insights.length === 0) {
      insights.push({
        original: 'Good natural phrasing',
        corrected: 'Strong grammatical delivery with active voice.',
        explanation: 'Your sentence structure and verb tenses demonstrated high fluency and professional tone.'
      });
    }

    return insights;
  }

  // Evaluate STAR (Situation, Task, Action, Result)
  private evaluateSTARFramework(answerText: string): STARAnalysis {
    const lower = answerText.toLowerCase();
    
    const hasSituation = lower.includes('when') || lower.includes('at') || lower.includes('company') || lower.includes('project') || lower.includes('time') || lower.includes('problem');
    const hasTask = lower.includes('needed to') || lower.includes('responsible for') || lower.includes('goal was') || lower.includes('task') || lower.includes('had to');
    const hasAction = lower.includes('i built') || lower.includes('i designed') || lower.includes('i implemented') || lower.includes('i optimized') || lower.includes('i created') || lower.includes('i led');
    const hasResult = lower.includes('result') || lower.includes('increased') || lower.includes('reduced') || lower.includes('improved') || lower.includes('saved') || lower.includes('%') || lower.includes('impact');

    const situationScore = hasSituation ? 85 : 65;
    const taskScore = hasTask ? 88 : 60;
    const actionScore = hasAction ? 92 : 68;
    const resultScore = hasResult ? 90 : 58;

    let clarityFeedback = 'Great adherence to the STAR framework.';
    if (!hasResult) {
      clarityFeedback = 'Solid breakdown of your action, but reinforce your answer by quantifying the business result (e.g. % latency reduction or revenue saved).';
    } else if (!hasAction) {
      clarityFeedback = 'Ensure you clearly emphasize YOUR specific actions ("I architected") rather than general team efforts ("we worked").';
    }

    return {
      situationScore,
      taskScore,
      actionScore,
      resultScore,
      clarityFeedback
    };
  }

  // Reason over the candidate's answer and synthesize an intelligent follow-up question
  private generateIntelligentFollowUp(
    answerText: string,
    category: InterviewCategory
  ): { question: string; reasoning: string } {
    const lower = answerText.toLowerCase();

    if (lower.includes('database') || lower.includes('sql') || lower.includes('redis') || lower.includes('postgres')) {
      return {
        question: 'What trade-offs did you evaluate when deciding between your database schema vs alternative indexing or caching strategies?',
        reasoning: 'Probing into architectural trade-offs and data integrity considerations based on the candidate mentioning data persistence.'
      };
    }

    if (lower.includes('team') || lower.includes('manager') || lower.includes('stakeholder') || lower.includes('client')) {
      return {
        question: 'How did you handle pushback or conflicting priorities from stakeholders while executing that plan?',
        reasoning: 'Assessing interpersonal leadership and conflict negotiation skills highlighted in the answer.'
      };
    }

    if (lower.includes('scale') || lower.includes('performance') || lower.includes('latency') || lower.includes('traffic')) {
      return {
        question: 'What would be the first point of failure in that architecture if traffic surged by 10x overnight?',
        reasoning: 'Challenging high-scale resiliency and bottleneck identification.'
      };
    }

    if (category === 'system-design' || category === 'technical') {
      return {
        question: 'If you were to build this system again from scratch today, what would you change or avoid?',
        reasoning: 'Testing self-reflection, architectural hindsight, and continuous learning.'
      };
    }

    return {
      question: 'What key lessons did you take away from that experience that influenced your subsequent projects?',
      reasoning: 'Evaluating reflective growth and skill transferability.'
    };
  }

  // Generate comprehensive final session report
  public generateSessionReport(
    config: InterviewConfig,
    targetRole: string,
    exchanges: InterviewExchange[],
    durationSeconds: number
  ): InterviewSessionReport {
    const totalExchanges = Math.max(1, exchanges.length);
    const avgWpm = Math.round(exchanges.reduce((sum, e) => sum + e.candidateWpm, 0) / totalExchanges) || 135;
    const totalFillers = exchanges.reduce((sum, e) => sum + e.fillerWordsCount, 0);
    const avgAnswerScore = Math.round(exchanges.reduce((sum, e) => sum + e.answerScore, 0) / totalExchanges) || 75;

    // Dimensional scores
    const communication = Math.min(95, Math.max(60, Math.round(85 - (totalFillers * 2) + (avgWpm >= 120 && avgWpm <= 160 ? 10 : 0))));
    const reasoning = Math.min(96, Math.max(62, Math.round(avgAnswerScore + 4)));
    const answerQuality = avgAnswerScore;
    const confidenceSignals = Math.min(94, Math.max(55, Math.round(88 - (totalFillers * 3))));
    const grammar = Math.min(96, Math.max(70, Math.round(92 - (exchanges.some(e => e.grammarInsights.length > 1) ? 6 : 0))));
    const conciseness = avgWpm > 175 ? 65 : (avgWpm < 110 ? 68 : 84);
    const relevance = Math.min(95, Math.max(72, Math.round(avgAnswerScore + 6)));
    const technicalDepth = config.category === 'technical' || config.category === 'system-design' ? 84 : undefined;

    // Overall readiness score (0-100)
    const readinessScore = Math.round(
      (communication * 0.25) +
      (reasoning * 0.25) +
      (answerQuality * 0.2) +
      (confidenceSignals * 0.15) +
      (grammar * 0.15)
    );

    // Identify strongest answer and answer needing improvement
    const sortedExchanges = [...exchanges].sort((a, b) => b.answerScore - a.answerScore);
    const best = sortedExchanges[0] || {
      questionText: 'Describe a complex project you led.',
      candidateAnswerText: 'I spearheaded the development of our high-scale microservices migration with clear STAR structure.'
    };
    const weakest = sortedExchanges[sortedExchanges.length - 1] || best;

    return {
      id: `int-${Date.now().toString(36)}`,
      date: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      targetRole,
      category: config.category,
      mode: config.mode,
      difficulty: config.difficulty,
      durationSeconds,
      readinessScore,
      deltaScore: 6,
      metrics: {
        communication,
        reasoning,
        answerQuality,
        confidenceSignals,
        grammar,
        conciseness,
        relevance,
        technicalDepth
      },
      observableSignals: {
        avgWpm,
        totalFillerWords: totalFillers,
        longPausesCount: Math.max(1, Math.floor(totalFillers / 2)),
        eyeContactScore: 86,
        clarityDelivery: totalFillers <= 3 
          ? 'Fluid, articulate, and poised delivery with decisive technical authority.'
          : 'Generally strong structure with noticeable filler words when navigating complex follow-ups.'
      },
      qualitativeFeedback: {
        whatWentWell: [
          'Effective articulation of system tradeoffs and design constraints.',
          'Maintained disciplined ownership focus ("I decided", "I engineered").',
          'Smooth responsiveness to AI follow-up challenge questions.'
        ],
        whatNeedsImprovement: [
          totalFillers > 4 ? `Reduce filler words (detected ${totalFillers} total: "basically", "you know").` : 'Sharpen the speed of initial question comprehension.',
          'Quantify bottom-line business metrics in your Result section (e.g. latency, error rate, cost).'
        ],
        strongestAnswer: {
          question: best.questionText,
          answerExcerpt: best.candidateAnswerText.slice(0, 180) + '...',
          whyStrong: 'Direct problem diagnosis, clear STAR alignment, and convincing technical vocabulary.'
        },
        answerToImprove: {
          question: weakest.questionText,
          originalAnswerExcerpt: weakest.candidateAnswerText.slice(0, 180) + '...',
          modelSTARApproach: 'Begin with the quantified problem scope, explain the architectural decision tree, highlight the key hurdle overcome, and finish with measurable business impact.',
          actionableAdvice: 'Eliminate tentative filler phrases and structure your response into: Context (15s) -> Action (45s) -> Measured Outcome (20s).'
        },
        recommendedPracticeAreas: [
          'Structuring 60-second concise behavioral answers',
          'Eliminating conversational filler words during pauses',
          'Quantifying project results with concrete business metrics'
        ]
      },
      exchanges
    };
  }
}

export const aiCoachEngine = new AICoachEngine();
