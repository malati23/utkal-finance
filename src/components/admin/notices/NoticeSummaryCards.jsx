import React, { useMemo } from 'react';
import { Bell, CheckCircle2, Clock, Calendar, Archive } from 'lucide-react';

export function NoticeSummaryCards({ notices = [] }) {
  const stats = useMemo(() => {
    let total = notices.length;
    let published = 0;
    let drafts = 0;
    let scheduled = 0;
    let archived = 0;

    notices.forEach((n) => {
      const status = (n.status || 'Draft').toLowerCase();
      if (status === 'published') published++;
      else if (status === 'draft') drafts++;
      else if (status === 'scheduled') scheduled++;
      else if (status === 'archived') archived++;
    });

    return { total, published, drafts, scheduled, archived };
  }, [notices]);

  const cards = [
    {
      title: 'TOTAL NOTICES',
      value: stats.total,
      subtitle: 'All announcements',
      icon: Bell,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-100 text-[#004085]',
    },
    {
      title: 'PUBLISHED',
      value: stats.published,
      subtitle: 'Active circulars',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'DRAFTS',
      value: stats.drafts,
      subtitle: 'Pending publication',
      icon: Clock,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      iconBg: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'SCHEDULED',
      value: stats.scheduled,
      subtitle: 'Future publication',
      icon: Calendar,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconBg: 'bg-indigo-100 text-indigo-700',
    },
    {
      title: 'ARCHIVED',
      value: stats.archived,
      subtitle: 'Past circulars',
      icon: Archive,
      color: 'bg-slate-100 text-slate-700 border-slate-200',
      iconBg: 'bg-slate-200 text-slate-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {card.value}
              </div>
              <p className="text-[11px] font-medium text-slate-400">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
