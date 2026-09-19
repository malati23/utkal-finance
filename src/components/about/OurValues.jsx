import React from 'react';
import { SectionHeading } from '../SectionHeading';
import { CORE_VALUES, WHY_CHOOSE_POINTS } from '../../data/values';

export function OurValues() {
  return (
    <>
      {/* 5. OUR VALUES SECTION - WHAT WE STAND FOR */}
      <section className="bg-slate-100/80 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="OUR CORE PRINCIPLES"
            title="WHAT WE STAND FOR"
            subtitle="The fundamental values that define our customer service and institutional conduct every day."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
            {CORE_VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">{val.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
              WHY CHOOSE US
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Designed For Member Security &amp; Peace of Mind
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Choosing the right financial partner means selecting clarity over complexity. Here is why thousands of associate members trust New Utkal Finance:
            </p>
          </div>

          {/* Right 4 Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_POINTS.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default OurValues;
