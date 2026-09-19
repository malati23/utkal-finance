import React from 'react';
import { CreditCard } from 'lucide-react';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { UpiPayment } from './UpiPayment';
import { RazorpayPayment } from './RazorpayPayment';
import { CardPayment } from './CardPayment';
import { NetBankingPayment } from './NetBankingPayment';
import { BranchCashPayment } from './BranchCashPayment';
import { ActivationPolicy } from './ActivationPolicy';
import { DossierStatus } from './DossierStatus';

export function MembershipFeeSection({
  selectedMethod = 'upi',
  onSelectMethod,
  paymentData = {},
  onPaymentDataChange,
  utrError,
  onAutoFillTestInfo,
  onGoToStep,
}) {
  return (
    <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xs">
      {/* SECTION HEADER ROW */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Statutory Associate Membership Joining Fee
            </h3>
            <p className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
              Select your payment method below for instant ₹200 fee clearance and immediate statutory membership activation.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-2.5 px-4 text-right shrink-0 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
            PAYABLE FEE
          </span>
          <span className="text-lg sm:text-xl font-black text-blue-700 font-sans">
            ₹ 200.00
          </span>
        </div>
      </div>

      {/* PAYMENT METHOD TABS (5 METHOD CARDS) */}
      <PaymentMethodSelector
        selectedMethod={selectedMethod}
        onSelectMethod={onSelectMethod}
      />

      {/* ACTIVE PAYMENT METHOD CONTENT */}
      {selectedMethod === 'upi' && (
        <UpiPayment
          utrValue={paymentData.utr || ''}
          onUtrChange={(val) => onPaymentDataChange('utr', val)}
          error={utrError}
        />
      )}

      {selectedMethod === 'razorpay' && <RazorpayPayment />}

      {selectedMethod === 'card' && (
        <CardPayment
          cardData={paymentData.card || {}}
          onCardChange={(field, val) =>
            onPaymentDataChange('card', { ...paymentData.card, [field]: val })
          }
        />
      )}

      {selectedMethod === 'netbanking' && (
        <NetBankingPayment
          bankData={paymentData.netBank || ''}
          onBankChange={(val) => onPaymentDataChange('netBank', val)}
        />
      )}

      {selectedMethod === 'branch' && (
        <BranchCashPayment
          branchData={paymentData.branch || {}}
          onBranchChange={(field, val) =>
            onPaymentDataChange('branch', { ...paymentData.branch, [field]: val })
          }
        />
      )}

      {/* INSTANT ACTIVATION POLICY BOX */}
      <ActivationPolicy />

      {/* APPLICATION DOSSIER STATUS CARD WITH AUTO-FILL BUTTON */}
      <DossierStatus onAutoFillTestInfo={onAutoFillTestInfo} />
    </div>
  );
}
