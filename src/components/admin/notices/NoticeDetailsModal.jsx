import React from 'react';
import { 
  X, 
  Bell, 
  Users, 
  Calendar, 
  User, 
  CheckCircle2, 
  Archive, 
  Edit3, 
  FileText, 
  History, 
  Paperclip, 
  AlertCircle
} from 'lucide-react';
import { NoticeStatusBadge } from './NoticeStatusBadge';
import { NoticePriorityBadge } from './NoticePriorityBadge';

export function NoticeDetailsModal({
  isOpen,
  onClose,
  notice,
  onEdit,
  onPublish,
  onArchive,
}) {
  if (!isOpen || !notice) return null;

  const id = notice.noticeId || notice.id;
  const isDraft = (notice.status || '').toLowerCase() === 'draft';
  const isPublished = (notice.status || '').toLowerCase() === 'published';
  const isArchived = (notice.status || '').toLowerCase() === 'archived';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-fade-in">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#0B1528] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-400 font-bold">{id}</span>
                <NoticePriorityBadge priority={notice.priority} />
              </div>
              <h2 className="text-lg font-black tracking-tight pt-0.5">
                Notice Details
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status & Actions Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status:</span>
              <NoticeStatusBadge status={notice.status} />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {isDraft && onPublish && (
                <button
                  onClick={() => onPublish(notice)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Publish Now</span>
                </button>
              )}

              {onEdit && (
                <button
                  onClick={() => onEdit(notice)}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#004085] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-blue-200"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Notice</span>
                </button>
              )}

              {!isArchived && onArchive && (
                <button
                  onClick={() => onArchive(notice)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Archive</span>
                </button>
              )}
            </div>
          </div>

          {/* Title & Category */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs">
                {notice.category || 'General'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Created: {notice.createdDate || notice.date || 'N/A'}
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
              {notice.title}
            </h3>
          </div>

          {/* Notice Content Box */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Notice Content
            </h4>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
              {notice.content || notice.description || 'No content available.'}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Target Audience</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 pt-0.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>{notice.audience || 'All Members'}</span>
              </span>
            </div>

            {notice.audience === 'Specific Member' && (
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Specific Member</span>
                <span className="font-mono font-bold text-blue-700 block pt-0.5">
                  {notice.memberId} {notice.memberName ? `(${notice.memberName})` : ''}
                </span>
              </div>
            )}

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Created By</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 pt-0.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>{notice.createdBy || 'Chief Administrator'}</span>
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Published Date</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 pt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{notice.publishedDate || 'Not published'}</span>
              </span>
            </div>

            {notice.expiryDate && (
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Expiry Date</span>
                <span className="font-semibold text-slate-800 pt-0.5 block">
                  {notice.expiryDate}
                </span>
              </div>
            )}
          </div>

          {/* Attachment Section (if available) */}
          {notice.attachmentName && (
            <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Paperclip className="w-4 h-4 text-[#004085]" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{notice.attachmentName}</span>
                  <span className="text-[10px] text-slate-500 font-medium">Attachment Document</span>
                </div>
              </div>

              <span className="text-[11px] font-bold text-[#004085]">Attached</span>
            </div>
          )}

          {/* Internal Notes */}
          {notice.internalNotes && (
            <div className="space-y-1">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Internal Administration Notes
              </h4>
              <p className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                {notice.internalNotes}
              </p>
            </div>
          )}

          {/* Audit History Log */}
          {Array.isArray(notice.auditHistory) && notice.auditHistory.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span>Audit Log</span>
              </h4>

              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {notice.auditHistory.map((log, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">{log.action}</span>
                      <span className="text-slate-500 text-[10px]">{log.details || 'No details'}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-semibold text-slate-700 block">{log.admin || 'Admin'}</span>
                      <span className="text-[10px] text-slate-400">{log.dateTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
