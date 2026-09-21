import React from 'react';
import { Search, RotateCcw, Filter, Calendar } from 'lucide-react';

export function PaymentFilters({
  searchQuery,
  setSearchQuery,
  purposeFilter,
  setPurposeFilter,
  methodFilter,
  setMethodFilter,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  onReset,
  availablePurposes = ['Membership Fee', 'Deposit Opening', 'Share Capital'],
  availableMethods = ['UPI', 'Razorpay / Net Banking', 'Branch Cash', 'IMPS / NEFT', 'Cheque / DD'],
}) {
  const isFiltered =
    searchQuery !== '' ||
    purposeFilter !== 'All' ||
    methodFilter !== 'All' ||
    statusFilter !== 'All' ||
    dateFilter !== 'All';

  const purposeOptions = ['All', ...new Set(availablePurposes)];
  const methodOptions = ['All', ...new Set(availableMethods)];
  const statusOptions = ['All', 'Paid', 'Pending', 'Failed', 'Refunded'];
  const dateOptions = ['All', 'Today', 'This Week', 'This Month'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* SEARCH BAR */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Payment ID, Member ID, Name, UTR / Transaction ID..."
            className="w-full bg-slate-50 text-slate-900 text-xs font-medium rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* FILTERS TOOLBAR */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* PURPOSE FILTER */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Purpose:</span>
            <select
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value)}
              className="bg-transparent text-slate-900 text-xs font-bold focus:outline-none cursor-pointer"
            >
              {purposeOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* METHOD FILTER */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Method:</span>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="bg-transparent text-slate-900 text-xs font-bold focus:outline-none cursor-pointer"
            >
              {methodOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* STATUS FILTER */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-900 text-xs font-bold focus:outline-none cursor-pointer"
            >
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* DATE FILTER */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date:</span>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent text-slate-900 text-xs font-bold focus:outline-none cursor-pointer"
            >
              {dateOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* RESET BUTTON */}
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentFilters;
