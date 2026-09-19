import React from 'react';
import { Bell } from 'lucide-react';

export function NoticeTicker() {
  return (
    <section className="my-4 bg-gradient-to-r from-[#00266B] via-[#0B1528] to-[#003B95] text-white py-3 px-4 sm:px-8 border-y border-blue-800/50 shadow-md relative z-10">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <span className="bg-amber-400 text-slate-950 text-[11px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-sm z-10">
          <Bell className="w-3.5 h-3.5 fill-slate-950" /> Notice
        </span>
        <div className="overflow-hidden relative w-full text-xs sm:text-sm font-medium text-slate-200">
          <marquee behavior="scroll" direction="left" scrollamount="6" className="py-0.5">
            <span className="mx-4">
              📢 <strong>Revision in Term Deposit Rates:</strong> Earn up to <strong>8.25% p.a.</strong> on Fixed Deposits and <strong>8.50% p.a.</strong> for Senior Citizens w.e.f. Q1 FY 2026-27.
            </span>
            <span className="mx-4 text-amber-300">
              🛡️ <strong>Statutory Membership:</strong> Associate Membership fee of ₹ 200 registered under 2013 &amp; 2014 Rules respectively. Reg. No. U64199OD2026PLC054968.
            </span>
            <span className="mx-4 text-emerald-300">
              🔒 <strong>Cyber Advisory:</strong> Utkal Finance never solicits your confidential OTP, UPI PIN, or netbanking passwords over telephone or SMS.
            </span>
            <span className="mx-4">
              📄 <strong>Form Center:</strong> Download the official 2-Page Membership Application Document online for quick doorstep verification.
            </span>
            <span className="mx-4 text-sky-300">
              ⚠️ <strong>Official Verification Alert:</strong> Utkal Finance offers instant loan applications digitally. We never charge upfront processing fees over phone calls or unauthorized UPI handles.
            </span>
          </marquee>
        </div>
      </div>
    </section>
  );
}
