import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Shreeram Events & Wedding Planners',
  description: 'Bespoke planning for weddings, birthdays, and cultural milestones in Mayurbhanj.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* ADDED overflow-x-hidden right here to kill the white gap */}
      <body className="bg-[#FAFAFA] text-slate-900 font-sans antialiased min-h-screen flex flex-col relative overflow-x-hidden">
        
        {/* DECORATIVE SCREEN BORDER OVERLAY */}
        <div className="fixed inset-0 z-50 pointer-events-none border-[12px] md:border-[20px] border-white/20 mix-blend-overlay"></div>
        <div className="fixed inset-0 z-50 pointer-events-none opacity-60">
          <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[url('/corner-tl.png')] bg-contain bg-no-repeat" />
          <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-[url('/corner-tr.png')] bg-contain bg-no-repeat bg-right" />
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[url('/corner-bl.png')] bg-contain bg-no-repeat bg-bottom" />
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-[url('/corner-br.png')] bg-contain bg-no-repeat bg-right-bottom" />
        </div>

        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

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