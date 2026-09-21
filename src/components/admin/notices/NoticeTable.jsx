import React from 'react';
import { Eye, Edit3, Bell, CheckCircle2, Archive, Calendar, Users, FileText } from 'lucide-react';
import { NoticeStatusBadge } from './NoticeStatusBadge';
import { NoticePriorityBadge } from './NoticePriorityBadge';

export function NoticeTable({
  notices = [],
  onViewDetails,
  onEditNotice,
  onPublishNotice,
  onArchiveNotice,
  onCreateClick,
}) {
  if (notices.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-2xs space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#004085] mx-auto shadow-2xs">
          <Bell className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            No notices found
          </h3>
          <p className="text-xs text-slate-500">
            Create your first notice to communicate important updates to members and board officers.
          </p>
        </div>

        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004085] hover:bg-blue-900 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
          >
            <Bell className="w-4 h-4 text-blue-200" />
            <span>+ Create Notice</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* DESKTOP TABLE (Hidden on mobile) */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Notice ID</th>
                <th className="py-3.5 px-4">Title & Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Audience</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {notices.map((notice) => {
                const id = notice.noticeId || notice.id;
                const isDraft = (notice.status || '').toLowerCase() === 'draft';
                const isPublished = (notice.status || '').toLowerCase() === 'published';

                return (
                  <tr key={id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Notice ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {id}
                    </td>

                    {/* Title & Priority */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <NoticePriorityBadge priority={notice.priority} />
                        </div>
                        <p className="font-bold text-slate-900 truncate" title={notice.title}>
                          {notice.title}
                        </p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {notice.category || 'General'}
                      </span>
                    </td>

                    {/* Audience */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium text-[11px]">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{notice.audience || 'All Members'}</span>
                      </div>
                      {notice.audience === 'Specific Member' && notice.memberId && (
                        <span className="text-[10px] font-mono text-blue-600 block">
                          {notice.memberId}
                        </span>
                      )}
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium text-[11px]">
                      {notice.createdDate || notice.date || 'N/A'}
                    </td>

                    {/* Published Date */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium text-[11px]">
                      {notice.publishedDate || 'Not published'}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <NoticeStatusBadge status={notice.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewDetails(notice)}
                          className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => onEditNotice(notice)}
                          className="px-2.5 py-1.5 rounded-lg text-blue-700 hover:bg-blue-50 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                          title="Edit Notice"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Edit</span>
                        </button>

                        {isDraft && onPublishNotice && (
                          <button
                            onClick={() => onPublishNotice(notice)}
                            className="px-2.5 py-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                            title="Publish Notice"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Publish</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE NOTICE CARDS (Visible on small screens) */}
      <div className="grid grid-cols-1 gap-3 lg:hidden">
        {notices.map((notice) => {
          const id = notice.noticeId || notice.id;
          const isDraft = (notice.status || '').toLowerCase() === 'draft';

          return (
            <div
              key={id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[11px] font-bold text-slate-500">
                      {id}
                    </span>
                    <NoticePriorityBadge priority={notice.priority} />
                    <NoticeStatusBadge status={notice.status} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight pt-1">
                    {notice.title}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 text-slate-600">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Category</span>
                  <span className="font-semibold text-slate-800">{notice.category || 'General'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Audience</span>
                  <span className="font-semibold text-slate-800">{notice.audience || 'All Members'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Created</span>
                  <span>{notice.createdDate || notice.date || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Published</span>
                  <span>{notice.publishedDate || 'Not published'}</span>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onViewDetails(notice)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onEditNotice(notice)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#004085] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                {isDraft && onPublishNotice && (
                  <button
                    onClick={() => onPublishNotice(notice)}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    title="Publish Notice"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Publish</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
