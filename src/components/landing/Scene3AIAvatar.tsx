import React, { useState } from 'react';
import { AIInterviewer3DAvatar } from '../three/AIInterviewer3DAvatar';
import type { AIInterviewerState } from '../../types';
import { 
  Ear, 
  Brain, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  MessageSquareCode
} from 'lucide-react';

export const Scene3AIAvatar: React.FC = () => {
  const [avatarState, setAvatarState] = useState<AIInterviewerState>('speaking');

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 3D AI Avatar Interactive Showcase */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            <div className="w-full glass-panel-glow rounded-3xl p-6 border border-cyan-500/30 overflow-hidden relative">
              
              {/* Top Avatar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-bold text-slate-800 dark:text-white tracking-wide">
                    3D AI INTERVIEWER ENGINE
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  WebGL 60 FPS
                </span>
              </div>

              {/* 3D Canvas Avatar Component */}
              <AIInterviewer3DAvatar 
                state={avatarState} 
                audioLevel={avatarState === 'listening' ? 0.75 : 0.2}
                avatarName="Dr. Evelyn Vance"
                avatarTitle="Principal AI Interview Coach"
              />

              {/* State Trigger Controls */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={() => setAvatarState('speaking')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    avatarState === 'speaking'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Speaking</span>
                </button>

                <button
                  onClick={() => setAvatarState('listening')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    avatarState === 'listening'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <Ear className="w-3.5 h-3.5" />
                  <span>Listening</span>
                </button>

                <button
                  onClick={() => setAvatarState('thinking')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    avatarState === 'thinking'
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>Thinking</span>
                </button>

                <button
                  onClick={() => setAvatarState('idle')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    avatarState === 'idle'
                      ? 'bg-slate-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Idle</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right: Vision & Differentiation */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide mb-4">
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>THE AI INTERVIEWER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              It doesn&apos;t just ask questions.{' '}
              <span className="gradient-text-brand">It listens.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Traditional mock interview sites act like random question flashcards. SmartPrepration is an active listener that understands technical nuance, tracks speech delivery, and adapts to your skill level in real time.
            </p>

            <div className="space-y-4 w-full">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Active Spoken Turn-Taking</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Speak naturally. When you finish, click &quot;I&apos;m Done&quot; or pause, and the interviewer immediately processes your reasoning without premature interruptions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Procedural 3D Presence</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Eye contact, mouth synchronization, attentive head tilts, and responsive audio visualizers create genuine conversational presence.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Contextual Memory</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Remembers what you stated 3 questions earlier to detect architectural contradictions or validate deep understanding.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
