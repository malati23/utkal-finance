import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function BrochurePreview() {
  const creditSolutions = [
    {
      pill: 'Secured Property',
      pillColor: 'bg-blue-100/70 text-blue-700 border-blue-200/60',
      title: 'Home Construction & Extension Loan',
      description: 'Long-term capital for residential home construction, plot purchase, and home improvement across Odisha.',
      interest: '8.50% - 9.50% p.a.',
      tenure: 'Up to 240 Mo'
    },
    {
      pill: 'MSME Expansion',
      pillColor: 'bg-emerald-100/70 text-emerald-700 border-emerald-200/60',
      title: 'Business & Trade Commercial Loan',
      description: 'Working capital financing, machinery acquisition, and inventory enhancement for verified local traders.',
      interest: '10.0% - 12.0% p.a.',
      tenure: 'Up to 84 Mo'
    },
    {
      pill: 'Instant Collateral',
      pillColor: 'bg-amber-100/70 text-amber-800 border-amber-200/60',
      title: 'Gold & Precious Metal Loan',
      description: 'Same-day disbursal backed by physical hallmark bullion assessment with secure high-security branch vaulting.',
      interest: '8.00% - 9.00% p.a.',
      tenure: 'Up to 24 Mo'
    },
    {
      pill: 'Vehicle Mobility',
      pillColor: 'bg-indigo-100/70 text-indigo-700 border-indigo-200/60',
      title: 'Commercial & Two-Wheeler Finance',
      description: 'Affordable vehicle loans for commercial utility operators, farmers, and family transport mobility.',
      interest: '9.00% - 10.5% p.a.',
      tenure: 'Up to 60 Mo'
    },
    {
      pill: 'Personal Credit',
      pillColor: 'bg-rose-100/70 text-rose-700 border-rose-200/60',
      title: 'Personal & Emergency Credit Facility',
      description: 'Emergency financial liquidity for medical expenses, higher education, marriage, and family events.',
      interest: '11.5% - 13.5% p.a.',
      tenure: 'Up to 48 Mo'
    },
    {
      pill: 'Agri Infrastructure',
      pillColor: 'bg-teal-100/70 text-teal-700 border-teal-200/60',
      title: 'Agricultural & Kisan Equipment Loan',
      description: 'Subsidized credit lines for irrigation equipment, cold-storage, seeds, and seasonal crop investments.',
      interest: '7.50% - 8.50% p.a.',
      tenure: 'Up to 60 Mo'
    }
  ];

  const depositSchemes = [
    {
      title: 'High-Yield Fixed Deposit (FD)',
      minDeposit: '₹5,000',
      tenure: '12 to 60 Months',
      roi: '7.25% - 9.00%',
      benefits: '+0.50% p.a. extra for Senior Citizens'
    },
    {
      title: 'Monthly Recurring Deposit (RD)',
      minDeposit: '₹500 / month',
      tenure: '12 to 36 Months',
      roi: '6.75% - 8.00%',
      benefits: 'Auto-debit through NACH / UPI mandate'
    },
    {
      title: 'Daily Micro-Savings (Pigmy)',
      minDeposit: '₹50 / day',
      tenure: '6 to 24 Months',
      roi: '5.50% - 6.50%',
      benefits: 'Doorstep Collection by Verified Associates'
    },
    {
      title: 'Special Growth Bonds',
      minDeposit: '₹25,000',
      tenure: '100 Months',
      roi: '8.50% Guaranteed',
      benefits: 'Double Capital Return on Maturity'
    }
  ];

  const membershipSteps = [
    {
      num: '1',
      badgeBg: 'bg-[#0B1528]',
      title: 'Application Submission',
      desc: 'Applicant submits legal biodata, occupation, address, nominee, and witness details via portal or 2-page branch form.'
    },
    {
      num: '2',
      badgeBg: 'bg-[#0B1528]',
      title: '₹200 Statutory Fee',
      desc: 'Mandatory entry fee & minimum 10 equity shares allocation under Section 45-IA statutory framework.'
    },
    {
      num: '3',
      badgeBg: 'bg-[#0B1528]',
      title: 'Identity & KYC Audit',
      desc: 'Verification of Aadhaar, PAN card, educational credential, proof of birth, and biometric / signature capture.'
    },
    {
      num: '4',
      badgeBg: 'bg-emerald-700',
      title: 'Activation & Passbook',
      desc: 'Managing Director / Admin clearance unlocks official Member ID, digital portal access, and loan eligibility.'
    }
  ];

  return (
    <div className="space-y-12 w-full">
      {/* 1. CUSTOMER HANDOVER AUDIT CERTIFICATE CARD */}
      <div className="bg-[#f8faf9] rounded-3xl p-6 sm:p-10 border-2 border-dashed border-emerald-300/80 shadow-xs relative overflow-hidden w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              VERIFIED CLEAN LEDGER
            </span>
          </div>

          <div className="text-xs font-normal text-slate-500 font-mono">
            Baseline Clearance Date:{' '}
            <strong className="text-slate-800 font-bold text-xs sm:text-sm">17 September 2026</strong>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-2 mb-3">
          Customer Handover Audit Certificate
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mb-8">
          This certifies that <strong className="text-slate-900 font-semibold">Newutkal Finance Limited</strong> has established an unencumbered, pristine zero-balance operational state across all institutional ledgers. The portal, branch database, and lending management engines are calibrated to ₹0.00 with zero historical liabilities or non-performing assets, guaranteeing complete audit readiness for customer handover.
        </p>

        {/* 4 Baseline Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-center space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              ACTIVE MEMBERS
            </span>
            <span className="text-2xl font-bold text-slate-900 block">0</span>
            <span className="text-[11px] font-semibold text-emerald-600 block">Ready for Onboarding</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-center space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              DISBURSED LOANS
            </span>
            <span className="text-2xl font-bold text-slate-900 block">₹0</span>
            <span className="text-[11px] font-normal text-slate-500 block">Zero Debt Exposure</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-center space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              PUBLIC DEPOSITS
            </span>
            <span className="text-2xl font-bold text-slate-900 block">₹0</span>
            <span className="text-[11px] font-normal text-slate-500 block">Zero Liabilities</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-center space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              NPA &amp; OVERDUES
            </span>
            <span className="text-2xl font-bold text-emerald-600 block">0.00%</span>
            <span className="text-[11px] font-semibold text-emerald-600 block">Pristine Health</span>
          </div>
        </div>
      </div>

      {/* 2. PRODUCT PORTFOLIO & INTEREST FRAMEWORK HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-2 pt-6">
        <span className="text-xs sm:text-sm font-bold text-blue-700 uppercase tracking-widest block">
          PRODUCT PORTFOLIO &amp; INTEREST FRAMEWORK
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Empowering Financial Independence Through Tailored Solutions
        </h2>
        <div className="w-12 h-1 bg-blue-700 rounded-full mx-auto mt-2" />
      </div>

      {/* 3. SUBSECTION 1: RETAIL & COMMERCIAL CREDIT SOLUTIONS */}
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs">
            💳
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            1. Retail &amp; Commercial Credit Solutions
          </h3>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {creditSolutions.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                <span className={`inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${item.pillColor}`}>
                  {item.pill}
                </span>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-normal text-slate-500">
                <div>
                  <span className="text-slate-500">Interest: </span>
                  <strong className="text-slate-800 font-semibold">{item.interest}</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Tenure: </span>
                  <strong className="text-slate-800 font-semibold">{item.tenure}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SUBSECTION 2: MEMBER DEPOSIT & CAPITAL ACCUMULATION SCHEMES */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-xs">
            📈
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            2. Member Deposit &amp; Capital Accumulation Schemes
          </h3>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs">
                  <th className="py-3.5 px-4">Scheme Title</th>
                  <th className="py-3.5 px-4">Min. Deposit</th>
                  <th className="py-3.5 px-4">Tenure</th>
                  <th className="py-3.5 px-4">Annual Return (ROI)</th>
                  <th className="py-3.5 px-4">Special Benefits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {depositSchemes.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.title}</td>
                    <td className="py-3.5 px-4 font-normal text-slate-600">{row.minDeposit}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-normal">{row.tenure}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{row.roi}</td>
                    <td className="py-3.5 px-4 text-slate-500 font-normal">{row.benefits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. SUBSECTION 3: STATUTORY MEMBERSHIP & KYC WORKFLOW */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs">
            👥
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            3. Statutory Membership &amp; KYC Workflow
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {membershipSteps.map((step) => (
            <div key={step.num} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-start space-y-3">
              <div className={`w-8 h-8 rounded-full ${step.badgeBg} text-white font-bold text-sm flex items-center justify-center shrink-0`}>
                {step.num}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900 leading-snug">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrochurePreview;
