/**
 * LocalStorage utility for Transactions Management in New Utkal Finance.
 * Key: "utkal_finance_transactions".
 * NO sample or fake dummy data is seeded automatically.
 * Fallback derives financial ledger records from existing Payments & Deposits.
 */

import { getPayments } from './paymentStorage';
import { getDeposits } from './depositStorage';
import { getMembers } from './storage';

const TRANSACTIONS_KEY = 'utkal_finance_transactions';

/**
 * Safely parse JSON from localStorage
 */
function getItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : defaultValue;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return defaultValue;
  }
}

/**
 * Safely save JSON to localStorage
 */
function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

/**
 * Generate derived transactions from existing payments and deposits in the application
 */
function getDerivedInitialTransactions() {
  const payments = getPayments();
  const deposits = getDeposits();
  const derived = [];

  // 1. From Payments
  payments.forEach((p) => {
    const pId = p.paymentId || p.id || '';
    const isCredit = (p.status || '').toLowerCase() !== 'refunded' && (p.status || '').toLowerCase() !== 'failed';

    derived.push({
      id: `TXN-${pId.replace('PAY-', '')}`,
      txnId: `TXN-${pId.replace('PAY-', '')}`,
      transactionId: `TXN-${pId.replace('PAY-', '')}`,
      memberId: p.memberId || '',
      memberName: p.memberName || p.member || 'Member',
      paymentId: pId,
      depositId: p.depositId || '',
      applicationId: p.applicationId || '',
      type: p.purpose?.includes('Deposit') ? 'Deposit' : 'Payment',
      description: p.purpose || 'Statutory Fee Payment',
      amount: Number(p.amount) || 0,
      direction: isCredit ? 'Credit' : 'Debit',
      paymentMethod: p.paymentMethod || p.method || 'UPI (Google Pay)',
      utrNo: p.utrNo || p.utr || p.transactionId || '',
      date: p.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      rawDate: p.rawDate || new Date().toISOString(),
      status: (p.status || '').toLowerCase() === 'paid' ? 'Completed' : (p.status || '').toLowerCase() === 'refunded' ? 'Refunded' : 'Pending',
      notes: p.notes || '',
      history: [
        {
          field: 'Ledger Post',
          oldValue: 'Created',
          newValue: (p.status || '').toLowerCase() === 'paid' ? 'Completed' : 'Pending',
          changedAt: p.date || new Date().toLocaleString('en-GB'),
          changedBy: 'System',
        },
      ],
      createdAt: p.createdAt || new Date().toISOString(),
    });
  });

  // 2. From Deposits (if not already posted from payment)
  deposits.forEach((dep) => {
    const depId = dep.depositId || dep.id || '';
    if (!derived.some((t) => t.depositId === depId)) {
      derived.push({
        id: `TXN-DEP-${depId.replace('DEP-2026-', '')}`,
        txnId: `TXN-DEP-${depId.replace('DEP-2026-', '')}`,
        transactionId: `TXN-DEP-${depId.replace('DEP-2026-', '')}`,
        memberId: dep.memberId || '',
        memberName: dep.applicantName || dep.memberName || 'Member',
        paymentId: dep.paymentId || '',
        depositId: depId,
        applicationId: dep.applicationId || '',
        type: 'Deposit',
        description: `${dep.depositType || 'Fixed Deposit'} Balance Opening`,
        amount: Number(dep.amount) || 0,
        direction: 'Credit',
        paymentMethod: dep.paymentMethod || 'UPI (Google Pay)',
        utrNo: dep.utrNo || dep.transactionId || '',
        date: dep.depositDate || dep.startDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        rawDate: dep.createdAt || new Date().toISOString(),
        status: dep.status === 'Rejected' ? 'Failed' : dep.status === 'Pending' ? 'Pending' : 'Completed',
        notes: dep.notes || '',
        history: [
          {
            field: 'Ledger Post',
            oldValue: 'Opening',
            newValue: 'Completed',
            changedAt: dep.depositDate || new Date().toLocaleString('en-GB'),
            changedBy: 'System',
          },
        ],
        createdAt: dep.createdAt || new Date().toISOString(),
      });
    }
  });

  return derived;
}

/**
 * Get all transaction records stored in localStorage.
 * If empty, initializes with derived records from Payments & Deposits.
 */
export function getTransactions() {
  const stored = getItem(TRANSACTIONS_KEY, null);
  if (!stored) {
    const initialDerived = getDerivedInitialTransactions();
    if (initialDerived.length > 0) {
      setItem(TRANSACTIONS_KEY, initialDerived);
    }
    return initialDerived;
  }
  return stored;
}

/**
 * Save transactions array to localStorage
 */
export function saveTransactions(transactions) {
  setItem(TRANSACTIONS_KEY, transactions);
}

/**
 * Retrieve a single transaction by ID
 */
export function getTransactionById(txnId) {
  if (!txnId) return null;
  const transactions = getTransactions();
  return transactions.find(
    (t) => t.id === txnId || t.txnId === txnId || t.transactionId === txnId
  ) || null;
}

/**
 * Generate a unique Transaction ID (e.g. TXN-2026-1001)
 */
export function generateTransactionId() {
  const transactions = getTransactions();
  let maxNum = 1000;

  transactions.forEach((t) => {
    const rawId = t.txnId || t.transactionId || t.id || '';
    const match = rawId.match(/TXN-(?:\d+-)?(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  });

  return `TXN-2026-${maxNum + 1}`;
}

/**
 * Add a new real transaction to localStorage
 */
export function addTransaction(transactionData = {}) {
  const transactions = getTransactions();
  const txnId = transactionData.txnId || transactionData.transactionId || transactionData.id || generateTransactionId();

  const newTransaction = {
    id: txnId,
    txnId,
    transactionId: txnId,
    memberId: transactionData.memberId || '',
    memberName: transactionData.memberName || transactionData.applicantName || '',
    paymentId: transactionData.paymentId || '',
    depositId: transactionData.depositId || '',
    applicationId: transactionData.applicationId || '',
    type: transactionData.type || 'Payment',
    description: transactionData.description || 'General Financial Transaction',
    amount: Number(transactionData.amount) || 0,
    direction: transactionData.direction || 'Credit',
    paymentMethod: transactionData.paymentMethod || 'UPI (Google Pay)',
    utrNo: transactionData.utrNo || `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`,
    date: transactionData.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    rawDate: new Date().toISOString(),
    status: transactionData.status || 'Completed',
    notes: transactionData.notes || '',
    history: [
      {
        field: 'Ledger Post',
        oldValue: 'Initiated',
        newValue: transactionData.status || 'Completed',
        changedAt: new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        changedBy: 'Admin',
      },
    ],
    createdAt: new Date().toISOString(),
    ...transactionData,
  };

  transactions.unshift(newTransaction);
  saveTransactions(transactions);
  return newTransaction;
}

/**
 * Update an existing transaction record with audit logging
 */
export function updateTransaction(txnId, updatedFields = {}) {
  const transactions = getTransactions();
  let updatedRecord = null;

  const updatedTransactions = transactions.map((t) => {
    if (t.id === txnId || t.txnId === txnId || t.transactionId === txnId) {
      const history = Array.isArray(t.history) ? [...t.history] : [];

      const fieldLabels = {
        type: 'Transaction Type',
        description: 'Description',
        amount: 'Transaction Amount',
        direction: 'Direction (Credit/Debit)',
        paymentMethod: 'Payment Method',
        utrNo: 'UTR / Reference Number',
        status: 'Status',
        notes: 'Admin Notes',
      };

      const nowFormatted = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      Object.keys(updatedFields).forEach((key) => {
        if (
          fieldLabels[key] &&
          t[key] !== undefined &&
          String(t[key]).trim() !== String(updatedFields[key]).trim()
        ) {
          history.unshift({
            field: fieldLabels[key],
            oldValue: key === 'amount' ? `₹${Number(t[key]).toLocaleString('en-IN')}` : String(t[key] || 'Empty'),
            newValue: key === 'amount' ? `₹${Number(updatedFields[key]).toLocaleString('en-IN')}` : String(updatedFields[key] || 'Empty'),
            changedAt: nowFormatted,
            changedBy: 'Admin',
          });
        }
      });

      updatedRecord = {
        ...t,
        ...updatedFields,
        history,
        updatedAt: new Date().toISOString(),
      };
      return updatedRecord;
    }
    return t;
  });

  saveTransactions(updatedTransactions);
  return updatedRecord;
}

/**
 * Export actual transactions as CSV download
 */
export function exportTransactionsCSV(transactionsList = []) {
  if (transactionsList.length === 0) return;

  const headers = ['Transaction ID', 'Member ID', 'Member Name', 'Type', 'Description', 'Amount (INR)', 'Direction', 'Payment Method', 'UTR / Ref No', 'Date', 'Status'];
  const rows = transactionsList.map((t) => [
    `"${t.txnId || t.id}"`,
    `"${t.memberId || 'N/A'}"`,
    `"${t.memberName || 'N/A'}"`,
    `"${t.type || 'Payment'}"`,
    `"${t.description || 'N/A'}"`,
    `"${t.amount || 0}"`,
    `"${t.direction || 'Credit'}"`,
    `"${t.paymentMethod || 'UPI'}"`,
    `"${t.utrNo || 'N/A'}"`,
    `"${t.date || 'N/A'}"`,
    `"${t.status || 'Completed'}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Utkal_Finance_Transactions_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
