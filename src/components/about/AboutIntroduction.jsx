import React from 'react';
import photo2 from '../../assets/image copy.png';

export function AboutIntroduction() {
  const stats = [
    { label: 'Associate Members', value: '15,000+' },
    { label: 'Capital Governance', value: '₹250+ Cr Assets' },
    { label: 'Community Presence', value: 'Odisha Network' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Photo */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group">
            <img
              src={photo2}
              alt="Who We Are - Utkal Finance Team"
              className="w-full h-80 sm:h-96 lg:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            WHO WE ARE
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Focused on Trust, Transparency and Long-Term Relationships
          </h2>

          <div className="space-y-4 text-slate-600 text-sm leading-relaxed font-normal">
            <p>
              At New Utkal Finance Ltd., we believe financial services should empower individuals and small business owners rather than burden them with opaque terms. Founded on principles of ethical credit distribution and community participation, we serve as a dependable partner for families across Eastern India.
            </p>
            <p>
              Whether assisting members with personal emergency credit, business expansion loans, or competitive term deposit returns, our approach combines modern digital convenience with deep-rooted institutional integrity.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            {stats.map((st, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 text-center sm:text-left">
                <span className="text-lg sm:text-2xl font-black text-blue-900 block leading-tight">
                  {st.value}
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1 block">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutIntroduction;
