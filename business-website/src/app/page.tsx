"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServicesSection from "@/components/ServicesSection";
import FeaturedPackages from "@/components/FeaturedPackages";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import LocationContact from "@/components/LocationContact";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Service, Booking } from "@/types";
import { CheckCircle2, Scissors } from "lucide-react";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  const [recentBooking, setRecentBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        if (data.success && data.services) {
          setServices(data.services);
        }
      } catch (err) {
        console.error("Failed to load salon services:", err);
      }
    }
    loadServices();
  }, []);

  // Restore and synchronize recent booking state across page reloads
  useEffect(() => {
    const loadSavedBooking = () => {
      try {
        const saved = localStorage.getItem("abdul_recent_booking");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.booking_id) {
            setRecentBooking(parsed);
          }
        } else {
          setRecentBooking(null);
        }
      } catch (e) {
        console.error("Error reading recent booking", e);
      }
    };

    loadSavedBooking();

    window.addEventListener("abdul_booking_submitted", loadSavedBooking);
    window.addEventListener("abdul_booking_cleared", loadSavedBooking);
    return () => {
      window.removeEventListener("abdul_booking_submitted", loadSavedBooking);
      window.removeEventListener("abdul_booking_cleared", loadSavedBooking);
    };
  }, []);

  const handleOpenBooking = (service?: Service) => {
    if (service) {
      setSelectedServiceForModal(service);
    } else {
      setSelectedServiceForModal(null);
    }
    setIsBookingOpen(true);
  };

  const handleSelectServiceByName = (name: string) => {
    const found = services.find((s) => s.name.toLowerCase().includes(name.toLowerCase()));
    if (found) {
      handleOpenBooking(found);
    } else {
      handleOpenBooking();
    }
  };

  // Re-booking handler: clears previous hold and opens fresh booking form
  const handleBookAgain = () => {
    try {
      localStorage.removeItem("abdul_recent_booking");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("abdul_booking_cleared"));
      }
    } catch {}
    setRecentBooking(null);
    setSelectedServiceForModal(null);
    setIsBookingOpen(true);
  };

  const handleViewSubmittedBooking = () => {
    setSelectedServiceForModal(null);
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-salon-dark text-salon-ivory relative selection:bg-gold-500 selection:text-black">
      {/* 1. Header Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Persistent Submitted Booking Query & Status Notification (Shown on refresh) */}
      {recentBooking && (
        <aside
          aria-label="Submitted Booking Status"
          className="sticky top-16 sm:top-20 z-40 bg-salon-elevated/95 backdrop-blur-md border-y border-gold-500/40 px-4 py-3 sm:py-3.5 shadow-2xl transition-all"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Your Booking Has Been Submitted
                  </span>
                  <span className="text-neutral-500 hidden sm:inline">•</span>
                  <span className="font-mono text-xs font-semibold text-gold-400">
                    ID: {recentBooking.booking_id}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 truncate mt-0.5">
                  Reserved: <span className="text-salon-ivory font-medium">{recentBooking.service_name}</span> for {recentBooking.customer_name} ({recentBooking.appointment_date} at {recentBooking.appointment_time})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end shrink-0">
              <button
                type="button"
                onClick={handleViewSubmittedBooking}
                className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 transition-colors"
              >
                View Details
              </button>
              <button
                type="button"
                onClick={handleBookAgain}
                className="gold-gradient-bg text-black px-4 py-1.5 text-xs uppercase tracking-wider font-semibold rounded shadow hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Want to Book Again?</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Hero Section: "LOOK GOOD. FEEL CONFIDENT." & CTA */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* 3. About Abdul Nai */}
      <About />

      {/* 4. Our Services */}
      <ServicesSection
        services={services}
        onSelectService={(service) => handleOpenBooking(service)}
      />

      {/* 5. Featured Packages */}
      <FeaturedPackages
        onSelectServiceByName={handleSelectServiceByName}
      />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 7. Salon Gallery */}
      <Gallery />

      {/* 8. Customer Testimonials */}
      <Testimonials />

      {/* 9. Location & Contact */}
      <LocationContact onOpenBooking={() => handleOpenBooking()} />

      {/* 10. Footer */}
      <Footer />

      {/* Full Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        initialSelectedService={selectedServiceForModal}
      />
    </main>
  );
}
