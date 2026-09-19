import React from 'react';
import { 
  Building2, 
  Target, 
  Users, 
  Landmark, 
  TrendingUp, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Award,
  CheckCircle2,
  Lock,
  Download
} from 'lucide-react';
import { SectionHeading } from '../SectionHeading';

export function BrochureInformation() {
  const brochureTopics = [
    {
      id: 'about',
      icon: Building2,
      badge: 'GOVERNANCE & TRUST',
      title: 'About New Utkal Finance',
      description:
        'Discover our corporate history, legal framework under Section 406 of the Companies Act 2013, statutory Nidhi Rules 2014 compliance, and transparent governance standards.',
      highlights: ['Reg. No: U64199OD2026PLC054968', 'Board of Directors & Management', 'Statutory Financial Audit'],
      color: 'blue'
    },
    {
      id: 'vision',
      icon: Target,
      badge: 'MISSION & VALUES',
      title: 'Our Vision & Mission',
      description:
        'Learn about our dedication to fostering grassroots financial literacy, driving economic development across Odisha, and nurturing trusted long-term member relationships.',
      highlights: ['Financial Inclusion Roadmap', 'Community Capital Building', 'Ethical Banking Principles'],
      color: 'amber'
    },
    {
      id: 'membership',
      icon: Users,
      badge: 'EXCLUSIVE BENEFITS',
      title: 'Membership Information',
      description:
        'Understand member rights, share acquisition criteria (minimum 10 equity shares of ₹10 each), annual dividend distribution policies, and voting privileges.',
      highlights: ['₹200 Standard Membership', 'Dividend Eligibility', 'Member Protection Policies'],
      color: 'emerald'
    },
    {
      id: 'products',
      icon: Landmark,
      badge: 'PRODUCTS & SERVICES',
      title: 'Financial Products',
      description:
        'Comprehensive breakdown of our high-yielding deposit schemes (FD up to 8.50% p.a., RD, BSBDA savings) and flexible credit facilities (Home, Gold, LAP, and Business Loans).',
      highlights: ['FD Rates up to 8.50%*', 'Gold & Mortgage Credit', 'Zero Hidden Charges'],
      color: 'cyan'
    },
    {
      id: 'benefits',
      icon: TrendingUp,
      badge: 'MEMBER VALUE',
      title: 'Customer Benefits',
      description:
        'Explore the distinct advantages of banking with us, including bank-grade 256-bit encryption, doorstep assistance, quick loan disbursement, and zero foreclosure penalties.',
      highlights: ['Rapid Loan Approvals', 'Bank-Grade Security', 'Tailored Savings Plans'],
      color: 'indigo'
    },
    {
      id: 'contact',
      icon: PhoneCall,
      badge: 'SUPPORT & LOCATIONS',
      title: 'Contact Information',
      description:
        'Find key contact details for our Registered Head Office in Nayapalli, Bhubaneswar, 24x7 toll-free support helplines, branch networks, and grievance redressal officer contact.',
      highlights: ['Toll Free: 1800 123 9878', 'Nayapalli, Bhubaneswar HQ', 'Dedicated Support Team'],
      color: 'purple'
    },
  ];

  const colorVariants = {
    blue: {
      bg: 'bg-blue-50/80',
      border: 'border-blue-200/80',
      iconBg: 'bg-blue-600 text-white',
      badge: 'bg-blue-100/80 text-blue-800 border-blue-200',
    },
    amber: {
      bg: 'bg-amber-50/80',
      border: 'border-amber-200/80',
      iconBg: 'bg-amber-500 text-slate-950',
      badge: 'bg-amber-100/80 text-amber-900 border-amber-200',
    },
    emerald: {
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-200/80',
      iconBg: 'bg-emerald-600 text-white',
      badge: 'bg-emerald-100/80 text-emerald-800 border-emerald-200',
    },
    cyan: {
      bg: 'bg-cyan-50/80',
      border: 'border-cyan-200/80',
      iconBg: 'bg-cyan-600 text-white',
      badge: 'bg-cyan-100/80 text-cyan-800 border-cyan-200',
    },
    indigo: {
      bg: 'bg-indigo-50/80',
      border: 'border-indigo-200/80',
      iconBg: 'bg-indigo-600 text-white',
      badge: 'bg-indigo-100/80 text-indigo-800 border-indigo-200',
    },
    purple: {
      bg: 'bg-purple-50/80',
      border: 'border-purple-200/80',
      iconBg: 'bg-purple-600 text-white',
      badge: 'bg-purple-100/80 text-purple-800 border-purple-200',
    },
  };

  const handleDownloadDoc = (docName) => {
    const element = document.createElement('a');
    const fileContent = `NEW UTKAL FINANCE LIMITED - STATUTORY DOSSIER DOCUMENT: ${docName}\nCIN: U64199OD2026PLC054968\nPAN: AALCN97566\nGovt. of India Certified Nidhi Company\nRegistered Office: Utkal Tower, Plot no-N/5-172, Nayapalli, Bhubaneswar-751015, Odisha.`;
    const file = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${docName.replace(/\s+/g, '_')}_UtkalFinance.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="statutory-section" className="w-full py-6 sm:py-8 scroll-mt-24 space-y-12">
      {/* Statutory Dossier Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Statutory Dossier &amp; Government Registrations
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Verified Ministry of Corporate Affairs (MCA) Baseline Filings
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider border border-emerald-200">
            Govt. Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Corporate ID (CIN)</span>
            <span className="font-extrabold text-slate-900 text-sm font-mono block">U64199OD2026PLC054968</span>
            <span className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> MCA Registered
            </span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Income Tax PAN</span>
            <span className="font-extrabold text-slate-900 text-sm font-mono block">AALCN97566</span>
            <span className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Govt. e-PAN Certified
            </span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Incorporation Date</span>
            <span className="font-extrabold text-slate-900 text-sm block">12th January 2026</span>
            <span className="text-slate-500 text-[11px] font-semibold">Registered under MCA Odisha</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Regulatory Status</span>
            <span className="font-extrabold text-slate-900 text-sm block">Nidhi Entity (Section 406)</span>
            <span className="text-blue-700 text-[11px] font-semibold">2014 &amp; 2022 Rules Compliant</span>
          </div>
        </div>

        {/* Quick Download Strip */}
        <div className="bg-[#0B1528] rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs">
            <FileCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold block text-white">Download Complete Certified Statutory Pack</span>
              <span className="text-slate-400 text-[11px]">Includes Incorporation Certificate, e-PAN, e-MOA &amp; e-AOA copies.</span>
            </div>
          </div>
          <button
            onClick={() => handleDownloadDoc('Statutory_Dossier_Pack')}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download All Copies</span>
          </button>
        </div>
      </div>

      {/* Section Header */}
      <SectionHeading
        badge="BROCHURE CONTENTS"
        title="What You Will Find Inside"
        subtitle="Our official corporate brochure offers a transparent, thorough guide to our operations, financial products, and community commitment."
        align="center"
      />

      {/* 6 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {brochureTopics.map((item) => {
          const Icon = item.icon;
          const styles = colorVariants[item.color] || colorVariants.blue;

          return (
            <div
              key={item.id}
              className={`group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-2xl ${styles.iconBg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${styles.badge} tracking-wider uppercase`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2.5 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  {item.description}
                </p>

                <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                  {item.highlights.map((hl, i) => (
                    <li key={i} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                <span>Featured in PDF</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BrochureInformation;
