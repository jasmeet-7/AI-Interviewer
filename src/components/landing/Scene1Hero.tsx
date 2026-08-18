import React from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export const Scene1Hero: React.FC = () => {
  return (
    <section className="ambient-bg relative min-h-screen overflow-hidden px-6 pt-32 pb-20">
      
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,240,233,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(242,240,233,0.4) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Decorative glow */}
      <div className="absolute right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#D6FF3F]/[0.06] blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="relative z-10">
          
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)]">
            <Sparkles size={15} className="text-[#D6FF3F]" />
            AI-powered interview preparation
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--text)] md:text-5xl lg:text-6xl">
            Don't just prepare
            <br />
            for the{" "}
            <span className="text-[#D6FF3F]">
              interview.
            </span>
            <br />
            Prepare for the
            <br />
            <span className="text-[var(--muted)]">
              pressure.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
            Practice with an AI interviewer that listens to how you speak,
            challenges your reasoning, detects hesitation, and helps you
            become genuinely interview-ready.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            
            <button className="btn-primary flex items-center gap-3 rounded-full px-7 py-4 font-semibold">
              Try your first interview
              <ArrowRight size={18} />
            </button>

            <button className="btn-secondary flex items-center gap-3 rounded-full px-7 py-4 font-medium">
              <Play size={16} />
              See how it works
            </button>

          </div>

          <p className="mt-5 text-sm text-[var(--muted)]">
            No pressure. Start with a free interview.
          </p>
        </div>

        {/* RIGHT SIDE — 3D INTERVIEW CARD */}
        <div className="relative flex min-h-[500px] items-center justify-center">
          
          {/* Orbit */}
          <div className="absolute h-[440px] w-[440px] rounded-full border border-[#D6FF3F]/20 animate-[spin_18s_linear_infinite]" />

          <div className="absolute h-[340px] w-[340px] rounded-full border border-[var(--border)]" />

          {/* Main AI panel */}
          <div className="glass relative z-10 w-full max-w-md rounded-[2rem] p-5 shadow-2xl transition-transform duration-500 hover:rotate-[1deg] hover:scale-[1.02]">
            
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Interview session
                </p>

                <h3 className="mt-1 font-medium text-[var(--text)]">
                  Product Manager
                </h3>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#D6FF3F]/10 px-3 py-1.5 text-xs text-[#D6FF3F]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#D6FF3F]" />
                Listening
              </div>
            </div>

            {/* AI Core */}
            <div className="relative flex h-64 items-center justify-center">
              
              <div className="absolute h-48 w-48 animate-pulse rounded-full bg-[#D6FF3F]/10 blur-2xl" />

              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-[#D6FF3F]/40 bg-[#D6FF3F]/10 shadow-[0_0_80px_rgba(214,255,63,0.15)]">
                <div className="h-20 w-20 rounded-full border border-[#D6FF3F]/50 bg-[#0A0A0B]" />
              </div>

              {/* Floating analysis */}
              <div className="absolute right-0 top-8 glass rounded-2xl px-4 py-3 text-xs">
                <p className="text-[var(--muted)]">Confidence</p>
                <p className="mt-1 text-lg font-semibold text-[#D6FF3F]">
                  82%
                </p>
              </div>

              <div className="absolute bottom-5 left-0 glass rounded-2xl px-4 py-3 text-xs">
                <p className="text-[var(--muted)]">Speaking pace</p>
                <p className="mt-1 font-medium text-[var(--text)]">
                  Good
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-black/20 p-4">
              <p className="text-xs text-[var(--muted)]">
                AI INTERVIEWER
              </p>

              <p className="mt-2 leading-relaxed text-[var(--text)]">
                “Tell me about a time you had to make a difficult decision with
                limited information.”
              </p>
            </div>

            {/* Voice wave */}
            <div className="mt-5 flex h-10 items-center justify-center gap-1">
              {[20, 35, 18, 45, 28, 52, 30, 40, 22, 36, 18].map(
                (height, index) => (
                  <span
                    key={index}
                    className="w-1 rounded-full bg-[#D6FF3F] animate-pulse"
                    style={{
                      height: `${height}px`,
                      animationDelay: `${index * 0.08}s`,
                    }}
                  />
                )
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
        <span>Scroll to enter</span>
        <div className="h-8 w-px bg-gradient-to-b from-[#D6FF3F] to-transparent" />
      </div>

    </section>
  );
};
