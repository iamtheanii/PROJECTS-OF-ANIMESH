"use client";

import { Star, Quote, CheckCircle } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Vikramaditya Singhania",
      designation: "Managing Director, Apex Capital",
      review: "Abdul Nai is in a league of its own. The level of meticulous precision with their scissor cut and the 24K facial prior to my investor summit left me feeling extraordinarily confident. Punctuality is strictly respected.",
      rating: 5,
      service: "The Emperor Complete Grooming Package",
    },
    {
      name: "Dr. Rohan Merchant",
      designation: "Senior Cardiothoracic Surgeon",
      review: "As a surgeon, hygiene and sterilization are non-negotiable for me. Seeing their hospital-grade autoclave pouches and zero-contact sanitization gave me total peace of mind. Truly Mumbai's best luxury salon.",
      rating: 5,
      service: "The Royal Cut & Style",
    },
    {
      name: "Armaan Z. Khurana",
      designation: "Creative Director & Producer",
      review: "From the pour-over espresso in the private lounge to the ozone steam beard sculpting, every second is tailored luxury. Booking through their online platform and paying via UPI was seamless.",
      rating: 5,
      service: "Signature Beard Sculpting & Steam",
    },
  ];

  return (
    <section className="py-24 bg-salon-dark relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-medium mb-3">
            <Quote className="w-4 h-4" />
            Voices of Patronage
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-salon-ivory mb-4">
            TESTIMONIALS OF <span className="gold-gradient-text italic font-accent font-normal">DISTINCTION</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Read what entrepreneurs, surgeons, and distinguished connoisseurs say about their transformative grooming journeys at Abdul Nai.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between relative group hover:border-gold-500/40 transition-all duration-300"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-gold-400 mb-6">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6 italic">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="pt-6 border-t border-neutral-800/80">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-editorial font-bold text-base text-salon-ivory">
                    {rev.name}
                  </h4>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
                    <CheckCircle className="w-3 h-3" />
                    Verified Client
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mb-2">
                  {rev.designation}
                </p>
                <span className="text-[11px] text-gold-400/90 font-medium tracking-wide">
                  Service: {rev.service}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
