import React, { useState } from 'react';
import { Search, CreditCard, DollarSign, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { PaymentTable } from '../../components/admin/PaymentTable';

export function Payments() {
  const { payments } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterMethod, setFilterMethod] = useState('All');

  const totalCollected = '₹2,48,000';
  const successfulCount = payments.filter((p) => p.status === 'Successful').length;
  const pendingCount = payments.filter((p) => p.status === 'Pending Verification').length;
  const failedCount = payments.filter((p) => p.status === 'Failed').length;

  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.member.toLowerCase().includes(search.toLowerCase()) ||
      p.txnId.toLowerCase().includes(search.toLowerCase()) ||
      p.appId.toLowerCase().includes(search.toLowerCase()) ||
      p.utr.toLowerCase().includes(search.toLowerCase());

    const matchesMethod =
      filterMethod === 'All' ? true : p.method.toLowerCase().includes(filterMethod.toLowerCase());

    return matchesSearch && matchesMethod;
  });

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Payments &amp; Transactions</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Statutory membership fee collections, share capital deposits &amp; transaction verification.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">TOTAL COLLECTED</span>
          <span className="text-2xl font-black text-emerald-600 font-mono block">{totalCollected}</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-1">
          <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block">SUCCESSFUL PAYMENTS</span>
          <span className="text-2xl font-black text-emerald-600 font-mono block">{successfulCount}</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-1">
          <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider block">PENDING VERIFICATION</span>
          <span className="text-2xl font-black text-amber-600 font-mono block">{pendingCount}</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-1">
          <span className="text-[10px] font-extrabold text-rose-600 uppercase tracking-wider block">FAILED TRANSACTIONS</span>
          <span className="text-2xl font-black text-rose-600 font-mono block">{failedCount}</span>
        </div>
      </div>

      {/* SEARCH & PAYMENT TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by member, UTR, Txn ID..."
              className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'UPI', 'Razorpay', 'Net Banking', 'Cash'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setFilterMethod(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${filterMethod === m
                    ? 'bg-[#004085] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <PaymentTable payments={filtered} />
      </div>
    </div>
  );
}

export default Payments;
