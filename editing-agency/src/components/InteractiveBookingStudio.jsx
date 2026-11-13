import React, { useState, useEffect } from 'react';
import { AGENCY_INFO, PROJECT_CLASSIFICATIONS } from '../data/portfolioData';
import { 
  Sparkles, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Film, 
  Code, 
  Clock, 
  Flame, 
  Calendar, 
  RotateCcw,
  ShieldCheck, 
  ArrowRight, 
  Loader2,
  Ticket,
  User,
  Mail,
  Smartphone
} from 'lucide-react';

const STORAGE_KEY = 'glimpz_active_booking';

export default function InteractiveBookingStudio() {
  // Main Category selection: 'cinematic-vibe', 'gaming-octane', 'web-development'
  const [selectedCategoryId, setSelectedCategoryId] = useState('cinematic-vibe');
  const [selectedSubOptionId, setSelectedSubOptionId] = useState('cinematic-short');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientSocial, setClientSocial] = useState('');
  const [projectNote, setProjectNote] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dynamic persistent booking state from localStorage
  const [activeBooking, setActiveBooking] = useState(null);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setActiveBooking(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Storage check:", e);
    }
  }, []);

  // Find active category and sub-option
  const activeCategory = PROJECT_CLASSIFICATIONS.find(c => c.id === selectedCategoryId) || PROJECT_CLASSIFICATIONS[0];
  const activeSubOption = activeCategory.options.find(o => o.id === selectedSubOptionId) || activeCategory.options[0];

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    const cat = PROJECT_CLASSIFICATIONS.find(c => c.id === categoryId);
    if (cat && cat.options.length > 0) {
      setSelectedSubOptionId(cat.options[0].id);
    }
  };

  const generateTicketId = () => {
    return `GLPZ-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const getWhatsAppMessage = (bookingData = null) => {
    const data = bookingData || {
      name: clientName || 'Creator',
      email: clientEmail || 'Not provided',
      phone: clientPhone || 'Not provided',
      social: clientSocial || 'Not provided',
      category: activeCategory.name,
      package: activeSubOption.title,
      duration: activeSubOption.duration,
      note: projectNote || 'Looking forward to working together!',
      ticket: 'Pending'
    };

    return `⚡ *NEW GLIMPZ STUDIO INQUIRY* [${data.ticket || 'TICKET'}] ⚡
--------------------------------------
👤 *Client Name:* ${data.name}
📧 *Email:* ${data.email}
📞 *Phone:* ${data.phone}
📱 *Social/Channel:* ${data.social}
🎯 *Classification:* ${data.category}
🎬 *Package:* ${data.package}
⏱ *Estimated Turnaround:* ${data.duration}
📝 *Project Note:* ${data.note}`;
  };

  const handleWhatsAppAnimesh = (customData = null) => {
    const text = encodeURIComponent(getWhatsAppMessage(customData));
    window.open(`https://wa.me/919437238055?text=${text}`, '_blank');
  };

  const handleWhatsAppBiswajit = (customData = null) => {
    const text = encodeURIComponent(getWhatsAppMessage(customData));
    window.open(`https://wa.me/918456982547?text=${text}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ticketId = generateTicketId();
    const submissionDate = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    const bookingPayload = {
      ticket: ticketId,
      name: clientName,
      email: clientEmail,
      phone: clientPhone || 'Not provided',
      social: clientSocial || 'Not provided',
      category: activeCategory.name,
      package: activeSubOption.title,
      duration: activeSubOption.duration,
      note: projectNote || 'No extra note provided',
      submittedAt: submissionDate,
      status: 'Active • In Review with Directors'
    };

    // Prepare Web3Forms dispatch
    const formData = new FormData();
    formData.append("access_key", AGENCY_INFO.web3forms.accessKey);
    formData.append("subject", `[${ticketId}] New Booking: ${activeSubOption.title} from ${clientName}`);
    formData.append("from_name", "Glimpz Studio");
    formData.append("ticket_id", ticketId);
    formData.append("name", clientName);
    formData.append("email", clientEmail);
    formData.append("phone", clientPhone || "Not provided");
    formData.append("channel", clientSocial || "Not provided");
    formData.append("category", activeCategory.name);
    formData.append("package", activeSubOption.title);
    formData.append("estimated_duration", activeSubOption.duration);
    formData.append("message", projectNote || "No extra note provided");

    try {
      await fetch(AGENCY_INFO.web3forms.endpoint, {
        method: "POST",
        body: formData
      });
    } catch (err) {
      console.warn("Dispatch Notice:", err);
    } finally {
      // Persist in localStorage so it stays active across page refreshes!
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingPayload));
      } catch (e) {
        console.warn("Storage save error:", e);
      }
      setActiveBooking(bookingPayload);
      setIsSubmitting(false);
    }
  };

  const handleResetBooking = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Storage clear error:", e);
    }
    setActiveBooking(null);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientSocial('');
    setProjectNote('');
  };

  return (
    <section id="booking" className="py-24 relative overflow-hidden bg-[#06070a]">
      {/* Background glow flares */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-cyan/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Priority Client Intake • Live Turnaround</span>
          </div>
          <h2 className="font-hero text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Configure Your Project
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Choose your editing style or website tier below. Delivery turnaround is calculated automatically.
          </p>
        </div>

        {/* Main Interactive Booking Card */}
        <div className="max-w-5xl mx-auto rounded-3xl glass-panel-glow border border-brand-cyan/30 p-6 sm:p-10 shadow-2xl bg-[#090b10]/95">
          
          {/* PERSISTENT CONFIRMED BOOKING STATE (Retained on page refresh!) */}
          {activeBooking ? (
            <div className="py-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
              
              {/* Status Header Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeBooking.status}</span>
              </div>

              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/40 shadow-glow-cyan">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="font-hero text-3xl sm:text-4xl font-extrabold text-white mb-2">
                Your Booking Has Been Submitted!
              </h3>
              
              <p className="text-slate-300 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
                Welcome, <strong className="text-brand-cyan font-semibold">{activeBooking.name}</strong>. Your project brief is active and currently being reviewed by <strong className="text-white">Animesh Ghosh & Biswajit Das</strong>.
              </p>

              {/* Dynamic Confirmed Specs Ticket Receipt */}
              <div className="w-full max-w-lg rounded-2xl bg-white/5 border border-white/10 p-5 mb-8 text-left space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5 text-brand-cyan" />
                    Reference Ticket:
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/25">
                    {activeBooking.ticket}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Package Chosen</span>
                    <span className="font-semibold text-white">{activeBooking.package}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Delivery Timeline</span>
                    <span className="font-bold text-emerald-400">{activeBooking.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Client Name</span>
                    <span className="text-slate-200">{activeBooking.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Submitted On</span>
                    <span className="text-slate-400 font-mono text-[11px]">{activeBooking.submittedAt}</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Direct Actions */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 max-w-lg w-full mb-8 text-left space-y-3">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  Fast-Track Direct Chat via WhatsApp:
                </span>
                
                <button
                  onClick={() => handleWhatsAppAnimesh(activeBooking)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Chat with Animesh Ghosh (Cinematic Lead)
                  </span>
                  <span className="font-mono text-[10px]">+91 9437238055</span>
                </button>

                <button
                  onClick={() => handleWhatsAppBiswajit(activeBooking)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Chat with Biswajit Das (Gaming & Web Lead)
                  </span>
                  <span className="font-mono text-[10px]">+91 8456982547</span>
                </button>
              </div>

              {/* Action: Book Again / Submit Another Request */}
              <button
                onClick={handleResetBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold glass-panel text-slate-300 hover:text-white hover:border-brand-cyan/40 transition-all group"
              >
                <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform" />
                <span>Want to Submit or Book Another Project? Click Here</span>
              </button>

            </div>
          ) : (
            /* ACTIVE INTAKE FORM (When no booking is in progress or user chooses to book again) */
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Step 1: Primary Classification Choice */}
              <div>
                <span className="text-xs font-mono uppercase text-brand-cyan font-bold tracking-wider flex items-center gap-2 mb-4">
                  <span className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center text-[10px] text-brand-cyan">1</span>
                  Choose Primary Category
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Category 1: Cinematic Smooth */}
                  <div
                    onClick={() => handleCategoryChange('cinematic-vibe')}
                    className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                      selectedCategoryId === 'cinematic-vibe'
                        ? 'bg-brand-cyan/10 border-brand-cyan shadow-glow-cyan'
                        : 'glass-panel border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                        <Film className="w-5 h-5" />
                      </div>
                      <h4 className="font-hero text-base font-bold text-white mb-1">
                        Cinematic Smooth Transitions & Cuts
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Pure vibe, slow-motion curves, and aesthetic pacing without unnecessary clutter.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-brand-cyan pt-2 border-t border-white/5">
                      {selectedCategoryId === 'cinematic-vibe' ? '✓ Selected' : 'Select Option'}
                    </span>
                  </div>

                  {/* Category 2: Pure Gaming High-Octane */}
                  <div
                    onClick={() => handleCategoryChange('gaming-octane')}
                    className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                      selectedCategoryId === 'gaming-octane'
                        ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                        : 'glass-panel border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                        <Flame className="w-5 h-5" />
                      </div>
                      <h4 className="font-hero text-base font-bold text-white mb-1">
                        Pure Gaming: High-Octane Cuts
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Velocity ramping, beat-synced hit VFX, and thunderous combat sound design.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-amber-400 pt-2 border-t border-white/5">
                      {selectedCategoryId === 'gaming-octane' ? '✓ Selected' : 'Select Option'}
                    </span>
                  </div>

                  {/* Category 3: Modern Web Dev */}
                  <div
                    onClick={() => handleCategoryChange('web-development')}
                    className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                      selectedCategoryId === 'web-development'
                        ? 'bg-purple-500/10 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                        : 'glass-panel border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                        <Code className="w-5 h-5" />
                      </div>
                      <h4 className="font-hero text-base font-bold text-white mb-1">
                        Modern Website Development
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Portfolios, launch pages, corporate sites & interactive booking systems.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-purple-400 pt-2 border-t border-white/5">
                      {selectedCategoryId === 'web-development' ? '✓ Selected' : 'Select Option'}
                    </span>
                  </div>

                </div>
              </div>

              {/* Step 2: Specific Scope & Automated Turnaround Calculation */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <span className="text-xs font-mono uppercase text-brand-cyan font-bold tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center text-[10px] text-brand-cyan">2</span>
                    Select Format & View Duration
                  </span>

                  {/* Auto-Calculated Duration Live Banner */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Estimated Turnaround: {activeSubOption.duration}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCategory.options.map((option) => {
                    const isSelected = selectedSubOptionId === option.id;
                    return (
                      <div
                        key={option.id}
                        onClick={() => setSelectedSubOptionId(option.id)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white/10 border-brand-cyan shadow-lg'
                            : 'glass-panel border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-hero text-sm font-bold text-white">
                              {option.title}
                            </span>
                            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              {option.durationBadge}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed mb-3">
                            {option.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
                          <span>Ideal for: {option.recommendedFor}</span>
                          <span className={isSelected ? 'text-brand-cyan font-bold' : 'text-slate-500'}>
                            {isSelected ? '✓ Active' : 'Choose'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Contact Details & Project Brief */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-mono uppercase text-brand-cyan font-bold tracking-wider flex items-center gap-2 mb-4">
                  <span className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center text-[10px] text-brand-cyan">3</span>
                  Your Contact Information & Raw Assets
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="creator@domain.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      Channel / Social Link
                    </label>
                    <input
                      type="text"
                      placeholder="youtube.com/@channel or @insta"
                      value={clientSocial}
                      onChange={(e) => setClientSocial(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                    Raw Footage Link / Google Drive / Project Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Paste your Google Drive link or describe your vision (e.g., pure aesthetic slow-mo for reel, or high-octane gaming edit)..."
                    value={projectNote}
                    onChange={(e) => setProjectNote(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                {/* Primary Submission Button */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 py-4 px-6 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-brand-cyan via-brand-accent to-sky-300 text-black hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching Project Brief...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Brief</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Founder WhatsApp Buttons */}
                <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppAnimesh()}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Animesh (Cinematic Lead): +91 9437238055</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppBiswajit()}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Biswajit (Gaming & Web Lead): +91 8456982547</span>
                  </button>
                </div>

              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
