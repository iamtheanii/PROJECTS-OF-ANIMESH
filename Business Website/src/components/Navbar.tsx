"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scissors, Menu, X, Calendar, ShieldCheck, PhoneCall } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-salon-dark/90 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border border-gold-400/50 flex items-center justify-center bg-salon-card group-hover:border-gold-400 transition-colors">
            <Scissors className="w-5 h-5 text-gold-400 transform -rotate-45" />
          </div>
          <div>
            <span className="font-editorial text-2xl tracking-widest font-bold uppercase text-salon-ivory">
              ABDUL <span className="gold-gradient-text">NAI</span>
            </span>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-gold-400/80 -mt-1 font-medium">
              Luxury Unisex Salon
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wider uppercase text-neutral-300">
          <a href="#services" className="hover:text-gold-400 transition-colors">
            Services
          </a>
          <a href="#packages" className="hover:text-gold-400 transition-colors">
            Packages
          </a>
          <a href="#about" className="hover:text-gold-400 transition-colors">
            About
          </a>
          <a href="#why-us" className="hover:text-gold-400 transition-colors">
            Why Us
          </a>
          <a href="#gallery" className="hover:text-gold-400 transition-colors">
            Gallery
          </a>
          <a href="#contact" className="hover:text-gold-400 transition-colors">
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/admin"
            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-gold-300 transition-colors flex items-center gap-1.5 px-3 py-2 border border-neutral-800 rounded hover:border-gold-500/30"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
            Admin
          </Link>
          <button
            onClick={onOpenBooking}
            className="gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded shadow-lg hover:shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book Appointment
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider px-3.5 py-2 rounded"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-neutral-300 hover:text-gold-400 p-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-salon-dark/95 backdrop-blur-xl border-b border-gold-500/20 px-6 py-6 space-y-4">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium tracking-wider uppercase text-neutral-300 hover:text-gold-400"
          >
            Services
          </a>
          <a
            href="#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium tracking-wider uppercase text-neutral-300 hover:text-gold-400"
          >
            Packages
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium tracking-wider uppercase text-neutral-300 hover:text-gold-400"
          >
            About Abdul Nai
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium tracking-wider uppercase text-neutral-300 hover:text-gold-400"
          >
            Why Choose Us
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium tracking-wider uppercase text-neutral-300 hover:text-gold-400"
          >
            Salon Gallery
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium tracking-wider uppercase text-neutral-300 hover:text-gold-400"
          >
            Contact & Location
          </a>
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-gold-400 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              Admin Portal
            </Link>
            <a
              href="tel:+919876543210"
              className="text-xs text-gold-400 flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              +91 98765 43210
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
