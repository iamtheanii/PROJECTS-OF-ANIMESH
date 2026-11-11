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
import { Service } from "@/types";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);

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

  return (
    <main className="min-h-screen bg-salon-dark text-salon-ivory relative selection:bg-gold-500 selection:text-black">
      {/* 1. Header Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

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
