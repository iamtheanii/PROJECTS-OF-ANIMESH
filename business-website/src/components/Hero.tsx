"use client";

import { Star, ShieldCheck, Sparkles, ChevronRight, Clock } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background with luxury gradient and dark moody lighting */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center filter brightness-[0.28] contrast-[1.1] scale-105 transform animate-pulse duration-[10000ms]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-salon-dark via-salon-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-salon-dark/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle royal badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-salon-dark/80 backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-300 font-medium">
            Premier Luxury Unisex Salon & Haute Coiffure
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-salon-ivory leading-[1.08] mb-6">
          LOOK GOOD. <br />
          <span className="gold-gradient-text font-normal italic font-accent">
            FEEL CONFIDENT.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-10">
          Where timeless bespoke styling meets contemporary luxury aesthetics.
          Experience tailored precision haircutting, artisan beard sculpting, and revitalizing 24K cellular skin therapy for ladies and gentlemen.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto gold-gradient-bg text-black font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded shadow-2xl hover:shadow-gold-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Book Appointment</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#services"
            className="w-full sm:w-auto border border-neutral-700 hover:border-gold-400/60 bg-salon-card/50 backdrop-blur-sm text-salon-ivory font-medium text-sm uppercase tracking-widest px-8 py-4 rounded transition-all hover:bg-salon-card flex items-center justify-center gap-2"
          >
            Explore Services
          </a>
        </div>

        {/* Trust & Social Proof Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-neutral-800/80 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-gold-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-salon-ivory">4.9 / 5.0 Rating</span>
            <span className="text-xs text-neutral-400">1,800+ Verified Reviews</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="font-editorial text-2xl font-bold text-gold-400 mb-0.5">10,000+</span>
            <span className="text-sm font-semibold text-salon-ivory">Gentlemen Groomed</span>
            <span className="text-xs text-neutral-400">Since Inception</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-gold-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-salon-ivory">100% Hospital Grade</span>
            <span className="text-xs text-neutral-400">Sterilized Instruments</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-gold-400 mb-1">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-salon-ivory">No Wait VIP Policy</span>
            <span className="text-xs text-neutral-400">Guaranteed Slot Timing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
