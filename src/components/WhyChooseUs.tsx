import { motion } from "motion/react";
import { Crown, BadgePercent, Scissors, Sparkles, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: Crown,
      title: "Imperial Quality",
      description: "Our garments are sourced from leading luxury heritage weavers. We use authentic raw Banarasi silks, Super 140s Italian merino wools, and premium silk velvets with handcrafted detailing.",
      color: "from-amber-500/10 to-yellow-600/10",
      iconColor: "text-amber-400"
    },
    {
      icon: BadgePercent,
      title: "Affordable Splendor",
      description: "Enjoy high-couture wedding styles worth ₹75,000 starting at just ₹1,000 to ₹1,500 for a comprehensive 1-day rental. Look elite on your special day without exceeding your wardrobe budget.",
      color: "from-red-600/10 to-rose-700/10",
      iconColor: "text-red-500"
    },
    {
      icon: Scissors,
      title: "Temporary Bespoke Tailoring",
      description: "No standard sizes here. Our in-house master tailors conduct custom fitting trials and adjust hems, sleeves, and shoulder widths temporarily to guarantee an immaculate bespoke fit.",
      color: "from-amber-500/10 to-yellow-600/10",
      iconColor: "text-amber-400"
    },
    {
      icon: Sparkles,
      title: "Sovereign Collections",
      description: "Stay ahead of fashion curves. We update our inventory seasonally with award-winning grooms wear, celebrity-inspired drapes, classic tuxedos, and trend-setting fusion wear.",
      color: "from-red-600/10 to-rose-700/10",
      iconColor: "text-red-500"
    },
    {
      icon: ShieldCheck,
      title: "White-Glove VIP Service",
      description: "From a private in-suite styling assistant to specialized Italian dry-cleaning, we handle dry-pressing, alterations, and delivery to provide an effortless, premium experience.",
      color: "from-amber-500/10 to-yellow-600/10",
      iconColor: "text-amber-400"
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-dark-base border-t border-white/5 relative overflow-hidden select-none">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] text-gold-accent uppercase font-serif font-semibold block mb-2">Heritage & Standard</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-widest text-white uppercase">
            Why Choose <span className="text-red-accent italic">The Avenue</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold-accent/30 mx-auto mt-4" />
          <p className="max-w-2xl mx-auto text-light-gray font-light text-sm mt-4">
            Combining Savile Row tailoring standards with rich Indian craftsmanship to offer the country's premium fashion rental service.
          </p>
        </div>

        {/* Dynamic Features Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const IconComponent = item.icon;
            // Map colors to exact theme variables
            const isGoldIcon = item.iconColor === "text-amber-400";
            const mappedIconColor = isGoldIcon ? "text-gold-accent" : "text-red-accent";
            const mappedGradient = isGoldIcon ? "from-gold-accent/5 to-transparent" : "from-red-accent/5 to-transparent";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 bg-dark-card border border-white/5 hover:border-gold-accent/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.06)] transition-all duration-500 text-left overflow-hidden flex flex-col h-full"
              >
                {/* Floating glow accent inside card */}
                <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full bg-gradient-to-br ${mappedGradient} blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none`} />

                {/* Icon wrapper */}
                <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center mb-6 shadow-md shadow-black group-hover:border-gold-accent/40 transition-colors duration-500">
                  <IconComponent className={`w-6 h-6 ${mappedIconColor}`} />
                </div>

                {/* Highlight Content */}
                <h3 className="font-serif text-lg font-light text-white tracking-widest uppercase mb-3 group-hover:text-gold-accent transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-light-gray font-sans text-xs sm:text-sm font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative border elements */}
                <div className="absolute top-0 right-0 w-2 h-[1px] bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-[1px] h-2 bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
