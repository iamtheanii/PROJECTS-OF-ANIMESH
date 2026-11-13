import React, { useState } from 'react';
import { AGENCY_INFO } from '../data/portfolioData';
import { Mail, Phone, MessageCircle, Send, CheckCircle2, Linkedin, MapPin, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Video Editing & Retention',
    budget: '$500 - $1,500',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Glimpz Studio! My name is ${formData.name || 'a creator'}. I'm interested in ${formData.service}. Budget: ${formData.budget}. Note: ${formData.message}`
    );
    window.open(`https://wa.me/919437238055?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07080b]">
      {/* Glow shapes */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-cyan/20 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Scale</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Let's Build Something <span className="text-brand-cyan">Unforgettable</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have a YouTube video, commercial launch, or custom website in mind? Reach out directly to Animesh Ghosh & Biswajit Das.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info & Quick Connect */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-white">
                Direct Contact Channels
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We believe in zero bureaucracy. You will talk directly to the founders executing your project. Average response time: <span className="text-brand-cyan font-semibold">under 2 hours</span>.
              </p>

              {/* Direct WhatsApp Callout */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-950/20 border border-emerald-500/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fastest Response</h4>
                    <span className="text-sm font-semibold text-emerald-300">+91 9437238055</span>
                  </div>
                </div>
                <a
                  href={AGENCY_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-[#08090C] hover:bg-emerald-400 transition-colors shadow-lg"
                >
                  Chat Now
                </a>
              </div>

              {/* Contact list cards */}
              <div className="space-y-3">
                <a
                  href={`mailto:${AGENCY_INFO.contact.email}`}
                  className="flex items-center gap-3.5 p-4 rounded-xl glass-panel border border-white/5 hover:border-brand-cyan/40 hover:bg-white/5 transition-all text-slate-300 hover:text-white"
                >
                  <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Official Email</span>
                    <span className="font-semibold">{AGENCY_INFO.contact.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${AGENCY_INFO.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-3.5 p-4 rounded-xl glass-panel border border-white/5 hover:border-brand-cyan/40 hover:bg-white/5 transition-all text-slate-300 hover:text-white"
                >
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Direct Line</span>
                    <span className="font-semibold">{AGENCY_INFO.contact.phone}</span>
                  </div>
                </a>

                <a
                  href={AGENCY_INFO.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl glass-panel border border-white/5 hover:border-brand-cyan/40 hover:bg-white/5 transition-all text-slate-300 hover:text-white"
                >
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">LinkedIn Profile</span>
                    <span className="font-semibold">linkedin.com/in/glimpzstudio</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-4 rounded-xl glass-panel border border-white/5 text-slate-400">
                  <div className="p-2 rounded-lg bg-white/5 text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Headquarters</span>
                    <span>Bhubaneswar, Odisha, India</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/5 text-xs text-slate-400">
              <span className="text-brand-cyan font-bold block mb-1">Founder Guarantee:</span>
              If your video doesn't match the agreed quality standards, we offer unlimited revisions until you are 100% satisfied.
            </div>
          </div>

          {/* Right Column: Interactive Proposal & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl glass-panel-glow border border-brand-cyan/30 shadow-2xl">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Inquiry Received, {formData.name || 'Friend'}!
                  </h3>
                  <p className="text-slate-400 text-sm max-w-md mb-6">
                    Animesh Ghosh & Biswajit Das have received your brief and will review your requirements shortly.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="px-6 py-3 rounded-xl text-xs font-bold bg-emerald-500 text-[#08090C] hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Ping on WhatsApp Directly</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 rounded-xl text-xs font-semibold glass-panel text-slate-300 hover:text-white"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">
                      Project Inquiry
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      Tell us about your project vision and we'll reply with a custom roadmap.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F1117] border border-white/10 text-white text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                      >
                        <option>Video Editing & Retention</option>
                        <option>Cinematic Color Grading</option>
                        <option>Shorts / Reels Architecture</option>
                        <option>Full Website Development</option>
                        <option>Complete Web + Video Suite</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F1117] border border-white/10 text-white text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                      >
                        <option>$300 - $600 (Single Edit/Shorts)</option>
                        <option>$600 - $1,500 (Multiple Videos)</option>
                        <option>$1,500 - $3,000 (Monthly Retainer / Web Dev)</option>
                        <option>$3,000+ (Full Suite & Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                      Project Details / Channel Links
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your channel link, raw footage details, references or ideas..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-cyan to-brand-accent text-[#08090C] hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="py-3.5 px-6 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Fast Track via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
