import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import brandLogo from '../../assets/image copy 7.png';

export function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdmin } = useAdmin();

  const [email, setEmail] = useState('admin@newutkalfinance.com');
  const [password, setPassword] = useState('Admin@123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      if (res.success) {
        navigate('/admin-dashboard');
      } else {
        setError(res.message || 'Invalid email or password');
      }
      setLoading(false);
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
            >
              <img src={brandLogo} alt="Logo" className="w-full h-full object-contain" />
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
              <span>SECURE ADMINISTRATIVE PORTAL</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Management &amp; Statutory Governance
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              Manage statutory membership applications, verify KYC documents, track equity investments, and control board notices securely.
            </p>
          </div>

          {/* Bottom Info */}
          <div className="space-y-2 relative z-10 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 text-left">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Certified under Section 406 Companies Act 2013</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Reg No.: U64199OD2026PLC054968</p>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6 text-left bg-slate-900/60">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Admin Sign In</h3>
            <p className="text-slate-400 text-xs font-normal">Enter your administrative credentials to proceed.</p>
          </div>

          {/* DEMO CREDENTIALS BOX */}
          <div className="bg-blue-950/40 border border-blue-800/50 rounded-2xl p-3.5 space-y-1 text-xs">
            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block">DEMO LOGIN CREDENTIALS</span>
            <div className="font-mono text-[11px] text-slate-300 space-y-0.5">
              <p>Email: <strong className="text-white">admin@newutkalfinance.com</strong></p>
              <p>Password: <strong className="text-white">Admin@123</strong></p>
            </div>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 flex items-center gap-2 text-rose-400 text-xs font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@newutkalfinance.com"
                  className="w-full bg-[#051124] text-white text-xs rounded-xl pl-10 pr-4 py-3 border border-slate-700 focus:border-blue-500 focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#051124] text-white text-xs rounded-xl pl-10 pr-4 py-3 border border-slate-700 focus:border-blue-500 focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-[#051124] text-blue-600 focus:ring-0"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Demo Password: Admin@123')}
                className="text-blue-400 hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004085] hover:bg-blue-900 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 cursor-pointer mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>SIGN IN TO DASHBOARD</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs text-slate-400 hover:text-white font-semibold transition-colors"
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
