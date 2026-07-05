import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Crown, Search, Calendar, Clock, MapPin, Sparkles, CheckCircle, Shield, ArrowRight } from "lucide-react";

interface ConciergePortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConciergePortal({ isOpen, onClose }: ConciergePortalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [myRecentBookingId, setMyRecentBookingId] = useState<string | null>(null);

  // Load from database (and check localStorage for client's own booking ID)
  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch from local storage instead of API
      const localDB = localStorage.getItem("the_avenue_fittings_db");
      let storedBookings = [];
      if (localDB) {
        storedBookings = JSON.parse(localDB);
      } else {
        // Seed initial mock bookings if empty
        storedBookings = [
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
        localStorage.setItem("the_avenue_fittings_db", JSON.stringify(storedBookings));
      }
      setBookings(storedBookings);
    } catch (err: any) {
      setError("Failed to load active fittings from offline storage.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
      const stored = localStorage.getItem("latest_avenue_booking_id");
      if (stored) {
        setMyRecentBookingId(stored);
      }
    }
  }, [isOpen]);

  // Filter bookings based on query
  const filteredBookings = bookings.filter((booking) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      booking.bookingId?.toLowerCase().includes(query) ||
      booking.name?.toLowerCase().includes(query) ||
      booking.preferredService?.toLowerCase().includes(query)
    );
  });

  // Helper for mock timeline progress
  const getTimelineSteps = (booking: any) => {
    // Determine step based on bookingId hash
    const idStr = booking.bookingId || "AVE-123";
    let hash = 0;
    for (let i = 0; i < idStr.length; i++) {
      hash += idStr.charCodeAt(i);
    }
    const step = (hash % 3) + 1; // 1, 2, or 3
    
    return [
      { name: "Reservation Saved", description: "Bespoke trial logged in Firestore database", done: true },
      { name: "Couture Suite Ready", description: "Fittings isolated & dry-cleaned", done: step >= 2 },
      { name: "Fitting Session", description: "Personal tailors assigned & scheduled", done: step >= 3 },
    ];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50"
          />

          {/* Right Sliding Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-dark-card border-l border-white/5 shadow-2xl z-50 flex flex-col text-left select-none overflow-hidden"
          >
            {/* Header Area */}
            <div className="p-6 border-b border-white/5 relative bg-black/40">
              {/* Gold light streak */}
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-gold-accent/40 to-transparent" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-gold-accent animate-pulse" />
                  <span className="font-sans text-xs tracking-[0.25em] text-gold-accent font-bold uppercase">Concierge Desk</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/5 rounded text-light-gray hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="font-sans text-xl font-black text-white uppercase mt-4 tracking-wider leading-none">
                Fitting Room Portal
              </h2>
              <p className="text-xs text-light-gray/70 font-sans mt-2">
                Real-time tracking for active bespoke styling appointments & premium wedding apparel rentals.
              </p>
            </div>

            {/* Portal Content Workspace */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Live Status Tracker Search bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-light-gray/50" />
                <input
                  type="text"
                  placeholder="Lookup by Suite # or Client Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/60 border border-white/5 rounded-none pl-10 pr-4 py-3 text-xs text-white placeholder-light-gray/40 focus:outline-none focus:border-gold-accent/40 transition-colors"
                />
              </div>

              {/* Loader */}
              {loading && (
                <div className="py-20 text-center space-y-3">
                  <div className="w-6 h-6 border-2 border-gold-accent border-t-transparent rounded-full animate-spin mx-auto" />
                  <span className="text-xs font-mono text-light-gray/50 tracking-wider uppercase">Querying Repository...</span>
                </div>
              )}

              {/* Error state */}
              {error && !loading && (
                <div className="p-4 bg-red-accent/10 border border-red-accent/20 text-xs text-red-accent text-center font-sans">
                  {error}
                </div>
              )}

              {/* Empty / Zero orders instructions */}
              {!loading && filteredBookings.length === 0 && (
                <div className="p-8 border border-white/5 bg-black/20 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                    <Calendar className="w-5 h-5 text-light-gray/40" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">No Active Sessions</h4>
                    <p className="text-xs text-light-gray/60 leading-relaxed font-sans">
                      You do not have any saved fitting suites reserved under this search criteria.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      onClose();
                      const element = document.getElementById("contact");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-red-accent hover:bg-red-accent/80 text-white text-[10px] tracking-widest font-bold uppercase transition-all"
                  >
                    <span>Book Suite</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Active Bookings Grid List */}
              {!loading && filteredBookings.length > 0 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-[10px] tracking-wider text-light-gray/50 uppercase font-bold">
                    <span>Active Showroom Suites ({filteredBookings.length})</span>
                    <span className="text-gold-accent font-mono">● Real-Time</span>
                  </div>

                  <div className="space-y-4">
                    {filteredBookings.map((booking: any, index: number) => {
                      const isMyOwn = booking.bookingId === myRecentBookingId;
                      const steps = getTimelineSteps(booking);
                      
                      return (
                        <motion.div
                          key={booking.bookingId || index}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className={`p-5 border relative overflow-hidden transition-colors ${
                            isMyOwn 
                              ? "bg-red-accent/5 border-red-accent/30 shadow-lg shadow-red-accent/5" 
                              : "bg-black/30 border-white/5 hover:border-white/10"
                          }`}
                        >
                          {/* Top Tagline */}
                          {isMyOwn && (
                            <div className="absolute top-0 right-0 bg-red-accent text-[8px] font-bold uppercase text-white px-2.5 py-0.5 tracking-wider">
                              Your Suite
                            </div>
                          )}

                          {/* Order Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <span className="text-xs font-mono font-bold tracking-widest text-gold-accent uppercase">
                                {booking.bookingId || `AVE-00102`}
                              </span>
                              <h3 className="font-sans text-sm font-extrabold text-white uppercase mt-1">
                                {booking.name}
                              </h3>
                            </div>
                            <span className="text-[9px] font-mono bg-white/5 px-2 py-1 text-light-gray tracking-wider uppercase rounded-sm">
                              {booking.fittingLocation === "flagship-chennai" ? "Chennai Elite" : "Luxury Atelier"}
                            </span>
                          </div>

                          {/* Service Title */}
                          <div className="text-xs text-light-gray/90 border-t border-b border-white/5 py-2.5 my-3 flex items-center space-x-2">
                            <Sparkles className="w-3.5 h-3.5 text-red-accent shrink-0" />
                            <span className="font-sans font-medium line-clamp-1">{booking.preferredService}</span>
                          </div>

                          {/* Service Details Row */}
                          <div className="grid grid-cols-2 gap-3 text-xs font-sans text-light-gray/70 mb-4">
                            <div className="flex items-center space-x-1.5">
                              <Calendar className="w-3.5 h-3.5 text-light-gray/40" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <Clock className="w-3.5 h-3.5 text-light-gray/40" />
                              <span>{booking.time}</span>
                            </div>
                          </div>

                          {/* Interactive Progress Tracker */}
                          <div className="pt-2 border-t border-white/5 space-y-3">
                            <span className="text-[9px] tracking-widest text-light-gray/50 uppercase font-bold block">
                              Fitting Suite Timeline:
                            </span>
                            
                            <div className="relative pl-4 space-y-3.5 before:absolute before:left-[4px] before:top-1.5 before:bottom-1.5 before:w-[1px] before:bg-white/10">
                              {steps.map((st, sidx) => (
                                <div key={sidx} className="relative flex items-start space-x-2 text-xs">
                                  {/* Dot */}
                                  <div className={`absolute -left-[16px] top-1 w-2.5 h-2.5 rounded-full border ${
                                    st.done 
                                      ? "bg-red-accent border-red-accent" 
                                      : "bg-neutral-950 border-white/20"
                                  }`} />
                                  
                                  <div className="ml-1 flex-1">
                                    <span className={`font-bold uppercase tracking-wider text-[10px] ${
                                      st.done ? "text-white" : "text-light-gray/40"
                                    }`}>
                                      {st.name}
                                    </span>
                                    <p className="text-[10px] text-light-gray/50 leading-relaxed mt-0.5">
                                      {st.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Portal Footer with Security Credential */}
            <div className="p-4 border-t border-white/5 bg-black/60 flex items-center justify-between text-[9px] text-light-gray/40 uppercase tracking-widest font-mono font-bold">
              <div className="flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 text-gold-accent" />
                <span>Double-Cloud Ledger</span>
              </div>
              <span className="text-red-accent">Verified Fit Suite</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
