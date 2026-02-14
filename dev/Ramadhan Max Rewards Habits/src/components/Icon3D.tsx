import React, { useMemo } from 'react';

/* ------------------------------------------------------------------ */
/*  EMOJI_TO_3D mapping                                               */
/* ------------------------------------------------------------------ */
export const EMOJI_TO_3D: Record<string, string> = {
  '\u{1F319}': 'moon',
  '\u{2600}\u{FE0F}': 'sun',
  '\u{1F54C}': 'mosque',
  '\u{1F305}': 'sunset',
  '\u{2728}': 'sparkles',
  '\u{2B50}': 'star',
  '\u{1F4CB}': 'planner',
  '\u{2705}': 'habits',
  '\u{1F4CA}': 'chart',
};

/* ------------------------------------------------------------------ */
/*  Shared constants                                                  */
/* ------------------------------------------------------------------ */
const SVG_PROPS: React.SVGProps<SVGSVGElement> = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  style: { filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' },
};

/* ------------------------------------------------------------------ */
/*  Icon renderers — each receives a unique `id` prefix               */
/* ------------------------------------------------------------------ */
const ICON_MAP: Record<string, (id: string) => React.ReactNode> = {
  /* ============================================================== */
  /*  SECTION ICONS                                                 */
  /* ============================================================== */

  /** Crescent moon — deep indigo / blue */
  moon: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4338CA" />
          <stop offset="50%" stopColor="#3730A3" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>
        <radialGradient id={`${id}-b`} cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity={0.7} />
          <stop offset="100%" stopColor="#818CF8" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-c`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5B4FC" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Main crescent */}
      <path
        d="M12 3a9 9 0 1 0 0 18 7 7 0 0 1 0-18Z"
        fill={`url(#${id}-a)`}
      />
      {/* Highlight sheen */}
      <path
        d="M12 3a9 9 0 1 0 0 18 7 7 0 0 1 0-18Z"
        fill={`url(#${id}-b)`}
      />
      {/* Top rim highlight */}
      <path
        d="M12 3a9 9 0 0 0-4 1.5 7 7 0 0 1 4-1.5Z"
        fill={`url(#${id}-c)`}
      />
      {/* Small star accent */}
      <circle cx="17" cy="7" r="1" fill="#C7D2FE" opacity={0.8} />
    </svg>
  ),

  /** Radiant sun — gold / amber */
  sun: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <radialGradient id={`${id}-a`} cx="50%" cy="45%" r="45%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
        <radialGradient id={`${id}-b`} cx="45%" cy="35%" r="30%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="12"
          x2="12"
          y2="2.5"
          stroke={`url(#${id}-c)`}
          strokeWidth="1.6"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
      {/* Core disc */}
      <circle cx="12" cy="12" r="5.5" fill={`url(#${id}-a)`} />
      {/* Top-left highlight */}
      <circle cx="12" cy="12" r="5.5" fill={`url(#${id}-b)`} />
    </svg>
  ),

  /** Mosque with dome and minarets — green / emerald */
  mosque: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#1B6B4A" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EE7B7" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#1B6B4A" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#E5B85C" />
          <stop offset="100%" stopColor="#C8963E" />
        </linearGradient>
      </defs>
      {/* Left minaret */}
      <rect x="3" y="10" width="2.5" height="11" rx="0.5" fill={`url(#${id}-a)`} />
      <rect x="3" y="10" width="2.5" height="4" rx="0.5" fill={`url(#${id}-b)`} />
      <circle cx="4.25" cy="9" r="1.4" fill={`url(#${id}-c)`} />
      {/* Right minaret */}
      <rect x="18.5" y="10" width="2.5" height="11" rx="0.5" fill={`url(#${id}-a)`} />
      <rect x="18.5" y="10" width="2.5" height="4" rx="0.5" fill={`url(#${id}-b)`} />
      <circle cx="19.75" cy="9" r="1.4" fill={`url(#${id}-c)`} />
      {/* Main body */}
      <rect x="6" y="12" width="12" height="9" rx="1" fill={`url(#${id}-a)`} />
      <rect x="6" y="12" width="12" height="3" rx="1" fill={`url(#${id}-b)`} />
      {/* Dome */}
      <path d="M7 12 Q12 3 17 12Z" fill={`url(#${id}-a)`} />
      <path d="M8 12 Q12 5 13 9 L8 12Z" fill={`url(#${id}-b)`} />
      {/* Crescent finial */}
      <path d="M12 3.5 a1.2 1.2 0 1 0 0.6-1 a0.8 0.8 0 0 1-0.6 1Z" fill={`url(#${id}-c)`} />
      {/* Door */}
      <path d="M10 21 v-4 a2 2 0 0 1 4 0 v4Z" fill="#064E3B" opacity={0.7} />
    </svg>
  ),

  /** Sun setting over horizon — orange / coral */
  sunset: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <radialGradient id={`${id}-a`} cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#DC2626" />
        </radialGradient>
        <linearGradient id={`${id}-b`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FB923C" stopOpacity={0} />
          <stop offset="50%" stopColor="#FDBA74" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#FB923C" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
      </defs>
      {/* Sky glow */}
      <ellipse cx="12" cy="15" rx="10" ry="6" fill={`url(#${id}-a)`} opacity={0.25} />
      {/* Sun disc (half) */}
      <path d="M5 15 a7 7 0 0 1 14 0Z" fill={`url(#${id}-a)`} />
      {/* Highlight on sun */}
      <path d="M6 15 a6 6 0 0 1 5-5.9 v5.9Z" fill="#FDE68A" opacity={0.35} />
      {/* Horizon line */}
      <rect x="1" y="14.5" width="22" height="1.5" rx="0.75" fill={`url(#${id}-c)`} />
      {/* Reflection shimmer */}
      <ellipse cx="12" cy="18" rx="5" ry="2" fill={`url(#${id}-b)`} />
      {/* Water / ground */}
      <rect x="1" y="16" width="22" height="6" rx="1" fill={`url(#${id}-c)`} opacity={0.45} />
      {/* Rays */}
      {[-40, -20, 0, 20, 40].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="12"
          x2="12"
          y2="4"
          stroke="#FDBA74"
          strokeWidth="1"
          strokeLinecap="round"
          opacity={0.5}
          transform={`rotate(${deg} 12 15)`}
        />
      ))}
    </svg>
  ),

  /** Decorative sparkles — teal / cyan */
  sparkles: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="50%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <radialGradient id={`${id}-b`} cx="40%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#CCFBF1" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#2DD4BF" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-c`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5B85C" />
          <stop offset="100%" stopColor="#C8963E" />
        </linearGradient>
      </defs>
      {/* Large 4-point star */}
      <path
        d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9Z"
        fill={`url(#${id}-a)`}
      />
      <path
        d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9Z"
        fill={`url(#${id}-b)`}
      />
      {/* Small accent star top-right */}
      <path
        d="M18 3 L18.7 5.3 L21 6 L18.7 6.7 L18 9 L17.3 6.7 L15 6 L17.3 5.3Z"
        fill={`url(#${id}-c)`}
        opacity={0.85}
      />
      {/* Small accent star bottom-left */}
      <path
        d="M5 16 L5.5 17.5 L7 18 L5.5 18.5 L5 20 L4.5 18.5 L3 18 L4.5 17.5Z"
        fill={`url(#${id}-c)`}
        opacity={0.7}
      />
      {/* Tiny dot accents */}
      <circle cx="19.5" cy="15" r="0.7" fill="#5EEAD4" opacity={0.6} />
      <circle cx="3.5" cy="6" r="0.5" fill="#5EEAD4" opacity={0.5} />
    </svg>
  ),

  /** 5-pointed star — gold / amber */
  star: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0%" y1="0%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity={0.7} />
          <stop offset="60%" stopColor="#FDE68A" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="100%" x2="50%" y2="40%">
          <stop offset="0%" stopColor="#92400E" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#92400E" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Star base */}
      <path
        d="M12 2l2.9 6.26L22 9.27l-5 5.14L18.18 22 12 18.27 5.82 22 7 14.41l-5-5.14 7.1-1.01Z"
        fill={`url(#${id}-a)`}
      />
      {/* Bottom shadow */}
      <path
        d="M12 2l2.9 6.26L22 9.27l-5 5.14L18.18 22 12 18.27 5.82 22 7 14.41l-5-5.14 7.1-1.01Z"
        fill={`url(#${id}-c)`}
      />
      {/* Highlight sheen */}
      <path
        d="M12 2l2.9 6.26L22 9.27l-5 5.14L18.18 22 12 18.27 5.82 22 7 14.41l-5-5.14 7.1-1.01Z"
        fill={`url(#${id}-b)`}
      />
    </svg>
  ),

  /* ============================================================== */
  /*  TAB BAR ICONS                                                 */
  /* ============================================================== */

  /** Clipboard / checklist — green / teal */
  planner: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#2D8B5E" />
          <stop offset="100%" stopColor="#1B6B4A" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EE7B7" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#1B6B4A" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#2A6B7C" />
          <stop offset="100%" stopColor="#1B5363" />
        </linearGradient>
      </defs>
      {/* Board */}
      <rect x="4" y="4" width="16" height="18" rx="2" fill={`url(#${id}-a)`} />
      <rect x="4" y="4" width="16" height="7" rx="2" fill={`url(#${id}-b)`} />
      {/* Clip */}
      <rect x="8" y="2" width="8" height="4" rx="1.5" fill={`url(#${id}-c)`} />
      <rect x="9" y="2.5" width="6" height="1.5" rx="0.75" fill="#CCFBF1" opacity={0.5} />
      {/* Lines */}
      {[10, 14, 18].map((y) => (
        <React.Fragment key={y}>
          <rect x="7.5" y={y} width="1.5" height="1.5" rx="0.3" fill="#A7F3D0" opacity={0.8} />
          <rect x="11" y={y + 0.25} width="6" height="1" rx="0.5" fill="#D1FAE5" opacity={0.55} />
        </React.Fragment>
      ))}
    </svg>
  ),

  /** Checkmark in circle — green */
  habits: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#2D8B5E" />
          <stop offset="100%" stopColor="#1B6B4A" />
        </linearGradient>
        <radialGradient id={`${id}-b`} cx="35%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#A7F3D0" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#34D399" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="100%" x2="50%" y2="30%">
          <stop offset="0%" stopColor="#064E3B" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#064E3B" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Circle */}
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-a)`} />
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-c)`} />
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-b)`} />
      {/* Checkmark */}
      <path
        d="M7.5 12.5 L10.5 15.5 L16.5 9"
        fill="none"
        stroke="#ECFDF5"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  /** Bar chart — green / emerald */
  chart: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#1B6B4A" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#2D8B5E" />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A7F3D0" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#1B6B4A" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Bars — tallest to shortest for visual interest */}
      {[
        { x: 3, h: 14 },
        { x: 8, h: 10 },
        { x: 13, h: 16 },
        { x: 18, h: 8 },
      ].map(({ x, h }, i) => (
        <React.Fragment key={i}>
          <rect x={x} y={22 - h} width="3.5" height={h} rx="1" fill={`url(#${id}-${i % 2 === 0 ? 'a' : 'b'})`} />
          <rect x={x} y={22 - h} width="3.5" height={h * 0.4} rx="1" fill={`url(#${id}-c)`} />
        </React.Fragment>
      ))}
      {/* Base line */}
      <rect x="2" y="21" width="20" height="1.2" rx="0.6" fill="#064E3B" opacity={0.3} />
    </svg>
  ),

  /* ============================================================== */
  /*  UI ICONS                                                      */
  /* ============================================================== */

  /** 5-pointed star (smaller inline) — gold */
  reward: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#E5B85C" />
          <stop offset="100%" stopColor="#C8963E" />
        </linearGradient>
        <radialGradient id={`${id}-b`} cx="40%" cy="30%" r="45%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="100%" x2="50%" y2="40%">
          <stop offset="0%" stopColor="#92400E" stopOpacity={0.45} />
          <stop offset="100%" stopColor="#92400E" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        d="M12 3l2.5 5.5L21 9.5l-4.5 4.6L17.6 21 12 17.7 6.4 21l1.1-6.9L3 9.5l6.5-1Z"
        fill={`url(#${id}-a)`}
      />
      <path
        d="M12 3l2.5 5.5L21 9.5l-4.5 4.6L17.6 21 12 17.7 6.4 21l1.1-6.9L3 9.5l6.5-1Z"
        fill={`url(#${id}-c)`}
      />
      <path
        d="M12 3l2.5 5.5L21 9.5l-4.5 4.6L17.6 21 12 17.7 6.4 21l1.1-6.9L3 9.5l6.5-1Z"
        fill={`url(#${id}-b)`}
      />
    </svg>
  ),

  /** Circle with "i" — green / teal */
  info: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="50%" stopColor="#2A6B7C" />
          <stop offset="100%" stopColor="#1B5363" />
        </linearGradient>
        <radialGradient id={`${id}-b`} cx="35%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#99F6E4" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#2DD4BF" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="100%" x2="50%" y2="30%">
          <stop offset="0%" stopColor="#0F3D4A" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#0F3D4A" stopOpacity={0} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-a)`} />
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-c)`} />
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-b)`} />
      {/* Dot */}
      <circle cx="12" cy="7.5" r="1.3" fill="#ECFDF5" />
      {/* Stem */}
      <rect x="10.8" y="10.5" width="2.4" height="7" rx="1.2" fill="#ECFDF5" />
    </svg>
  ),

  /** Checkmark in circle (like habits, reusable at any size) — green */
  checkCircle: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#2D8B5E" />
          <stop offset="100%" stopColor="#1B6B4A" />
        </linearGradient>
        <radialGradient id={`${id}-b`} cx="35%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#A7F3D0" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#34D399" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="100%" x2="50%" y2="30%">
          <stop offset="0%" stopColor="#064E3B" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#064E3B" stopOpacity={0} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-a)`} />
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-c)`} />
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-b)`} />
      <path
        d="M7.5 12.5 L10.5 15.5 L16.5 9"
        fill="none"
        stroke="#ECFDF5"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  /** Triangle with "!" — amber / orange */
  warning: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0%" y1="0%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity={0.6} />
          <stop offset="50%" stopColor="#FDE68A" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="100%" x2="50%" y2="30%">
          <stop offset="0%" stopColor="#92400E" stopOpacity={0.45} />
          <stop offset="100%" stopColor="#92400E" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Triangle */}
      <path d="M12 2.5 L22 20.5 H2Z" fill={`url(#${id}-a)`} />
      <path d="M12 2.5 L22 20.5 H2Z" fill={`url(#${id}-c)`} />
      <path d="M12 2.5 L22 20.5 H2Z" fill={`url(#${id}-b)`} />
      {/* Exclamation stem */}
      <rect x="10.8" y="8" width="2.4" height="6.5" rx="1.2" fill="#451A03" opacity={0.85} />
      {/* Exclamation dot */}
      <circle cx="12" cy="17.5" r="1.3" fill="#451A03" opacity={0.85} />
    </svg>
  ),

  /** X mark — neutral warm gray */
  close: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#D6D3D1" />
          <stop offset="50%" stopColor="#A8A29E" />
          <stop offset="100%" stopColor="#78716C" />
        </linearGradient>
        <radialGradient id={`${id}-b`} cx="35%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#F5F5F4" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#D6D3D1" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="100%" x2="50%" y2="30%">
          <stop offset="0%" stopColor="#44403C" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#44403C" stopOpacity={0} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-a)`} />
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-c)`} />
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-b)`} />
      <path
        d="M8 8 L16 16 M16 8 L8 16"
        fill="none"
        stroke="#FAFAF9"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  ),

  /** Downward chevron — neutral warm */
  chevron: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#D6D3D1" />
          <stop offset="50%" stopColor="#A8A29E" />
          <stop offset="100%" stopColor="#78716C" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F5F5F4" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#A8A29E" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        d="M4 8 L12 16 L20 8"
        fill="none"
        stroke={`url(#${id}-a)`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8 L12 16 L20 8"
        fill="none"
        stroke={`url(#${id}-b)`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  /** Decorative mosque — larger / more detailed for FridayBadge — gold / amber */
  mosqueBanner: (id) => (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={`${id}-a`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="40%" stopColor="#E5B85C" />
          <stop offset="100%" stopColor="#C8963E" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#E5B85C" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <radialGradient id={`${id}-d`} cx="50%" cy="35%" r="40%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#E5B85C" stopOpacity={0} />
        </radialGradient>
      </defs>
      {/* Left outer minaret */}
      <rect x="1" y="11" width="2" height="11" rx="0.5" fill={`url(#${id}-c)`} />
      <rect x="1" y="11" width="2" height="4" rx="0.5" fill={`url(#${id}-b)`} />
      <path d="M1.2 11 Q2 8.5 2.8 11Z" fill={`url(#${id}-a)`} />
      {/* Left inner minaret */}
      <rect x="4" y="9" width="2.5" height="13" rx="0.5" fill={`url(#${id}-a)`} />
      <rect x="4" y="9" width="2.5" height="5" rx="0.5" fill={`url(#${id}-b)`} />
      <circle cx="5.25" cy="7.8" r="1.2" fill={`url(#${id}-a)`} />
      <circle cx="5.25" cy="7.8" r="1.2" fill={`url(#${id}-d)`} />
      {/* Main body */}
      <rect x="7" y="11" width="10" height="11" rx="1" fill={`url(#${id}-a)`} />
      <rect x="7" y="11" width="10" height="4" rx="1" fill={`url(#${id}-b)`} />
      {/* Central dome */}
      <path d="M7.5 11 Q12 2 16.5 11Z" fill={`url(#${id}-a)`} />
      <path d="M8.5 11 Q12 4 13 8.5 L8.5 11Z" fill={`url(#${id}-b)`} />
      {/* Dome glow */}
      <path d="M7.5 11 Q12 2 16.5 11Z" fill={`url(#${id}-d)`} />
      {/* Crescent finial */}
      <path d="M12 2.2 a1 1 0 1 0 0.5-0.8 a0.65 0.65 0 0 1-0.5 0.8Z" fill="#FEF3C7" />
      {/* Right inner minaret */}
      <rect x="17.5" y="9" width="2.5" height="13" rx="0.5" fill={`url(#${id}-a)`} />
      <rect x="17.5" y="9" width="2.5" height="5" rx="0.5" fill={`url(#${id}-b)`} />
      <circle cx="18.75" cy="7.8" r="1.2" fill={`url(#${id}-a)`} />
      <circle cx="18.75" cy="7.8" r="1.2" fill={`url(#${id}-d)`} />
      {/* Right outer minaret */}
      <rect x="21" y="11" width="2" height="11" rx="0.5" fill={`url(#${id}-c)`} />
      <rect x="21" y="11" width="2" height="4" rx="0.5" fill={`url(#${id}-b)`} />
      <path d="M21.2 11 Q22 8.5 22.8 11Z" fill={`url(#${id}-a)`} />
      {/* Door arch */}
      <path d="M10.5 22 v-3.5 a1.5 1.5 0 0 1 3 0 V22Z" fill={`url(#${id}-c)`} opacity={0.65} />
      {/* Window arches */}
      <path d="M8.5 14 a1 1 0 0 1 2 0Z" fill={`url(#${id}-c)`} opacity={0.3} />
      <path d="M13.5 14 a1 1 0 0 1 2 0Z" fill={`url(#${id}-c)`} opacity={0.3} />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
interface Icon3DProps {
  name: string;
  className?: string;
}

let iconCounter = 0;

export function Icon3D({ name, className = 'w-6 h-6' }: Icon3DProps) {
  const uniqueId = useMemo(() => `i3d-${iconCounter++}`, []);
  const renderer = ICON_MAP[name];

  if (!renderer) {
    return <span className={className}>{name}</span>;
  }

  return <span className={`inline-flex ${className}`}>{renderer(uniqueId)}</span>;
}
