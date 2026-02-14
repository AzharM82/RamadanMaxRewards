import { useRef, useEffect, useCallback } from 'react';
import { Icon3D } from './Icon3D';

/* -------------------------------------------------------------------------- */
/*  Ramadan start date — used to compute which days fall on Friday            */
/* -------------------------------------------------------------------------- */
const RAMADAN_START = new Date(2026, 1, 18); // Feb 18, 2026

function isFridayDay(dayNumber: number): boolean {
  const date = new Date(RAMADAN_START);
  date.setDate(date.getDate() + dayNumber - 1);
  return date.getDay() === 5;
}

/* -------------------------------------------------------------------------- */
/*  Props                                                                     */
/* -------------------------------------------------------------------------- */
interface DaySelectorProps {
  currentDay: number;
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
export default function DaySelector({
  currentDay,
  selectedDay,
  onSelectDay,
}: DaySelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const isInitialMount = useRef(true);

  // Days that trigger scrolling in a specific direction
  const SCROLL_RIGHT_DAYS = new Set([5, 10, 15, 20, 25]);
  const SCROLL_LEFT_DAYS = new Set([4, 9, 14, 19, 24]);

  useEffect(() => {
    if (!scrollRef.current) return;

    if (isInitialMount.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
      isInitialMount.current = false;
      return;
    }

    if (!selectedRef.current) return;
    const container = scrollRef.current;
    const button = selectedRef.current;

    if (SCROLL_RIGHT_DAYS.has(selectedDay)) {
      // Scroll right so tapped day is near the left edge
      container.scrollTo({ left: button.offsetLeft - 16, behavior: 'smooth' });
    } else if (SCROLL_LEFT_DAYS.has(selectedDay)) {
      // Scroll left so tapped day is near the right edge
      const scrollLeft = button.offsetLeft - container.clientWidth + button.clientWidth + 16;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
    }
    // All other days: no scroll
  }, [selectedDay]);

  const handleSelect = useCallback(
    (day: number) => {
      if (day <= currentDay) {
        onSelectDay(day);
      }
    },
    [currentDay, onSelectDay],
  );

  return (
    <div className="w-full">
      {/* Label */}
      <div className="flex items-center justify-between px-1 mb-3">
        <h2 className="text-xs font-semibold tracking-wider uppercase text-[#1d1d1f]">
          Ramadan Days
        </h2>
        <span className="text-xs text-[#aeaeb2]">
          Day {currentDay > 30 ? 30 : currentDay < 1 ? 1 : currentDay} of 30
        </span>
      </div>

      {/* Scrollable strip */}
      <div
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
          const isSelected = day === selectedDay;
          const isCurrent = day === currentDay;
          const isFuture = day > currentDay;
          const friday = isFridayDay(day);
          const lastTen = day >= 21;

          return (
            <button
              key={day}
              ref={isSelected ? selectedRef : undefined}
              onClick={() => handleSelect(day)}
              disabled={isFuture}
              className={`
                relative flex-shrink-0 snap-center flex flex-col items-center justify-center
                w-14 h-[72px] rounded-full transition-all duration-300 cursor-pointer
                ${
                  isSelected
                    ? 'bg-white border-2 border-[#1B6B4A] shadow-[0_2px_12px_rgba(27,107,74,0.18)]'
                    : isCurrent
                      ? 'bg-white border-2 border-[#1B6B4A]/40 shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                      : isFuture
                        ? 'bg-[#F3EDE4] border border-transparent opacity-35 cursor-not-allowed'
                        : 'bg-[#F3EDE4] border border-transparent hover:bg-[#F3EDE4] hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
                }
              `}
            >
              {/* Last 10 nights star */}
              {lastTen && !isFuture && (
                <span className="absolute -top-0.5 -right-0.5">
                  <Icon3D name="star" className="w-3 h-3 opacity-50" />
                </span>
              )}

              {/* Day label */}
              <span
                className={`text-[9px] font-medium uppercase tracking-wider ${
                  isSelected ? 'text-[#1B6B4A]' : 'text-[#aeaeb2]'
                }`}
              >
                Day
              </span>

              {/* Day number */}
              <span
                className={`text-lg font-semibold leading-none mt-0.5 ${
                  isSelected ? 'text-[#1d1d1f]' : isFuture ? 'text-[#aeaeb2]' : 'text-[#1d1d1f]'
                }`}
              >
                {day}
              </span>

              {/* Friday indicator */}
              {friday && (
                <span
                  className={`text-[7px] font-medium mt-0.5 tracking-wide ${
                    isSelected ? 'text-[#1B6B4A]' : 'text-[#1d1d1f]'
                  }`}
                >
                  Jumu'ah
                </span>
              )}

              {/* Current day dot indicator */}
              {isCurrent && !isSelected && !friday && (
                <span className="w-1 h-1 rounded-full bg-[#1B6B4A] mt-1" />
              )}

              {/* Non-friday, non-current spacer for alignment */}
              {!friday && !(isCurrent && !isSelected) && <span className="mt-0.5 h-[8px]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
