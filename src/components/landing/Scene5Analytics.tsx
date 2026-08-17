import React from 'react';
import { 
  Gauge, 
  Activity, 
  MessageSquareCheck, 
  Sliders, 
  Zap
} from 'lucide-react';

export const Scene5Analytics: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Gauge className="w-3.5 h-3.5" />
            <span>OBJECTIVE DELIVERY METRICS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Actionable communication signals,{' '}
            <span className="gradient-text-emerald">not subjective guesses.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            We never make vague psychological claims like &quot;You looked nervous.&quot; Instead, SmartPrepration measures concrete, observable vocal and structural data you can actually improve.
          </p>
        </div>

        {/* Analytics Interactive Dashboard Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Speaking Pace (WPM) */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Speaking Pace
                </span>
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Activity className="w-4 h-4" />
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">138</span>
                <span className="text-xs font-semibold text-emerald-400">WPM (Optimal)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Ideal range for technical explanations is 125–150 WPM.
              </p>

              {/* Progress Track */}
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative mb-2">
                <div className="absolute left-[35%] w-[40%] h-full bg-emerald-500/30" />
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '55%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Slow (90)</span>
                <span className="text-emerald-400 font-semibold">Target (140)</span>
                <span>Fast (190)</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
              ✓ Cadence remained consistent during complex system explanations.
            </div>
          </div>

          {/* Card 2: Filler Words Counter */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Filler Words
                </span>
                <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <MessageSquareCheck className="w-4 h-4" />
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">4</span>
                <span className="text-xs font-semibold text-cyan-400">Low Frequency</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Detected across a 15-minute mock interview session.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className="px-2 py-0.5 rounded text-[11px] bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono">
                  &quot;basically&quot; (2x)
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono">
                  &quot;you know&quot; (1x)
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] bg-slate-700 text-slate-300 text-[10px]">
                  &quot;um&quot; (1x)
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
              ✓ -62% reduction in filler words compared to Session #1.
            </div>
          </div>

          {/* Card 3: STAR Structure Score */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-indigo-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  STAR Alignment
                </span>
                <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Sliders className="w-4 h-4" />
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">88%</span>
                <span className="text-xs font-semibold text-indigo-400">High Adherence</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Situation (15%) • Task (15%) • Action (50%) • Result (20%)
              </p>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Action Depth</span>
                  <span className="font-semibold text-emerald-400">92%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Quantified Result</span>
                  <span className="font-semibold text-amber-400">76%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
              💡 Tip: Always include numbers in your final Result segment.
            </div>
          </div>

          {/* Card 4: Non-Interruptive Grammar Polish */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-purple-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Executive Phrasing
                </span>
                <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Zap className="w-4 h-4" />
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">92</span>
                <span className="text-xs font-semibold text-purple-400">Clarity Rating</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Analyzed without stopping or interrupting your speech.
              </p>

              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-200">
                <span className="line-through text-slate-400">&quot;Me and my team did...&quot;</span>
                <br />
                <span className="text-emerald-400 font-bold">→ &quot;My team and I delivered...&quot;</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
              ✓ Active voice strengthens perceived leadership authority.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
