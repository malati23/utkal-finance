import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { 
  Building2, 
  PhoneCall, 
  Mail, 
  UserPlus, 
  ShieldCheck, 
  ArrowRight,
  Stamp,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../Button';
import brandLogo from '../../assets/image copy 7.png';

export function BrochureContactCTA() {
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

  const branchNetwork = [
    {
      label: 'Headquarters • Code: 075101',
      title: 'Bhubaneswar HQ',
      address: 'Plot 142, VIP Area, Saheed Nagar, Bhubaneswar, Khurda',
      manager: 'Manager: Bhagirathi Mohapatra • 0674-2548900'
    },
    {
      label: 'Branch • Code: 075302',
      title: 'Cuttack Main Branch',
      address: 'Buxi Bazar, Near High Court, Cuttack - 753001',
      manager: 'Manager: Minati Mishra • 0671-2415600'
    },
    {
      label: 'Branch • Code: 076903',
      title: 'Rourkela Commercial Hub',
      address: 'Civil Township, Sector 4, Rourkela, Sundargarh - 769004',
      manager: 'Manager: P. K. Mohanty • 0661-2501200'
    },
    {
      label: 'Branch • Code: 076104',
      title: 'Berhampur Branch',
      address: 'Old Bus Stand Road, Berhampur, Ganjam - 760001',
      manager: 'Manager: A. K. Sahu • 0680-2223400'
    },
    {
      label: 'Branch • Code: 075205',
      title: 'Puri Grand Road Branch',
      address: 'Grand Road, Near Jagannath Temple, Puri - 752001',
      manager: 'Manager: R. K. Tripathy • 06752-224500'
    }
  ];

  return (
    <div className="space-y-10 w-full pt-4">
      {/* 1. SECTION 5: REGIONAL BRANCH HUBS NETWORK (ODISHA) */}
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 flex items-center justify-center font-bold text-xs">
            🏢
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            5. Regional Branch Hubs Network (Odisha)
          </h3>
        </div>

        {/* 6 Cards Grid (5 White Branch Cards + 1 Dark Assistance Card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {branchNetwork.map((branch, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {branch.label}
                </span>
                <h4 className="text-base font-bold text-slate-900">{branch.title}</h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed pt-1">
                  {branch.address}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-mono text-slate-500 block">
                  {branch.manager}
                </span>
              </div>
            </div>
          ))}

          {/* Card 6: Dark Assistance Card */}
          <div className="bg-[#031B4E] rounded-2xl p-5 text-white border border-blue-900 shadow-md flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Need Assistance or Franchise?</h4>
              <p className="text-xs text-slate-300 font-normal leading-relaxed pt-1">
                Connect directly with executive administration for institutional banking.
              </p>
            </div>

            <div className="pt-2 border-t border-blue-900/80">
              <a 
                href="tel:+919776175240" 
                className="text-emerald-400 font-bold font-mono text-xs hover:underline block"
              >
                +91 9776175240
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FOOTER SIGNATURE & CORPORATE SEAL SECTION (3 Cards Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200/80">
        {/* Card 1: Authorized Executive Signatory */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            AUTHORIZED EXECUTIVE SIGNATORY
          </span>
          <div className="py-2 border-b border-slate-200">
            <span className="font-serif italic text-xl font-bold text-slate-800 tracking-wide block">
              Bhagirathi Mohapatra
            </span>
          </div>
          <div>
            <h5 className="font-bold text-xs text-slate-900">Bhagirathi Mohapatra</h5>
            <p className="text-[11px] text-slate-500 font-normal">Managing Director • DIN / Board Member</p>
          </div>
        </div>

        {/* Card 2: Official Corporate Seal */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-14 h-14 rounded-full border-2 border-dashed border-blue-600 bg-blue-50/50 flex items-center justify-center text-blue-700 shadow-inner">
            <div className="w-9 h-9 rounded-full border border-blue-400 flex items-center justify-center p-1">
              <img src={brandLogo} alt="Seal Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider">OFFICIAL CORPORATE SEAL</h5>
            <p className="text-[11px] text-slate-500 font-normal">Newutkal Finance Limited • Bhubaneswar</p>
          </div>
        </div>

        {/* Card 3: Registered Corporate Office */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 text-left">
          <h5 className="font-bold text-xs text-slate-900">Registered Corporate Office</h5>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            Plot no-N/5-172, Nayapalli, IRC village, Bhubaneswar-751015, Odisha
          </p>
          <div className="pt-1 text-[11px] space-y-0.5 text-slate-600">
            <div>Phone: <strong className="text-slate-800 font-semibold">+91 9776175240</strong></div>
            <div>Email: <strong className="text-slate-800 font-semibold">bhagirathimohapatra79@gmail.com</strong></div>
            <div>Portal: <a href="https://utkalfinance.com" target="_blank" rel="noreferrer" className="text-blue-700 font-semibold hover:underline">www.utkalfinance.com</a></div>
          </div>
        </div>
      </div>

      {/* 3. FINAL MEMBER JOIN CTA */}
      <div className="bg-[#0B1528] rounded-3xl p-8 sm:p-10 text-center text-white border border-slate-800 shadow-xl space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>JOIN NEW UTKAL FINANCE</span>
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Ready to Become a Member?
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm font-normal max-w-xl mx-auto leading-relaxed">
          Take the next step toward a stronger financial future with trusted savings &amp; credit facilities across Odisha.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            icon={UserPlus}
            onClick={handleMemberAction}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 shadow-lg shadow-blue-600/30"
          >
            Become a Member (₹200)
          </Button>

          <button
            onClick={() => navigate('/contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-800/80 text-slate-200 text-xs font-bold transition-colors"
          >
            <span>Contact Helpdesk</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BrochureContactCTA;
