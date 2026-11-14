import React, { useState, useEffect, useCallback, useRef } from 'react';
import { YOUTUBE_SHORTS } from '../data/portfolioData';
import { Play, ExternalLink, ChevronLeft, ChevronRight, Youtube, Sparkles, Smartphone, Keyboard, Flame } from 'lucide-react';

export default function VideoCarouselSlider({ onSelectVideo }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const total = YOUTUBE_SHORTS.length;
  const activeItem = YOUTUBE_SHORTS[activeIndex];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Gentle auto-glide timer (pauses when user hovers or touches)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation: Left, Right, Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Enter') {
        if (onSelectVideo) {
          onSelectVideo(activeItem);
        } else {
          window.open(activeItem.youtubeUrl, '_blank', 'noopener,noreferrer');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, activeItem, onSelectVideo]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  return (
    <section
      id="edits-slider"
      className="py-24 relative overflow-hidden bg-[#07080b] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background light tuned smoothly to the active short's accent color */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] blur-[170px] rounded-full pointer-events-none transition-colors duration-1000 opacity-25"
        style={{ backgroundColor: activeItem.accentColor }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,0,0,0)_0%,#07080b_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Vertical 9:16 Shorts Vault</span>
          </div>
          <h2 className="font-hero text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            High-Retention YouTube Shorts
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Speed-ramped boss highlights, flawless parries, and viral sound design direct from <span className="text-brand-cyan font-semibold">@sy1ko-kun</span>.
          </p>

          {/* Touch / Keyboard Hint Pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
            <span className="sm:hidden flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              Swipe left / right to browse shorts
            </span>
            <span className="hidden sm:inline">
              <Keyboard className="w-3.5 h-3.5 text-brand-cyan inline mr-1" />
              Use <kbd className="px-1.5 py-0.5 rounded bg-black/60 text-white font-bold border border-white/10">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-black/60 text-white font-bold border border-white/10">→</kbd> to glide, press <kbd className="px-1.5 py-0.5 rounded bg-brand-cyan text-black font-bold">ENTER</kbd> to play in modal
            </span>
          </div>
        </div>

        {/* 3D Vertical Phone Reel Stage */}
        <div className="relative max-w-5xl mx-auto min-h-[520px] sm:min-h-[640px] flex items-center justify-center [perspective:1400px] overflow-hidden w-full">
          
          {/* Previous Slide Button */}
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-6 z-30 p-2.5 sm:p-3.5 rounded-2xl glass-panel border border-white/10 text-white hover:border-brand-cyan/50 hover:bg-brand-cyan hover:text-black transition-all shadow-xl group"
            aria-label="Previous Short"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Next Slide Button */}
          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-6 z-30 p-2.5 sm:p-3.5 rounded-2xl glass-panel border border-white/10 text-white hover:border-brand-cyan/50 hover:bg-brand-cyan hover:text-black transition-all shadow-xl group"
            aria-label="Next Short"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Vertical 9:16 Smartphone Reel */}
          <div className="relative w-full h-[480px] sm:h-[580px] flex items-center justify-center">
            {YOUTUBE_SHORTS.map((item, idx) => {
              let diff = idx - activeIndex;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isCenter = diff === 0;
              const isVisible = isMobile ? Math.abs(diff) <= 1 : Math.abs(diff) <= 2;

              if (!isVisible) return null;

              // Vertical phone spread calculations (Responsive for mobile screens)
              const translateX = isMobile ? diff * 120 : diff * 220; // Tight spread on mobile, full on desktop
              const translateZ = -Math.abs(diff) * (isMobile ? 90 : 140);
              const rotateY = diff * (isMobile ? -14 : -18);
              const scale = Math.max(0.72, 1 - Math.abs(diff) * (isMobile ? 0.18 : 0.14));
              const opacity = isCenter ? 1 : Math.max(0.3, 0.65 - Math.abs(diff) * 0.25);
              const zIndex = 20 - Math.abs(diff);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isCenter) {
                      onSelectVideo(item);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  style={{
                    transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity
                  }}
                  className="absolute w-[220px] sm:w-[270px] md:w-[300px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer will-change-transform"
                >
                  {/* Smartphone Frame Outer Housing */}
                  <div className={`rounded-[32px] p-2 bg-[#0d0f14] border shadow-2xl transition-all duration-300 ${
                    isCenter
                      ? 'border-brand-cyan/70 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.3)] ring-1 ring-brand-cyan/30'
                      : 'border-white/10 hover:border-white/25'
                  }`}>
                    
                    {/* Inner Screen 9:16 Port */}
                    <div className="relative aspect-[9/16] w-full rounded-[24px] overflow-hidden bg-black">
                      
                      {/* Top Phone Notch / Speaker Island */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/90 rounded-full z-20 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
                      </div>

                      {/* Video Thumbnail */}
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = item.fallbackThumbnail;
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

                      {/* Category Badge on top */}
                      <div className="absolute top-8 left-3.5 z-10">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-lg"
                          style={{
                            backgroundColor: `${item.accentColor}33`,
                            color: item.accentColor,
                            border: `1px solid ${item.accentColor}66`
                          }}
                        >
                          {item.game}
                        </span>
                      </div>

                      {/* YouTube Shorts Tag top right */}
                      <div className="absolute top-8 right-3.5 z-10">
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-red-400 border border-red-500/30">
                          <Flame className="w-3 h-3 fill-current" />
                          <span>Shorts</span>
                        </span>
                      </div>

                      {/* Play Button Overlay (Center Card) */}
                      {isCenter && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectVideo(item);
                            }}
                            className="w-14 h-14 rounded-full bg-brand-cyan text-black flex items-center justify-center shadow-glow-cyan transform hover:scale-110 transition-transform"
                            aria-label={`Play ${item.title}`}
                          >
                            <Play className="w-6 h-6 fill-current ml-0.5" />
                          </button>
                        </div>
                      )}

                      {/* Bottom Info Bar inside phone screen */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
                        <h3 className="font-display text-sm font-bold text-white line-clamp-2 drop-shadow-md mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[10px] font-mono text-slate-400 line-clamp-1 mb-2">
                          {item.hashtag}
                        </p>

                        {/* Action buttons inside active card */}
                        {isCenter && (
                          <div className="flex items-center gap-2 pt-1 animate-in fade-in duration-200">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectVideo(item);
                              }}
                              className="flex-1 py-1.5 rounded-lg text-[11px] font-bold bg-white text-black hover:bg-brand-cyan transition-colors flex items-center justify-center gap-1"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Play Modal</span>
                            </button>

                            <a
                              href={item.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white transition-colors"
                              title="Watch on YouTube"
                            >
                              <Youtube className="w-3.5 h-3.5 fill-current" />
                            </a>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Gaming HUD Reel Navigation & Index Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-white/5 max-w-4xl mx-auto">
          
          <button
            onClick={prevSlide}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel text-xs font-gaming tracking-wider text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>PREV SHORT</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="font-gaming text-sm font-bold text-brand-cyan tracking-widest">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            {/* Micro Dot Track */}
            <div className="flex items-center gap-1 max-w-[260px] overflow-hidden">
              {YOUTUBE_SHORTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? 'w-6 bg-brand-cyan shadow-glow-cyan'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to short ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel text-xs font-gaming tracking-wider text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
          >
            <span>NEXT SHORT</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </section>
  );
}
