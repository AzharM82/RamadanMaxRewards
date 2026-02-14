/* -------------------------------------------------------------------------- */
/*  FridayBadge — decorative banner for Jumu'ah                              */
/* -------------------------------------------------------------------------- */
import { Icon3D } from './Icon3D';

interface FridayBadgeProps {
  visible: boolean;
}

export default function FridayBadge({ visible }: FridayBadgeProps) {
  if (!visible) return null;

  return (
    <div
      className="animate-[fadeIn_0.6s_ease-out] rounded-2xl overflow-hidden"
      style={{
        animation: 'fadeIn 0.6s ease-out both',
      }}
    >
      <div className="relative bg-[#FFFCF5] border border-[rgba(200,150,62,0.20)] rounded-2xl p-5 sm:p-6">
        <div className="relative flex items-center justify-center gap-4">
          {/* Mosque icon */}
          <Icon3D name="mosqueBanner" className="w-8 h-8" />

          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-[#1d1d1f] tracking-wide">
              Jumu'ah Mubarak
            </h3>
            <p
              className="text-[#1d1d1f]/60 text-sm mt-0.5"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              {/* "Blessed Friday" in Arabic */}
              {String.fromCodePoint(0x062c, 0x0645, 0x0639, 0x0629)} {String.fromCodePoint(0x0645, 0x0628, 0x0627, 0x0631, 0x0643, 0x0629)}
            </p>
          </div>

          {/* Second mosque icon for symmetry */}
          <Icon3D name="mosqueBanner" className="w-8 h-8 transform scale-x-[-1]" />
        </div>

        {/* Subtitle */}
        <p className="relative text-center text-xs text-[#86868b] mt-3">
          "The best day on which the sun rises is Friday." — Sahih Muslim 854
        </p>
      </div>

      {/* Inline keyframes (Tailwind 4 compatible) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
