import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Menu, X, Calendar, Phone } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  onOpenStylist: () => void;
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ onOpenStylist, onOpenBooking, onOpenConcierge, scrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collections", id: "collections" },
    { name: "Gallery", id: "gallery" },
    { name: "Process", id: "process" },
    { name: "Why Us", id: "why-us" },
    { name: "Reviews", id: "reviews" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-black/40 backdrop-blur-md border-b border-white/5 shadow-2xl shadow-black/40"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Elegant Luxury Logo */}
          <div 
            onClick={() => scrollToSection("hero")} 
            className="cursor-pointer"
          >
            <Logo size="sm" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[10px] tracking-[0.2em] font-medium text-light-gray hover:text-white transition-colors duration-300 relative py-1 group uppercase"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Desktop Call to Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* AI Virtual Stylist Trigger */}
            <button
              onClick={onOpenStylist}
              className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-white/10 hover:border-gold-accent hover:text-gold-accent transition-all duration-300 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-accent animate-pulse" />
              <span>AI Stylist</span>
            </button>

            {/* Book Trial Button */}
            <button
              onClick={onOpenBooking}
              className="px-5 py-2 border border-gold-accent/40 text-gold-accent hover:bg-gold-accent hover:text-black transition-all duration-300 text-[10px] tracking-[0.2em] uppercase font-medium cursor-pointer"
            >
              Book Trial
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Minimal Sparkles button for mobile */}
            <button
              onClick={onOpenStylist}
              className="p-2 rounded-full bg-gold-accent/10 border border-gold-accent/20 text-gold-accent hover:bg-gold-accent/25 transition-colors"
              title="AI Stylist"
            >
              <Sparkles className="w-4 h-4 text-gold-accent animate-pulse" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-light-gray hover:text-white hover:bg-neutral-900 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 w-full z-40 bg-black border-b border-white/5 backdrop-blur-xl lg:hidden flex flex-col py-6 px-4 space-y-4 shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection(link.id);
                  }}
                  className="text-left text-xs tracking-[0.2em] font-medium text-light-gray hover:text-white py-2 border-b border-neutral-900 uppercase"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-3 pt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenStylist();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-white/5 border border-white/10 text-white text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-white/10 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-gold-accent" />
                <span>AI Stylist</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 border border-gold-accent/40 text-gold-accent hover:bg-gold-accent hover:text-black transition-all duration-300 text-[10px] tracking-[0.2em] uppercase font-medium"
              >
                Book Private Trial
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
