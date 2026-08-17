import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setView } = useApp();

  return (
    <footer className="bg-[#070A0F] text-slate-400 border-t border-slate-200/40 dark:border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/20 dark:border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => setView('landing')} 
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-white tracking-tight">
                  SmartPrepration
                </span>
                <span className="text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">
                  Learn. Practice. Execute.
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The AI-powered mock interview studio that helps you become genuinely interview-ready through realistic 3D voice simulation, follow-ups, and actionable coaching.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Coaching Systems Fully Operational</span>
            </div>
          </div>

          {/* Navigation Col 1: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setView('onboarding')} className="hover:text-cyan-400 transition-colors">
                  AI Mock Interview
                </button>
              </li>
              <li>
                <button onClick={() => setView('questions')} className="hover:text-cyan-400 transition-colors">
                  Practice Question Bank
                </button>
              </li>
              <li>
                <button onClick={() => setView('dashboard')} className="hover:text-cyan-400 transition-colors">
                  Performance Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => { setView('landing'); setTimeout(() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-cyan-400 transition-colors">
                  Pricing & Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Col 2: Interview Types */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Interview Domains
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setView('questions')} className="hover:text-cyan-400 transition-colors">
                  Behavioral (STAR)
                </button>
              </li>
              <li>
                <button onClick={() => setView('questions')} className="hover:text-cyan-400 transition-colors">
                  System Design & Scale
                </button>
              </li>
              <li>
                <button onClick={() => setView('questions')} className="hover:text-cyan-400 transition-colors">
                  Frontend & Full-Stack
                </button>
              </li>
              <li>
                <button onClick={() => setView('questions')} className="hover:text-cyan-400 transition-colors">
                  Product Management
                </button>
              </li>
              <li>
                <button onClick={() => setView('questions')} className="hover:text-cyan-400 transition-colors">
                  AI & Machine Learning
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Col 3: Privacy & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Privacy & Trust
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setView('privacy')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Privacy Center</span>
                </button>
              </li>
              <li>
                <span className="text-slate-400">Camera Off By Default</span>
              </li>
              <li>
                <span className="text-slate-400">Zero Unconsented Recordings</span>
              </li>
              <li>
                <span className="text-slate-400">1-Click Data Deletion</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SmartPrepration. All rights reserved. &quot;Become interview-ready.&quot;</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setView('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setView('privacy')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => setView('privacy')} className="hover:text-white transition-colors">
              Security
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
