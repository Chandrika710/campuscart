import React, { useState } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  Heart,
  User,
  Store,
  Menu,
  X,
  Search,
  Sparkles,
} from 'lucide-react';
import { BuyerUser, SellerUser } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currentUser: BuyerUser | null;
  currentSeller: SellerUser | null;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenBuyerLogin: () => void;
  onOpenBuyerRegister: () => void;
  onOpenSellerPortal: () => void;
  onLogoutBuyer: () => void;
  onLogoutSeller: () => void;
  onScrollToMarketplace: () => void;
  onScrollToCategories: () => void;
  onScrollToHowItWorks: () => void;
  onOpenAI: () => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  currentUser,
  currentSeller,
  onOpenCart,
  onOpenWishlist,
  onOpenBuyerLogin,
  onOpenBuyerRegister,
  onOpenSellerPortal,
  onLogoutBuyer,
  onLogoutSeller,
  onScrollToMarketplace,
  onScrollToCategories,
  onScrollToHowItWorks,
  onOpenAI,
  onSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0B0B]/90 backdrop-blur-md border-b border-[#2A2A2A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Logo & Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] flex items-center justify-center text-white shadow-md shadow-[#FF6A00]/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                  Campus<span className="text-[#FF6A00]">Cart</span>
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#A3A3A3]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
            <button
              onClick={onScrollToMarketplace}
              className="hover:text-[#FF6A00] transition-colors cursor-pointer whitespace-nowrap"
            >
              Explore Products
            </button>
            <button
              onClick={onScrollToCategories}
              className="hover:text-[#FF6A00] transition-colors cursor-pointer whitespace-nowrap"
            >
              Categories
            </button>
            <button
              onClick={onScrollToHowItWorks}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              How It Works
            </button>
            <button
              onClick={onOpenAI}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FF6A00]/10 text-[#FF8C42] border border-[#FF6A00]/25 hover:bg-[#FF6A00]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>CampusCart AI</span>
            </button>
          </nav>

          {/* Zone 3: Actions & Auth */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onSearchClick}
              title="Search marketplace"
              className="p-2 text-[#A3A3A3] hover:text-white hover:bg-[#171717] rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              title="Saved items"
              className="relative p-2 text-[#A3A3A3] hover:text-[#FF6A00] hover:bg-[#171717] rounded-lg transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6A00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              title="Shopping cart"
              className="relative p-2 text-[#A3A3A3] hover:text-[#FF6A00] hover:bg-[#171717] rounded-lg transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6A00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="hidden sm:block h-5 w-[1px] bg-[#2A2A2A] mx-1" />

            {/* Buyer Auth */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-[#A3A3A3] truncate max-w-[100px]" title={currentUser.name}>
                  {currentUser.name.split(' ')[0]}
                </span>
                <button
                  onClick={onLogoutBuyer}
                  className="text-xs text-stone-400 hover:text-red-400 transition-colors cursor-pointer px-2 py-1 rounded bg-[#171717] border border-[#2A2A2A]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={onOpenBuyerLogin}
                  className="px-3 py-1.5 text-xs font-medium text-[#A3A3A3] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  Login
                </button>
                <button
                  onClick={onOpenBuyerRegister}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-[#171717] hover:bg-[#2A2A2A] border border-[#2A2A2A] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Seller Portal Button */}
            <button
              onClick={onOpenSellerPortal}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentSeller
                  ? 'bg-[#FF6A00] text-white hover:bg-[#FF8C42] shadow-sm shadow-[#FF6A00]/25'
                  : 'bg-[#FF6A00]/15 text-[#FF8C42] border border-[#FF6A00]/40 hover:bg-[#FF6A00] hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{currentSeller ? 'Dashboard' : 'Seller'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#A3A3A3] hover:text-white rounded-lg focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171717] border-b border-[#2A2A2A] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#A3A3A3]">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-white cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => {
                onScrollToMarketplace();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#FF6A00] cursor-pointer"
            >
              Explore Products
            </button>
            <button
              onClick={() => {
                onScrollToCategories();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#FF6A00] cursor-pointer"
            >
              Categories
            </button>
            <button
              onClick={() => {
                onScrollToHowItWorks();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-white cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                onOpenAI();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#FF8C42] flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              CampusCart AI Assistant
            </button>
          </div>

          <div className="pt-3 border-t border-[#2A2A2A] flex flex-wrap gap-2">
            {currentUser ? (
              <div className="w-full flex items-center justify-between text-xs text-[#A3A3A3]">
                <span>Logged in as {currentUser.name}</span>
                <button
                  onClick={() => {
                    onLogoutBuyer();
                    setMobileMenuOpen(false);
                  }}
                  className="text-red-400 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    onOpenBuyerLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-xs font-medium text-center text-white bg-[#0B0B0B] border border-[#2A2A2A] rounded-md cursor-pointer"
                >
                  Buyer Login
                </button>
                <button
                  onClick={() => {
                    onOpenBuyerRegister();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-xs font-medium text-center text-white bg-[#2A2A2A] rounded-md cursor-pointer"
                >
                  Register
                </button>
              </>
            )}
            <button
              onClick={() => {
                onOpenSellerPortal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-xs font-semibold text-center text-white bg-[#FF6A00] rounded-md cursor-pointer"
            >
              {currentSeller ? 'Go to Seller Dashboard' : 'Seller Portal (Login / Sell)'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
