import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, ChevronRight, ShieldCheck, Shirt, Ruler, Sparkle, Calendar, Crown, Award, ListChecks } from "lucide-react";
import { StylistRecommendation } from "../types";

interface VirtualStylistProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedOutfit: (outfitName: string) => void;
}

export default function VirtualStylist({ isOpen, onClose, onSelectRecommendedOutfit }: VirtualStylistProps) {
  const [formData, setFormData] = useState({
    eventType: "Wedding Ceremony",
    stylePreference: "Royal & Traditional Heritage",
    bodyType: "Average / Balanced Silhouette",
    tone: "Royal Ivory, Gold & Beige",
    customDetail: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [recommendation, setRecommendation] = useState<StylistRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const eventTypes = [
    "Wedding Ceremony",
    "Reception Gala",
    "Sangeet & Mehendi Celebration",
    "Cocktail & Engagement Party",
    "High-End Fashion Dinner"
  ];

  const stylePreferences = [
    "Royal & Traditional Heritage",
    "Midnight Tuxedo / Black Tie",
    "Contemporary Indo-Western",
    "Structured Jodhpuri Bandhgala",
    "Classic Italian 3-Piece"
  ];

  const bodyTypes = [
    "Average / Balanced Silhouette",
    "Athletic & Structured",
    "Tall & Slender",
    "Broad & Muscular"
  ];

  const colorTones = [
    "Royal Ivory, Gold & Beige",
    "Midnight Black & Obsidian",
    "Deep Emerald & Forest Accents",
    "Sovereign Navy & Sapphire Blue",
    "Crimson Red, Maroon & Gold",
    "Rosegold & Premium Champagne"
  ];

  // Progressive elegant loader messages
  const loaderMessages = [
    "Connecting to the Server-Side Couture Engine...",
    "Consulting with Head Draper and Bespoke Tailors...",
    "Weaving structural patterns for your silhouette...",
    "Selecting hand-crafted velvet, silk, and gold threads...",
    "Curating custom pocket squares and royal brooches...",
    "Formulating styling tips for maximum elegance..."
  ];

  const triggerLoaderProgress = () => {
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loaderMessages.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
    return interval;
  };

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendation(null);
    const loaderInterval = triggerLoaderProgress();

    try {
      // Call live server-side Gemini endpoint in parallel with a short aesthetic loader delay
      const [response] = await Promise.all([
        fetch("/api/stylist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);

      if (!response.ok) {
        throw new Error("Atelier server returned an error.");
      }

      const generatedRecommendation: StylistRecommendation = await response.json();
      setRecommendation(generatedRecommendation);
    } catch (err: any) {
      setError("Failed to generate styling advice. Please try again.");
    } finally {
      clearInterval(loaderInterval);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Consultation Drawer (Slide-in) */}
          <motion.div
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="relative w-full max-w-2xl h-full bg-dark-base border-l border-white/5 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-dark-card">
              <div className="flex items-center space-x-3 text-left">
                <div className="p-2.5 bg-gold-accent/10 text-gold-accent border border-gold-accent/20">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif text-md sm:text-lg font-light tracking-widest text-white uppercase">
                    Virtual Styling Suite
                  </h3>
                  <p className="text-[10px] text-light-gray font-sans tracking-wider uppercase">
                    AI Personal Couturier • Bespoke Wardrobe
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black text-light-gray hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body area */}
            <div className="flex-grow p-6 sm:p-8 overflow-y-auto">
              <AnimatePresence mode="wait">
                
                {/* 1. LOADING SCREEN STATE */}
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[500px] flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-20 h-20 border border-gold-accent/20 border-t-gold-accent border-r-red-accent animate-spin" />
                      <Sparkles className="absolute w-6 h-6 text-gold-accent animate-pulse" />
                    </div>

                    <div className="space-y-2">
                      <p className="font-serif text-sm tracking-widest text-gold-accent font-semibold uppercase animate-pulse">
                        Analyzing Tailoring Profile
                      </p>
                      <p className="text-xs text-light-gray font-sans max-w-sm mx-auto h-8 transition-all duration-300">
                        {loaderMessages[loadingStep]}
                      </p>
                    </div>

                    <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-gold-accent/40 to-transparent" />
                    <p className="text-[10px] text-light-gray/60 tracking-wider uppercase font-serif">The Avenue Flagship Atelier</p>
                  </motion.div>
                )}

                {/* 2. SPECIFICATION FORM STATE */}
                {!loading && !recommendation && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    onSubmit={handleConsultation}
                    className="space-y-6 text-left"
                  >
                    <div className="p-4 bg-gold-accent/5 border border-gold-accent/10 text-xs text-gold-accent leading-relaxed flex items-start space-x-3 mb-2">
                      <Crown className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                      <span>Specify your bridal silhouette, event type, and design preferences. Our server-side neural stylists will immediately model the absolute perfect ceremonial look.</span>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-accent/10 border border-red-accent/30 text-xs text-red-accent font-sans">
                        {error}
                      </div>
                    )}

                    {/* Event Selection */}
                    <div>
                      <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2.5 block">Select Special Wedding Event</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {eventTypes.map((evt) => (
                          <button
                            key={evt}
                            type="button"
                            onClick={() => setFormData({ ...formData, eventType: evt })}
                            className={`p-3 border text-xs text-left transition-all ${
                              formData.eventType === evt
                                ? "bg-red-accent/10 border-red-accent text-red-accent font-bold"
                                : "bg-black border-white/5 text-light-gray hover:border-white/15"
                            }`}
                          >
                            {evt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Style Selection */}
                    <div>
                      <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2.5 block">Attire Styling Vibe</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {stylePreferences.map((style) => (
                          <button
                            key={style}
                            type="button"
                            onClick={() => setFormData({ ...formData, stylePreference: style })}
                            className={`p-3 border text-xs text-left transition-all ${
                              formData.stylePreference === style
                                ? "bg-gold-accent/10 border-gold-accent text-gold-accent font-bold"
                                : "bg-black border-white/5 text-light-gray hover:border-white/15"
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Symmetrical Color selections */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2.5 block">Body Structure Silhouette</label>
                        <select
                          value={formData.bodyType}
                          onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                          className="w-full px-4 py-3 bg-black border border-white/5 text-light-gray text-xs focus:outline-none focus:border-gold-accent/40"
                        >
                          {bodyTypes.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2.5 block">Preferred Color Palette</label>
                        <select
                          value={formData.tone}
                          onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                          className="w-full px-4 py-3 bg-black border border-white/5 text-light-gray text-xs focus:outline-none focus:border-gold-accent/40"
                        >
                          {colorTones.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Custom Notes */}
                    <div>
                      <label className="text-[10px] text-light-gray tracking-widest uppercase font-semibold mb-2 block">Special Alterations & Accent Notes (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="e.g., 'I am the groom. I prefer double-breasted coats with metallic buttons, or matching ivory turbans if sherwani is chosen.'"
                        value={formData.customDetail}
                        onChange={(e) => setFormData({ ...formData, customDetail: e.target.value })}
                        className="w-full px-4 py-3 bg-black border border-white/5 focus:border-gold-accent/40 text-white text-xs focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-red-accent border border-red-700 hover:bg-gold-accent hover:text-black font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-gold-accent/5"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Formulate Sartorial Prescription</span>
                    </button>
                  </motion.form>
                )}

                {/* 3. COUTURE PRESCRIPTION / RECOMMENDATION state */}
                {!loading && recommendation && (
                  <motion.div
                    key="recommendation"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-left"
                  >
                    {/* Trust header badge */}
                    <div className="flex items-center justify-between p-4 bg-dark-card border border-gold-accent/20">
                      <div className="flex items-center space-x-2.5 text-xs">
                        <Award className="w-5 h-5 text-gold-accent shrink-0" />
                        <div>
                          <strong className="text-white block uppercase text-[10px] tracking-widest font-serif">Atelier Prescription</strong>
                          <span className="text-[11px] text-light-gray font-sans">Curated especially for your silhouette</span>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-red-accent text-white text-[9px] font-mono tracking-widest uppercase font-bold">
                        {recommendation.matchConfidence}
                      </div>
                    </div>

                    {/* Recommendation Title block */}
                    <div>
                      <span className="text-[10px] font-serif tracking-[0.2em] text-gold-accent font-bold uppercase block mb-1">Recommended Ensemble Look</span>
                      <h4 className="font-serif text-2xl font-light text-white tracking-wider uppercase leading-tight">
                        {recommendation.recommendationTitle}
                      </h4>
                      <p className="text-xs text-light-gray font-sans font-semibold mt-1.5 uppercase tracking-wider block">
                        Category: {recommendation.outfitType}
                      </p>
                      <div className="w-16 h-[1px] bg-gold-accent mt-3" />
                    </div>

                    {/* Master Narrative */}
                    <p className="text-light-gray font-sans text-xs sm:text-sm font-light leading-relaxed italic border-l-2 border-gold-accent/30 pl-4 py-1">
                      "{recommendation.description}"
                    </p>

                    {/* Outfit breakdown cards grid */}
                    <div className="p-6 bg-dark-card border border-white/5 space-y-4">
                      <h5 className="font-serif text-xs font-light text-white tracking-widest uppercase border-b border-white/5 pb-2.5 flex items-center gap-2">
                        <Shirt className="w-4 h-4 text-gold-accent" />
                        <span>Prescribed Dress Code Details</span>
                      </h5>

                      <div className="space-y-3.5 text-xs sm:text-sm">
                        {recommendation.recommendedLook.jacket && (
                          <div>
                            <strong className="text-white text-xs uppercase tracking-wider block">COAT / OUTER COUTURES:</strong>
                            <span className="text-light-gray text-xs sm:text-sm font-light leading-relaxed block">{recommendation.recommendedLook.jacket}</span>
                          </div>
                        )}
                        {recommendation.recommendedLook.shirt && (
                          <div className="pt-2 border-t border-white/5">
                            <strong className="text-white text-xs uppercase tracking-wider block">SHIRT / WAISTCOAT:</strong>
                            <span className="text-light-gray text-xs sm:text-sm font-light leading-relaxed block">{recommendation.recommendedLook.shirt}</span>
                          </div>
                        )}
                        {recommendation.recommendedLook.trouser && (
                          <div className="pt-2 border-t border-white/5">
                            <strong className="text-white text-xs uppercase tracking-wider block">LOWER GARMENT / TROUSERS:</strong>
                            <span className="text-light-gray text-xs sm:text-sm font-light leading-relaxed block">{recommendation.recommendedLook.trouser}</span>
                          </div>
                        )}
                        {recommendation.recommendedLook.footwear && (
                          <div className="pt-2 border-t border-white/5">
                            <strong className="text-white text-xs uppercase tracking-wider block">PRESCRIBED FOOTWEAR:</strong>
                            <span className="text-light-gray text-xs sm:text-sm font-light leading-relaxed block">{recommendation.recommendedLook.footwear}</span>
                          </div>
                        )}
                        {recommendation.recommendedLook.accessories && recommendation.recommendedLook.accessories.length > 0 && (
                          <div className="pt-2 border-t border-white/5">
                            <strong className="text-white text-xs uppercase tracking-wider block">RECOMMENDED ACCESSORIES:</strong>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {recommendation.recommendedLook.accessories.map((acc, idx) => (
                                <span key={idx} className="text-[10px] font-mono px-2.5 py-1 bg-black border border-gold-accent/10 text-gold-accent">
                                  {acc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Color palette reasons */}
                    <div className="p-5 bg-dark-card border border-white/5">
                      <h5 className="font-serif text-xs font-light text-white tracking-widest uppercase mb-2">Color Palette Guidance</h5>
                      <p className="text-light-gray font-sans text-xs leading-relaxed font-light">{recommendation.colorPaletteExplanation}</p>
                    </div>

                    {/* Tailor Etiquette Tips */}
                    {recommendation.stylingTips && recommendation.stylingTips.length > 0 && (
                      <div className="p-5 bg-gold-accent/5 border border-gold-accent/10">
                        <h5 className="font-serif text-xs font-light text-gold-accent tracking-widest uppercase mb-3 flex items-center gap-1.5">
                          <ListChecks className="w-4 h-4 text-gold-accent" />
                          <span>Atelier Etiquette & Styling Tips</span>
                        </h5>
                        <ul className="space-y-2 text-xs font-sans text-light-gray font-light">
                          {recommendation.stylingTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-gold-accent text-xs shrink-0 mt-0.5">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Panel inside recommendation */}
                    <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => {
                          onSelectRecommendedOutfit(recommendation.recommendationTitle);
                        }}
                        className="flex-grow py-4 bg-red-accent hover:bg-gold-accent hover:text-black text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-red-accent/15"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Reserve Fit Trial For This Look</span>
                      </button>

                      <button
                        onClick={() => setRecommendation(null)}
                        className="py-4 px-6 bg-black border border-white/10 hover:border-gold-accent hover:text-gold-accent text-[10px] text-light-gray font-semibold tracking-widest uppercase transition-colors cursor-pointer"
                      >
                        Re-Consult Stylist
                      </button>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Sticky bottom disclaimer */}
            <div className="p-4 border-t border-white/5 bg-dark-base text-[9px] text-light-gray/60 font-sans text-center">
              Our AI Tailoring agent incorporates royal couturier guides. Visit our Kolathur, Chennai flagship showroom to review real fabrics.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
