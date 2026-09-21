import React from 'react';
import { CreditCard, CheckCircle2, Clock, XCircle, IndianRupee } from 'lucide-react';

export function PaymentSummaryCards({ payments = [] }) {
  const totalCount = payments.length;

  const successfulPayments = payments.filter((p) => {
    const st = (p.status || '').toLowerCase();
    return st === 'paid' || st === 'successful' || st === 'confirmed';
  });
  const successfulCount = successfulPayments.length;

  const pendingPayments = payments.filter((p) => {
    const st = (p.status || '').toLowerCase();
    return st === 'pending' || st === 'pending verification';
  });
  const pendingCount = pendingPayments.length;

  const failedPayments = payments.filter((p) => {
    const st = (p.status || '').toLowerCase();
    return st === 'failed' || st === 'rejected' || st === 'refunded';
  });
  const failedCount = failedPayments.length;

  const totalAmount = successfulPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  const formatCurrency = (val) => {
    return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  const cards = [
    {
      title: 'Total Payments',
      value: totalCount,
      subtext: `${totalCount} recorded transaction${totalCount === 1 ? '' : 's'}`,
      icon: CreditCard,
      color: 'bg-blue-500/10 text-blue-600 border-blue-200/60',
    },
    {
      title: 'Successful Payments',
      value: successfulCount,
      subtext: `Verified & received: ${formatCurrency(totalAmount)}`,
      icon: CheckCircle2,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/60',
    },
    {
      title: 'Pending Payments',
      value: pendingCount,
      subtext: 'Awaiting verification or clearing',
      icon: Clock,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200/60',
    },
    {
      title: 'Failed / Refunded',
      value: failedCount,
      subtext: 'Transactions declined or refunded',
      icon: XCircle,
      color: 'bg-rose-500/10 text-rose-600 border-rose-200/60',
    },
    {
      title: 'Total Payment Amount',
      value: formatCurrency(totalAmount),
      subtext: 'Sum of successful transaction balances',
      icon: IndianRupee,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200/60',
      fullWidthMobile: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
              card.fullWidthMobile ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-xl font-black text-slate-900 tracking-tight font-mono">
                {card.value}
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1 truncate">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PaymentSummaryCards;
