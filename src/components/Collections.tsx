import { motion } from "motion/react";
import { COLLECTIONS } from "../data";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface CollectionsProps {
  onSelectCollection: (collectionId: string) => void;
  selectedCollection: string;
}

export default function Collections({ onSelectCollection, selectedCollection }: CollectionsProps) {
  return (
    <section id="collections" className="py-24 bg-dark-base relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-gold-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-red-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-dark-card border border-gold-accent/15 mb-4">
            <Sparkles className="w-3 h-3 text-gold-accent" />
            <span className="text-[10px] tracking-widest text-gold-accent font-serif font-medium uppercase">Exquisite Curations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-widest text-white uppercase">
            Featured <span className="text-gold-accent italic">Collections</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold-accent/30 mx-auto mt-4" />
          <p className="max-w-2xl mx-auto text-light-gray font-light text-sm mt-4">
            Explore signature lines hand-tailored for royal grooms, prestigious black-tie galas, and high-fashion wedding festivities.
          </p>
        </div>

        {/* Collections Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((col, index) => {
            const isActive = selectedCollection === col.id;
            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                onClick={() => onSelectCollection(col.id)}
                className={`relative group h-[420px] overflow-hidden cursor-pointer border transition-all duration-500 ${
                  isActive
                    ? "border-gold-accent shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                    : "border-white/5 hover:border-gold-accent/50"
                }`}
              >
                {/* Parallax Cover Image on Hover */}
                <div className="absolute inset-0">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out scale-100 group-hover:scale-110"
                    style={{ backgroundImage: `url(${col.coverImage})` }}
                  />
                  {/* Subtle Dark Layer Overlap */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Card Content (Float bottom) */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-left z-10 select-none">
                  {/* Small gold category line */}
                  <span className="text-[10px] tracking-[0.25em] font-serif text-gold-accent uppercase font-semibold mb-2 block">
                    {col.tagline}
                  </span>

                  {/* Collection Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-white tracking-widest uppercase mb-2 group-hover:text-gold-accent transition-colors duration-300">
                    {col.name}
                  </h3>

                  {/* Brief Description */}
                  <p className="text-light-gray font-sans text-xs font-light leading-relaxed max-h-0 group-hover:max-h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 mb-4">
                    {col.description}
                  </p>

                  {/* Bottom Panel Info */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-2">
                    <span className="text-[10px] tracking-widest text-light-gray font-sans uppercase">
                      {isActive ? "Viewing Collection" : "Explore Garments"}
                    </span>
                    <div className="w-8 h-8 bg-dark-card border border-white/10 flex items-center justify-center group-hover:bg-gold-accent group-hover:border-gold-accent text-light-gray group-hover:text-black transition-all duration-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Golden corner borders that glow on hover */}
                <div className="absolute top-0 left-0 w-4 h-[1px] bg-gold-accent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute top-0 left-0 w-[1px] h-4 bg-gold-accent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-gold-accent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-gold-accent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* Clear Filter button if a collection is selected */}
        {selectedCollection !== "all" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => onSelectCollection("all")}
              className="px-6 py-2.5 bg-white/5 border border-white/10 text-xs tracking-widest text-light-gray hover:text-gold-accent hover:border-gold-accent transition-all uppercase font-medium cursor-pointer"
            >
              Show All Collections
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
