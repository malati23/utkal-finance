import React, { useState, useEffect } from 'react';
import { X, Bell, Save, CheckCircle2, AlertCircle, FileText, User } from 'lucide-react';

export function NoticeFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  members = [],
}) {
  const isEditMode = !!initialData;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState('All Members');
  const [memberId, setMemberId] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [status, setStatus] = useState('Draft');
  const [publicationDate, setPublicationDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when initialData changes or modal opens
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCategory(initialData.category || 'General');
      setContent(initialData.content || initialData.description || '');
      setAudience(initialData.audience || 'All Members');
      setMemberId(initialData.memberId || '');
      setPriority(initialData.priority || 'Normal');
      setStatus(initialData.status || 'Draft');
      setPublicationDate(initialData.publishedDate || initialData.publicationDate || '');
      setExpiryDate(initialData.expiryDate || '');
      setAttachmentName(initialData.attachmentName || '');
      setInternalNotes(initialData.internalNotes || '');
    } else {
      setTitle('');
      setCategory('General');
      setContent('');
      setAudience('All Members');
      setMemberId('');
      setPriority('Normal');
      setStatus('Draft');
      setPublicationDate('');
      setExpiryDate('');
      setAttachmentName('');
      setInternalNotes('');
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Form Validation
  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Notice Title is required.';
    }
    if (!content.trim()) {
      errs.content = 'Notice Content is required.';
    }
    if (!audience) {
      errs.audience = 'Audience selection is required.';
    }
    if (audience === 'Specific Member' && !memberId) {
      errs.memberId = 'Please select a specific approved member.';
    }
    if (status === 'Scheduled' && !publicationDate) {
      errs.publicationDate = 'Publication Date is required for scheduled notices.';
    }
    if (publicationDate && expiryDate && new Date(expiryDate) < new Date(publicationDate)) {
      errs.expiryDate = 'Expiry Date cannot be prior to Publication Date.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e, targetStatus) => {
    e.preventDefault();
    if (isSubmitting) return;

    const finalStatus = targetStatus || status;

    if (!validate()) return;

    setIsSubmitting(true);

    // Get selected member name if audience is Specific Member
    let selectedMemberName = '';
    if (audience === 'Specific Member' && memberId) {
      const found = members.find(m => (m.memberId || m.id) === memberId);
      if (found) {
        selectedMemberName = found.fullName || found.applicantName || `${found.firstName || ''} ${found.lastName || ''}`.trim();
      }
    }

    const payload = {
      ...(initialData || {}),
      title: title.trim(),
      category,
      content: content.trim(),
      audience,
      memberId: audience === 'Specific Member' ? memberId : '',
      memberName: selectedMemberName,
      priority,
      status: finalStatus,
      publicationDate,
      expiryDate,
      attachmentName: attachmentName.trim(),
      internalNotes: internalNotes.trim(),
    };

    onSubmit(payload);
    setIsSubmitting(false);
    onClose();
  };

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
              <h2 className="text-lg font-black tracking-tight">
                {isEditMode ? 'Edit Notice' : 'Create New Official Notice'}
              </h2>
              <p className="text-xs text-slate-400">
                {isEditMode ? `Updating ${initialData.noticeId || initialData.id}` : 'Fill notice information to communicate updates.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={(e) => handleSubmit(e, status)} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Notice Title */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              Notice Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Annual General Body Meeting (AGM) 2026 Notice"
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                errors.title ? 'border-rose-400 ring-rose-200' : 'border-slate-200 focus:border-[#004085] focus:ring-[#004085]/20'
              }`}
            />
            {errors.title && <p className="text-[11px] font-semibold text-rose-500">{errors.title}</p>}
          </div>

          {/* Row: Category & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
              >
                <option value="General">General</option>
                <option value="Announcement">Announcement</option>
                <option value="Financial">Financial</option>
                <option value="Documents">Documents</option>
                <option value="Holiday">Holiday</option>
                <option value="Meeting">Meeting</option>
                <option value="Important">Important</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
              >
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Row: Audience & Specific Member (Conditional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Target Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
              >
                <option value="All Members">All Members</option>
                <option value="Active Members">Active Members</option>
                <option value="New Members">New Members</option>
                <option value="Specific Member">Specific Member</option>
                <option value="Admin Only">Admin Only</option>
              </select>
            </div>

            {audience === 'Specific Member' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  Select Member <span className="text-rose-500">*</span>
                </label>
                <select
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 transition-all ${
                    errors.memberId ? 'border-rose-400 ring-rose-200' : 'border-slate-200 focus:border-[#004085]'
                  }`}
                >
                  <option value="">Select an approved member...</option>
                  {members.map((m) => {
                    const mId = m.memberId || m.id;
                    const name = m.fullName || m.applicantName || `${m.firstName || ''} ${m.lastName || ''}`.trim();
                    return (
                      <option key={mId} value={mId}>
                        {mId} - {name}
                      </option>
                    );
                  })}
                </select>
                {errors.memberId && <p className="text-[11px] font-semibold text-rose-500">{errors.memberId}</p>}
              </div>
            )}

            {/* Status (if not Specific Member occupying the column) */}
            {audience !== 'Specific Member' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            )}
          </div>

          {/* Status row if audience was Specific Member */}
          {audience === 'Specific Member' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          )}

          {/* Notice Content */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              Notice Content <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full notice content, instructions, or regulatory announcement here..."
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                errors.content ? 'border-rose-400 ring-rose-200' : 'border-slate-200 focus:border-[#004085]'
              }`}
            />
            {errors.content && <p className="text-[11px] font-semibold text-rose-500">{errors.content}</p>}
          </div>

          {/* Row: Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Publication Date {status === 'Scheduled' && <span className="text-rose-500">*</span>}
              </label>
              <input
                type="date"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
              />
              {errors.publicationDate && <p className="text-[11px] font-semibold text-rose-500">{errors.publicationDate}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Expiry Date (Optional)</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
              />
              {errors.expiryDate && <p className="text-[11px] font-semibold text-rose-500">{errors.expiryDate}</p>}
            </div>
          </div>

          {/* Attachment Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Attachment Title / Reference (Optional)</label>
            <input
              type="text"
              value={attachmentName}
              onChange={(e) => setAttachmentName(e.target.value)}
              placeholder="e.g., AGM_Schedule_2026.pdf"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
            />
          </div>

          {/* Internal Admin Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Internal Admin Notes (Optional)</label>
            <input
              type="text"
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Private notes for administration team..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004085]/20"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={(e) => handleSubmit(e, 'Draft')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-slate-300" />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={(e) => handleSubmit(e, 'Published')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#004085] hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-200" />
              <span>Publish Notice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
