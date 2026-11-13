import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageCircle, ArrowRight, PlayCircle, Phone, ChevronDown } from 'lucide-react';
import { AGENCY_INFO } from '../data/portfolioData';
import GlimpzBrandLogo from './GlimpzBrandLogo';

export default function Navbar({ onReplayIntro }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whatsappDropdown, setWhatsappDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Gaming Edits', href: '#edits-slider' },
    { name: 'Color Grading', href: '#grade-compare' },
    { name: 'Web Dev', href: '#web-dev' },
    { name: 'Process', href: '#process' },
    { name: 'Founders', href: '#founders' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Book Studio', href: '#booking' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-[#08090C]/90 backdrop-blur-md border-b border-white/5 shadow-2xl' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Pure Vector Typography */}
          <a href="#" className="flex items-center gap-3 group">
            <GlimpzBrandLogo size="default" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full glass-panel border border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-brand-cyan transition-colors rounded-full hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Dual WhatsApp + CTA Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="p-2 rounded-xl text-slate-400 hover:text-brand-cyan bg-white/5 border border-white/10 transition-colors"
                title="Replay Intro"
                aria-label="Replay Intro"
              >
                <PlayCircle className="w-4 h-4" />
              </button>
            )}

            {/* Dual WhatsApp Dropdown */}
            <div className="relative">
              <button
                onClick={() => setWhatsappDropdown(!whatsappDropdown)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {whatsappDropdown && (
                <div
                  onMouseLeave={() => setWhatsappDropdown(false)}
                  className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel-glow border border-emerald-500/30 p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-50 bg-[#090b10]"
                >
                  <div className="px-3 py-2 text-[10px] font-mono uppercase text-slate-400 border-b border-white/10">
                    Connect with Founders:
                  </div>
                  
                  {/* Animesh */}
                  <a
                    href={AGENCY_INFO.contacts.founder1.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setWhatsappDropdown(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-300 transition-all group"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-emerald-400">Animesh Ghosh</span>
                      <span className="text-[10px] text-slate-400 font-mono">+91 9437238055</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Chat</span>
                  </a>

                  {/* Biswajit */}
                  <a
                    href={AGENCY_INFO.contacts.founder2.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setWhatsappDropdown(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-300 transition-all group border-t border-white/5"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-emerald-400">Biswajit Das</span>
                      <span className="text-[10px] text-slate-400 font-mono">+91 8456982547</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Chat</span>
                  </a>
                </div>
              )}
            </div>

            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-brand-cyan to-brand-accent hover:shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Studio</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 border border-white/10 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl glass-panel-glow border border-brand-cyan/20 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-brand-cyan hover:bg-white/5 transition-all"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 px-1">
                  WhatsApp Direct:
                </span>
                
                <a
                  href={AGENCY_INFO.contacts.founder1.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                >
                  <span>Animesh Ghosh: +91 9437238055</span>
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>

                <a
                  href={AGENCY_INFO.contacts.founder2.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                >
                  <span>Biswajit Das: +91 8456982547</span>
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-brand-cyan to-brand-accent shadow-glow-cyan mt-1"
                >
                  <span>Book Studio Project</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
