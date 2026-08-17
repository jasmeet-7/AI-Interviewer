import React from 'react';
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  FileCheck
} from 'lucide-react';

export const Scene7ReadinessPreview: React.FC = () => {
  const scoreDimensions = [
    { label: 'Communication & Delivery', score: 82, color: 'from-cyan-400 to-blue-500' },
    { label: 'Reasoning & Architecture', score: 84, color: 'from-indigo-400 to-purple-500' },
    { label: 'Answer Quality (STAR)', score: 79, color: 'from-emerald-400 to-teal-500' },
    { label: 'Observable Confidence Signals', score: 71, color: 'from-amber-400 to-orange-500' },
    { label: 'Grammar & Tone Clarity', score: 88, color: 'from-blue-400 to-indigo-500' },
    { label: 'Conciseness & Pacing', score: 68, color: 'from-rose-400 to-pink-500' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>INTERVIEW READINESS BENCHMARK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Walk into your interview knowing{' '}
            <span className="gradient-text-brand">your exact readiness.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            At the end of every mock session, SmartPrepration compiles a comprehensive, multi-dimensional coaching report with actionable suggestions.
          </p>
        </div>

        {/* Cinematic Report Dashboard Preview */}
        <div className="max-w-5xl mx-auto glass-panel-glow rounded-3xl p-6 sm:p-10 border border-cyan-500/40 relative">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Top Report Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10 gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Mock Session Coaching Report #005
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Senior Full-Stack Engineer • 20m Technical Simulation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> +10 pts vs Session 01
              </span>
            </div>
          </div>

          {/* Core Score & Dimensional Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Big Score Gauge Card */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-slate-900/60 border border-cyan-500/30 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
                INTERVIEW READINESS
              </span>

              <div className="relative my-4 flex items-center justify-center">
                {/* Score Number Display */}
                <div className="flex items-baseline justify-center">
                  <span className="text-6xl sm:text-7xl font-black text-white tracking-tight">
                    78
                  </span>
                  <span className="text-2xl font-bold text-slate-500">/100</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40">
                <Award className="w-3.5 h-3.5" /> Top 15% Candidate Cohort
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                Ready for Tier-1 Technical rounds with minor polish needed on conciseness.
              </p>
            </div>

            {/* Right Multi-Dimensional Skill Bars */}
            <div className="lg:col-span-8 space-y-4">
              {scoreDimensions.map((dim, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {dim.label}
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {dim.score} / 100
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${dim.color} transition-all duration-700`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
