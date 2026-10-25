import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  isInCart: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  isInCart,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
}) => {
  const [imageError, setImageError] = useState(false);

  // Calculate discount percentage if original price is available
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="group relative flex flex-col bg-[#171717] rounded-xl border border-[#2A2A2A] hover:border-[#FF6A00]/40 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#FF6A00]/5 hover:-translate-y-0.5">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full bg-[#121212] overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        {!imageError && product.primaryImage ? (
          <img
            src={product.primaryImage}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1C1C1C] to-[#121212] text-center">
            <BookOpen className="w-10 h-10 text-[#FF6A00] mb-2 opacity-80" />
            <span className="text-xs text-[#A3A3A3] font-medium line-clamp-1">{product.category}</span>
          </div>
        )}

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Floating Condition & Discount indicators */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#0B0B0B]/85 text-white backdrop-blur-sm border border-[#2A2A2A]">
            {product.condition}
          </span>
          {discountPercent && (
            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#FF6A00] text-white shadow-sm tabular-nums">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-10 ${
            isWishlisted
              ? 'bg-[#FF6A00] text-white shadow-md'
              : 'bg-[#0B0B0B]/70 text-white/80 hover:text-white hover:bg-[#0B0B0B]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Details Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 rounded-md bg-[#0B0B0B]/90 hover:bg-[#0B0B0B] text-white text-xs font-medium backdrop-blur-md border border-[#2A2A2A] flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap z-10"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-[#A3A3A3] line-clamp-1">
            <span className="text-[#FF8C42] font-medium">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.college.split(' ')[0]}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="text-sm sm:text-base font-semibold text-white group-hover:text-[#FF6A00] transition-colors line-clamp-2 cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Seller Attribution & City */}
          <div className="flex items-center gap-1 text-[11px] text-[#A3A3A3]">
            <MapPin className="w-3 h-3 text-[#FF6A00] shrink-0" />
            <span className="truncate">{product.sellerName} · {product.city}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#2A2A2A] flex items-center justify-between gap-2">
          {/* Price Block */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-white tabular-nums tracking-tight">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#A3A3A3] line-through tabular-nums">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#A3A3A3] block">Campus handoff</span>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={() => onAddToCart(product)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              isInCart
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-[#FF6A00] hover:bg-[#FF8C42] text-white shadow-sm shadow-[#FF6A00]/20'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
