import React, { useState } from 'react';
import { Building2, Info, CheckCircle2 } from 'lucide-react';
import { FormSelect } from '../FormSelect';
import { FormInput } from '../FormInput';
import { BRANCH_OPTIONS } from '../../../data/registrationOptions';

export function BranchCashPayment({ branchData = {}, onBranchChange }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
            Pay at Branch Counter
          </h4>
        </div>

        <span className="text-xs font-extrabold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
          Amount: <strong className="text-indigo-700 font-mono text-sm ml-1">₹ 200.00</strong>
        </span>
      </div>

      <p className="text-xs text-slate-500 font-normal">
        Status: <strong className="text-slate-800">Payment will be recorded at the branch counter upon application presentation.</strong>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormSelect
          label="Preferred Branch Location"
          name="branchLocation"
          value={branchData.branchLocation || 'Bhubaneswar HQ (Nayapalli, Khurda)'}
          onChange={(e) => onBranchChange('branchLocation', e.target.value)}
          options={BRANCH_OPTIONS}
          required
        />

        <FormInput
          label="Payment Reference / Receipt No. (Optional)"
          name="branchRef"
          value={branchData.branchRef || ''}
          onChange={(e) => onBranchChange('branchRef', e.target.value)}
          placeholder="e.g. Counter Cash Receipt No."
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="text-[11px] text-slate-500 font-normal flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>Present your application reference number at the counter for cash clearance.</span>
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-all shadow-md shrink-0"
        >
          Submit Branch Payment Details
        </button>
      </div>

      {submitted && (
        <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs p-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Branch counter payment option selected. Click final submit below to generate your reference number.</span>
        </div>
      )}
    </div>
  );
}
