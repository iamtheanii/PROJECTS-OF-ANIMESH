"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar"; // Adjust path if your Navbar is elsewhere

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  // Standardized Event Options
  const eventTypes = [
    "Wedding", "Reception", "Engagement", "Birthday", "Anniversary", 
    "Bratapanyana", "Annaprashan", "Pila Chawal", "Kuan Pujan", 
    "Showroom Decoration", "Pandal Decoration", "Gruha Pravesh", 
    "Baby Welcome", "Haldi", "Mehendi", "Sangeet"
  ];

  // Standardized Requirement Options
  const requirementOptions = [
    "Theme decor", "Traditional decor", "Luxury decor", 
    "Decoration", "Tent house", "Light and sound", "Full event"
  ];

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    eventType: "",
    requirements: [],
    venue: "",
    date: "",
    time: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Checkbox Changes for Requirements
  const handleRequirementChange = (req) => {
    setFormData((prev) => {
      const isSelected = prev.requirements.includes(req);
      if (isSelected) {
        return { ...prev, requirements: prev.requirements.filter((r) => r !== req) };
      } else {
        return { ...prev, requirements: [...prev.requirements, req] };
      }
    });
  };

  // Handle Form Submission (The Backend Connection)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Prepare data for Web3Forms API
    const payload = {
      access_key: "9b300fd5-9bb4-467b-a149-36ccfae8ee20", // <--- PASTE YOUR KEY HERE
      subject: `New Booking Request from ${formData.name} - ${formData.eventType}`,
      from_name: "Shreeram Events Booking System",
      ...formData,
      requirements: formData.requirements.join(", "), // Convert array to string for email
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        // Reset form
        setFormData({ name: "", mobile: "", whatsapp: "", eventType: "", requirements: [], venue: "", date: "", time: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Plan Your Perfect Event</h1>
          <p className="text-slate-600">Provide us with your details, and our team will get back to you with a bespoke proposal.</p>
        </div>

        {/* The Form */}
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-slate-100">
          
          {submitStatus === "success" ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
              <h2 className="text-3xl font-serif text-slate-900 mb-4">Request Sent Successfully!</h2>
              <p className="text-slate-600">Thank you for choosing Shreeram Events. We will contact you shortly.</p>
              <button onClick={() => setSubmitStatus(null)} className="mt-8 text-[#D4AF37] font-bold tracking-widest uppercase text-sm hover:text-slate-900">
                Submit Another Request
              </button>
            </div>
          ) : (

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Details (Grid layout for desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors" placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number *</label>
                  <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors" placeholder="10-digit mobile number" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">WhatsApp Number *</label>
                  <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors" placeholder="WhatsApp number" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Event Type *</label>
                  <select required name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors appearance-none">
                    <option value="" disabled>Select event type...</option>
                    {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>

              {/* Event Logistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Event Date *</label>
                  <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Event Time *</label>
                  <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Venue / Location *</label>
                  <input required type="text" name="venue" value={formData.venue} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors" placeholder="City or Venue Name" />
                </div>
              </div>

              {/* Requirements (Checkboxes) */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Requirements (Select all that apply) *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {requirementOptions.map(req => (
                    <label key={req} className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 flex items-center justify-center border rounded transition-colors ${formData.requirements.includes(req) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'bg-white border-slate-300 group-hover:border-[#D4AF37]'}`}>
                        {formData.requirements.includes(req) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <input type="checkbox" className="hidden" checked={formData.requirements.includes(req)} onChange={() => handleRequirementChange(req)} />
                      <span className="text-sm text-slate-700">{req}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="bg-red-50 text-red-600 p-4 rounded text-sm">
                  Something went wrong. Please check your internet connection and try again.
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-100">
                <button 
                  type="submit" 
                  disabled={isSubmitting || formData.requirements.length === 0}
                  className={`w-full md:w-auto bg-[#D4AF37] text-slate-950 text-sm uppercase tracking-widest font-bold px-12 py-4 rounded shadow-lg transition-all ${isSubmitting || formData.requirements.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F3E5AB] hover:-translate-y-1'}`}
                >
                  {isSubmitting ? 'Sending Request...' : 'Submit Booking Request'}
                </button>
                {formData.requirements.length === 0 && (
                  <p className="text-xs text-red-500 mt-2">* Please select at least one requirement.</p>
                )}
              </div>

            </form>
          )}

        </div>
      </main>
    </div>
  );
}