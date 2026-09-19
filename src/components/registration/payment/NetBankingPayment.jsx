import React, { useState } from 'react';
import { Landmark, Info } from 'lucide-react';
import { FormSelect } from '../FormSelect';

export function NetBankingPayment({ bankData = '', onBankChange }) {
  const [demoMessage, setDemoMessage] = useState(false);

  const BANK_OPTIONS = [
    'State Bank of India (SBI)',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Bank of Baroda',
    'Punjab National Bank (PNB)',
    'Canara Bank',
    'Other Bank',
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs animate-fade-in">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Landmark className="w-5 h-5 text-amber-600" />
        <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
          Internet Banking Selection
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormSelect
          label="Select Your Bank"
          name="netBank"
          value={bankData}
          onChange={(e) => onBankChange(e.target.value)}
          options={BANK_OPTIONS}
          icon={Landmark}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="text-[11px] text-slate-500 font-normal flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>Frontend demo only. You will be redirected to bank portal when backend integration is connected.</span>
        </div>

        <button
          type="button"
          onClick={() => setDemoMessage(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-md shrink-0"
        >
          Continue with Net Banking
        </button>
      </div>

      {demoMessage && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 text-xs p-3 rounded-xl">
          ✓ Selected bank recorded for frontend review.
        </div>
      )}
    </div>
  );
}
