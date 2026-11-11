"use client";

import { Service } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Crown, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface FeaturedPackagesProps {
  onSelectServiceByName: (name: string) => void;
}

export default function FeaturedPackages({ onSelectServiceByName }: FeaturedPackagesProps) {
  const packages = [
    {
      name: "The Emperor Complete Grooming Package",
      badge: "Signature Ritual",
      duration: "120 mins",
      originalPrice: 6300,
      price: 4800,
      description: "Our crowning salon ceremony crafted for gentlemen preparing for galas, weddings, or discerning leadership.",
      inclusions: [
        "Bespoke Royal Haircut & Consultation",
        "Artisan Beard Sculpting with Ozone Steam Therapy",
        "24K Gold Cellular Anti-Aging Facial",
        "Japanese Charcoal Clarifying Scalp Ritual",
        "Gentleman Hand & Nail Refinement",
        "Complimentary Single Malt or Espresso Tasting",
      ],
      popular: true,
    },
    {
      name: "Gentleman Grooming Day Package",
      badge: "Executive Favorite",
      duration: "90 mins",
      originalPrice: 4200,
      price: 3200,
      description: "The complete monthly reset: sharp precision styling, deep pore detox, and tension alleviation.",
      inclusions: [
        "Executive Haircut & Botanical Rinse",
        "Luxury Beard Shape & Razor Line",
        "Charcoal Detox Pore Mask",
        "Acupressure Neck & Shoulder De-stress Ritual",
        "Hot Eucalyptus Towel Refreshment",
      ],
      popular: false,
    },
  ];

  return (
    <section id="packages" className="py-24 bg-salon-dark relative overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-medium mb-3">
            <Crown className="w-4 h-4" />
            Curated Gentleman Journeys
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-salon-ivory mb-4">
            FEATURED <span className="gold-gradient-text italic font-accent font-normal">VIP PACKAGES</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Multi-tiered grooming therapies curated for complete revitalization. Experience ultimate relaxation with significant bundled privileges.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? "bg-gradient-to-b from-salon-card via-salon-card to-salon-dark border-2 border-gold-500/50 shadow-2xl shadow-gold-500/10 scale-[1.01]"
                  : "bg-salon-card/80 border border-neutral-800"
              }`}
            >
              {/* Popular Tag */}
              {pkg.popular && (
                <div className="absolute -top-3.5 right-8 gold-gradient-bg text-black font-bold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Most Requested Experience
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                    {pkg.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-salon-ivory mb-3">
                  {pkg.name}
                </h3>

                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-8 p-4 rounded-lg bg-salon-dark/60 border border-neutral-800">
                  <span className="font-editorial text-4xl font-bold text-gold-400">
                    {formatCurrency(pkg.price)}
                  </span>
                  <span className="text-base text-neutral-500 line-through">
                    {formatCurrency(pkg.originalPrice)}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium ml-auto bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Save {formatCurrency(pkg.originalPrice - pkg.price)}
                  </span>
                </div>

                {/* Inclusions */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium block mb-2">
                    Package Inclusions:
                  </span>
                  {pkg.inclusions.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-3 text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectServiceByName(pkg.name)}
                className={`w-full py-4 rounded font-semibold text-xs uppercase tracking-widest transition-all ${
                  pkg.popular
                    ? "gold-gradient-bg text-black shadow-lg hover:shadow-gold-500/30 hover:scale-[1.01]"
                    : "border border-gold-500/40 hover:border-gold-400 text-salon-ivory hover:text-gold-300 bg-salon-elevated hover:bg-salon-dark"
                }`}
              >
                Reserve This VIP Package
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
