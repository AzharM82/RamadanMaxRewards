import { useState, useMemo, useCallback } from 'react';
import { useHabitStorage } from './hooks/useHabitStorage';
import { useRamadanDay } from './hooks/useRamadanDay';
import { suhoorSection } from './data/suhoor';
import { morningSection } from './data/morning';
import { afternoonSection } from './data/afternoon';
import { iftarSection } from './data/iftar';
import { nightSection } from './data/night';
import { fridayDeeds } from './data/friday';
import { lastTenDeeds } from './data/lastTenNights';
import { generalDeeds } from './data/general';
import { habitDefinitions } from './data/habits';
import DaySelector from './components/DaySelector';
import SectionPanel from './components/SectionPanel';
import HabitTracker from './components/HabitTracker';
import ProgressDashboard from './components/ProgressDashboard';
import FridayBadge from './components/FridayBadge';
import LastTenNightsBanner from './components/LastTenNightsBanner';
import DeedDetailSheet from './components/DeedDetailSheet';
import { Icon3D } from './components/Icon3D';
import type { DaySection, Deed } from './types';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import AdminPage from './pages/AdminPage';

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------
type TabId = 'planner' | 'habits' | 'progress';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: 'planner', label: 'Daily Planner', icon: 'planner' },
  { id: 'habits', label: 'Habit Tracker', icon: 'habits' },
  { id: 'progress', label: 'Progress', icon: 'chart' },
];

// ---------------------------------------------------------------------------
// Wrap Deed[] arrays into DaySection objects for uniform rendering
// ---------------------------------------------------------------------------
const fridaySection: DaySection = {
  id: 'friday',
  title: 'Friday Specials',
  titleAr: 'يوم الجمعة',
  timeWindow: 'Throughout Friday',
  icon: '🕌',
  deeds: fridayDeeds,
};

const lastTenSection: DaySection = {
  id: 'lastTen',
  title: 'Last 10 Nights',
  titleAr: 'العشر الأواخر',
  timeWindow: 'Days 21–30 of Ramadan',
  icon: '⭐',
  deeds: lastTenDeeds,
};

const generalSection: DaySection = {
  id: 'general',
  title: 'General Ramadan Deeds',
  titleAr: 'أعمال رمضان العامة',
  timeWindow: 'Every day of Ramadan',
  icon: '🌙',
  deeds: generalDeeds,
};

// ---------------------------------------------------------------------------
// Section accent class mapping
// ---------------------------------------------------------------------------
const SECTION_ACCENT: Record<string, { className: string; color: string }> = {
  suhoor:    { className: 'section-suhoor',    color: '#3D3B8E' },
  morning:   { className: 'section-morning',   color: '#D4943A' },
  afternoon: { className: 'section-afternoon', color: '#5A8F6E' },
  iftar:     { className: 'section-iftar',     color: '#C86F3C' },
  night:     { className: 'section-night',     color: '#2A6B7C' },
  friday:    { className: 'section-morning',   color: '#D4943A' },
  lastTen:   { className: 'section-night',     color: '#2A6B7C' },
  general:   { className: 'section-afternoon', color: '#5A8F6E' },
};

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
function App() {
  const { loading, isAuthenticated, isAdmin, needsProfile, profile, logout } = useAuth();

  const {
    currentDay,
    ramadanStartDate,
  } = useRamadanDay();

  const {
    progress,
    toggleHabit,
    getDayProgress,
    getDayCompletionPercent,
    isDirty,
    saving,
    lastSaveError,
    saveToCloud,
  } = useHabitStorage();

  const [showAdmin, setShowAdmin] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<TabId>('planner');
  const [detailDeed, setDetailDeed] = useState<Deed | null>(null);

  // Derive context flags for the *selected* day
  const selectedIsFriday = useMemo(() => {
    const dayDate = new Date(ramadanStartDate);
    dayDate.setDate(dayDate.getDate() + (selectedDay - 1));
    return dayDate.getDay() === 5;
  }, [selectedDay, ramadanStartDate]);

  const selectedIsLastTen = selectedDay >= 21;

  // Compute Gregorian date for the hero card
  const selectedGregorianDate = useMemo(() => {
    const d = new Date(ramadanStartDate);
    d.setDate(d.getDate() + (selectedDay - 1));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [selectedDay, ramadanStartDate]);

  // -------------------------------------------------------------------------
  // Build the ordered list of sections for the Daily Planner tab
  // -------------------------------------------------------------------------
  const dailySections: Array<{ section: DaySection; accent: { className: string; color: string } }> =
    useMemo(() => {
      const sections: Array<{ section: DaySection; accent: { className: string; color: string } }> = [
        { section: suhoorSection, accent: SECTION_ACCENT.suhoor },
        { section: morningSection, accent: SECTION_ACCENT.morning },
        { section: afternoonSection, accent: SECTION_ACCENT.afternoon },
        { section: iftarSection, accent: SECTION_ACCENT.iftar },
        { section: nightSection, accent: SECTION_ACCENT.night },
      ];

      if (selectedIsFriday) {
        sections.push({ section: fridaySection, accent: SECTION_ACCENT.friday });
      }

      if (selectedIsLastTen) {
        sections.push({ section: lastTenSection, accent: SECTION_ACCENT.lastTen });
      }

      sections.push({ section: generalSection, accent: SECTION_ACCENT.general });

      return sections;
    }, [selectedIsFriday, selectedIsLastTen]);

  // -------------------------------------------------------------------------
  // Filter habits by category for the selected day
  // -------------------------------------------------------------------------
  const filteredHabits = useMemo(() => {
    return habitDefinitions.filter((h) => {
      if (h.category === 'daily') return true;
      if (h.category === 'friday') return selectedIsFriday;
      if (h.category === 'lastTen') return selectedIsLastTen;
      return true;
    });
  }, [selectedIsFriday, selectedIsLastTen]);

  // -------------------------------------------------------------------------
  // Completion percentage for the selected day
  // -------------------------------------------------------------------------
  const dayCompletionPercent = useMemo(() => {
    const totalHabits = filteredHabits.length;
    return getDayCompletionPercent(selectedDay, totalHabits);
  }, [selectedDay, getDayCompletionPercent, filteredHabits.length]);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------
  const handleToggleDeed = useCallback(
    (deedId: string) => {
      toggleHabit(selectedDay, deedId);
    },
    [selectedDay, toggleHabit],
  );

  const handleToggleHabit = useCallback(
    (habitId: string) => {
      toggleHabit(selectedDay, habitId);
    },
    [selectedDay, toggleHabit],
  );

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      await saveToCloud();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch {
      // Error is shown via lastSaveError
    }
  }, [saveToCloud]);

  // -------------------------------------------------------------------------
  // Auth gating — show appropriate screen
  // -------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#1B6B4A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#86868b] text-sm mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (needsProfile) {
    return <ProfileSetupPage />;
  }

  if (showAdmin && isAdmin) {
    return <AdminPage onClose={() => setShowAdmin(false)} />;
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FDFAF5] pb-24">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#FDFAF5]/80 backdrop-blur-xl border-b border-[#E8E4DE]">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1" />
            <div className="text-center flex-1">
              <p className="text-[#1B6B4A] text-base" style={{ fontFamily: 'Amiri, serif' }}>
                بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
              </p>
              <h1 className="text-xl font-semibold text-[#1d1d1f] tracking-tight mt-1">
                Ramadan <span className="font-medium text-[#1B6B4A]">Max Rewards</span>
              </h1>
            </div>
            <div className="flex-1 flex items-center justify-end gap-2">
              {isAdmin && (
                <button
                  onClick={() => setShowAdmin(true)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#E8E4DE] transition-colors cursor-pointer"
                  title="Admin Dashboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#86868b]">
                    <path fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              <span className="text-xs text-[#86868b] truncate max-w-[80px]">
                {profile?.displayName}
              </span>
              <button
                onClick={logout}
                className="text-xs text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
                title="Sign out"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* DAY SELECTOR */}
      <div className="sticky top-[88px] z-30 bg-[#FDFAF5]/80 backdrop-blur-xl border-b border-[#E8E4DE]">
        <div className="max-w-2xl mx-auto px-4 py-2">
          <DaySelector selectedDay={selectedDay} currentDay={currentDay} onSelectDay={setSelectedDay} />
        </div>
      </div>

      {/* DAY HEADER HERO CARD */}
      <div className="max-w-2xl mx-auto px-4 mt-4">
        <div className="rounded-2xl bg-[#FFFEFA] border border-[#E8E4DE] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-[#1d1d1f]">Day {selectedDay}</span>
                {selectedIsFriday && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C8963E]/10 text-[#1d1d1f] text-[10px] font-semibold">Jumu'ah</span>
                )}
                {selectedIsLastTen && (
                  <span className="px-2 py-0.5 rounded-full bg-[#7B5EA7]/10 text-[#7B5EA7] text-[10px] font-semibold">Last 10</span>
                )}
              </div>
              <p className="text-xs text-[#86868b] mt-1">{selectedGregorianDate}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-[#1B6B4A]">{dayCompletionPercent}%</span>
              <p className="text-[10px] text-[#86868b]">completed</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-1.5 bg-[#F3EDE4] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1B6B4A] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${dayCompletionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* TAB CONTENT */}
      <main className="max-w-2xl mx-auto px-4 mt-4">
        {/* TAB 1: DAILY PLANNER */}
        {activeTab === 'planner' && (
          <div className="space-y-4">
            <FridayBadge visible={selectedIsFriday} />
            <LastTenNightsBanner visible={selectedIsLastTen} currentDay={selectedDay} />
            {dailySections.map(({ section, accent }) => {
              const dayData = getDayProgress(selectedDay);
              const completedIds = section.deeds
                .filter((d) => dayData[d.id] === true)
                .map((d) => d.id);
              return (
                <SectionPanel
                  key={section.id}
                  section={section}
                  accentClass={accent.className}
                  accentColor={accent.color}
                  completedDeeds={completedIds}
                  onToggleDeed={handleToggleDeed}
                  onShowDetail={setDetailDeed}
                />
              );
            })}
          </div>
        )}

        {/* TAB 2: HABIT TRACKER */}
        {activeTab === 'habits' && (
          <HabitTracker
            day={selectedDay}
            habits={filteredHabits}
            progress={getDayProgress(selectedDay)}
            onToggle={handleToggleHabit}
            isFriday={selectedIsFriday}
            isLastTenNights={selectedIsLastTen}
          />
        )}

        {/* TAB 3: PROGRESS DASHBOARD */}
        {activeTab === 'progress' && (
          <ProgressDashboard
            currentDay={currentDay}
            progress={progress}
            habits={habitDefinitions}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="max-w-2xl mx-auto px-4 mt-16 pb-8 text-center">
        <div className="border-t border-[#E8E4DE] pt-8">
          <p
            className="text-[#1B6B4A] text-sm mb-2"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
          </p>
          <p className="text-[#86868b] text-xs italic leading-relaxed">
            "Our Lord, accept [this] from us. Indeed, You are the Hearing, the
            Knowing." (2:127)
          </p>
          <p className="text-[#86868b]/50 text-[10px] mt-4 tracking-wide">
            Ramadan Max Rewards · Built with sincerity for the Ummah
          </p>
        </div>
      </footer>

      {/* FLOATING SAVE BUTTON */}
      {isDirty && (
        <div className="fixed bottom-16 left-0 right-0 z-50 flex justify-center px-4 pb-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`
              px-6 py-2.5 rounded-full font-medium text-sm shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer
              ${saveSuccess
                ? 'bg-[#34c759] text-white'
                : lastSaveError
                  ? 'bg-red-500 text-white'
                  : 'bg-[#1B6B4A] text-white hover:bg-[#155A3E]'
              }
              ${saving ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            {saving ? 'Saving...' : saveSuccess ? 'Saved!' : lastSaveError ? 'Retry Save' : 'Save Progress'}
          </button>
        </div>
      )}

      {/* BOTTOM TAB BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FDFAF5]/80 backdrop-blur-xl border-t border-[#E8E4DE]">
        <div className="max-w-2xl mx-auto flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                flex-1 flex flex-col items-center py-2 pt-2.5 cursor-pointer transition-colors duration-200
                ${activeTab === tab.id ? 'text-[#1B6B4A]' : 'text-[#86868b]'}
              `}
            >
              <Icon3D name={tab.icon} className="w-6 h-6" />
              <span className="text-[10px] font-medium mt-0.5">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* DEED DETAIL SHEET */}
      {detailDeed && (
        <DeedDetailSheet
          deed={detailDeed}
          isCompleted={getDayProgress(selectedDay)[detailDeed.id] === true}
          onClose={() => setDetailDeed(null)}
          onToggle={() => {
            handleToggleDeed(detailDeed.id);
          }}
        />
      )}
    </div>
  );
}

export default App;
