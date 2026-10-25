import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  Info,
} from 'lucide-react';
import { CartItem, OrderConfirmation } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderPlaced: (order: OrderConfirmation) => void;
  buyerName?: string;
  buyerEmail?: string;
}

const PICKUP_SPOTS = [
  'Central University Library Foyer (Ground Floor)',
  'Student Activity Center (SAC) Main Entrance',
  'Hostel Block C Common Lounge Area',
  'Engineering Department Reception Desk',
  'Campus Cafeteria & Food Court Bench 4',
];

const TIME_SLOTS = [
  'Today, 4:00 PM – 5:30 PM (Evening Break)',
  'Today, 6:00 PM – 7:30 PM (Post-Lab Handoff)',
  'Tomorrow, 10:30 AM – 11:30 AM (Morning Recess)',
  'Tomorrow, 1:00 PM – 2:30 PM (Lunch Period)',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderPlaced,
  buyerName = 'Rahul Verma',
  buyerEmail = 'rahul.verma@campus.edu',
}) => {
  const [selectedPickup, setSelectedPickup] = useState(PICKUP_SPOTS[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [name, setName] = useState(buyerName);
  const [email, setEmail] = useState(buyerEmail);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderConfirmation = {
      orderNumber,
      items: [...cartItems],
      subtotal,
      pickupLocation: selectedPickup,
      preferredTime: selectedTime,
      orderDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      customerName: name || 'Campus Student',
      customerEmail: email || 'student@campus.edu',
    };
    setConfirmedOrder(newOrder);
    onOrderPlaced(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#171717] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between bg-[#0B0B0B]/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF6A00]" />
            <h2 className="text-base font-bold text-white">
              {confirmedOrder ? 'Order Confirmation' : 'Demo Campus Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-5">
          {confirmedOrder ? (
            /* Order Placed Success View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FF8C42]">
                  Demo Order Placed Successfully
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  Reference: #{confirmedOrder.orderNumber}
                </h3>
                <p className="text-xs text-[#A3A3A3] max-w-md mx-auto">
                  A reservation request has been created. Connect with the peer seller at the designated campus meetup spot.
                </p>
              </div>

              {/* Order Details Receipt */}
              <div className="bg-[#0B0B0B] border border-[#2A2A2A] rounded-xl p-4 text-left text-xs space-y-3">
                <div className="font-semibold text-white border-b border-[#2A2A2A] pb-2 flex justify-between">
                  <span>Reserved Items ({confirmedOrder.items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="text-[#FF6A00] tabular-nums">Total: ₹{confirmedOrder.subtotal}</span>
                </div>

                <div className="space-y-1.5">
                  {confirmedOrder.items.map((it) => (
                    <div key={it.product.id} className="flex justify-between text-[#A3A3A3]">
                      <span>{it.quantity}x {it.product.name}</span>
                      <span className="text-white tabular-nums">₹{it.product.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#2A2A2A] space-y-1.5 text-stone-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6A00]" />
                    <span><strong>Pickup Location:</strong> {confirmedOrder.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF8C42]" />
                    <span><strong>Preferred Time:</strong> {confirmedOrder.preferredTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#121212] border border-[#2A2A2A] rounded-lg text-[11px] text-[#A3A3A3]">
                * Prototype verification: In the production release, both students receive verification codes to confirm item inspection and safe handoff.
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Back to Campus Marketplace
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              
              {/* Mandatory Demonstration Banner */}
              <div className="p-3.5 rounded-xl bg-[#0B0B0B] border border-[#FF6A00]/40 flex items-start gap-2.5 text-xs text-[#A3A3A3]">
                <Info className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">DEMO CHECKOUT PROTOCOL</strong>
                  This is a hackathon simulation. No credit card or banking details are required or collected. Payment occurs strictly student-to-student during campus meetup.
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="bg-[#0B0B0B] rounded-xl p-4 border border-[#2A2A2A] space-y-3">
                <div className="text-xs font-semibold text-[#FF8C42] uppercase tracking-wider">
                  Order Summary
                </div>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{item.quantity}x</span>
                        <span className="text-[#A3A3A3] truncate max-w-[200px]">{item.product.name}</span>
                      </div>
                      <span className="text-white font-medium tabular-nums">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#2A2A2A] flex justify-between text-sm font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="text-[#FF6A00] tabular-nums">₹{subtotal}</span>
                </div>
              </div>

              {/* Campus Meetup Preference */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6A00]" />
                  <span>Select Campus Pickup Location</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {PICKUP_SPOTS.map((spot) => (
                    <label
                      key={spot}
                      className={`p-2.5 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        selectedPickup === spot
                          ? 'bg-[#0B0B0B] border-[#FF6A00] text-white'
                          : 'bg-[#171717] border-[#2A2A2A] text-[#A3A3A3] hover:text-white'
                      }`}
                    >
                      <span>{spot}</span>
                      <input
                        type="radio"
                        name="pickup"
                        checked={selectedPickup === spot}
                        onChange={() => setSelectedPickup(spot)}
                        className="accent-[#FF6A00]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Preference */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF8C42]" />
                  <span>Select Preferred Meetup Window</span>
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-[#0B0B0B] text-white text-xs px-3 py-2 rounded-lg border border-[#2A2A2A] focus:outline-none focus:border-[#FF6A00] cursor-pointer"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buyer Contact for Meetup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#A3A3A3] block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#A3A3A3] block mb-1">Campus Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>
              </div>

              {/* Place Order CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6A00]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Place Demo Order (₹{subtotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
