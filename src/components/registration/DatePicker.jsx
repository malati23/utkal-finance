import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable DatePicker component with interactive Year Grid selection.
 * Supports dropUp positioning so calendar popovers are 100% visible without clipping.
 */
export function DatePicker({
  label = 'Date of Birth',
  name = 'dob',
  value = '',
  onChange,
  error = null,
  minYear = 1940,
  maxYear = 2026,
  required = false,
  helperText = '',
  dropUp = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showYearGrid, setShowYearGrid] = useState(false);
  const containerRef = useRef(null);

  // Parse current value
  const dateObj = value ? new Date(value) : null;
  const isValidDate = dateObj && !isNaN(dateObj.getTime());
  
  const initialYear = isValidDate ? dateObj.getFullYear() : 1996;
  const initialMonth = isValidDate ? dateObj.getMonth() : 4; // May

  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setShowYearGrid(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const years = [];
  for (let y = maxYear; y >= minYear; y--) {
    years.push(y);
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const handleSelectDay = (day) => {
    const m = String(viewMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    const formatted = `${viewYear}-${m}-${d}`;
    onChange(formatted);
    setIsOpen(false);
    setShowYearGrid(false);
  };

  // Formatted date text display
  const formattedDisplay = isValidDate
    ? dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="space-y-1.5 relative text-left" ref={containerRef}>
      {label && (
        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
          {label} {required && <span className="text-rose-500 font-extrabold">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowYearGrid(false);
          }}
          className={`w-full bg-white text-slate-900 text-xs rounded-xl pl-10 pr-9 py-2.5 sm:py-3 border text-left flex items-center justify-between transition-all font-medium cursor-pointer ${
            error
              ? 'border-rose-500 ring-2 ring-rose-500/10'
              : isOpen
              ? 'border-blue-600 ring-2 ring-blue-600/10'
              : 'border-slate-300 hover:border-slate-400'
          }`}
        >
          <CalendarIcon className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <span className={formattedDisplay ? 'text-slate-900 font-bold font-mono' : 'text-slate-400'}>
            {formattedDisplay || 'Select Date (dd/mm/yyyy)'}
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </button>

        {/* CALENDAR POPUP - OPENS UPWARDS SO ALL 31 DAYS ARE 100% VISIBLE */}
        {isOpen && (
          <div className={`absolute ${dropUp ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 animate-fade-in text-slate-900 select-none`}>
            {/* HEADER: MONTH NAV & YEAR TOGGLE */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-extrabold text-slate-900 w-24 text-center">
                  {months[viewMonth]}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* YEAR SELECTION TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() => setShowYearGrid(!showYearGrid)}
                className="px-3 py-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-black border border-blue-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Click to view all years"
              >
                <span>{viewYear}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showYearGrid ? 'rotate-180 text-blue-700' : ''}`} />
              </button>
            </div>

            {/* YEAR GRID VIEW (CLICK YEAR TO TOGGLE) */}
            {showYearGrid ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Birth Year</span>
                  <span className="text-[10px] font-bold text-blue-600">1940 – 2026</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 max-h-56 overflow-y-auto p-1 border border-slate-100 rounded-xl bg-slate-50/50">
                  {years.map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => {
                        setViewYear(y);
                        setShowYearGrid(false);
                      }}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        viewYear === y
                          ? 'bg-[#004085] text-white font-extrabold shadow-sm ring-2 ring-blue-400'
                          : 'bg-white hover:bg-blue-50 text-slate-800 border border-slate-200/80 shadow-2xs'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* DAY HEADERS */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1.5 uppercase">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>

                {/* CALENDAR DAYS GRID - ALL DAYS 1 TO 31 FULLY VISIBLE */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Empty padding slots before first day */}
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-8" />
                  ))}

                  {/* Days of current month */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isSelected =
                      isValidDate &&
                      dateObj.getFullYear() === viewYear &&
                      dateObj.getMonth() === viewMonth &&
                      dateObj.getDate() === day;

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleSelectDay(day)}
                        className={`h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'bg-[#004085] text-white shadow-sm font-black'
                            : 'hover:bg-blue-50 text-slate-800'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-[11px] font-bold text-rose-600 mt-1">{error}</p>}
      {helperText && !error && <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>}
    </div>
  );
}

export default DatePicker;
