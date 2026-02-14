import { useState, useCallback } from 'react';
import type { Deed } from '../types';
import { Icon3D } from './Icon3D';

interface DeedCardProps {
  deed: Deed;
  isCompleted: boolean;
  onToggle: () => void;
  onShowDetail: (deed: Deed) => void;
}

export default function DeedCard({ deed, isCompleted, onToggle, onShowDetail }: DeedCardProps) {
  const [justCompleted, setJustCompleted] = useState(false);

  const handleToggle = useCallback(() => {
    if (!isCompleted) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 800);
    }
    onToggle();
  }, [isCompleted, onToggle]);

  return (
    <div
      className={`
        relative rounded-2xl transition-all duration-500
        ${isCompleted
          ? 'bg-[rgba(27,107,74,0.04)] border border-[#E8E4DE] shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
          : 'bg-[#FFFEFA] border border-[#E8E4DE] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
        }
        ${justCompleted ? 'animate-deed-complete' : ''}
      `}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Circle checkbox with green fill */}
          <button
            onClick={handleToggle}
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            className={`
              flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center
              transition-all duration-300 cursor-pointer
              ${isCompleted
                ? 'bg-[#1B6B4A] border-[#1B6B4A]'
                : 'bg-transparent border-[#D5D0C8] hover:border-[#1B6B4A]/50'
              }
            `}
            style={justCompleted ? { animation: 'checkbox-bounce 0.3s ease' } : undefined}
          >
            {isCompleted && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-base font-semibold leading-snug transition-colors duration-300 ${isCompleted ? 'text-[#1B6B4A]' : 'text-[#1d1d1f]'}`}>
                {deed.title}
              </h3>
              {deed.titleAr && (
                <span className="text-sm text-[#1d1d1f]/80" style={{ fontFamily: 'Amiri, serif' }}>
                  {deed.titleAr}
                </span>
              )}
            </div>
            <p className={`mt-1.5 text-sm leading-relaxed transition-opacity duration-300 ${isCompleted ? 'text-[#86868b]' : 'text-[#86868b]'}`}>
              {deed.description}
            </p>
            {/* Reward summary — 1 line italic gold */}
            <p className="mt-2 text-xs italic text-[#1d1d1f]/70">
              <Icon3D name="reward" className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
              {deed.reward}
            </p>
          </div>

          {/* Info button */}
          <button
            onClick={() => onShowDetail(deed)}
            aria-label="Show deed details"
            className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center text-[#aeaeb2] hover:text-[#1B6B4A] hover:bg-[#E8F5EE] transition-all duration-200 cursor-pointer"
          >
            <Icon3D name="info" className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
