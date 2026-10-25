import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart,
  onViewDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#171717] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between bg-[#0B0B0B]/70">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FF6A00] fill-current" />
            <h2 className="text-base font-bold text-white">Your Saved Wishlist</h2>
            <span className="text-xs text-[#A3A3A3] tabular-nums">({wishlistItems.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0B0B0B] border border-[#2A2A2A] flex items-center justify-center mx-auto text-[#A3A3A3]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">No items saved yet</h3>
              <p className="text-xs text-[#A3A3A3] max-w-xs mx-auto">
                Tap the heart icon on any textbook, calculator, or lab tool to keep track of it.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlistItems.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-[#0B0B0B] rounded-xl border border-[#2A2A2A] flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex gap-3">
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-[#171717] shrink-0 border border-[#2A2A2A] cursor-pointer"
                      onClick={() => {
                        onViewDetails(product);
                        onClose();
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold text-[#FF8C42] uppercase block">
                        {product.category}
                      </span>
                      <h4
                        className="text-xs font-semibold text-white truncate cursor-pointer hover:text-[#FF6A00]"
                        onClick={() => {
                          onViewDetails(product);
                          onClose();
                        }}
                      >
                        {product.name}
                      </h4>
                      <div className="text-xs font-bold text-white mt-1 tabular-nums">
                        ₹{product.price}
                      </div>
                      <span className="text-[10px] text-[#A3A3A3] block truncate">
                        {product.sellerName} · {product.city}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#2A2A2A] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-1.5 text-[#A3A3A3] hover:text-red-400 rounded-md transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="flex-1 py-1.5 px-2 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="px-6 py-3 border-t border-[#2A2A2A] bg-[#0B0B0B]/70 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#A3A3A3] hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
