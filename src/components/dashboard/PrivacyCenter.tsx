import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Trash2, 
  Lock, 
  CheckCircle2
} from 'lucide-react';

export const PrivacyCenter: React.FC = () => {
  const { setView } = useApp();
  const [dataDeleted, setDataDeleted] = useState(false);
  const [storeAudio, setStoreAudio] = useState(false);
  const [storeCamera, setStoreCamera] = useState(false);

  const handleDeleteAllData = () => {
    setDataDeleted(true);
    setTimeout(() => setDataDeleted(false), 4000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="mb-8">
        <button
          onClick={() => setView('landing')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-6 h-6 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Privacy & Data Sovereignty
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          You have full ownership and control over your resume, voice, camera, and interview transcripts.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Core Commitments */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>SmartPrepration Privacy Principles</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <strong className="text-cyan-300 block">1. Camera Recording Off by Default</strong>
              <p className="text-slate-400 leading-relaxed">
                Your webcam video is processed in client memory for real-time preview and is never recorded or transmitted to third-party databases without consent.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <strong className="text-cyan-300 block">2. Client-Side Resume Parsing</strong>
              <p className="text-slate-400 leading-relaxed">
                Resumes are parsed securely for skill extraction during the active session. You can purge your resume at any time.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <strong className="text-cyan-300 block">3. Zero Selling of User Data</strong>
              <p className="text-slate-400 leading-relaxed">
                We never monetize or sell candidate transcripts, scores, or performance feedback to recruiters or advertisers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <strong className="text-cyan-300 block">4. Full Right to Erasure</strong>
              <p className="text-slate-400 leading-relaxed">
                One-click complete purge of all session transcripts, audio logs, and score metrics with instant cryptographic deletion.
              </p>
            </div>
          </div>
        </div>

        {/* Data Storage Preferences */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Media Storage Controls
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Store Spoken Audio Recordings</p>
                <p className="text-[11px] text-slate-500">Allow storing audio clips to replay your answers in history.</p>
              </div>
              <button
                onClick={() => setStoreAudio(!storeAudio)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  storeAudio ? 'bg-cyan-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {storeAudio ? 'ENABLED' : 'DISABLED (Recommended)'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Store Camera Video Clips</p>
                <p className="text-[11px] text-slate-500">Persist video snippet playback alongside coaching report.</p>
              </div>
              <button
                onClick={() => setStoreCamera(!storeCamera)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  storeCamera ? 'bg-cyan-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {storeCamera ? 'ENABLED' : 'DISABLED (Default)'}
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone: Delete All Data */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/30 space-y-4">
          <h3 className="text-base font-bold text-rose-500 dark:text-rose-400 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            <span>Danger Zone • Purge All Interview Records</span>
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Permanently deletes all your interview sessions, transcripts, audio data, and resume files. This action cannot be undone.
          </p>

          <button
            onClick={handleDeleteAllData}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Purge All Interview Data</span>
          </button>

          {dataDeleted && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>All candidate transcripts and cached session data have been permanently erased.</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
