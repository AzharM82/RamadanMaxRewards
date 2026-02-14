export interface Source {
  text: string;
  reference: string;
}

export interface Deed {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  sources: Source[];
  reward: string;
  tip: string;
  transliteration?: string;
  translation?: string;
}

export interface DaySection {
  id: string;
  title: string;
  titleAr: string;
  timeWindow: string;
  icon: string;
  deeds: Deed[];
}

export interface HabitDefinition {
  id: string;
  label: string;
  category: 'daily' | 'friday' | 'lastTen';
  target?: string;
}

export interface DayProgress {
  [habitId: string]: boolean;
}

export interface AllProgress {
  [day: number]: DayProgress;
}

export interface QuranProgress {
  [day: number]: number; // juz number
}
