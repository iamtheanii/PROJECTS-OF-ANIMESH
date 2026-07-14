import HeroSlideshow from '../components/HeroSlideshow';

export default function HomePage() {
  const portfolio = [
    {
      id: 1,
      image: '/slideshow/1.jpeg', 
      category: 'Wedding Ceremonies',
      title: 'Sacred Vows',
      description: 'Traditional Mandap decor with cascading florals and warm lighting.',
      span: 'col-span-12 md:col-span-8',
    },
    {
      id: 2,
      image: '/slideshow/2.jpg',
      category: 'Pre-Wedding',
      title: 'Vibrant Haldi',
      description: 'Bright marigolds and joyous energy for the perfect pre-wedding setup.',
      span: 'col-span-12 md:col-span-4',
    },
    {
      id: 3,
      image: '/slideshow/3.jpg',
      category: 'Grand Entrances',
      title: 'The Royal Walk',
      description: 'A breathtaking pathway lit by vintage chandeliers and exotic blooms.',
      span: 'col-span-12 md:col-span-4',
    },
    {
      id: 4,
      image: '/slideshow/9.jpeg', 
      category: 'Grand Entrances',
      title: 'The Bride\'s Arrival',
      description: 'A breathtaking pathway lit by vintage chandeliers and exotic blooms.',
      span: 'col-span-12 md:col-span-6',
    },
    {
      id: 5,
      image: '/slideshow/4.jpeg',
      category: 'Venue Styling',
      title: 'Palace Illumination',
      description: 'Transforming heritage venues with spectacular lighting and drapes.',
      span: 'col-span-12 md:col-span-6',
    },
    {
      id: 6,
      image: '/slideshow/8.jpeg',
      category: 'Pre Wedding Rituals',
      title: 'Haldi Vibrance',
      description: 'A burst of marigolds and joyous energy for intimate celebrations.',
      span: 'col-span-12 md:col-span-4',
    }
  ];

  return (
    <div className="w-full bg-[#FAFAFA]">
      
      {/* HERO SECTION - Keeps its cinematic layout */}
      <section className="relative w-full h-screen">
        <HeroSlideshow />
      </section>

      {/* GALLERY SECTION - Restored to the clean White Theme */}
      <section id="gallery" className="w-full py-24 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 drop-shadow-sm">
              Our Masterpieces
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
              Explore our portfolio of meticulously crafted events. From intimate traditional gatherings in Baripada to grand celebrations across the district, we bring absolute aesthetic perfection to every moment.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {portfolio.map((item) => (
              <div 
                key={item.id} 
                className={`relative group overflow-hidden rounded-xl bg-gray-100 ${item.span} h-[300px] md:h-[450px] shadow-xl`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Dark gradient so the white text stays readable over the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-3 drop-shadow-md">
                    {item.category}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-serif font-light mb-2 drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-slate-200 text-sm font-light line-clamp-2 md:line-clamp-none drop-shadow-md">
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