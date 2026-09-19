import React, { useState } from 'react';
import { Eye, Download, X, FileText } from 'lucide-react';
import udyamPdf from '../../assets/Print _ Udyam Registration Certificate.pdf';

export function BrochureAnnexures() {
  const [activeModal, setActiveModal] = useState(null);

  const handleDownloadDoc = (card) => {
    if (card.pdfUrl || card.imgUrl) {
      const url = card.pdfUrl || card.imgUrl;
      let fileName = 'UtkalFinance_Document';

      if (card.type === 'udyam') {
        fileName = 'Newutkal_Finance_Govt_MSME_Udyam_Registration.pdf';
      } else if (card.type === 'epan') {
        fileName = 'Newutkal_Finance_Govt_ePAN_Card.jpg';
      } else if (card.type === 'incorporation') {
        fileName = 'Newutkal_Finance_Certificate_of_Incorporation.pdf';
      } else if (card.type === 'spice') {
        fileName = 'Newutkal_Finance_MCA_Name_Approval.pdf';
      } else if (card.type === 'moa') {
        fileName = 'Newutkal_Finance_Official_eMOA_INC33.pdf';
      } else if (card.type === 'aoa') {
        fileName = 'Newutkal_Finance_Official_eAOA_INC34.pdf';
      }

      const element = document.createElement('a');
      element.href = url;
      element.download = fileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      return;
    }

    const element = document.createElement('a');
    const docName = card.title || card;
    const fileContent = `NEW UTKAL FINANCE LIMITED - STATUTORY CERTIFICATION DOCUMENT: ${docName}\nCIN: U64199OD2026PLC054968\nPAN: AALCN97566\nGovt. of India Certified Nidhi Entity\nRegistered Office: Utkal Tower, Plot no-N/5-172, Nayapalli, Bhubaneswar-751015, Odisha.`;
    const file = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${(docName).replace(/\s+/g, '_')}_UtkalFinance.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const certificationCards = [
    {
      id: 1,
      topLabel: 'GOVERNMENT MSME ACCREDITATION',
      badge: 'MSME Certified',
      title: 'Govt. MSME Udyam Registration Certificate',
      titleColor: 'text-[#004085]',
      description: 'Official Udyam Registration Certificate issued by Ministry of Micro, Small and Medium Enterprises (MSME), Govt. of India, certifying NEWUTKAL FINANCE for Priority Sector Lending (PSL), credit brokerage, & financial services.',
      authority: 'Ministry of MSME, Government of India',
      statRefLabel: 'Statutory Ref:',
      statRefValue: 'UDYAM-OD-19-0179809',
      pagesDate: '4 Pages • 17/09/2026',
      type: 'udyam',
      pdfUrl: udyamPdf
    },
    {
      id: 2,
      topLabel: 'CORPORATE INCORPORATION SANCTION',
      badge: 'Govt. Incorporated',
      title: 'Certificate of Incorporation (Form INC-11)',
      titleColor: 'text-[#004085]',
      description: 'Official Certificate of Incorporation issued under Section 7(2) & Section 8(1) of the Companies Act, 2013, certifying NEWUTKAL FINANCE LIMITED as a registered Public Company Limited by Shares.',
      authority: 'Ministry of Corporate Affairs (MCA), Central Registration Centre',
      statRefLabel: 'Statutory Ref:',
      statRefValue: 'CIN: U64199OD2026PLC054968',
      pagesDate: '1 Page • 11/08/2026',
      type: 'incorporation',
      pdfUrl: '/Newutkal_Finance_Certificate_of_Incorporation.pdf'
    },
    {
      id: 3,
      topLabel: 'TAXATION & STATUTORY ENTITY IDENTITY',
      badge: 'Statutory Identity',
      title: 'Govt. of India e-PAN Card',
      titleColor: 'text-slate-900',
      description: 'Statutory Permanent Account Number card issued electronically under Section 139A of Income Tax Act with verified digital seal and encrypted QR code.',
      authority: 'Income Tax Department, Government of India',
      statRefLabel: 'Statutory Ref:',
      statRefValue: 'AALCN97566',
      pagesDate: '1 Page • 11/08/2026',
      type: 'epan',
      imgUrl: '/Newutkal_Finance_Govt_ePAN_Card.jpg'
    },
    {
      id: 4,
      topLabel: 'CORPORATE INCORPORATION SANCTION',
      badge: 'MCA Approved',
      title: 'SPICe+ Part A: MCA Name Reservation & Approval',
      titleColor: 'text-[#004085]',
      description: 'Official sanction issued by Central Registration Centre reserving the corporate title "NEWUTKAL FINANCE LIMITED" as a Public Company Limited by Shares.',
      authority: 'Ministry of Corporate Affairs (MCA), Govt. of India',
      statRefLabel: 'Statutory Ref:',
      statRefValue: 'SRN: AC4997381',
      pagesDate: '2 Pages • 30/07/2026',
      type: 'spice',
      pdfUrl: '/Newutkal_Finance_MCA_Name_Approval.pdf'
    },
    {
      id: 5,
      topLabel: 'CORE STATUTORY OBJECTS CHARTER',
      badge: '6-Page Legal Charter',
      title: 'Form INC-33: e-Memorandum of Association (e-MOA)',
      titleColor: 'text-slate-900',
      description: 'Official 6-page corporate constitution pursuant to Schedule I (Sections 4 & 5) certifying financial lending powers, micro-credit, deposit mobilization, technology platforms, subscriber capital, and witness DSC.',
      authority: 'Registrar of Companies / Companies Act, 2013',
      statRefLabel: 'Statutory Ref:',
      statRefValue: 'SRN: 1-26921343422_SRN_FORM_1/86082996896',
      pagesDate: '6 Pages • August 2026',
      type: 'moa',
      pdfUrl: '/Newutkal_Finance_Official_eMOA_INC33.pdf'
    },
    {
      id: 6,
      topLabel: 'GOVERNANCE & ARTICLES CHARTER',
      badge: '7-Page Governance Charter',
      title: 'Form INC-34: e-Articles of Association (e-AOA)',
      titleColor: 'text-[#004085]',
      description: 'Official corporate bylaws pursuant to Schedule I certifying Nidhi Rules 2014 & 2022 compliance, board powers, voting rights, interest caps, and member share eligibility.',
      authority: 'Registrar of Companies / Nidhi Rules, 2014',
      statRefLabel: 'Statutory Ref:',
      statRefValue: 'SRN: 1-26921343422_SRN_FORM_2/86082996897',
      pagesDate: '7 Pages • August 2026',
      type: 'aoa',
      pdfUrl: '/Newutkal_Finance_Official_eAOA_INC34.pdf'
    }
  ];

  return (
    <div className="space-y-5 w-full pt-2">
      {/* SECTION 4 HEADER ROW */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-xs">
              📄
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              4. Statutory Regulatory Documents &amp; Legal Copies
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Certified government approvals, incorporation filings, constitutional charters, and taxation credentials.
          </p>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] uppercase tracking-wider border border-slate-200 shrink-0">
          GOVT. VERIFIED ANNEXURES
        </span>
      </div>

      {/* 2-COLUMN GRID OF CERTIFICATION CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {certificationCards.map((card) => (
          <div 
            key={card.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              {/* Top Metadata Row */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {card.topLabel}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] font-semibold">
                  {card.badge}
                </span>
              </div>

              {/* Title */}
              <h4 className={`text-base font-bold leading-snug ${card.titleColor}`}>
                {card.title}
              </h4>

              {/* Description Paragraph */}
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                {card.description}
              </p>

              {/* Inner Metadata Box */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-xs space-y-1 font-sans">
                <div className="flex flex-wrap justify-between gap-1">
                  <span className="text-slate-500 font-normal">Authority:</span>
                  <span className="font-semibold text-slate-800 text-right">{card.authority}</span>
                </div>
                <div className="flex flex-wrap justify-between gap-1">
                  <span className="text-slate-500 font-normal">Statutory Ref:</span>
                  <span className="font-bold text-emerald-600 font-mono text-right">{card.statRefValue}</span>
                </div>
                <div className="flex flex-wrap justify-between gap-1">
                  <span className="text-slate-500 font-normal">Pages / Date:</span>
                  <span className="font-medium text-slate-700 text-right">{card.pagesDate}</span>
                </div>
              </div>

              {/* Document Preview Canvas Card */}
              <div className="bg-slate-100/70 rounded-xl border border-slate-200/80 p-3 sm:p-4 text-center flex items-center justify-center min-h-[240px] relative overflow-hidden">
                {card.pdfUrl ? (
                  <iframe 
                    src={`${card.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-[220px] rounded-lg border border-slate-200 bg-white"
                    title={card.title}
                  />
                ) : card.imgUrl ? (
                  <img 
                    src={card.imgUrl} 
                    alt={card.title} 
                    className="w-full max-h-[220px] object-contain rounded-lg border border-slate-200 shadow-sm bg-white cursor-pointer"
                    onClick={() => setActiveModal(card)}
                  />
                ) : (
                  <>
                    {card.type === 'aoa' && (
                      <div className="w-full max-w-[210px] bg-white rounded-lg shadow-md border border-slate-200 p-3 space-y-2 text-[8px] text-slate-700">
                        <div className="flex items-center justify-between border-b pb-1">
                          <span className="font-bold text-[8px]">Form INC-34</span>
                          <span className="text-slate-400 text-[6px]">e-AOA</span>
                        </div>
                        <div className="text-center py-1 font-bold text-slate-900 text-[8px]">
                          Articles of Association
                        </div>
                        <div className="bg-slate-50 p-1 rounded border text-[7px] space-y-0.5">
                          <div>Nidhi Rules 2014 &amp; 2022 Governance</div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Bottom Action Buttons Row */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setActiveModal(card)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors border border-slate-200/90"
              >
                <Eye className="w-4 h-4 text-slate-600" />
                <span>Inspect Document</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownloadDoc(card)}
                className="bg-[#004085] hover:bg-blue-900 text-white font-bold text-xs py-2.5 px-5 rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Full Document View */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-[#0B1528] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base text-white">{activeModal.title}</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 bg-slate-100 overflow-y-auto flex-1 flex flex-col items-center justify-center min-h-[450px]">
              {activeModal.pdfUrl ? (
                <iframe 
                  src={activeModal.pdfUrl}
                  className="w-full h-[550px] rounded-2xl border border-slate-300 shadow-md bg-white"
                  title={activeModal.title}
                />
              ) : activeModal.imgUrl ? (
                <img 
                  src={activeModal.imgUrl}
                  alt={activeModal.title}
                  className="max-w-full max-h-[550px] object-contain rounded-2xl shadow-lg border border-slate-200 bg-white"
                />
              ) : (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 w-full">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="font-bold text-xs text-slate-900">NEW UTKAL FINANCE LIMITED</span>
                    <span className="text-xs font-mono font-bold text-emerald-700">{activeModal.statRefValue}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{activeModal.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">{activeModal.description}</p>
                  <div className="bg-slate-50 p-3 rounded-xl border text-xs text-slate-700 space-y-1">
                    <div><strong>Authority:</strong> {activeModal.authority}</div>
                    <div><strong>Ref Date:</strong> {activeModal.pagesDate}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white px-6 py-3 border-t flex justify-end gap-3">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold">
                Close
              </button>
              <button onClick={() => handleDownloadDoc(activeModal)} className="px-5 py-2 rounded-xl bg-blue-700 text-white text-xs font-bold">
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrochureAnnexures;
