import React from 'react';
import { FileSpreadsheet, ArrowDownLeft, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';

export function TransactionSummaryCards({ transactions = [] }) {
  const totalCount = transactions.length;

  const creditTransactions = transactions.filter(
    (t) => (t.direction || 'Credit').toLowerCase() === 'credit'
  );
  const totalCredits = creditTransactions.reduce(
    (sum, t) => sum + (Number(t.amount) || 0),
    0
  );

  const debitTransactions = transactions.filter(
    (t) => (t.direction || '').toLowerCase() === 'debit'
  );
  const totalDebits = debitTransactions.reduce(
    (sum, t) => sum + (Number(t.amount) || 0),
    0
  );

  const pendingCount = transactions.filter(
    (t) => (t.status || '').toLowerCase() === 'pending'
  ).length;

  const completedCount = transactions.filter(
    (t) => (t.status || '').toLowerCase() === 'completed' || (t.status || '').toLowerCase() === 'successful'
  ).length;

  const formatCurrency = (val) => {
    return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  const cards = [
    {
      title: 'Total Transactions',
      value: totalCount,
      subtext: `${totalCount} ledger record${totalCount === 1 ? '' : 's'}`,
      icon: FileSpreadsheet,
      color: 'bg-blue-500/10 text-blue-600 border-blue-200/60',
    },
    {
      title: 'Total Credits (+)',
      value: `+${formatCurrency(totalCredits)}`,
      subtext: `${creditTransactions.length} incoming credit entries`,
      icon: ArrowDownLeft,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/60',
      valueColor: 'text-emerald-700',
    },
    {
      title: 'Total Debits (-)',
      value: `-${formatCurrency(totalDebits)}`,
      subtext: `${debitTransactions.length} outgoing debit entries`,
      icon: ArrowUpRight,
      color: 'bg-rose-500/10 text-rose-600 border-rose-200/60',
      valueColor: 'text-rose-700',
    },
    {
      title: 'Pending Ledger',
      value: pendingCount,
      subtext: 'Awaiting clearance or posting',
      icon: Clock,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200/60',
    },
    {
      title: 'Completed Ledger',
      value: completedCount,
      subtext: 'Verified & finalized entries',
      icon: CheckCircle2,
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
              <div className={`text-xl font-black tracking-tight font-mono ${card.valueColor || 'text-slate-900'}`}>
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

export default TransactionSummaryCards;
