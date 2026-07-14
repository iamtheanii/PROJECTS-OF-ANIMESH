import HeroSlideshow from '../components/HeroSlideshow';

export default function HomePage() {
  // 📸 THE IMAGE GALLERY LIST 📸
  // To add more pictures later, just copy and paste one of these blocks!
  const portfolio = [
    {
      id: 1,
      image: '/slideshow/1.jpeg',
      category: 'Wedding Ceremonies',
      title: 'Sacred Vows',
      description: 'Traditional Mandap decor with cascading florals and warm lighting.',
      span: 'col-span-12 md:col-span-8', // Large wide image (takes 2/3 of screen)
    },
    {
      id: 2,
      image: '/slideshow/2.jpg',
      category: 'Pre-Wedding',
      title: 'Vibrant Haldi',
      description: 'Bright marigolds and joyous energy for the perfect pre-wedding setup.',
      span: 'col-span-12 md:col-span-4', // Small side image (takes 1/3 of screen)
    },
    {
      id: 3,
      image: '/slideshow/3.jpg',
      category: 'Grand Entrances',
      title: 'The Royal Walk',
      description: 'A breathtaking pathway lit by vintage chandeliers and exotic blooms.',
      span: 'col-span-12 md:col-span-4', // Small side image (takes 1/3 of screen)
    },
    {
      id: 4,
      image: '/slideshow/4.jpeg',
      category: 'Venue Styling',
      title: 'Palace Illumination',
      description: 'Transforming heritage venues with spectacular lighting and drapes.',
      span: 'col-span-12 md:col-span-8', // Large wide image (takes 2/3 of screen)
    },
    {
      id: 5,
      image: '/slideshow/5.jpeg',
      category: 'Cultural Rituals',
      title: 'Timeless Traditions',
      description: 'Curating every detail to honor Mayurbhanj’s rich cultural heritage.',
      span: 'col-span-12 md:col-span-6', // Medium half-width image
    },
    {
      id: 6,
      image: '/slideshow/9.jpeg', // Make sure you have a 9.jpeg in your public folder!
      category: 'Reception',
      title: 'A Night to Remember',
      description: 'Elegant stage designs and premium seating arrangements for your guests.',
      span: 'col-span-12 md:col-span-6', // Medium half-width image
    },
    {
      id: 7,
      image: '/slideshow/10.jpeg', // Make sure you have a 10.jpeg!
      category: 'Catering & Dining',
      title: 'A Feast to Remember',
      description: 'Exquisite table settings and premium catering setups.',
      span: 'col-span-12 md:col-span-8', // Large wide image
    },
    {
      id: 8,
      image: '/slideshow/11.jpeg', // Make sure you have an 11.jpeg!
      category: 'Candid Moments',
      title: 'The First Dance',
      description: 'Capturing the magic under cinematic lighting.',
      span: 'col-span-12 md:col-span-4', // Small side image
    }
  ];

  return (
    <div className="w-full bg-slate-950">
      
      {/* 1. HERO SECTION (Takes up full screen height) */}
      <section className="relative w-full h-screen">
        <HeroSlideshow />
      </section>

      {/* 2. GALLERY SECTION (Scroll down to see this) */}
      <section id="gallery" className="w-full py-24 px-4 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          
          {/* Gallery Header */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 drop-shadow-lg">
              Our Masterpieces
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
              Explore our portfolio of meticulously crafted events. From intimate traditional gatherings in Baripada to grand celebrations across the district, we bring absolute aesthetic perfection to every moment.
            </p>
          </div>

          {/* THE UNIQUE MASONRY GRID */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {portfolio.map((item) => (
              <div 
                key={item.id} 
                className={`relative group overflow-hidden rounded-xl bg-slate-900 ${item.span} h-[300px] md:h-[450px] shadow-2xl`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Dark Gradient Overlay (Appears when hovering on desktop, always visible on phone) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

                {/* Text Content inside the Image */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-serif font-light mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm font-light line-clamp-2 md:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}