import { motion } from "motion/react";
import { REVIEWS } from "../data";
import { Star, Quote, ShieldCheck } from "lucide-react";

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-dark-base border-t border-white/5 relative overflow-hidden select-none">
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-gold-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] text-gold-accent uppercase font-serif font-semibold block mb-2">Groom & Guest Stories</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-widest text-white uppercase">
            Sovereign <span className="text-red-accent italic">Testimonies</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold-accent/30 mx-auto mt-4" />
          <p className="max-w-2xl mx-auto text-light-gray font-light text-sm mt-4">
            Hear from our prestigious patrons who made grand, unforgettable statements in our bespoke tailored rentals.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, scale: 0.95, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group relative p-8 bg-dark-card border border-white/5 hover:border-gold-accent/20 transition-all duration-500 flex flex-col justify-between text-left"
            >
              {/* Top Quote Design */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-8 h-8 text-gold-accent/20 group-hover:text-gold-accent/40 transition-colors" />
                <div className="flex items-center space-x-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-gold-accent fill-gold-accent" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-light-gray font-sans text-xs sm:text-sm font-light leading-relaxed italic mb-8 flex-grow">
                "{rev.text}"
              </p>

              {/* Patron Info Card bottom */}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 border border-white/10 object-cover"
                />
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-light text-white tracking-widest uppercase flex items-center gap-1">
                    <span>{rev.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/10 shrink-0" title="Verified Rental Patron" />
                  </h4>
                  <p className="text-[10px] text-gold-accent/80 tracking-wide font-sans">{rev.role}</p>
                  <span className="text-[9px] text-light-gray/40 font-mono mt-0.5 block">{rev.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
