import React, { useState } from 'react';
import { CreditCard, RefreshCw, Download, PlusCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { PaymentSummaryCards } from '../../components/admin/payments/PaymentSummaryCards';
import { PaymentFilters } from '../../components/admin/payments/PaymentFilters';
import { PaymentTable } from '../../components/admin/payments/PaymentTable';
import { PaymentDetailsModal } from '../../components/admin/payments/PaymentDetailsModal';
import { CreatePaymentModal } from '../../components/admin/payments/CreatePaymentModal';
import { exportPaymentsCSV } from '../../utils/paymentStorage';

const ITEMS_PER_PAGE = 10;

export function Payments() {
  const {
    payments = [],
    members = [],
    createNewPayment,
    updatePaymentRecord,
    verifyPaymentRecord,
    refundPaymentRecord,
    refreshData,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [purposeFilter, setPurposeFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Extract unique purposes and methods for filters
  const availablePurposes = Array.from(
    new Set([
      'Membership Fee',
      'Deposit Opening',
      'Share Capital',
      ...payments.map((p) => p.purpose).filter(Boolean),
    ])
  );

  const availableMethods = Array.from(
    new Set([
      'UPI',
      'Razorpay',
      'Net Banking',
      'Branch Cash',
      'IMPS / NEFT',
      ...payments.map((p) => p.paymentMethod || p.method).filter(Boolean),
    ])
  );

  // Filter actual payment records
  const filteredPayments = payments.filter((p) => {
    const pId = p.paymentId || p.id || '';
    const memberId = p.memberId || '';
    const name = p.memberName || p.member || '';
    const utr = p.utrNo || p.utr || p.transactionId || '';
    const purpose = p.purpose || '';
    const method = p.paymentMethod || p.method || '';
    const status = p.status || '';

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      query === '' ||
      pId.toLowerCase().includes(query) ||
      memberId.toLowerCase().includes(query) ||
      name.toLowerCase().includes(query) ||
      utr.toLowerCase().includes(query);

    const matchesPurpose =
      purposeFilter === 'All' || purpose.toLowerCase().includes(purposeFilter.toLowerCase());

    const matchesMethod =
      methodFilter === 'All' || method.toLowerCase().includes(methodFilter.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || status.toLowerCase().includes(statusFilter.toLowerCase());

    let matchesDate = true;
    if (dateFilter === 'Today') {
      const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      matchesDate = (p.date || '').includes(todayStr) || (p.date || '').includes(new Date().toISOString().split('T')[0]);
    } else if (dateFilter === 'This Month') {
      const monthStr = new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
      matchesDate = (p.date || '').includes(monthStr);
    }

    return matchesSearch && matchesPurpose && matchesMethod && matchesStatus && matchesDate;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleResetFilters = () => {
    setSearchQuery('');
    setPurposeFilter('All');
    setMethodFilter('All');
    setStatusFilter('All');
    setDateFilter('All');
    setCurrentPage(1);
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleCreatePayment = (paymentData) => {
    if (createNewPayment) {
      createNewPayment(paymentData);
    }
  };

  const handleUpdatePaymentRecord = (paymentId, updatedFields) => {
    if (updatePaymentRecord) {
      const updated = updatePaymentRecord(paymentId, updatedFields);
      if (updated) {
        setSelectedPayment(updated);
      }
    }
  };

  const handleVerifyPayment = (payment) => {
    const targetId = payment.paymentId || payment.id;
    if (verifyPaymentRecord && targetId) {
      const updated = verifyPaymentRecord(targetId);
      if (selectedPayment && (selectedPayment.id === targetId || selectedPayment.paymentId === targetId)) {
        setSelectedPayment(updated);
      }
    }
  };

  const handleRefundPayment = (paymentId) => {
    if (refundPaymentRecord) {
      const updated = refundPaymentRecord(paymentId);
      if (selectedPayment && (selectedPayment.id === paymentId || selectedPayment.paymentId === paymentId)) {
        setSelectedPayment(updated);
      }
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (refreshData) {
      refreshData();
    }
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  const handleExportCSV = () => {
    exportPaymentsCSV(filteredPayments);
  };

  const isFiltered =
    searchQuery !== '' ||
    purposeFilter !== 'All' ||
    methodFilter !== 'All' ||
    statusFilter !== 'All' ||
    dateFilter !== 'All';

  return (
    <div className="space-y-6 text-left animate-fade-in pb-12">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#0B1528] text-white flex items-center justify-center shrink-0 shadow-md border border-slate-800">
            <CreditCard className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Payments
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Track, verify and manage member payment records.
            </p>
          </div>
        </div>

        {/* HEADER ACTION BUTTONS */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all cursor-pointer"
            title="Refresh payment data"
          >
            <RefreshCw className={`w-4 h-4 text-slate-500 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            disabled={filteredPayments.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export payment records to CSV"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Payments</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0b1c3d] hover:bg-blue-900 shadow-md transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-blue-400" />
            <span>Create Payment</span>
          </button>
        </div>
      </div>

      {/* 2. SUMMARY CARDS */}
      <PaymentSummaryCards payments={payments} />

      {/* 3. SEARCH AND FILTERS */}
      <PaymentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        purposeFilter={purposeFilter}
        setPurposeFilter={setPurposeFilter}
        methodFilter={methodFilter}
        setMethodFilter={setMethodFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        onReset={handleResetFilters}
        availablePurposes={availablePurposes}
        availableMethods={availableMethods}
      />

      {/* 4. PAYMENT TABLE & RESPONSIVE CARDS */}
      <PaymentTable
        payments={paginatedPayments}
        onViewDetails={handleViewDetails}
        onVerifyPayment={(p) => handleVerifyPayment(p)}
        isFiltered={isFiltered}
        onResetFilters={handleResetFilters}
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* 5. CREATE PAYMENT MODAL */}
      <CreatePaymentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        members={members}
        onCreatePayment={handleCreatePayment}
      />

      {/* 6. PAYMENT DETAILS MODAL */}
      <PaymentDetailsModal
        payment={selectedPayment}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        members={members}
        onUpdatePaymentRecord={handleUpdatePaymentRecord}
        onVerifyPaymentRecord={(pId) => handleVerifyPayment({ paymentId: pId })}
        onRefundPaymentRecord={handleRefundPayment}
      />
    </div>
  );
}

export default Payments;
