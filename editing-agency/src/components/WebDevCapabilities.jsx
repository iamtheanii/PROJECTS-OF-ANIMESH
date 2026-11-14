import React, { useState } from 'react';
import { REAL_WEB_DEV_SERVICES } from '../data/portfolioData';
import { 
  Code2, 
  CheckCircle2, 
  Laptop, 
  ExternalLink, 
  Lock, 
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Layers,
  Terminal,
  Zap,
  ShieldCheck,
  Globe
} from 'lucide-react';

export default function WebDevCapabilities() {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const activeService = REAL_WEB_DEV_SERVICES[selectedServiceIndex];

  return (
    <section id="web-dev" className="py-24 relative overflow-hidden bg-[#07080b]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-cyan/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4 shadow-glow-cyan/20">
            <Code2 className="w-3.5 h-3.5" />
            <span>Honest & Production-Ready Code</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Web Development That Actually Ships
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            High-converting web applications, creator portfolios, and automated client booking systems engineered for speed and conversion.
          </p>
        </div>

        {/* 🌟 LIVE CLIENT REFERENCE: abdulnai.vercel.app (CLEAN, NO OVERLOAD) 🌟 */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-amber-500/30 via-white/10 to-brand-cyan/30">
            <div className="rounded-[15px] bg-[#0c0d12] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left Info: Simple client reference */}
              <div className="space-y-3 max-w-xl text-left">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Live Client Reference
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="font-mono text-[11px] text-slate-400">
                    Full-Stack Booking Platform
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Abdul Nai — Haute Coiffure & Luxury Grooming</span>
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  A high-end salon web platform engineered by Glimpz Studio with online appointment booking, digital service menu, and automated customer sync.
                </p>

                {/* Minimalist Tech Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    Next.js 14
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    Online Appointments
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    Razorpay Gateway
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    WhatsApp Automation
                  </span>
                </div>
              </div>

              {/* Right Action: Clean Reference CTA Pill */}
              <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 shrink-0 w-full md:w-auto">
                <a
                  href="https://abdulnai.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-display font-bold text-xs hover:bg-brand-cyan transition-all shadow-glow-card"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit abdulnai.vercel.app</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#booking"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-xs font-medium text-slate-300 hover:text-white transition-all text-center"
                >
                  <span>Build Similar Website</span>
                  <ArrowRight className="w-3 h-3 text-brand-cyan" />
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* 🛠️ DISTINCT INTERACTIVE BLUEPRINT CONSOLE (NOT GENERIC CARDS!) 🛠️ */}
        <div className="max-w-5xl mx-auto">
          <div className="text-left mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
              Select Architecture Tier:
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column: Interactive Tier Selector Ribbon (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5 flex flex-col justify-between">
              {REAL_WEB_DEV_SERVICES.map((srv, idx) => {
                const isSelected = idx === selectedServiceIndex;
                return (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedServiceIndex(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-brand-cyan/15 via-[#0e131d] to-[#0d1017] border-brand-cyan/60 shadow-[0_4px_25px_rgba(34,211,238,0.15)]'
                        : 'bg-[#0a0c10] border-white/5 hover:border-white/20 hover:bg-[#0e1118]'
                    }`}
                  >
                    {/* Active accent vertical line */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-cyan" />
                    )}

                    <div className="pl-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] text-slate-500">
                          0{idx + 1}
                        </span>
                        <h4 className={`font-display text-sm sm:text-base font-bold transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {srv.title}
                        </h4>
                      </div>
                      <span className="font-mono text-xs text-brand-cyan font-medium">
                        Turnaround: {srv.deliverable}
                      </span>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'bg-brand-cyan text-black' : 'bg-white/5 text-slate-400 group-hover:text-white'
                    }`}>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Dynamic Terminal / Blueprint Inspector (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-[#090b10] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              {/* Terminal Title Bar */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-brand-cyan" />
                    <span className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                      Specification Inspector
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-mono text-xs font-bold">
                    Est. {activeService.deliverable}
                  </span>
                </div>

                {/* Service Details */}
                <h3 className="font-display text-2xl font-extrabold text-white mb-3">
                  {activeService.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {activeService.description}
                </p>

                {/* Tech Stack Specs */}
                <div className="space-y-3 mb-8">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block">
                    Core Engineering Stack:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeService.tech.map((t, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Console Action */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> 100% Source Code Handover
                </span>

                <a
                  href="#booking"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-cyan hover:bg-cyan-300 text-black font-display font-bold text-xs transition-colors"
                >
                  <span>Request This Build</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Live Code Quality Guarantee Banner */}
        <div className="max-w-5xl mx-auto mt-12 rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0a0c10]">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-white mb-0.5">
                Full Code Handover & Zero Vendor Lock-in
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You own 100% of your source code, GitHub repository, and deployment accounts on Vercel, Netlify, or Cloudflare.
              </p>
            </div>
          </div>

          <a
            href="#booking"
            className="px-5 py-2.5 rounded-full text-xs font-bold bg-white text-black hover:bg-brand-cyan transition-colors shrink-0 shadow-md"
          >
            Inquire Web Project
          </a>
        </div>

      </div>
    </section>
  );
}