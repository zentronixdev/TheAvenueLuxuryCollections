import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS, COLLECTIONS } from "../data";
import { Product } from "../types";
import { Star, MessageCircle, Ruler, Calendar, Check, ArrowRight, X, ShieldCheck, Share2, Link, Twitter, Facebook } from "lucide-react";

interface ProductGalleryProps {
  selectedCollection: string;
  onOpenBooking: (productName?: string) => void;
}

export default function ProductGallery({ selectedCollection, onOpenBooking }: ProductGalleryProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeShareId, setActiveShareId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = (platform: "whatsapp" | "twitter" | "facebook" | "copy", product: Product) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?product=${encodeURIComponent(product.id)}`;
    const text = `Check out the magnificent ${product.name} at The Avenue Luxury Collections!`;
    
    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + shareUrl)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedId(product.id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };
  
  // Filtering logic
  const filteredProducts = selectedCollection === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.collectionId === selectedCollection);

  const activeCollectionName = selectedCollection === "all"
    ? "All Masterpieces"
    : COLLECTIONS.find(c => c.id === selectedCollection)?.name || "Masterpieces";

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  return (
    <section id="gallery" className="py-24 bg-dark-base border-t border-white/5 relative">
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-red-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left mb-6 md:mb-0">
            <span className="text-[10px] tracking-[0.3em] text-red-accent uppercase font-serif font-semibold block mb-2">Exclusive Showroom</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-light tracking-widest text-white uppercase">
              {activeCollectionName}
            </h2>
            <div className="w-20 h-[1px] bg-gold-accent mt-3" />
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs text-light-gray font-sans tracking-wider uppercase">
              Showing {filteredProducts.length} premium designs • Handcrafted detailing
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredCardId(prod.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="group relative bg-dark-card border border-white/5 overflow-hidden flex flex-col h-full justify-between shadow-2xl shadow-black/30 hover:border-gold-accent/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.08)] transition-all duration-500"
              >
                {/* Popular Badge */}
                {prod.isPopular && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-red-accent text-[9px] tracking-widest font-serif font-semibold uppercase text-white shadow-lg">
                    Popular Demand
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 z-20 flex items-center space-x-1 px-2.5 py-1 bg-black/70 border border-white/10 backdrop-blur-md">
                  <Star className="w-3 h-3 text-gold-accent fill-gold-accent" />
                  <span className="text-[10px] font-sans font-bold text-white">{prod.rating.toFixed(1)}</span>
                </div>

                {/* Elegant Floating Share Button */}
                <div 
                  className="absolute top-14 right-4 z-30"
                  onMouseLeave={() => setActiveShareId(null)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveShareId(activeShareId === prod.id ? null : prod.id);
                    }}
                    className="p-2 bg-black/70 hover:bg-gold-accent hover:text-black text-light-gray border border-white/10 backdrop-blur-md transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center shadow-lg"
                    title="Share Outfit"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  <AnimatePresence>
                    {activeShareId === prod.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        className="absolute right-0 mt-1.5 w-36 bg-[#0D0D0D] border border-gold-accent/20 shadow-2xl py-1 z-40"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare("whatsapp", prod);
                          }}
                          className="w-full px-3 py-2 text-left text-[10px] font-sans text-light-gray hover:text-gold-accent hover:bg-white/5 flex items-center space-x-2 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-400" />
                          <span>WhatsApp</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare("twitter", prod);
                          }}
                          className="w-full px-3 py-2 text-left text-[10px] font-sans text-light-gray hover:text-gold-accent hover:bg-white/5 flex items-center space-x-2 transition-colors cursor-pointer"
                        >
                          <Twitter className="w-3 h-3 text-sky-400" />
                          <span>Twitter / X</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare("facebook", prod);
                          }}
                          className="w-full px-3 py-2 text-left text-[10px] font-sans text-light-gray hover:text-gold-accent hover:bg-white/5 flex items-center space-x-2 transition-colors cursor-pointer"
                        >
                          <Facebook className="w-3 h-3 text-blue-500" />
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare("copy", prod);
                          }}
                          className="w-full px-3 py-2 text-left text-[10px] font-sans text-light-gray hover:text-gold-accent hover:bg-white/5 flex items-center space-x-2 transition-colors cursor-pointer"
                        >
                          {copiedId === prod.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Link className="w-3 h-3 text-amber-500" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Image Panel */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black cursor-pointer" onClick={() => handleOpenDetails(prod)}>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${prod.image})` }}
                  />
                  {/* Glass Card Overlay details on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <p className="text-gold-accent font-serif text-[10px] tracking-wider uppercase mb-1 font-semibold">Bespoke Fitting Services</p>
                    <p className="text-light-gray text-[11px] font-light leading-relaxed line-clamp-3 mb-4">{prod.description}</p>
                    <button className="w-full py-2 bg-black hover:bg-white text-light-gray hover:text-black border border-white/15 hover:border-white transition-all duration-300 text-[10px] tracking-widest uppercase font-semibold">
                      View Suit Details
                    </button>
                  </div>
                </div>

                {/* Card Info Details */}
                <div className="p-5 flex flex-col flex-grow justify-between text-left">
                  <div>
                    {/* Category */}
                    <span className="text-[9px] font-poppins tracking-[0.25em] text-light-gray uppercase font-semibold mb-1.5 block">
                      {prod.category}
                    </span>
                    {/* Title */}
                    <h3 className="font-serif text-md font-light text-white tracking-wide uppercase mb-2 line-clamp-1 group-hover:text-gold-accent transition-colors duration-300">
                      {prod.name}
                    </h3>
                    
                    {/* Fabric Details */}
                    <div className="flex items-center space-x-1.5 text-light-gray text-[11px] font-sans mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-accent"></span>
                      <span>{prod.fabric}</span>
                    </div>
                  </div>

                  <div>
                    {/* Pricing */}
                    <div className="flex items-baseline justify-between py-3 border-t border-white/5 mb-3">
                      <div>
                        <span className="text-[9px] text-light-gray/60 uppercase tracking-wider block">Rental Rate</span>
                        <span className="text-md sm:text-lg font-bold font-sans text-white">₹{prod.rentPrice.toLocaleString("en-IN")}</span>
                        <span className="text-[10px] text-light-gray font-sans font-light"> / 1 Day</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-light-gray/60 uppercase tracking-wider block">Retail Value</span>
                        <span className="text-[11px] text-light-gray font-sans line-through">₹{prod.retailValue.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    {/* Available Sizes */}
                    <div className="flex items-center space-x-1 mb-4">
                      <span className="text-[9px] text-light-gray/60 uppercase tracking-wider mr-2">Sizes:</span>
                      {prod.availableSizes.map(sz => (
                        <span key={sz} className="text-[10px] font-mono px-2 py-0.5 bg-black/50 border border-white/5 text-light-gray">{sz}</span>
                      ))}
                    </div>

                    {/* Actions Panel */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => onOpenBooking(prod.name)}
                        className="py-2.5 bg-red-accent hover:bg-gold-accent hover:text-black text-[10px] font-bold text-white tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Reserve</span>
                      </button>
                      <a
                        href={`https://wa.me/919999999999?text=Hello%20The%20Avenue%20Luxury%20Collections%2C%20I%20am%20interested%20in%20checking%20the%20rental%20availability%20for%20the%20${encodeURIComponent(prod.name)}.`}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="py-2.5 bg-black/40 border border-white/10 hover:border-emerald-500 hover:text-emerald-400 text-[10px] font-bold text-light-gray tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Deep Detail Modal Dialog */}
      <AnimatePresence>
        {isDetailModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-4xl bg-dark-card border border-gold-accent/20 rounded-none overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/55 text-light-gray hover:text-white hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Area */}
              <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto md:h-[580px] relative bg-black">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedProduct.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Product Specifications Area */}
              <div className="w-full md:w-1/2 p-8 text-left flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-[580px]">
                <div>
                  <span className="text-[10px] font-serif tracking-[0.25em] text-gold-accent uppercase font-bold mb-1.5 block">
                    {selectedProduct.category} • Royal Coutures
                  </span>
                  
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide uppercase mb-3">
                    {selectedProduct.name}
                  </h3>

                  <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(selectedProduct.rating) ? "text-gold-accent fill-gold-accent" : "text-neutral-700"}`} />
                      ))}
                      <span className="text-xs text-light-gray font-sans font-semibold ml-2">({selectedProduct.rating} / 5 stars)</span>
                    </div>

                    {/* Social Media Share Actions */}
                    <div className="flex items-center space-x-1.5 bg-neutral-900 px-2 py-1 border border-white/5">
                      <span className="text-[9px] tracking-widest text-light-gray/60 uppercase font-sans font-semibold px-1.5">Share:</span>
                      <button
                        onClick={() => handleShare("whatsapp", selectedProduct)}
                        className="p-1 text-light-gray hover:text-emerald-400 transition-colors cursor-pointer"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleShare("twitter", selectedProduct)}
                        className="p-1 text-light-gray hover:text-sky-400 transition-colors cursor-pointer"
                        title="Share on X (Twitter)"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleShare("facebook", selectedProduct)}
                        className="p-1 text-light-gray hover:text-blue-400 transition-colors cursor-pointer"
                        title="Share on Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleShare("copy", selectedProduct)}
                        className="p-1 text-light-gray hover:text-gold-accent transition-colors cursor-pointer"
                        title="Copy Link"
                      >
                        {copiedId === selectedProduct.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Link className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-light-gray font-sans text-sm font-light leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-white font-medium">Fabric material:</strong>
                        <span className="text-light-gray block text-xs">{selectedProduct.fabric}</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 text-sm">
                      <ShieldCheck className="w-4 h-4 text-gold-accent mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-white font-medium">Embellishments & Accents:</strong>
                        <span className="text-light-gray block text-xs">{selectedProduct.accentDetails}</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 text-sm">
                      <Ruler className="w-4 h-4 text-red-accent mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-white font-medium">Sizes Available:</strong>
                        <span className="text-light-gray block text-xs">{selectedProduct.availableSizes.join(", ")} (Complementary dry fitting alterations)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reservation Action section */}
                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-xs text-light-gray/60 uppercase">1-Day Rental Charge</span>
                      <p className="text-2xl font-bold font-sans text-white">
                        ₹{selectedProduct.rentPrice.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-light-gray/60 uppercase">Bespoke Value</span>
                      <p className="text-sm font-sans text-light-gray line-through">
                        ₹{selectedProduct.retailValue.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setIsDetailModalOpen(false);
                        onOpenBooking(selectedProduct.name);
                      }}
                      className="flex-grow py-3.5 bg-red-accent hover:bg-gold-accent text-white hover:text-black font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Reserve Rental</span>
                    </button>
                    <a
                      href={`https://wa.me/919999999999?text=Hello%20The%20Avenue%20Luxury%20Collections%2C%20I%20am%20interested%20in%20reserving%20the%20${encodeURIComponent(selectedProduct.name)}.`}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="px-5 py-3.5 bg-black/40 border border-white/10 hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
