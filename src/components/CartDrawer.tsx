import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#171717] border-l border-[#2A2A2A] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#2A2A2A] flex items-center justify-between bg-[#0B0B0B]/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF6A00]" />
              <h2 className="text-base font-bold text-white">Your Campus Cart</h2>
              <span className="text-xs text-[#A3A3A3] tabular-nums">
                ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#0B0B0B] border border-[#2A2A2A] flex items-center justify-center mx-auto text-[#A3A3A3]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">Your cart is empty</h3>
                  <p className="text-xs text-[#A3A3A3] max-w-xs mx-auto">
                    Explore available textbooks, scientific calculators, and lab gear from peers.
                  </p>
                </div>
                <button
                  onClick={onContinueShopping}
                  className="px-5 py-2.5 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-[#0B0B0B] rounded-xl border border-[#2A2A2A] flex items-center gap-3"
                  >
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-[#171717] shrink-0 border border-[#2A2A2A]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate" title={item.product.name}>
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-[#A3A3A3] flex items-center gap-1 mt-0.5">
                        <span className="text-[#FF8C42]">{item.product.category}</span>
                        <span>·</span>
                        <span className="truncate">{item.product.sellerName}</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-1 tabular-nums">
                        ₹{item.product.price}
                      </div>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex flex-col items-end justify-between self-stretch">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#A3A3A3] hover:text-red-400 p-1 cursor-pointer transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-[#171717] border border-[#2A2A2A] rounded-md px-1.5 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="text-[#A3A3A3] hover:text-white p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-white px-1 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="text-[#A3A3A3] hover:text-white p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#2A2A2A] bg-[#0B0B0B]/80 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Subtotal</span>
                  <span className="text-white font-medium tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Campus Handoff Fee</span>
                  <span className="text-emerald-400 font-medium">Free (In-person)</span>
                </div>
                <div className="pt-2 border-t border-[#2A2A2A] flex justify-between text-sm font-bold text-white">
                  <span>Total</span>
                  <span className="text-[#FF6A00] text-base tabular-nums">₹{subtotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#171717] border border-[#2A2A2A] text-[11px] text-[#A3A3A3]">
                <ShieldCheck className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span>Zero commission platform. Pay directly upon campus pickup.</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3 px-4 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6A00]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Demo Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onContinueShopping}
                  className="w-full py-2 text-xs font-medium text-[#A3A3A3] hover:text-white text-center cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
