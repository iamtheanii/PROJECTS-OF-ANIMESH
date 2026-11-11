"use client";

import { MapPin, Phone, Mail, Clock, Calendar, Navigation } from "lucide-react";

interface LocationContactProps {
  onOpenBooking: () => void;
}

export default function LocationContact({ onOpenBooking }: LocationContactProps) {
  return (
    <section id="contact" className="py-24 bg-salon-card/40 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-medium mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Atelier Address & Concierge
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-salon-ivory mb-4">
            VISIT OUR <span className="gold-gradient-text italic font-accent font-normal">SANCTUARY</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Conveniently situated in Mumbai&apos;s prime luxury quarter with private valet parking and discrete VIP entrance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Card */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-8">
              <h3 className="font-editorial text-2xl font-bold text-salon-ivory">
                The Atelier Details
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                    Atelier Location
                  </h4>
                  <p className="text-sm text-salon-ivory font-light leading-relaxed">
                    74/A Luxury Boulevard, Jubilee Enclave,<br />
                    Bandra West, Mumbai 400050, Maharashtra
                  </p>
                  <span className="text-xs text-gold-400/90 font-medium block mt-1">
                    * Valet Parking Available
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                    Service Hours
                  </h4>
                  <p className="text-sm text-salon-ivory font-light leading-relaxed">
                    Monday — Sunday: 09:00 AM – 09:00 PM<br />
                    VIP After-Hours: Upon Prior Concierge Request
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                    VIP Concierge
                  </h4>
                  <a
                    href="tel:+919876543210"
                    className="text-sm text-salon-ivory hover:text-gold-400 font-medium block transition-colors"
                  >
                    +91 98765 43210
                  </a>
                  <a
                    href="mailto:concierge@abdulnai.com"
                    className="text-xs text-neutral-400 hover:text-gold-400 block mt-0.5 transition-colors"
                  >
                    concierge@abdulnai.com
                  </a>
                </div>
              </div>
            </div>

            {/* Book CTA in Card */}
            <div className="pt-8 mt-8 border-t border-neutral-800">
              <button
                onClick={onOpenBooking}
                className="w-full gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest py-3.5 rounded shadow-lg hover:shadow-gold-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Your Experience Now
              </button>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="lg:col-span-7 glass-card rounded-2xl overflow-hidden relative min-h-[380px] flex flex-col">
            <div className="relative w-full h-full min-h-[380px] bg-neutral-900">
              <iframe
                title="Abdul Nai Luxury Salon Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4646141384067!2d72.825833!3d19.043611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91130392ad7%3A0x86131c905b761a0!2sBandra%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(90%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />

              {/* Floating Map Label */}
              <div className="absolute top-4 left-4 bg-salon-dark/90 backdrop-blur-md px-4 py-2 rounded-lg border border-gold-500/30 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gold-400 animate-ping" />
                <div>
                  <span className="text-xs font-bold text-salon-ivory uppercase tracking-wider block">
                    ABDUL NAI ATELIER
                  </span>
                  <span className="text-[10px] text-neutral-400">Jubilee Enclave, Mumbai</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
