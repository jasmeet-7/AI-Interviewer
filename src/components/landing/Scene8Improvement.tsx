import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Target,
  Brain,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
} from "lucide-react";

const improvementPlans = [
  {
    id: "reasoning",
    title: "Strengthen your reasoning",
    subtitle: "Your biggest opportunity",
    icon: Brain,
    color: "#FF6B4A",
    problem:
      "Your answers reach good conclusions, but the reasoning behind them needs more structure.",
    steps: [
      "Break the problem into smaller decisions",
      "Explain the trade-offs you considered",
      "Support your final choice with evidence",
    ],
    exercise: "Decision under pressure",
  },
  {
    id: "followup",
    title: "Handle follow-up questions",
    subtitle: "Become harder to shake",
    icon: MessageSquare,
    color: "#A78BFA",
    problem:
      "Unexpected follow-ups can interrupt your flow and make you hesitate.",
    steps: [
      "Pause before responding instead of rushing",
      "Clarify what the interviewer is testing",
      "Build your answer from a clear structure",
    ],
    exercise: "Rapid follow-up drill",
  },
  {
    id: "confidence",
    title: "Build interview confidence",
    subtitle: "Stay composed",
    icon: Target,
    color: "#D6FF3F",
    problem:
      "Your confidence is strong overall, but pressure can affect your pace and delivery.",
    steps: [
      "Practice with increasing difficulty",
      "Repeat difficult questions until comfortable",
      "Review your delivery after every session",
    ],
    exercise: "Pressure simulation",
  },
];

export const Scene8Improvement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePlan, setActivePlan] = useState(0);
  const [started, setStarted] = useState(false);

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

  const active = improvementPlans[activePlan];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-6 py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B4A]/[0.035] blur-[180px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          style={{
            y: headingY,
            opacity: headingOpacity,
          }}
          className="mx-auto mb-24 max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6B4A]/20 bg-[#FF6B4A]/5 px-4 py-2">
            <Sparkles className="h-4 w-4 text-[#FF6B4A]" />

            <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B4A]">
              AI improvement plan
            </span>
          </div>

          <h2 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--text)] md:text-7xl">
            Knowing the problem
            <br />
            is only
            <span className="text-[#FF6B4A]"> step one.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            SmartPrepration turns your interview feedback into focused
            practice designed around the areas that need improvement.
          </p>
        </motion.div>

        <motion.div
          style={{ y: contentY }}
          className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
        >
          {/* Improvement areas */}
          <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl">
            <div className="mb-6 px-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Focus areas
              </p>

              <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">
                What should we improve?
              </h3>
            </div>

            <div className="space-y-3">
              {improvementPlans.map((plan, index) => {
                const Icon = plan.icon;
                const isActive = activePlan === index;

                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => {
                      setActivePlan(index);
                      setStarted(false);
                    }}
                    className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-white/[0.18] bg-white/[0.06]"
                        : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.15]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${plan.color}15`,
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: plan.color }}
                        />
                      </div>

                      <div>
                        <p className="font-medium text-[var(--text)]">
                          {plan.title}
                        </p>

                        <p className="mt-1 text-xs text-[var(--muted)]">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI plan */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-10"
          >
            <div
              className="pointer-events-none absolute right-[-10%] top-[-20%] h-[350px] w-[350px] rounded-full blur-[120px]"
              style={{
                backgroundColor: `${active.color}0D`,
              }}
            />

            <div className="relative">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.2em]"
                    style={{ color: active.color }}
                  >
                    Personalized practice
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--text)] md:text-4xl">
                    {active.title}
                  </h3>
                </div>

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: `${active.color}15`,
                  }}
                >
                  <ActiveIcon
                    className="h-6 w-6"
                    style={{ color: active.color }}
                  />
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-white/[0.07] bg-black/[0.12] p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  What the AI noticed
                </p>

                <p className="mt-3 text-lg leading-relaxed text-[var(--text)]">
                  {active.problem}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Your improvement path
                </p>

                <div className="mt-5 space-y-4">
                  {active.steps.map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4"
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${active.color}15`,
                          color: active.color,
                        }}
                      >
                        {index + 1}
                      </div>

                      <p className="text-sm text-[var(--text)]">
                        {step}
                      </p>

                      <CheckCircle2
                        className="ml-auto h-4 w-4"
                        style={{ color: active.color }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                    Recommended exercise
                  </p>

                  <p className="mt-2 font-medium text-[var(--text)]">
                    {active.exercise}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStarted(!started)}
                  className="group flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#090B0A] transition-all hover:scale-[1.03]"
                  style={{
                    backgroundColor: started
                      ? "#FFFFFF"
                      : active.color,
                  }}
                >
                  {started ? (
                    <>
                      <RotateCcw className="h-4 w-4" />
                      Restart exercise
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start practice
                    </>
                  )}
                </button>
              </div>

              {started && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex items-center gap-3 rounded-2xl border border-[#D6FF3F]/20 bg-[#D6FF3F]/[0.04] p-5"
                >
                  <Sparkles className="h-5 w-5 shrink-0 text-[#D6FF3F]" />

                  <p className="text-sm text-[var(--text)]">
                    AI practice session ready. Your next challenge has
                    been generated based on your weak areas.
                  </p>

                  <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-[#D6FF3F]" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
