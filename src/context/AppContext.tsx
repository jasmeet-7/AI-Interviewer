import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  AppView, 
  ThemeMode, 
  Currency, 
  BillingPeriod, 
  CandidateProfile, 
  InterviewConfig, 
  InterviewSessionReport, 
  PracticeQuestion 
} from '../types';
import { 
  DEFAULT_CANDIDATE_PROFILE, 
  HISTORICAL_INTERVIEWS
} from '../services/mockData';

interface AppContextType {
  currentView: AppView;
  setView: (view: AppView) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  billingPeriod: BillingPeriod;
  setBillingPeriod: (b: BillingPeriod) => void;
  profile: CandidateProfile;
  updateProfile: (updates: Partial<CandidateProfile>) => void;
  interviewConfig: InterviewConfig;
  updateInterviewConfig: (updates: Partial<InterviewConfig>) => void;
  activeReport: InterviewSessionReport | null;
  setActiveReport: (report: InterviewSessionReport | null) => void;
  history: InterviewSessionReport[];
  bookmarkedQuestionIds: string[];
  toggleBookmark: (questionId: string) => void;
  startNewInterview: (customConfig?: Partial<InterviewConfig>) => void;
  startQuestionPractice: (question: PracticeQuestion) => void;
  completeInterviewAndShowReport: (report: InterviewSessionReport) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setView] = useState<AppView>('landing');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('yearly');
  
  const [profile, setProfile] = useState<CandidateProfile>(DEFAULT_CANDIDATE_PROFILE);
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig>({
    category: 'technical',
    difficulty: 'medium',
    durationMinutes: 20,
    mode: 'full-mock',
    cameraEnabled: true,
    micEnabled: true,
    enableHints: true,
    enableFollowUps: true
  });

  const [history, setHistory] = useState<InterviewSessionReport[]>(HISTORICAL_INTERVIEWS);
  const [activeReport, setActiveReport] = useState<InterviewSessionReport | null>(HISTORICAL_INTERVIEWS[0] || null);
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>(['pq-1', 'pq-2']);

  // Sync theme with HTML document class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const updateProfile = (updates: Partial<CandidateProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateInterviewConfig = (updates: Partial<InterviewConfig>) => {
    setInterviewConfig(prev => ({ ...prev, ...updates }));
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarkedQuestionIds(prev => 
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  const startNewInterview = (customConfig?: Partial<InterviewConfig>) => {
    if (customConfig) {
      setInterviewConfig(prev => ({ ...prev, ...customConfig }));
    }
    setView('interview');
  };

  const startQuestionPractice = (question: PracticeQuestion) => {
    setInterviewConfig(prev => ({
      ...prev,
      category: question.category,
      difficulty: question.difficulty,
      mode: 'practice'
    }));
    setView('interview');
  };

  const completeInterviewAndShowReport = (report: InterviewSessionReport) => {
    setActiveReport(report);
    setHistory(prev => [report, ...prev]);
    // Update candidate profile readiness score and streak
    setProfile(prev => ({
      ...prev,
      interviewReadiness: report.readinessScore,
      totalInterviewsTaken: prev.totalInterviewsTaken + 1
    }));
    setView('results');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setView,
        theme,
        toggleTheme,
        currency,
        setCurrency,
        billingPeriod,
        setBillingPeriod,
        profile,
        updateProfile,
        interviewConfig,
        updateInterviewConfig,
        activeReport,
        setActiveReport,
        history,
        bookmarkedQuestionIds,
        toggleBookmark,
        startNewInterview,
        startQuestionPractice,
        completeInterviewAndShowReport
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
