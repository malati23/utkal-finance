import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function AboutCTA({ onApplyNow }) {
  const context = useOutletContext();
  const handleApply = onApplyNow || (context && context.openApplyModal);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-[#0B1528] via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-14 text-center max-w-4xl mx-auto space-y-6 shadow-2xl border border-blue-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-2xl sm:text-4xl font-black leading-tight">
          Ready to Become Part of Our Growing Community?
        </h3>

        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-normal">
          Explore our services and discover how New Utkal Finance can support your financial journey with transparent terms and dedicated member service.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => handleApply && handleApply()}
            className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all uppercase tracking-wider flex items-center gap-2"
          >
            <span>Become a Member</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            to="/contact"
            className="border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all uppercase tracking-wider"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;
