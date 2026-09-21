import React from 'react';
import { Eye, PiggyBank, Calendar, CreditCard, User, Layers, ArrowUpRight } from 'lucide-react';
import { DepositStatusBadge } from './DepositStatusBadge';

export function DepositTable({
  deposits = [],
  onViewDetails,
  onStatusChange,
  isFiltered = false,
  onResetFilters,
}) {
  const formatCurrency = (val) => {
    return `₹${Number(val || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  if (deposits.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
          <PiggyBank className="w-8 h-8" />
        </div>
        <div className="space-y-1 max-w-md">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            {isFiltered ? 'No Matching Deposit Records' : 'No Deposit Records Found'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            {isFiltered
              ? 'No deposit records match your current search or filter criteria. Try clearing your search parameters.'
              : 'Deposits will appear here when a member submits a deposit application.'}
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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* DESKTOP & TABLET TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 select-none">
              <th className="py-3.5 px-4">Deposit ID</th>
              <th className="py-3.5 px-4">Member Name</th>
              <th className="py-3.5 px-4">Member ID</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4">Deposit Date</th>
              <th className="py-3.5 px-4">Maturity Date</th>
              <th className="py-3.5 px-4">Payment Method</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {deposits.map((dep) => {
              const depId = dep.depositId || dep.id || 'N/A';
              const memberName = dep.applicantName || dep.memberName || 'N/A';
              const memberId = dep.memberId || 'N/A';
              const depType = dep.depositType || 'Deposit';
              const amount = dep.amount || 0;
              const depDate = dep.depositDate || dep.startDate || 'N/A';
              const maturityDate = dep.maturityDate || 'N/A';
              const paymentMethod = dep.paymentMethod || 'N/A';
              const status = dep.status || 'Pending';

              return (
                <tr
                  key={depId}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* DEPOSIT ID */}
                  <td className="py-3.5 px-4 font-extrabold text-blue-900 whitespace-nowrap">
                    <span className="font-mono text-xs">{depId}</span>
                  </td>

                  {/* MEMBER NAME */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black shrink-0 border border-slate-200">
                        {memberName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {memberName}
                      </span>
                    </div>
                  </td>

                  {/* MEMBER ID */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-mono text-xs">
                    {memberId !== 'N/A' ? (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {memberId}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Not assigned</span>
                    )}
                  </td>

                  {/* DEPOSIT TYPE */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700">
                      <Layers className="w-3 h-3 text-slate-500" />
                      {depType}
                    </span>
                  </td>

                  {/* AMOUNT */}
                  <td className="py-3.5 px-4 font-black text-slate-900 whitespace-nowrap">
                    {formatCurrency(amount)}
                  </td>

                  {/* DEPOSIT DATE */}
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {depDate}
                  </td>

                  {/* MATURITY DATE */}
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {maturityDate !== 'N/A' ? maturityDate : <span className="text-slate-400 italic">N/A</span>}
                  </td>

                  {/* PAYMENT METHOD */}
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-slate-600">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      {paymentMethod}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <DepositStatusBadge status={status} />
                  </td>

                  {/* ACTIONS */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onViewDetails(dep)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer shadow-2xs"
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
  );
}

export default DepositTable;
