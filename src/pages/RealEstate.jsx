import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Home as HomeIcon, MapPin, ShieldCheck, ArrowRight, CheckCircle2, Key } from 'lucide-react';

export function RealEstate() {
  const properties = [
    {
      title: 'Commercial HQ Hub - Nayapalli',
      location: 'IRC Village, Bhubaneswar',
      type: 'Commercial Leasing & Office Spaces',
      desc: 'Prime corporate office suites equipped with digital infrastructure and statutory facilities.',
      badge: 'Bhubaneswar HQ',
    },
    {
      title: 'Residential Housing Assistance',
      location: 'Cuttack & Khordha Regions',
      type: 'Member Housing Micro-Credit',
      desc: 'Financial support and advisory for property acquisition and residential construction.',
      badge: 'Member Exclusive',
    },
    {
      title: 'Institutional Branch Facilities',
      location: 'Berhampur & Sambalpur',
      type: 'Branch Network Infrastructure',
      desc: 'Institutional infrastructure serving associate members across major Odisha hubs.',
      badge: 'Regional Network',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* HERO BANNER */}
        <div className="bg-[#0B1528] text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-400 text-slate-950 uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5" />
              <span>REAL ESTATE &amp; PROPERTY ADVISORY</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Institutional Property &amp; Infrastructure Solutions
            </h1>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Transparent real estate advisory, commercial lease management, and member housing finance support across key urban centers in Odisha.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="bg-emerald-600 hover:bg-emerald-700 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Contact Real Estate Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* PROPERTY LISTING GRID */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Property &amp; Infrastructure Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verified corporate assets and member housing credit facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((prop, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                      <HomeIcon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-[10px] font-extrabold border border-blue-200 uppercase">
                      {prop.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight">{prop.title}</h3>
                  <div className="text-xs font-bold text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{prop.location}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{prop.type}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{prop.desc}</p>
                </div>

                <Link
                  to="/contact"
                  className="pt-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealEstate;
