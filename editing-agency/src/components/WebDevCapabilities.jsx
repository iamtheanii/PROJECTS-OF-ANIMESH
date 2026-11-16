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
  Globe,
  Eye
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

        {/* 🌟 LIVE CLIENT REFERENCE: abdulnai.vercel.app WITH FRONT LANDING PAGE SHOWCASE 🌟 */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-amber-500/40 via-white/15 to-brand-cyan/40 shadow-[0_15px_50px_rgba(245,158,11,0.08)]">
            <div className="rounded-[23px] bg-[#0c0d12] p-5 sm:p-8 overflow-hidden">
              
              {/* Top Meta Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Live Client Platform Reference
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="font-mono text-xs text-amber-300">
                      Haute Coiffure & Luxury Grooming
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-white">
                    ABDUL NAI — Luxury Unisex Salon & Spa Platform
                  </h3>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="https://abdulnai.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-display font-bold text-xs shadow-lg transition-all"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Launch abdulnai.vercel.app</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Interactive Front Landing Page Visual Browser Mockup (Exact match to uploaded screenshot) */}
              <a
                href="https://abdulnai.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-2xl overflow-hidden border border-white/15 bg-black hover:border-amber-400/60 transition-all duration-500 shadow-2xl"
                title="Click to view live abdulnai.vercel.app website"
              >
                {/* Simulated macOS / Chrome Browser Bar */}
                <div className="bg-[#14161f] px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>

                  <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-slate-300 group-hover:text-amber-300 transition-colors">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>https://abdulnai.vercel.app</span>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 group-hover:text-white">
                    <Eye className="w-3 h-3 text-amber-400" />
                    <span className="hidden sm:inline">Click to preview live</span>
                  </div>
                </div>

                {/* Actual Front Landing Page Screenshot */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#08090C]">
                  <img
                    src="/abdulnai-landing.jpg"
                    alt="Abdul Nai Luxury Salon Front Landing Page Preview"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  
                  {/* Subtle Gradient Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between">
                    <div>
                      <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider block">
                        Live Production Deployment
                      </span>
                      <span className="font-display text-lg font-bold text-white">
                        Click anywhere to open live interactive website
                      </span>
                    </div>
                    <span className="px-4 py-2 rounded-full bg-white text-black font-display font-bold text-xs flex items-center gap-1.5 shadow-xl">
                      <span>Explore Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </a>

              {/* Bottom Feature Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-2 border-t border-white/5 text-xs text-slate-400">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    Next.js 14 App Router
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    Real-time Appointment Slot Picker
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    Razorpay Gateway (UPI/Cards)
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    Automated WhatsApp Confirmations
                  </span>
                </div>

                <a
                  href="#booking"
                  className="inline-flex items-center gap-1.5 text-brand-cyan hover:text-white font-semibold text-xs transition-colors"
                >
                  <span>Request Similar Custom Platform</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* 🛠️ DISTINCT INTERACTIVE BLUEPRINT CONSOLE 🛠️ */}
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