import React from 'react';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Receipt,
  HelpCircle,
} from 'lucide-react';
import { MemberPageHeader } from '../../components/member/MemberPageHeader';
import { MemberStatCard } from '../../components/member/MemberStatCard';
import { TransactionTable } from '../../components/member/TransactionTable';

/**
 * MemberPayments Page (/member-dashboard/payments)
 * Record of payments made towards membership fees, shares, and service charges.
 */
export function MemberPayments() {
  // Required columns: Payment ID, Date, Amount, Payment method, Status
  const paymentColumns = [
    { key: 'paymentId', label: 'Payment ID', className: 'w-36 font-mono text-[11px]' },
    { key: 'date', label: 'Date', className: 'w-32' },
    { key: 'amount', label: 'Amount', className: 'w-32 text-right' },
    { key: 'method', label: 'Payment Method', className: 'min-w-[140px]' },
    { key: 'status', label: 'Status', className: 'w-32 text-center' },
  ];

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <MemberPageHeader
        title="My Payments"
        description="Audit record of payments submitted towards membership subscription, share capital, and statutory charges."
        badge="PAYMENTS LEDGER"
      />

      {/* PAYMENT SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MemberStatCard
          title="Total Payments"
          value="₹0"
          icon={CreditCard}
          iconColor="text-blue-700 bg-blue-50 border-blue-200/60"
          subtitle="All transactions submitted"
        />

        <MemberStatCard
          title="Verified Payments"
          value="₹0"
          icon={CheckCircle2}
          iconColor="text-emerald-700 bg-emerald-50 border-emerald-200/60"
          subtitle="Receipts issued & cleared"
        />

        <MemberStatCard
          title="Pending Payments"
          value="₹0"
          icon={Clock}
          iconColor="text-amber-700 bg-amber-50 border-amber-200/60"
          subtitle="Verification in progress"
        />
      </div>

      {/* PAYMENT HISTORY TABLE SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 tracking-tight">
            Payment Records
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">
            0 Records Found
          </span>
        </div>

        {/* Empty State Table */}
        <TransactionTable
          columns={paymentColumns}
          data={[]}
          emptyIcon={Receipt}
          emptyMessage="No payment records available."
          emptyDescription="When payments are processed via UPI, Bank Remittance, or Branch Counter, receipts will appear here."
        />
      </div>

      {/* PAYMENT SUPPORT ASSISTANCE */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-900">Payment Reconciliation:</span> If you recently remitted funds via NEFT/RTGS/UPI and don't see it reflected after 24 hours, please share your UTR transaction reference number with our accounts desk for priority verification.
        </div>
      </div>
    </div>
  );
}

export default MemberPayments;
