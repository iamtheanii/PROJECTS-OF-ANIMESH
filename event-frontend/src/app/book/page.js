import BookingForm from '../../components/BookingForm';

export default function BookPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-[85vh] flex items-center justify-center">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-8 md:p-12 space-y-8 relative z-10 w-full">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">
            Begin Your Journey
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-slate-900">Plan Your Event</h1>
          <p className="text-slate-500 text-sm md:text-base">
            Provide your details below, and our team will reach out to discuss your vision and provide a bespoke quote.
          </p>
        </div>
        
        <BookingForm />
      </div>
    </div>
  );
}