import React from 'react';
import { REAL_WEB_DEV_SERVICES, FEATURED_CLIENT_PROJECTS } from '../data/portfolioData';
import { 
  Code2, 
  CheckCircle2, 
  Zap, 
  Layout, 
  ShieldCheck, 
  ArrowRight, 
  Laptop, 
  ExternalLink, 
  Lock, 
  Sparkles,
  ArrowUpRight,
  Database,
  Calendar,
  CreditCard,
  MessageSquare
} from 'lucide-react';

export default function WebDevCapabilities() {
  const featured = FEATURED_CLIENT_PROJECTS[0];

  return (
    <section id="web-dev" className="py-24 relative overflow-hidden bg-[#08090C]">
      {/* Background ambient neon glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4 shadow-glow-cyan/20">
            <Code2 className="w-3.5 h-3.5" />
            <span>Honest & Production-Ready Code</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Web Development That Actually Ships
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            No bloated agency retainers or unfinished mockups. We engineer ultra-fast, high-converting web applications with real-time bookings, payment gateways, and backend automations.
          </p>
        </div>

        {/* 🌟 FLAGSHIP SPOTLIGHT: abulnai.vercel.app LIVE CLIENT SHOWCASE 🌟 */}
        {featured && (
          <div className="mb-20 max-w-6xl mx-auto">
            <div className="relative rounded-3xl p-1 bg-gradient-to-r from-amber-500/40 via-brand-cyan/40 to-brand-purple/40 shadow-[0_15px_60px_rgba(245,158,11,0.12)]">
              <div className="rounded-[22px] bg-[#0b0c10] p-6 sm:p-10 relative overflow-hidden">
                
                {/* Subtle luxury ambient texture */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent pointer-events-none" />

                {/* Simulated Browser Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <span className="ml-3 font-mono text-[11px] text-slate-500 uppercase tracking-widest hidden sm:inline">
                      Live Production Build
                    </span>
                  </div>

                  {/* Browser URL Capsule */}
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 text-xs text-slate-300 hover:text-white hover:border-amber-400/50 transition-all group"
                  >
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span className="font-mono text-emerald-400 font-medium">https://</span>
                    <span className="font-mono font-semibold text-white group-hover:text-amber-300 transition-colors">
                      abulnai.vercel.app
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-400 transition-colors ml-1" />
                  </a>

                  {/* Live Status Indicator */}
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Live Client Platform
                    </span>
                  </div>
                </div>

                {/* 2-Column Content Grid: Left Story / Right Interactive Mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Project Overview & Specs (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300 uppercase tracking-wider mb-3">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Self-Made Freelance Flagship</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                        {featured.title}
                      </h3>
                      <p className="text-amber-300/90 font-medium text-xs sm:text-sm mt-1">
                        {featured.tagline}
                      </p>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {featured.description}
                    </p>

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {featured.stats.map((st, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center"
                        >
                          <span className="block font-display text-lg sm:text-xl font-bold text-amber-300">
                            {st.value}
                          </span>
                          <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                            {st.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Engineered Capabilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {featured.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {featured.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      <a
                        href={featured.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-display font-bold text-sm shadow-[0_10px_25px_rgba(245,158,11,0.3)] transition-all transform hover:-translate-y-0.5"
                      >
                        <span>Launch Live Website</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <a
                        href="#booking"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-panel border border-white/15 text-xs font-semibold text-white hover:border-amber-400/50 hover:bg-white/10 transition-all"
                      >
                        <span>Request Similar Web Platform</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Luxury Atelier Card Mockup (5 cols) */}
                  <div className="lg:col-span-5">
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group relative rounded-2xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-[#16141a] to-[#0d0d12] p-5 shadow-2xl hover:border-amber-400 transition-all duration-500"
                    >
                      {/* Top bar inside mockup */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-serif italic font-bold text-amber-400 tracking-wider text-sm">
                            ABDUL NAI
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            HAUTE COIFFURE
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                          ONLINE RESERVATIONS
                        </span>
                      </div>

                      {/* Mockup Hero Banner */}
                      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-black/90 via-[#1c1815] to-black/90 p-6 border border-amber-500/20 mb-4 group-hover:border-amber-500/50 transition-all">
                        <div className="text-[10px] font-mono tracking-widest text-amber-400 uppercase mb-2">
                          LOOK GOOD • FEEL CONFIDENT
                        </div>
                        <div className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                          The Emperor Experience
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
                          Signature haircut, 24K gold charcoal therapy, beard sculpt & royal head massage.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-amber-400 text-sm">
                            ₹2,499 • 90 Mins
                          </span>
                          <span className="text-[11px] font-semibold text-black bg-amber-400 px-3 py-1 rounded-full group-hover:bg-white transition-colors">
                            Book Slot
                          </span>
                        </div>
                      </div>

                      {/* Architecture Integration Pills */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px]">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <Calendar className="w-3.5 h-3.5 text-brand-cyan" /> Real-time Slot Engine
                          </span>
                          <span className="text-emerald-400 font-mono">0 Conflicting Slots</span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px]">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <CreditCard className="w-3.5 h-3.5 text-amber-400" /> Razorpay UPI / Cards
                          </span>
                          <span className="text-emerald-400 font-mono">Instant HMAC Verify</span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px]">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp + Sheets Sync
                          </span>
                          <span className="text-emerald-400 font-mono">Automated 24/7</span>
                        </div>
                      </div>

                      {/* Launch Hover Badge */}
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-300 font-medium group-hover:text-amber-200">
                        <span>Click to explore live deployment</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

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