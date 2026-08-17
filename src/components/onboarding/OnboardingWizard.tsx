import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import type { 
  ExperienceLevel, 
  InterviewCategory, 
  InterviewDifficulty, 
  InterviewMode 
} from '../../types';
import { SAMPLE_RESUME_PRESETS } from '../../services/mockData';
import { 
  User, 
  Briefcase, 
  FileText, 
  Sliders, 
  Video, 
  Mic, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Camera, 
  VideoOff, 
  ShieldCheck
} from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    interviewConfig, 
    updateInterviewConfig, 
    startNewInterview, 
    setView 
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  // Form State
  const [name, setName] = useState(profile.name);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(profile.experienceLevel);
  const [currentStatus, setCurrentStatus] = useState(profile.currentStatus);
  const [targetRole, setTargetRole] = useState(profile.targetRole);
  const [industry, setIndustry] = useState(profile.industry);
  const [targetCompany, setTargetCompany] = useState(profile.targetCompany || '');
  const [jobDescription, setJobDescription] = useState(profile.jobDescription || '');
  const [resumeFileName, setResumeFileName] = useState(profile.resumeFileName || '');
  const [extractedSkills, setExtractedSkills] = useState<string[]>(profile.extractedSkills);

  // Setup Config
  const [category, setCategory] = useState<InterviewCategory>(interviewConfig.category);
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>(interviewConfig.difficulty);
  const [durationMinutes, setDurationMinutes] = useState<10 | 20 | 30>(interviewConfig.durationMinutes);
  const [mode, setMode] = useState<InterviewMode>(interviewConfig.mode);

  // Device Check State
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const [micActive] = useState<boolean>(true);
  const [micLevel, setMicLevel] = useState<number>(45);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Live Camera Preview Initialization for Step 6
  useEffect(() => {
    if (currentStep === 6 && cameraActive) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          console.warn('Camera/Mic permission simulation active');
        });
    }

    return () => {
      if (mediaStreamRef.current && currentStep !== 6) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [currentStep, cameraActive]);

  // Mic audio level meter oscillation
  useEffect(() => {
    if (currentStep === 6 && micActive) {
      const interval = setInterval(() => {
        setMicLevel(Math.floor(25 + Math.random() * 55));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [currentStep, micActive]);

  const handleApplyPreset = (preset: typeof SAMPLE_RESUME_PRESETS[0]) => {
    setName(preset.name);
    setTargetRole(preset.role);
    setResumeFileName(`${preset.name.replace(' ', '_')}_Resume.pdf`);
    setExtractedSkills(preset.skills);
  };

  const handleNext = () => {
    // Save state on step transition
    updateProfile({
      name,
      experienceLevel,
      currentStatus,
      targetRole,
      industry,
      targetCompany,
      jobDescription,
      resumeFileName,
      extractedSkills
    });

    updateInterviewConfig({
      category,
      difficulty,
      durationMinutes,
      mode,
      cameraEnabled: cameraActive,
      micEnabled: micActive
    });

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Launch into the Interview Room
      startNewInterview();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      setView('landing');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center max-w-4xl mx-auto">
      
      {/* Top Breadcrumb & Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? 'Back to Home' : 'Previous Step'}</span>
          </button>

          <span className="text-xs font-mono font-bold text-cyan-400">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        {/* Multi-step progress bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex gap-1 p-0.5">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                idx + 1 <= currentStep
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Glass Card Step Form */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-cyan-500/30">
        
        {/* STEP 1: ABOUT YOU */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Step 1: Tell Us About Yourself
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  SmartPrepration personalizes tone, pace, and rigor to your experience.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Experience Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'student', label: 'College / Student', sub: 'Internships & Projects' },
                    { id: 'entry', label: 'Entry Level (0-2 Yrs)', sub: 'Foundational roles' },
                    { id: 'mid', label: 'Mid-Level (3-5 Yrs)', sub: 'Core professional' },
                    { id: 'senior', label: 'Senior (6-9 Yrs)', sub: 'Autonomous execution' },
                    { id: 'lead', label: 'Lead / Staff (10+ Yrs)', sub: 'System & team lead' },
                    { id: 'executive', label: 'Executive / Director', sub: 'Strategy & leadership' }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setExperienceLevel(lvl.id as ExperienceLevel)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        experienceLevel === lvl.id
                          ? 'bg-cyan-500/15 border-cyan-400 text-slate-900 dark:text-white shadow-sm shadow-cyan-500/20'
                          : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{lvl.label}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{lvl.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Current Career Status
                </label>
                <input
                  type="text"
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  placeholder="e.g. Actively interviewing for Senior Full-Stack SWE roles"
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: TARGET ROLE & COMPANY */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Step 2: Target Role & Company
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Specify the position and industry so the AI configures relevant question pools.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Target Role Title *
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer, Product Manager, ML Scientist"
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Industry Domain
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Fintech, Cloud SaaS, Healthcare, E-Commerce"
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Target Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    placeholder="e.g. Google, Stripe, Meta, Amazon, Series B Startup"
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: JOB DESCRIPTION INTELLIGENCE */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Step 3: Job Context & Requirements
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Paste the Job Description to automatically align interview rubrics with required skills.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Paste Job Description (Optional but Recommended)
                </label>
                <button
                  type="button"
                  onClick={() => setJobDescription(`We are looking for a Senior Full-Stack Engineer with deep experience in React, TypeScript, Node.js, distributed microservices, and database optimization. You will design scalable architectures, mentor engineers, and drive technical decision-making.`)}
                  className="text-xs text-cyan-400 hover:underline font-semibold"
                >
                  Load Sample SWE JD
                </button>
              </div>

              <textarea
                rows={7}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job requirements, responsibilities, or role description here..."
                className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white leading-relaxed font-mono"
              />
            </div>
          </div>
        )}

        {/* STEP 4: RESUME INTELLIGENCE */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Step 4: Resume Intelligence
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Upload your resume or pick a preset. The AI will extract projects to ask deep questions.
                </p>
              </div>
            </div>

            {/* 1-Click Resume Presets */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Quick 1-Click Candidate Presets:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAMPLE_RESUME_PRESETS.map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left hover:border-cyan-400 transition-all group"
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-400">
                      {preset.role}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{preset.name} • {preset.experience}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Box Simulation */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-cyan-500/40 bg-cyan-500/5 flex flex-col items-center justify-center text-center">
              <Upload className="w-8 h-8 text-cyan-400 mb-2 animate-bounce" />
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {resumeFileName ? `Loaded: ${resumeFileName}` : 'Drag & Drop your Resume PDF / DOCX'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Parsed securely in client memory. Never shared with third parties.
              </p>
            </div>

            {/* Extracted Skills Preview */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Extracted Competencies & Tech Stack:
              </span>
              <div className="flex flex-wrap gap-2">
                {extractedSkills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-300 border border-slate-200 dark:border-white/10 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: INTERVIEW SETUP & CALIBRATION */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Step 5: Interview Calibration
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Choose interview domain, duration, difficulty, and coaching mode.
                </p>
              </div>
            </div>

            {/* Interview Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Interview Domain
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'technical', label: 'Technical & Architecture' },
                  { id: 'behavioral', label: 'Behavioral & Leadership (STAR)' },
                  { id: 'system-design', label: 'System Design & Distributed' },
                  { id: 'product-management', label: 'Product Management' },
                  { id: 'ai-ml', label: 'AI / Machine Learning' },
                  { id: 'hr', label: 'HR Screening & Culture' }
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id as InterviewCategory)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      category === c.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty & Duration Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Initial Difficulty
                </label>
                <div className="flex gap-2">
                  {(['easy', 'medium', 'hard'] as InterviewDifficulty[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDifficulty(d)}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                        difficulty === d
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm'
                          : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Session Duration
                </label>
                <div className="flex gap-2">
                  {([10, 20, 30] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDurationMinutes(m)}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        durationMinutes === m
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm'
                          : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {m} Min
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mode Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Coaching Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMode('full-mock')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    mode === 'full-mock'
                      ? 'bg-cyan-500/15 border-cyan-400 text-white'
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'
                  }`}
                >
                  <p className="text-xs font-bold text-white">Full Mock Interview (Recommended)</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Voice + Camera with intelligent follow-ups & hints.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('real')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    mode === 'real'
                      ? 'bg-cyan-500/15 border-cyan-400 text-white'
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'
                  }`}
                >
                  <p className="text-xs font-bold text-white">Strict Real Mode</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Zero hints. Realistic pressure environment.</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: DEVICE READINESS CHECK */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Step 6: Device & Permissions Check
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Verify your camera and microphone levels before entering the 3D room.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Video Stream Box */}
              <div className="md:col-span-7 relative w-full h-[220px] sm:h-[260px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center">
                {cameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover mirror"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <VideoOff className="w-10 h-10 mb-2 text-slate-600" />
                    <p className="text-xs font-semibold">Camera is disabled (Voice-only mode)</p>
                  </div>
                )}

                {/* Video status badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/10">
                    {cameraActive ? 'Camera Connected' : 'Camera Off'}
                  </span>
                </div>
              </div>

              {/* Right Device Controls & Audio Bar */}
              <div className="md:col-span-5 space-y-4">
                
                {/* Camera Toggle */}
                <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Camera Feed</p>
                      <p className="text-[10px] text-slate-500">Optional eye contact & posture check</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCameraActive(!cameraActive)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      cameraActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {cameraActive ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                {/* Mic Audio Level */}
                <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Microphone Input</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {micActive ? 'Active' : 'Muted'}
                    </span>
                  </div>

                  {/* Audio Level Bar */}
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 mb-1.5">
                    <div 
                      className="h-full bg-emerald-400 rounded-full transition-all duration-150"
                      style={{ width: `${micActive ? micLevel : 0}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Speak into your mic to test levels.</p>
                </div>

                {/* Privacy Badge */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-emerald-300 leading-relaxed">
                    Zero recording retention without your explicit download.
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="btn-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="btn-primary px-7 py-3 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/25 flex items-center gap-2"
          >
            <span>{currentStep === totalSteps ? 'Enter 3D Interview Room' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
