import React from 'react';
import { PiggyBank, CheckCircle2, Clock, IndianRupee } from 'lucide-react';

export function DepositSummaryCards({ deposits = [] }) {
  // Dynamic calculation based ONLY on actual deposits array
  const totalCount = deposits.length;
  
  const activeDeposits = deposits.filter((d) => (d.status || '').toLowerCase() === 'active');
  const activeCount = activeDeposits.length;
  
  const pendingDeposits = deposits.filter((d) => (d.status || '').toLowerCase() === 'pending');
  const pendingCount = pendingDeposits.length;

  const totalAmount = deposits.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const activeAmount = activeDeposits.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const pendingAmount = pendingDeposits.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  const formatCurrency = (val) => {
    return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  const cards = [
    {
      title: 'Total Deposits',
      value: totalCount,
      subtext: `Total sum: ${formatCurrency(totalAmount)}`,
      icon: PiggyBank,
      color: 'bg-blue-500/10 text-blue-600 border-blue-200/60',
      badgeBg: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Active Deposits',
      value: activeCount,
      subtext: `Active sum: ${formatCurrency(activeAmount)}`,
      icon: CheckCircle2,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/60',
      badgeBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Pending Deposits',
      value: pendingCount,
      subtext: `Pending sum: ${formatCurrency(pendingAmount)}`,
      icon: Clock,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200/60',
      badgeBg: 'bg-amber-50 text-amber-700',
    },
    {
      title: 'Total Deposit Amount',
      value: formatCurrency(totalAmount),
      subtext: `${totalCount} recorded deposit account${totalCount === 1 ? '' : 's'}`,
      icon: IndianRupee,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200/60',
      badgeBg: 'bg-indigo-50 text-indigo-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DepositSummaryCards;
