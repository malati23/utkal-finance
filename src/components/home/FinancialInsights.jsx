import React from 'react';
import { ChevronRight } from 'lucide-react';

export function FinancialInsights() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider mb-3 shadow-xs">
            CUSTOMER EDUCATION & KNOWLEDGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Related <span className="text-blue-600">Financial Insights</span>
          </h2>
        </div>

        <button
          type="button"
          className="border border-slate-800 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 w-fit"
        >
          <span>View All Articles</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-3">
              <span>Aug 2026</span>
              <span>4 min read</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
              Zero Balance vs Regular Savings Account: Complete Comparison...
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Understand key differences in average monthly balance requirements, interest credit cycles, and digital benefits.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
            Read Article <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-3">
              <span>Aug 2026</span>
              <span>5 min read</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
              Senior Citizen Fixed Deposit Guide: Maximize Returns with...
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              How retirees can benefit from additional 0.50% interest bonus and monthly interest payout schemes.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
            Read Article <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-3">
              <span>Sep 2026</span>
              <span>6 min read</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
              MSME Business Loan Eligibility: Steps to Fast-Track Your Workin...
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              A step-by-step checklist of GST records, projected turnover, and collateral-free loan solutions in Odisha.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
            Read Article <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-3">
              <span>Sep 2026</span>
              <span>4 min read</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
              Digital Banking Safety: 10 Golden Rules to Protect Against Cyber...
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Essential security guidelines on OTP verification, UPI PIN confidentiality, and recognizing phishing attempts.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
            Read Article <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </section>
  );
}
