import React, { useState } from 'react';
import { Shield, Users, FileDown } from 'lucide-react';
import { StatutoryPdfModal } from '../common/StatutoryPdfModal';
import memberFormPdf from '../../assets/NEWUTKAL MEMBER FORM.pdf';

export function HighlightStats() {
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  const handleCardClick = () => {
    // Trigger direct download of the official member form
    const link = document.createElement('a');
    link.href = memberFormPdf;
    link.download = 'NEWUTKAL MEMBER FORM.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Also open the preview modal
    setPdfModalOpen(true);
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 sm:-mt-10 mb-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-md flex items-center gap-3 hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 font-bold flex items-center justify-center shrink-0 text-sm">
              ₹
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Associate Membership
              </span>
              <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
                ₹ 200 Only
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-md flex items-center gap-3 hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Capital Governance
              </span>
              <span className="text-sm font-extrabold text-emerald-700 block mt-0.5">
                ₹ 250+ Cr Assets
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-md flex items-center gap-3 hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Active Community
              </span>
              <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
                15,000+ Members
              </span>
            </div>
          </div>

          <div
            onClick={handleCardClick}
            className="bg-white rounded-xl p-3.5 sm:p-4 border border-blue-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 shadow-md flex items-center justify-between gap-3 hover:shadow-lg hover:border-blue-300 transition-all group cursor-pointer text-left"
            title="Click to download and view official Statutory Member Form PDF"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                Statutory PDF
              </span>
              <span className="text-sm font-extrabold text-blue-900 block mt-0.5 group-hover:underline">
                Download Form
              </span>
            </div>
            <a
              href={memberFormPdf}
              download="NEWUTKAL MEMBER FORM.pdf"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shrink-0 shadow-sm transition-colors cursor-pointer"
              title="Download NEWUTKAL MEMBER FORM.pdf"
              aria-label="Download Member Form PDF"
            >
              <FileDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Statutory PDF Viewer Modal */}
      <StatutoryPdfModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
      />
    </>
  );
}
