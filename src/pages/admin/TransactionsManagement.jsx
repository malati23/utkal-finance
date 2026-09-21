import React, { useState, useMemo } from 'react';
import { 
  RefreshCw, 
  Download, 
  PlusCircle, 
  FileSpreadsheet, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { exportTransactionsCSV } from '../../utils/transactionStorage';

import { TransactionSummaryCards } from '../../components/admin/transactions/TransactionSummaryCards';
import { TransactionFilters } from '../../components/admin/transactions/TransactionFilters';
import { TransactionTable } from '../../components/admin/transactions/TransactionTable';
import { TransactionDetailsModal } from '../../components/admin/transactions/TransactionDetailsModal';
import { CreateTransactionModal } from '../../components/admin/transactions/CreateTransactionModal';

export function TransactionsManagement() {
  const { 
    transactions = [], 
    members = [], 
    deposits = [], 
    payments = [],
    createNewTransaction,
    updateTransactionRecord,
    refreshData 
  } = useAdmin();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [directionFilter, setDirectionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

  // Handle Refresh
  const handleRefresh = () => {
    if (typeof refreshData === 'function') {
      refreshData();
    }
    showNotification('Transaction ledger refreshed.');
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification('');
    }, 4000);
  };

  // Filter & Sort Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      // 1. Search Term (Txn ID, Member ID, Name, Payment ID, Deposit ID, UTR)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const txnId = (txn.transactionId || txn.id || '').toLowerCase();
        const memberId = (txn.memberId || '').toLowerCase();
        const memberName = (txn.memberName || '').toLowerCase();
        const paymentId = (txn.paymentId || '').toLowerCase();
        const depositId = (txn.depositId || '').toLowerCase();
        const utr = (txn.referenceNumber || txn.utr || '').toLowerCase();
        const desc = (txn.description || '').toLowerCase();

        const matchesSearch = 
          txnId.includes(query) ||
          memberId.includes(query) ||
          memberName.includes(query) ||
          paymentId.includes(query) ||
          depositId.includes(query) ||
          utr.includes(query) ||
          desc.includes(query);

        if (!matchesSearch) return false;
      }

      // 2. Direction Filter (Credit / Debit)
      if (directionFilter !== 'all') {
        const dir = (txn.direction || 'Credit').toLowerCase();
        if (dir !== directionFilter.toLowerCase()) return false;
      }

      // 3. Type Filter
      if (typeFilter !== 'all') {
        const type = (txn.transactionType || txn.type || '').toLowerCase();
        if (type !== typeFilter.toLowerCase()) return false;
      }

      // 4. Status Filter
      if (statusFilter !== 'all') {
        const status = (txn.status || 'Completed').toLowerCase();
        if (status !== statusFilter.toLowerCase()) return false;
      }

      // 5. Payment Method Filter
      if (methodFilter !== 'all') {
        const method = (txn.paymentMethod || '').toLowerCase();
        if (method !== methodFilter.toLowerCase()) return false;
      }

      // 6. Date Filter
      if (dateFilter !== 'all') {
        const txnDateStr = txn.date || txn.createdAt || txn.timestamp;
        if (!txnDateStr) return true;
        const txnDate = new Date(txnDateStr);
        const now = new Date();

        if (dateFilter === 'today') {
          const todayStr = now.toISOString().split('T')[0];
          const txnStr = txnDate.toISOString().split('T')[0];
          if (todayStr !== txnStr) return false;
        } else if (dateFilter === 'this_week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (txnDate < weekAgo) return false;
        } else if (dateFilter === 'this_month') {
          if (txnDate.getMonth() !== now.getMonth() || txnDate.getFullYear() !== now.getFullYear()) {
            return false;
          }
        } else if (dateFilter === 'custom') {
          if (startDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            if (txnDate < start) return false;
          }
          if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            if (txnDate > end) return false;
          }
        }
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === 'newest') {
        const dateA = new Date(a.date || a.createdAt || 0);
        const dateB = new Date(b.date || b.createdAt || 0);
        return dateB - dateA;
      }
      if (sortBy === 'oldest') {
        const dateA = new Date(a.date || a.createdAt || 0);
        const dateB = new Date(b.date || b.createdAt || 0);
        return dateA - dateB;
      }
      if (sortBy === 'highest') {
        return (Number(b.amount) || 0) - (Number(a.amount) || 0);
      }
      if (sortBy === 'lowest') {
        return (Number(a.amount) || 0) - (Number(b.amount) || 0);
      }
      return 0;
    });
  }, [
    transactions, 
    searchTerm, 
    directionFilter, 
    typeFilter, 
    statusFilter, 
    methodFilter, 
    dateFilter, 
    startDate, 
    endDate, 
    sortBy
  ]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setDirectionFilter('all');
    setTypeFilter('all');
    setStatusFilter('all');
    setMethodFilter('all');
    setDateFilter('all');
    setStartDate('');
    setEndDate('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Pagination Math
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // View Details Modal
  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  // Create Transaction Submission
  const handleCreateTransaction = (formData) => {
    if (typeof createNewTransaction === 'function') {
      const created = createNewTransaction(formData);
      showNotification(`Transaction ${created.transactionId} created successfully.`);
    } else {
      showNotification('Transaction created successfully.');
    }
  };

  // Save Transaction Edit
  const handleSaveEdit = (updatedTxn) => {
    if (typeof updateTransactionRecord === 'function') {
      updateTransactionRecord(updatedTxn);
    }
    setSelectedTransaction(updatedTxn);
    showNotification(`Transaction ${updatedTxn.transactionId} updated successfully.`);
  };

  // Handle Export
  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      showNotification('No transactions available to export.');
      return;
    }
    exportTransactionsCSV(filteredTransactions);
    showNotification('Transactions exported to CSV successfully.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-[#0B1528] text-white px-5 py-3 rounded-xl shadow-2xl border border-blue-500/40 flex items-center gap-3 animate-fade-in">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{notification}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#004085]">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Transactions Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            View and manage the complete financial transaction ledger of New Utkal Finance Ltd.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Refresh transaction ledger"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Export transaction records as CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export Transactions</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#004085] hover:bg-blue-900 shadow-sm transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-blue-200" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* SUMMARY STATS CARDS */}
      <TransactionSummaryCards transactions={transactions} />

      {/* FILTERS & SEARCH TOOLBAR */}
      <TransactionFilters
        searchTerm={searchTerm}
        setSearchTerm={(val) => { setSearchTerm(val); setCurrentPage(1); }}
        directionFilter={directionFilter}
        setDirectionFilter={(val) => { setDirectionFilter(val); setCurrentPage(1); }}
        typeFilter={typeFilter}
        setTypeFilter={(val) => { setTypeFilter(val); setCurrentPage(1); }}
        statusFilter={statusFilter}
        setStatusFilter={(val) => { setStatusFilter(val); setCurrentPage(1); }}
        methodFilter={methodFilter}
        setMethodFilter={(val) => { setMethodFilter(val); setCurrentPage(1); }}
        dateFilter={dateFilter}
        setDateFilter={(val) => { setDateFilter(val); setCurrentPage(1); }}
        startDate={startDate}
        setStartDate={(val) => { setStartDate(val); setCurrentPage(1); }}
        endDate={endDate}
        setEndDate={(val) => { setEndDate(val); setCurrentPage(1); }}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onResetFilters={handleResetFilters}
      />

      {/* MAIN TRANSACTION TABLE & CARDS */}
      <TransactionTable
        transactions={paginatedTransactions}
        onViewDetails={handleViewDetails}
      />

      {/* PAGINATION */}
      {filteredTransactions.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-bold text-slate-800">
              {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
            </span>{' '}
            of <span className="font-bold text-slate-800">{filteredTransactions.length}</span> transaction records
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors ${
                currentPage === 1
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    page === currentPage
                      ? 'bg-[#004085] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors ${
                currentPage === totalPages
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CREATE TRANSACTION MODAL */}
      <CreateTransactionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        members={members}
        deposits={deposits}
        payments={payments}
        onSubmit={handleCreateTransaction}
      />

      {/* TRANSACTION DETAILS / EDIT MODAL */}
      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
        members={members}
        deposits={deposits}
        payments={payments}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
