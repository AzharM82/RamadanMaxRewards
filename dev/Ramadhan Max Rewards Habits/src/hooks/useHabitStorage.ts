import { useState, useEffect, useCallback, useRef } from 'react';
import type { AllProgress, DayProgress, QuranProgress } from '../types';
import { fetchProgress, saveAllProgress } from '../services/api';

const HABITS_STORAGE_KEY = 'ramadan-habits-2025';
const QURAN_STORAGE_KEY = 'ramadan-quran-2025';

// ---- localStorage helpers ----

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw) as T;
    }
  } catch {
    // Corrupted or unavailable — fall back silently
  }
  return fallback;
}

function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

// ---- Convert API progress (string keys) to app types (number keys) ----

function parseHabits(raw: Record<string, Record<string, boolean>>): AllProgress {
  const result: AllProgress = {};
  for (const [dayStr, habits] of Object.entries(raw)) {
    result[Number(dayStr)] = habits;
  }
  return result;
}

function parseQuran(raw: Record<string, number>): QuranProgress {
  const result: QuranProgress = {};
  for (const [dayStr, juz] of Object.entries(raw)) {
    result[Number(dayStr)] = juz;
  }
  return result;
}

// ---- Hook ----

export function useHabitStorage() {
  // State — lazy initialisers read from localStorage (fast first render)
  const [progress, setProgress] = useState<AllProgress>(
    () => loadFromStorage<AllProgress>(HABITS_STORAGE_KEY, {}),
  );

  const [quranProgress, setQuranProgress] = useState<QuranProgress>(
    () => loadFromStorage<QuranProgress>(QURAN_STORAGE_KEY, {}),
  );

  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaveError, setLastSaveError] = useState('');

  const hasFetchedRef = useRef(false);
  // Track the "clean" snapshot from the last save/load to detect changes
  const cleanSnapshotRef = useRef<string>('');

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(HABITS_STORAGE_KEY, progress);
  }, [progress]);

  useEffect(() => {
    saveToStorage(QURAN_STORAGE_KEY, quranProgress);
  }, [quranProgress]);

  // Track dirty state by comparing against the clean snapshot
  useEffect(() => {
    const current = JSON.stringify({ h: progress, q: quranProgress });
    if (cleanSnapshotRef.current && current !== cleanSnapshotRef.current) {
      setIsDirty(true);
    }
  }, [progress, quranProgress]);

  // On mount: fetch from API (API is source of truth)
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    async function syncFromServer() {
      try {
        const data = await fetchProgress();
        const apiHabits = parseHabits(data.habits);
        const apiQuran = parseQuran(data.quran);

        // Only overwrite if API has data
        if (Object.keys(apiHabits).length > 0) {
          setProgress(apiHabits);
        }
        if (Object.keys(apiQuran).length > 0) {
          setQuranProgress(apiQuran);
        }

        // Set clean snapshot after loading from server
        cleanSnapshotRef.current = JSON.stringify({
          h: Object.keys(apiHabits).length > 0 ? apiHabits : loadFromStorage<AllProgress>(HABITS_STORAGE_KEY, {}),
          q: Object.keys(apiQuran).length > 0 ? apiQuran : loadFromStorage<QuranProgress>(QURAN_STORAGE_KEY, {}),
        });
      } catch {
        // Offline or API error — local data is still valid
        cleanSnapshotRef.current = JSON.stringify({
          h: loadFromStorage<AllProgress>(HABITS_STORAGE_KEY, {}),
          q: loadFromStorage<QuranProgress>(QURAN_STORAGE_KEY, {}),
        });
      }
    }

    syncFromServer();
  }, []);

  // ---- Save to cloud (single API call) ----

  const saveToCloud = useCallback(async (): Promise<void> => {
    setSaving(true);
    setLastSaveError('');
    try {
      // Convert number keys to string keys for the API
      const habitsPayload: Record<string, Record<string, boolean>> = {};
      for (const [day, habits] of Object.entries(progress)) {
        habitsPayload[String(day)] = habits;
      }
      const quranPayload: Record<string, number> = {};
      for (const [day, juz] of Object.entries(quranProgress)) {
        quranPayload[String(day)] = juz;
      }

      await saveAllProgress(habitsPayload, quranPayload);

      // Update clean snapshot
      cleanSnapshotRef.current = JSON.stringify({ h: progress, q: quranProgress });
      setIsDirty(false);
    } catch (err) {
      setLastSaveError(err instanceof Error ? err.message : 'Failed to save');
      throw err;
    } finally {
      setSaving(false);
    }
  }, [progress, quranProgress]);

  // ---- Habit helpers ----

  const toggleHabit = useCallback((day: number, habitId: string): void => {
    setProgress((prev) => {
      const dayProgress: DayProgress = prev[day] ?? {};
      return {
        ...prev,
        [day]: {
          ...dayProgress,
          [habitId]: !dayProgress[habitId],
        },
      };
    });
  }, []);

  const isHabitDone = useCallback(
    (day: number, habitId: string): boolean => {
      return progress[day]?.[habitId] === true;
    },
    [progress],
  );

  const getDayProgress = useCallback(
    (day: number): DayProgress => {
      return progress[day] ?? {};
    },
    [progress],
  );

  const getDayCompletionPercent = useCallback(
    (day: number, totalHabits: number): number => {
      if (totalHabits <= 0) return 0;
      const dayData = progress[day] ?? {};
      const completed = Object.values(dayData).filter(Boolean).length;
      return Math.min(100, Math.round((completed / totalHabits) * 100));
    },
    [progress],
  );

  const getStreakCount = useCallback(
    (habitId: string, upToDay: number): number => {
      let streak = 0;
      for (let d = upToDay; d >= 1; d--) {
        if (progress[d]?.[habitId] === true) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    },
    [progress],
  );

  // ---- Quran juz helpers ----

  const setQuranJuz = useCallback((day: number, juz: number): void => {
    setQuranProgress((prev) => ({
      ...prev,
      [day]: juz,
    }));
  }, []);

  const getQuranJuz = useCallback(
    (day: number): number => {
      return quranProgress[day] ?? 0;
    },
    [quranProgress],
  );

  // Public API
  return {
    progress,
    quranProgress,
    toggleHabit,
    isHabitDone,
    getDayProgress,
    getDayCompletionPercent,
    getStreakCount,
    setQuranJuz,
    getQuranJuz,
    // New: cloud save
    isDirty,
    saving,
    lastSaveError,
    saveToCloud,
  };
}
