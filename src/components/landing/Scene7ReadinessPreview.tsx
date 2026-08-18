import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  Check,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CircleDot,
} from "lucide-react";

const readinessAreas = [
  {
    id: "communication",
    label: "Communication",
    score: 91,
    status: "Strong",
    description:
      "You explain your ideas clearly and keep your answers easy to follow.",
  },
  {
    id: "confidence",
    label: "Confidence",
    score: 82,
    status: "Strong",
    description:
      "You remain composed, though pressure can occasionally affect your pace.",
  },
  {
    id: "reasoning",
    label: "Decision reasoning",
    score: 76,
    status: "Improve",
    description:
      "Your decisions are good, but your evidence and trade-offs need more depth.",
  },
  {
    id: "adaptability",
    label: "Follow-up handling",
    score: 68,
    status: "Needs work",
    description:
      "Unexpected questions create hesitation. More pressure practice will help.",
  },
];

export const Scene7ReadinessPreview: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeArea, setActiveArea] = useState(0);

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

  const panelY = useTransform(
    scrollYProgress,
    [0, 0.55],
    [140, 0]
  );

  const active = readinessAreas[activeArea];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-6 py-32"
    >
      <div className="pointer-events-none absolute right-[-10%] top-[25%] h-[650px] w-[650px] rounded-full bg-[#D6FF3F]/[0.035] blur-[180px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          style={{
            y: headingY,
            opacity: headingOpacity,
          }}
          className="mx-auto mb-24 max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6FF3F]/20 bg-[#D6FF3F]/5 px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-[#D6FF3F]" />

            <span className="text-xs uppercase tracking-[0.2em] text-[#D6FF3F]">
              Readiness check
            </span>
          </div>

          <h2 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--text)] md:text-7xl">
            Don't just practice.
            <br />
            Know when you're
            <span className="text-[#D6FF3F]"> ready.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            Your readiness is measured across the skills that actually
            matter when the interview becomes unpredictable.
          </p>
        </motion.div>

        {/* Readiness dashboard */}
        <motion.div
          style={{ y: panelY }}
          className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* Score panel */}
          <div className="rounded-[2rem] border border-[#D6FF3F]/10 bg-white/[0.025] p-8 backdrop-blur-xl md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Interview readiness
            </p>

            <div className="mt-10 flex justify-center">
              <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 18,
                }}
                className="relative flex h-64 w-64 items-center justify-center rounded-full border border-[#D6FF3F]/25"
              >
                <div className="absolute inset-4 rounded-full border border-[#D6FF3F]/15" />
                <div className="absolute inset-9 rounded-full border border-[#D6FF3F]/10 bg-[#D6FF3F]/[0.025]" />

                <div className="relative text-center">
                  <div className="text-7xl font-semibold tracking-[-0.07em] text-[#D6FF3F]">
                    84
                  </div>

                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    Ready score
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-10 rounded-2xl border border-[#D6FF3F]/10 bg-[#D6FF3F]/[0.03] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6FF3F]/10">
                  <Sparkles className="h-5 w-5 text-[#D6FF3F]" />
                </div>

                <div>
                  <p className="font-medium text-[var(--text)]">
                    Almost interview-ready
                  </p>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Two focused practice sessions could strengthen your
                    weakest areas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Areas */}
          <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl md:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Skill breakdown
              </p>

              <h3 className="mt-2 text-2xl font-semibold text-[var(--text)]">
                Where you stand right now
              </h3>
            </div>

            <div className="space-y-3">
              {readinessAreas.map((area, index) => {
                const isActive = activeArea === index;
                const needsWork = area.score < 75;

                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setActiveArea(index)}
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      isActive
                        ? "border-[#D6FF3F]/25 bg-[#D6FF3F]/[0.05]"
                        : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.15]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                            needsWork
                              ? "bg-[#FF6B4A]/10"
                              : "bg-[#D6FF3F]/10"
                          }`}
                        >
                          {needsWork ? (
                            <AlertTriangle className="h-5 w-5 text-[#FF6B4A]" />
                          ) : (
                            <Check className="h-5 w-5 text-[#D6FF3F]" />
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-[var(--text)]">
                            {area.label}
                          </p>

                          <p
                            className={`mt-1 text-xs ${
                              needsWork
                                ? "text-[#FF6B4A]"
                                : "text-[#D6FF3F]"
                            }`}
                          >
                            {area.status}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-2xl font-semibold ${
                          needsWork
                            ? "text-[#FF6B4A]"
                            : "text-[#D6FF3F]"
                        }`}
                      >
                        {area.score}
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{
                          width: `${area.score}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: index * 0.08,
                        }}
                        className={`h-full rounded-full ${
                          needsWork
                            ? "bg-[#FF6B4A]"
                            : "bg-[#D6FF3F]"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active insight */}
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border border-white/[0.07] bg-black/[0.12] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#A78BFA]/10">
                  <CircleDot className="h-4 w-4 text-[#A78BFA]" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#A78BFA]">
                    AI readiness insight
                  </p>

                  <h4 className="mt-2 text-lg font-medium text-[var(--text)]">
                    {active.label}
                  </h4>

                  <p className="mt-2 leading-relaxed text-[var(--muted)]">
                    {active.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-[#D6FF3F]/20 px-5 py-3 text-sm font-medium text-[#D6FF3F] transition-all hover:bg-[#D6FF3F] hover:text-[#090B0A]"
              >
                Start focused practice
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
