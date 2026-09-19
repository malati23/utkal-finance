import React from 'react';
import { Users, Heart, ShieldCheck } from 'lucide-react';

export function GalleryIntro() {
  return (
    <section className="bg-slate-100/70 py-12 sm:py-16 border-y border-slate-200/80 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200/80 uppercase tracking-widest">
          <Heart className="w-3.5 h-3.5 text-emerald-600" />
          <span>OUR COMMITMENT</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          OUR JOURNEY, TOGETHER
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-3xl mx-auto">
          Every milestone is built by people working together. Our team continues to grow with a shared commitment to trust, responsible service and long-term relationships.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left max-w-2xl mx-auto">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">People-First Focus</h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                Fostering strong relationships built on dignity, transparency, and personal care.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Institutional Stewardship</h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                Ensuring long-term stability and responsible credit operations for all members.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GalleryIntro;
