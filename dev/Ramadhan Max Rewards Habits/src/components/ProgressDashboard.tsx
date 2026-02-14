import { useMemo } from 'react';
import type { AllProgress, HabitDefinition } from '../types';
import { Icon3D } from './Icon3D';

/* -------------------------------------------------------------------------- */
/*  Motivational hadith pool                                                  */
/* -------------------------------------------------------------------------- */
const MOTIVATIONAL_HADITHS = [
  {
    text: '"The most beloved deeds to Allah are those that are most consistent, even if they are small."',
    reference: 'Sahih al-Bukhari 6464',
    minPercent: 0,
  },
  {
    text: '"Whoever fasts Ramadan with faith and seeking reward, his previous sins will be forgiven."',
    reference: 'Sahih al-Bukhari 38',
    minPercent: 20,
  },
  {
    text: '"When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained."',
    reference: 'Sahih al-Bukhari 3277',
    minPercent: 40,
  },
  {
    text: '"Whoever stands (in prayer) during Ramadan with faith and seeking reward, his previous sins will be forgiven."',
    reference: 'Sahih al-Bukhari 37',
    minPercent: 60,
  },
  {
    text: '"Every deed of the son of Adam is multiplied, a good deed receiving ten to seven hundred times its like. Allah said: Except fasting, for it is for Me and I shall reward it."',
    reference: 'Sahih Muslim 1151',
    minPercent: 80,
  },
];

/* -------------------------------------------------------------------------- */
/*  Props                                                                     */
/* -------------------------------------------------------------------------- */
interface ProgressDashboardProps {
  currentDay: number;
  progress: AllProgress;
  habits: HabitDefinition[];
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
function getCompletionBg(percent: number): string {
  if (percent === 0) return 'bg-[#F3EDE4]';
  if (percent < 25) return 'bg-[#1B6B4A]/10';
  if (percent < 50) return 'bg-[#1B6B4A]/25';
  if (percent < 75) return 'bg-[#1B6B4A]/40';
  if (percent < 100) return 'bg-[#1B6B4A]/65';
  return 'bg-[#1B6B4A]';
}

function getCompletionTextColor(percent: number): string {
  if (percent >= 75) return 'text-white';
  if (percent >= 25) return 'text-[#1d1d1f]';
  return 'text-[#aeaeb2]';
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
export default function ProgressDashboard({
  currentDay,
  progress,
  habits,
}: ProgressDashboardProps) {
  const stats = useMemo(() => {
    const totalHabits = habits.length;
    let totalDeedsDone = 0;
    let bestDayNum = 0;
    let bestDayCount = 0;
    const dayPercents: number[] = [];
    const habitCompletions: Record<string, number> = {};

    // Initialize habit counters
    for (const h of habits) {
      habitCompletions[h.id] = 0;
    }

    const effectiveDay = Math.min(currentDay, 30);

    for (let d = 1; d <= effectiveDay; d++) {
      const dayData = progress[d] ?? {};
      let dayDone = 0;

      for (const h of habits) {
        if (dayData[h.id] === true) {
          dayDone++;
          habitCompletions[h.id] = (habitCompletions[h.id] || 0) + 1;
        }
      }

      totalDeedsDone += dayDone;
      const pct = totalHabits > 0 ? Math.round((dayDone / totalHabits) * 100) : 0;
      dayPercents.push(pct);

      if (dayDone > bestDayCount) {
        bestDayCount = dayDone;
        bestDayNum = d;
      }
    }

    // Current streak (counting backwards from effectiveDay)
    let streak = 0;
    for (let d = effectiveDay; d >= 1; d--) {
      const dayData = progress[d] ?? {};
      const done = Object.values(dayData).filter(Boolean).length;
      if (done > 0) {
        streak++;
      } else {
        break;
      }
    }

    // Sort habits by completion count
    const sortedHabits = habits
      .map((h) => ({ ...h, count: habitCompletions[h.id] || 0 }))
      .sort((a, b) => b.count - a.count);

    const topConsistent = sortedHabits.slice(0, 3);
    const needsImprovement = [...sortedHabits]
      .sort((a, b) => a.count - b.count)
      .slice(0, 3);

    // Overall average for motivational hadith
    const avgPercent =
      dayPercents.length > 0
        ? Math.round(dayPercents.reduce((a, b) => a + b, 0) / dayPercents.length)
        : 0;

    // Pick the best matching hadith
    const hadith = [...MOTIVATIONAL_HADITHS]
      .filter((h) => h.minPercent <= avgPercent)
      .pop() || MOTIVATIONAL_HADITHS[0];

    return {
      totalDeedsDone,
      bestDayNum,
      bestDayCount,
      streak,
      dayPercents,
      topConsistent,
      needsImprovement,
      hadith,
      avgPercent,
      effectiveDay,
    };
  }, [currentDay, progress, habits]);

  return (
    <div className="rounded-2xl border border-[#E8E4DE] bg-[#FFFEFA] shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-5 sm:p-6">
      {/* ---- Title ---- */}
      <div className="flex items-center gap-2.5 mb-6">
        <Icon3D name="chart" className="w-5 h-5" />
        <h2 className="text-lg font-semibold text-[#1d1d1f]">
          Ramadan Progress
        </h2>
      </div>

      {/* ---- Stats row ---- */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-4 rounded-2xl bg-[#FFFEFA] border border-[#E8E4DE] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <p className="text-2xl font-semibold text-[#1d1d1f]">{stats.totalDeedsDone}</p>
          <p className="text-[10px] text-[#1d1d1f] mt-1 uppercase tracking-wider font-medium">
            Total Deeds
          </p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-[#FFFEFA] border border-[#E8E4DE] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <p className="text-2xl font-semibold text-[#1d1d1f]">
            {stats.bestDayNum > 0 ? `Day ${stats.bestDayNum}` : '--'}
          </p>
          <p className="text-[10px] text-[#1d1d1f] mt-1 uppercase tracking-wider font-medium">
            Best Day
          </p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-[#FFFEFA] border border-[#E8E4DE] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <p className="text-2xl font-semibold text-[#1d1d1f]">
            {stats.streak > 0 ? stats.streak : 0}
          </p>
          <p className="text-[10px] text-[#1d1d1f] mt-1 uppercase tracking-wider font-medium">
            Day Streak
          </p>
        </div>
      </div>

      {/* ---- 30-day heatmap ---- */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-3">
          30-Day Overview
        </h3>
        <div className="grid grid-cols-10 gap-1.5">
          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            const pct = i < stats.dayPercents.length ? stats.dayPercents[i] : 0;
            const isFuture = day > stats.effectiveDay;

            return (
              <div
                key={day}
                title={`Day ${day}: ${pct}%`}
                className={`
                  relative aspect-square rounded-lg flex items-center justify-center text-[10px] font-semibold
                  transition-all duration-300
                  ${isFuture ? 'bg-[#F3EDE4] text-[#aeaeb2]/40' : getCompletionBg(pct)}
                  ${!isFuture ? getCompletionTextColor(pct) : ''}
                  ${day >= 21 && !isFuture ? 'ring-1 ring-[#7B5EA7]/15' : ''}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-2.5">
          <span className="text-[9px] text-[#aeaeb2]">Less</span>
          <div className="w-3 h-3 rounded bg-[#F3EDE4]" />
          <div className="w-3 h-3 rounded bg-[#1B6B4A]/10" />
          <div className="w-3 h-3 rounded bg-[#1B6B4A]/25" />
          <div className="w-3 h-3 rounded bg-[#1B6B4A]/40" />
          <div className="w-3 h-3 rounded bg-[#1B6B4A]/65" />
          <div className="w-3 h-3 rounded bg-[#1B6B4A]" />
          <span className="text-[9px] text-[#aeaeb2]">More</span>
        </div>
      </div>

      {/* ---- Top consistent habits ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        {/* Most consistent */}
        <div>
          <h3 className="text-xs font-semibold text-[#34c759] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Icon3D name="checkCircle" className="w-3.5 h-3.5" />
            Most Consistent
          </h3>
          <div className="space-y-1.5">
            {stats.topConsistent.map((h, idx) => (
              <div
                key={h.id}
                className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl bg-[#F8F4EE]"
              >
                <span className="text-xs font-semibold text-[#aeaeb2] w-4">
                  {idx + 1}.
                </span>
                <span className="flex-1 text-xs text-[#1d1d1f] truncate">
                  {h.label}
                </span>
                <span className="text-[10px] font-semibold text-[#34c759]">
                  {h.count}/{stats.effectiveDay}
                </span>
              </div>
            ))}
            {stats.topConsistent.length === 0 && (
              <p className="text-xs text-[#aeaeb2] italic">No data yet</p>
            )}
          </div>
        </div>

        {/* Needs improvement */}
        <div>
          <h3 className="text-xs font-semibold text-[#ff9500] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Icon3D name="warning" className="w-3.5 h-3.5" />
            Needs Improvement
          </h3>
          <div className="space-y-1.5">
            {stats.needsImprovement.map((h, idx) => (
              <div
                key={h.id}
                className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl bg-[#F8F4EE]"
              >
                <span className="text-xs font-semibold text-[#aeaeb2] w-4">
                  {idx + 1}.
                </span>
                <span className="flex-1 text-xs text-[#1d1d1f] truncate">
                  {h.label}
                </span>
                <span className="text-[10px] font-semibold text-[#ff9500]">
                  {h.count}/{stats.effectiveDay}
                </span>
              </div>
            ))}
            {stats.needsImprovement.length === 0 && (
              <p className="text-xs text-[#aeaeb2] italic">No data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* ---- Motivational Hadith ---- */}
      <div className="p-5 rounded-2xl bg-[rgba(200,150,62,0.05)] border border-[rgba(200,150,62,0.10)]">
        <div className="flex items-start gap-3">
          <Icon3D name="reward" className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p
              className="text-sm text-[#1d1d1f] leading-relaxed italic"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              {stats.hadith.text}
            </p>
            <p className="mt-2 text-[10px] font-semibold text-[#1d1d1f]/70 tracking-wide">
              {stats.hadith.reference}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
