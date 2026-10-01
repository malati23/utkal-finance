import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import brandLogo from '../../assets/image copy 7.png';

import { useMemberAuth } from '../../hooks/useMemberAuth';
import { useAdmin } from '../../context/AdminContext';
import { adminLogin } from '../../auth/adminAuth';

/**
 * MemberLogin Page (/member-login)
 * Role-based authentication portal for New Utkal Finance members and administrators.
 */
export function MemberLogin() {
  const navigate = useNavigate();
  const { login } = useMemberAuth();
  const { loginAdmin } = useAdmin();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanIdentifier = identifier.trim();
    if (!cleanIdentifier) {
      setError('Please enter your Member ID, registered Email, or Admin ID.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Role-based Check: Test Administrator credentials first
      const adminAuthRes = adminLogin(cleanIdentifier, password);
      if (adminAuthRes && adminAuthRes.success) {
        if (loginAdmin) {
          loginAdmin(cleanIdentifier, password);
        }
        navigate('/admin-dashboard');
        return;
      }

      // 2. Member Portal Authentication API
      const res = await login(cleanIdentifier, password);

      // Check role returned from backend API
      if (res && (res.role === 'admin' || res.user?.role === 'admin')) {
        adminLogin(cleanIdentifier, password);
        if (loginAdmin) {
          loginAdmin(cleanIdentifier, password);
        }
        navigate('/admin-dashboard');
      } else {
        navigate('/member-dashboard');
      }
    } catch (err) {
      // Fallback check for admin in case backend is unreachable or local prototype match
      const adminFallback = adminLogin(cleanIdentifier, password);
      if (adminFallback && adminFallback.success) {
        if (loginAdmin) {
          loginAdmin(cleanIdentifier, password);
        }
        navigate('/admin-dashboard');
        return;
      }

      console.error('Login error:', err);
      setError(err.message || 'Invalid Member ID, Email Address, or Password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Background Decorative Lighting Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* TOP BAR / NAVIGATE BACK TO WEBSITE */}
      <header className="relative z-10 p-4 sm:p-6 flex items-center justify-between max-w-6xl w-full mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors bg-slate-800/80 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Main Website</span>
        </Link>
      </header>

      {/* MAIN CARD CONTAINER */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-fade-in space-y-6">
          {/* BRANDING & LOGO */}
          <div className="text-center space-y-3">
            <div className="inline-flex p-2 bg-[#0B1528] rounded-2xl border border-slate-800 shadow-md">
              <img
                src={brandLogo}
                alt="New Utkal Finance Emblem"
                className="w-12 h-12 object-contain"
              />
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                NEW UTKAL <span className="text-blue-700">FINANCE LTD.</span>
              </h1>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">
                TRUST • GROWTH • PROSPERITY
              </p>
            </div>
          </div>

          {/* ERROR ALERT */}
          {error && (
            <div className="p-3 rounded-xl text-xs bg-rose-50 border border-rose-200 text-rose-700 font-semibold flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* MEMBER ID OR EMAIL */}
            <div className="space-y-1.5">
              <label
                htmlFor="identifier"
                className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700"
              >
                Member ID or Email Address
              </label>
              <div className="relative">
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. NUF-M-0001 or member@example.com"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] font-bold text-blue-700 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your member password"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* REMEMBER ME & HINTS */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-[11px] font-medium">Remember this device</span>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black text-white bg-blue-700 hover:bg-blue-800 active:scale-[0.99] transition-all shadow-md shadow-blue-700/20 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 p-4 text-center text-[11px] text-slate-400">
        © {new Date().getFullYear()} NEW UTKAL FINANCE LIMITED • All Rights Reserved
      </footer>

      {/* FORGOT PASSWORD MODAL */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setForgotModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl z-10 space-y-4">
            <h3 className="text-base font-black text-slate-900">
              Password Assistance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To reset your member password, please contact your registered branch administrator or call our helpline with your Member ID and registered mobile number.
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="text-slate-500 font-medium">Head Office Support:</div>
              <div className="font-bold text-slate-800">+91 98613 74251</div>
              <div className="text-slate-500">support@utkalfinance.com</div>
            </div>
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberLogin;
