/**
 * Utility functions for financial calculations (EMI, Total Interest, Total Payable)
 */

/**
 * Calculates monthly EMI
 * Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate in percent (e.g. 10.5 for 10.5%)
 * @param {number} tenureMonths - Tenure in months
 * @returns {object} { emi, totalInterest, totalPayment }
 */
export function calculateEMI(principal, annualRate, tenureMonths) {
  const p = Number(principal) || 0;
  const r = (Number(annualRate) || 0) / (12 * 100);
  const n = Number(tenureMonths) || 1;

  if (p <= 0 || n <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0 };
  }

  if (r === 0) {
    const emi = p / n;
    return {
      emi: Math.round(emi),
      totalInterest: 0,
      totalPayment: Math.round(p),
    };
  }

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}
