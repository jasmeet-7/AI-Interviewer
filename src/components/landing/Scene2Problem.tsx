import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  VolumeX, 
  TrendingDown, 
  HelpCircle, 
  Clock, 
  CheckCircle, 
  RefreshCcw
} from 'lucide-react';

export const Scene2Problem: React.FC = () => {
  const [selectedPainPoint, setSelectedPainPoint] = useState<number>(0);

  const painPoints = [
    {
      icon: <VolumeX className="w-5 h-5 text-rose-400" />,
      title: 'Freezing Under Pressure',
      subtitle: 'Knowing the solution in your head, but going blank the second the interviewer looks at you.',
      stat: '64%',
      statLabel: 'of candidates experience interview paralysis on behavioral or design questions.',
      solutionTip: 'SmartPrepration builds muscle memory through low-stakes voice repetitions so your mind remains calm.'
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      title: 'Speaking Too Fast & Rambling',
      subtitle: 'Rushing through answers at 180+ WPM without clear structure, leading to disjointed explanations.',
      stat: '72%',
      statLabel: 'of rejections cite lack of conciseness or structure rather than incorrect technical knowledge.',
      solutionTip: 'Our real-time pacing engine monitors your words-per-minute and coaches deliberate cadence.'
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-purple-400" />,
      title: 'Filler Words & Uncertainty Phrasing',
      subtitle: 'Relying on "basically", "you know", "I guess", and long awkward pauses when formulating thoughts.',
      stat: '58%',
      statLabel: 'of interviewers sub-consciously perceive frequent filler words as lack of domain mastery.',
      solutionTip: 'Detailed post-interview transcript markers pinpoint every hesitation qualifier for instant correction.'
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-cyan-400" />,
      title: 'Unpredictable Follow-Ups',
      subtitle: 'Practicing only static question lists, leaving you totally unprepared when an interviewer challenges your choices.',
      stat: '85%',
      statLabel: 'of senior interviews drill deep into "Why did you choose approach X over Y?".',
      solutionTip: 'SmartPrepration reasons directly over your spoken answer and generates contextual counter-questions.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-slate-900/30 dark:bg-black/30 border-y border-slate-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>THE INTERVIEW GAP</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            You may know the answer.{' '}
            <span className="text-rose-500 dark:text-rose-400">But can you deliver it under pressure?</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Most candidates fail not because of a lack of knowledge, but because traditional prep is passive. Reading answers is not the same as speaking them in real time.
          </p>
        </div>

        {/* Interactive Pain Point Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left List of Common Breakdown Points */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            {painPoints.map((item, idx) => {
              const isSelected = selectedPainPoint === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedPainPoint(idx)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'glass-panel border-cyan-500/50 bg-slate-800/80 dark:bg-white/10 shadow-lg shadow-cyan-500/10'
                      : 'bg-white/50 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                        {isSelected && (
                          <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                            Active Insight
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Live Breakdown Diagnostic Card */}
          <div className="lg:col-span-6 glass-panel-glow rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-cyan-500/30">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    DIAGNOSTIC IMPACT ANALYSIS
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-medium">
                  Issue #{selectedPainPoint + 1} of 4
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-rose-500 dark:text-rose-400">
                    {painPoints[selectedPainPoint].stat}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xs font-medium">
                    {painPoints[selectedPainPoint].statLabel}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                      HOW SMARTPREPRATION FIXES THIS
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {painPoints[selectedPainPoint].solutionTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Simulated with 12,000+ mock responses</span>
              <button
                onClick={() => setSelectedPainPoint((prev) => (prev + 1) % painPoints.length)}
                className="flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Next breakdown</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
