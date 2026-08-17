import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Calendar, 
  ArrowRight, 
  Plus
} from 'lucide-react';

export const InterviewHistory: React.FC = () => {
  const { history, setActiveReport, setView, startNewInterview } = useApp();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => setView('dashboard')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Interview History Archive
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Review detailed transcripts, STAR breakdowns, and progression across all your completed sessions.
          </p>
        </div>

        <button
          onClick={() => startNewInterview()}
          className="btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Start New Interview</span>
        </button>
      </div>

      <div className="space-y-4">
        {history.map((session) => (
          <div
            key={session.id}
            onClick={() => {
              setActiveReport(session);
              setView('results');
            }}
            className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex flex-col items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
                <span className="text-xl font-black">{session.readinessScore}</span>
                <span className="text-[9px] text-slate-400 uppercase font-mono">Score</span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                    {session.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 capitalize">
                    {session.mode} Mode
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {session.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                  {session.targetRole}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {session.qualitativeFeedback.whatWentWell[0]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-white/10 justify-between sm:justify-end">
              <div className="text-left sm:text-right text-xs text-slate-400">
                <p className="font-semibold text-slate-300">{Math.round(session.durationSeconds / 60)} Mins</p>
                <p className="text-[11px] text-slate-500">{session.observableSignals.avgWpm} WPM Avg</p>
              </div>

              <span className="btn-secondary px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                <span>View Full Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
