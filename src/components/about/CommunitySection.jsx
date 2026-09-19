import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ArrowRight, FileText, ShieldCheck, Users } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import photo5 from '../../assets/image copy 4.png';

export function CommunitySection({ onApplyNow }) {
  const context = useOutletContext();
  const handleApply = onApplyNow || (context && context.openApplyModal);

  return (
    <>
      {/* PHOTO FEATURE SECTION (PHOTO 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-950">
          <img
            src={photo5}
            alt="Growing Together With Our Community"
            className="w-full h-96 sm:h-[460px] object-cover object-center opacity-70 transform hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl text-white space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-widest">
                COMMUNITY ENGAGEMENT
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Growing Together With Our Community
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                Our associate members form the heart of New Utkal Finance. We remain committed to transparent financial inclusion, ethical rate structures, and continuous support for local prosperity across Odisha.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleApply && handleApply()}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 inline-flex items-center gap-2 uppercase tracking-wider"
                >
                  <span>Become a Member</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY / TRUST SECTION */}
      <section className="bg-slate-100/80 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-8">
          <SectionHeading
            badge="TRUST & INTEGRITY"
            title="Built Around People, Trust and Progress"
            subtitle="We adhere strictly to transparent documentation, non-coercive member support, and institutional standards."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Transparency</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                100% disclosed interest rate slabs and zero hidden fees.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Responsible Service</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Ethical lending assistance focused on member financial wellness.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Community Focus</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Empowering households and local enterprise growth across Odisha.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CommunitySection;
