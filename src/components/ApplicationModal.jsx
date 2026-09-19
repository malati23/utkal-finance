import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import { FormInput } from './FormInput';
import { Button } from './Button';
import { validateLoanForm } from '../utils/validators';
import { submitLoanApplication } from '../services/loanService';

export function ApplicationModal({ isOpen, onClose, selectedLoan = null }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    loanType: selectedLoan ? selectedLoan.title : 'Personal Loan',
    loanAmount: selectedLoan ? selectedLoan.minAmount : '100000',
    employmentType: 'Salaried',
    city: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateLoanForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitLoanApplication(formData);
      setSubmittedResult(res);
    } catch (err) {
      setErrors({ form: 'Application submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedResult(null);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedResult ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
            <p className="text-sm text-slate-600 mb-4">{submittedResult.message}</p>
            <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left border border-slate-200">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Application ID</p>
              <p className="text-lg font-bold text-blue-600">{submittedResult.applicationId}</p>
            </div>
            <Button variant="primary" fullWidth onClick={resetAndClose}>
              Done
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                Fast Processing
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">Apply for Financial Assistance</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill in basic details and our loan specialist will get in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Full Name"
                name="fullName"
                placeholder="e.g. Rahul Sharma"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Mobile Number"
                  name="phone"
                  type="tel"
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Loan Category"
                  name="loanType"
                  type="select"
                  options={[
                    'Personal Loan',
                    'Business Growth Loan',
                    'Home & Property Loan',
                    'Gold Loan Assist',
                    'Vehicle & Auto Loan',
                    'Micro Enterprise Loan',
                  ]}
                  value={formData.loanType}
                  onChange={handleChange}
                  error={errors.loanType}
                  required
                />

                <FormInput
                  label="Required Amount (₹)"
                  name="loanAmount"
                  type="number"
                  placeholder="e.g. 200000"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  error={errors.loanAmount}
                  required
                />
              </div>

              <FormInput
                label="Employment Type"
                name="employmentType"
                type="select"
                options={['Salaried', 'Self-Employed / Business', 'Professional', 'Other']}
                value={formData.employmentType}
                onChange={handleChange}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  isLoading={submitting}
                  icon={Send}
                  iconPosition="right"
                >
                  Submit Application
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Your information is encrypted & kept strictly confidential.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
