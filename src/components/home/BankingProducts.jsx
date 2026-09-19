import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { PRODUCT_CARDS } from '../../data/productCards';

export function BankingProducts({ onApplyNow }) {
  const context = useOutletContext();
  const handleApply = onApplyNow || (context && context.openApplyModal);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <SectionHeading
        badge="RETAIL & INSTITUTIONAL PORTFOLIO"
        title="Make Life Easier with New Age Banking Products"
        subtitle="Take a look at what's new right now. Transparent credit, high-yield deposit instruments, and secure digital banking."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCT_CARDS.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:border-blue-500 hover:shadow-xl hover:ring-2 hover:ring-blue-500/20 overflow-hidden transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Top Image Banner with Badges */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Top Left Floating Icon */}
                  <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md text-blue-600 flex items-center justify-center shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Top Right Dark Tag */}
                  <div className="absolute top-3.5 right-3.5 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm border border-slate-700/50">
                    {card.topBadge}
                  </div>

                  {/* Bottom Left Rate Pill */}
                  <div className="absolute bottom-3 left-3.5 bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                    {card.ratePill}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-6 min-h-[36px]">
                    {card.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 mb-6 text-xs text-slate-700">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer CTA Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleApply && handleApply()}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-800 font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-md"
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
