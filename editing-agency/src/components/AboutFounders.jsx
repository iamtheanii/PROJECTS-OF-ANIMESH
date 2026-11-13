import React from 'react';
import { AGENCY_INFO } from '../data/portfolioData';
import { Linkedin, GraduationCap, MapPin, CheckCircle2, MessageCircle, Phone, Terminal, Sparkles, Flame, Film } from 'lucide-react';

export default function AboutFounders() {
  return (
    <section id="founders" className="py-24 bg-[#0a0c12]/60 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
            Leadership & Creative Division
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Meet the Founders Behind Glimpz
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Two distinct editing disciplines under one roof: pure aesthetic cinematic storytelling and high-octane gaming combat edits.
          </p>
        </div>

        {/* Founders Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {AGENCY_INFO.founders.map((founder, idx) => {
            const isAnimesh = idx === 0;
            return (
              <div
                key={founder.name}
                className="rounded-3xl glass-panel border border-white/10 hover:border-brand-cyan/40 p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 bg-[#090b10]"
              >
                <div>
                  {/* Header row with avatar / badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-purple p-[2px] shadow-glow-cyan shrink-0">
                        <div className="w-full h-full bg-[#08090C] rounded-[14px] flex items-center justify-center font-display font-extrabold text-2xl text-white">
                          {founder.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                          {founder.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-brand-cyan">
                          {founder.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={founder.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
                        title="Chat on WhatsApp"
                        aria-label={`${founder.name}'s WhatsApp`}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-brand-cyan/20 hover:border-brand-cyan/40 transition-all"
                        aria-label={`${founder.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Specialization Highlight Box */}
                  <div className={`p-4 rounded-2xl mb-5 border ${
                    isAnimesh
                      ? 'bg-sky-500/10 border-sky-500/25 text-sky-200'
                      : 'bg-amber-500/10 border-amber-500/25 text-amber-200'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                      {isAnimesh ? <Film className="w-3.5 h-3.5 text-sky-400" /> : <Flame className="w-3.5 h-3.5 text-amber-400" />}
                      <span className={isAnimesh ? 'text-sky-400' : 'text-amber-400'}>
                        Specialization: {founder.specialization}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {founder.bio}
                    </p>
                  </div>

                  {/* Tools & Platforms Pill Badges */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                        Editing Software & Techniques:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {founder.tools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                        Platforms Optimized:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {founder.platforms.map((plat, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan"
                          >
                            {plat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Credentials */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                  <span className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    Direct: <strong className="text-white">{founder.phone}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                    B.Tech CSE, SOA University
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* University & Technical Background Banner */}
        <div className="max-w-5xl mx-auto rounded-2xl glass-panel p-6 border border-brand-purple/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">
                The Glimpz Studio Engineering Advantage
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Pursuing Computer Science at Siksha 'O' Anusandhan University (SOA) gives our agency an unfair advantage: code optimization, digital asset automation, and systemic quality assurance.
              </p>
            </div>
          </div>
          <a
            href="#booking"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 whitespace-nowrap transition-colors"
          >
            Start a Conversation
          </a>
        </div>

      </div>
    </section>
  );
}
