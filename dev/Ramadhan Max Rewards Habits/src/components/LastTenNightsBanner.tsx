/* -------------------------------------------------------------------------- */
/*  LastTenNightsBanner — appears on days 21-30 of Ramadan                   */
/* -------------------------------------------------------------------------- */
import { Icon3D } from './Icon3D';

interface LastTenNightsBannerProps {
  visible: boolean;
  currentDay: number;
}

/* Individual star with staggered animation */
function Star({ delay, size, className }: { delay: number; size: number; className?: string }) {
  return (
    <span
      className={`animate-sparkle ${className ?? ''}`}
      style={{ animationDelay: `${delay}s`, width: size, height: size, display: 'inline-flex' }}
    >
      <Icon3D name="star" className="w-full h-full" />
    </span>
  );
}

export default function LastTenNightsBanner({
  visible,
  currentDay,
}: LastTenNightsBannerProps) {
  if (!visible) return null;

  const isOddNight =
    currentDay === 21 ||
    currentDay === 23 ||
    currentDay === 25 ||
    currentDay === 27 ||
    currentDay === 29;

  const nightNumber = currentDay - 20; // 1-10 within the last ten

  return (
    <div
      className="animate-[bannerFadeIn_0.8s_ease-out_both] rounded-2xl overflow-hidden"
    >
      <div
        className={`
          relative border rounded-2xl p-5 sm:p-6 overflow-hidden
          ${
            isOddNight
              ? 'bg-gradient-to-br from-[#7B5EA7]/[0.04] via-[#FFFEFA] to-[#C8963E]/[0.04] border-[#7B5EA7]/15'
              : 'bg-gradient-to-br from-[#7B5EA7]/[0.03] via-[#FFFEFA] to-[#C8963E]/[0.03] border-[#E8E4DE]'
          }
        `}
      >
        {/* Sparkle background pattern — subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Star delay={0} size={10} className="absolute top-3 left-[12%] opacity-30" />
          <Star delay={0.5} size={7} className="absolute top-5 left-[28%] opacity-20" />
          <Star delay={1.2} size={8} className="absolute top-2 left-[48%] opacity-25" />
          <Star delay={0.3} size={11} className="absolute top-4 right-[22%] opacity-30" />
          <Star delay={0.8} size={7} className="absolute top-6 right-[10%] opacity-20" />
          <Star delay={1.5} size={9} className="absolute bottom-4 left-[18%] opacity-25" />
          <Star delay={0.7} size={6} className="absolute bottom-3 left-[58%] opacity-15" />
          <Star delay={1.0} size={10} className="absolute bottom-5 right-[18%] opacity-25" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Main heading */}
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <Star delay={0} size={16} className="text-[#C8963E]/40" />
            <h3
              className={`text-center font-semibold tracking-wide ${
                isOddNight
                  ? 'text-lg sm:text-xl text-[#1d1d1f]'
                  : 'text-base sm:text-lg text-[#1d1d1f]'
              }`}
            >
              Last 10 Nights
            </h3>
            <Star delay={0.6} size={16} className="text-[#C8963E]/40" />
          </div>

          {/* Arabic */}
          <p
            className="text-center text-sm text-[#7B5EA7] mb-2"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            {/* Al-Ashr Al-Awaakhir */}
            {String.fromCodePoint(0x0627, 0x0644, 0x0639, 0x0634, 0x0631)} {String.fromCodePoint(0x0627, 0x0644, 0x0623, 0x0648, 0x0627, 0x062e, 0x0631)}
          </p>

          {/* Subtitle */}
          <p className="text-center text-xs text-[#1d1d1f]">
            Night {nightNumber} of 10 — Seek Laylat al-Qadr
          </p>

          {/* Odd-night emphasis — clean gold bordered card */}
          {isOddNight && (
            <div className="mt-4 p-4 rounded-xl bg-[rgba(200,150,62,0.04)] border border-[rgba(200,150,62,0.15)] text-center">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <Star delay={0} size={12} className="text-[#C8963E]/50" />
                <Star delay={0.3} size={12} className="text-[#C8963E]/50" />
                <Star delay={0.6} size={12} className="text-[#C8963E]/50" />
              </div>
              <p className="text-sm font-semibold text-[#1d1d1f]">
                This could be Laylat al-Qadr!
              </p>
              <p
                className="text-xs text-[#1d1d1f] mt-1.5"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                "The Night of Decree is better than a thousand months"
              </p>
              <p className="text-[10px] text-[#aeaeb2] mt-1">
                Quran 97:3
              </p>
            </div>
          )}

          {/* Dua reminder */}
          <div className="mt-4 text-center">
            <p className="text-xs text-[#1d1d1f] italic">
              "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni"
            </p>
            <p className="text-[10px] text-[#aeaeb2] mt-1">
              "O Allah, You are forgiving and love forgiveness, so forgive me." — Tirmidhi 3513
            </p>
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes bannerFadeIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
