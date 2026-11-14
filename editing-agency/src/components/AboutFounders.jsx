import React from 'react';
import { AGENCY_INFO } from '../data/portfolioData';
import { Linkedin, GraduationCap, MessageCircle, Phone, Sparkles, Flame, Film, Code2, Award, ArrowUpRight } from 'lucide-react';

export default function AboutFounders() {
  const [animesh, biswajit] = AGENCY_INFO.founders;

  return (
    <section id="founders" className="py-24 bg-[#06070a] border-t border-white/5 relative z-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Studio Leadership & Creative Division</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Meet the Founders Behind Glimpz
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Two specialized editing disciplines under one roof: pure aesthetic cinematic storytelling and high-octane gaming combat velocity.
          </p>
        </div>

        {/* 🪪 DUAL STUDIO PASSES / EDITORIAL DOSSIERS (COMPLETELY DISTINCT FROM CARDS) 🪪 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          
          {/* DOSSIER 1: ANIMESH GHOSH (Cinematic & Aesthetic Lead) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0e1622] via-[#090d14] to-[#07090d] border border-sky-500/20 p-7 sm:p-9 overflow-hidden group hover:border-sky-400/50 transition-all duration-300 shadow-[0_10px_40px_rgba(14,165,233,0.06)]">
            {/* Top Pass Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-sky-400 font-bold">
                  PASS #01 // CREATIVE DIRECTION
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={animesh.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-xs font-mono flex items-center gap-1.5"
                  title="WhatsApp Animesh"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={animesh.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Profile Row */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 p-[2px] shadow-lg shrink-0">
                <div className="w-full h-full bg-[#080d16] rounded-[14px] flex items-center justify-center font-display font-extrabold text-2xl text-white">
                  AG
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                  {animesh.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-sky-400 font-semibold uppercase tracking-wider">
                  <Film className="w-3.5 h-3.5" /> {animesh.role}
                </span>
              </div>
            </div>

            {/* Discipline Highlight */}
            <div className="mb-6 p-4 rounded-xl bg-sky-950/30 border border-sky-500/20">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block mb-1">
                DISCIPLINE & STYLE:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {animesh.bio}
              </p>
            </div>

            {/* Software Mastery Strip */}
            <div className="space-y-3 mb-6">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                Primary Suite & Craft:
              </span>
              <div className="flex flex-wrap gap-2">
                {animesh.tools.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono font-medium px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Credentials */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-slate-300">
                📞 {animesh.phone}
              </span>
              <span className="text-sky-400 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" /> SOA University CS
              </span>
            </div>
          </div>

          {/* DOSSIER 2: BISWAJIT DAS (High-Octane Combat & Tech Lead) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#1b140e] via-[#120d09] to-[#0a0705] border border-amber-500/20 p-7 sm:p-9 overflow-hidden group hover:border-amber-400/50 transition-all duration-300 shadow-[0_10px_40px_rgba(245,158,11,0.06)]">
            {/* Top Pass Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                  PASS #02 // TECHNICAL DIRECTION
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={biswajit.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-xs font-mono flex items-center gap-1.5"
                  title="WhatsApp Biswajit"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={biswajit.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Profile Row */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-600 p-[2px] shadow-lg shrink-0">
                <div className="w-full h-full bg-[#140e0a] rounded-[14px] flex items-center justify-center font-display font-extrabold text-2xl text-white">
                  BD
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {biswajit.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5" /> {biswajit.role}
                </span>
              </div>
            </div>

            {/* Discipline Highlight */}
            <div className="mb-6 p-4 rounded-xl bg-amber-950/30 border border-amber-500/20">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                DISCIPLINE & STYLE:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {biswajit.bio}
              </p>
            </div>

            {/* Software Mastery Strip */}
            <div className="space-y-3 mb-6">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                Primary Suite & Craft:
              </span>
              <div className="flex flex-wrap gap-2">
                {biswajit.tools.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono font-medium px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Credentials */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-slate-300">
                📞 {biswajit.phone}
              </span>
              <span className="text-amber-400 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" /> SOA University CS
              </span>
            </div>
          </div>

        </div>

        {/* Agency Advantage Note */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#090b10] border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-brand-cyan font-mono text-lg font-bold">&gt;_</span>
            <p className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">Computer Science Engineering Foundation:</strong> Both founders apply data-driven retention analytics, automated asset pipelines, and systematic quality assurance to every video and web project.
            </p>
          </div>
          <a
            href="#booking"
            className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-xs font-medium text-white hover:text-brand-cyan transition-colors shrink-0"
          >
            Start a Conversation
          </a>
        </div>

      </div>
    </section>
  );
}