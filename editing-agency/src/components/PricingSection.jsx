import React, { useState } from 'react';
import { PRICING_PLANS, FAQS } from '../data/portfolioData';
import { Check, ChevronDown, ChevronUp, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

export default function PricingSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <section id="pricing" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
            Transparent Collaboration
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Invest in Measurable Growth
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Straightforward pricing models designed for ambitious YouTube creators, emerging brands, and businesses looking for a partner, not just a contractor.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'glass-panel-glow border-2 border-brand-cyan/60 lg:-translate-y-2 shadow-glow-cyan'
                  : 'glass-panel border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-cyan to-brand-purple text-[#08090C] text-[11px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Popular for Creators</span>
                </div>
              )}

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-brand-cyan block mb-1">
                  {plan.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/5">
                  <span className="font-display text-3xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    / {plan.period}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href="#contact"
                  className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-brand-cyan to-brand-accent text-[#08090C] shadow-glow-cyan hover:brightness-110'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Got Questions? We Have Answers.
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl glass-panel border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-brand-cyan transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-brand-cyan shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
