import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Info } from 'lucide-react';

export function RazorpayPayment() {
  const [demoMessage, setDemoMessage] = useState(false);

  const handleRazorpayClick = () => {
    setDemoMessage(true);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs animate-fade-in text-center flex flex-col items-center justify-center min-h-[220px]">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
        <ShieldCheck className="w-7 h-7" />
      </div>

      <div className="space-y-1 max-w-md">
        <h4 className="font-extrabold text-base text-slate-900">
          Pay securely using Razorpay
        </h4>
        <p className="text-xs text-slate-500 font-normal">
          Supports Credit/Debit Cards, Net Banking, UPI, and Wallet payments via Razorpay Gateway.
        </p>
      </div>

      <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 font-sans">
        Payable Amount: <span className="text-blue-700 font-extrabold text-sm ml-1">₹ 200.00</span>
      </div>

      <button
        type="button"
        onClick={handleRazorpayClick}
        className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md shadow-blue-700/20 inline-flex items-center gap-2"
      >
        <span>Proceed with Razorpay</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {demoMessage && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 text-xs p-3 rounded-xl flex items-center gap-2 max-w-md text-left">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Razorpay integration will be connected when the backend payment system is implemented.</span>
        </div>
      )}
    </div>
  );
}
