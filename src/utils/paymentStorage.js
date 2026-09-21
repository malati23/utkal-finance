/**
 * LocalStorage utility for Payment Management in New Utkal Finance.
 * Key: "utkal_finance_payments".
 * NO sample or fake dummy data is seeded automatically.
 * Fallback derives payments from actual Applications & Deposits if key is empty.
 */

import { getApplications } from './storage';
import { getDeposits } from './depositStorage';

const PAYMENTS_KEY = 'utkal_finance_payments';

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
 * Generate derived payment records from existing applications & deposits
 */
function getDerivedInitialPayments() {
  const apps = getApplications();
  const deposits = getDeposits();
  const derived = [];

  // 1. Applications Payments
  apps.forEach((app) => {
    const appId = app.id || app.applicationId || '';
    const status = app.status === 'Approved' ? 'Paid' : app.status === 'Rejected' ? 'Failed' : 'Pending';

    derived.push({
      id: `PAY-${appId.replace('NUF-', '')}`,
      paymentId: `PAY-${appId.replace('NUF-', '')}`,
      memberId: app.memberId || '',
      memberName: app.applicantName || 'Applicant',
      applicationId: appId,
      depositId: '',
      purpose: 'Membership Application Fee',
      amount: Number(app.totalPaid) || 200,
      paymentMethod: app.paymentMethod || 'UPI (Google Pay)',
      utrNo: app.utrNo || `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      transactionId: app.utrNo || `TXN-${appId.replace('NUF-', '')}`,
      date: app.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      rawDate: app.createdAt || new Date().toISOString(),
      status,
      notes: 'Initial statutory membership application processing fee.',
      history: [
        {
          field: 'Payment Status',
          oldValue: 'Created',
          newValue: status,
          changedAt: app.date || new Date().toLocaleString('en-GB'),
          changedBy: 'System',
        },
      ],
      createdAt: app.createdAt || new Date().toISOString(),
    });
  });

  // 2. Deposits Payments
  deposits.forEach((dep) => {
    const depId = dep.depositId || dep.id || '';
    if (!derived.some((p) => p.depositId === depId)) {
      derived.push({
        id: `PAY-DEP-${depId.replace('DEP-2026-', '')}`,
        paymentId: `PAY-DEP-${depId.replace('DEP-2026-', '')}`,
        memberId: dep.memberId || '',
        memberName: dep.applicantName || dep.memberName || 'Member',
        applicationId: dep.applicationId || '',
        depositId: depId,
        purpose: `${dep.depositType || 'Fixed Deposit'} Opening`,
        amount: Number(dep.amount) || 0,
        paymentMethod: dep.paymentMethod || 'UPI (Google Pay)',
        utrNo: dep.utrNo || dep.transactionId || `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        transactionId: dep.transactionId || dep.utrNo || `TXN-DEP-${depId.replace('DEP-', '')}`,
        date: dep.depositDate || dep.startDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        rawDate: dep.createdAt || new Date().toISOString(),
        status: dep.status === 'Rejected' ? 'Failed' : dep.status === 'Pending' ? 'Pending' : 'Paid',
        notes: dep.notes || 'Member deposit contribution.',
        history: [
          {
            field: 'Payment Status',
            oldValue: 'Draft',
            newValue: dep.status === 'Rejected' ? 'Failed' : 'Paid',
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
 * Get all payment records stored in localStorage.
 * If empty, initializes with derived records from applications & deposits.
 */
export function getPayments() {
  const stored = getItem(PAYMENTS_KEY, null);
  if (!stored) {
    const initialDerived = getDerivedInitialPayments();
    if (initialDerived.length > 0) {
      setItem(PAYMENTS_KEY, initialDerived);
    }
    return initialDerived;
  }
  return stored;
}

/**
 * Save payments array to localStorage
 */
export function savePayments(payments) {
  setItem(PAYMENTS_KEY, payments);
}

/**
 * Generate a unique Payment ID (e.g. PAY-2026-1001)
 */
export function generatePaymentId() {
  const payments = getPayments();
  let maxNum = 1000;

  payments.forEach((p) => {
    const rawId = p.paymentId || p.id || '';
    const match = rawId.match(/PAY-(?:\d+-)?(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  });

  return `PAY-2026-${maxNum + 1}`;
}

/**
 * Add a new payment record to localStorage.
 */
export function addPayment(paymentData = {}) {
  const payments = getPayments();
  const paymentId = paymentData.paymentId || paymentData.id || generatePaymentId();

  const newPayment = {
    id: paymentId,
    paymentId,
    memberId: paymentData.memberId || '',
    memberName: paymentData.memberName || paymentData.applicantName || '',
    applicationId: paymentData.applicationId || '',
    depositId: paymentData.depositId || '',
    purpose: paymentData.purpose || paymentData.paymentPurpose || 'Membership Fee',
    amount: Number(paymentData.amount) || 0,
    paymentMethod: paymentData.paymentMethod || 'UPI (Google Pay)',
    utrNo: paymentData.utrNo || paymentData.transactionId || `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`,
    transactionId: paymentData.transactionId || paymentData.utrNo || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
    date: paymentData.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    rawDate: paymentData.rawDate || new Date().toISOString(),
    status: paymentData.status || 'Paid',
    notes: paymentData.notes || '',
    history: [
      {
        field: 'Payment Account',
        oldValue: 'Created',
        newValue: paymentData.status || 'Paid',
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
    ...paymentData,
  };

  payments.unshift(newPayment);
  savePayments(payments);
  return newPayment;
}

/**
 * Update an existing payment record with audit logging
 */
export function updatePayment(paymentId, updatedFields = {}) {
  const payments = getPayments();
  let updatedRecord = null;

  const updatedPayments = payments.map((p) => {
    if (p.id === paymentId || p.paymentId === paymentId) {
      const history = Array.isArray(p.history) ? [...p.history] : [];

      const fieldLabels = {
        purpose: 'Payment Purpose',
        amount: 'Payment Amount',
        paymentMethod: 'Payment Method',
        utrNo: 'UTR / Reference Number',
        date: 'Payment Date',
        status: 'Payment Status',
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
          p[key] !== undefined &&
          String(p[key]).trim() !== String(updatedFields[key]).trim()
        ) {
          history.unshift({
            field: fieldLabels[key],
            oldValue: key === 'amount' ? `₹${Number(p[key]).toLocaleString('en-IN')}` : String(p[key] || 'Empty'),
            newValue: key === 'amount' ? `₹${Number(updatedFields[key]).toLocaleString('en-IN')}` : String(updatedFields[key] || 'Empty'),
            changedAt: nowFormatted,
            changedBy: 'Admin',
          });
        }
      });

      updatedRecord = {
        ...p,
        ...updatedFields,
        history,
        updatedAt: new Date().toISOString(),
      };
      return updatedRecord;
    }
    return p;
  });

  savePayments(updatedPayments);
  return updatedRecord;
}

/**
 * Verify payment helper (sets status to 'Paid')
 */
export function verifyPayment(paymentId) {
  return updatePayment(paymentId, { status: 'Paid' });
}

/**
 * Refund payment helper (sets status to 'Refunded')
 */
export function refundPayment(paymentId) {
  return updatePayment(paymentId, { status: 'Refunded' });
}

/**
 * Export actual payments as CSV download
 */
export function exportPaymentsCSV(paymentsList = []) {
  if (paymentsList.length === 0) return;

  const headers = ['Payment ID', 'Member ID', 'Member Name', 'Purpose', 'Amount (INR)', 'Payment Method', 'UTR / Ref No', 'Date', 'Status'];
  const rows = paymentsList.map((p) => [
    `"${p.paymentId || p.id}"`,
    `"${p.memberId || 'N/A'}"`,
    `"${p.memberName || 'N/A'}"`,
    `"${p.purpose || 'Membership Fee'}"`,
    `"${p.amount || 0}"`,
    `"${p.paymentMethod || 'UPI'}"`,
    `"${p.utrNo || 'N/A'}"`,
    `"${p.date || 'N/A'}"`,
    `"${p.status || 'Paid'}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Utkal_Finance_Payments_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
