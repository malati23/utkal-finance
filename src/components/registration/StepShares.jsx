import React, { useEffect } from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { CreditCard, ArrowRight } from 'lucide-react';

export function StepShares({ data = {}, errors = {}, onChange, onGoToStep }) {
  const repaymentPreference = data.repaymentPreference || 'First depositor';
  const numberOfShares = Math.max(1, parseInt(data.numberOfShares || 10, 10) || 10);
  const allocatedShareValue = numberOfShares * 20; // ₹ 20 per share allocation multiplier (10 shares = ₹ 200.00)
  const tdsOption = data.tdsOption || 'No (Form 15G/15H Enclosed)';
  const isTaxExempt = data.noTdsTaxExempt !== false;

  const REPAYMENT_OPTIONS = [
    'First depositor',
    'Either or Survivor',
    'Jointly',
    'Former of Survivor Share',
    'Any one or Supervisor',
  ];

  const TDS_OPTIONS = [
    'No (Form 15G/15H Enclosed)',
    'Yes (Standard TDS Applicable)',
  ];

  useEffect(() => {
    onChange('repaymentPreference', repaymentPreference);
    onChange('numberOfShares', numberOfShares);
    onChange('allocatedShareValue', allocatedShareValue);
    onChange('tdsOption', tdsOption);
  }, [numberOfShares]);

  const handleOptionSelect = (option) => {
    onChange('repaymentPreference', option);
  };

  const handleTdsChange = (e) => {
    const val = e.target.value;
    onChange('tdsOption', val);
    if (val.startsWith('No')) {
      onChange('noTdsTaxExempt', true);
    } else {
      onChange('noTdsTaxExempt', false);
    }
  };

  return (
    <FormSection
      title={
        <span className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-700 inline-block" />
          SHARE HOLDER &amp; STATUS OF THE DEPOSITOR
        </span>
      }
      subtitle="Statutory depositor and share allotment preferences as specified on the statutory form."
    >
      <div className="space-y-6">
        {/* TOP BLUE BANNER BOX: ₹ 200.00 Statutory Membership Admission Charge */}
        <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#004085] text-white font-bold flex items-center justify-center text-lg shrink-0 shadow-xs">
              ₹
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                  ₹ 200.00 Statutory Membership Admission Charge
                </h4>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Statutory Fee
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-2xl">
                Mandatory non-refundable membership admission fee per Nidhi Companies Rules, 2014. Payable in Slide 9 via UPI QR, Razorpay, Card, Net Banking, or Branch Cash.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onGoToStep && onGoToStep(9)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#004085] hover:bg-blue-900 text-white text-xs font-bold transition-all shadow-md shadow-blue-900/20 shrink-0"
          >
            <span>Jump to Slide 9 Payment</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* REPAYMENT PREFERENCE RADIO CARD BOX */}
        <div className="bg-[#FAFAFC] border border-slate-200/80 rounded-2xl p-5 space-y-4">
          <label className="block text-xs font-bold text-slate-800 tracking-wide uppercase">
            REPAYMENT OF DEPOSIT TO BE MADE PAYMENT TO: <span className="text-rose-500 font-extrabold">*</span>
          </label>

          {/* 5 RADIO CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {REPAYMENT_OPTIONS.map((opt) => {
              const isSelected = repaymentPreference === opt;
              return (
                <div
                  key={opt}
                  onClick={() => handleOptionSelect(opt)}
                  className={`bg-white rounded-2xl p-3.5 px-4 border flex items-center gap-3 cursor-pointer transition-all duration-200 select-none
                    ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20 text-slate-900 font-bold shadow-2xs'
                        : 'border-slate-200/90 text-slate-700 hover:border-slate-300 font-medium'
                    }
                  `}
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors
                      ${
                        isSelected
                          ? 'border-blue-700 bg-blue-700 text-white'
                          : 'border-slate-300 bg-white'
                      }
                    `}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs tracking-tight">{opt}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM FIELD GRID (3 COLUMNS) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Share Purchase Quantity */}
          <FormInput
            label="Share Purchase Quantity"
            name="numberOfShares"
            type="number"
            min="1"
            value={numberOfShares}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              onChange('numberOfShares', isNaN(val) ? 1 : val);
            }}
            placeholder="10"
            required
            error={errors.numberOfShares}
          />

          {/* Allocated Share Value (₹) */}
          <FormInput
            label="Allocated Share Value (₹)"
            name="allocatedShareValue"
            value={`₹ ${(allocatedShareValue).toFixed(2)}`}
            readOnly
            disabled
            className="bg-slate-50"
          />

          {/* Tax to be deducted (TDS) */}
          <FormSelect
            label="Tax to be deducted (TDS)"
            name="tdsOption"
            value={tdsOption}
            onChange={handleTdsChange}
            options={TDS_OPTIONS}
            required
            error={errors.tdsOption}
          />
        </div>

        {/* CHECKBOX BELOW FIELDS */}
        <div className="pt-1">
          <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-slate-800">
            <input
              type="checkbox"
              checked={isTaxExempt}
              onChange={(e) => onChange('noTdsTaxExempt', e.target.checked)}
              className="w-4 h-4 rounded text-blue-700 focus:ring-blue-600 border-slate-300"
            />
            <span>Applicable Tax not to be deducted — Form 15G / 15H Enclosed</span>
          </label>
        </div>
      </div>
    </FormSection>
  );
}
