import React from 'react';
import { Search, RotateCcw, Filter, Calendar, ArrowUpDown, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export function TransactionFilters({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  directionFilter,
  setDirectionFilter,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
  dateFilter,
  setDateFilter,
  sortBy,
  setSortBy,
  onReset,
  availableTypes = ['Deposit', 'Payment', 'Withdrawal', 'Refund', 'Fee'],
  availableMethods = ['UPI', 'Razorpay / Net Banking', 'Branch Cash', 'IMPS / NEFT', 'Cheque / DD'],
}) {
  const isFiltered =
    searchQuery !== '' ||
    typeFilter !== 'All' ||
    directionFilter !== 'All' ||
    statusFilter !== 'All' ||
    methodFilter !== 'All' ||
    dateFilter !== 'All' ||
    sortBy !== 'newest';

  const typeOptions = ['All', ...new Set(availableTypes)];
  const methodOptions = ['All', ...new Set(availableMethods)];
  const statusOptions = ['All', 'Completed', 'Pending', 'Failed', 'Reversed'];
  const directionOptions = ['All', 'Credit', 'Debit'];
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
            placeholder="Search by Transaction ID, Member ID, Name, Payment ID, Deposit ID, UTR..."
            className="w-full bg-slate-50 text-slate-900 text-xs font-medium rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* FILTERS TOOLBAR */}
        <div className="flex flex-wrap items-center gap-2">
          {/* DIRECTION FILTER (Credit / Debit) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {['All', 'Credit', 'Debit'].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => setDirectionFilter(dir)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  directionFilter === dir
                    ? dir === 'Credit'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : dir === 'Debit'
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-[#0b1c3d] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {dir === 'Credit' && <ArrowDownLeft className="w-3 h-3 inline mr-1" />}
                {dir === 'Debit' && <ArrowUpRight className="w-3 h-3 inline mr-1" />}
                {dir}
              </button>
            ))}
          </div>

          {/* TYPE FILTER */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-slate-900 text-xs font-bold focus:outline-none cursor-pointer"
            >
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* STATUS FILTER */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status:</span>
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

          {/* SORT BY */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-900 text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>

          {/* RESET BUTTON */}
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
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

export default TransactionFilters;
