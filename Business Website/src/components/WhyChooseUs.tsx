"use client";

import { Scissors, ShieldCheck, Sparkles, Coffee, Clock, Gem } from "lucide-react";

export default function WhyChooseUs() {
  const distinctions = [
    {
      icon: Scissors,
      title: "Master Barbers & Stylists",
      description: "Our craftsmen undergo continuous master-class apprenticeships in London and Tokyo, specializing in bone-structure precision haircuts and bespoke straight razor fading.",
    },
    {
      icon: ShieldCheck,
      title: "Hospital-Grade Sterilization",
      description: "Your health and wellbeing are paramount. Every metallic tool undergoes medical-grade autoclave steam sterilization and is sealed in single-use hygienic pouches.",
    },
    {
      icon: Gem,
      title: "Pure 24K Gold & Botanicals",
      description: "We use exclusively premium formulations infused with cosmetic 24K gold leaf, cold-pressed Moroccan argan, and clean, paraben-free therapeutic tonics.",
    },
    {
      icon: Sparkles,
      title: "Private VIP Suites",
      description: "Retreat into acoustically isolated private barbering chambers equipped with motorized plush Italian leather recliners for maximum confidentiality and tranquility.",
    },
    {
      icon: Clock,
      title: "Guaranteed Punctuality",
      description: "We strictly honor our appointments with zero waiting time. Your dedicated chair and master stylist will be prepared the moment you step through our doors.",
    },
    {
      icon: Coffee,
      title: "Complimentary Lounge & Bar",
      description: "Relax prior to or following your service with artisanal pour-over coffee, single-estate green tea, or select refreshments in our private gentleman's salon lounge.",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-salon-dark relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles className="w-4 h-4" />
            The Standard of Distinction
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-salon-ivory mb-4">
            WHY DISCERNING GENTLEMEN <br />
            <span className="gold-gradient-text italic font-accent font-normal">CHOOSE ABDUL NAI</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every minute detail of our salon has been meticulously engineered to redefine the gentleman’s standard of grooming.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {distinctions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-xl p-8 transition-all relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-black transition-all">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-editorial text-xl font-bold text-salon-ivory mb-3 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Subtle bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
