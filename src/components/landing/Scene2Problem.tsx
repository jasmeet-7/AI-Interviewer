import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Brain, MicOff, MessageSquareWarning } from "lucide-react";

export const Scene2Problem: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Main text moves forward */
  const textY = useTransform(scrollYProgress, [0, 0.5], [140, 0]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 1]
  );

  /* Cards create depth */
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.6],
    [-250, 0]
  );

  const rightX = useTransform(
    scrollYProgress,
    [0, 0.6],
    [250, 0]
  );

  const middleY = useTransform(
    scrollYProgress,
    [0, 0.6],
    [180, 0]
  );

  const rotateLeft = useTransform(
    scrollYProgress,
    [0, 0.6],
    [-18, 0]
  );

  const rotateRight = useTransform(
    scrollYProgress,
    [0, 0.6],
    [18, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-6 py-32"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B4A]/[0.04] blur-[160px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
          }}
          className="mx-auto mb-24 max-w-3xl text-center"
        >
          <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#FF6B4A]">
            The real problem
          </p>

          <h2 className="text-5xl font-semibold tracking-[-0.04em] text-[var(--text)] md:text-7xl">
            You don't fail because
            <br />
            you don't know enough.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            You fail when pressure changes the way you think, speak,
            and respond.
          </p>
        </motion.div>

        {/* 3D card space */}
        <div
          className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-3"
          style={{ perspective: "1200px" }}
        >

          {/* Card 1 */}
          <motion.div
            style={{
              x: leftX,
              rotateY: rotateLeft,
            }}
            className="glass min-h-[280px] rounded-[2rem] p-8"
          >
            <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B4A]/10 text-[#FF6B4A]">
              <MicOff size={26} />
            </div>

            <h3 className="text-2xl font-semibold text-[var(--text)]">
              You freeze.
            </h3>

            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              You know the answer, but pressure interrupts your ability
              to communicate it clearly.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            style={{
              y: middleY,
              scale: useTransform(
                scrollYProgress,
                [0, 0.6],
                [0.82, 1]
              ),
            }}
            className="glass relative z-10 min-h-[310px] rounded-[2rem] border-[#D6FF3F]/20 p-8 shadow-[0_30px_100px_rgba(214,255,63,0.06)]"
          >
            <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D6FF3F]/10 text-[#D6FF3F]">
              <Brain size={26} />
            </div>

            <h3 className="text-2xl font-semibold text-[var(--text)]">
              You overthink.
            </h3>

            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              The question becomes harder because you're trying to find
              the perfect answer instead of thinking clearly.
            </p>

            <div className="absolute bottom-6 right-6 h-3 w-3 animate-pulse rounded-full bg-[#D6FF3F]" />
          </motion.div>

          {/* Card 3 */}
          <motion.div
            style={{
              x: rightX,
              rotateY: rotateRight,
            }}
            className="glass min-h-[280px] rounded-[2rem] p-8"
          >
            <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B4A]/10 text-[#FF6B4A]">
              <MessageSquareWarning size={26} />
            </div>

            <h3 className="text-2xl font-semibold text-[var(--text)]">
              You lose structure.
            </h3>

            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              Your ideas are good, but your answer starts wandering
              when the interviewer pushes deeper.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Decorative depth lines */}
      <motion.div
        style={{
          scaleX: useTransform(
            scrollYProgress,
            [0, 0.6],
            [0.2, 1]
          ),
        }}
        className="absolute bottom-0 left-[10%] right-[10%] h-px origin-center bg-gradient-to-r from-transparent via-[#D6FF3F]/40 to-transparent"
      />
    </section>
  );
};
