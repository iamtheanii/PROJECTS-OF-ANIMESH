import React, { useState } from 'react';
import { Play, ExternalLink, Film, Code, Sparkles, Youtube, Layers } from 'lucide-react';
import { PORTFOLIO_ITEMS, AGENCY_INFO } from '../data/portfolioData';

export default function WorkGallery({ onSelectVideo }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Projects', icon: Layers },
    { id: 'gaming', label: 'Gaming & High-Energy', icon: Film },
    { id: 'cinematic', label: 'Cinematic & Story', icon: Sparkles },
    { id: 'webdev', label: 'Web Development', icon: Code },
  ];

  const filteredItems = activeFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section id="work" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-3">
              Portfolio & Selected Work
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
              Proof Over Promises.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Explore our battle-tested video edits, velocity montages from our YouTube channel <span className="text-brand-cyan font-medium">@sy1ko-kun</span>, and modern web applications.
            </p>
          </div>

          <a
            href={AGENCY_INFO.contact.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-panel border border-red-500/30 text-xs font-semibold text-red-400 hover:text-white hover:bg-red-500/20 transition-all self-start md:self-auto shrink-0"
          >
            <Youtube className="w-4 h-4 fill-current" />
            <span>Visit @sy1ko-kun on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-white/5">
          {filterOptions.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-accent text-[#08090C] shadow-glow-cyan'
                    : 'glass-panel text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl glass-panel border border-white/10 overflow-hidden hover:border-brand-cyan/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl"
            >
              <div>
                {/* Thumbnail / Visual Area */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-black/30" />

                  {/* Category Pill on top left */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#08090C]/80 backdrop-blur-md text-brand-cyan border border-brand-cyan/20">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Play Button Overlay for Videos */}
                  {item.type === 'video' ? (
                    <button
                      onClick={() => onSelectVideo(item)}
                      className="absolute inset-0 flex items-center justify-center group-hover:opacity-100 transition-opacity"
                      aria-label={`Play ${item.title}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-cyan/90 text-[#08090C] flex items-center justify-center shadow-glow-cyan transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </button>
                  ) : (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Live Web App
                      </span>
                    </div>
                  )}

                  {/* Duration tag if video */}
                  {item.duration && (
                    <div className="absolute bottom-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-white">
                      {item.duration}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="text-[11px] font-mono text-slate-500 mb-1.5 flex items-center justify-between">
                    <span>{item.client}</span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-brand-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-5 pt-0">
                {item.type === 'video' ? (
                  <button
                    onClick={() => onSelectVideo(item)}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold glass-panel border border-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan hover:text-[#08090C] transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Video Cut</span>
                  </button>
                ) : (
                  <a
                    href="#contact"
                    className="w-full py-2.5 rounded-xl text-xs font-semibold glass-panel border border-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Inquire for Similar Website</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
