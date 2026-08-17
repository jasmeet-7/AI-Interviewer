import React, { useState } from 'react';
import { 
  GitBranch, 
  Bot, 
  User, 
  Sparkles, 
  Lightbulb, 
  ArrowRight
} from 'lucide-react';

export const Scene4FollowUpDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const conversationSteps = [
    {
      step: 1,
      speaker: 'ai',
      text: 'Tell me about a difficult technical problem you solved in your recent role.',
      badge: 'Core Question'
    },
    {
      step: 2,
      speaker: 'candidate',
      text: 'Our analytics dashboard had a 4-second latency spike during high traffic. I solved it by caching the aggregate queries with a Redis cluster and tuning the PostgreSQL indexes.',
      badge: 'Candidate Answer (Context Stated)'
    },
    {
      step: 3,
      speaker: 'ai',
      text: 'Why did you choose Redis over in-memory application caching like Memcached or Node local cache, and how did you handle cache invalidation on write bursts?',
      badge: 'Intelligent Follow-Up #1 (Probing Trade-offs)',
      isHighlight: true
    },
    {
      step: 4,
      speaker: 'candidate',
      text: 'We had multiple stateless backend replicas, so local memory would lead to stale inconsistent counts. We used Redis with a write-through invalidation bus via RabbitMQ.',
      badge: 'Candidate Clarification'
    },
    {
      step: 5,
      speaker: 'ai',
      text: 'What would happen to your primary database if that Redis cluster experienced a cold cache restart under peak load, and how would you protect it?',
      badge: 'Intelligent Follow-Up #2 (Resilience & Chaos Engineering)',
      isHighlight: true
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-900/40 dark:bg-black/40 border-y border-slate-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <GitBranch className="w-3.5 h-3.5" />
            <span>DEEP CONVERSATIONAL REASONING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Real interviewers don&apos;t move to the next question.{' '}
            <span className="gradient-text-brand">They probe deeper.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            SmartPrepration analyzes the technical choices mentioned in your answer and immediately tests your architectural reasoning with contextual follow-ups.
          </p>
        </div>

        {/* Interactive Dynamic Tree Card */}
        <div className="max-w-4xl mx-auto glass-panel-glow rounded-3xl p-6 sm:p-8 border border-indigo-500/30">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-6">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                LIVE INTERACTIVE FOLLOW-UP SIMULATION
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <span>Step {activeStep} of 5</span>
            </div>
          </div>

          {/* Stepper Dialogue Bubbles */}
          <div className="space-y-4 mb-8">
            {conversationSteps.slice(0, activeStep).map((item, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  item.speaker === 'ai'
                    ? item.isHighlight
                      ? 'bg-gradient-to-r from-indigo-950/70 to-blue-950/60 border border-indigo-500/40 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10'
                    : 'bg-cyan-500/10 border border-cyan-500/20 text-slate-800 dark:text-slate-200 ml-4 sm:ml-8'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    item.speaker === 'ai' 
                      ? 'bg-indigo-500/20 text-indigo-400' 
                      : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {item.speaker === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                      <span className="text-xs font-bold tracking-wide uppercase text-slate-400">
                        {item.speaker === 'ai' ? 'Dr. Evelyn Vance (AI Interviewer)' : 'Candidate (You)'}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        item.isHighlight
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-white/10'
                      }`}>
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed font-medium">
                      &quot;{item.text}&quot;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Step Progress Controller */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {activeStep === 5 ? 'All follow-up stages demonstrated.' : 'Click next step to see how the AI probes candidate depth.'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={activeStep <= 1}
                onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200/50 dark:bg-white/5 text-slate-400 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
              >
                Previous
              </button>

              <button
                disabled={activeStep >= conversationSteps.length}
                onClick={() => setActiveStep(prev => Math.min(conversationSteps.length, prev + 1))}
                className="btn-primary px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
              >
                <span>Continue Dialogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
