import { Sparkles, Facebook, Instagram, Twitter, ShieldCheck } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-base text-light-gray border-t border-white/5 pt-16 pb-12 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Branding Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/5 text-left">
          
          {/* Logo & Manifesto */}
          <div className="space-y-4">
            <div onClick={() => scrollToSection("hero")} className="cursor-pointer">
              <Logo size="md" />
            </div>
            <p className="text-xs text-light-gray/70 font-sans leading-relaxed pt-2">
              Sovereign tailoring, traditional heritage, and contemporary blazers made available for exclusive rental dry-fitting. Redefining high-fashion wedding apparel across Tamil Nadu.
            </p>
          </div>

          {/* Quick Nav Navigation */}
          <div>
            <h4 className="font-serif text-xs font-light text-white tracking-widest uppercase mb-4">
              Explore Collections
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs font-sans">
              <button onClick={() => scrollToSection("collections")} className="hover:text-gold-accent text-left transition-colors uppercase tracking-wider">Royal Sherwanis</button>
              <button onClick={() => scrollToSection("collections")} className="hover:text-gold-accent text-left transition-colors uppercase tracking-wider">Dapper Blazers</button>
              <button onClick={() => scrollToSection("collections")} className="hover:text-gold-accent text-left transition-colors uppercase tracking-wider">Obsidian Jodhpuris</button>
              <button onClick={() => scrollToSection("collections")} className="hover:text-gold-accent text-left transition-colors uppercase tracking-wider">Navy Tuxedo Blazers</button>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-serif text-xs font-light text-white tracking-widest uppercase mb-4">
              The Experience
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs font-sans">
              <button onClick={() => scrollToSection("process")} className="hover:text-gold-accent text-left transition-colors uppercase tracking-wider">Five-Step Rental Process</button>
              <button onClick={() => scrollToSection("why-us")} className="hover:text-gold-accent text-left transition-colors uppercase tracking-wider">Master Sizing Alterations</button>
              <button onClick={() => scrollToSection("faq")} className="hover:text-gold-accent text-left transition-colors uppercase tracking-wider">Accidental Damage Waiver</button>
              <a href="#contact" className="hover:text-gold-accent text-left transition-colors uppercase tracking-wider">Private Showroom Suite</a>
            </div>
          </div>

          {/* Socials & Trust badge */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-light text-white tracking-widest uppercase mb-4">
              Connect With Us
            </h4>
            <div className="flex items-center space-x-4">
              <a href="https://instagram.com" target="_blank" referrerPolicy="no-referrer" className="p-2 bg-black border border-white/5 text-light-gray hover:text-white hover:border-gold-accent/35 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" referrerPolicy="no-referrer" className="p-2 bg-black border border-white/5 text-light-gray hover:text-white hover:border-gold-accent/35 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" referrerPolicy="no-referrer" className="p-2 bg-black border border-white/5 text-light-gray hover:text-white hover:border-gold-accent/35 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[10px] text-light-gray/55 uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Registered Luxury Retailer</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-light-gray/40 font-sans space-y-4 sm:space-y-0">
          <div>
            <span>© {currentYear} The Avenue Luxury Collections. All sovereign rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#faq" className="hover:text-white transition-colors">TERMS OF LEASE</a>
            <span>•</span>
            <a href="#faq" className="hover:text-white transition-colors">STYLING ASSURANCE</a>
            <span>•</span>
            <a href="#faq" className="hover:text-white transition-colors">SECURITY POLICIES</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
