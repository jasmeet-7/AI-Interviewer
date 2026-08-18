import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AudioLines, Eye, BrainCircuit } from "lucide-react";

export const Scene3AIAvatar: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.45], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const avatarScale = useTransform(
    scrollYProgress,
    [0, 0.45],
    [0.65, 1]
  );

  const avatarRotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [-12, 0]
  );

  const ringRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 180]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-6 py-32"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A78BFA]/[0.06] blur-[180px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
        {/* LEFT — AI VISUAL */}
        <motion.div
          style={{
            scale: avatarScale,
            rotateY: avatarRotate,
            opacity,
          }}
          className="relative flex min-h-[560px] items-center justify-center"
        >
          {/* Outer rotating system */}
          <motion.div
            style={{ rotate: ringRotate }}
            className="absolute h-[460px] w-[460px] rounded-full border border-[#A78BFA]/20"
          />

          <motion.div
            style={{ rotate: ringRotate }}
            className="absolute h-[360px] w-[360px] rounded-full border border-dashed border-[#D6FF3F]/20"
          />

          {/* Floating data cards */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="glass absolute left-0 top-24 z-20 rounded-2xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <AudioLines size={18} className="text-[#D6FF3F]" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
                  Voice
                </p>
                <p className="text-sm text-[var(--text)]">
                  Listening
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="glass absolute bottom-24 right-0 z-20 rounded-2xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <BrainCircuit size={18} className="text-[#A78BFA]" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
                  Reasoning
                </p>
                <p className="text-sm text-[var(--text)]">
                  Analyzing
                </p>
              </div>
            </div>
          </motion.div>

          {/* AI CORE */}
          <div className="relative z-10 flex h-56 w-56 items-center justify-center rounded-full border border-[#D6FF3F]/30 bg-[#121214] shadow-[0_0_120px_rgba(214,255,63,0.12)]">
            <div className="absolute inset-5 rounded-full border border-[#A78BFA]/30" />

            <div className="absolute h-28 w-28 animate-pulse rounded-full bg-[#D6FF3F]/10 blur-xl" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#D6FF3F]/50 bg-[#0A0A0B]">
              <Eye
                size={38}
                className="text-[#D6FF3F]"
              />
            </div>
          </div>

          {/* Orbit particles */}
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <motion.div
              key={item}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 12 + item * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[430px] w-[430px]"
            >
              <div
                className="absolute h-2 w-2 rounded-full bg-[#D6FF3F]"
                style={{
                  left: `${50 + Math.cos(item * 1.05) * 48}%`,
                  top: `${50 + Math.sin(item * 1.05) * 48}%`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* RIGHT — CONTENT */}
        <motion.div
          style={{
            y: contentY,
            opacity,
          }}
        >
          <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#A78BFA]">
            Meet your interviewer
          </p>

          <h2 className="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--text)] md:text-7xl">
            It doesn't just
            <br />
            ask questions.
            <br />
            <span className="text-[#D6FF3F]">
              It listens.
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            SmartPrepration reacts to the way you answer. It notices
            hesitation, follows your reasoning, challenges weak answers,
            and pushes the conversation deeper—just like a real interviewer.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "Listens to your voice and responses",
              "Adapts follow-up questions in real time",
              "Challenges your reasoning when needed",
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="flex items-center gap-4"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D6FF3F]/30 text-xs text-[#D6FF3F]">
                  0{index + 1}
                </span>

                <span className="text-[var(--text)]">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
