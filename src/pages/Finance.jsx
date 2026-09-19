import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, TrendingUp, ShieldCheck, ArrowRight, DollarSign, Wallet, FileText } from 'lucide-react';

export function Finance() {
  const financeProducts = [
    {
      title: 'Fixed Deposits (FD)',
      rate: 'Up to 8.25% p.a.',
      badge: 'High Yield',
      desc: 'Secure term deposits with attractive quarterly compounding returns for members.',
      icon: Landmark,
    },
    {
      title: 'Recurring Deposits (RD)',
      rate: 'Up to 8.00% p.a.',
      badge: 'Flexible Monthly',
      desc: 'Systematic monthly savings plan tailored for disciplined financial growth.',
      icon: Wallet,
    },
    {
      title: 'Micro-Credit & SME Loans',
      rate: 'Competitive Interest',
      badge: 'Fast Approval',
      desc: 'Affordable credit solutions for local enterprises and agricultural entrepreneurs in Odisha.',
      icon: TrendingUp,
    },
    {
      title: 'Savings Account',
      rate: '4.50% p.a.',
      badge: 'Zero Maintenance',
      desc: 'Member baseline savings account with free digital passbook and door-step service.',
      icon: DollarSign,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* HERO BANNER */}
        <div className="bg-[#0B1528] text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FINANCIAL SERVICES PORTFOLIO</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ethical Financial Solutions Rooted in Trust &amp; Stability
            </h1>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Empowering members across Odisha with high-yield deposit schemes, transparent micro-lending options, and strict compliance under Section 406 of the Companies Act 2013.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Become a Member</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/brochure"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>View Corporate Brochure</span>
              </Link>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our Core Financial Offerings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Designed to serve associate members with institutional compliance and capital safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financeProducts.map((prod, idx) => {
              const Icon = prod.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-[10px] font-extrabold border border-amber-200 uppercase">
                        {prod.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 tracking-tight">{prod.title}</h3>
                    <div className="text-xs font-extrabold text-emerald-700 font-mono">{prod.rate}</div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{prod.desc}</p>
                  </div>

                  <Link
                    to="/register"
                    className="pt-2 text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 group"
                  >
                    <span>Apply for Membership</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;
