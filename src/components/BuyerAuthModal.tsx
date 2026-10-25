import React, { useState } from 'react';
import { X, Eye, EyeOff, ShieldCheck, UserCheck, AlertCircle, Sparkles } from 'lucide-react';
import { BuyerUser } from '../types';

interface BuyerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  onLoginSuccess: (user: BuyerUser) => void;
}

export const BuyerAuthModal: React.FC<BuyerAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('2nd Year');
  const [city, setCity] = useState('');

  if (!isOpen) return null;

  const validateEmail = (val: string) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleQuickFill = () => {
    if (mode === 'login') {
      setEmail('student.demo@campus.edu');
      setPassword('CampusCart2026!');
    } else {
      setFullName('Aditi Verma');
      setEmail('aditi.verma@campus.edu');
      setPassword('CampusCart2026!');
      setConfirmPassword('CampusCart2026!');
      setCollege('Delhi Technological University');
      setDepartment('Computer Engineering');
      setYearOfStudy('3rd Year');
      setCity('Delhi');
    }
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email || !validateEmail(email)) {
      setError('Please provide a valid email address.');
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
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please verify.');
        return;
      }
      if (!college.trim()) {
        setError('College name is required.');
        return;
      }
      if (!department.trim()) {
        setError('Department is required.');
        return;
      }
      if (!city.trim()) {
        setError('City is required.');
        return;
      }

      // Create buyer user (demo - never store plaintext passwords)
      const newUser: BuyerUser = {
        id: `buyer-${Date.now()}`,
        name: fullName,
        email,
        college,
        department,
        yearOfStudy,
        city,
      };

      setSuccessMsg('Account registered successfully! Welcome to CampusCart.');
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
      }, 900);
      return;
    }

    // Login mode
    const demoUser: BuyerUser = {
      id: 'buyer-demo-01',
      name: email.split('@')[0].replace('.', ' '),
      email,
      college: college || 'National Institute of Technology',
      department: department || 'Engineering',
      yearOfStudy: '2nd Year',
      city: city || 'Campus Center',
    };

    setSuccessMsg('Signed in successfully! (Demo Authentication)');
    setTimeout(() => {
      onLoginSuccess(demoUser);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-[#171717] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Switcher */}
        <div className="p-5 border-b border-[#2A2A2A] bg-[#0B0B0B]/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#FF6A00]" />
            <h2 className="text-base font-bold text-white">
              {mode === 'login' ? 'Student Buyer Login' : 'Create Buyer Account'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
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
            Sign In
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
            Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Demo disclaimer */}
          <div className="p-2.5 rounded-lg bg-[#0B0B0B] border border-[#2A2A2A] flex items-center justify-between text-[11px] text-[#A3A3A3]">
            <span>Prototype Demo Authentication</span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[#FF8C42] hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Fill Demo Data</span>
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aditi Verma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                />
              </div>
            )}

            <div>
              <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">Campus Email</label>
              <input
                type="email"
                placeholder="student@campus.edu"
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
                    <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">College / Univ.</label>
                    <input
                      type="text"
                      placeholder="e.g. DTU"
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
                      <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#A3A3A3] block mb-1">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#FF6A00] hover:bg-[#FF8C42] text-white font-semibold text-xs rounded-xl shadow-md shadow-[#FF6A00]/25 transition-all cursor-pointer mt-2"
            >
              {mode === 'login' ? 'Sign In as Buyer' : 'Create Demo Buyer Account'}
            </button>
          </form>

          {/* Navigation between modes */}
          <div className="text-center text-xs text-[#A3A3A3] pt-2 border-t border-[#2A2A2A]">
            {mode === 'login' ? (
              <span>
                New to CampusCart?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className="text-[#FF6A00] font-semibold hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
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
