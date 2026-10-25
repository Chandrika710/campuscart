import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingCart,
  Zap,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  User,
  BookOpen,
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  isInCart: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onSubmitPurchaseRequest: (productId: string, offerPrice: number, message: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  isInCart,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSubmitPurchaseRequest,
}) => {
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [offerMessage, setOfferMessage] = useState<string>('');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !product) return null;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const price = offerPrice ? parseInt(offerPrice, 10) : product.price;
    const msg = offerMessage || `Hi ${product.sellerName}, I am interested in purchasing your "${product.name}".`;
    onSubmitPurchaseRequest(product.id, price, msg);
    setRequestSubmitted(true);
    setTimeout(() => {
      setShowOfferForm(false);
      setRequestSubmitted(false);
      setOfferPrice('');
      setOfferMessage('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#171717] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A] bg-[#0B0B0B]/60">
          <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
            <span className="text-[#FF8C42] font-semibold">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>Listing #{product.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left: Product Image */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#121212] border border-[#2A2A2A]">
                {!imageError && product.primaryImage ? (
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    onError={() => setImageError(true)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <BookOpen className="w-12 h-12 text-[#FF6A00] mb-2" />
                    <span className="text-xs text-[#A3A3A3]">{product.category}</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#0B0B0B]/85 text-white backdrop-blur-sm border border-[#2A2A2A]">
                    {product.condition}
                  </span>
                  {discountPercent && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FF6A00] text-white">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Campus Handoff Notice */}
              <div className="p-3 rounded-lg bg-[#0B0B0B] border border-[#2A2A2A] text-xs text-[#A3A3A3] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-[#FF6A00]" />
                  <span>Campus Direct Handoff</span>
                </div>
                <p>Inspect item in person before handoff at campus library or student center.</p>
              </div>
            </div>

            {/* Right: Details & Purchase Options */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {product.name}
                </h2>
                
                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white tabular-nums">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-[#A3A3A3] line-through tabular-nums">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-emerald-400 font-medium">
                    In Stock ({product.quantity} available)
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">
                  Description
                </h4>
                <p className="text-sm text-stone-300 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Seller Information Card */}
              <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] space-y-2">
                <div className="text-xs font-semibold text-[#FF8C42] uppercase tracking-wider">
                  Seller Information
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#171717] border border-[#2A2A2A] flex items-center justify-center text-[#FF6A00] font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white text-sm">{product.sellerName}</div>
                    <div className="text-[#A3A3A3] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF6A00]" />
                      <span>{product.college}</span>
                    </div>
                    <div className="text-[#A3A3A3]">{product.city}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onAddToCart(product)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isInCart
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#171717] hover:bg-[#2A2A2A] text-white border border-[#2A2A2A]'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
                  </button>

                  <button
                    onClick={() => onBuyNow(product)}
                    className="py-3 px-4 rounded-xl text-xs font-semibold bg-[#FF6A00] hover:bg-[#FF8C42] text-white flex items-center justify-center gap-2 shadow-md shadow-[#FF6A00]/25 transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'border-[#FF6A00] text-[#FF6A00] bg-[#FF6A00]/10'
                        : 'border-[#2A2A2A] text-[#A3A3A3] hover:text-white bg-[#0B0B0B]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>

                  <button
                    onClick={() => setShowOfferForm(!showOfferForm)}
                    className="flex-1 py-2.5 px-3 rounded-lg text-xs font-medium border border-[#2A2A2A] text-[#FF8C42] hover:bg-[#2A2A2A] bg-[#0B0B0B] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Purchase Request</span>
                  </button>
                </div>
              </div>

              {/* Purchase Request Inline Form */}
              {showOfferForm && (
                <form
                  onSubmit={handleSendRequest}
                  className="p-4 rounded-xl bg-[#0B0B0B] border border-[#FF6A00]/40 space-y-3"
                >
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-[#FF6A00]" />
                    <span>Send Direct Purchase / Meetup Request to Seller</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-[#A3A3A3] block mb-1">Your Offer Price (₹)</label>
                      <input
                        type="number"
                        placeholder={`Listing price is ₹${product.price}`}
                        defaultValue={product.price}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#171717] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#A3A3A3] block mb-1">Proposed Meetup Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Central Library Lawn"
                        className="w-full px-3 py-1.5 bg-[#171717] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-[#A3A3A3] block mb-1">Message to Seller</label>
                    <textarea
                      rows={2}
                      placeholder="Hi! I am interested in this item and can meet this afternoon..."
                      value={offerMessage}
                      onChange={(e) => setOfferMessage(e.target.value)}
                      className="w-full px-3 py-1.5 bg-[#171717] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#A3A3A3]">
                      * Demo simulation: records request in seller dashboard.
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}

              {/* Visible Confirmation Banner (Mandatory: must not claim a real message has been sent) */}
              {requestSubmitted && (
                <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-500/50 flex items-start gap-2.5 text-xs text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Purchase Request Recorded in Demo!</div>
                    <div className="text-emerald-300/90 mt-0.5">
                      Your purchase request has been logged in the demo seller dashboard for {product.sellerName}.
                      <em className="block text-[11px] text-emerald-400/80 mt-0.5">
                        Note: This is a hackathon simulation — no external SMS or email was dispatched.
                      </em>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
