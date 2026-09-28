import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Search,
  Download,
  ShieldCheck,
} from 'lucide-react';
import { MemberPageHeader } from '../../components/member/MemberPageHeader';
import { TransactionTable } from '../../components/member/TransactionTable';

/**
 * MemberTransactions Page (/member-dashboard/transactions)
 * Complete audit trail of member financial transactions with filter tools and empty state.
 */
export function MemberTransactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  // Columns: Date, Transaction ID, Type, Description, Amount, Status
  const transactionColumns = [
    { key: 'date', label: 'Date', className: 'w-28' },
    { key: 'txnId', label: 'Transaction ID', className: 'w-40 font-mono text-[11px]' },
    { key: 'type', label: 'Type', className: 'w-28' },
    { key: 'description', label: 'Description', className: 'min-w-[180px]' },
    { key: 'amount', label: 'Amount', className: 'w-32 text-right' },
    { key: 'status', label: 'Status', className: 'w-32 text-center' },
  ];

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <MemberPageHeader
        title="My Transactions"
        description="Chronological ledger of credits, debits, deposits, and statutory distributions."
        badge="TRANSACTION LEDGER"
      >
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed"
          title="Account statement will be available when transactions exist"
        >
          <Download className="w-4 h-4" />
          <span>Export Statement</span>
        </button>
      </MemberPageHeader>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Transaction ID or note..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'DEPOSIT', 'CREDIT', 'DEBIT'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedType === type
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 tracking-tight">
            Transaction History
          </h2>
          <span className="text-[11px] font-mono text-slate-400">
            0 Transactions Recorded
          </span>
        </div>

        <TransactionTable
          columns={transactionColumns}
          data={[]}
          emptyIcon={ArrowLeftRight}
          emptyMessage="No transactions available."
          emptyDescription="When financial debits, deposits, dividend credits, or refunds take place on your member account, they will automatically appear here."
        />
      </div>

      {/* FOOTER NOTICE */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Immutable Ledger Integrity • Verified via Double-Entry Auditing</span>
        </div>
        <span className="text-[11px] font-mono hidden sm:inline">FY 2026–2027</span>
      </div>
    </div>
  );
}

export default MemberTransactions;
