import React from 'react';
import { Target, Eye, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import photo4 from '../../assets/image copy 14.png';

export function MissionVision() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-12">
      <SectionHeading
        badge="INSTITUTIONAL PURPOSE"
        title="Guided by Clear Mission & Strategic Vision"
        subtitle="Empowering communities through sustainable financial development and integrity."
      />

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-t-4 border-t-blue-600">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-700 flex items-center justify-center mb-6 shadow-inner">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
              "To provide accessible, transparent and customer-focused financial services while building lasting relationships."
            </p>
          </div>

          <ul className="mt-8 pt-6 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Transparent interest slabs &amp; zero surprise fees</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Responsive member service desk &amp; doorstep verification</span>
            </li>
          </ul>
        </div>

        {/* Vision Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-t-4 border-t-emerald-600">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center mb-6 shadow-inner">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
              "To create a trusted financial community that supports sustainable growth and opportunity."
            </p>
          </div>

          <ul className="mt-8 pt-6 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Building financial security for local micro-enterprises</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Fostering long-term member prosperity across Odisha</span>
            </li>
          </ul>
        </div>
      </div>

      {/* PHOTO 4 Supporting Image */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 max-h-[380px] group">
        <img
          src={photo4}
          alt="Mission & Vision Visual - Financial Assistance"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent flex items-center p-8 sm:p-12">
          <div className="max-w-lg text-white space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              ETHICAL FINANCIAL PRACTICE
            </span>
            <h4 className="text-2xl sm:text-3xl font-black leading-tight">
              Empowering Communities Through Responsible Credit
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionVision;
