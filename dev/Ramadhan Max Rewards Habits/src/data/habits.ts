import type { HabitDefinition } from '../types';

export const habitDefinitions: HabitDefinition[] = [
  // ─── Daily Habits (20) ────────────────────────────────────────────────
  {
    id: 'fajr-on-time',
    label: 'Fajr on time',
    category: 'daily',
  },
  {
    id: 'suhoor',
    label: 'Suhoor',
    category: 'daily',
  },
  {
    id: 'morning-adhkar',
    label: 'Morning Adhkar',
    category: 'daily',
  },
  {
    id: 'duha-prayer',
    label: 'Duha Prayer',
    category: 'daily',
  },
  {
    id: 'quran-recitation',
    label: 'Quran Recitation',
    category: 'daily',
    target: '1 juz per day',
  },
  {
    id: 'five-daily-prayers',
    label: '5 Daily Prayers',
    category: 'daily',
  },
  {
    id: 'sunnah-rawatib',
    label: 'Sunnah Rawatib',
    category: 'daily',
    target: '12 rak\'ahs',
  },
  {
    id: 'sadaqah',
    label: 'Sadaqah / Charity',
    category: 'daily',
  },
  {
    id: 'dua-before-iftar',
    label: 'Dua before Iftar',
    category: 'daily',
  },
  {
    id: 'taraweeh',
    label: 'Taraweeh',
    category: 'daily',
  },
  {
    id: 'witr',
    label: 'Witr',
    category: 'daily',
  },
  {
    id: 'evening-adhkar',
    label: 'Evening Adhkar',
    category: 'daily',
  },
  {
    id: 'istighfar-100',
    label: 'Istighfar 100x',
    category: 'daily',
    target: '100 times',
  },
  {
    id: 'salawat-100',
    label: 'Salawat 100x',
    category: 'daily',
    target: '100 times',
  },
  {
    id: 'avoid-bad-speech',
    label: 'Avoid bad speech',
    category: 'daily',
  },
  {
    id: 'dua-for-parents',
    label: 'Dua for parents',
    category: 'daily',
  },
  {
    id: 'dua-for-ummah',
    label: 'Dua for the Ummah',
    category: 'daily',
  },
  {
    id: 'fed-helped-someone',
    label: 'Fed / helped someone',
    category: 'daily',
  },
  {
    id: 'learned-something',
    label: 'Learned something new',
    category: 'daily',
  },
  {
    id: 'slept-with-wudu',
    label: 'Slept with wudu',
    category: 'daily',
  },

  // ─── Friday Habits (3) ────────────────────────────────────────────────
  {
    id: 'friday-surah-kahf',
    label: 'Surah al-Kahf',
    category: 'friday',
  },
  {
    id: 'friday-extra-salawat',
    label: 'Extra Salawat 200+',
    category: 'friday',
    target: '200+ times',
  },
  {
    id: 'friday-dua-last-hour',
    label: 'Dua last hour before Maghrib',
    category: 'friday',
  },

  // ─── Last Ten Nights Habits (3) ───────────────────────────────────────
  {
    id: 'last-ten-extra-tahajjud',
    label: 'Extra Tahajjud',
    category: 'lastTen',
  },
  {
    id: 'last-ten-dua-qadr',
    label: 'Dua of Laylat al-Qadr',
    category: 'lastTen',
  },
  {
    id: 'last-ten-increased-charity',
    label: 'Increased charity',
    category: 'lastTen',
  },
];
