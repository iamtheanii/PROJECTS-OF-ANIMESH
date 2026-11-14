import React, { useState, useRef } from 'react';
import { Sliders, Sparkles, Check, Film } from 'lucide-react';

export default function ColorGradingComparison() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) { // Left mouse button held
      handleMove(e.clientX);
    }
  };

  return (
    <section id="grade-compare" className="py-24 bg-[#0a0c12]/80 border-y border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Color Grading Suite</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Flat RAW Log <span className="text-slate-500">vs</span> <span className="text-brand-cyan">Cinematic Grade</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Drag the slider below to see how we turn flat, low-contrast camera sensor data into high-contrast, atmospheric visual gold.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={(e) => handleMove(e.clientX)}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none glass-panel border border-brand-cyan/30 shadow-2xl touch-none"
          >
            {/* Graded Image (Background full) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1800&q=80')`,
                filter: 'contrast(1.25) saturate(1.4) brightness(1.05)'
              }}
            >
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-brand-cyan/90 text-[#08090C] font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span>AFTER: GLIMPZ GRADE</span>
              </div>
            </div>

            {/* RAW Flat LOG Image (Clipped overlay) */}
            <div
              className="absolute inset-0 bg-cover bg-center border-r-2 border-brand-cyan"
              style={{
                width: `${sliderPosition}%`,
                backgroundImage: `url('https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1800&q=80')`,
                filter: 'contrast(0.7) saturate(0.4) brightness(1.25) sepia(0.05)',
                boxShadow: '4px 0 25px rgba(0, 240, 255, 0.4)'
              }}
            >
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/80 text-slate-300 font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-lg border border-white/10 flex items-center gap-1.5 backdrop-blur-md">
                <Film className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span>BEFORE: RAW LOG</span>
              </div>
            </div>

            {/* Draggable Slider Bar & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-brand-cyan cursor-ew-resize pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#08090C] border-2 border-brand-cyan flex items-center justify-center text-brand-cyan shadow-glow-cyan">
                <Sliders className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-3 rounded-xl glass-panel text-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Color Space</span>
              <span className="text-xs sm:text-sm font-semibold text-white">DaVinci YRGB Color Managed</span>
            </div>
            <div className="p-3 rounded-xl glass-panel text-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Target Gamma</span>
              <span className="text-xs sm:text-sm font-semibold text-white">Rec.709 / D65 Standard</span>
            </div>
            <div className="p-3 rounded-xl glass-panel text-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Skin Tone Matrix</span>
              <span className="text-xs sm:text-sm font-semibold text-white">Isolated Hue Vector Match</span>
            </div>
            <div className="p-3 rounded-xl glass-panel text-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Deliverable</span>
              <span className="text-xs sm:text-sm font-semibold text-brand-cyan">Master ProRes 422HQ & 4K</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
