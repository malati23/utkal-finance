import React from 'react';
import aboutHeroBanner from '../../assets/image copy 8.png';

export function AboutHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-950 h-[360px] sm:h-[420px] md:h-[460px] flex items-center group">
        {/* Background Hero Image */}
        <img
          src={aboutHeroBanner}
          alt="About New Utkal Finance Banner"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
        />
        
        {/* Gradient Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20" />

        {/* Text Content Overlay over Image */}
        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl text-white space-y-3 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-widest">
            ABOUT US
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            <span className="text-white block mb-1 drop-shadow-md">
              Building Trust. Creating Growth.
            </span>
            <span className="text-amber-400 block drop-shadow-md">
              Shaping Better Financial Futures.
            </span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base md:text-lg font-medium leading-relaxed italic drop-shadow-sm pt-1">
            "We are committed to providing trusted, transparent and customer-focused financial solutions."
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
