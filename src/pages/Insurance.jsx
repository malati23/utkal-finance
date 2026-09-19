import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, HeartPulse, Lock, ArrowRight, CheckCircle2, Umbrella, AlertTriangle } from 'lucide-react';

export function Insurance() {
  const insuranceProducts = [
    {
      title: 'Member Life & Credit Protection',
      type: 'Group Life Protection',
      badge: 'Statutory Shield',
      desc: 'Comprehensive coverage safeguarding deposit balances and loan obligations for member families.',
      icon: Shield,
    },
    {
      title: 'Health & Medical Cover',
      type: 'Family Health Insurance',
      badge: 'Cashless Support',
      desc: 'Affordable health insurance plans protecting against medical emergencies with partner hospital networks.',
      icon: HeartPulse,
    },
    {
      title: 'Asset & Enterprise Insurance',
      type: 'Property & Stock Protection',
      badge: 'SME Coverage',
      desc: 'Securing business stock, equipment, and enterprise assets for local small business owners.',
      icon: Umbrella,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* HERO BANNER */}
        <div className="bg-[#0B1528] text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-400 text-slate-950 uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>MEMBER INSURANCE &amp; RISK PROTECTION</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Safeguarding Your Family &amp; Investments
            </h1>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Tailored insurance programs protecting member savings, health, and enterprise capital against unforeseen life events.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Enroll in Protection Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* INSURANCE GRID */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Insurance Protection Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Statutory risk management solutions designed for New Utkal Finance members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insuranceProducts.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-[10px] font-extrabold border border-blue-200 uppercase">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 tracking-tight">{item.title}</h3>
                    <p className="text-xs font-bold text-slate-500">{item.type}</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                  </div>

                  <Link
                    to="/contact"
                    className="pt-2 text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 group"
                  >
                    <span>Request Details</span>
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

export default Insurance;
