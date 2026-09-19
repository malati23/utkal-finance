import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2, Send } from 'lucide-react';

export function ContactSection() {
  const [inquiryForm, setInquiryForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'Personal Loan & Advances',
    details: '',
  });
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitting(true);
    setTimeout(() => {
      setInquirySubmitting(false);
      setInquirySubmitted(true);
    }, 600);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact info */}
        <div className="lg:col-span-5 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider shadow-xs">
            HELP & SUPPORT
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Connect With Our Financial Specialists
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed">
            Have questions regarding loan eligibility, fixed deposit interest rates, or opening a new associate member account? Our dedicated advisory desk is here to assist.
          </p>

          {/* 3 Contact Info Cards */}
          <div className="space-y-4 pt-2">
            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200/90 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Principal Headquarters</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Plot no N/5-172, Nayapalli, IRC village, Bhubaneswar 751015, Odisha
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200/90 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Toll Free & Helpline</h4>
                <p className="text-xs font-bold text-slate-800 mt-1">
                  1800 123 9878 • +91 9776175240
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Monday - Saturday (9:30 AM to 6:30 PM)
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200/90 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Official Email</h4>
                <p className="text-xs font-semibold text-blue-600 mt-1">
                  bhagirathimohapatra79@gmail.com
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">www.utkalfinance.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send a Service Inquiry Form Card */}
        <div className="lg:col-span-7 bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          {inquirySubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Inquiry Received!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for reaching out. Our advisory desk will get back to you within 2 business hours.
              </p>
              <button
                type="button"
                onClick={() => setInquirySubmitted(false)}
                className="mt-4 text-xs font-bold text-blue-600 hover:underline"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Send a Service Inquiry</h3>
              <p className="text-xs text-slate-500 mb-6">
                Our advisory desk will get back to you within 2 business hours.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alok Das"
                      value={inquiryForm.fullName}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, fullName: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Contact Number * (10 Digits)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile (e.g. 986105432)"
                        value={inquiryForm.phone}
                        onChange={(e) =>
                          setInquiryForm({
                            ...inquiryForm,
                            phone: e.target.value.replace(/\D/g, ''),
                          })
                        }
                        className="w-full py-2.5 pl-3.5 pr-14 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">
                        {inquiryForm.phone.length}/10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@domain.com"
                      value={inquiryForm.email}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, email: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Select Service
                    </label>
                    <div className="relative">
                      <select
                        value={inquiryForm.service}
                        onChange={(e) =>
                          setInquiryForm({ ...inquiryForm, service: e.target.value })
                        }
                        className="w-full py-2.5 pl-3.5 pr-8 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer shadow-xs font-semibold"
                      >
                        <option value="Personal Loan & Advances">Personal Loan & Advances</option>
                        <option value="Home Loan & Griha Sudhar">Home Loan & Griha Sudhar</option>
                        <option value="MSME Business Loan">MSME Business Loan</option>
                        <option value="Gold Loan">Gold Loan</option>
                        <option value="Fixed Deposit (FD)">Fixed Deposit (FD)</option>
                        <option value="Zero Balance Savings Account">Zero Balance Savings Account</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share details regarding loan amount, deposit tenure, or specific queries..."
                    value={inquiryForm.details}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, details: e.target.value })
                    }
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={inquirySubmitting}
                  className="w-full bg-[#0B1528] hover:bg-blue-900 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-all duration-200 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{inquirySubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
