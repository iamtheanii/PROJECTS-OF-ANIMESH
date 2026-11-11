"use client";

import Link from "next/link";
import { Scissors, ShieldCheck, ArrowUp, Instagram, Facebook, Phone, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-salon-dark border-t border-neutral-900 pt-16 pb-12 text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-gold-400/50 flex items-center justify-center bg-salon-card">
                <Scissors className="w-4 h-4 text-gold-400 transform -rotate-45" />
              </div>
              <span className="font-editorial text-xl tracking-widest font-bold uppercase text-salon-ivory">
                ABDUL <span className="gold-gradient-text">NAI</span>
              </span>
            </Link>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              The premier destination for haute gentlemen barbering, bespoke hair styling, luxury skin rituals, and executive wellness in Mumbai.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-salon-elevated border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-salon-elevated border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-salon-ivory font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-gold-400 transition-colors">
                  Salon Services
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-gold-400 transition-colors">
                  VIP Packages
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold-400 transition-colors">
                  Heritage & Philosophy
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-gold-400 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold-400 transition-colors">
                  Atelier Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-salon-ivory font-semibold">
              Atelier Hours
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex justify-between">
                <span>Mon — Fri</span>
                <span className="text-salon-ivory font-medium">9 AM — 9 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-salon-ivory font-medium">9 AM — 9 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-salon-ivory font-medium">9 AM — 9 PM</span>
              </li>
              <li className="pt-2 text-[11px] text-gold-400/80">
                * Prior appointment recommended
              </li>
            </ul>
          </div>

          {/* Admin & Security */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-salon-ivory font-semibold">
              Management
            </h4>
            <p className="text-xs text-neutral-400 leading-normal">
              Secure operational portal for appointment scheduling, inventory, and automated Google Sheets synchronization.
            </p>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-medium tracking-wider uppercase border border-gold-500/30 px-3 py-1.5 rounded bg-salon-elevated hover:bg-gold-500/10 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Staff Admin Portal
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} ABDUL NAI Atelier. All Rights Reserved. Luxury Grooming & Coiffure.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-gold-400 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
