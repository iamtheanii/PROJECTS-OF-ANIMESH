import React from 'react';
import { AGENCY_INFO } from '../data/portfolioData';
import { ShieldCheck, Eye, Film, Award } from 'lucide-react';

export default function TrustStats() {
  const iconMap = [Award, Eye, Film, ShieldCheck];

  return (
    <section className="py-12 border-y border-white/5 bg-[#0a0c12]/60 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {AGENCY_INFO.stats.map((stat, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <div 
                key={stat.label} 
                className="flex flex-col items-center md:items-start p-4 rounded-xl glass-panel hover:border-brand-cyan/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-300 mb-0.5 text-center md:text-left">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-500 font-medium text-center md:text-left">
                  {stat.highlight}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
