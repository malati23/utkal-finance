import React, { useState } from 'react';
import { Search, FolderCheck, CheckCircle2, XCircle, Eye, FileText } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { StatusBadge } from '../../components/admin/StatusBadge';

export function Documents() {
  const { documents, verifyDocument } = useAdmin();
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);

  const filtered = documents.filter(
    (d) =>
      d.applicant.toLowerCase().includes(search.toLowerCase()) ||
      d.appId.toLowerCase().includes(search.toLowerCase()) ||
      d.documentType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Document Verification</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Review uploaded statutory KYC documents, Aadhaar, PAN cards, and signatures.
        </p>
      </div>

      {/* FILTER & TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by applicant or document..."
            className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* MOBILE CARDS VIEW (Phone screens < 768px) */}
        <div className="block md:hidden space-y-3">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3 shadow-xs text-left"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="font-extrabold text-slate-900 text-sm block">{doc.applicant}</span>
                  <span className="text-[10px] text-blue-700 font-mono font-bold block mt-0.5">{doc.appId}</span>
                </div>
                <StatusBadge status={doc.status} />
              </div>

              <div className="space-y-1 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200 inline-block">
                  {doc.documentType}
                </span>
                <div className="font-mono text-slate-700 font-bold text-xs pt-1">{doc.fileName}</div>
                <div className="text-[10px] text-slate-400">Size: {doc.fileSize} • Uploaded: {doc.uploadedDate}</div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(doc)}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>
                <button
                  type="button"
                  onClick={() => verifyDocument(doc.id, 'Verified')}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </button>
                <button
                  type="button"
                  onClick={() => verifyDocument(doc.id, 'Rejected')}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
              No KYC documents found.
            </div>
          )}
        </div>

        {/* DESKTOP/TABLET TABLE VIEW (md+ screens >= 768px) */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200/90">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200/90 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">APPLICANT</th>
                <th className="py-3 px-4">APPLICATION ID</th>
                <th className="py-3 px-4">DOCUMENT TYPE</th>
                <th className="py-3 px-4">FILE NAME &amp; SIZE</th>
                <th className="py-3 px-4">UPLOADED DATE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{doc.applicant}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{doc.appId}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200 inline-block">
                      {doc.documentType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    <div className="font-bold">{doc.fileName}</div>
                    <div className="text-[10px] text-slate-400">{doc.fileSize}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{doc.uploadedDate}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedDoc(doc)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => verifyDocument(doc.id, 'Verified')}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => verifyDocument(doc.id, 'Rejected')}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500 text-xs font-medium">
                    No KYC documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DOCUMENT MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-8 w-[calc(100%-24px)] max-w-lg max-h-[85vh] overflow-y-auto space-y-5 animate-fade-in text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">{selectedDoc.documentType}</h3>
                <p className="text-xs text-slate-500 font-mono">{selectedDoc.applicant} • {selectedDoc.appId}</p>
              </div>
              <StatusBadge status={selectedDoc.status} />
            </div>

            <div className="bg-slate-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-dashed border-slate-300 space-y-2">
              <FileText className="w-12 h-12 text-slate-400 mx-auto" />
              <p className="font-bold text-slate-800 text-xs font-mono">{selectedDoc.fileName}</p>
              <p className="text-[11px] text-slate-500">Official Statutory Document Attachment ({selectedDoc.fileSize})</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;
