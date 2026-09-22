import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import brandLogo from '../../assets/image copy 7.png';

/**
 * IMPORTANT: This is frontend-only prototype authentication. For production, authenticate
 * through a backend with hashed passwords, secure sessions/JWT, role-based authorization,
 * HTTPS and server-side route protection.
 */
export function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAdmin } = useAdmin();

  // DEMO ONLY: credentials are pre-filled for client presentation.
  // Replace/remove these values before production deployment.
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || 'admin@newutkalfinance.com');
  const [password, setPassword] = useState(import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Target path after successful login
  const from = location.state?.from?.pathname || '/admin-dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setError('Invalid admin email or password.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Invalid admin email or password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const res = loginAdmin(cleanEmail, password);
      if (res.success) {
        setSuccessMsg('Login successful');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 500);
      } else {
        setError('Invalid admin email or password.');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#051124] text-slate-100 flex items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-4xl bg-[#0B1528] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT BRANDING PANEL */}
        <div className="p-8 lg:p-12 bg-gradient-to-br from-[#0B1528] via-slate-900 to-[#0B1528] border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between space-y-8 relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <div 
              onClick={() => navigate('/')}
              className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 p-1.5 flex items-center justify-center shrink-0 cursor-pointer shadow-lg"
              title="Return to Home"
            >
              <img src={brandLogo} alt="New Utkal Finance Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black text-white tracking-tight">NEW UTKAL <span className="text-blue-400">FINANCE LTD.</span></h1>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Nidhi Limited Portal</p>
            </div>
          </div>

          {/* Middle Pitch */}
          <div className="space-y-3 text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-500/10 text-blue-400 border border-blue-400/30 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin access only</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Admin Login &amp; Management Portal
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              Secure access for authorized administrative personnel to manage statutory applications, member records, deposits, transactions, and board notices.
            </p>
          </div>

          {/* Bottom Info */}
          <div className="space-y-2 relative z-10 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 text-left">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Certified under Section 406 Companies Act 2013</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Reg No.: U64199OD2026PLC054968</p>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6 text-left bg-white text-slate-900">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Admin Login</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200">
                Admin access only
              </span>
            </div>
            <p className="text-slate-500 text-xs font-normal">Enter your administrative credentials to log in.</p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center gap-2.5 text-rose-700 text-xs font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-emerald-700 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  disabled={loading}
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-10 pr-4 py-3 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={loading}
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-10 pr-10 py-3 border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004085] hover:bg-blue-900 disabled:bg-blue-900/60 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-900/20 cursor-pointer disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors cursor-pointer"
            >
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
