import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRICING_PLANS } from '../../services/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  CreditCard
} from 'lucide-react';

export const Scene10PricingCTA: React.FC = () => {
  const { 
    setView, 
    currency, 
    setCurrency, 
    billingPeriod, 
    setBillingPeriod
  } = useApp();

  return (
    <section id="pricing-section" className="py-24 relative overflow-hidden bg-slate-900/40 dark:bg-black/40 border-t border-slate-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Hero CTA Banner */}
        <div className="mb-24 glass-panel-glow rounded-3xl p-8 sm:p-14 border border-cyan-500/40 text-center relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERVIEW READINESS ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Your next interview doesn&apos;t have to be{' '}
            <span className="gradient-text-brand">your first practice.</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-normal">
            Step into the interview room with genuine confidence. Get intelligent feedback, eliminate filler words, and master your delivery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setView('onboarding')}
              className="btn-primary px-8 py-4 text-base font-bold shadow-xl shadow-cyan-500/25 flex items-center gap-2 group w-full sm:w-auto"
            >
              <span>Start Your Free Mock Interview</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            No credit card required • 1 Complete Voice + Camera Mock Interview included
          </p>
        </div>

        {/* Pricing Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <CreditCard className="w-3.5 h-3.5" />
            <span>TRANSPARENT PRICING</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Invest in your career confidence.
          </h3>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-8">
            Simple, flexible plans designed for every stage of your job search.
          </p>

          {/* Billing & Currency Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Monthly / Yearly Toggle */}
            <div className="glass-panel p-1 rounded-xl flex items-center border border-slate-200 dark:border-white/10">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  billingPeriod === 'yearly'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Yearly (Save 25%)</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[9px] font-extrabold uppercase">
                  Save
                </span>
              </button>
            </div>

            {/* Currency Switcher */}
            <div className="glass-panel p-1 rounded-xl flex items-center border border-slate-200 dark:border-white/10">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currency === 'USD'
                    ? 'bg-slate-800 text-cyan-400 dark:bg-white/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                $ USD
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currency === 'INR'
                    ? 'bg-slate-800 text-cyan-400 dark:bg-white/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ₹ INR
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isYearly = billingPeriod === 'yearly';
            const price = currency === 'USD' 
              ? (isYearly ? plan.priceYearlyUSD : plan.priceMonthlyUSD)
              : (isYearly ? plan.priceYearlyINR : plan.priceMonthlyINR);
            const symbol = currency === 'USD' ? '$' : '₹';

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-7 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.isPopular
                    ? 'glass-panel-glow border-cyan-500/50 bg-slate-900/80 dark:bg-slate-900/90 shadow-2xl scale-105 z-10'
                    : 'glass-panel border-slate-200 dark:border-white/10'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {plan.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 my-6">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                      {symbol}{price}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      / month {isYearly && price > 0 ? '(billed annually)' : ''}
                    </span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Included Features
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => setView('onboarding')}
                    className={`w-full py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
