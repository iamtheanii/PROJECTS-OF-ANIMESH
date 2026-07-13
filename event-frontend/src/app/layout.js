import './globals.css';

export const metadata = {
  title: 'Shreeram Events & Wedding Planners',
  description: 'Bespoke planning for weddings, birthdays, and cultural milestones in Mayurbhanj.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#FAFAFA] text-slate-900 font-sans antialiased min-h-screen flex flex-col relative">
        
        {/* DECORATIVE SCREEN BORDER OVERLAY */}
        {/* These divs act as placeholders. When you download beautiful floral or mandala corner PNGs with transparent backgrounds, you can put them in your public folder and link them here! */}
        <div className="fixed inset-0 z-50 pointer-events-none border-[12px] md:border-[20px] border-white/20 mix-blend-overlay"></div>
        <div className="fixed inset-0 z-50 pointer-events-none opacity-60">
          {/* Top Left Corner */}
          <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[url('/corner-tl.png')] bg-contain bg-no-repeat" />
          {/* Top Right Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-[url('/corner-tr.png')] bg-contain bg-no-repeat bg-right" />
          {/* Bottom Left Corner */}
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[url('/corner-bl.png')] bg-contain bg-no-repeat bg-bottom" />
          {/* Bottom Right Corner */}
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-[url('/corner-br.png')] bg-contain bg-no-repeat bg-right-bottom" />
        </div>

        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
          <div className="w-full px-4 md:px-12 h-24 flex items-center justify-between">
            
            {/* LOGO SECTION */}
            <a href="/" className="flex items-center gap-4 cursor-pointer">
              <img 
                src="/logo.jpeg" 
                alt="Shreeram Events & Wedding Planners" 
                className="h-16 md:h-20 w-auto object-contain flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase leading-none drop-shadow-md">
                  Shreeram
                </span>
                <span className="text-[0.65rem] md:text-xs font-semibold tracking-[0.3em] text-slate-300 uppercase mt-1">
                  Events
                </span>
              </div>
            </a>

            <nav className="hidden md:flex space-x-10 text-xs font-semibold tracking-widest text-slate-300 uppercase">
              <a href="/#services" className="hover:text-[#D4AF37] transition-colors duration-300">Services</a>
              <a href="/#gallery" className="hover:text-[#D4AF37] transition-colors duration-300">Gallery</a>
              <a href="/#contact" className="hover:text-[#D4AF37] transition-colors duration-300">Contact</a>
            </nav>
            {/* UPDATED HREF TO /book */}
            <a href="/book" className="bg-[#D4AF37] text-slate-950 text-xs uppercase tracking-widest font-bold px-8 py-4 rounded hover:bg-[#F3E5AB] transition-colors shadow-lg z-50">
              Book Now
            </a>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 relative z-40">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-light">
              &copy; {new Date().getFullYear()} Shreeram Events & Wedding Planners. All rights reserved.
            </p>
            <div className="flex space-x-8 text-sm font-light">
              <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}