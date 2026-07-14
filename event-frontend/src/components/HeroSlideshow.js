"use client";
import { useState, useEffect } from 'react';

export default function HeroSlideshow() {
  const slides = [
    {
      image: '/slideshow/1.jpeg', 
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
    {
      image: '/slideshow/2.jpeg', 
      title: <>Crafting Moments That <br /> <span className="italic font-normal">Last a Lifetime</span></>,
      desc: 'From intimate traditional rituals in Baripada to grand milestone celebrations across the district, we handle every logistical detail so you can stay in the moment.'
    },
    {
      image: '/slideshow/3.jpeg',
      title: <>Your Dream Wedding, <br /> <span className="italic font-normal">Flawlessly Executed</span></>,
      desc: 'We transform your vision into reality, orchestrating magnificent celebrations with stunning decor that you and your guests will remember forever.'
    },
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

      {/* The Text Content Container - Added -mt-16 on mobile to pull everything up to the visual center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center -mt-16 md:mt-0 md:pt-16">
        
        {/* STATIC TAGLINE */}
        <span className="text-[0.60rem] md:text-base uppercase tracking-[0.2em] text-slate-300 font-bold drop-shadow-md mb-4 md:mb-8 px-4">
          Welcome to the No.1 Event Planner of Mayurbhanj
        </span>

        {/* DYNAMIC TEXT BOX */}
        <div className="relative w-full max-w-4xl h-[220px] md:h-[260px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute w-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-light leading-tight drop-shadow-lg text-white mb-4 md:mb-6 w-full px-4">
                {slide.title}
              </h1>
              <p className="text-slate-300 max-w-xl mx-auto text-xs md:text-lg font-light leading-relaxed drop-shadow-md w-full px-8 md:px-2">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>

        {/* STATIC BUTTON */}
        <div className="mt-4 md:mt-12 z-20">
          <a href="/book" className="inline-block bg-white text-slate-900 text-xs md:text-sm uppercase tracking-widest font-semibold px-6 py-3 md:px-8 md:py-4 rounded-md hover:bg-slate-200 transition-colors shadow-xl">
            Start Planning
          </a>
        </div>

      </div>

    </div>
  );
}