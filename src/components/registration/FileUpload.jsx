import React, { useRef } from 'react';
import { Upload, FileText, CheckCircle2, Trash2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { ValidationMessage } from './ValidationMessage';

export function FileUpload({
  label,
  name,
  file,
  onFileSelect,
  onFileRemove,
  acceptedTypes = '.pdf,.jpg,.jpeg,.png',
  maxSizeMB = 5,
  required = false,
  error,
  helperText = 'Allowed: PDF, JPG, JPEG, PNG (Max 5MB)',
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Validate size
    if (selected.size > maxSizeMB * 1024 * 1024) {
      onFileSelect(name, null, `File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    // Create a mock file object for frontend preview
    const isImage = selected.type.startsWith('image/');
    const mockFileObj = {
      name: selected.name,
      size: `${(selected.size / (1024 * 1024)).toFixed(2)} MB`,
      type: selected.type,
      progress: 100,
      previewUrl: isImage ? URL.createObjectURL(selected) : null,
      rawFile: selected,
    };

    onFileSelect(name, mockFileObj, null);
  };

  const handleTriggerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-bold text-slate-700 tracking-wide">
          {label}
          {required && <span className="text-rose-500 ml-1 font-extrabold">*</span>}
        </label>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes}
        className="hidden"
      />

      {file ? (
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
              {file.previewUrl ? (
                <img
                  src={file.previewUrl}
                  alt={file.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-0.5">
                <span>{file.size}</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleTriggerClick}
              className="text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              Replace
            </button>

            <button
              type="button"
              onClick={() => onFileRemove(name)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Remove file"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleTriggerClick}
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 group
            ${
              error
                ? 'border-rose-300 bg-rose-50/40 hover:bg-rose-50/70'
                : 'border-slate-300/80 bg-slate-50/50 hover:bg-slate-100/70 hover:border-blue-400'
            }
          `}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-700 hover:underline">
              Click to browse or upload file
            </span>
            <p className="text-[11px] text-slate-400 font-normal mt-0.5">{helperText}</p>
          </div>
        </div>
      )}

      <ValidationMessage message={error} />
    </div>
  );
}
