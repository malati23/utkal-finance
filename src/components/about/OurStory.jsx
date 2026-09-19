import React from 'react';
import { SectionHeading } from '../SectionHeading';
import { MILESTONES } from '../../data/milestones';
import photo3 from '../../assets/image copy 13.png';

export function OurStory() {
  return (
    <section className="bg-slate-100/80 py-12 sm:py-16 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OUR JOURNEY"
          title="From Vision to a Growing Financial Community"
          subtitle="A timeline of our commitment to ethical lending, associate member growth, and transparent financial stewardship."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mt-8">
          {/* Left Timeline Side */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            <div className="relative border-l-2 border-blue-300 ml-4 pl-6 sm:pl-8 space-y-4">
              {MILESTONES.map((m, idx) => (
                <div key={idx} className="relative group">
                  {/* Circle Node */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-blue-600 text-blue-700 font-extrabold text-xs flex items-center justify-center shadow-md group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {m.step}
                  </div>

                  {/* Content Card */}
                  <div className="bg-white p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider block mb-0.5">
                      {m.year}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{m.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: image copy 13.png */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full h-full min-h-[380px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group flex flex-col justify-between">
              <img
                src={photo3}
                alt="Our Journey Milestone Banner - Utkal Finance"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
