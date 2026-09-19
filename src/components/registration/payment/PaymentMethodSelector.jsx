import React from 'react';
import { QrCode, CreditCard, Landmark, Building2, ShieldCheck } from 'lucide-react';

export function PaymentMethodSelector({ selectedMethod, onSelectMethod }) {
  const PAYMENT_METHODS = [
    {
      id: 'upi',
      name: 'UPI / QR Code',
      badge: 'Popular',
      icon: QrCode,
      color: 'text-purple-600',
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      badge: 'Gateway',
      icon: ShieldCheck,
      color: 'text-blue-600',
    },
    {
      id: 'card',
      name: 'Card Banking',
      badge: 'Debit/Credit',
      icon: CreditCard,
      color: 'text-emerald-600',
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      badge: 'All Banks',
      icon: Landmark,
      color: 'text-amber-600',
    },
    {
      id: 'branch',
      name: 'Branch Cash',
      badge: 'Counter',
      icon: Building2,
      color: 'text-indigo-600',
    },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
        Select Payment Method:
      </label>

      {/* 5 CARDS IN 1 ROW ON DESKTOP */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          const Icon = method.icon;

          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`bg-white rounded-2xl p-3.5 sm:p-4 border flex flex-col justify-between space-y-3 cursor-pointer transition-all duration-200 select-none relative overflow-hidden group
                ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20 shadow-md scale-[1.02]'
                    : 'border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                }
              `}
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex items-center justify-between gap-1">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors
                    ${
                      isSelected
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider
                    ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }
                  `}
                >
                  {method.badge}
                </span>
              </div>

              {/* Bottom Row: Name */}
              <div>
                <span className={`text-xs font-bold block ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                  {method.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
