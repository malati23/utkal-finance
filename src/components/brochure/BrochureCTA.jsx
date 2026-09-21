import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../Button';

export function BrochureCTA() {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const openApplyModal = outletContext?.openApplyModal;

  const handleMemberAction = () => {
    if (openApplyModal) {
      openApplyModal();
    } else {
      navigate('/contact');
    }
  };

  return (
    <section className="w-full py-4 sm:py-6">
      <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 lg:p-16 text-center text-white overflow-hidden shadow-2xl">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>JOIN NEW UTKAL FINANCE LTD.</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Ready to Become a Member?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Take the next step toward a stronger financial future.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={UserPlus}
              onClick={handleMemberAction}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-8 py-4 text-base shadow-xl shadow-blue-600/30 transition-transform duration-200 hover:scale-102"
            >
              Become a Member
            </Button>

            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-base font-bold transition-colors"
            >
              <span>Contact Our Desk</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrochureCTA;
