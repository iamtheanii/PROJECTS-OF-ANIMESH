import React, { useState } from 'react';
import IntroLoader from './components/IntroLoader';
import Hero from './components/Hero';
import TrustStats from './components/TrustStats';
import VideoCarouselSlider from './components/VideoCarouselSlider';
import ColorGradingComparison from './components/ColorGradingComparison';
import WebDevCapabilities from './components/WebDevCapabilities';
import WorkflowSection from './components/WorkflowSection';
import AboutFounders from './components/AboutFounders';
import InteractiveBookingStudio from './components/InteractiveBookingStudio';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import { YOUTUBE_SHORTS } from './data/portfolioData';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpenShowreel = () => {
    // Open the primary Black Myth: Wukong short edit in vertical smartphone modal
    setSelectedVideo(YOUTUBE_SHORTS[0]);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 flex flex-col selection:bg-brand-cyan/20 selection:text-brand-cyan relative">
      
      {/* Stylish Cinematic Intro Animation */}
      {showIntro && (
        <IntroLoader onComplete={() => setShowIntro(false)} />
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Full-bleed Cinematic Hero based on Pinterest Reference */}
        <Hero onOpenShowreel={handleOpenShowreel} />

        {/* Agency Metrics Bar */}
        <TrustStats />
        
        {/* Vertical 9:16 YouTube Shorts Vault with Smooth 3D Coverflow */}
        <VideoCarouselSlider onSelectVideo={setSelectedVideo} />

        {/* DaVinci Resolve Color Grading Before/After Suite */}
        <ColorGradingComparison />

        {/* Production-Ready Web Development Techniques */}
        <WebDevCapabilities />

        {/* 4-Step Production Workflow */}
        <WorkflowSection />

        {/* Dedicated Founders Spotlight: Animesh Ghosh & Biswajit Das */}
        <AboutFounders />

        {/* Interactive Booking Studio with Web3Forms + WhatsApp */}
        <InteractiveBookingStudio />
      </main>

      {/* Footer */}
      <Footer />

      {/* Vertical Smartphone Video Lightbox Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
