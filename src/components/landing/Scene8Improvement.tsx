import React from 'react';
import { 
  TrendingUp
} from 'lucide-react';

export const Scene8Improvement: React.FC = () => {
  const sessionTimeline = [
    {
      session: 'Session 01',
      date: 'Day 1',
      score: 68,
      wpm: 165,
      fillers: 18,
      keyMilestone: 'Baseline established: Identified rapid speech pace and frequent "basically" crutches.'
    },
    {
      session: 'Session 02',
      date: 'Day 3',
      score: 71,
      wpm: 155,
      fillers: 14,
      keyMilestone: 'Adopted structured STAR framework for behavioral questions.'
    },
    {
      session: 'Session 03',
      date: 'Day 6',
      score: 74,
      wpm: 148,
      fillers: 10,
      keyMilestone: 'Significantly improved system architecture trade-off articulation.'
    },
    {
      session: 'Session 04',
      date: 'Day 9',
      score: 76,
      wpm: 142,
      fillers: 7,
      keyMilestone: 'Mastered live follow-up challenges under unexpected edge cases.'
    },
    {
      session: 'Session 05',
      date: 'Day 12',
      score: 82,
      wpm: 138,
      fillers: 4,
      keyMilestone: 'Interview Ready: Concise, executive phrasing and high confidence delivery.'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-900/40 dark:bg-black/40 border-y border-slate-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>PROGRESSION OVER TIME</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Practice isn&apos;t about repeating questions.{' '}
            <span className="gradient-text-brand">It&apos;s about becoming better at answering them.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            See your transformation across successive sessions. Every interview refines your pacing, eliminates filler words, and elevates your readiness.
          </p>
        </div>

        {/* Timeline Progression Curve */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {sessionTimeline.map((item, idx) => {
            const isLast = idx === sessionTimeline.length - 1;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-200 ${
                  isLast
                    ? 'glass-panel-glow border-cyan-500/50 bg-slate-800/80 dark:bg-cyan-950/30 scale-105 shadow-xl'
                    : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      {item.session}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-3xl font-black ${isLast ? 'text-cyan-400' : 'text-slate-800 dark:text-white'}`}>
                      {item.score}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">/100</span>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 mb-4">
                    <p>Pace: <span className="text-slate-300 font-medium">{item.wpm} WPM</span></p>
                    <p>Fillers: <span className="text-slate-300 font-medium">{item.fillers} words</span></p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {item.keyMilestone}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
