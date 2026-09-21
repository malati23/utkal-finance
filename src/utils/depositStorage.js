/**
 * LocalStorage utility for Deposit Management in New Utkal Finance.
 * Uses localStorage key "utkal_finance_deposits".
 * NO sample or dummy data is seeded automatically.
 */

const DEPOSITS_KEY = 'utkal_finance_deposits';

/**
 * Safely parse JSON from localStorage
 */
function getItem(key, defaultValue = []) {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      // Check legacy key if main key empty
      const legacyItem = localStorage.getItem('newUtkalFinanceDeposits');
      if (legacyItem) {
        const parsedLegacy = JSON.parse(legacyItem);
        if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
          localStorage.setItem(key, legacyItem);
          return parsedLegacy;
        }
      }
      return defaultValue;
    }
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
 * Get all actual deposit records stored in localStorage.
 * Returns an empty array if no records exist.
 */
export function getDeposits() {
  return getItem(DEPOSITS_KEY, []);
}

/**
 * Save deposits array to localStorage
 */
export function saveDeposits(deposits) {
  setItem(DEPOSITS_KEY, deposits);
}

/**
 * Retrieve a specific deposit record by deposit ID
 */
export function getDepositById(depositId) {
  if (!depositId) return null;
  const deposits = getDeposits();
  return deposits.find(
    (d) => d.id === depositId || d.depositId === depositId
  ) || null;
}

/**
 * Generate a unique deposit ID (e.g. DEP-2026-1001)
 */
export function generateDepositId() {
  const deposits = getDeposits();
  let maxNum = 1000;
  
  deposits.forEach((dep) => {
    const rawId = dep.depositId || dep.id || '';
    const match = rawId.match(/DEP-(?:\d+-)?(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  });

  return `DEP-2026-${maxNum + 1}`;
}

/**
 * Add a new real deposit record to localStorage.
 * Call this when a member or user submits a deposit form.
 */
export function addDeposit(depositData = {}) {
  const deposits = getDeposits();
  const id = depositData.depositId || depositData.id || generateDepositId();
  
  const newDeposit = {
    id,
    depositId: id,
    memberId: depositData.memberId || '',
    applicantName: depositData.applicantName || depositData.memberName || '',
    depositType: depositData.depositType || 'Fixed Deposit',
    amount: Number(depositData.amount) || 0,
    duration: depositData.duration || '12 Months',
    interestRate: depositData.interestRate || '7.50%',
    startDate: depositData.startDate || depositData.depositDate || new Date().toISOString().split('T')[0],
    depositDate: depositData.depositDate || depositData.startDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    maturityDate: depositData.maturityDate || '',
    paymentMethod: depositData.paymentMethod || 'UPI (Google Pay)',
    paymentId: depositData.paymentId || `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
    transactionId: depositData.transactionId || depositData.utrNo || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
    utrNo: depositData.utrNo || depositData.transactionId || '',
    status: depositData.status || 'Active',
    notes: depositData.notes || '',
    branch: depositData.branch || 'Bhubaneswar HQ (Nayapalli, IRC Village)',
    history: depositData.history || [
      {
        field: 'Account Status',
        oldValue: 'Draft',
        newValue: depositData.status || 'Active',
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
    ...depositData,
  };

  deposits.unshift(newDeposit);
  saveDeposits(deposits);
  return newDeposit;
}

/**
 * Update an existing deposit's fields (including status & audit logging)
 */
export function updateDeposit(depositId, updatedFields = {}) {
  const deposits = getDeposits();
  let updatedRecord = null;

  const updatedDeposits = deposits.map((dep) => {
    if (dep.id === depositId || dep.depositId === depositId) {
      const history = Array.isArray(dep.history) ? [...dep.history] : [];

      const fieldLabels = {
        depositType: 'Deposit Type',
        amount: 'Deposit Amount',
        depositDate: 'Deposit Date',
        maturityDate: 'Maturity Date',
        paymentMethod: 'Payment Method',
        utrNo: 'UTR / Reference Number',
        status: 'Deposit Status',
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
          dep[key] !== undefined &&
          String(dep[key]).trim() !== String(updatedFields[key]).trim()
        ) {
          history.unshift({
            field: fieldLabels[key],
            oldValue: key === 'amount' ? `₹${Number(dep[key]).toLocaleString('en-IN')}` : String(dep[key] || 'Not specified'),
            newValue: key === 'amount' ? `₹${Number(updatedFields[key]).toLocaleString('en-IN')}` : String(updatedFields[key] || 'Not specified'),
            changedAt: nowFormatted,
            changedBy: 'Admin',
          });
        }
      });

      updatedRecord = {
        ...dep,
        ...updatedFields,
        history,
        updatedAt: new Date().toISOString(),
      };
      return updatedRecord;
    }
    return dep;
  });

  saveDeposits(updatedDeposits);
  return updatedRecord;
}

/**
 * Update deposit status helper
 */
export function updateDepositStatus(depositId, newStatus) {
  return updateDeposit(depositId, { status: newStatus });
}
