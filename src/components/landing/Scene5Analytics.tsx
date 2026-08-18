import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  TrendingUp,
  Brain,
  Mic,
  MessageSquareText,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const metrics = [
  {
    id: "confidence",
    label: "Confidence",
    score: 82,
    icon: TrendingUp,
    description:
      "You stayed composed and maintained a steady speaking pace.",
    color: "#D6FF3F",
  },
  {
    id: "clarity",
    label: "Clarity",
    score: 91,
    icon: MessageSquareText,
    description:
      "Your answers were structured and easy to follow.",
    color: "#A78BFA",
  },
  {
    id: "reasoning",
    label: "Reasoning",
    score: 76,
    icon: Brain,
    description:
      "Strong ideas, but some decisions needed deeper explanation.",
    color: "#FF6B4A",
  },
  {
    id: "delivery",
    label: "Delivery",
    score: 87,
    icon: Mic,
    description:
      "Good pace and energy with a few moments of hesitation.",
    color: "#D6FF3F",
  },
];

export const Analytics: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMetric, setActiveMetric] = useState("confidence");

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

  const dashboardY = useTransform(
    scrollYProgress,
    [0, 0.55],
    [160, 0]
  );

  const dashboardScale = useTransform(
    scrollYProgress,
    [0, 0.55],
    [0.9, 1]
  );

  const active = metrics.find(
    (metric) => metric.id === activeMetric
  )!;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-6 py-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-[45%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#D6FF3F]/[0.035] blur-[180px]" />

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
            <Sparkles className="h-4 w-4 text-[#D6FF3F]" />

            <span className="text-xs uppercase tracking-[0.2em] text-[#D6FF3F]">
              Interview complete
            </span>
          </div>

          <h2 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--text)] md:text-7xl">
            Now you know
            <br />
            <span className="text-[#D6FF3F]">
              what actually happened.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            Don't leave an interview wondering whether you did well.
            See exactly where you performed, where you hesitated,
            and what to improve next.
          </p>
        </motion.div>

        {/* ANALYTICS DASHBOARD */}
        <motion.div
          style={{
            y: dashboardY,
            scale: dashboardScale,
          }}
          className="mx-auto max-w-6xl"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            
            {/* Dashboard header */}
            <div className="flex flex-col gap-6 border-b border-white/[0.07] p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Performance analysis
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-[var(--text)]">
                  Product Manager Interview
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#D6FF3F]" />

                <span className="text-sm text-[#D6FF3F]">
                  Analysis complete
                </span>
              </div>
            </div>

            <div className="grid gap-8 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10">
              
              {/* OVERALL SCORE */}
              <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-[#D6FF3F]/10 bg-[#D6FF3F]/[0.025] p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Overall score
                </p>

                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                  }}
                  className="relative mt-8 flex h-48 w-48 items-center justify-center rounded-full border border-[#D6FF3F]/30"
                >
                  <div className="absolute inset-3 rounded-full border border-[#D6FF3F]/15" />

                  <div className="absolute inset-7 rounded-full bg-[#D6FF3F]/[0.04]" />

                  <div className="relative text-center">
                    <div className="text-6xl font-semibold tracking-[-0.06em] text-[#D6FF3F]">
                      84
                    </div>

                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Strong
                    </p>
                  </div>
                </motion.div>

                <p className="mt-8 max-w-xs text-center text-sm leading-relaxed text-[var(--muted)]">
                  You're performing well overall, but stronger reasoning
                  under pressure could push this higher.
                </p>
              </div>

              {/* METRICS */}
              <div className="grid gap-4 sm:grid-cols-2">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  const isActive = activeMetric === metric.id;

                  return (
                    <motion.button
                      key={metric.id}
                      type="button"
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.08,
                      }}
                      onClick={() =>
                        setActiveMetric(metric.id)
                      }
                      className={`group relative overflow-hidden rounded-[1.25rem] border p-6 text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#D6FF3F]/30 bg-[#D6FF3F]/[0.06]"
                          : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{
                            backgroundColor: `${metric.color}15`,
                            color: metric.color,
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <ArrowUpRight className="h-4 w-4 text-[var(--muted)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>

                      <div className="mt-8">
                        <p className="text-sm text-[var(--muted)]">
                          {metric.label}
                        </p>

                        <p
                          className="mt-1 text-4xl font-semibold tracking-[-0.04em]"
                          style={{
                            color: metric.color,
                          }}
                        >
                          {metric.score}%
                        </p>
                      </div>

                      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                        <motion.div
                          initial={{ width: "0%" }}
                          whileInView={{
                            width: `${metric.score}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: index * 0.1,
                          }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: metric.color,
                          }}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE METRIC INSIGHT */}
            <div className="border-t border-white/[0.07] p-6 md:px-10 md:py-8">
              <motion.div
                key={active.id}
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    AI insight
                  </p>

                  <h4 className="mt-2 text-xl font-medium text-[var(--text)]">
                    {active.label}
                  </h4>

                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
                    {active.description}
                  </p>
                </div>

                <button className="flex items-center gap-2 self-start rounded-full border border-[#D6FF3F]/20 px-5 py-3 text-sm text-[#D6FF3F] transition-all hover:bg-[#D6FF3F] hover:text-[#090B0A]">
                  Improve this skill
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
