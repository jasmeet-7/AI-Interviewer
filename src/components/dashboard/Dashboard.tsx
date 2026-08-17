import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, 
  Flame, 
  Target, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Play, 
  AlertTriangle, 
  BookOpen, 
  History, 
  Plus
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    profile, 
    history, 
    setActiveReport, 
    setView, 
    startNewInterview 
  } = useApp();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Welcome & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Candidate Performance Center
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-medium">Welcome back, {profile.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Interview Readiness Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Targeting: <strong className="text-slate-800 dark:text-slate-200">{profile.targetRole}</strong> ({profile.industry})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => startNewInterview()}
            className="btn-primary px-5 py-2.5 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/25 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Start New Mock Interview</span>
          </button>
        </div>
      </div>

      {/* TOP METRICS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Metric 1: Readiness Score */}
        <div className="glass-panel-glow rounded-2xl p-6 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Readiness Score</span>
              <Trophy className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                {profile.interviewReadiness}
              </span>
              <span className="text-xs font-bold text-slate-500">/100</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> +10 pts over 5 sessions
          </div>
        </div>

        {/* Metric 2: Practice Streak */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Streak</span>
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-amber-500">
                {profile.streakDays}
              </span>
              <span className="text-xs font-bold text-slate-500">Days Active</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500">
            Keep it going with 1 quick practice today!
          </div>
        </div>

        {/* Metric 3: Total Interviews Completed */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Interviews Taken</span>
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                {profile.totalInterviewsTaken}
              </span>
              <span className="text-xs font-bold text-slate-500">Sessions</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500">
            5 Domains Practiced (SWE, System Design)
          </div>
        </div>

        {/* Metric 4: Primary Focus Weakness */}
        <div className="glass-panel rounded-2xl p-6 border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Top Focus Area</span>
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Conciseness & Filler Reduction
            </p>
          </div>
          <button
            onClick={() => startNewInterview({ mode: 'practice' })}
            className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1"
          >
            <span>Launch Targeted Drill</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* MAIN TWO-COLUMN DASHBOARD SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Left Column: Recent Interview Sessions */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Mock Interviews
              </h3>
            </div>
            <button
              onClick={() => setView('history')}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              View All History
            </button>
          </div>

          <div className="space-y-4">
            {history.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveReport(item);
                  setView('results');
                }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono text-sm group-hover:scale-105 transition-transform">
                    {item.readinessScore}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                      {item.targetRole}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.category.toUpperCase()} • {item.date} • {Math.round(item.durationSeconds / 60)} mins
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                    <span>Coaching Report</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recommended Daily Practice Drills */}
        <div className="lg:col-span-5 glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  AI Recommended Drills
                </h3>
              </div>
              <span className="text-[11px] text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Personalized
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  STAR Method Storytelling Drill
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                  Structure your 60-second answers into Situation, Task, Action, and Quantified Result.
                </p>
                <button
                  onClick={() => startNewInterview({ mode: 'practice', category: 'behavioral' })}
                  className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" /> Start Behavioral Drill
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Distributed System Scalability Challenge
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                  Practice explaining cache invalidation, CRDTs, and partition recovery under pressure.
                </p>
                <button
                  onClick={() => startNewInterview({ mode: 'practice', category: 'system-design' })}
                  className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" /> Start System Design Drill
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={() => setView('questions')}
              className="btn-secondary w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore All Practice Questions</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
