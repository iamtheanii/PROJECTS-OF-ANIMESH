import React from 'react';
import { WORKFLOW_STEPS } from '../data/portfolioData';
import { Compass, Scissors, Wand2, Rocket } from 'lucide-react';

const stepIcons = {
  Compass,
  Scissors,
  Wand2,
  Rocket
};

export default function WorkflowSection() {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
            Streamlined Execution
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            How We Turn Ideas Into Masterpieces
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No endless revision loops or dropped deadlines. A razor-sharp 4-step workflow engineered for speed and quality.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = stepIcons[step.icon] || Compass;
            return (
              <div
                key={step.step}
                className="group relative rounded-2xl p-6 glass-panel border border-white/10 hover:border-brand-cyan/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-brand-cyan to-brand-purple">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-[#08090C] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[11px] font-mono text-slate-500">
                  <span>Phase {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
