import React, { useState } from 'react';
import { CreditCard, Lock, Info } from 'lucide-react';
import { FormInput } from '../FormInput';

export function CardPayment({ cardData = {}, onCardChange }) {
  const [demoMessage, setDemoMessage] = useState(false);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs animate-fade-in">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <CreditCard className="w-5 h-5 text-emerald-600" />
        <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
          Debit / Credit Card Payment (Prototype UI)
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormInput
          label="Cardholder Name"
          name="cardHolder"
          value={cardData.cardHolder || ''}
          onChange={(e) => onCardChange('cardHolder', e.target.value)}
          placeholder="Name on card"
        />

        <FormInput
          label="Card Number"
          name="cardNumber"
          value={cardData.cardNumber || ''}
          onChange={(e) => onCardChange('cardNumber', e.target.value)}
          placeholder="XXXX XXXX XXXX XXXX"
          icon={CreditCard}
        />

        <FormInput
          label="Expiry Date"
          name="cardExpiry"
          value={cardData.cardExpiry || ''}
          onChange={(e) => onCardChange('cardExpiry', e.target.value)}
          placeholder="MM / YY"
        />

        <FormInput
          label="CVV"
          name="cardCvv"
          type="password"
          value={cardData.cardCvv || ''}
          onChange={(e) => onCardChange('cardCvv', e.target.value)}
          placeholder="XXX"
          icon={Lock}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="text-[11px] text-slate-500 font-normal flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>Frontend prototype demonstration. No real card details will be processed or stored.</span>
        </div>

        <button
          type="button"
          onClick={() => setDemoMessage(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shrink-0"
        >
          Continue with Card
        </button>
      </div>

      {demoMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl">
          ✓ Demo card details saved for frontend review. Select final submission to proceed.
        </div>
      )}
    </div>
  );
}
