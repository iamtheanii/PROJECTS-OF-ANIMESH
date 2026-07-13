"use client";
import { useState, useEffect } from 'react';

export default function HeroSlideshow() {
  const slides = [
    {
      image: '/slideshow/4.jpeg',
      title: <>Crafting Moments That <br /> <span className="italic font-normal">Last a Lifetime</span></>,
      desc: 'From intimate traditional rituals in Baripada to grand milestone celebrations across the district, we handle every logistical detail so you can stay in the moment.'
    },
    {
      image: '/slideshow/5.jpeg',
      title: <>Your Dream Wedding, <br /> <span className="italic font-normal">Flawlessly Executed</span></>,
      desc: 'We transform your vision into reality, orchestrating magnificent celebrations with stunning decor that you and your guests will remember forever.'
    },
    {
      image: '/slideshow/4.jpeg', // Placeholder for your 3rd image
      title: <>Beautifully Curated <br /> <span className="italic font-normal">Cultural Rituals</span></>,
      desc: 'From vibrant Haldi ceremonies to sacred Tilak rituals, we bring absolute care, respect, and aesthetic perfection to your most important days.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden">
      
      {/* 1. Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* 2. Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

      {/* 3. The Text Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        
        {/* STATIC TAGLINE - Anchored at the top */}
        <span className="text-sm md:text-base uppercase tracking-[0.2em] text-slate-300 font-bold drop-shadow-md mb-8">
          Welcome to the No.1 Event Planner of Mayurbhanj
        </span>

        {/* DYNAMIC TEXT BOX - Increased height to prevent overlap on mobile and tablet */}
        <div className="relative w-full max-w-4xl h-[320px] md:h-[260px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute w-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight drop-shadow-lg text-white mb-6 w-full">
                {slide.title}
              </h1>
              <p className="text-slate-300 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed drop-shadow-md w-full">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>

        {/* STATIC BUTTON - Added mt-12 (margin-top) to push it far away from the text */}
        <div className="mt-12 md:mt-16">
          <a href="/book" className="inline-block bg-white text-slate-900 text-sm uppercase tracking-widest font-semibold px-8 py-4 rounded-md hover:bg-slate-200 transition-colors shadow-xl relative z-20">
            Start Planning
          </a>
        </div>

      </div>

    </div>
  );
}