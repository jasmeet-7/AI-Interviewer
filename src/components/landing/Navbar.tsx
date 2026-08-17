import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  ArrowRight, 
  Menu, 
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setView, theme, toggleTheme, currency, setCurrency } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'How It Works', action: () => { setView('landing'); setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { label: 'Interview Modes', action: () => { setView('landing'); setTimeout(() => document.getElementById('interview-modes')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { label: 'Practice Questions', action: () => setView('questions') },
    { label: 'Candidate Dashboard', action: () => setView('dashboard') },
    { label: 'Pricing', action: () => { setView('landing'); setTimeout(() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-[#0B0F17]/85 dark:bg-[#0B0F17]/85 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-lg' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setView('landing')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                  SmartPrepration
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 rounded uppercase tracking-wider">
                  AI 3D
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wider">
                Learn. Practice. Execute.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 glass-panel px-4 py-1.5 rounded-full">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Currency Switcher */}
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg hover:border-cyan-500/50 transition-colors"
              title="Toggle Currency"
            >
              {currency === 'USD' ? '$ USD' : '₹ INR'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => setView('onboarding')}
              className="btn-primary px-4 py-2 text-xs lg:text-sm font-semibold flex items-center gap-2 group"
            >
              <span>Try Free Interview</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-lg"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-5 glass-panel rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-400 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-white/5 rounded-lg text-slate-300"
              >
                Currency: {currency}
              </button>
              <button
                onClick={() => {
                  setView('onboarding');
                  setMobileMenuOpen(false);
                }}
                className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Try Free Interview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
