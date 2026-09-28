import React from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  PiggyBank,
  Clock,
  CheckCircle2,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { MemberPageHeader } from '../../components/member/MemberPageHeader';
import { MemberStatCard } from '../../components/member/MemberStatCard';
import { TransactionTable } from '../../components/member/TransactionTable';

/**
 * MemberDeposits Page (/member-dashboard/deposits)
 * Overview of member savings, term deposits, and recurring contributions.
 */
export function MemberDeposits() {
  const { openMakeDeposit } = useOutletContext() || {};

  // Custom column headers for deposit ledger
  const depositColumns = [
    { key: 'date', label: 'Date', className: 'w-28' },
    { key: 'depositId', label: 'Deposit Ref', className: 'w-36 font-mono text-[11px]' },
    { key: 'scheme', label: 'Deposit Scheme', className: 'w-44' },
    { key: 'tenure', label: 'Tenure / Term', className: 'w-28' },
    { key: 'amount', label: 'Amount', className: 'w-32 text-right' },
    { key: 'status', label: 'Status', className: 'w-32 text-center' },
  ];

  return (
    <div className="space-y-6">
      {/* PAGE HEADER WITH "MAKE A DEPOSIT" BUTTON */}
      <MemberPageHeader
        title="My Deposits"
        description="Monitor your recurring deposits, fixed deposits, and statutory mutual savings."
        badge="DEPOSIT LEDGER"
      >
        <button
          type="button"
          onClick={openMakeDeposit}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-white bg-blue-700 hover:bg-blue-800 active:scale-95 transition-all shadow-md shadow-blue-700/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Make a Deposit</span>
        </button>
      </MemberPageHeader>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MemberStatCard
          title="Total Deposited"
          value="₹0"
          icon={PiggyBank}
          iconColor="text-blue-700 bg-blue-50 border-blue-200/60"
          subtitle="Cumulative deposit balance"
        />

        <MemberStatCard
          title="Pending Deposits"
          value="₹0"
          icon={Clock}
          iconColor="text-amber-700 bg-amber-50 border-amber-200/60"
          subtitle="Awaiting bank verification"
        />

        <MemberStatCard
          title="Verified Deposits"
          value="₹0"
          icon={CheckCircle2}
          iconColor="text-emerald-700 bg-emerald-50 border-emerald-200/60"
          subtitle="Confirmed & credited"
        />
      </div>

      {/* DEPOSIT HISTORY SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 tracking-tight">
            Deposit History
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">
            0 Records Found
          </span>
        </div>

        {/* Empty state deposit table */}
        <TransactionTable
          columns={depositColumns}
          data={[]}
          emptyIcon={PiggyBank}
          emptyMessage="No deposits available."
          emptyDescription="You haven't made any deposits yet. Use the 'Make a Deposit' button above to initiate a new deposit."
        />
      </div>

      {/* STATUTORY BENEFIT NOTICE */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-900">Protected Member Savings:</span> Deposits accepted by New Utkal Finance Limited are governed strictly in compliance with Mutual Benefit Financial norms, offering competitive interest rates and transparent audit statements.
        </div>
      </div>
    </div>
  );
}

export default MemberDeposits;
