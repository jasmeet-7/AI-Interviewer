import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { HISTORICAL_INTERVIEWS } from '../../services/mockData';
import confetti from 'canvas-confetti';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Download, 
  ArrowRight, 
  RotateCcw, 
  Star,
  Check,
  LayoutDashboard
} from 'lucide-react';

export const ResultsReport: React.FC = () => {
  const { activeReport, setView, startNewInterview } = useApp();
  const report = activeReport || HISTORICAL_INTERVIEWS[0];

  useEffect(() => {
    // Trigger celebration confetti if readiness >= 75
    if (report.readinessScore >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [report.readinessScore]);

  const skillBars = [
    { label: 'Communication Delivery', score: report.metrics.communication, color: 'from-cyan-400 to-blue-500' },
    { label: 'Reasoning & Architecture', score: report.metrics.reasoning, color: 'from-indigo-400 to-purple-500' },
    { label: 'Answer Quality (STAR)', score: report.metrics.answerQuality, color: 'from-emerald-400 to-teal-500' },
    { label: 'Observable Confidence Signals', score: report.metrics.confidenceSignals, color: 'from-amber-400 to-orange-500' },
    { label: 'Executive Grammar & Tone', score: report.metrics.grammar, color: 'from-blue-400 to-indigo-500' },
    { label: 'Conciseness & Cadence', score: report.metrics.conciseness, color: 'from-rose-400 to-pink-500' },
    { label: 'Question Relevance', score: report.metrics.relevance, color: 'from-teal-400 to-cyan-500' }
  ];

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              MOCK SESSION COMPLETED
            </span>
            <span className="text-xs text-slate-500 font-mono">{report.date}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Interview Readiness Coaching Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Target Role: <strong className="text-slate-800 dark:text-slate-200">{report.targetRole}</strong> • {report.category.toUpperCase()} ({report.difficulty.toUpperCase()})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPDF}
            className="btn-secondary px-4 py-2.5 text-xs font-semibold flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download Report PDF</span>
          </button>

          <button
            onClick={() => setView('dashboard')}
            className="btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </button>
        </div>
      </div>

      {/* READINESS GAUGE & OVERVIEW CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Big Overall Score Card */}
        <div className="lg:col-span-5 glass-panel-glow rounded-3xl p-8 border border-cyan-500/40 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-3">
            OVERALL INTERVIEW READINESS
          </span>

          <div className="my-2 flex items-baseline justify-center">
            <span className="text-7xl sm:text-8xl font-black text-slate-900 dark:text-white tracking-tight">
              {report.readinessScore}
            </span>
            <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">/100</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>+{report.deltaScore || 8} pts vs Previous Interview</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">
            {report.observableSignals.clarityDelivery}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 w-full pt-6 mt-6 border-t border-slate-200 dark:border-white/10 text-center">
            <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Avg Pace</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{report.observableSignals.avgWpm} WPM</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Fillers</p>
              <p className="text-sm font-bold text-cyan-400">{report.observableSignals.totalFillerWords} detected</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Eye Presence</p>
              <p className="text-sm font-bold text-emerald-400">{report.observableSignals.eyeContactScore}%</p>
            </div>
          </div>
        </div>

        {/* Right Skill Dimension Breakdown */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Dimensional Skill Performance
            </h3>
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              STAR & Acoustic Evaluation
            </span>
          </div>

          <div className="space-y-4">
            {skillBars.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.score} / 100</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 flex items-center justify-between">
            <span>Benchmark: Top 15% in Senior Engineering Cohort</span>
            <span className="text-cyan-400 font-semibold">Evaluated via AI Coach Engine</span>
          </div>
        </div>

      </div>

      {/* QUALITATIVE FEEDBACK: WHAT WENT WELL VS NEEDS IMPROVEMENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
        {/* What Went Well */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10 mb-5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              What You Did Well (Specific Evidence)
            </h3>
          </div>

          <ul className="space-y-3.5">
            {report.qualitativeFeedback.whatWentWell.map((pt, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What Needs Improvement */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10 mb-5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Areas to Polish Before Real Interview
            </h3>
          </div>

          <ul className="space-y-3.5">
            {report.qualitativeFeedback.whatNeedsImprovement.map((pt, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* STRONGEST ANSWER VS MODEL STAR REWRITE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* Strongest Answer */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
            <Star className="w-4 h-4" />
            <span>STRONGEST ANSWER HIGHLIGHT</span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
            &quot;{report.qualitativeFeedback.strongestAnswer.question}&quot;
          </h4>

          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic mb-4">
            &quot;{report.qualitativeFeedback.strongestAnswer.answerExcerpt}&quot;
          </div>

          <p className="text-xs text-emerald-400 font-medium">
            ✓ <strong>Why it worked:</strong> {report.qualitativeFeedback.strongestAnswer.whyStrong}
          </p>
        </div>

        {/* Answer to Improve + Model Rewrite */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-indigo-500/40">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">
            <RotateCcw className="w-4 h-4" />
            <span>MODEL STAR REFRAME RECOMMENDATION</span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
            &quot;{report.qualitativeFeedback.answerToImprove.question}&quot;
          </h4>

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs sm:text-sm text-indigo-100 mb-4 leading-relaxed">
            <strong className="text-cyan-300 block mb-1">Recommended Phrasing:</strong>
            &quot;{report.qualitativeFeedback.answerToImprove.modelSTARApproach}&quot;
          </div>

          <p className="text-xs text-slate-400">
            💡 <strong>Actionable Tip:</strong> {report.qualitativeFeedback.answerToImprove.actionableAdvice}
          </p>
        </div>

      </div>

      {/* RECOMMENDED PRACTICE ACTION BANNER */}
      <div className="glass-panel-glow rounded-3xl p-8 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Ready to drill your weak areas?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Launch a 1-question quick practice session targeting: <strong>Concise STAR Result Delivery</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => startNewInterview({ mode: 'practice' })}
            className="btn-primary px-6 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>Practice Weakness Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
