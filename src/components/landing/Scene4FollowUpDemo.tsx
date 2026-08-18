import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Brain,
  MessageCircleMore,
  ChevronRight,
} from "lucide-react";

const followUps = [
  {
    question: "Why did you choose that approach?",
    tag: "Reasoning",
    description:
      "The interviewer wants to understand how you make decisions.",
  },
  {
    question: "What would you do differently?",
    tag: "Reflection",
    description:
      "Good candidates can evaluate their own decisions and improve them.",
  },
  {
    question: "How do you know that would work?",
    tag: "Evidence",
    description:
      "The AI pushes you to support your answer with evidence.",
  },
];

export const Scene4FollowUpDemo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [100, 0]
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 1]
  );

  const demoY = useTransform(
    scrollYProgress,
    [0, 0.5],
    [140, 0]
  );

  const demoRotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [10, 0]
  );

  const lineScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0, 1]
  );

  const active = followUps[activeQuestion];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-6 py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-[#FF6B4A]/[0.05] blur-[180px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* HEADING */}
        <motion.div
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#FF6B4A]">
            The conversation gets harder
          </p>

          <h2 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--text)] md:text-7xl">
            A good answer
            <br />
            isn't the end.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            A real interviewer listens to your answer, notices the gaps,
            and asks the question you didn't expect.
          </p>
        </motion.div>

        {/* INTERVIEW DEMO */}
        <motion.div
          style={{
            y: demoY,
            rotateX: demoRotateX,
            perspective: 1200,
          }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.03] shadow-2xl backdrop-blur-xl">
            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6FF3F]/10">
                  <Brain className="h-5 w-5 text-[#D6FF3F]" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                    SmartPrepration AI
                  </p>

                  <p className="text-sm font-medium text-[var(--text)]">
                    Follow-up analysis active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-[#FF6B4A]/20 bg-[#FF6B4A]/10 px-3 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF6B4A]" />

                <span className="text-xs font-medium text-[#FF6B4A]">
                  Challenging
                </span>
              </div>
            </div>

            {/* CHAT AREA */}
            <div className="p-6 md:p-10">
              {/* USER ANSWER */}
              <div className="ml-auto max-w-2xl rounded-2xl rounded-tr-sm border border-white/[0.08] bg-white/[0.04] p-5">
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                  Your answer
                </p>

                <p className="leading-relaxed text-[var(--text)]">
                  "I decided to prioritize the feature based on customer
                  feedback and the potential business impact."
                </p>
              </div>

              {/* CONNECTING LINE */}
              <motion.div
                style={{
                  scaleY: lineScale,
                }}
                className="my-6 ml-10 h-16 w-px origin-top bg-gradient-to-b from-[#D6FF3F] to-[#FF6B4A]/20"
              />

              {/* AI FOLLOW-UP */}
              <motion.div
                key={activeQuestion}
                initial={{
                  opacity: 0,
                  x: -40,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 20,
                }}
                className="max-w-3xl rounded-2xl rounded-tl-sm border border-[#D6FF3F]/20 bg-[#D6FF3F]/[0.04] p-6 md:p-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6FF3F]/10">
                    <MessageCircleMore className="h-5 w-5 text-[#D6FF3F]" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#D6FF3F]">
                      AI Interviewer
                    </p>

                    <p className="text-xs text-[var(--muted)]">
                      {active.tag}
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-medium leading-tight text-[var(--text)] md:text-4xl">
                  {active.question}
                </h3>

                <p className="mt-5 max-w-xl leading-relaxed text-[var(--muted)]">
                  {active.description}
                </p>
              </motion.div>

              {/* QUESTION CONTROLS */}
              <div className="mt-10 flex flex-wrap gap-3">
                {followUps.map((item, index) => (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() => setActiveQuestion(index)}
                    className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                      activeQuestion === index
                        ? "border-[#D6FF3F]/40 bg-[#D6FF3F] text-[#090B0A]"
                        : "border-white/[0.08] bg-white/[0.02] text-[var(--muted)] hover:border-[#D6FF3F]/30 hover:text-[var(--text)]"
                    }`}
                  >
                    <span>0{index + 1}</span>

                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FLOATING PRESSURE INDICATOR */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -right-6 top-1/2 hidden rounded-2xl border border-white/[0.08] bg-[#0D100E]/80 px-5 py-4 shadow-2xl backdrop-blur-xl lg:block"
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Pressure level
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 w-20 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  animate={{
                    width: ["55%", "82%", "68%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  className="h-full bg-[#FF6B4A]"
                />
              </div>

              <span className="text-xs font-bold text-[#FF6B4A]">
                HIGH
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* BOTTOM TRANSITION */}
      <motion.div
        style={{
          scaleX: lineScale,
        }}
        className="absolute bottom-0 left-[10%] right-[10%] h-px origin-center bg-gradient-to-r from-transparent via-[#FF6B4A]/40 to-transparent"
      />
    </section>
  );
};
