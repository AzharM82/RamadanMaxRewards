import { useState } from 'react';
import type { DaySection, Deed } from '../types';
import DeedCard from './DeedCard';
import { Icon3D, EMOJI_TO_3D } from './Icon3D';

interface SectionPanelProps {
  section: DaySection;
  completedDeeds: string[];
  onToggleDeed: (deedId: string) => void;
  accentClass: string;
  accentColor: string;
  onShowDetail: (deed: Deed) => void;
  defaultExpanded?: boolean;
}

export default function SectionPanel({
  section,
  completedDeeds,
  onToggleDeed,
  accentClass,
  accentColor,
  onShowDetail,
  defaultExpanded = false,
}: SectionPanelProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const completedCount = section.deeds.filter((d) =>
    completedDeeds.includes(d.id),
  ).length;
  const totalCount = section.deeds.length;
  const allDone = completedCount === totalCount && totalCount > 0;
  const percent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div
      className={`
        rounded-2xl border-t-[3px] border border-[#E8E4DE]
        bg-[#FFFEFA] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden
        transition-all duration-300
        ${accentClass}
      `}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between p-5 sm:p-6 cursor-pointer
                   hover:bg-[#F8F4EE] transition-colors duration-200"
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon3D name={EMOJI_TO_3D[section.icon] || section.icon} className="w-7 h-7 flex-shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-semibold text-[#1d1d1f] leading-tight">
                {section.title}
              </h2>
              <span className="text-sm text-[#1d1d1f]/80" style={{ fontFamily: 'Amiri, serif' }}>
                {section.titleAr}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#1d1d1f]">{section.timeWindow}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`text-xs font-medium transition-colors duration-300 flex items-center gap-1 ${allDone ? 'text-[#1B6B4A]' : 'text-[#1d1d1f]'}`}>
            {allDone && (
              <Icon3D name="checkCircle" className="w-3.5 h-3.5" />
            )}
            {completedCount}/{totalCount}
          </span>
          <Icon3D name="chevron" className={`w-5 h-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Mini progress bar (always visible) */}
      <div className="mx-5 sm:mx-6">
        <div className="h-[2px] rounded-full bg-[#F3EDE4] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percent}%`, backgroundColor: accentColor }}
          />
        </div>
      </div>

      {/* Collapsible body */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 space-y-3">
          {section.deeds.map((deed) => (
            <DeedCard
              key={deed.id}
              deed={deed}
              isCompleted={completedDeeds.includes(deed.id)}
              onToggle={() => onToggleDeed(deed.id)}
              onShowDetail={onShowDetail}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
