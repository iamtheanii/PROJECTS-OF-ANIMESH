"use client";

import Image from "next/image";
import { Scissors, Award, Gem, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-salon-dark relative overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="relative h-[480px] rounded-lg overflow-hidden border border-gold-500/20 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80"
                  alt="Abdul Nai Master Barbering"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Accent Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-salon-card/95 backdrop-blur-md p-6 rounded-lg border border-gold-500/30 shadow-2xl max-w-[240px]">
                <div className="flex items-center gap-2 text-gold-400 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest font-bold">Heritage Craft</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Dedicated to the lost art of the hot towel royal shave and precision scissor sculpting.
                </p>
              </div>

              {/* Decorative Gold Frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-400/40 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-4 h-4" />
              The Art of Refined Grooming
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-salon-ivory leading-tight">
              A SANCTUARY CRAFTED FOR <br />
              <span className="gold-gradient-text italic font-accent font-normal">THE MODERN CONNOISSEUR</span>
            </h2>

            <p className="text-neutral-300 leading-relaxed font-light text-base sm:text-lg">
              Founded under the uncompromising vision of master artisan <strong>Abdul Nai</strong>, our atelier is more than a salon—it is a private retreat where the gentleman&apos;s grooming ritual is elevated to high art.
            </p>

            <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">
              Every appointment begins with a thorough individual consultation assessing face shape, hair density, growth direction, and personal lifestyle. Utilizing imported Japanese 440C cobalt steel shears, organic botanical tonics, and European straight razors, we ensure an impeccable silhouette that endures.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-800">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <Scissors className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-salon-ivory">Master Artisans</h3>
                <p className="text-xs text-neutral-400 leading-normal">
                  Stylists with over a decade of high-end editorial and royal salon training.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <Gem className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-salon-ivory">Bespoke Products</h3>
                <p className="text-xs text-neutral-400 leading-normal">
                  Only gold-infused serums, organic argan formulations, and imported apothecary pomades.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-salon-ivory">VIP Privacy</h3>
                <p className="text-xs text-neutral-400 leading-normal">
                  Individual acoustic suites, bespoke espresso bar, and guaranteed punctuality.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
