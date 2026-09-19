import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FaqAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-blue-200 shadow-md ring-1 ring-blue-500/20'
                : 'bg-white/80 border-slate-200/90 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFaq(idx)}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
            >
              <span className="font-bold text-slate-900 text-base sm:text-lg">
                {faq.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? 'bg-blue-50 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-650 text-sm leading-relaxed border-t border-slate-100 pt-4 text-slate-600">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
