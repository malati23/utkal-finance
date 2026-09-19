import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function ActivationPolicy() {
  return (
    <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-3.5 shadow-2xs">
      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 border border-emerald-400/40 flex items-center justify-center shrink-0">
        <ShieldCheck className="w-6 h-6" />
      </div>

      <div className="space-y-0.5">
        <h4 className="font-extrabold text-xs sm:text-sm text-emerald-950 uppercase tracking-wider">
          Instant Statutory Activation Policy
        </h4>
        <p className="text-xs text-emerald-900/90 font-medium leading-relaxed">
          Once you submit your application and ₹200 fee details, your official membership and Member ID are activated instantly.
        </p>
      </div>
    </div>
  );
}
