import HeroSlideshow from '../components/HeroSlideshow';
import FadeIn from '../components/FadeIn';

export default function HomePage() {
  // Add as many pictures as you want here!
  // 'span' controls the collage layout on desktop screens.
  const portfolio = [
    {
      id: 1,
      image: '/slideshow/4.jpeg',
      category: 'Signature Weddings',
      title: 'The Royal Mandap',
      description: 'Bespoke floral arrangements and regal architectural elements designed for a picture-perfect ceremony.',
      span: 'col-span-12 md:col-span-8 md:row-span-2', // Large Feature Image
    },
    {
      id: 2,
      image: '/slideshow/5.jpeg',
      category: 'Pre-Wedding Rituals',
      title: 'Haldi Vibrance',
      description: 'A burst of marigolds and joyous energy for intimate family traditions.',
      span: 'col-span-12 md:col-span-4', // Small Side Image
    },
    {
      id: 3,
      image: '/slideshow/4.jpeg', // Replace with a new image later
      category: 'Finer Details',
      title: 'Tablescape Elegance',
      description: 'Crystal centerpieces and gold-rimmed detailing for the evening reception.',
      span: 'col-span-12 md:col-span-4', // Small Side Image
    },
    {
      id: 4,
      image: '/slideshow/5.jpeg', // Replace with a new image later
      category: 'Grand Entrances',
      title: 'The Bride\'s Arrival',
      description: 'A breathtaking pathway lit by vintage chandeliers and exotic orchids.',
      span: 'col-span-12 md:col-span-6', // Medium Half-Width Image
    },
    {
      id: 5,
      image: '/slideshow/4.jpeg', // Replace with a new image later
      category: 'Venue Styling',
      title: 'Palace Illumination',
      description: 'Transforming heritage venues with spectacular lighting and sheer drapery.',
      span: 'col-span-12 md:col-span-6', // Medium Half-Width Image
    },
    // --- NEW IMAGES ADDED BELOW ---
    {
      id: 6,
      image: '/slideshow/10.jpeg', // Replace with your actual image path
      category: 'Catering & Dining',
      title: 'A Feast to Remember',
      description: 'Exquisite table settings and premium catering setups curated for your guests.',
      span: 'col-span-12 md:col-span-8', // Large Wide Image
    },
    {
      id: 7,
      image: '/slideshow/11.jpeg', // Replace with your actual image path
      category: 'Candid Moments',
      title: 'The First Dance',
      description: 'Capturing the magic under cinematic lighting and elegant decor.',
      span: 'col-span-12 md:col-span-4', // Small Side Image
    },
    {
      id: 8,
      image: '/slideshow/12.jpeg', // Replace with your actual image path
      category: 'Reception Decor',
      title: 'A Night to Remember',
      description: 'Elegant stage designs and premium seating arrangements to conclude the perfect day.',
      span: 'col-span-12 md:col-span-12', // Massive Full-Width Feature Image
    }
  ];

  return (
    <div className="space-y-0 bg-[#FAFAFA]">
      
      {/* Hero Section */}
      <section className="relative w-full h-[95vh] overflow-hidden">
        <HeroSlideshow />
      </section>

      {/* Philosophy Introduction */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center space-y-6">
        <FadeIn>
          <span className="text-[#D4AF37] tracking-[0.3em] text-sm font-bold uppercase">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-snug mt-4">
            Curating Elegance, <br />Celebrating Traditions.
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto my-8"></div>
          <p className="text-slate-600 text-lg font-light leading-relaxed">
            At Shreeram Events, we believe that every milestone deserves to be framed in perfection. With a deep respect for cultural heritage and an eye for modern luxury, we transform empty spaces into breathtaking realities.
          </p>
        </FadeIn>
      </section>

      {/* The Editorial Portfolio Collage */}
      <section id="gallery" className="w-full max-w-[1400px] mx-auto px-6 pb-32">
        <FadeIn>
          <div className="flex justify-between items-end border-b border-slate-200 pb-6 mb-12">
            <h2 className="text-3xl font-serif text-slate-900">Curated Portfolio</h2>
            <a href="/book" className="hidden md:block text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-slate-900 transition-colors">
              Begin Planning &rarr;
            </a>
          </div>
        </FadeIn>

        {/* The Grid Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 auto-rows-[minmax(350px,_auto)]">
          {portfolio.map((item, index) => (
            <FadeIn 
              key={item.id} 
              delay={index % 3 * 150} // Creates a staggered staircase animation effect
              className={`group flex flex-col ${item.span}`}
            >
              {/* Image Container with subtle zoom on hover */}
              <div className="relative w-full h-[350px] md:h-full min-h-[350px] overflow-hidden rounded-sm bg-slate-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                />
              </div>
              
              {/* Text Description underneath the image */}
              <div className="mt-6 space-y-2 pr-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                  {item.category}
                </span>
                <h3 className="text-2xl font-serif text-slate-900 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      
      {/* Final Call to Action Strip */}
      <section className="bg-slate-950 py-24 px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">Ready to create something beautiful?</h2>
          <a href="/book" className="inline-block bg-[#D4AF37] text-slate-950 text-sm uppercase tracking-widest font-bold px-10 py-4 rounded hover:bg-[#F3E5AB] transition-colors shadow-lg">
            Request a Consultation
          </a>
        </FadeIn>
      </section>

    </div>
  );
}