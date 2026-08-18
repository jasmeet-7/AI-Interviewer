import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import {
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { setView, theme, toggleTheme, currency, setCurrency } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    {
      label: "How It Works",
      action: () => {
        setView("landing");

        setTimeout(() => {
          document
            .getElementById("how-it-works")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      },
    },
    {
      label: "Interview Modes",
      action: () => {
        setView("landing");

        setTimeout(() => {
          document
            .getElementById("interview-modes")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      },
    },
    {
      label: "Practice Questions",
      action: () => setView("questions"),
    },
    {
      label: "Candidate Dashboard",
      action: () => setView("dashboard"),
    },
    {
      label: "Pricing",
      action: () => {
        setView("landing");

        setTimeout(() => {
          document
            .getElementById("pricing-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      },
    },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b border-white/[0.06] bg-[#090B0A]/85 py-3 backdrop-blur-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* BRAND */}
          <div
            onClick={() => setView("landing")}
            className="group flex cursor-pointer select-none items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D6FF3F]/20 bg-[#111410] shadow-[0_0_25px_rgba(214,255,63,0.08)] transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-[#D6FF3F]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-[#F4F1EA] transition-colors group-hover:text-[#D6FF3F]">
                  SmartPrepration
                </span>

                <span className="rounded-md border border-[#D6FF3F]/20 bg-[#D6FF3F]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D6FF3F]">
                  AI 3D
                </span>
              </div>

              <span className="text-[11px] font-medium tracking-wider text-[#8B9189]">
                Learn. Practice. Execute.
              </span>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-1.5 backdrop-blur-xl md:flex">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="rounded-full px-3 py-2 text-xs font-medium text-[#9BA39A] transition-all hover:bg-white/[0.05] hover:text-[#F4F1EA] lg:text-sm"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* RIGHT CONTROLS */}
          <div className="hidden items-center gap-3 sm:flex">

            {/* CURRENCY */}
            <button
              onClick={() =>
                setCurrency(currency === "USD" ? "INR" : "USD")
              }
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs font-semibold text-[#B8C0B5] transition-all hover:border-[#D6FF3F]/30 hover:text-[#D6FF3F]"
              title="Toggle Currency"
            >
              {currency === "USD" ? "$ USD" : "₹ INR"}
            </button>

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-[#B8C0B5] transition-colors hover:bg-white/[0.05] hover:text-[#D6FF3F]"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-[#D6FF3F]" />
              ) : (
                <Moon className="h-4 w-4 text-[#D6FF3F]" />
              )}
            </button>

            {/* CTA */}
            <button
              onClick={() => setView("onboarding")}
              className="group flex items-center gap-2 rounded-xl bg-[#D6FF3F] px-5 py-3 text-xs font-bold text-[#090B0A] shadow-[0_0_30px_rgba(214,255,63,0.12)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(214,255,63,0.25)] lg:text-sm"
            >
              <span>Try Free Interview</span>

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-[#B8C0B5]"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-[#D6FF3F]" />
              ) : (
                <Moon className="h-4 w-4 text-[#D6FF3F]" />
              )}
            </button>

            <button
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="rounded-lg p-2 text-[#F4F1EA] transition-colors hover:bg-white/[0.05]"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#0D100E]/95 p-3 shadow-2xl backdrop-blur-2xl md:hidden">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm text-[#B8C0B5] transition-colors hover:bg-white/[0.05] hover:text-[#D6FF3F]"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                setView("onboarding");
                setMobileMenuOpen(false);
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D6FF3F] px-4 py-3 font-bold text-[#090B0A]"
            >
              Try Free Interview
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
