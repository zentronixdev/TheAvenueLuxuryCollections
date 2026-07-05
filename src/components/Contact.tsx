import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, ShieldCheck, Ticket, Calendar, User, PhoneCall, Sparkles } from "lucide-react";

interface ContactProps {
  initialProductName?: string;
  isModalVariant?: boolean;
  onCloseModal?: () => void;
}

export default function Contact({ initialProductName = "", isModalVariant = false, onCloseModal }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "14:00",
    preferredService: initialProductName ? `Fitting for: ${initialProductName}` : "Exclusive Bridal/Groom Trial Fitting",
    fittingLocation: "flagship-chennai",
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError("Please provide your name and telephone number so our concierge can reach you.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate slightly elegant network transmission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newBookingId = `AVE-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBookingObj = {
        bookingId: newBookingId,
        ...formData,
        qrCode: "FITTING-SUITE-PASS"
      };

      // Retrieve existing offline DB or seed a blank list
      const localDBStr = localStorage.getItem("the_avenue_fittings_db");
      const currentDB = localDBStr ? JSON.parse(localDBStr) : [
        {
          bookingId: "AVE-MUH-7738",
          name: "Prasanna Venkatesan",
          preferredService: "Imperial Tamilnadu Gold-Border Sherwani - Trial",
          fittingLocation: "flagship-chennai",
          date: "2026-07-12",
          time: "10:30",
        },
        {
          bookingId: "AVE-REC-8902",
          name: "Rajesh Kannan",
          preferredService: "The Avenue Royal Navy Tuxedo Blazer - Fitting",
          fittingLocation: "flagship-chennai",
          date: "2026-07-15",
          time: "14:00",
        }
      ];

      // Prepend our new booking
      const updatedDB = [newBookingObj, ...currentDB];
      localStorage.setItem("the_avenue_fittings_db", JSON.stringify(updatedDB));
      localStorage.setItem("latest_avenue_booking_id", newBookingId);

      setSuccessData(newBookingObj);
    } catch (err: any) {
      setError("An offline storage error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const servicesList = [
    "Exclusive Bridal/Groom Trial Fitting",
    "Best Man / Groomsmen Dressing Suite",
    "Bespoke Consultation with AI Master Stylist",
    "Special Evening Reception Styling",
    "Custom Fabric Selection & Alteration"
  ];

  return (
    <section id="contact" className={`bg-dark-base relative overflow-hidden select-none ${isModalVariant ? "py-0" : "py-24 border-t border-white/5"}`}>
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Header */}
        {!isModalVariant && (
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] text-gold-accent uppercase font-serif font-semibold block mb-2">Bespoke Fitting Booking</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-widest text-white uppercase">
              Schedule A <span className="text-red-accent italic">Trial Suite</span>
            </h2>
            <div className="w-24 h-[1px] bg-gold-accent/30 mx-auto mt-4" />
            <p className="max-w-2xl mx-auto text-light-gray font-light text-sm mt-4 text-center">
              Reserve your private fitting suite session today. Our master tailors and personal stylists will guide you to perfection.
            </p>
          </div>
        )}

        <div className={`grid grid-cols-1 ${isModalVariant ? "" : "lg:grid-cols-2"} gap-12 items-start`}>
          
          {/* Left Column: Booking Form Container */}
          <div className="p-8 sm:p-10 bg-dark-card border border-white/5 shadow-2xl shadow-black relative overflow-hidden">
            {/* Corner styling */}
            <div className="absolute top-0 left-0 w-8 h-[1px] bg-gold-accent" />
            <div className="absolute top-0 left-0 w-[1px] h-8 bg-gold-accent" />
            
            <AnimatePresence mode="wait">
              {!successData ? (
                // FORM SCREEN
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="border-b border-white/5 pb-4 mb-4">
                    <h3 className="font-serif text-lg sm:text-xl font-light tracking-widest text-white uppercase mb-2">
                      Appointment Details
                    </h3>
                    <p className="text-xs text-light-gray font-sans uppercase tracking-wide">
                      Select your preferred timing and location
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-accent/10 border border-red-accent/30 text-xs text-red-accent font-sans">
                      {error}
                    </div>
                  )}

                  {/* Client Name Input */}
                  <div className="relative">
                    <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2 block">Client Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-gray/60" />
                      <input
                        type="text"
                        required
                        placeholder="e.g., His Highness Ranveer Malhotra"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-black border border-white/5 focus:border-gold-accent/50 text-white text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Symmetrical Phone and Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2 block">Mobile Phone *</label>
                      <div className="relative">
                        <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-gray/60" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g., +91 99999 99999"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-black border border-white/5 focus:border-gold-accent/50 text-white text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2 block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-gray/60" />
                        <input
                          type="email"
                          placeholder="e.g., ranveer@royalmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-black border border-white/5 focus:border-gold-accent/50 text-white text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trial Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2 block">Preferred Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-gray/60" />
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-black border border-white/5 focus:border-gold-accent/50 text-white text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2 block">Preferred Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-gray/60" />
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-black border border-white/5 focus:border-gold-accent/50 text-white text-sm focus:outline-none transition-colors"
                        >
                          <option value="11:00">11:00 AM (Morning Session)</option>
                          <option value="12:30">12:30 PM (Midday Fitting)</option>
                          <option value="14:00">02:00 PM (Afternoon Fitting)</option>
                          <option value="15:30">03:30 PM (High Tea Fitting)</option>
                          <option value="17:00">05:00 PM (Late-Afternoon Session)</option>
                          <option value="18:30">06:30 PM (Evening Exclusive)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Service selection */}
                  <div>
                    <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2 block">Service Required</label>
                    <select
                      value={formData.preferredService}
                      onChange={(e) => setFormData({ ...formData, preferredService: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-white/5 focus:border-gold-accent/50 text-white text-sm focus:outline-none transition-colors"
                    >
                      {initialProductName && (
                        <option value={`Fitting for: ${initialProductName}`}>Fitting: {initialProductName}</option>
                      )}
                      {servicesList.map((svc) => (
                        <option key={svc} value={svc}>{svc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Showroom location selection */}
                  <div>
                    <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2 block">Fitting Location</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, fittingLocation: "flagship-chennai" })}
                        className={`p-3 border text-xs tracking-wider uppercase font-semibold text-center transition-all ${
                          formData.fittingLocation === "flagship-chennai"
                            ? "bg-gold-accent/10 border-gold-accent text-gold-accent"
                            : "bg-black border-white/5 text-light-gray hover:border-white/10"
                        }`}
                      >
                        Chennai Flagship
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, fittingLocation: "home-trial" })}
                        className={`p-3 border text-xs tracking-wider uppercase font-semibold text-center transition-all ${
                          formData.fittingLocation === "home-trial"
                            ? "bg-gold-accent/10 border-gold-accent text-gold-accent"
                            : "bg-black border-white/5 text-light-gray hover:border-white/10"
                        }`}
                      >
                        Home Trial (TN)
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-red-accent hover:bg-gold-accent hover:text-black text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-red-accent/10"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                        <span>Reserving Royal Suite...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Reserve Private Suite</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-light-gray/50 font-sans text-center">
                    * No payment details or booking fees required. Alteration fitting trials are fully complementary.
                  </p>
                </motion.form>
              ) : (
                // SUCCESS TICKET SCREEN
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 animate-bounce" />
                  </div>

                  <h3 className="font-serif text-2xl font-light tracking-widest text-white uppercase">
                    Suite Reserved
                  </h3>
                  <p className="text-xs text-light-gray font-sans uppercase tracking-widest mb-6">
                    Welcome to the Avenue Luxury Collections
                  </p>

                  {/* Luxury Glassmorphic Admission Ticket */}
                  <div className="p-6 bg-black border border-gold-accent/30 text-left space-y-4 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 bg-gold-accent/10 text-gold-accent">
                      <Ticket className="w-5 h-5" />
                    </div>

                    <div className="border-b border-white/5 pb-3">
                      <span className="text-[9px] font-mono tracking-widest text-light-gray/60 block">RESERVATION ID</span>
                      <strong className="text-lg font-mono text-gold-accent tracking-wider">
                        {successData.bookingId}
                      </strong>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <span className="text-[9px] text-light-gray/60 uppercase block">PATRON</span>
                        <strong className="text-white uppercase tracking-wider">{successData.clientName}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-light-gray/60 uppercase block">LOCATION</span>
                        <strong className="text-white uppercase tracking-wider">
                          {formData.fittingLocation === "flagship-chennai" ? "Chennai Flagship" : "Home Trial"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-light-gray/60 uppercase block">DATE & TIME</span>
                        <strong className="text-white uppercase tracking-wider">
                          {successData.appointmentDate} @ {successData.appointmentTime}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-light-gray/60 uppercase block">SERVICE</span>
                        <strong className="text-white uppercase tracking-wider truncate block" title={successData.preferredService}>
                          {successData.preferredService}
                        </strong>
                      </div>
                    </div>

                    {/* Security message */}
                    <div className="pt-3 border-t border-white/5 text-[10px] text-light-gray leading-relaxed flex items-start space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold-accent shrink-0 mt-0.5 animate-pulse" />
                      <span>An expert master draper and sizing concierge has been booked. A confirmation SMS has been dispatched.</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setSuccessData(null)}
                      className="flex-grow py-3 border border-white/10 text-light-gray hover:text-white hover:border-white/30 text-[10px] font-semibold tracking-widest uppercase transition-all cursor-pointer"
                    >
                      Book Another Fitting
                    </button>
                    {isModalVariant && onCloseModal && (
                      <button
                        onClick={onCloseModal}
                        className="px-6 py-3 bg-red-accent hover:bg-gold-accent text-white hover:text-black text-[10px] font-semibold tracking-widest uppercase transition-all cursor-pointer"
                      >
                        Close Portal
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Contact info & Vector Custom styled Map */}
          {!isModalVariant && (
            <div className="space-y-8 text-left">
              
              {/* Showroom Contact Detail Card */}
              <div className="p-8 bg-dark-card border border-white/5 space-y-6">
                <h3 className="font-serif text-md sm:text-lg font-light text-white tracking-widest uppercase border-b border-white/5 pb-3">
                  Flagship Contact Concierge
                </h3>

                <div className="space-y-4 text-xs sm:text-sm font-sans">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gold-accent tracking-wide block uppercase text-xs mb-1 font-serif">Chennai Flagship Showroom</strong>
                      <span className="text-light-gray text-xs sm:text-sm">
                        No 3.1st Anjugam Nagar, Kolathur, Chennai 600099, Tamilnadu, India
                      </span>
                    </div>
                  </div>

                  {/* Hotlines */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-3 text-xs sm:text-sm">
                      <Phone className="w-4 h-4 text-gold-accent shrink-0" />
                      <a href="tel:+919790778384" className="text-light-gray hover:text-white transition-colors">
                        +91 97907 78384
                      </a>
                    </div>
                    <div className="flex items-center space-x-3 text-xs sm:text-sm">
                      <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <a href="https://wa.me/919790778384" target="_blank" referrerPolicy="no-referrer" className="text-light-gray hover:text-white transition-colors">
                        WhatsApp Live Styling
                      </a>
                    </div>
                  </div>

                  {/* Timing hours */}
                  <div className="flex items-start space-x-4 pt-4 border-t border-white/5 text-xs sm:text-sm">
                    <Clock className="w-5 h-5 text-light-gray/60 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white tracking-wide block uppercase text-xs mb-1 font-serif">Ateliers Opening Hours</strong>
                      <div className="grid grid-cols-2 gap-x-6 text-xs text-light-gray pt-0.5">
                        <span>Monday — Saturday:</span>
                        <span className="text-white font-semibold text-right font-sans">10:30 AM — 08:30 PM</span>
                        <span>Sunday Exclusive:</span>
                        <span className="text-gold-accent font-semibold text-right font-sans">By Appointment Only</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Styled Vector Google Maps Frame (No iframe layout - pure custom UI maps locator) */}
              <div className="relative h-[280px] bg-dark-card border border-white/5 overflow-hidden flex items-center justify-center p-6 shadow-xl group">
                {/* Simulated luxury dark map lines using custom vectors */}
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                
                {/* Radial rings representing locator signals */}
                <div className="absolute w-52 h-52 rounded-full border border-gold-accent/20 animate-ping pointer-events-none" />
                <div className="absolute w-36 h-36 rounded-full border border-red-accent/30 pointer-events-none" />
                <div className="absolute w-16 h-16 rounded-full bg-gold-accent/5 border border-gold-accent/40 pointer-events-none" />

                {/* Central Locator Icon */}
                <div className="relative z-10 text-center space-y-3 select-none">
                  <div className="w-12 h-12 rounded-full bg-black border border-gold-accent/50 flex items-center justify-center mx-auto shadow-2xl animate-float">
                    <MapPin className="w-6 h-6 text-gold-accent fill-gold-accent/10" />
                  </div>
                  <div className="bg-black border border-white/10 px-4 py-2 backdrop-blur-md max-w-[240px]">
                    <p className="text-[10px] text-gold-accent font-serif tracking-widest font-bold uppercase mb-0.5">THE AVENUE SUITE</p>
                    <p className="text-[9px] text-light-gray font-mono tracking-wide leading-none">Kolathur, Chennai, Tamilnadu</p>
                    <p className="text-[9px] text-light-gray/50 font-mono mt-1">13.1192° N, 80.2079° E</p>
                  </div>
                </div>

                {/* Bottom luxury link */}
                <a
                  href="https://maps.app.goo.gl/7vEVtwaRkw7WcckFA"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="absolute bottom-4 right-4 z-10 px-3 py-1.5 bg-black hover:bg-white hover:text-black border border-white/10 text-[9px] text-light-gray font-semibold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Launch Live Navigation
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
