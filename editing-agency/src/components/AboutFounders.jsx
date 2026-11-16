import React from 'react';
import { AGENCY_INFO } from '../data/portfolioData';
import { 
  Linkedin, 
  MessageCircle, 
  Sparkles, 
  Flame, 
  Film, 
  Code2, 
  Award, 
  ArrowUpRight, 
  Globe, 
  Briefcase,
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function AboutFounders() {
  const team = AGENCY_INFO.founders;

  const getAccentStyles = (accent) => {
    switch (accent) {
      case 'sky':
        return {
          border: 'border-sky-500/20 hover:border-sky-400/50',
          gradient: 'from-[#0e1622] via-[#090d14] to-[#07090d]',
          shadow: 'shadow-[0_10px_40px_rgba(14,165,233,0.06)]',
          badgeText: 'text-sky-400',
          badgeBg: 'bg-sky-400',
          avatarGrad: 'from-sky-400 to-indigo-600',
          boxBg: 'bg-sky-950/30 border-sky-500/20',
          pillBg: 'bg-sky-500/10 border-sky-500/20 text-sky-200'
        };
      case 'amber':
        return {
          border: 'border-amber-500/20 hover:border-amber-400/50',
          gradient: 'from-[#1b140e] via-[#120d09] to-[#0a0705]',
          shadow: 'shadow-[0_10px_40px_rgba(245,158,11,0.06)]',
          badgeText: 'text-amber-400',
          badgeBg: 'bg-amber-400',
          avatarGrad: 'from-amber-400 to-rose-600',
          boxBg: 'bg-amber-950/30 border-amber-500/20',
          pillBg: 'bg-amber-500/10 border-amber-500/20 text-amber-200'
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/20 hover:border-emerald-400/50',
          gradient: 'from-[#0b1814] via-[#08100d] to-[#060b09]',
          shadow: 'shadow-[0_10px_40px_rgba(16,185,129,0.06)]',
          badgeText: 'text-emerald-400',
          badgeBg: 'bg-emerald-400',
          avatarGrad: 'from-emerald-400 to-teal-600',
          boxBg: 'bg-emerald-950/30 border-emerald-500/20',
          pillBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200'
        };
      case 'rose':
        return {
          border: 'border-rose-500/20 hover:border-rose-400/50',
          gradient: 'from-[#1c0e12] via-[#12090b] to-[#0a0507]',
          shadow: 'shadow-[0_10px_40px_rgba(244,63,94,0.06)]',
          badgeText: 'text-rose-400',
          badgeBg: 'bg-rose-400',
          avatarGrad: 'from-rose-400 to-pink-600',
          boxBg: 'bg-rose-950/30 border-rose-500/20',
          pillBg: 'bg-rose-500/10 border-rose-500/20 text-rose-200'
        };
      case 'purple':
      default:
        return {
          border: 'border-purple-500/20 hover:border-purple-400/50',
          gradient: 'from-[#170e20] via-[#0f0914] to-[#08060b]',
          shadow: 'shadow-[0_10px_40px_rgba(168,85,247,0.06)]',
          badgeText: 'text-purple-400',
          badgeBg: 'bg-purple-400',
          avatarGrad: 'from-purple-400 to-fuchsia-600',
          boxBg: 'bg-purple-950/30 border-purple-500/20',
          pillBg: 'bg-purple-500/10 border-purple-500/20 text-purple-200'
        };
    }
  };

  const getRoleIcon = (role) => {
    if (role.includes('Creative')) return <Film className="w-3.5 h-3.5" />;
    if (role.includes('Technical')) return <Flame className="w-3.5 h-3.5" />;
    if (role.includes('Web Developer')) return <Code2 className="w-3.5 h-3.5" />;
    if (role.includes('Sales') || role.includes('Relations')) return <Sparkles className="w-3.5 h-3.5 text-rose-400" />;
    return <Briefcase className="w-3.5 h-3.5" />;
  };

  return (
    <section id="about" className="py-24 bg-[#06070a] border-t border-white/5 relative z-20">
      {/* Anchor for backward compatibility with #founders */}
      <span id="founders" className="relative -top-24" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Studio Team & Leadership</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Meet the Team Behind Glimpz
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A specialized collective spanning cinematic storytelling, high-octane gaming velocity, full-stack multi-framework software engineering, and dedicated client operations.
          </p>
        </div>

        {/* 🪪 4 STUDIO PASSES / EDITORIAL TEAM DOSSIERS 🪪 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {team.map((member, idx) => {
            const styles = getAccentStyles(member.accent || (idx === 0 ? 'sky' : idx === 1 ? 'amber' : idx === 2 ? 'emerald' : 'purple'));
            const initials = member.name.split(' ').map(n => n[0]).join('');

            return (
              <div
                key={member.name}
                className={`relative rounded-3xl bg-gradient-to-b ${styles.gradient} border ${styles.border} p-6 sm:p-8 overflow-hidden group transition-all duration-300 ${styles.shadow} flex flex-col justify-between`}
              >
                <div>
                  {/* Top Pass Header */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${styles.badgeBg} animate-pulse`} />
                      <span className={`font-mono text-[11px] sm:text-xs uppercase tracking-widest ${styles.badgeText} font-bold`}>
                        {member.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {member.whatsapp && (
                        <a
                          href={member.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-xs font-mono flex items-center gap-1.5"
                          title={`WhatsApp ${member.name.split(' ')[0]}`}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Profile Header Row */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${styles.avatarGrad} p-[2px] shadow-lg shrink-0`}>
                      <div className="w-full h-full bg-[#080d16] rounded-[14px] flex items-center justify-center font-display font-extrabold text-xl sm:text-2xl text-white">
                        {initials}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                        {member.name}
                      </h3>
                      <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${styles.badgeText} font-semibold uppercase tracking-wider`}>
                        {getRoleIcon(member.role)} {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Discipline / Role Highlight Box */}
                  <div className={`mb-5 p-4 rounded-xl ${styles.boxBg}`}>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${styles.badgeText} font-bold block mb-1`}>
                      SPECIALIZATION & FOCUS:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {member.bio}
                    </p>
                  </div>

                  {/* Tech Stack & Core Suite Strip */}
                  <div className="space-y-2.5 mb-5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      Core Frameworks & Tools:
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {member.tools.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-xs font-mono font-medium px-2.5 sm:px-3 py-1 rounded-lg ${styles.pillBg}`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dedicated Portfolio Card for Byanjan Behera */}
                  {member.portfolio && (
                    <div className="mb-5">
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center justify-between group/link"
                      >
                        <div className="flex items-center gap-2.5">
                          <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
                          <div>
                            <span className="block font-mono text-xs font-bold text-white">
                              Live Developer Portfolio
                            </span>
                            <span className="block font-mono text-[11px] text-emerald-400">
                              https://byanjanbehera.me/
                            </span>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover/link:bg-emerald-500 group-hover/link:text-black transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </a>
                    </div>
                  )}
                </div>

                {/* Footer Strip */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-slate-300">
                    Direct Line: <strong className="text-white">{member.phone}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />
                    Verified Member
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}