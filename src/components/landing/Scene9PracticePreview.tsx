import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Play,
  Mic,
  Clock3,
  Brain,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RotateCcw,
} from "lucide-react";

const interviewModes = [
  {
    id: "warmup",
    label: "Warm-up",
    duration: "5 min",
    difficulty: "Easy",
    icon: Sparkles,
    color: "#D6FF3F",
    question:
      "Tell me about a product decision you made that had a meaningful impact.",
    description:
      "Build confidence with structured questions and helpful AI guidance.",
  },
  {
    id: "real",
    label: "Real interview",
    duration: "20 min",
    difficulty: "Medium",
    icon: MessageSquare,
    color: "#A78BFA",
    question:
      "You have two important features competing for limited engineering resources. How do you decide what to prioritize?",
    description:
      "Experience a realistic interview with adaptive follow-up questions.",
  },
  {
    id: "pressure",
    label: "Pressure mode",
    duration: "30 min",
    difficulty: "Hard",
    icon: Brain,
    color: "#FF6B4A",
    question:
      "Your previous answer ignored a major risk. How would you defend your decision now?",
    description:
      "Practice handling unexpected challenges when the pressure increases.",
  },
];

export const Scene9PracticePreview: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeMode, setActiveMode] = useState(1);
  const [isPracticing, setIsPracticing] = useState(false);
  const [recording, setRecording] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [100, 0]
  );

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 1]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.55],
    [140, 0]
  );

  const active = interviewModes[activeMode];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-6 py-32"
    >
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[650px] w-[650px] rounded-full bg-[#A78BFA]/[0.04] blur-[180px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          style={{
            y: headingY,
            opacity: headingOpacity,
          }}
          className="mx-auto mb-24 max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#A78BFA]/20 bg-[#A78BFA]/5 px-4 py-2">
            <Play className="h-4 w-4 text-[#A78BFA]" />

            <span className="text-xs uppercase tracking-[0.2em] text-[#A78BFA]">
              Practice for real
            </span>
          </div>

          <h2 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--text)] md:text-7xl">
            Less reading.
            <br />
            More
            <span className="text-[#A78BFA]"> interviewing.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            Stop preparing only in theory. Step into realistic interview
            situations and practice responding when it actually matters.
          </p>
        </motion.div>

        <motion.div
          style={{ y: contentY }}
          className="mx-auto max-w-6xl"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] shadow-[0_40px_120px_rgba(0,0,0,0.3)] backdrop-blur-xl">
            {/* Top bar */}
            <div className="flex flex-col gap-5 border-b border-white/[0.07] p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  AI interview simulator
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-[var(--text)]">
                  Choose your challenge
                </h3>
              </div>

              <div className="flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2">
                <Clock3 className="h-4 w-4 text-[var(--muted)]" />

                <span className="text-sm text-[var(--text)]">
                  {active.duration}
                </span>

                <span className="h-4 w-px bg-white/[0.1]" />

                <span
                  className="text-sm font-medium"
                  style={{ color: active.color }}
                >
                  {active.difficulty}
                </span>
              </div>
            </div>

            <div className="grid gap-8 p-6 lg:grid-cols-[0.8fr_1.2fr] md:p-10">
              {/* Mode selector */}
              <div className="space-y-3">
                {interviewModes.map((mode, index) => {
                  const Icon = mode.icon;
                  const isActive = activeMode === index;

                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => {
                        setActiveMode(index);
                        setIsPracticing(false);
                        setRecording(false);
                      }}
                      className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                        isActive
                          ? "border-white/[0.18] bg-white/[0.06]"
                          : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.15]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{
                            backgroundColor: `${mode.color}15`,
                          }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: mode.color }}
                          />
                        </div>

                        <div>
                          <p className="font-medium text-[var(--text)]">
                            {mode.label}
                          </p>

                          <p className="mt-1 text-xs text-[var(--muted)]">
                            {mode.duration} · {mode.difficulty}
                          </p>
                        </div>

                        {isActive && (
                          <CheckCircle2
                            className="ml-auto h-5 w-5"
                            style={{ color: mode.color }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Interview preview */}
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-black/[0.14] p-6 md:p-8"
              >
                <div
                  className="pointer-events-none absolute right-[-15%] top-[-25%] h-[300px] w-[300px] rounded-full blur-[100px]"
                  style={{
                    backgroundColor: `${active.color}12`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${active.color}15`,
                        }}
                      >
                        <ActiveIcon
                          className="h-5 w-5"
                          style={{ color: active.color }}
                        />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                          AI interviewer
                        </p>

                        <p className="mt-1 text-sm text-[var(--text)]">
                          {active.label}
                        </p>
                      </div>
                    </div>

                    {isPracticing && (
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF6B4A]" />

                        <span className="text-xs text-[#FF6B4A]">
                          LIVE
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-10">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Your question
                    </p>

                    <h4 className="mt-4 text-2xl font-medium leading-relaxed text-[var(--text)] md:text-3xl">
                      {active.question}
                    </h4>

                    <p className="mt-5 max-w-2xl leading-relaxed text-[var(--muted)]">
                      {active.description}
                    </p>
                  </div>

                  <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                    {!isPracticing ? (
                      <button
                        type="button"
                        onClick={() => setIsPracticing(true)}
                        className="group flex w-full items-center justify-center gap-3 rounded-xl py-4 text-sm font-semibold text-[#090B0A] transition-all hover:scale-[1.01]"
                        style={{
                          backgroundColor: active.color,
                        }}
                      >
                        <Play className="h-4 w-4" />

                        Start this interview

                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-[var(--text)]">
                              Your turn to answer
                            </p>

                            <p className="mt-1 text-xs text-[var(--muted)]">
                              Take your time. The AI is listening.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setIsPracticing(false)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] text-[var(--muted)] transition-all hover:text-white"
                            aria-label="Restart practice"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setRecording(!recording)}
                          className={`flex items-center justify-center gap-3 rounded-xl py-4 text-sm font-medium transition-all ${
                            recording
                              ? "border border-[#FF6B4A]/30 bg-[#FF6B4A]/10 text-[#FF6B4A]"
                              : "border border-white/[0.08] bg-white/[0.04] text-[var(--text)] hover:bg-white/[0.07]"
                          }`}
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              recording
                                ? "bg-[#FF6B4A] animate-pulse"
                                : "bg-white/[0.08]"
                            }`}
                          >
                            <Mic
                              className={`h-4 w-4 ${
                                recording
                                  ? "text-[#090B0A]"
                                  : "text-[var(--text)]"
                              }`}
                            />
                          </div>

                          {recording
                            ? "Recording your answer..."
                            : "Start speaking"}
                        </button>

                        {recording && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-1 py-2"
                          >
                            {[0, 1, 2, 3, 4, 5, 6].map((bar) => (
                              <motion.span
                                key={bar}
                                animate={{
                                  height: [
                                    8,
                                    20 + (bar % 3) * 8,
                                    10,
                                  ],
                                }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: bar * 0.08,
                                }}
                                className="w-1.5 rounded-full bg-[#FF6B4A]"
                              />
                            ))}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
