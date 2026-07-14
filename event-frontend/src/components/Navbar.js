"use client";
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="w-full px-4 md:px-12 h-20 md:h-24 flex items-center justify-between">
        
        {/* 1. LOGO SECTION */}
        <a href="/" className="flex items-center gap-3 md:gap-4 cursor-pointer">
          <img 
            src="/logo.jpeg" 
            alt="Shreeram Events" 
            className="h-12 md:h-20 w-auto object-contain flex-shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase leading-none drop-shadow-md">
              Shreeram
            </span>
            <span className="text-[0.60rem] md:text-xs font-semibold tracking-[0.3em] text-slate-300 uppercase mt-1">
              Events
            </span>
          </div>
        </a>

        {/* 2. DESKTOP NAVIGATION (Hidden on mobile) */}
        <nav className="hidden md:flex space-x-10 text-xs font-semibold tracking-widest text-slate-300 uppercase items-center">
          <a href="/#services" className="hover:text-[#D4AF37] transition-colors duration-300">Services</a>
          <a href="/#gallery" className="hover:text-[#D4AF37] transition-colors duration-300">Gallery</a>
          <a href="/#contact" className="hover:text-[#D4AF37] transition-colors duration-300">Contact</a>
          <a href="/book" className="bg-[#D4AF37] text-slate-950 text-xs uppercase tracking-widest font-bold px-8 py-4 rounded hover:bg-[#F3E5AB] transition-colors shadow-lg">
            Book Now
          </a>
        </nav>

        {/* 3. MOBILE CONTROLS (Hidden on desktop) */}
        <div className="flex md:hidden items-center gap-4">
          <a href="/book" className="bg-[#D4AF37] text-slate-950 text-[0.65rem] uppercase tracking-widest font-bold px-4 py-2 rounded shadow-sm">
            Book
          </a>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-slate-300 p-1 focus:outline-none"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 4. MOBILE DROPDOWN MENU */}
      {isOpen && (
        <nav className="md:hidden flex flex-col bg-slate-900 border-t border-slate-800 px-6 py-6 space-y-6 text-xs font-bold tracking-widest text-slate-300 uppercase">
          <a href="/#services" onClick={() => setIsOpen(false)} className="hover:text-[#D4AF37]">Services</a>
          <a href="/#gallery" onClick={() => setIsOpen(false)} className="hover:text-[#D4AF37]">Gallery</a>
          <a href="/#contact" onClick={() => setIsOpen(false)} className="hover:text-[#D4AF37]">Contact</a>
        </nav>
      )}
    </header>
  );
}