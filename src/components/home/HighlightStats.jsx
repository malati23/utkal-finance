import React from 'react';
import { Shield, Users, FileDown } from 'lucide-react';

export function HighlightStats() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 sm:-mt-10 mb-6 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-md flex items-center gap-3 hover:shadow-lg transition-all">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 font-bold flex items-center justify-center shrink-0 text-sm">
            ₹
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Associate Membership
            </span>
            <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
              ₹ 200 Only
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-md flex items-center gap-3 hover:shadow-lg transition-all">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Capital Governance
            </span>
            <span className="text-sm font-extrabold text-emerald-700 block mt-0.5">
              ₹ 250+ Cr Assets
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-md flex items-center gap-3 hover:shadow-lg transition-all">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Active Community
            </span>
            <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
              15,000+ Members
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-blue-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 shadow-md flex items-center justify-between gap-3 hover:shadow-lg transition-all">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
              Statutory PDF
            </span>
            <span className="text-sm font-extrabold text-blue-900 block mt-0.5 cursor-pointer hover:underline">
              Download Form
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <FileDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
