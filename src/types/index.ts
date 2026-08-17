export type ThemeMode = 'dark' | 'light';
export type Currency = 'USD' | 'INR';
export type BillingPeriod = 'monthly' | 'yearly';

export type AppView = 
  | 'landing' 
  | 'onboarding' 
  | 'interview' 
  | 'results' 
  | 'dashboard' 
  | 'questions' 
  | 'history' 
  | 'pricing'
  | 'privacy';

export type ExperienceLevel = 'student' | 'entry' | 'mid' | 'senior' | 'lead' | 'executive';

export type InterviewCategory = 
  | 'behavioral' 
  | 'technical' 
  | 'system-design' 
  | 'hr' 
  | 'product-management' 
  | 'data-science' 
  | 'ai-ml' 
  | 'sales' 
  | 'case-study';

export type InterviewDifficulty = 'easy' | 'medium' | 'hard';

export type InterviewMode = 
  | 'real' 
  | 'practice' 
  | 'quick' 
  | 'voice-only' 
  | 'full-mock' 
  | 'resume-deepdive';

export type AIInterviewerState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'paused';

export interface CandidateProfile {
  name: string;
  email: string;
  experienceLevel: ExperienceLevel;
  currentStatus: string;
  targetRole: string;
  industry: string;
  targetCompany?: string;
  jobDescription?: string;
  resumeFileName?: string;
  resumeSummary?: string;
  extractedSkills: string[];
  strengths: string[];
  weaknesses: string[];
  interviewReadiness: number; // 0 - 100
  streakDays: number;
  totalInterviewsTaken: number;
}

export interface InterviewConfig {
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  durationMinutes: 10 | 20 | 30;
  mode: InterviewMode;
  cameraEnabled: boolean;
  micEnabled: boolean;
  enableHints: boolean;
  enableFollowUps: boolean;
}

export interface GrammarInsight {
  original: string;
  corrected: string;
  explanation: string;
}

export interface STARAnalysis {
  situationScore: number; // 0-100
  taskScore: number;
  actionScore: number;
  resultScore: number;
  clarityFeedback: string;
}

export interface InterviewExchange {
  id: string;
  questionNumber: number;
  questionText: string;
  category: InterviewCategory;
  candidateAnswerText: string;
  candidateAudioDurationSeconds: number;
  candidateWpm: number;
  fillerWordsCount: number;
  detectedFillerWords: string[];
  pausesCount: number;
  grammarInsights: GrammarInsight[];
  starAnalysis: STARAnalysis;
  answerScore: number; // 0 - 100
  aiFollowUpQuestion?: string;
  aiFollowUpReasoning?: string;
  candidateFollowUpAnswerText?: string;
  timestamp: string;
}

export interface InterviewSessionReport {
  id: string;
  date: string;
  targetRole: string;
  category: InterviewCategory;
  mode: InterviewMode;
  difficulty: InterviewDifficulty;
  durationSeconds: number;
  readinessScore: number; // 0 - 100
  deltaScore?: number; // e.g. +8 vs previous
  metrics: {
    communication: number; // 0 - 100
    reasoning: number;
    answerQuality: number;
    confidenceSignals: number;
    grammar: number;
    conciseness: number;
    relevance: number;
    technicalDepth?: number;
  };
  observableSignals: {
    avgWpm: number;
    totalFillerWords: number;
    longPausesCount: number;
    eyeContactScore: number;
    clarityDelivery: string;
  };
  qualitativeFeedback: {
    whatWentWell: string[];
    whatNeedsImprovement: string[];
    strongestAnswer: {
      question: string;
      answerExcerpt: string;
      whyStrong: string;
    };
    answerToImprove: {
      question: string;
      originalAnswerExcerpt: string;
      modelSTARApproach: string;
      actionableAdvice: string;
    };
    recommendedPracticeAreas: string[];
  };
  exchanges: InterviewExchange[];
}

export interface PracticeQuestion {
  id: string;
  title: string;
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  targetRoles: string[];
  topic: string;
  frequencyRating: number; // 1-5
  hints: string[];
  sampleStarAnswer: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  keyEvaluationCriteria: string[];
  isBookmarked?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  priceMonthlyUSD: number;
  priceYearlyUSD: number;
  priceMonthlyINR: number;
  priceYearlyINR: number;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}
