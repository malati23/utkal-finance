import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { validateContactForm } from '../utils/validators';
import { sendContactInquiry } from '../services/contactService';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await sendContactInquiry(formData);
      setSubmittedResult(res);
    } catch (err) {
      setErrors({ form: 'Failed to send inquiry. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center max-w-3xl relative z-10">
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-400/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Contact Utkal Finance
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Have questions regarding loan eligibility, documentation, or status? We're here to assist you.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Head Office & Support
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Registered Office</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Janpath Road, Saheed Nagar, Bhubaneswar, Odisha - 751007
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Phone Hotline</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Toll-Free: +91 1800 123 4567<br />
                    Office: +91 674 250 9988
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Email Address</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    support@utkalfinance.com<br />
                    inquiries@utkalfinance.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Operating Hours</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Monday to Saturday: 9:30 AM - 6:30 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Map Placeholder Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                Branch Location
              </span>
              <h4 className="text-lg font-bold">Visiting Us In Person?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our customer service desks in Bhubaneswar and Cuttack are open for walk-in consultations.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            {submittedResult ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Inquiry Sent Successfully!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">{submittedResult.message}</p>
                <div className="bg-slate-50 rounded-xl p-4 inline-block text-left text-xs border border-slate-200">
                  <span className="text-slate-500 font-medium">Ticket Reference: </span>
                  <span className="font-bold text-blue-600">{submittedResult.ticketNumber}</span>
                </div>
                <div className="pt-4">
                  <Button variant="outline" onClick={() => setSubmittedResult(null)}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Send Us A Message</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormInput
                    label="Your Name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <FormInput
                      label="Mobile Number"
                      name="phone"
                      type="tel"
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <FormInput
                    label="Subject"
                    name="subject"
                    type="select"
                    options={[
                      'General Loan Inquiry',
                      'Personal Loan Assistance',
                      'Business Loan Assistance',
                      'Home Loan Assistance',
                      'Gold Loan Assistance',
                      'Application Status Check',
                      'Feedback or Grievance',
                    ]}
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Message"
                    name="message"
                    type="textarea"
                    rows={4}
                    placeholder="Describe your inquiry or requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={submitting}
                    icon={Send}
                    iconPosition="right"
                  >
                    Send Inquiry
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
