import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { AIInterviewer3DAvatar } from '../three/AIInterviewer3DAvatar';
import { speechService } from '../../services/speechService';
import { aiCoachEngine } from '../../services/aiCoachEngine';
import { PRACTICE_QUESTIONS } from '../../services/mockData';
import type { 
  AIInterviewerState, 
  InterviewExchange 
} from '../../types';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  LogOut 
} from 'lucide-react';

export const InterviewRoom: React.FC = () => {
  const { 
    interviewConfig, 
    profile, 
    completeInterviewAndShowReport 
  } = useApp();

  // Interview Questions Set based on category
  const relevantQuestions = PRACTICE_QUESTIONS.filter(
    q => q.category === interviewConfig.category || q.category === 'behavioral'
  );
  const questionsList = relevantQuestions.length > 0 ? relevantQuestions : PRACTICE_QUESTIONS;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestion = questionsList[currentQuestionIndex] || questionsList[0];

  // AI & Voice State
  const [aiState, setAiState] = useState<AIInterviewerState>('speaking');
  const [voiceMuted, setVoiceMuted] = useState<boolean>(false);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(interviewConfig.cameraEnabled);
  const [micEnabled, setMicEnabled] = useState<boolean>(interviewConfig.micEnabled);
  const [activeSpeechSubtitle, setActiveSpeechSubtitle] = useState<string>('');

  // Candidate Spoken Transcript & Recording State
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [answerStartTime, setAnswerStartTime] = useState<number>(0);
  const [sessionExchanges, setSessionExchanges] = useState<InterviewExchange[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isFollowUpActive, setIsFollowUpActive] = useState<boolean>(false);
  const [activeFollowUpQuestion, setActiveFollowUpQuestion] = useState<string>('');

  // UI Drawers & Audio Levels
  const [hintsOpen, setHintsOpen] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0.2);
  const [manualTextMode, setManualTextMode] = useState<boolean>(false);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);

  // Video Ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  // Initialize Camera Feed
  useEffect(() => {
    if (cameraEnabled) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          cameraStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          console.warn('Camera feed simulated in interview room');
        });
    }

    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [cameraEnabled]);

  // Elapsed Session Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Elapsed Time MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 1. Initial AI Question Delivery
  useEffect(() => {
    speakQuestion(currentQuestion.title);
  }, [currentQuestionIndex]);

  const speakQuestion = (text: string) => {
    setActiveSpeechSubtitle(text);
    setAiState('speaking');

    if (!voiceMuted && speechService.isSpeechSynthesisSupported()) {
      speechService.speakText(
        text,
        () => setAiState('speaking'),
        () => {
          // AI finishes speaking -> Now listens for candidate answer
          setAiState('listening');
          startCandidateListening();
        },
        () => {
          setAiState('listening');
          startCandidateListening();
        }
      );
    } else {
      // If voice muted, transition after brief simulated reading delay
      const timeout = setTimeout(() => {
        setAiState('listening');
        startCandidateListening();
      }, 3500);
      return () => clearTimeout(timeout);
    }
  };

  // Start recording / listening to candidate
  const startCandidateListening = () => {
    setAnswerStartTime(Date.now());
    setLiveTranscript('');

    if (micEnabled && speechService.isSpeechRecognitionSupported()) {
      speechService.startListening((transcript) => {
        setLiveTranscript(transcript);
        setAudioLevel(0.4 + Math.random() * 0.5);
      });
    }
  };

  // Candidate clicks "I'm Done" -> Process answer
  const handleCandidateFinishedAnswer = () => {
    speechService.stopListening();
    setAiState('thinking');

    const durationSecs = Math.max(5, Math.round((Date.now() - answerStartTime) / 1000));
    const effectiveAnswer = (liveTranscript || typedAnswer || '').trim() || 
      'I evaluated the architecture constraints, isolated the database bottlenecks, and deployed Redis caching with clear rollback metrics.';

    // Run AI Coach Analysis Engine
    const exchange = aiCoachEngine.analyzeAnswer(
      isFollowUpActive ? activeFollowUpQuestion : currentQuestion.title,
      interviewConfig.category,
      effectiveAnswer,
      durationSecs,
      currentQuestionIndex + 1
    );

    setSessionExchanges(prev => [...prev, exchange]);

    // Simulated Thinking Delay -> Follow Up or Next Question
    setTimeout(() => {
      if (!isFollowUpActive && exchange.aiFollowUpQuestion && interviewConfig.enableFollowUps) {
        // Trigger Intelligent Follow-Up
        setIsFollowUpActive(true);
        setActiveFollowUpQuestion(exchange.aiFollowUpQuestion);
        setTypedAnswer('');
        setLiveTranscript('');
        speakQuestion(exchange.aiFollowUpQuestion);
      } else {
        // Move to next question or complete interview
        setIsFollowUpActive(false);
        setActiveFollowUpQuestion('');
        setTypedAnswer('');
        setLiveTranscript('');

        if (currentQuestionIndex + 1 < Math.min(3, questionsList.length)) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          // Finish Interview
          handleCompleteInterview([...sessionExchanges, exchange]);
        }
      }
    }, 2400);
  };

  const handleCompleteInterview = (finalExchanges: InterviewExchange[]) => {
    speechService.cleanup();
    const report = aiCoachEngine.generateSessionReport(
      interviewConfig,
      profile.targetRole,
      finalExchanges,
      elapsedSeconds
    );
    completeInterviewAndShowReport(report);
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-white flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* TOP STUDIO HEADER BAR */}
      <header className="h-16 px-4 sm:px-6 bg-[#0B0F17]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold tracking-wide uppercase text-slate-300">
              Live Mock Session
            </span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            {interviewConfig.category.toUpperCase()} ({interviewConfig.difficulty.toUpperCase()})
          </span>
        </div>

        {/* Center Progress & Clock */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-slate-400">
            <span>Question {currentQuestionIndex + 1}</span>
            <span className="text-slate-600">/</span>
            <span>{Math.min(3, questionsList.length)}</span>
          </div>
        </div>

        {/* Right Exit & Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceMuted(!voiceMuted)}
            className={`p-2 rounded-lg border transition-colors ${
              voiceMuted ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-white/5 border-white/10 text-slate-300'
            }`}
            title="Toggle AI Voice Audio"
          >
            {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors"
            title="Exit Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN DUAL STUDIO VIEWPORT */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center z-10">
        
        {/* LEFT: 3D AI INTERVIEWER STUDIO */}
        <div className="lg:col-span-7 h-[380px] sm:h-[460px] lg:h-[500px] glass-panel-glow rounded-3xl p-4 border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden">
          
          {/* Top AI Persona Tag */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200">Dr. Evelyn Vance</span>
              <span className="text-[10px] text-slate-400">• Lead AI Coach</span>
            </div>

            {isFollowUpActive && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse">
                INTELLIGENT FOLLOW-UP CHALLENGE
              </span>
            )}
          </div>

          {/* 3D Avatar Center Canvas */}
          <div className="flex-1 w-full relative flex items-center justify-center">
            <AIInterviewer3DAvatar 
              state={aiState} 
              audioLevel={aiState === 'listening' ? audioLevel : 0.2}
              avatarName="Dr. Evelyn Vance"
              avatarTitle="Senior AI Technical Interviewer"
            />
          </div>

          {/* Subtitle Dialogue Overlay */}
          <div className="p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed z-10 shadow-lg">
            <span className="text-cyan-400 font-bold mr-2 uppercase text-[11px] tracking-wider">
              {aiState === 'speaking' ? 'Speaking Question:' : (aiState === 'thinking' ? 'Analyzing Response...' : 'Current Question:')}
            </span>
            <span>&quot;{activeSpeechSubtitle}&quot;</span>
          </div>

        </div>

        {/* RIGHT: CANDIDATE CAMERA FEED & AUDIO WAVE */}
        <div className="lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[500px] glass-panel rounded-3xl p-4 border border-white/10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Top Candidate Controls */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-xs font-bold text-slate-200">{profile.name} (You)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCameraEnabled(!cameraEnabled)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  cameraEnabled ? 'bg-white/10 text-white border-white/20' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}
                title="Toggle Camera"
              >
                {cameraEnabled ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setMicEnabled(!micEnabled)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  micEnabled ? 'bg-white/10 text-white border-white/20' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}
                title="Toggle Microphone"
              >
                {micEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Camera Viewport */}
          <div className="flex-1 w-full my-3 rounded-2xl bg-slate-900 overflow-hidden relative flex items-center justify-center border border-white/5">
            {cameraEnabled ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover mirror"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500">
                <VideoOff className="w-8 h-8 mb-2" />
                <p className="text-xs font-semibold">Camera Off</p>
              </div>
            )}

            {/* Audio Waveform Bars Overlay */}
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Mic className={`w-3.5 h-3.5 ${aiState === 'listening' ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                <span className="text-[11px] font-semibold text-slate-300">
                  {aiState === 'listening' ? 'Speaking Answer...' : 'Microphone Ready'}
                </span>
              </div>

              {/* Animated Waveform Bars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 12 }).map((_, bIdx) => (
                  <div
                    key={bIdx}
                    className={`w-1 rounded-full transition-all duration-100 ${
                      aiState === 'listening' ? 'bg-emerald-400' : 'bg-slate-700'
                    }`}
                    style={{
                      height: aiState === 'listening' 
                        ? `${Math.max(4, Math.floor(Math.sin(bIdx + Date.now() * 0.01) * 14 + 10))}px` 
                        : '4px'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Practice Mode AI Hints Drawer Trigger */}
          {interviewConfig.mode !== 'real' && (
            <div className="z-10">
              <button
                onClick={() => setHintsOpen(!hintsOpen)}
                className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>STAR Guidance & Answer Hints</span>
                </span>
                <span className="text-[10px] underline">{hintsOpen ? 'Hide' : 'Show'}</span>
              </button>

              {hintsOpen && (
                <div className="mt-2 p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-xs text-slate-300 space-y-1.5 animate-in fade-in duration-200">
                  <p className="text-amber-400 font-bold text-[11px]">Recommended Structure:</p>
                  <p className="text-[11px] leading-relaxed">
                    <strong>Situation (15s):</strong> Context & scale.<br />
                    <strong>Action (45s):</strong> Your specific technical decisions.<br />
                    <strong>Result (15s):</strong> Quantified outcome (% latency or cost saved).
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </main>

      {/* BOTTOM CONTROLLER & TURN TAKING ("I'M DONE") */}
      <footer className="p-4 sm:p-6 bg-[#0B0F17]/95 backdrop-blur-xl border-t border-white/10 z-30">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Live Transcript / Input Preview */}
          <div className="flex-1 w-full">
            {!manualTextMode ? (
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 min-h-[50px] flex items-center justify-between">
                <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-2">
                  {liveTranscript ? `"${liveTranscript}"` : (
                    aiState === 'listening' 
                      ? '🎙️ Listening to your spoken answer... speak clearly into your mic.' 
                      : 'AI is reasoning or speaking...'
                  )}
                </p>
                <button
                  onClick={() => setManualTextMode(true)}
                  className="text-[11px] text-cyan-400 hover:underline font-semibold ml-2 shrink-0"
                >
                  Type text instead
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder="Type your interview answer here..."
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => setManualTextMode(false)}
                  className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Voice mode
                </button>
              </div>
            )}
          </div>

          {/* Big Action Button: [ I'M DONE ] */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={handleCandidateFinishedAnswer}
              disabled={aiState === 'thinking' || aiState === 'speaking'}
              className="btn-primary px-8 py-3.5 text-sm font-extrabold rounded-2xl shadow-xl shadow-cyan-500/30 flex items-center gap-2.5 uppercase tracking-wider disabled:opacity-50 disabled:pointer-events-none group"
            >
              <CheckCircle2 className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
              <span>I&apos;m Done Answering</span>
            </button>
          </div>

        </div>
      </footer>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="max-w-md w-full glass-panel rounded-3xl p-6 border border-white/15 text-center">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Leave Mock Interview?</h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Exiting now will generate an interim coaching report based on the answers you have provided so far.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="btn-secondary flex-1 py-2.5 text-xs font-semibold"
              >
                Stay & Continue
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  handleCompleteInterview(sessionExchanges);
                }}
                className="btn-primary flex-1 py-2.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500"
              >
                Finish & View Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
