import React from 'react';
import { X, PiggyBank, ShieldCheck, Info } from 'lucide-react';

export function MakeDepositModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 p-6 z-10 animate-fade-in">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Make a Deposit
              </h2>
              <p className="text-xs text-slate-500">
                New Utkal Finance Member Savings & Term Deposit Desk
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Info */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">Account Verification Notice:</span> Direct online gateway deposit collection will be enabled once your membership verification is completed.
          </div>
        </div>

        {/* Bank Transfer Details Placeholder */}
        <div className="mt-4 space-y-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Official Statutory Bank Remittance Details
          </span>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Beneficiary Name</span>
              <span className="font-extrabold text-slate-900">NEW UTKAL FINANCE LIMITED</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Bank</span>
              <span className="font-extrabold text-slate-900">IndusInd Bank</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Account Type</span>
              <span className="font-extrabold text-slate-900">Current Account</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Branch</span>
              <span className="font-extrabold text-slate-900">Bhubaneswar HQ</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 font-medium">Accepted Modes</span>
              <span className="font-extrabold text-blue-700">UPI • IMPS • NEFT • RTGS</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Regulated under MCA Guidelines</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeDepositModal;
