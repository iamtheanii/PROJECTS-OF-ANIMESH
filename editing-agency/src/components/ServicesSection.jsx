import React from 'react';
import { Video, Palette, Flame, Code, CheckCircle, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

const iconComponents = {
  Video,
  Palette,
  Flame,
  Code
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-cyan/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-purple/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
            Our Core Specializations
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Creative Storytelling Meets <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
              Technical Precision
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Whether you need rapid-fire video edits to maximize watch time or a custom website engineered for conversions, we deliver studio-grade results.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconComponents[service.icon] || Video;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl p-8 glass-panel border border-white/10 hover:border-brand-cyan/40 hover:bg-[#121520]/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-brand-cyan shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-brand-cyan hover:text-white transition-colors"
                  >
                    <span>Inquire about this service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <span className="text-xs font-mono text-slate-500">0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
