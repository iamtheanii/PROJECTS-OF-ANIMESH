import React from 'react';
import { REAL_WEB_DEV_SERVICES } from '../data/portfolioData';
import { Code2, CheckCircle2, Zap, Layout, ShieldCheck, ArrowRight, Laptop } from 'lucide-react';

export default function WebDevCapabilities() {
  return (
    <section id="web-dev" className="py-24 relative overflow-hidden bg-[#08090C]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-brand-cyan/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>Honest & Production-Ready Code</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Web Development That Actually Ships
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            No bloated buzzwords or unrealistic promises. We build modern, lightning-fast web applications and high-converting landing pages crafted for creators and growing businesses.
          </p>
        </div>

        {/* 4 Realistic Web Dev Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14">
          {REAL_WEB_DEV_SERVICES.map((srv, index) => (
            <div
              key={srv.id}
              className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 hover:border-brand-cyan/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider bg-brand-cyan/10 px-2.5 py-1 rounded-md border border-brand-cyan/20">
                    {srv.deliverable}
                  </span>
                  <span className="text-xs font-mono text-slate-500">0{index + 1}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                  {srv.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {srv.description}
                </p>

                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Core Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {srv.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <a
                  href="#booking"
                  className="inline-flex items-center gap-1.5 text-brand-cyan hover:text-white font-semibold transition-colors"
                >
                  <span>Request This Build</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Tech
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Code Quality Guarantee Banner */}
        <div className="max-w-5xl mx-auto rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-brand-card via-[#0e111a] to-brand-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                Full Code Handover & Zero Vendor Lock-in
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                You own 100% of your source code, GitHub repository, and deployment accounts. We deploy on modern free/low-cost platforms (Vercel, Netlify, Cloudflare).
              </p>
            </div>
          </div>

          <a
            href="#booking"
            className="px-6 py-3 rounded-xl text-xs font-bold bg-white text-black hover:bg-brand-cyan transition-colors shrink-0 shadow-lg"
          >
            Inquire Web Project
          </a>
        </div>

      </div>
    </section>
  );
}
