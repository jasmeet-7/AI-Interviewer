import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Briefcase,
  Target,
  Brain,
  ArrowRight,
  Check,
  SlidersHorizontal,
} from "lucide-react";

const profiles = [
  {
    id: "product",
    role: "Product Manager",
    level: "Mid-level",
    focus: "Strategic reasoning",
    description:
      "The AI detected that your answers are clear, but your reasoning needs more depth under pressure.",
    challenge: "Defend your decision with stronger evidence.",
    icon: Target,
  },
  {
    id: "engineering",
    role: "Software Engineer",
    level: "Mid-level",
    focus: "Technical communication",
    description:
      "The AI adapts the interview to test how clearly you explain complex technical decisions.",
    challenge: "Explain your trade-offs without losing clarity.",
    icon: Brain,
  },
  {
    id: "leadership",
    role: "Team Lead",
    level: "Senior",
    focus: "Leadership depth",
    description:
      "The next interview focuses more heavily on conflict, ownership, and decision-making.",
    challenge: "Show how you lead through uncertainty.",
    icon: Briefcase,
  },
];

export const Scene6Personalization: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProfile, setActiveProfile] = useState(0);

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
    [120, 0]
  );

  const active = profiles[activeProfile];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-6 py-32"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-[-10%] top-[25%] h-[600px] w-[600px] rounded-full bg-[#A78BFA]/[0.05] blur-[180px]" />

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
            <SlidersHorizontal className="h-4 w-4 text-[#A78BFA]" />

            <span className="text-xs uppercase tracking-[0.2em] text-[#A78BFA]">
              Adaptive interview system
            </span>
          </div>

          <h2 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--text)] md:text-7xl">
            It doesn't give
            <br />
            everyone the same
            <span className="text-[#A78BFA]"> interview.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            SmartPrepration adapts to your role, experience,
            strengths, weaknesses, and previous interview performance.
          </p>
        </motion.div>

        {/* Main personalization interface */}
        <motion.div
          style={{ y: contentY }}
          className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"
        >
          {/* Profile selector */}
          <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A78BFA]/10">
                <Sparkles className="h-5 w-5 text-[#A78BFA]" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Candidate profile
                </p>

                <p className="text-sm font-medium text-[var(--text)]">
                  Choose your path
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {profiles.map((profile, index) => {
                const Icon = profile.icon;
                const isActive = activeProfile === index;

                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setActiveProfile(index)}
                    className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[#A78BFA]/35 bg-[#A78BFA]/[0.07]"
                        : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.15]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                            isActive
                              ? "bg-[#A78BFA]/15"
                              : "bg-white/[0.04]"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              isActive
                                ? "text-[#A78BFA]"
                                : "text-[var(--muted)]"
                            }`}
                          />
                        </div>

                        <div>
                          <p className="font-medium text-[var(--text)]">
                            {profile.role}
                          </p>

                          <p className="mt-1 text-xs text-[var(--muted)]">
                            {profile.level}
                          </p>
                        </div>
                      </div>

                      {isActive && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A78BFA]">
                          <Check className="h-3.5 w-3.5 text-[#090B0A]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI personalized plan */}
          <motion.div
            key={active.id}
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="relative overflow-hidden rounded-[2rem] border border-[#A78BFA]/15 bg-white/[0.025] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-10"
          >
            <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[350px] w-[350px] rounded-full bg-[#A78BFA]/[0.06] blur-[120px]" />

            <div className="relative">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA]">
                    AI generated plan
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--text)] md:text-4xl">
                    Built around
                    <br />
                    <span className="text-[#A78BFA]">
                      your performance.
                    </span>
                  </h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#A78BFA]/20 bg-[#A78BFA]/10">
                  <ActiveIcon className="h-6 w-6 text-[#A78BFA]" />
                </div>
              </div>

              <div className="mt-10 grid gap-4">
                <div className="rounded-2xl border border-white/[0.07] bg-black/[0.12] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                    Your role
                  </p>

                  <p className="mt-2 text-xl font-medium text-[var(--text)]">
                    {active.role}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-black/[0.12] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                    Priority focus
                  </p>

                  <p className="mt-2 text-xl font-medium text-[#D6FF3F]">
                    {active.focus}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#FF6B4A]/15 bg-[#FF6B4A]/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#FF6B4A]">
                    Next challenge
                  </p>

                  <p className="mt-3 text-lg leading-relaxed text-[var(--text)]">
                    {active.challenge}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/[0.07] pt-7">
                <p className="max-w-xl leading-relaxed text-[var(--muted)]">
                  {active.description}
                </p>

                <button
                  type="button"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#A78BFA] px-6 py-3 text-sm font-semibold text-[#090B0A] transition-all hover:scale-[1.03]"
                >
                  Generate next interview

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
