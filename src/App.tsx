/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Heart, MessageCircle, Instagram, ShieldCheck, Crown } from "lucide-react";

// Component imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import ProductGallery from "./components/ProductGallery";
import WhyChooseUs from "./components/WhyChooseUs";
import RentalProcess from "./components/RentalProcess";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import VirtualStylist from "./components/VirtualStylist";
import ConciergePortal from "./components/ConciergePortal";

export default function App() {
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [preselectedProductName, setPreselectedProductName] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Elegant scroll-reveal section transition variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Mouse parallax coordinate capture
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper when user selects a recommended outfit from the AI Stylist
  const handleSelectRecommendedOutfit = (outfitName: string) => {
    setPreselectedProductName(outfitName);
    setIsStylistOpen(false);
    setIsBookingModalOpen(true);
  };

  // Premium Instagram Grid Images with Simulated Like Metrics
  const [instagramFeed, setInstagramFeed] = useState<any[]>([
    {
      image: "/assets/images/beige_sherwani_1783186848369.jpg",
      likes: 1845,
      comments: 242,
      tag: "#RoyalSherwani",
      link: "https://www.instagram.com/theavenueshowroom/"
    },
    {
      image: "/assets/images/black_bandhgala_1783186834600.jpg",
      likes: 1542,
      comments: 189,
      tag: "#MandarinCollar",
      link: "https://www.instagram.com/theavenueshowroom/"
    },
    {
      image: "/assets/images/navy_tuxedo_1783186805390.jpg",
      likes: 1624,
      comments: 211,
      tag: "#ClassicTuxedo",
      link: "https://www.instagram.com/theavenueshowroom/"
    },
    {
      image: "/assets/images/plaid_blazer_1783186819820.jpg",
      likes: 1395,
      comments: 145,
      tag: "#PlaidBlazer",
      link: "https://www.instagram.com/theavenueshowroom/"
    },
    {
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80",
      likes: 1422,
      comments: 381,
      tag: "#EmeraldLuxury",
      link: "https://www.instagram.com/theavenueshowroom/"
    },
    {
      image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&w=600&q=80",
      likes: 1674,
      comments: 420,
      tag: "#SovereignBrocade",
      link: "https://www.instagram.com/theavenueshowroom/"
    }
  ]);
  const [isInstaLoading, setIsInstaLoading] = useState(false);

  // Fetch live Instagram metrics on mount and automatically update
  useEffect(() => {
    let active = true;
    const fetchInstagram = async (isSilent = false) => {
      if (!isSilent) setIsInstaLoading(true);
      try {
        const res = await fetch("/api/instagram");
        if (!res.ok) throw new Error("Network status invalid");
        const data = await res.json();
        if (active && data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          setInstagramFeed(data.posts);
        }
      } catch (err) {
        console.warn("Could not sync live Instagram feed:", err);
      } finally {
        if (active && !isSilent) setIsInstaLoading(false);
      }
    };

    fetchInstagram();

    // Auto-update feed and likes dynamically every 30 seconds
    const interval = setInterval(() => {
      fetchInstagram(true);
    }, 30000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  // Utility to format likes count elegantly (e.g. 1.2k if > 1000)
  const formatLikes = (likes: number | string) => {
    if (typeof likes === "string") return likes;
    if (likes >= 1000) {
      return (likes / 1000).toFixed(1) + "k";
    }
    return likes.toString();
  };

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen relative font-sans antialiased overflow-x-hidden selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Dynamic Ambient Background Glow Orb following Cursor on Desktop */}
      <div 
        className="fixed w-[450px] h-[450px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none z-0 transition-transform duration-300 ease-out hidden md:block"
        style={{
          transform: `translate(${mousePosition.x - 225}px, ${mousePosition.y - 225}px)`,
        }}
      />

      {/* 1. Header Navigation */}
      <Navbar
        onOpenStylist={() => setIsStylistOpen(true)}
        onOpenBooking={() => {
          setPreselectedProductName("");
          setIsBookingModalOpen(true);
        }}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        scrollToSection={scrollToSection}
      />

      {/* 2. Full-Screen Cinematic Hero */}
      <Hero
        onOpenStylist={() => setIsStylistOpen(true)}
        onOpenBooking={() => {
          setPreselectedProductName("");
          setIsBookingModalOpen(true);
        }}
        scrollToSection={scrollToSection}
      />

      {/* 3. Featured Collections Bento Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
      >
        <Collections
          selectedCollection={selectedCollection}
          onSelectCollection={(collectionId) => {
            setSelectedCollection(collectionId);
            scrollToSection("gallery");
          }}
        />
      </motion.div>

      {/* 4. Luxury Product Gallery */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
      >
        <ProductGallery
          selectedCollection={selectedCollection}
          onOpenBooking={(productName) => {
            setPreselectedProductName(productName || "");
            setIsBookingModalOpen(true);
          }}
        />
      </motion.div>

      {/* 5. Premium Full-Bleed High-Fashion Divider Banner */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="py-24 relative overflow-hidden bg-black select-none border-t border-white/5"
      >
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-15 brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.3em] text-gold-accent uppercase font-serif font-semibold block mb-2">Heritage Craftsmanship</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-widest uppercase leading-tight">
              LOOK IMPERIAL.<br />
              STAND OUT.<br />
              MAKE A <span className="text-red-accent italic">ROYAL</span> IMPRESSION.
            </h2>
            <p className="text-light-gray font-sans text-xs sm:text-sm font-light leading-relaxed mt-6 mb-8">
              Every sherwani and tuxedo in our inventory is carefully inspected, micro-altered, and dry-cleaned under white-glove conditions. We guarantee that your outfit will look, feel, and drape like a brand new custom luxury garment.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setPreselectedProductName("");
                  setIsBookingModalOpen(true);
                }}
                className="px-8 py-3.5 bg-red-accent hover:bg-gold-accent hover:text-black font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg cursor-pointer"
              >
                Reserve Your Fit Slot
              </button>
              <button
                onClick={() => setIsStylistOpen(true)}
                className="px-8 py-3.5 bg-black border border-gold-accent/30 text-gold-accent hover:bg-gold-accent/20 font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer"
              >
                Launch AI Consultant
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6. Why Choose Us Standards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
      >
        <WhyChooseUs />
      </motion.div>

      {/* 7. Animated Timeline Rental Process */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
      >
        <RentalProcess />
      </motion.div>

      {/* 8. Verified Customer Testimonial Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
      >
        <Reviews />
      </motion.div>

      {/* 9. Premium Styled Instagram Lifestyle Grid */}
      <section id="instagram-feed" className="py-24 bg-dark-base border-t border-white/5 relative select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Header */}
          <div className="mb-16">
            <span className="text-[10px] tracking-[0.3em] text-red-accent uppercase font-sans font-semibold block mb-2">Social Ateliers</span>
            <h2 className="font-sans text-2xl sm:text-4xl font-black tracking-wider text-white uppercase flex items-center justify-center gap-2">
              <Instagram className="w-6 sm:w-8 h-6 sm:h-8 text-red-accent animate-pulse" />
              <a 
                href="https://www.instagram.com/theavenueshowroom/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-red-accent transition-colors duration-300"
              >
                @theavenueshowroom
              </a>
            </h2>
            <div className="w-24 h-[1px] bg-gold-accent/30 mx-auto mt-4" />
            <p className="max-w-2xl mx-auto text-light-gray font-light text-sm mt-4">
              Join the elite circle of Avenue Grooms. Tag your ceremony photos with <strong className="text-white">#TheAvenueCollections</strong> to be featured across our global showroom networks.
            </p>
            {isInstaLoading && (
              <p className="text-[10px] text-gold-accent font-mono tracking-wider uppercase mt-2 animate-pulse">
                ● Live Syncing Real Likes
              </p>
            )}
          </div>

          {/* Insta Feed Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramFeed.map((post, idx) => (
              <motion.a
                key={idx}
                href={post.link || "https://www.instagram.com/theavenueshowroom/"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group aspect-square overflow-hidden cursor-pointer border border-white/5 block"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                
                {/* Visual Glass Blur Stats on Hover */}
                <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center space-y-3 p-4">
                  <span className="text-[10px] font-mono font-bold text-gold-accent tracking-wider">
                    {post.tag}
                  </span>
                  
                  <div className="flex items-center space-x-4 text-white text-xs font-semibold">
                    <div className="flex items-center space-x-1.5">
                      <Heart className="w-4 h-4 text-red-accent fill-red-accent" />
                      <span>{formatLikes(post.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <MessageCircle className="w-4 h-4 text-light-gray/60" />
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  <span className="text-[8px] tracking-widest text-light-gray font-serif uppercase font-bold pt-1">
                    View On Instagram
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Sovereign Accordion Assistance FAQs */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
      >
        <Faq />
      </motion.div>

      {/* 11. Interactive Contact Details & Bespoke Booking Forms */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
      >
        <Contact />
      </motion.div>

      {/* 12. Fine Couture Brand Footer */}
      <Footer scrollToSection={scrollToSection} />

      {/* 13. AI Virtual Stylist Consultation Slide-Over Panel */}
      <VirtualStylist
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
        onSelectRecommendedOutfit={handleSelectRecommendedOutfit}
      />

      {/* 14. Global Appointment Fit Trial Modal Overlay */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Drawer Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-xl bg-dark-card border border-gold-accent/20 overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/40 text-light-gray hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <Contact
                isModalVariant={true}
                initialProductName={preselectedProductName}
                onCloseModal={() => setIsBookingModalOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Concierge Portal Slide-Over */}
      <ConciergePortal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </div>
  );
}
