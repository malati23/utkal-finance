import React, { useState } from 'react';
import { PiggyBank, RefreshCw, PlusCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { DepositSummaryCards } from '../../components/admin/deposits/DepositSummaryCards';
import { DepositFilters } from '../../components/admin/deposits/DepositFilters';
import { DepositTable } from '../../components/admin/deposits/DepositTable';
import { DepositDetailsModal } from '../../components/admin/deposits/DepositDetailsModal';
import { CreateDepositModal } from '../../components/admin/deposits/CreateDepositModal';

export function DepositManagement() {
  const {
    deposits = [],
    members = [],
    payments = [],
    createNewDeposit,
    updateDepositRecord,
    updateDepositStatus,
    refreshData,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Extract available unique deposit types from actual deposits
  const availableTypes = Array.from(
    new Set([
      'Fixed Deposit',
      'Recurring Deposit',
      'Savings Deposit',
      ...deposits.map((d) => d.depositType).filter(Boolean),
    ])
  );

  // Filter actual deposit records strictly based on user search and filters
  const filteredDeposits = deposits.filter((dep) => {
    const depId = dep.depositId || dep.id || '';
    const memberId = dep.memberId || '';
    const name = dep.applicantName || dep.memberName || '';
    const mobile = dep.mobile || '';
    const txnId = dep.transactionId || dep.paymentId || '';
    const utr = dep.utrNo || '';

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      query === '' ||
      depId.toLowerCase().includes(query) ||
      memberId.toLowerCase().includes(query) ||
      name.toLowerCase().includes(query) ||
      mobile.includes(query) ||
      txnId.toLowerCase().includes(query) ||
      utr.toLowerCase().includes(query);

    const matchesType =
      typeFilter === 'All' || (dep.depositType || '').toLowerCase() === typeFilter.toLowerCase();

    const matchesStatus =
      statusFilter === 'All' || (dep.status || '').toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('All');
    setStatusFilter('All');
  };

  const handleViewDetails = (deposit) => {
    setSelectedDeposit(deposit);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedDeposit(null);
  };

  const handleCreateDeposit = (depositData) => {
    if (createNewDeposit) {
      createNewDeposit(depositData);
    }
  };

  const handleUpdateDepositRecord = (depositId, updatedFields) => {
    if (updateDepositRecord) {
      const updated = updateDepositRecord(depositId, updatedFields);
      if (updated) {
        setSelectedDeposit(updated);
      }
    }
  };

  const handleUpdateStatus = (depositId, newStatus) => {
    if (updateDepositStatus) {
      updateDepositStatus(depositId, newStatus);
      if (selectedDeposit && (selectedDeposit.id === depositId || selectedDeposit.depositId === depositId)) {
        setSelectedDeposit((prev) => (prev ? { ...prev, status: newStatus } : null));
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

  const isFiltered = searchQuery !== '' || typeFilter !== 'All' || statusFilter !== 'All';

  return (
    <div className="space-y-6 text-left animate-fade-in pb-12">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#0B1528] text-white flex items-center justify-center shrink-0 shadow-md border border-slate-800">
            <PiggyBank className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Deposit Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Manage and monitor member deposit accounts, deposit status and related transactions.
            </p>
          </div>
        </div>

        {/* HEADER ACTION BUTTONS */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all cursor-pointer"
            title="Refresh deposit data"
          >
            <RefreshCw className={`w-4 h-4 text-slate-500 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0b1c3d] hover:bg-blue-900 shadow-md transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-blue-400" />
            <span>Create Deposit</span>
          </button>
        </div>
      </div>

      {/* 2. SUMMARY CARDS */}
      <DepositSummaryCards deposits={deposits} />

      {/* 3. SEARCH AND FILTERS */}
      <DepositFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onReset={handleResetFilters}
        availableTypes={availableTypes}
      />

      {/* 4. DEPOSIT TABLE & EMPTY STATE */}
      <DepositTable
        deposits={filteredDeposits}
        onViewDetails={handleViewDetails}
        onStatusChange={handleUpdateStatus}
        isFiltered={isFiltered}
        onResetFilters={handleResetFilters}
      />

      {/* 5. CREATE DEPOSIT FORM MODAL */}
      <CreateDepositModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        members={members}
        onCreateDeposit={handleCreateDeposit}
      />

      {/* 6. DEPOSIT DETAILS MODAL */}
      <DepositDetailsModal
        deposit={selectedDeposit}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        members={members}
        payments={payments}
        onUpdateDepositRecord={handleUpdateDepositRecord}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}

export default DepositManagement;
