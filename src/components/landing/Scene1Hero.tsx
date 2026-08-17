import React from 'react';
import { useApp } from '../../context/AppContext';
import { Hero3DCanvas } from '../three/Hero3DCanvas';
import { 
  Sparkles, 
  ArrowRight, 
  Mic, 
  BrainCircuit, 
  Play,
  Activity,
  ShieldCheck
} from 'lucide-react';

export const Scene1Hero: React.FC = () => {
  const { setView, startNewInterview } = useApp();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      
      {/* Soft Glow Background Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Top Brand Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-semibold tracking-wide mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEXT-GEN AI INTERVIEW COACH</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.12] tracking-tight mb-6">
              Smart interview preparation should feel{' '}
              <span className="gradient-text-brand">like the real thing.</span>
            </h1>

            {/* Sub-Headline & Core Philosophy */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
              Knowing the answer isn&apos;t enough. You need to communicate it like you&apos;re ready for the job. Practice with an interactive 3D AI interviewer that listens, challenges, and sharpens your delivery.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => setView('onboarding')}
                className="btn-primary px-7 py-3.5 text-base font-semibold shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2.5 group"
              >
                <span>Try Free Interview</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setView('questions')}
                className="btn-secondary px-6 py-3.5 text-base font-medium flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                <span>Explore Practice Questions</span>
              </button>
            </div>

            {/* Feature Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-white/10 w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Mic className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Spoken Voice + Camera</p>
                  <p className="text-slate-500 dark:text-slate-400">Natural conversation</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Adaptive Follow-ups</p>
                  <p className="text-slate-500 dark:text-slate-400">Deep answer reasoning</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Privacy First</p>
                  <p className="text-slate-500 dark:text-slate-400">No forced recordings</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Floating 3D Interactive Mock Studio */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            
            {/* 3D Canvas Container with Glass Frame */}
            <div className="w-full relative glass-panel-glow rounded-3xl p-3 border border-slate-200/60 dark:border-white/15 overflow-hidden">
              
              {/* Top Studio Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    AI Mock Studio • Live Preview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <Activity className="w-2.5 h-2.5 animate-pulse" /> 3D ACTIVE
                  </span>
                </div>
              </div>

              {/* Interactive 3D Canvas */}
              <div className="relative w-full h-[360px] sm:h-[420px] bg-gradient-to-b from-[#0F172A]/40 to-[#0B0F17]/80 rounded-b-2xl overflow-hidden flex items-center justify-center">
                <Hero3DCanvas />

                {/* Floating Quick Action Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 glass-panel rounded-xl border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Mic className="w-4 h-4 animate-bounce" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">Live Voice Simulation</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-300">Interactive mouse parallax enabled</p>
                    </div>
                  </div>
                  <button
                    onClick={() => startNewInterview()}
                    className="px-3 py-1.5 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors shadow-md"
                  >
                    Launch Studio
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
