import { motion } from "motion/react";
import { Sparkles, CheckSquare, CalendarDays, Scissors, ThumbsUp, RotateCcw } from "lucide-react";

export default function RentalProcess() {
  const steps = [
    {
      step: "01",
      icon: Sparkles,
      title: "Choose Outfit",
      description: "Browse our elite digital catalog, visit our luxury trial suites, or consult our server-side Virtual AI Stylist to identify the perfect groom or gala look."
    },
    {
      step: "02",
      icon: CalendarDays,
      title: "Book Fitting Trial",
      description: "Book a private fitting session. We reserve your favorite outfit and invite you to our showroom, or deliver a home trial kit direct to your door."
    },
    {
      step: "03",
      icon: Scissors,
      title: "Alter & Confirm",
      description: "Our bespoke tailors adjust sleeves, collars, and waistlines to your custom build. Confirm your rental dates and lock in your dry-cleaned master look."
    },
    {
      step: "04",
      icon: ThumbsUp,
      title: "Radiate Royalty",
      description: "Pick up your perfectly steamed garment in our flagship garment carrier. Look absolutely spectacular and premium at your grand wedding reception."
    },
    {
      step: "05",
      icon: RotateCcw,
      title: "Return dry-clean free",
      description: "Return the outfit in its bag after the ceremony. No need to dry-clean, wash, or press. We handle all advanced specialized cleaning in-house."
    }
  ];

  return (
    <section id="process" className="py-24 bg-dark-base border-t border-white/5 relative overflow-hidden select-none">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.3em] text-red-accent uppercase font-serif font-semibold block mb-2">How It Works</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-widest text-white uppercase">
            The Rental <span className="text-gold-accent italic">Process</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold-accent/30 mx-auto mt-4" />
          <p className="max-w-2xl mx-auto text-light-gray font-light text-sm mt-4">
            Five simple steps to secure an imperial couture look. Bespoke tailored, dry-cleaned, and delivered on-demand.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent -translate-y-1/2 hidden xl:block" />

          {/* Steps Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8 relative z-10">
            {steps.map((item, index) => {
              const StepIcon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Circular Indicator */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-black border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-gold-accent group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 z-10 relative">
                      <StepIcon className="w-6 h-6 text-gold-accent group-hover:text-red-accent transition-colors duration-500" />
                    </div>

                    {/* Step Numeric Label */}
                    <span className="absolute -top-3 -right-3 text-[10px] font-mono font-bold px-2 py-0.5 bg-red-accent border border-red-900 text-white shadow-md">
                      {item.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-md sm:text-lg font-light text-white tracking-widest uppercase mb-3 group-hover:text-gold-accent transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-light-gray font-sans text-xs sm:text-sm font-light leading-relaxed px-2">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
