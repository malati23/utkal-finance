import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';

export function DepositFilters({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  onReset,
  availableTypes = ['Fixed Deposit', 'Recurring Deposit', 'Savings Deposit'],
}) {
  const depositTypes = ['All', ...new Set(availableTypes)];
  const statusOptions = ['All', 'Pending', 'Approved', 'Active', 'Matured', 'Closed', 'Rejected'];

  const isFiltered = searchQuery !== '' || typeFilter !== 'All' || statusFilter !== 'All';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* SEARCH BAR */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Deposit ID, Member ID, Name, Mobile, UTR/Txn..."
            className="w-full bg-slate-50 text-slate-900 text-xs font-medium rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* FILTERS CONTAINER */}
        <div className="flex flex-wrap items-center gap-3">
          {/* DEPOSIT TYPE FILTER */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-slate-900 text-xs font-bold focus:outline-none cursor-pointer"
            >
              {depositTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
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

export default DepositFilters;
