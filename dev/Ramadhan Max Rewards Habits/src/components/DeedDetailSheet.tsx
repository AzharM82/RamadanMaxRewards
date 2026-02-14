import { useEffect, useCallback } from 'react';
import type { Deed } from '../types';
import { Icon3D } from './Icon3D';

interface DeedDetailSheetProps {
  deed: Deed;
  isCompleted: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export default function DeedDetailSheet({ deed, isCompleted, onClose, onToggle }: DeedDetailSheetProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      onClick={handleBackdropClick}
      style={{ animation: 'fade-in 0.2s ease-out' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Sheet */}
      <div
        className="relative w-full max-w-2xl bg-[#FFFEFA] rounded-t-3xl shadow-xl max-h-[85vh] overflow-y-auto"
        style={{ animation: 'slide-up 0.3s ease-out' }}
      >
        {/* Drag handle */}
        <div className="sticky top-0 bg-[#FFFEFA] pt-3 pb-2 flex justify-center rounded-t-3xl z-10">
          <div className="w-10 h-1 rounded-full bg-[#D5D0C8]" />
        </div>

        <div className="px-6 pb-8">
          {/* Close button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F3EDE4] flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              <Icon3D name="close" className="w-4 h-4" />
            </button>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-[#1d1d1f]">{deed.title}</h2>
          {deed.titleAr && (
            <p className="text-lg text-[#1d1d1f]/90 mt-1" style={{ fontFamily: 'Amiri, serif' }}>
              {deed.titleAr}
            </p>
          )}

          {/* Description */}
          <p className="mt-4 text-sm text-[#86868b] leading-relaxed">{deed.description}</p>

          {/* Transliteration/Translation card */}
          {deed.transliteration && (
            <div className="mt-4 p-4 rounded-xl bg-[#F8F4EE] border border-[#E8E4DE]">
              <p className="text-sm italic text-[#1d1d1f]/70 leading-relaxed">{deed.transliteration}</p>
              {deed.translation && (
                <p className="mt-2 text-xs text-[#86868b] leading-relaxed">{deed.translation}</p>
              )}
            </div>
          )}

          {/* Reward card — gold */}
          <div className="mt-4 p-4 rounded-xl bg-[rgba(200,150,62,0.06)] border border-[rgba(200,150,62,0.12)]">
            <div className="flex items-center gap-2">
              <Icon3D name="reward" className="w-4 h-4" />
              <span className="text-sm font-semibold text-[#1d1d1f]">Reward</span>
            </div>
            <p className="mt-1.5 text-sm text-[#1d1d1f]/80">{deed.reward}</p>
          </div>

          {/* Tip card — green */}
          <div className="mt-3 p-4 rounded-xl bg-[rgba(27,107,74,0.05)] border border-[rgba(27,107,74,0.10)]">
            <div className="flex items-center gap-2">
              <Icon3D name="info" className="w-4 h-4" />
              <span className="text-sm font-semibold text-[#1B6B4A]">Tip</span>
            </div>
            <p className="mt-1.5 text-xs text-[#86868b] leading-relaxed">{deed.tip}</p>
          </div>

          {/* Sources */}
          {deed.sources.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">Sources</h4>
              <div className="space-y-2">
                {deed.sources.map((source, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#F8F4EE] border border-[#E8E4DE]">
                    <p className="text-xs text-[#1d1d1f]/70 leading-relaxed italic">"{source.text}"</p>
                    <p className="mt-1.5 text-[10px] font-semibold text-[#1d1d1f]/70 tracking-wide">{source.reference}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mark as Complete button */}
          <button
            onClick={onToggle}
            className={`
              mt-6 w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer
              ${isCompleted
                ? 'bg-[#F3EDE4] text-[#86868b]'
                : 'bg-[#1B6B4A] text-white hover:bg-[#155A3E]'
              }
            `}
          >
            {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
          </button>
        </div>
      </div>
    </div>
  );
}
