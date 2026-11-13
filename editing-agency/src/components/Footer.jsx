import React from 'react';
import { AGENCY_INFO } from '../data/portfolioData';
import { ArrowUp, Youtube, Linkedin, Mail, MessageCircle, Heart, Phone } from 'lucide-react';
import GlimpzBrandLogo from './GlimpzBrandLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#050608] pt-16 pb-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <GlimpzBrandLogo size="default" />

            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              High-retention video post-production and high-performance modern web engineering. Founded by Animesh Ghosh & Biswajit Das in Bhubaneswar, Odisha.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={AGENCY_INFO.contacts.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass-panel border border-white/5 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-all"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={AGENCY_INFO.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass-panel border border-white/5 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${AGENCY_INFO.contacts.email}`}
                className="w-9 h-9 rounded-xl glass-panel border border-white/5 flex items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/40 transition-all"
                aria-label="Email Studio"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#edits-slider" className="hover:text-brand-cyan transition-colors">Gaming Edits Vault</a></li>
              <li><a href="#grade-compare" className="hover:text-brand-cyan transition-colors">Color Grading Suite</a></li>
              <li><a href="#web-dev" className="hover:text-brand-cyan transition-colors">Web Development</a></li>
              <li><a href="#process" className="hover:text-brand-cyan transition-colors">Production Process</a></li>
              <li><a href="#founders" className="hover:text-brand-cyan transition-colors">About Animesh & Biswajit</a></li>
              <li><a href="#booking" className="hover:text-brand-cyan transition-colors">Interactive Booking</a></li>
            </ul>
          </div>

          {/* Direct Founders Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Direct Contact Lines
            </h4>
            <div className="text-xs text-slate-400 space-y-2.5 leading-relaxed">
              <a
                href={AGENCY_INFO.contacts.founder1.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Animesh Ghosh: <strong>+91 9437238055</strong></span>
              </a>

              <a
                href={AGENCY_INFO.contacts.founder2.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Biswajit Das: <strong>+91 8456982547</strong></span>
              </a>

              <p className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{AGENCY_INFO.contacts.email}</span>
              </p>

              <p className="text-slate-500 font-mono text-[11px] pt-1 border-t border-white/5">
                Bhubaneswar, Odisha, India • SOA University
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GLIMPZ STUDIO. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> by Animesh & Biswajit
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg glass-panel hover:bg-white/10 hover:text-white transition-all text-slate-400 flex items-center gap-1 text-[11px]"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
