import React from 'react';
import { Eye, ShieldCheck, CreditCard, User, Layers, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { PaymentStatusBadge } from './PaymentStatusBadge';

export function PaymentTable({
  payments = [],
  onViewDetails,
  onVerifyPayment,
  isFiltered = false,
  onResetFilters,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  const formatCurrency = (val) => {
    return `₹${Number(val || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
          <CreditCard className="w-8 h-8" />
        </div>
        <div className="space-y-1 max-w-md">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            {isFiltered ? 'No Payment Records Match' : 'No Payment Records Found'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            {isFiltered
              ? 'No payment records match your current filter parameters. Try resetting your search filters.'
              : 'Payment records will appear here when payment records are available.'}
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
        {payments.map((p) => {
          const pId = p.paymentId || p.id || 'N/A';
          const memberName = p.memberName || p.member || 'Member information unavailable';
          const memberId = p.memberId || 'N/A';
          const purpose = p.purpose || 'Membership Fee';
          const amount = p.amount || 0;
          const method = p.paymentMethod || p.method || 'N/A';
          const date = p.date || 'N/A';
          const utr = p.utrNo || p.utr || p.transactionId || 'N/A';
          const status = p.status || 'Pending';
          const isPending = (status || '').toLowerCase().includes('pending');

          return (
            <div
              key={pId}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3 shadow-xs text-left hover:border-slate-300 transition-all"
            >
              {/* CARD HEADER */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="font-mono font-black text-slate-900 text-xs block">{pId}</span>
                  <span className="text-[10px] text-blue-700 font-mono font-bold block mt-0.5">
                    {purpose}
                  </span>
                </div>
                <PaymentStatusBadge status={status} />
              </div>

              {/* MEMBER & AMOUNT */}
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
                  <span className="font-mono font-black text-slate-900 text-sm block">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Method</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold border border-slate-200 inline-block mt-0.5">
                    {method}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Date</span>
                  <span className="text-slate-600 text-[11px] block mt-0.5">{date}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-slate-500">
                  UTR: <strong className="text-slate-800 font-bold">{utr}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  {isPending && onVerifyPayment && (
                    <button
                      type="button"
                      onClick={() => onVerifyPayment(p)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                    >
                      Verify
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onViewDetails(p)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP & TABLET TABLE VIEW (>= 768px) */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 select-none">
                <th className="py-3.5 px-4">Payment ID</th>
                <th className="py-3.5 px-4">Member Name</th>
                <th className="py-3.5 px-4">Member ID</th>
                <th className="py-3.5 px-4">Purpose</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4">Date &amp; Time</th>
                <th className="py-3.5 px-4">UTR / Ref</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {payments.map((p) => {
                const pId = p.paymentId || p.id || 'N/A';
                const memberName = p.memberName || p.member || 'Member information unavailable';
                const memberId = p.memberId || 'N/A';
                const purpose = p.purpose || 'Membership Fee';
                const amount = p.amount || 0;
                const method = p.paymentMethod || p.method || 'N/A';
                const date = p.date || 'N/A';
                const utr = p.utrNo || p.utr || p.transactionId || 'N/A';
                const status = p.status || 'Pending';
                const isPending = (status || '').toLowerCase().includes('pending');

                return (
                  <tr key={pId} className="hover:bg-slate-50/80 transition-colors group">
                    {/* PAYMENT ID */}
                    <td className="py-3.5 px-4 font-mono font-black text-slate-900 whitespace-nowrap">
                      {pId}
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

                    {/* PURPOSE */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {purpose}
                      </span>
                    </td>

                    {/* AMOUNT */}
                    <td className="py-3.5 px-4 font-black text-slate-900 whitespace-nowrap">
                      {formatCurrency(amount)}
                    </td>

                    {/* METHOD */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
                        {method}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {date}
                    </td>

                    {/* UTR */}
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600 whitespace-nowrap">
                      {utr}
                    </td>

                    {/* STATUS */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <PaymentStatusBadge status={status} />
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {isPending && onVerifyPayment && (
                          <button
                            type="button"
                            onClick={() => onVerifyPayment(p)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all cursor-pointer shadow-2xs"
                            title="Verify Payment"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Verify</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onViewDetails(p)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                      </div>
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

export default PaymentTable;
