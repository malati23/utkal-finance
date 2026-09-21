import React from 'react';
import { Search, RotateCcw, Filter, Calendar } from 'lucide-react';

export function NoticeFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  audienceFilter,
  setAudienceFilter,
  dateFilter,
  setDateFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onResetFilters,
}) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      {/* Top Row: Search & Reset */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notices by title, category, content, notice ID or audience..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004085]/20 focus:border-[#004085] transition-all"
          />
        </div>

        {/* Reset Filters button */}
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Bottom Row: Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 border-t border-slate-100">
        {/* Status Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004085]/20 focus:border-[#004085]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004085]/20 focus:border-[#004085]"
          >
            <option value="all">All Categories</option>
            <option value="General">General</option>
            <option value="Announcement">Announcement</option>
            <option value="Financial">Financial</option>
            <option value="Documents">Documents</option>
            <option value="Holiday">Holiday</option>
            <option value="Meeting">Meeting</option>
            <option value="Important">Important</option>
          </select>
        </div>

        {/* Audience Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Audience
          </label>
          <select
            value={audienceFilter}
            onChange={(e) => setAudienceFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004085]/20 focus:border-[#004085]"
          >
            <option value="all">All Audiences</option>
            <option value="All Members">All Members</option>
            <option value="Active Members">Active Members</option>
            <option value="New Members">New Members</option>
            <option value="Specific Member">Specific Member</option>
            <option value="Admin Only">Admin Only</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Date Created
          </label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004085]/20 focus:border-[#004085]"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="custom">Custom Date Range</option>
          </select>
        </div>
      </div>

      {/* Custom Date Inputs if Custom selected */}
      {dateFilter === 'custom' && (
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100 animate-fade-in">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500">From:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500">To:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}
