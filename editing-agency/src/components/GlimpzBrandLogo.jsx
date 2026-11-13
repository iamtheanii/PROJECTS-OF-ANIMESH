import React from 'react';

export default function GlimpzBrandLogo({ size = 'default', showSubtitle = true, className = '' }) {
  const isLarge = size === 'large';
  const isHero = size === 'hero';

  return (
    <div className={`inline-flex items-center gap-3.5 select-none group cursor-pointer ${className}`}>
      
      {/* 3D Kinetic Prism Emblem */}
      <div className={`relative rounded-2xl p-[1.5px] transition-all duration-500 group-hover:scale-105 shrink-0 ${
        isHero ? 'w-13 h-13 sm:w-16 sm:h-16' : isLarge ? 'w-11 h-11' : 'w-10 h-10'
      }`}>
        {/* Ambient Neon Atmosphere Glow */}
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-brand-cyan via-purple-500 to-brand-cyan opacity-40 blur-md group-hover:opacity-85 transition-opacity duration-500 animate-pulse-slow" />
        
        {/* Core Monolith Housing */}
        <div className="relative w-full h-full bg-[#07080c] rounded-[14px] flex items-center justify-center border border-white/25 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Animated Light Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          
          {/* Futuristic Cyber-Aperture SVG Emblem */}
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[68%] h-[68%]">
            {/* Outer Hex Prism Frame */}
            <path
              d="M24 3L42 13.5V34.5L24 45L6 34.5V13.5L24 3Z"
              stroke="url(#glimpz-border-grad)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
            />
            {/* Core Stylized 'G' Lightning Geometry */}
            <path
              d="M33 16C30.5 12 25.5 10 20 11C13.5 12.2 8.5 17.8 8.5 24.5C8.5 31.5 14 37 21.5 37C28.5 37 34 32.5 35 25.5H22V19.5H39C39.5 21 40 23 40 25C40 35.5 31.5 43 21 43C10.5 43 2 34.5 2 24C2 13.5 10.5 5 21 5C27 5 32.5 7.5 36.5 12L33 16Z"
              fill="url(#glimpz-core-grad)"
            />
            {/* Sharp Cyber Diagonal Cut */}
            <path
              d="M17 24L27 15L25 24L35 24L21 34L23 25L17 24Z"
              fill="url(#glimpz-spark-grad)"
              className="drop-shadow-[0_0_6px_rgba(0,240,255,0.9)]"
            />
            <defs>
              <linearGradient id="glimpz-border-grad" x1="6" y1="3" x2="42" y2="45" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00F0FF" />
                <stop offset="0.5" stopColor="#818CF8" />
                <stop offset="1" stopColor="#C084FC" />
              </linearGradient>
              <linearGradient id="glimpz-core-grad" x1="2" y1="5" x2="40" y2="43" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.4" stopColor="#E0F2FE" />
                <stop offset="0.75" stopColor="#38BDF8" />
                <stop offset="1" stopColor="#818CF8" />
              </linearGradient>
              <linearGradient id="glimpz-spark-grad" x1="17" y1="15" x2="35" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#00F0FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Luxury Display Typographic Wordmark */}
      <div className="flex flex-col text-left">
        <div className="flex items-center tracking-tight">
          <span className={`font-hero font-black tracking-[0.14em] uppercase text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-sky-200 group-hover:to-brand-cyan transition-all duration-300 drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)] ${
            isHero ? 'text-3xl sm:text-4xl' : isLarge ? 'text-2xl' : 'text-lg sm:text-xl'
          }`}>
            GLIMPZ
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan ml-1.5 shadow-[0_0_8px_#00F0FF] animate-pulse" />
        </div>
        {showSubtitle && (
          <span className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.32em] text-slate-400 font-semibold group-hover:text-slate-300 transition-colors ${
            isHero ? 'text-[11px]' : ''
          }`}>
            STUDIO <span className="text-brand-cyan/70">• LAB</span>
          </span>
        )}
      </div>

    </div>
  );
}
