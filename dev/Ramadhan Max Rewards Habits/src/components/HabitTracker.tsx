import { useMemo } from 'react';
import type { HabitDefinition, DayProgress } from '../types';
import { Icon3D } from './Icon3D';

/* -------------------------------------------------------------------------- */
/*  Props                                                                     */
/* -------------------------------------------------------------------------- */
interface HabitTrackerProps {
  day: number;
  habits: HabitDefinition[];
  progress: DayProgress;
  onToggle: (habitId: string) => void;
  isFriday: boolean;
  isLastTenNights: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Circular progress ring (SVG)                                              */
/* -------------------------------------------------------------------------- */
function ProgressRing({
  percent,
  size = 72,
  strokeWidth = 5,
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.04)"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1B6B4A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-semibold text-[#1d1d1f] leading-none">
          {percent}%
        </span>
        <span className="text-[9px] text-[#aeaeb2] mt-0.5">done</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Habit group renderer                                                      */
/* -------------------------------------------------------------------------- */
function HabitGroup({
  title,
  icon,
  habits,
  progress,
  onToggle,
}: {
  title: string;
  icon: React.ReactNode;
  habits: HabitDefinition[];
  progress: DayProgress;
  onToggle: (habitId: string) => void;
}) {
  if (habits.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base flex items-center">{icon}</span>
        <h3 className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
          {title}
        </h3>
      </div>

      <div className="divide-y divide-[#E8E4DE]">
        {habits.map((habit) => {
          const done = progress[habit.id] === true;
          return (
            <button
              key={habit.id}
              onClick={() => onToggle(habit.id)}
              className={`
                w-full flex items-center gap-3.5 py-3.5 px-1 transition-all duration-300 cursor-pointer
                first:pt-0 last:pb-0
                ${done ? 'opacity-80' : 'hover:bg-[#F8F4EE]'}
              `}
            >
              {/* Apple-style round checkbox */}
              <div
                className={`
                  flex-shrink-0 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center
                  transition-all duration-300
                  ${
                    done
                      ? 'bg-[#1B6B4A] border-[#1B6B4A]'
                      : 'bg-transparent border-[rgba(0,0,0,0.12)] hover:border-[#1B6B4A]/40'
                  }
                `}
              >
                {done && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {/* Label */}
              <span
                className={`flex-1 text-left text-sm font-normal transition-colors duration-300 ${
                  done ? 'text-[#aeaeb2]' : 'text-[#1d1d1f]'
                }`}
              >
                {habit.label}
              </span>

              {/* Target badge */}
              {habit.target && (
                <span
                  className={`text-[10px] font-medium px-2.5 py-1 rounded-full transition-colors duration-300 ${
                    done
                      ? 'bg-[rgba(27,107,74,0.08)] text-[#1B6B4A]/60'
                      : 'bg-[#f5f5f7] text-[#86868b]'
                  }`}
                >
                  {habit.target}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */
export default function HabitTracker({
  day,
  habits,
  progress,
  onToggle,
  isFriday,
  isLastTenNights,
}: HabitTrackerProps) {
  /* Categorize habits */
  const { daily, friday, lastTen } = useMemo(() => {
    const d: HabitDefinition[] = [];
    const f: HabitDefinition[] = [];
    const l: HabitDefinition[] = [];
    for (const h of habits) {
      if (h.category === 'daily') d.push(h);
      else if (h.category === 'friday') f.push(h);
      else if (h.category === 'lastTen') l.push(h);
    }
    return { daily: d, friday: f, lastTen: l };
  }, [habits]);

  /* Visible habits based on day context */
  const visibleHabits = useMemo(() => {
    const all = [...daily];
    if (isFriday) all.push(...friday);
    if (isLastTenNights) all.push(...lastTen);
    return all;
  }, [daily, friday, lastTen, isFriday, isLastTenNights]);

  /* Completion stats */
  const completedCount = visibleHabits.filter(
    (h) => progress[h.id] === true,
  ).length;
  const totalCount = visibleHabits.length;
  const percent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="rounded-2xl border border-[#E8E4DE] bg-[#FFFEFA] shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-5 sm:p-6">
      {/* ---- Header with progress ring ---- */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-[#1d1d1f]">
            Habit Tracker
          </h2>
          <p className="text-xs text-[#86868b] mt-0.5">
            Day {day}{' '}
            {isFriday && (
              <span className="text-[#1d1d1f]">&middot; Jumu'ah</span>
            )}
            {isLastTenNights && (
              <span className="text-[#7B5EA7]">&middot; Last 10 Nights</span>
            )}
          </p>
        </div>
        <ProgressRing percent={percent} />
      </div>

      {/* Summary bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-[#86868b] mb-2">
          <span>
            {completedCount} of {totalCount} habits completed
          </span>
          <span className="text-[#1B6B4A] font-semibold">{percent}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#F3EDE4] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#1B6B4A] transition-all duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* ---- Habit groups ---- */}
      <div className="space-y-6">
        <HabitGroup
          title="Daily Habits"
          icon={<Icon3D name="planner" className="w-5 h-5" />}
          habits={daily}
          progress={progress}
          onToggle={onToggle}
        />

        {isFriday && friday.length > 0 && (
          <HabitGroup
            title="Friday Specials"
            icon={<Icon3D name="mosque" className="w-5 h-5" />}
            habits={friday}
            progress={progress}
            onToggle={onToggle}
          />
        )}

        {isLastTenNights && lastTen.length > 0 && (
          <HabitGroup
            title="Last 10 Nights"
            icon={<Icon3D name="star" className="w-5 h-5" />}
            habits={lastTen}
            progress={progress}
            onToggle={onToggle}
          />
        )}
      </div>
    </div>
  );
}
