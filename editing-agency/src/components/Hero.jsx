import React, { useState } from 'react';
import { ArrowUpRight, Play, Sparkles, ChevronRight, Activity, Flame } from 'lucide-react';
import GlimpzBrandLogo from './GlimpzBrandLogo';

const WORLDS = [
  {
    id: 'wukong',
    tag: '4K CINEMATIC COMBAT',
    titleLine1: 'ENDLESS',
    titleLine2: 'WORLDS',
    subtitle: 'Transforming raw gameplay into heart-pounding combat stories and high-performance digital experiences.',
    gameName: 'Black Myth: Wukong',
    accentColor: '#F59E0B',
    viewsMetric: '2.4M',
    hudLabel: 'VIEWS GENERATED',
    bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=85',
    orbThumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'sekiro',
    tag: 'VELOCITY & DEFLECTION',
    titleLine1: 'SURGICAL',
    titleLine2: 'RHYTHM',
    subtitle: 'Frame-accurate katana clashing where every spark and sound effect hits the peak of the musical drop.',
    gameName: 'Sekiro: Shadows Die Twice',
    accentColor: '#EF4444',
    viewsMetric: '60 FPS',
    hudLabel: 'COMBAT CADENCE',
    bgImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2000&q=85',
    orbThumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'eldenring',
    tag: 'ATMOSPHERIC STORYTELLING',
    titleLine1: 'SHADOW &',
    titleLine2: 'GRANDEUR',
    subtitle: 'Cinematic Rec.709 color grading and orchestral pacing capturing the monumental depth of dark fantasy.',
    gameName: 'Elden Ring: Erdtree',
    accentColor: '#38BDF8',
    viewsMetric: '4K HDR',
    hudLabel: 'DAVINCI MASTER',
    bgImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=2000&q=85',
    orbThumbnail: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ringedcity',
    tag: 'HIGH-RETENTION LAB',
    titleLine1: 'KINETIC',
    titleLine2: 'PACING',
    subtitle: 'Hook design, micro-transitions, and custom audio layers engineered to keep viewer eyes glued to the screen.',
    gameName: 'Dark Souls III / Valorant',
    accentColor: '#A855F7',
    viewsMetric: '120+',
    hudLabel: 'CUTS PER MINUTE',
    bgImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=2000&q=85',
    orbThumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=200&q=80'
  }
];

export default function Hero({ onOpenShowreel }) {
  const [activeWorldIndex, setActiveWorldIndex] = useState(0);
  const activeWorld = WORLDS[activeWorldIndex];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pb-16 overflow-hidden">
      
      {/* Dynamic Background Image Layers with Smooth Fade */}
      {WORLDS.map((world, idx) => (
        <div
          key={world.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            idx === activeWorldIndex ? 'opacity-70 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url('${world.bgImage}')`,
            filter: 'contrast(1.15) saturate(1.2)'
          }}
        />
      ))}

      {/* Cinematic Vignette & Speedlines Gradients matching the Pinterest reference */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/50 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08090C]/90 via-[#08090C]/40 to-transparent pointer-events-none" />
      
      {/* Colored dynamic bottom glow from active world */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[350px] blur-[150px] opacity-35 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: activeWorld.accentColor }}
      />

      {/* Top Floating Glass Navigation Bar (from Pinterest reference) */}
      <div className="fixed top-5 left-0 right-0 z-40 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo on Left */}
          <a href="#" className="flex items-center">
            <GlimpzBrandLogo size="default" />
          </a>

          {/* Centered Floating Capsule Bar */}
          <nav className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#0d1017]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            <a href="#" className="px-3.5 py-1 text-xs font-semibold text-white bg-white/10 rounded-full">
              Home
            </a>
            <a href="#edits-slider" className="px-3.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors">
              Vault
            </a>
            <a href="#grade-compare" className="px-3.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors">
              Color Grading
            </a>
            <a href="#web-dev" className="px-3.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors">
              Web Dev
            </a>
            <a href="#founders" className="px-3.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors">
              Founders
            </a>
            <a href="#booking" className="px-3.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Action: Enter / Book Pill */}
          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="px-5 py-2 rounded-full text-xs font-bold text-black bg-white hover:bg-brand-cyan transition-all shadow-glow-card flex items-center gap-1.5"
            >
              <span>Book Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* Main Hero Content (Left-aligned bold typography from Pinterest reference) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 my-auto pt-8">
        <div className="max-w-2xl text-left">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold tracking-wider text-white mb-6 shadow-lg">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeWorld.accentColor }} />
            <span style={{ color: activeWorld.accentColor }}>{activeWorld.tag}</span>
          </div>

          {/* Massive 2-Line Bold Display Typography */}
          <h1 className="font-hero text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92] mb-6 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            <span className="block">{activeWorld.titleLine1}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
              {activeWorld.titleLine2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base font-normal max-w-lg mb-8 leading-relaxed drop-shadow-md">
            {activeWorld.subtitle}
          </p>

          {/* CTA Button with Circular Arrow (Exact match to Pinterest image) */}
          <div className="flex items-center gap-4">
            <a
              href="#edits-slider"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-white text-black font-display font-bold text-sm sm:text-base hover:bg-brand-cyan transition-all shadow-2xl"
            >
              <span>Explore Vault</span>
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            <button
              onClick={onOpenShowreel}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-panel border border-white/15 text-xs font-semibold text-white hover:border-brand-cyan/40 hover:bg-white/10 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current text-brand-cyan" />
              <span>Watch Reel</span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Area: Dynamic World Switcher Orbs + Circular HUD Meter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Empty spacer for alignment */}
          <div className="hidden sm:block w-32" />

          {/* Center: The 4 Circular Game World Switcher Orbs (Exact match to Pinterest reference!) */}
          <div className="flex items-center gap-3.5 p-2 px-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
            {WORLDS.map((world, idx) => {
              const isActive = idx === activeWorldIndex;
              return (
                <button
                  key={world.id}
                  onClick={() => setActiveWorldIndex(idx)}
                  className={`relative rounded-full transition-all duration-300 group p-1 ${
                    isActive ? 'scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={`Switch to ${world.gameName}`}
                >
                  {/* Active Animated Ring */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-full border-2 animate-pulse"
                      style={{ borderColor: world.accentColor }}
                    />
                  )}
                  
                  {/* Orb Thumbnail Image */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-slate-900 border border-white/20 shadow-md">
                    <img
                      src={world.orbThumbnail}
                      alt={world.gameName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Circular HUD Gauge / Speedometer (Exact match to 3.2M HUD in Pinterest reference!) */}
          <div className="flex items-center gap-3.5 self-center sm:self-auto">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
              {/* Dashed outer circular meter */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                <circle
                  cx="30"
                  cy="30"
                  r="26"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="26"
                  fill="none"
                  stroke={activeWorld.accentColor}
                  strokeWidth="2.5"
                  strokeDasharray="160"
                  strokeDashoffset="45"
                  className="transition-all duration-700"
                />
              </svg>

              {/* Center Metric */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-extrabold text-xs sm:text-sm text-white">
                  {activeWorld.viewsMetric}
                </span>
              </div>
            </div>

            <div className="text-left">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block">
                {activeWorld.hudLabel}
              </span>
              <span className="text-xs font-semibold text-white">
                {activeWorld.gameName}
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
