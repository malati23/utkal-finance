/**
 * Formatting helpers for currency, percentages, and numbers.
 */

/**
 * Formats a number to Indian Rupee (INR) currency format (e.g. ₹ 5,00,000)
 * @param {number} amount 
 * @returns {string}
 */
export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹ 0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats large numbers into Lakhs (L) or Crores (Cr)
 * @param {number} num 
 * @returns {string}
 */
export function formatCompactCurrency(num) {
  if (num >= 10000000) {
    return `₹ ${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `₹ ${(num / 100000).toFixed(2)} Lakh`;
  }
  return formatCurrency(num);
}

/**
 * Formats percentage
 * @param {number} rate 
 * @returns {string}
 */
export function formatPercent(rate) {
  return `${Number(rate || 0).toFixed(2)}%`;
}
