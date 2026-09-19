import React from 'react';
import { StatusBadge } from './StatusBadge';

export function PaymentTable({ payments }) {
  return (
    <div className="w-full">
      {/* MOBILE CARDS VIEW (Phone screens < 768px) */}
      <div className="block md:hidden space-y-3">
        {payments.map((p) => (
          <div
            key={p.txnId}
            className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3 shadow-xs text-left"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="font-mono font-black text-slate-900 text-xs block">{p.txnId}</span>
                <span className="text-[10px] text-blue-700 font-mono font-bold block mt-0.5">App ID: {p.appId}</span>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Member</span>
                <span className="font-bold text-slate-900 text-xs block">{p.member}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Amount</span>
                <span className="font-mono font-black text-emerald-700 text-sm block">₹{p.amount}.00</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Channel / Method</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold border border-slate-200 inline-block mt-0.5">
                  {p.method}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Date</span>
                <span className="text-slate-600 text-[11px] block mt-0.5">{p.date}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
              UTR Ref: <strong className="text-slate-800 font-bold">{p.utr}</strong>
            </div>
          </div>
        ))}

        {payments.length === 0 && (
          <div className="py-8 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
            No payment transactions found.
          </div>
        )}
      </div>

      {/* DESKTOP/TABLET TABLE VIEW (md+ screens >= 768px) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200/80">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200/90 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4">TRANSACTION ID</th>
              <th className="py-3 px-4">APPLICATION ID</th>
              <th className="py-3 px-4">MEMBER NAME</th>
              <th className="py-3 px-4">AMOUNT</th>
              <th className="py-3 px-4">PAYMENT METHOD</th>
              <th className="py-3 px-4">UTR / REF</th>
              <th className="py-3 px-4">DATE</th>
              <th className="py-3 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {payments.map((p) => (
              <tr key={p.txnId} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-mono font-black text-slate-900">{p.txnId}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{p.appId}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{p.member}</td>
                <td className="py-3.5 px-4 font-mono font-black text-emerald-700">₹{p.amount}.00</td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200 inline-block">
                    {p.method}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{p.utr}</td>
                <td className="py-3.5 px-4 text-slate-500">{p.date}</td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="8" className="py-8 text-center text-slate-400 text-xs">
                  No payment transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentTable;
