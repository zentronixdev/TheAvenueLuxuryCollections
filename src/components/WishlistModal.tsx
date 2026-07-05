import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Calendar, Trash2, Sparkles } from "lucide-react";
import { PRODUCTS } from "../data";
import { Product } from "../types";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenBooking: (productName?: string) => void;
  onViewProduct: (product: Product) => void;
}

export default function WishlistModal({
  isOpen,
  onClose,
  favorites,
  onToggleFavorite,
  onOpenBooking,
  onViewProduct,
}: WishlistModalProps) {
  const wishlistedProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Wishlist Sidebar (Slide-in) */}
          <motion.div
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="relative w-full max-w-md h-full bg-dark-base border-l border-white/5 shadow-2xl z-10 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-dark-card">
              <div className="flex items-center space-x-3 text-left">
                <div className="p-2.5 bg-red-accent/10 text-red-accent border border-red-accent/20">
                  <Heart className="w-5 h-5 fill-current animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif text-md sm:text-lg font-light tracking-widest text-white uppercase">
                    Your Wishlist
                  </h3>
                  <p className="text-[10px] text-light-gray font-sans tracking-wider uppercase">
                    Saved Masterpieces • Fit Trials
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black text-light-gray hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-grow p-6 overflow-y-auto">
              {wishlistedProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Heart className="w-12 h-12 text-light-gray/20" />
                  <div className="space-y-1">
                    <p className="font-serif text-sm tracking-widest text-white uppercase">
                      Wishlist is Empty
                    </p>
                    <p className="text-xs text-light-gray/60 max-w-xs mx-auto">
                      Explore our collections and tap the heart icon on any masterpiece to save it here.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300"
                  >
                    Explore Masterpieces
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistedProducts.map((prod) => (
                    <motion.div
                      key={prod.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center p-3 bg-dark-card border border-white/5 gap-4 group hover:border-gold-accent/20 transition-all duration-300"
                    >
                      {/* Image representation */}
                      <div
                        onClick={() => {
                          onViewProduct(prod);
                          onClose();
                        }}
                        className="w-16 h-20 bg-cover bg-center shrink-0 border border-white/5 cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ backgroundImage: `url(${prod.image})` }}
                      />

                      {/* Detail Column */}
                      <div className="flex-grow text-left space-y-1 min-w-0">
                        <span className="text-[8px] font-mono font-semibold text-gold-accent tracking-wider uppercase block">
                          {prod.category}
                        </span>
                        <h4
                          onClick={() => {
                            onViewProduct(prod);
                            onClose();
                          }}
                          className="font-serif text-xs font-light text-white tracking-wide truncate uppercase cursor-pointer hover:text-gold-accent transition-colors"
                        >
                          {prod.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">
                            ₹{prod.rentPrice.toLocaleString()} / day
                          </span>
                          <span className="text-[10px] text-light-gray/40">|</span>
                          <span className="text-[10px] text-light-gray/60 font-mono">
                            Sizes: {prod.availableSizes.join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* CTA Action Buttons */}
                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            onOpenBooking(prod.name);
                            onClose();
                          }}
                          className="p-2 bg-red-accent hover:bg-gold-accent hover:text-black text-white transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center"
                          title="Book Fit Trial"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onToggleFavorite(prod.id)}
                          className="p-2 bg-black hover:bg-red-accent/10 border border-white/10 hover:border-red-accent text-light-gray hover:text-red-accent transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Disclaimer */}
            <div className="p-4 border-t border-white/5 bg-dark-card flex flex-col gap-3">
              {wishlistedProducts.length > 0 && (
                <button
                  onClick={() => {
                    onOpenBooking();
                    onClose();
                  }}
                  className="w-full py-3.5 bg-red-accent hover:bg-gold-accent hover:text-black text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Reserve Private Fittings ({wishlistedProducts.length})</span>
                </button>
              )}
              <div className="text-[9px] text-light-gray/60 font-sans text-center">
                Your wishlist is securely synchronized in your browser cache. Visit us to finalize sizing.
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
