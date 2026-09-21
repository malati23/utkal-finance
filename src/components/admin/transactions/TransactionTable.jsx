import React from 'react';
import { Eye, FileSpreadsheet, ArrowDownLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { TransactionStatusBadge } from './TransactionStatusBadge';

export function TransactionTable({
  transactions = [],
  onViewDetails,
  isFiltered = false,
  onResetFilters,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  const formatCurrency = (val) => {
    return `₹${Number(val || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shadow-inner">
          <FileSpreadsheet className="w-8 h-8" />
        </div>
        <div className="space-y-1 max-w-md">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            {isFiltered ? 'No Transactions Found' : 'No Transaction Records Found'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            {isFiltered
              ? 'No transaction ledger records match your current filter parameters. Try resetting your search.'
              : 'Transactions will appear here when financial transactions are recorded.'}
          </p>
        </div>

        {isFiltered && onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0b1c3d] hover:bg-blue-900 transition-all cursor-pointer shadow-sm"
          >
            <span>Reset Search Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* MOBILE CARDS VIEW (Phone screens < 768px) */}
      <div className="block md:hidden space-y-3">
        {transactions.map((t) => {
          const tId = t.txnId || t.transactionId || t.id || 'N/A';
          const memberName = t.memberName || 'Member information unavailable';
          const memberId = t.memberId || 'N/A';
          const type = t.type || 'Transaction';
          const desc = t.description || 'Ledger entry';
          const amount = t.amount || 0;
          const isCredit = (t.direction || 'Credit').toLowerCase() === 'credit';
          const method = t.paymentMethod || 'N/A';
          const date = t.date || 'N/A';
          const status = t.status || 'Completed';

          return (
            <div
              key={tId}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3 shadow-xs text-left hover:border-slate-300 transition-all"
            >
              {/* CARD HEADER */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="font-mono font-black text-slate-900 text-xs block">{tId}</span>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{type}</span>
                </div>
                <TransactionStatusBadge status={status} />
              </div>

              {/* MEMBER & AMOUNT WITH CREDIT/DEBIT SIGN */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Member</span>
                  <span className="font-bold text-slate-900 text-xs block">{memberName}</span>
                  {memberId !== 'N/A' && (
                    <span className="font-mono text-[10px] text-slate-500 block">{memberId}</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Amount</span>
                  <span
                    className={`font-mono font-black text-sm block flex items-center justify-end gap-1 ${
                      isCredit ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isCredit ? (
                      <ArrowDownLeft className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    )}
                    {isCredit ? '+' : '-'}{formatCurrency(amount)}
                  </span>
                </div>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Description</span>
                  <span className="text-slate-800 text-[11px] font-medium block mt-0.5 truncate">
                    {desc}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Date &amp; Time</span>
                  <span className="text-slate-600 text-[11px] block mt-0.5">{date}</span>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                  {method}
                </span>

                <button
                  type="button"
                  onClick={() => onViewDetails(t)}
                  className="px-3 py-1 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP & TABLET TABLE VIEW (>= 768px) */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 select-none">
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Member Name</th>
                <th className="py-3.5 px-4">Member ID</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Direction</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Date &amp; Time</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {transactions.map((t) => {
                const tId = t.txnId || t.transactionId || t.id || 'N/A';
                const memberName = t.memberName || 'Member information unavailable';
                const memberId = t.memberId || 'N/A';
                const type = t.type || 'Transaction';
                const desc = t.description || 'Ledger entry';
                const amount = t.amount || 0;
                const isCredit = (t.direction || 'Credit').toLowerCase() === 'credit';
                const method = t.paymentMethod || 'N/A';
                const date = t.date || 'N/A';
                const status = t.status || 'Completed';

                return (
                  <tr key={tId} className="hover:bg-slate-50/80 transition-colors group">
                    {/* TRANSACTION ID */}
                    <td className="py-3.5 px-4 font-mono font-black text-slate-900 whitespace-nowrap">
                      {tId}
                    </td>

                    {/* MEMBER NAME */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-black shrink-0 border border-slate-200">
                          {memberName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {memberName}
                        </span>
                      </div>
                    </td>

                    {/* MEMBER ID */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-xs text-slate-600">
                      {memberId !== 'N/A' ? (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                          {memberId}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Not assigned</span>
                      )}
                    </td>

                    {/* TYPE */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800">
                        {type}
                      </span>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="py-3.5 px-4 text-slate-700 max-w-[200px] truncate">
                      {desc}
                    </td>

                    {/* AMOUNT (+ / -) */}
                    <td
                      className={`py-3.5 px-4 font-mono font-black whitespace-nowrap ${
                        isCredit ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isCredit ? '+' : '-'}{formatCurrency(amount)}
                    </td>

                    {/* DIRECTION */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {isCredit ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                          <ArrowDownLeft className="w-3 h-3 text-emerald-600" />
                          <span>Credit</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/80">
                          <ArrowUpRight className="w-3 h-3 text-rose-600" />
                          <span>Debit</span>
                        </span>
                      )}
                    </td>

                    {/* PAYMENT METHOD */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
                        {method}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {date}
                    </td>

                    {/* STATUS */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <TransactionStatusBadge status={status} />
                    </td>

                    {/* ACTION */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onViewDetails(t)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION TOOLBAR */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 flex items-center justify-between text-xs text-slate-600 font-medium shadow-xs">
          <span>
            Page <strong className="text-slate-900 font-black">{currentPage}</strong> of{' '}
            <strong className="text-slate-900 font-black">{totalPages}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
