import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Repeat, Users, Tag } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/sampleProducts';

interface HeroProps {
  onExploreProducts: () => void;
  onStartSelling: () => void;
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onStartSelling,
  onOpenAI,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] border-b border-[#2A2A2A] pt-10 pb-16 lg:pt-14 lg:pb-20">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF6A00]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171717] border border-[#2A2A2A] text-xs font-medium text-[#FF8C42]">
              <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
              <span className="tracking-wide uppercase font-semibold">Your Campus · Your Marketplace</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              STUDY <span className="text-[#FF6A00]">ESSENTIALS</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-sm sm:text-base font-semibold tracking-wider text-[#FF8C42] uppercase">
              BOOKS, CALCULATORS, LAB COATS, NOTES — BUY &amp; SELL WITHIN YOUR STUDENT COMMUNITY.
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#A3A3A3] max-w-2xl leading-relaxed">
              Save money on college essentials. Give your unused items a second life. Built for students, powered by community.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 rounded-lg bg-[#FF6A00] hover:bg-[#FF8C42] text-white font-semibold text-sm shadow-lg shadow-[#FF6A00]/25 transition-all transform active:scale-[0.98] cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartSelling}
                className="px-6 py-3.5 rounded-lg bg-[#171717] hover:bg-[#2A2A2A] text-white font-semibold text-sm border border-[#2A2A2A] hover:border-[#FF6A00]/50 transition-all cursor-pointer whitespace-nowrap"
              >
                Start Selling
              </button>

              <button
                onClick={onOpenAI}
                className="px-4 py-3 rounded-lg bg-[#171717] hover:bg-[#222222] text-[#FF8C42] text-xs font-medium border border-[#FF6A00]/30 transition-all cursor-pointer flex items-center gap-1.5"
                title="Search with CampusCart AI"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask CampusCart AI</span>
              </button>
            </div>

            {/* Key Trust & Community Anchors */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2A2A2A] max-w-xl">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">70%+</div>
                <div className="text-xs text-[#A3A3A3]">Avg. Student Savings</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-[#FF6A00] tabular-nums">₹0 Fee</div>
                <div className="text-xs text-[#A3A3A3]">Zero Platform Cuts</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">100%</div>
                <div className="text-xs text-[#A3A3A3]">Campus Handoffs</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#171717] border border-[#2A2A2A] shadow-2xl group">
              <img
                src={HERO_BANNER_IMAGE}
                alt="Campus college study essentials including textbook, calculator, compass, and notebook"
                className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/30 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#171717]/90 backdrop-blur-md border border-[#2A2A2A] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#FF8C42] uppercase tracking-wider block">Verified Student Listings</span>
                  <span className="text-sm font-bold text-white block">Engineering &amp; Science Essentials</span>
                  <span className="text-xs text-[#A3A3A3]">From ₹80 · Pick up today at library or SAC</span>
                </div>
                <button
                  onClick={onExploreProducts}
                  className="px-3 py-1.5 bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Browse Now
                </button>
              </div>
            </div>

            {/* Floating verification badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#171717] border border-[#2A2A2A] px-3.5 py-2 rounded-lg items-center gap-2 shadow-lg">
              <ShieldCheck className="w-4 h-4 text-[#FF6A00]" />
              <span className="text-xs font-medium text-white">Student-to-Student Direct</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
