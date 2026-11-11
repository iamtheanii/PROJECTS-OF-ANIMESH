"use client";

import { useState } from "react";
import Image from "next/image";
import { Service, ServiceCategory } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Clock, Scissors, Sparkles, ArrowRight } from "lucide-react";

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

const CATEGORIES: ('All' | ServiceCategory)[] = [
  'All',
  'Hair',
  'Beard & Shave',
  'Facial & Skin',
  'Spa & Treatments',
  'Packages'
];

export default function ServicesSection({ services, onSelectService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | ServiceCategory>('All');

  const filteredServices = activeCategory === 'All'
    ? services.filter(s => s.is_active)
    : services.filter(s => s.is_active && s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-salon-card/40 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-medium mb-3">
            <Scissors className="w-3.5 h-3.5" />
            Curated Atelier Menu
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-salon-ivory mb-4">
            OUR DISTINGUISHED <span className="gold-gradient-text italic font-accent font-normal">SERVICES</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Select a tailored experience crafted by our master stylists. Each service includes a hot aromatic towel ritual and bespoke styling advice.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                  activeCategory === cat
                    ? "gold-gradient-bg text-black font-semibold shadow-md"
                    : "bg-salon-elevated text-neutral-300 hover:text-white border border-neutral-800 hover:border-gold-500/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group glass-card glass-card-hover rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={service.image_url}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-salon-card via-salon-card/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-salon-dark/80 backdrop-blur-md px-3 py-1 rounded text-[11px] uppercase tracking-wider font-medium text-gold-300 border border-gold-500/30">
                    {service.category}
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-salon-dark/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-neutral-300 flex items-center gap-1.5 border border-neutral-700/50">
                    <Clock className="w-3 h-3 text-gold-400" />
                    <span>{service.duration_minutes} mins</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-editorial text-xl font-bold text-salon-ivory group-hover:text-gold-300 transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer with Price and Book Button */}
              <div className="p-6 pt-0 border-t border-neutral-800/60 mt-auto flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block">Investment</span>
                  <span className="font-editorial text-2xl font-bold text-gold-400">
                    {formatCurrency(service.price)}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="gold-gradient-bg text-black text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded shadow hover:shadow-gold-500/20 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
