import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function DossierStatus({ onAutoFillTestInfo }) {
  return (
    <div className="bg-emerald-950 text-white rounded-2xl p-5 sm:p-6 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-3.5 relative z-10">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-0.5">
          <h4 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
            Application Dossier Ready for Instant Activation
          </h4>
          <p className="text-xs text-emerald-200/90 font-medium leading-relaxed">
            ₹200 Statutory Joining Fee recorded and membership will be activated instantly upon submission.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onAutoFillTestInfo}
        className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black transition-all shadow-md shrink-0 inline-flex items-center gap-1.5 z-10"
      >
        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
        <span>Auto-Fill Test Info</span>
      </button>
    </div>
  );
}
