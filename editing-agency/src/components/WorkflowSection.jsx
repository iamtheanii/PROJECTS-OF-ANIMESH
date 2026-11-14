import React, { useState, useEffect, useRef } from 'react';
import { WORKFLOW_STEPS } from '../data/portfolioData';
import { Compass, Scissors, Wand2, Rocket, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const stepIcons = {
  Compass,
  Scissors,
  Wand2,
  Rocket
};

export default function WorkflowSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Scroll-driven sideward horizontal movement (ONLY for desktop to avoid mobile overflow)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!isDesktop) {
        setScrollOffset(0);
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate progress as the section passes through the viewport (0 to 1)
            const totalDistance = windowHeight + rect.height;
            const currentPosition = windowHeight - rect.top;
            const progress = Math.min(Math.max(currentPosition / totalDistance, 0), 1);
            
            // Translate horizontally on desktop: moves sideward across scroll (-140px to +140px)
            const shift = (progress - 0.5) * -160;
            setScrollOffset(shift);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDesktop]);

  const slideManual = (direction) => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-[#08090C] border-t border-b border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-cyan/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-brand-purple/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Identical to reference screenshot) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4 shadow-glow-cyan/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Streamlined Execution</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            How We Turn Ideas Into Masterpieces
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            No endless revision loops or dropped deadlines. A razor-sharp 4-step workflow engineered for speed and quality.
          </p>
        </div>

        {/* Horizontal Sideward Moving Rail */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Mobile/Desktop navigation arrows */}
          <div className="flex justify-end gap-2 mb-4 md:hidden">
            <button
              onClick={() => slideManual('left')}
              className="p-2 rounded-xl glass-panel border border-white/10 text-slate-300 hover:text-white"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => slideManual('right')}
              className="p-2 rounded-xl glass-panel border border-white/10 text-slate-300 hover:text-white"
              aria-label="Next step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Glowing Track Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent -translate-y-1/2 pointer-events-none" />

          {/* Cards Track: Mobile Native Swipe Snap + Desktop Scroll-Driven Sideward Parallax */}
          <div
            ref={trackRef}
            className="overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory lg:overflow-visible transition-transform duration-300 ease-out"
            style={{
              transform: isDesktop ? `translate3d(${scrollOffset}px, 0, 0)` : 'none',
            }}
          >
            <div className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 w-max lg:w-auto px-1">
              {WORKFLOW_STEPS.map((step, idx) => {
                const Icon = stepIcons[step.icon] || Compass;
                return (
                  <div
                    key={step.step}
                    className="w-[82vw] sm:w-[320px] lg:w-auto shrink-0 lg:shrink group relative rounded-2xl p-6 sm:p-7 bg-[#0d1017]/90 backdrop-blur-xl border border-white/10 hover:border-brand-cyan/50 hover:shadow-[0_10px_35px_rgba(34,211,238,0.12)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 snap-center"
                  >
                    {/* Top ambient card shine */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/0 to-transparent group-hover:via-brand-cyan/60 transition-all duration-500 rounded-t-2xl" />

                    <div>
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-brand-cyan via-sky-400 to-brand-purple">
                          {step.step}
                        </span>
                        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-[#08090C] transition-all shadow-md">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Phase Footer & Pipeline Status */}
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                        Stage {idx + 1} of 4
                      </span>
                      <span className="text-[10px] text-brand-cyan/70 font-semibold uppercase tracking-wider group-hover:text-brand-cyan">
                        {idx === 0 && "Inception"}
                        {idx === 1 && "Cadence"}
                        {idx === 2 && "Finishing"}
                        {idx === 3 && "Retention"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive sideward indicator note */}
          <div className="flex items-center justify-center gap-2 mt-8 text-xs font-mono text-slate-500">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span>Interactive sideward rail • Synced to page scroll</span>
          </div>

        </div>

      </div>
    </section>
  );
}