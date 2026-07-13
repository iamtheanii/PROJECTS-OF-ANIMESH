"use client"; // This tells Next.js this is an interactive client-side component

import { useState } from 'react';

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'bday',
    eventDate: '',
    guestCount: '',
    notes: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later, we will send this to your Django Backend. For now, we log it.
    console.log("Form Submitted to Backend:", formData);
    alert("Booking Request Sent! (Check browser console for data)");
    setStep(1); // Reset form
    setFormData({ name: '', email: '', phone: '', eventType: 'bday', eventDate: '', guestCount: '', notes: '' });
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-left">
      {/* Progress Indicator */}
      <div className="mb-8 flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-slate-900 transition-all duration-300 -z-10" 
          style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
        ></div>
        
        {[1, 2, 3].map((num) => (
          <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step >= num ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>
            {num}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()} className="space-y-6">
        
        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-serif text-slate-900 mb-6">Step 1: Your Details</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-900 focus:outline-none" placeholder="Jane Doe" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-900 focus:outline-none" placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-900 focus:outline-none" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Event Specifics */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-serif text-slate-900 mb-6">Step 2: Event Details</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type of Event</label>
              <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-900 focus:outline-none">
                <option value="bday">Birthday Party</option>
                <option value="annv">Anniversary</option>
                <option value="tlk">Tilak Ceremony</option>
                <option value="name">Naming Ceremony</option>
                <option value="wed">Wedding</option>
                <option value="oth">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tentative Date</label>
              <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required className="w-full p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-900 focus:outline-none" />
            </div>
          </div>
        )}

        {/* STEP 3: Logistics */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-serif text-slate-900 mb-6">Step 3: Logistics & Vision</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Guest Count</label>
              <select name="guestCount" value={formData.guestCount} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-900 focus:outline-none">
                <option value="" disabled>Select an estimate</option>
                <option value="50">Under 50</option>
                <option value="100">50 - 150</option>
                <option value="300">150 - 300</option>
                <option value="500+">300+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tell us about your vision</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" className="w-full p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-900 focus:outline-none" placeholder="Any specific themes, venues in mind, or required services?"></textarea>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-slate-100 mt-8">
          {step > 1 ? (
            <button type="button" onClick={prevStep} className="px-6 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              &larr; Back
            </button>
          ) : <div></div>} {/* Empty div to keep 'Next' button on the right */}
          
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors shadow-md">
              Next Step
            </button>
          ) : (
            <button type="submit" className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors shadow-md">
              Submit Request
            </button>
          )}
        </div>
      </form>
    </div>
  );
}