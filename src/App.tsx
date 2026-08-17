import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SceneBackground3D } from './components/three/SceneBackground3D';
import { Navbar } from './components/landing/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { InterviewRoom } from './components/interview/InterviewRoom';
import { ResultsReport } from './components/results/ResultsReport';
import { Dashboard } from './components/dashboard/Dashboard';
import { QuestionBank } from './components/dashboard/QuestionBank';
import { InterviewHistory } from './components/dashboard/InterviewHistory';
import { PrivacyCenter } from './components/dashboard/PrivacyCenter';

const MainAppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D Ambient Canvas Background */}
      <SceneBackground3D />

      {/* Global Navbar for non-interview views */}
      {currentView !== 'landing' && currentView !== 'interview' && <Navbar />}

      {/* Dynamic View Router */}
      <div className="flex-1 relative z-10">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'onboarding' && <OnboardingWizard />}
        {currentView === 'interview' && <InterviewRoom />}
        {currentView === 'results' && <ResultsReport />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'questions' && <QuestionBank />}
        {currentView === 'history' && <InterviewHistory />}
        {currentView === 'privacy' && <PrivacyCenter />}
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
};

export default App;
