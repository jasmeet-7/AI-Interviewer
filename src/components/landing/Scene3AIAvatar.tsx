import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { AudioLines, BrainCircuit, Eye } from "lucide-react";

const ORBS = [
  { id: "voice", label: "VOICE", angle: 0, color: "#D6FF3F" },
  { id: "confidence", label: "CONFIDENCE", angle: 60, color: "#A78BFA" },
  { id: "reasoning", label: "REASONING", angle: 120, color: "#D6FF3F" },
  { id: "grammar", label: "GRAMMAR", angle: 180, color: "#FF6B4A" },
  { id: "clarity", label: "CLARITY", angle: 240, color: "#A78BFA" },
  { id: "presence", label: "PRESENCE", angle: 300, color: "#D6FF3F" },
];

export const Scene3AIAvatar: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeOrb, setActiveOrb] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const eyeX = useTransform(smoothX, [-250, 250], [-12, 12]);
  const eyeY = useTransform(smoothY, [-250, 250], [-8, 8]);

  const rotateY = useTransform(smoothX, [-300, 300], [-10, 10]);
  const rotateX = useTransform(smoothY, [-300, 300], [8, -8]);

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

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-6 py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A78BFA]/[0.06] blur-[180px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

        {/* INTERACTIVE AI SYSTEM */}
        <motion.div
          style={{
            scale: avatarScale,
            rotateY: avatarRotate,
            opacity,
            perspective: 1200,
          }}
          className="relative flex min-h-[600px] items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={resetMouse}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative flex h-[520px] w-[520px] items-center justify-center"
          >

            {/* ROTATING RINGS */}
            <motion.div
              style={{ rotate: ringRotate }}
              className="absolute h-[460px] w-[460px] rounded-full border border-[#A78BFA]/20"
            />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[370px] w-[370px] rounded-full border border-dashed border-[#D6FF3F]/25"
            />

            {/* INTERACTIVE ORBS */}
            {ORBS.map((orb) => {
              const radians = (orb.angle * Math.PI) / 180;

              const x = Math.cos(radians) * 210;
              const y = Math.sin(radians) * 210;

              const isActive = activeOrb === orb.id;

              return (
                <motion.button
                  key={orb.id}
                  type="button"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  whileHover={{
                    scale: 1.6,
                    z: 80,
                  }}
                  whileTap={{ scale: 0.85 }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 15,
                  }}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.8, 1.35],
                        }
                      : {}
                  }
                  onClick={() =>
                    setActiveOrb(
                      activeOrb === orb.id ? null : orb.id
                    )
                  }
                  style={{
                    x,
                    y,
                    backgroundColor: orb.color,
                    boxShadow: isActive
                      ? `0 0 50px ${orb.color}`
                      : `0 0 20px ${orb.color}66`,
                  }}
                  className="group absolute z-30 flex h-4 w-4 items-center justify-center rounded-full cursor-pointer outline-none"
                  aria-label={orb.label}
                >
                  <span className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[9px] tracking-[0.18em] text-[var(--text)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {orb.label}
                  </span>

                  {isActive && (
                    <motion.span
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute h-4 w-4 rounded-full border"
                      style={{
                        borderColor: orb.color,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}

            {/* AI CORE */}
            <motion.button
              type="button"
              onClick={() => setFocused(!focused)}
              animate={
                focused
                  ? {
                      scale: [1, 1.12, 1.05],
                    }
                  : {
                      scale: 1,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
              className="relative z-20 flex h-56 w-56 cursor-pointer items-center justify-center rounded-full border border-[#D6FF3F]/30 bg-[#121214] outline-none"
              style={{
                boxShadow: focused
                  ? "0 0 160px rgba(214,255,63,0.35)"
                  : "0 0 120px rgba(214,255,63,0.12)",
              }}
              aria-label="Activate AI interviewer"
            >
              <div className="absolute inset-5 rounded-full border border-[#A78BFA]/30" />

              <motion.div
                animate={{
                  scale: focused
                    ? [1, 1.5, 1.15]
                    : [1, 1.15, 1],
                }}
                transition={{
                  duration: focused ? 0.8 : 2,
                  repeat: focused ? 0 : Infinity,
                }}
                className="absolute h-28 w-28 rounded-full bg-[#D6FF3F]/10 blur-xl"
              />

              {/* EYE */}
              <div
                className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#D6FF3F]/50 bg-[#0A0A0B]"
              >
                <motion.div
                  style={{
                    x: eyeX,
                    y: eyeY,
                  }}
                  animate={
                    focused
                      ? {
                          scale: [1, 1.2, 1],
                        }
                      : {}
                  }
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D6FF3F]"
                >
                  <div className="h-7 w-7 rounded-full bg-[#0A0A0B]" />
                </motion.div>

                <Eye
                  size={34}
                  className="pointer-events-none absolute text-[#D6FF3F]/25"
                />
              </div>
            </motion.button>

            {/* STATUS CARD */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="glass absolute left-0 top-20 z-40 rounded-2xl px-4 py-3"
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
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="glass absolute bottom-20 right-0 z-40 rounded-2xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <BrainCircuit size={18} className="text-[#A78BFA]" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
                    AI State
                  </p>
                  <p className="text-sm text-[var(--text)]">
                    {focused ? "Focused" : "Observing"}
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Active orb information */}
          {activeOrb && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#D6FF3F]/20 bg-[var(--surface)] px-5 py-3 text-xs text-[var(--text)] shadow-2xl"
            >
              Analyzing{" "}
              <span className="text-[#D6FF3F]">
                {ORBS.find(
                  (orb) => orb.id === activeOrb
                )?.label}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* CONTENT */}
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
            Move your cursor around the interviewer. The AI follows you.
            Click the eye to focus it, or interact with the floating
            signals to explore what SmartPrepration analyzes.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "Voice and speaking patterns",
              "Confidence and hesitation",
              "Reasoning and answer structure",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D6FF3F]/30 text-xs text-[#D6FF3F]">
                  0{index + 1}
                </span>

                <span className="text-[var(--text)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
