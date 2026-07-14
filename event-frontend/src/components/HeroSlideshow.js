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
      image: '/slideshow/4.jpeg',
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
      
      {/* Background Images */}
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

      {/* The Text Content Container - Added pt-16 so it sits neatly under the navbar */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 pt-16">
        
        {/* STATIC TAGLINE - Removed mt-24, using standard equal spacing now */}
        <span className="text-[0.65rem] md:text-base uppercase tracking-[0.2em] text-slate-300 font-bold drop-shadow-md mb-6 md:mb-8 px-2">
          Welcome to the No.1 Event Planner of Mayurbhanj
        </span>

        {/* DYNAMIC TEXT BOX - Reduced mobile height dramatically to 250px so everything fits */}
        <div className="relative w-full max-w-4xl h-[250px] md:h-[260px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute w-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              <h1 className="text-4xl md:text-7xl font-serif font-light leading-tight drop-shadow-lg text-white mb-4 md:mb-6 w-full px-2">
                {slide.title}
              </h1>
              <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-lg font-light leading-relaxed drop-shadow-md w-full px-2">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>

        {/* STATIC BUTTON - Moved up closer to the text with tighter margins */}
        <div className="mt-4 md:mt-12 z-20">
          <a href="/book" className="inline-block bg-white text-slate-900 text-xs md:text-sm uppercase tracking-widest font-semibold px-6 py-3 md:px-8 md:py-4 rounded-md hover:bg-slate-200 transition-colors shadow-xl">
            Start Planning
          </a>
        </div>

      </div>

    </div>
  );
}