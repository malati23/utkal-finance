import React from 'react';
import { StatusBadge } from './StatusBadge';
import { EmptyState } from './EmptyState';
import { FileSpreadsheet } from 'lucide-react';

/**
 * Reusable TransactionTable component
 * Renders tabular financial records with responsive scrolling and built-in empty state.
 */
export function TransactionTable({
  columns,
  data = [],
  emptyMessage = 'No transactions available.',
  emptyDescription = 'Transactions will be listed here in chronological order.',
  emptyIcon = FileSpreadsheet,
}) {
  // Default standard columns if none provided
  const tableColumns = columns || [
    { key: 'date', label: 'Date', className: 'w-28' },
    { key: 'txnId', label: 'Transaction ID', className: 'w-36 font-mono text-[11px]' },
    { key: 'type', label: 'Type', className: 'w-28' },
    { key: 'description', label: 'Description', className: 'min-w-[180px]' },
    { key: 'amount', label: 'Amount', className: 'w-32 text-right' },
    { key: 'status', label: 'Status', className: 'w-32 text-center' },
  ];

  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyMessage}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/90 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
              {tableColumns.map((col) => (
                <th
                  key={col.key}
                  className={`py-3 px-4 ${col.className || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {data.map((row, idx) => (
              <tr
                key={row.id || row.txnId || idx}
                className="hover:bg-slate-50/60 transition-colors"
              >
                {tableColumns.map((col) => {
                  if (col.render) {
                    return (
                      <td key={col.key} className={`py-3.5 px-4 ${col.className || ''}`}>
                        {col.render(row)}
                      </td>
                    );
                  }

                  if (col.key === 'status') {
                    return (
                      <td key={col.key} className="py-3.5 px-4 text-center">
                        <StatusBadge status={row[col.key]} />
                      </td>
                    );
                  }

                  if (col.key === 'amount') {
                    return (
                      <td
                        key={col.key}
                        className="py-3.5 px-4 text-right font-black text-slate-900"
                      >
                        {row[col.key]}
                      </td>
                    );
                  }

                  return (
                    <td key={col.key} className={`py-3.5 px-4 ${col.className || ''}`}>
                      {row[col.key] ?? '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
