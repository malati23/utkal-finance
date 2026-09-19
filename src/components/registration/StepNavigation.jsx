import React, { useRef, useEffect } from 'react';
import { STEPS_CONFIG } from '../../data/registrationOptions';
import { Check } from 'lucide-react';

export function StepNavigation({ currentStep, onStepClick, completedSteps = [] }) {
  const scrollContainerRef = useRef(null);
  const activeItemRef = useRef(null);

  // Auto scroll active step into view on mobile
  useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const item = activeItemRef.current;
      const containerWidth = container.offsetWidth;
      const itemLeft = item.offsetLeft;
      const itemWidth = item.offsetWidth;
      container.scrollTo({
        left: itemLeft - containerWidth / 2 + itemWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [currentStep]);

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-3 py-2.5 sm:px-4 sm:py-3 w-full">
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
      >
        {STEPS_CONFIG.map((step) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id) || step.id < currentStep;

          const numFormatted = step.id < 10 ? `0${step.id}` : `${step.id}`;

          return (
            <button
              key={step.id}
              ref={isCurrent ? activeItemRef : null}
              type="button"
              onClick={() => onStepClick(step.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 border whitespace-nowrap cursor-pointer
                ${
                  isCurrent
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/30'
                    : isCompleted
                    ? 'bg-slate-800/90 text-emerald-400 border-emerald-500/50 hover:bg-slate-800 hover:border-emerald-400'
                    : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              {/* Circle Badge */}
              <span
                className={`w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 transition-colors
                  ${
                    isCurrent
                      ? 'bg-slate-950 text-emerald-400'
                      : isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }
                `}
              >
                {isCompleted && !isCurrent ? <Check className="w-3 h-3 stroke-[3]" /> : numFormatted}
              </span>

              {/* Step Label */}
              <span className="text-[11px] sm:text-xs tracking-tight">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
