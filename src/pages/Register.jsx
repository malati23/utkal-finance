import React, { useRef } from 'react';
import { RegistrationHeader } from '../components/registration/RegistrationHeader';
import { RegistrationWizard } from '../components/registration/RegistrationWizard';
import { ShieldCheck, Lock, Building2 } from 'lucide-react';

export function Register() {
  const wizardRef = useRef(null);

  const handleQuickFillFromHeader = () => {
    // Find Quick Fill button inside wizard or trigger data load
    const quickFillBtn = document.querySelector('button:has(span:contains("Quick-Fill"))') || document.querySelector('button:contains("Quick-Fill")');
    if (quickFillBtn) {
      quickFillBtn.click();
    } else {
      window.dispatchEvent(new CustomEvent('TRIGGER_QUICKFILL'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/80 font-sans text-slate-900 flex flex-col justify-between antialiased">
      {/* 1. TOP STATUTORY HEADER */}
      <RegistrationHeader onQuickFill={handleQuickFillFromHeader} />

      {/* 2. MAIN REGISTRATION CONTAINER */}
      <main className="flex-1 px-2.5 sm:px-4 md:px-6 py-2 sm:py-4 w-full flex items-center justify-center">
        <RegistrationWizard ref={wizardRef} />
      </main>

      {/* 3. FOOTER REGULATORY STRIP */}
      <footer className="bg-[#0B1528] text-slate-400 py-6 px-4 text-center border-t border-slate-800 text-xs font-sans">
        <div className="max-w-5xl mx-auto space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Govt. Reg. No.: U64199OD2026PLC054968</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Companies Act 2013 &amp; Nidhi Rules 2014 Compliant</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>256-bit Encrypted SSL Security</span>
            </span>
          </div>

          <p className="text-[11px] text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Registered Head Office: Utkal Tower, Plot No. N-5/172, IRC Village, Nayapalli, Bhubaneswar - 751015, Odisha. Financial services are provided strictly to registered members of New Utkal Finance Limited.
          </p>

          <p className="text-[11px] text-slate-500 pt-1">
            © {new Date().getFullYear()} New Utkal Finance Limited. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Register;
