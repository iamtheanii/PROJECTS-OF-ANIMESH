"use client";

import Image from "next/image";
import { Camera, Sparkles } from "lucide-react";

export default function Gallery() {
  const photos = [
    {
      url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      title: "Royal Scissor Sculpting",
      category: "Hair Artistry",
      span: "col-span-1 md:col-span-2 row-span-2",
      height: "h-96 md:h-full",
    },
    {
      url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80",
      title: "Hot Towel Shave Ceremony",
      category: "Beard Therapy",
      span: "col-span-1",
      height: "h-64",
    },
    {
      url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      title: "24K Gold Cellular Rejuvenation",
      category: "Skin Aesthetics",
      span: "col-span-1",
      height: "h-64",
    },
    {
      url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
      title: "Vintage Italian Leather Recliners",
      category: "Atelier Interior",
      span: "col-span-1",
      height: "h-64",
    },
    {
      url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
      title: "Detoxifying Scalp Hydro-Mist",
      category: "Spa Rituals",
      span: "col-span-1",
      height: "h-64",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-salon-card/30 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-medium mb-3">
            <Camera className="w-3.5 h-3.5" />
            Visual Portfolio
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-salon-ivory mb-4">
            THE ATELIER <span className="gold-gradient-text italic font-accent font-normal">GALLERY</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            A glimpse inside our bespoke sanctuary, featuring master craftsmen in motion and world-class interior architecture.
          </p>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl overflow-hidden group border border-neutral-800 ${item.span}`}
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-salon-dark via-salon-dark/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-0.5">
                  {item.category}
                </span>
                <h4 className="font-editorial text-base sm:text-lg font-bold text-salon-ivory">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
