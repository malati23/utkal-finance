import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus } from 'lucide-react';

export function GalleryCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 font-sans">
      <div className="bg-[#0B1528] rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl text-white text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-400/10 text-amber-300 border border-amber-400/30 uppercase tracking-widest">
            JOIN US
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Be Part of Our Growing Community
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            Learn more about New Utkal Finance and our membership opportunities.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/about"
              className="border border-slate-300 hover:border-slate-400 text-slate-900 bg-white hover:bg-slate-100 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-xs inline-flex items-center gap-2 uppercase tracking-wider"
            >
              <span>About Us</span>
            </Link>

            <Link
              to="/register"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-700/20 transition-all inline-flex items-center gap-2 uppercase tracking-wider"
            >
              <UserPlus className="w-4 h-4 text-amber-400" />
              <span>Become a Member</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GalleryCTA;
