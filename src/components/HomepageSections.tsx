import React from 'react';
import {
  BookOpen,
  DollarSign,
  Repeat,
  Users,
  Sparkles,
  ShieldCheck,
  Search,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Lock,
  Database,
  CreditCard,
  MapPin,
  Bot,
  Mail,
  GraduationCap,
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HomepageSectionsProps {
  onSelectCategory: (category: ProductCategory | 'All') => void;
  onStartSelling: () => void;
  onExploreProducts: () => void;
  onOpenAI: () => void;
}

export const HomepageSections: React.FC<HomepageSectionsProps> = ({
  onSelectCategory,
  onStartSelling,
  onExploreProducts,
  onOpenAI,
}) => {
  return (
    <div className="space-y-20 py-12">
      
      {/* 1. HOW IT WORKS */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-semibold text-[#FF8C42] uppercase tracking-wider">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How CampusCart Works
          </h2>
          <p className="text-sm text-[#A3A3A3]">
            Peer-to-peer student transactions with zero shipping fees, zero middlemen, and instant campus pickup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#171717] border border-[#2A2A2A] relative group hover:border-[#FF6A00]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-[#FF6A00] flex items-center justify-center font-bold text-sm mb-4">
              01
            </div>
            <h3 className="text-base font-semibold text-white mb-2">List or Discover</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Sellers upload unused textbooks or calculators in 60 seconds. Buyers browse verified listings at up to 75% off.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171717] border border-[#2A2A2A] relative group hover:border-[#FF6A00]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-[#FF6A00] flex items-center justify-center font-bold text-sm mb-4">
              02
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Connect Securely</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Send direct purchase requests or chat with peers to agree on pricing and a public campus meetup point.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171717] border border-[#2A2A2A] relative group hover:border-[#FF6A00]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-[#FF6A00] flex items-center justify-center font-bold text-sm mb-4">
              03
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Campus Handoff</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Meet between lectures at the college library, student center, or canteen. Inspect the book before finalizing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171717] border border-[#2A2A2A] relative group hover:border-[#FF6A00]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-[#FF6A00] flex items-center justify-center font-bold text-sm mb-4">
              04
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Save &amp; Reuse</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Sellers pocket extra cash while buyers save hundreds on semester essentials, keeping useful paper &amp; gear in circulation.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHY CAMPUSCART */}
      <section className="bg-[#121212] border-y border-[#2A2A2A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[#FF8C42] uppercase tracking-wider block">
                The Community Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Why Students Choose CampusCart
              </h2>
            </div>
            <p className="text-sm text-[#A3A3A3] max-w-md">
              Commercial platforms charge steep listing cuts and slow deliveries. CampusCart is built strictly by students for students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF6A00]/15 text-[#FF8C42] flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Affordable Education</h4>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Slashing semester book budgets from ₹4,000+ down to ₹800 through direct peer circularity.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF6A00]/15 text-[#FF8C42] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Student Earnings</h4>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Clear out old semesters and earn real pocket money for exam fees, cafeteria meals, and project parts.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF6A00]/15 text-[#FF8C42] flex items-center justify-center">
                <Repeat className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Reuse Over Waste</h4>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Prevent durable engineering instruments, lab coats, and paper notes from ending up discarded in dorm dumpsters.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF6A00]/15 text-[#FF8C42] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Campus Community</h4>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Meet seniors who have already aced your exact course and get valuable study advice along with the textbook.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF6A00]/15 text-[#FF8C42] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">AI-Assisted Discovery</h4>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Smart catalogue matching answers natural questions like &quot;CSE books under ₹300&quot; without hassle.
              </p>
            </div>

          </div>

          {/* Illustrative Demo Metrics Strip */}
          <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="text-[#A3A3A3]">
              * Metrics below are <strong>illustrative hackathon demo figures</strong> for prototype modeling:
            </span>
            <div className="flex items-center gap-6 text-white font-medium">
              <span><strong>1,240+</strong> Active Students</span>
              <span><strong>890+</strong> Items Exchanged</span>
              <span><strong>₹3.8 Lakh</strong> Student Savings</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXAM HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#1C1C1C] to-[#121212] border border-[#2A2A2A] p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FF6A00]/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0B0B] border border-[#2A2A2A] text-xs font-semibold text-[#FF8C42]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exam Prep &amp; Midterm Hub</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Preparing for Upcoming Midterms or Lab Practicals?
            </h2>

            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              Don&apos;t get caught without an approved scientific calculator, lab record manual, or previous year solved question banks. Filter directly into critical exam supplies:
            </p>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => onSelectCategory('Textbooks')}
                className="px-4 py-2 bg-[#0B0B0B] hover:bg-[#FF6A00] hover:text-white text-white text-xs font-semibold rounded-lg border border-[#2A2A2A] transition-colors cursor-pointer"
              >
                Core Textbooks
              </button>
              <button
                onClick={() => onSelectCategory('Calculators')}
                className="px-4 py-2 bg-[#0B0B0B] hover:bg-[#FF6A00] hover:text-white text-white text-xs font-semibold rounded-lg border border-[#2A2A2A] transition-colors cursor-pointer"
              >
                Scientific Calculators
              </button>
              <button
                onClick={() => onSelectCategory('Notes and Study Materials')}
                className="px-4 py-2 bg-[#0B0B0B] hover:bg-[#FF6A00] hover:text-white text-white text-xs font-semibold rounded-lg border border-[#2A2A2A] transition-colors cursor-pointer"
              >
                Senior Notes &amp; Solved Papers
              </button>
              <button
                onClick={() => onSelectCategory('Lab Coats')}
                className="px-4 py-2 bg-[#0B0B0B] hover:bg-[#FF6A00] hover:text-white text-white text-xs font-semibold rounded-lg border border-[#2A2A2A] transition-colors cursor-pointer"
              >
                Lab Coats &amp; Goggles
              </button>
              <button
                onClick={() => onSelectCategory('Engineering Drawing Instruments')}
                className="px-4 py-2 bg-[#0B0B0B] hover:bg-[#FF6A00] hover:text-white text-white text-xs font-semibold rounded-lg border border-[#2A2A2A] transition-colors cursor-pointer"
              >
                Graphics Drafting Sets
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FUTURE SCOPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-semibold text-[#FF8C42] uppercase tracking-wider block">
            Roadmap &amp; Scalability
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            CampusCart Future Scope
          </h2>
          <p className="text-sm text-[#A3A3A3] mt-1">
            Planned technological enhancements for cross-university multi-campus deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Mail className="w-4 h-4 text-[#FF6A00]" />
              <span>Verified College Email Accounts</span>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Mandatory .edu and .ac.in OAuth domain verification ensuring only authentic university students can access the private peer network.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Lock className="w-4 h-4 text-[#FF6A00]" />
              <span>Real Production Auth &amp; MFA</span>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Hardware-key biometric authentication, tokenized session handling, and phone number verification for meetup security.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Database className="w-4 h-4 text-[#FF6A00]" />
              <span>Multi-Region Shared Database</span>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Scalable PostgreSQL instance with real-time replication, indexing across department curricula, and automated listing expiry.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <CreditCard className="w-4 h-4 text-[#FF6A00]" />
              <span>Escrow Payment Integration</span>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              UPI and instant card hold escrow: payment is only released to the seller once the buyer scans a QR code upon physical item inspection.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <MapPin className="w-4 h-4 text-[#FF6A00]" />
              <span>Smart Locker &amp; Pickup Lockers</span>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Partnering with college student unions to offer secure pass-code lockers in libraries for asynchronous handoffs when schedules conflict.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#171717] border border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Bot className="w-4 h-4 text-[#FF6A00]" />
              <span>Syllabus AI Matching</span>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Upload your semester course PDF; Gemini will automatically identify required textbooks and reserve matching copies from senior listings.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-[#0B0B0B] border-t border-[#2A2A2A] pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FF6A00] flex items-center justify-center text-white font-bold">
                  CC
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Campus<span className="text-[#FF6A00]">Cart</span>
                </span>
              </div>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Your Campus. Your Marketplace. A student-to-student platform engineered to reduce educational expenses and encourage reuse.
              </p>
              <div className="text-[11px] text-[#A3A3A3]">
                College Hackathon Edition · Prototype Demonstration
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2 text-xs">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
                Marketplace
              </h4>
              <ul className="space-y-1.5 text-[#A3A3A3]">
                <li>
                  <button onClick={onExploreProducts} className="hover:text-white cursor-pointer">
                    Explore Textbooks
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('Calculators')} className="hover:text-white cursor-pointer">
                    Scientific Calculators
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('Lab Equipment')} className="hover:text-white cursor-pointer">
                    Lab Kits &amp; Glassware
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('Notes and Study Materials')} className="hover:text-white cursor-pointer">
                    Semester Notes
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Community & Sellers */}
            <div className="space-y-2 text-xs">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
                Students &amp; Sellers
              </h4>
              <ul className="space-y-1.5 text-[#A3A3A3]">
                <li>
                  <button onClick={onStartSelling} className="hover:text-white cursor-pointer">
                    Seller Portal
                  </button>
                </li>
                <li>
                  <button onClick={onOpenAI} className="hover:text-white cursor-pointer">
                    CampusCart AI Search
                  </button>
                </li>
                <li>
                  <span className="text-[#A3A3A3]">Campus Meetup Safety</span>
                </li>
                <li>
                  <span className="text-[#A3A3A3]">Academic Integrity Policy</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Hackathon Disclaimer */}
            <div className="space-y-2 text-xs">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
                Hackathon Project Notice
              </h4>
              <p className="text-[11px] text-[#A3A3A3] leading-relaxed">
                CampusCart is a college hackathon project demonstration. Simulated data, fictional payout placeholders, and mock transactions ensure safe prototype evaluation.
              </p>
              <div className="text-[#FF8C42] text-[11px] font-semibold">
                Built with React, TypeScript &amp; Vite.
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A3A3A3] gap-3">
            <div>
              &copy; {new Date().getFullYear()} CampusCart. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy (Demo)</span>
              <span>·</span>
              <span>Terms of Service</span>
              <span>·</span>
              <span>Zero-Commission Pledge</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
