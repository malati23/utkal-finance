import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Menu, X, CheckCircle2, Download } from 'lucide-react';
import brandLogo from '../../assets/image copy 7.png';
import { StatutoryPdfModal } from '../common/StatutoryPdfModal';

export function RegistrationHeader() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-slate-200/90 shadow-xs sticky top-0 z-40 w-full font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
          {/* LEFT BRANDING */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 shrink-0 cursor-pointer"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div 
                onClick={() => navigate('/')}
                className="w-10 h-10 rounded-xl bg-slate-900 p-1 flex items-center justify-center shrink-0 cursor-pointer shadow-xs border border-slate-800"
              >
                <img src={brandLogo} alt="New Utkal Finance Logo" className="w-full h-full object-contain" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span 
                    onClick={() => navigate('/')}
                    className="font-black text-sm sm:text-base text-slate-900 tracking-tight leading-none cursor-pointer"
                  >
                    NEW UTKAL <span className="text-blue-700">FINANCE LTD.</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Govt. Reg. No.: U64199OD2026PLC054968
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold tracking-wide mt-0.5">
                  Statutory Membership Application Portal
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT BUTTON ACTIONS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setPdfModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs font-bold transition-colors border border-slate-200 hover:border-blue-300 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Statutory 2-Page Form</span>
              <Download className="w-3.5 h-3.5 text-blue-600 ml-0.5" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B1528] hover:bg-slate-900 text-white text-xs font-bold transition-colors border border-slate-800 shadow-xs cursor-pointer"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-50 border-t border-slate-200 px-4 py-3 space-y-2 shadow-lg">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-1">
              Govt. Reg. No.: U64199OD2026PLC054968
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setPdfModalOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white text-slate-800 text-xs font-bold border border-slate-200 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Statutory 2-Page Form</span>
              </span>
              <Download className="w-4 h-4 text-blue-600" />
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/admin');
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0B1528] text-white text-xs font-bold cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Admin Portal</span>
              </span>
            </button>
          </div>
        )}
      </header>

      {/* PDF Modal Viewer */}
      <StatutoryPdfModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
      />
    </>
  );
}
