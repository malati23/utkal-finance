import React from 'react';
import { X, Download, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import statutoryPdf from '../../assets/New Utkal Finance Limited _ Certified by Govt. of India.pdf';

export function StatutoryPdfModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in font-sans"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0B1528] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight truncate">
                  Statutory 2-Page Membership Form
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3" /> Govt. Certified
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                New Utkal Finance Limited • Registered Official PDF Document
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Download PDF Button */}
            <a
              href={statutoryPdf}
              download="New Utkal Finance Limited _ Certified by Govt. of India.pdf"
              className="bg-[#00C853] hover:bg-emerald-500 text-slate-950 font-black text-xs px-3.5 sm:px-4.5 py-2 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Download PDF</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Embedded PDF Viewer */}
        <div className="flex-1 bg-slate-100 p-2 sm:p-4 overflow-hidden relative min-h-[400px]">
          <iframe
            src={`${statutoryPdf}#toolbar=1&navpanes=1`}
            title="New Utkal Finance Limited Statutory PDF Form"
            className="w-full h-full min-h-[55vh] sm:min-h-[68vh] rounded-xl border border-slate-200 shadow-inner bg-white"
          />
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-4 sm:px-6 py-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <span className="text-slate-500 font-medium text-[11px]">
            📄 Document: <strong className="text-slate-800">New Utkal Finance Statutory Application Form (2 Pages)</strong>
          </span>
          <div className="flex items-center gap-3">
            <a
              href={statutoryPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 text-[11px]"
            >
              <span>Open in Fullscreen Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatutoryPdfModal;
