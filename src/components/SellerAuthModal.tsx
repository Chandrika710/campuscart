import React, { useState } from 'react';
import {
  X,
  Eye,
  EyeOff,
  Store,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';
import { SellerUser } from '../types';
import { DEMO_SELLER_USER } from '../data/sampleProducts';

interface SellerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSellerLoginSuccess: (seller: SellerUser) => void;
}

export const SellerAuthModal: React.FC<SellerAuthModalProps> = ({
  isOpen,
  onClose,
  onSellerLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('3rd Year (Junior)');
  const [city, setCity] = useState('');
  const [payoutPlaceholder, setPayoutPlaceholder] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  if (!isOpen) return null;

  const handleFillDemoSeller = () => {
    if (mode === 'login') {
      setEmail(DEMO_SELLER_USER.email);
      setPassword('CampusSeller2026!');
    } else {
      setFullName('Devika Singhania');
      setEmail('devika.singh@campus.edu');
      setPhone('+91 98765 43210');
      setPassword('CampusSeller2026!');
      setConfirmPassword('CampusSeller2026!');
      setCollege('National Institute of Technology');
      setDepartment('Computer Science & Engineering');
      setYearOfStudy('3rd Year (Junior)');
      setCity('Bengaluru');
      setPayoutPlaceholder('devika.nit@upi (Simulated)');
      setAgreedTerms(true);
    }
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid campus seller email.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (mode === 'register') {
      if (!fullName.trim()) {
        setError('Full Name is required.');
        return;
      }
      if (!phone.trim()) {
        setError('Contact phone is required for student meetups.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!college.trim()) {
        setError('College is required.');
        return;
      }
      if (!agreedTerms) {
        setError('Please accept the campus community guidelines & terms.');
        return;
      }

      const newSeller: SellerUser = {
        id: `seller-${Date.now()}`,
        name: fullName,
        email,
        phone,
        college,
        department,
        yearOfStudy,
        city,
        payoutPlaceholder: payoutPlaceholder || 'student.demo@upi (Simulated)',
      };

      onSellerLoginSuccess(newSeller);
      onClose();
      return;
    }

    // Login mode
    const seller: SellerUser = {
      ...DEMO_SELLER_USER,
      email,
    };
    onSellerLoginSuccess(seller);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[#171717] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2A2A2A] bg-[#0B0B0B]/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#FF6A00]" />
            <div>
              <h2 className="text-base font-bold text-white">
                {mode === 'login' ? 'Seller Portal Login' : 'Register as Campus Seller'}
              </h2>
              <span className="text-[11px] text-[#A3A3A3] block">List and monetize unused study essentials</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#2A2A2A] bg-[#0B0B0B]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2.5 text-xs font-semibold text-center transition-colors cursor-pointer ${
              mode === 'login'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00] bg-[#171717]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Seller Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex-1 py-2.5 text-xs font-semibold text-center transition-colors cursor-pointer ${
              mode === 'register'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00] bg-[#171717]'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Create Seller Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Quick Fill Demo Helper */}
          <div className="p-2.5 rounded-lg bg-[#0B0B0B] border border-[#2A2A2A] flex items-center justify-between text-[11px] text-[#A3A3A3]">
            <span>Hackathon Quick-Access</span>
            <button
              type="button"
              onClick={handleFillDemoSeller}
              className="text-[#FF8C42] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Fill Demo Seller Info</span>
            </button>
          </div>

          {/* Prominent Mandatory Security Warning */}
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold">
                DEMO ONLY — DO NOT ENTER REAL BANK DETAILS.
              </strong>
              <span>
                Do not collect, store, or enter real bank account numbers, IFSC codes, passwords, or payment credentials.
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Devika Singhania"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">Mobile Phone (Meetup)</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">Seller Campus Email</label>
              <input
                type="email"
                placeholder="seller@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00] pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00] pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-white cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">College</label>
                    <input
                      type="text"
                      placeholder="e.g. NIT Bengaluru"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">Department</label>
                    <input
                      type="text"
                      placeholder="e.g. CSE"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">Year of Study</label>
                    <select
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                      className="w-full px-2.5 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00] cursor-pointer"
                    >
                      <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                      <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                      <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                      <option value="4th Year (Senior)">4th Year (Senior)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                </div>

                {/* Simulated Payout Info */}
                <div className="p-3 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] space-y-2">
                  <div className="text-[11px] font-semibold text-[#FF8C42] uppercase tracking-wider">
                    Simulated Payout Preference (Fictional Placeholder Only)
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. student@upi (Demo only)"
                    value={payoutPlaceholder}
                    onChange={(e) => setPayoutPlaceholder(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171717] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                  />
                  <span className="text-[10px] text-[#A3A3A3] block">
                    * Used strictly for mock display in the seller dashboard. No banking credentials accepted.
                  </span>
                </div>

                {/* Terms Acceptance */}
                <label className="flex items-start gap-2 text-xs text-[#A3A3A3] cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="accent-[#FF6A00] mt-0.5"
                  />
                  <span>
                    I agree to honest item descriptions, on-campus public meetups, and CampusCart community rules.
                  </span>
                </label>
              </>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#FF6A00] hover:bg-[#FF8C42] text-white font-semibold text-xs rounded-xl shadow-md shadow-[#FF6A00]/25 transition-all cursor-pointer mt-2"
            >
              {mode === 'login' ? 'Enter Seller Dashboard' : 'Complete Seller Registration'}
            </button>
          </form>

          {/* Navigation link */}
          <div className="text-center text-xs text-[#A3A3A3] pt-2 border-t border-[#2A2A2A]">
            {mode === 'login' ? (
              <span>
                Want to become a campus seller?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className="text-[#FF6A00] font-semibold hover:underline cursor-pointer"
                >
                  Create seller profile
                </button>
              </span>
            ) : (
              <span>
                Already registered as seller?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className="text-[#FF6A00] font-semibold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
