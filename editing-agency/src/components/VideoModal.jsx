import React, { useEffect } from 'react';
import { X, ExternalLink, Youtube, Sparkles, Smartphone } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!video) return null;

  const embedSrc = video.id
    ? `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : video.embedUrl;

  const directYouTubeUrl = video.youtubeUrl || (video.id ? `https://www.youtube.com/shorts/${video.id}` : 'https://youtube.com/@sy1ko-kun');

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/92 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Vertical Smartphone Modal Housing */}
      <div
        className="relative w-full max-w-[360px] rounded-[32px] p-2 bg-[#0c0e14] border border-brand-cyan/40 shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(0,240,255,0.25)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Mini Bar with Close and External Links */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#090b10] rounded-t-[24px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase text-white font-bold truncate max-w-[160px]">
              {video.title || 'YouTube Short'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={directYouTubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 px-2 rounded-md text-[10px] font-mono text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center gap-1"
            >
              <Youtube className="w-3 h-3 fill-current" />
              <span>YT</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Video Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Vertical Screen: 9:16 Aspect Ratio */}
        <div className="relative aspect-[9/16] w-full bg-black rounded-b-[24px] overflow-hidden">
          <iframe
            src={embedSrc}
            title={video.title || "Glimpz Studio Short"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0 absolute inset-0"
          />
        </div>

        {/* Bottom Title Bar */}
        <div className="pt-2 px-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="truncate max-w-[220px] text-white font-medium">{video.game || 'Short-Form Edit'}</span>
          <span className="text-brand-cyan">@sy1ko-kun</span>
        </div>

      </div>
    </div>
  );
}
