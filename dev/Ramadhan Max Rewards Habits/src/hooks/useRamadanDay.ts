import { useMemo } from 'react';

/**
 * Ramadan 2026 / 1447 H
 *
 * Ramadan 1 is estimated to be **February 18, 2026** (may vary by moon
 * sighting in your locality). The month has 29 or 30 days; we assume 30
 * for planning purposes.
 */
const RAMADAN_START = new Date(2026, 1, 18); // Month is 0-indexed → 1 = February
const RAMADAN_LENGTH = 30;

export function useRamadanDay() {
  return useMemo(() => {
    const now = new Date();

    // Strip time component so the diff is in whole calendar days
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startMidnight = new Date(
      RAMADAN_START.getFullYear(),
      RAMADAN_START.getMonth(),
      RAMADAN_START.getDate(),
    );

    const diffMs = todayMidnight.getTime() - startMidnight.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // currentDay is 1-based (Ramadan 1 = day 1)
    const currentDay = diffDays + 1;
    const isRamadan = currentDay >= 1 && currentDay <= RAMADAN_LENGTH;

    const dayOfWeek = now.getDay(); // 0 = Sunday … 5 = Friday
    const isFriday = dayOfWeek === 5;

    const isLastTenNights = currentDay >= 21;
    const isOddNight =
      currentDay === 21 ||
      currentDay === 23 ||
      currentDay === 25 ||
      currentDay === 27 ||
      currentDay === 29;

    return {
      currentDay,
      isRamadan,
      isFriday,
      isLastTenNights,
      isOddNight,
      ramadanStartDate: RAMADAN_START,
    };
  }, []);
}
