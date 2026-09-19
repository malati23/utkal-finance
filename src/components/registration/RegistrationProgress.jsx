import React from 'react';
import { STEPS_CONFIG, STEP_PERCENTAGES } from '../../data/registrationOptions';
import { ShieldCheck } from 'lucide-react';

export function RegistrationProgress({ currentStep }) {
  const stepConfig = STEPS_CONFIG.find((s) => s.id === currentStep) || STEPS_CONFIG[0];
  const percentage = STEP_PERCENTAGES[currentStep] || 11;

  return (
    <div className="bg-[#051124] text-white p-3.5 sm:p-4.5 relative overflow-hidden shadow-inner space-y-2.5">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP META ROW */}
      <div className="flex flex-row items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] sm:text-xs font-black text-blue-300 uppercase tracking-widest">
            STATUTORY REGISTRATION WIZARD
          </span>
        </div>

        <div className="text-[11px] sm:text-xs font-black tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-emerald-500/30">
          {percentage}% Completed
        </div>
      </div>

      {/* STEP HEADING & SUBTITLE */}
      <div className="space-y-0.5 relative z-10">
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight">
          Step {currentStep} of 9: {stepConfig.label} Details
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-300 font-medium line-clamp-1">
          {stepConfig.subtitle}
        </p>
      </div>

      {/* ANIMATED PROGRESS BAR */}
      <div className="relative z-10 pt-0.5">
        <div className="w-full h-2 bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
