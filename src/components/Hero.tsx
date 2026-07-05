import { motion } from "motion/react";
import { Sparkles, Calendar, ArrowRight, MessageCircle, Phone } from "lucide-react";

interface HeroProps {
  onOpenStylist: () => void;
  onOpenBooking: () => void;
  scrollToSection: (id: string) => void;
}

export default function Hero({ onOpenStylist, onOpenBooking, scrollToSection }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black select-none">
      {/* Background Cinematic Image with Ken Burns Zoom Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1.05, 1.12, 1.05] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40 brightness-50"
        />
        {/* Dynamic Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
      </div>

      {/* Floating Gold/Red Atmospheric Particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-tr from-amber-500/30 to-red-600/30 blur-sm"
            style={{
              width: Math.random() * 8 + 4 + "px",
              height: Math.random() * 8 + 4 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-32 sm:pb-36">
        
        {/* Luxury Banner Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-amber-500/20 backdrop-blur-md mb-6 shadow-2xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[10px] sm:text-xs tracking-[0.2em] text-amber-400 font-display font-semibold uppercase">
            Bespoke Rental Experience
          </span>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wider leading-[1.1] text-white mb-5 uppercase"
        >
          Luxury Wedding Suits <br className="hidden sm:inline" />
          <span className="italic text-gold-accent font-normal text-3xl sm:text-5xl md:text-6xl lowercase">crafted for your day</span>
        </motion.h1>

        {/* Elegant Sub-Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-2xl mx-auto font-sans text-sm sm:text-lg text-light-gray tracking-wide font-light leading-relaxed mb-8"
        >
          Premium wedding blazers, suits, sherwanis, and courtly designer ensembles available for exclusive rental dry-cleaned and customized to your drape.
        </motion.p>

        {/* Interactive Call to Action Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {/* Main Action: Explore */}
          <button
            onClick={() => scrollToSection("collections")}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-red-accent border border-red-accent hover:bg-transparent hover:border-gold-accent hover:text-gold-accent text-white font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(193,18,31,0.25)] group cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary Action: AI Stylist */}
          <button
            onClick={onOpenStylist}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-white/10 hover:text-gold-accent hover:border-gold-accent group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-gold-accent animate-pulse" />
            <span>AI Stylist</span>
          </button>

          {/* Tertiary Action: WhatsApp Quick Inquiry */}
          <a
            href="https://wa.me/919790778384?text=Hello%20The%20Avenue%20Luxury%20Collections%2C%20I%20am%20interested%20in%20booking%20a%20private%20fitting%20trial."
            target="_blank"
            referrerPolicy="no-referrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-emerald-600/5 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600/20 hover:border-emerald-400 hover:text-white font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Book via WhatsApp</span>
          </a>
        </motion.div>

        {/* Complimentary Benefits Badge Row - Positioned here to prevent absolute layout overlaps completely! */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-left"
        >
          <div className="flex items-center space-x-3 p-3 px-5 rounded-xl bg-neutral-900/60 border border-white/5 backdrop-blur-md w-full sm:w-auto">
            <div className="p-2 rounded-lg bg-red-600/10 text-red-500">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 tracking-wider uppercase">Premium Dry Cleaning</p>
              <p className="text-[11px] font-bold text-gold-accent tracking-widest uppercase">INCLUDED FREE</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 px-5 rounded-xl bg-neutral-900/60 border border-white/5 backdrop-blur-md w-full sm:w-auto">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 tracking-wider uppercase">Flagship Fit Suites</p>
              <p className="text-[11px] font-bold text-gold-accent tracking-widest uppercase">FREE TRIALS • CHENNAI</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cinematic Ambient Glow Overlay */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-12 left-12 w-64 h-64 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Scroll Indicator bouncing line */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center pointer-events-none">
        <span className="text-[9px] tracking-[0.3em] text-neutral-500 uppercase font-display mb-1.5 font-bold">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500/80 via-red-600/50 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/3 bg-white"
          />
        </div>
      </div>
    </section>
  );
}
