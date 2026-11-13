import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import GlimpzBrandLogo from './GlimpzBrandLogo';

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('INITIALIZING GLIMPZ ENGINE...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const capped = next > 100 ? 100 : next;

        if (capped < 30) {
          setPhaseText('CALIBRATING COMBAT TIMELINES...');
        } else if (capped < 65) {
          setPhaseText('SYNCING SFX & AUDIO PEAKS...');
        } else if (capped < 90) {
          setPhaseText('INJECTING COLOR GRADING LUTs...');
        } else {
          setPhaseText('GLIMPZ STUDIO SYSTEM ONLINE.');
        }

        return capped;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#060709] flex flex-col items-center justify-center p-4 transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background CRT scanline and cyber radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,240,255,0.18),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.7)_51%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

      {/* Center Brand Identity with Cyber Bloom */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        
        {/* Glow halo behind logo */}
        <div className="absolute -inset-8 bg-gradient-to-r from-brand-cyan/25 via-purple-500/20 to-brand-cyan/25 blur-3xl rounded-full opacity-80 animate-pulse pointer-events-none" />

        {/* Clean Vector Typography Brandmark */}
        <div className="p-6 rounded-3xl glass-panel border border-brand-cyan/30 shadow-glow-cyan mb-8 backdrop-blur-xl relative overflow-hidden group">
          <GlimpzBrandLogo size="hero" showSubtitle={true} />
          
          {/* Laser sweep animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>

        {/* Studio Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-brand-cyan mb-5 shadow-sm">
          <Terminal className="w-3.5 h-3.5 text-brand-cyan" />
          <span>{phaseText}</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs space-y-2.5">
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden p-[1px] border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-brand-cyan via-sky-300 to-purple-500 rounded-full transition-all duration-150 shadow-glow-cyan"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>ANIMESH & BISWAJIT</span>
            <span className="text-brand-cyan font-bold">{progress}%</span>
          </div>
        </div>

        {/* Skip button for rapid view */}
        <button
          onClick={onComplete}
          className="mt-8 text-xs font-mono text-slate-500 hover:text-white transition-colors underline decoration-slate-700 underline-offset-4"
        >
          [ Skip to Studio ]
        </button>

      </div>
    </div>
  );
}
