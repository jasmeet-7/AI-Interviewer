import React, { useState } from 'react';
import { 
  FileText, 
  Briefcase, 
  Sparkles, 
  CheckCircle, 
  Cpu, 
  ChevronRight
} from 'lucide-react';
import { SAMPLE_RESUME_PRESETS } from '../../services/mockData';

export const Scene6Personalization: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const currentPreset = SAMPLE_RESUME_PRESETS[selectedPresetIndex];

  const generatedQuestions = [
    [
      '“You mentioned architecting a distributed Redis cache at your previous company. What was your invalidation strategy during write bursts?”',
      '“How did you migrate your PostgreSQL monolith to microservices with zero downtime?”'
    ],
    [
      '“In your RAG pipeline project, how did you mitigate hallucinations when retrieving multi-document vector chunks?”',
      '“What latency optimization techniques did you use when deploying LLM inference on AWS SageMaker?”'
    ],
    [
      '“You mentioned launching a zero-to-one B2B SaaS product. How did you validate PMF and define the initial pricing tiers?”',
      '“Tell me about a time an A/B experiment failed. What data did you use to pivot the roadmap?”'
    ]
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-900/40 dark:bg-black/40 border-y border-slate-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>RESUME + JOB DESCRIPTION INTELLIGENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Zero generic questions.{' '}
            <span className="gradient-text-brand">Tailored to your exact background.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Upload your resume or paste a specific job description. SmartPrepration extracts your key projects, tech stack, and target seniority to conduct hyper-realistic interviews.
          </p>
        </div>

        {/* Interactive Preset Switcher */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {SAMPLE_RESUME_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPresetIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                selectedPresetIndex === idx
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-400 border-slate-200 dark:border-white/10 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{preset.role}</span>
            </button>
          ))}
        </div>

        {/* Interactive Resume Matching Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Extracted Candidate Intelligence */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10 mb-5">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {currentPreset.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {currentPreset.role} • {currentPreset.experience}
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  AI-Extracted Core Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentPreset.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-300 border border-slate-200 dark:border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Profile Synopsis
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/5">
                  {currentPreset.summary}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 flex items-center justify-between">
              <span>PDF & DOCX parsing supported</span>
              <span className="text-cyan-400 font-semibold flex items-center gap-1">
                AI Parsed <CheckCircle className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Center Connector Arrow on Desktop */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-2">AI Synthesis</span>
          </div>

          {/* Right: Dynamically Tailored Questions */}
          <div className="lg:col-span-5 glass-panel-glow rounded-3xl p-6 sm:p-7 border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  GENERATED RESUME-DEEPDIVE QUESTIONS
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Targeted
                </span>
              </div>

              <div className="space-y-4">
                {generatedQuestions[selectedPresetIndex].map((q, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-4 rounded-2xl bg-slate-900/60 dark:bg-black/60 border border-cyan-500/30 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed relative group"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold mt-0.5 shrink-0">
                        Q{qIdx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-500">Adapts during live conversation</span>
              <span className="text-cyan-400 font-semibold flex items-center gap-1">
                Context-Aware <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
