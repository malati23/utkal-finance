/**
 * Validation utilities for forms
 */

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validatePhone(phone) {
  const re = /^[6-9]\d{9}$/; // Indian 10-digit mobile number pattern
  return re.test(String(phone).replace(/\s+/g, ''));
}

export function validateLoanForm(formData) {
  const errors = {};

  if (!formData.fullName || formData.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.';
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!formData.phone || !validatePhone(formData.phone)) {
    errors.phone = 'Please provide a valid 10-digit mobile number.';
  }

  if (!formData.loanAmount || Number(formData.loanAmount) < 10000) {
    errors.loanAmount = 'Minimum loan amount is ₹ 10,000.';
  }

  if (!formData.loanType) {
    errors.loanType = 'Please select a loan type.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateContactForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name is required.';
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Valid email is required.';
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
