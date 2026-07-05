import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS } from "../data";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-dark-base border-t border-white/5 relative overflow-hidden select-none">
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-red-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] text-red-accent uppercase font-serif font-semibold block mb-2">Answers Provided</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-widest text-white uppercase">
            Sovereign <span className="text-gold-accent italic">Assistance</span>
          </h2>
          <div className="w-24 h-[1px] bg-gold-accent/30 mx-auto mt-4" />
          <p className="max-w-2xl mx-auto text-light-gray font-light text-sm mt-4 text-center">
            Find immediate clarity regarding dry fitting alterations, accidental damage waivers, and our premium showroom booking policy.
          </p>
        </div>

        {/* FAQs Accordions list */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-dark-card border-gold-accent/30 shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                    : "bg-black border-white/5 hover:border-white/10"
                }`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-start space-x-3.5 pr-4">
                    <HelpCircle className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${isOpen ? "text-gold-accent" : "text-light-gray/40"}`} />
                    <span className="font-serif text-sm sm:text-md font-light tracking-wide text-white uppercase leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className="shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-gold-accent" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-light-gray/40" />
                    )}
                  </div>
                </button>

                {/* Expanded Answer Panel */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/5">
                        <p className="text-light-gray font-sans text-xs sm:text-sm leading-relaxed font-light pr-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
