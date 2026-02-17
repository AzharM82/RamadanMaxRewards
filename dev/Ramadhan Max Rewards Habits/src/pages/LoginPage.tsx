export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#1B6B4A]/[0.04] blur-3xl" />
        </div>

        <div className="relative max-w-lg mx-auto text-center">
          <p className="text-[#1B6B4A] text-xl mb-4 leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
            بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B6B4A]/10 text-[#1B6B4A] text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B6B4A] animate-pulse" />
            Ramadan 1447 H — Starting Feb 18, 2026
          </div>

          <h1 className="text-4xl font-bold text-[#1d1d1f] tracking-tight leading-tight mb-3">
            Ramadan<br /><span className="text-[#1B6B4A]">Max Rewards</span>
          </h1>

          <p className="text-[#1d1d1f]/70 text-base max-w-xs mx-auto mb-8 leading-relaxed">
            Track your daily worship, build consistency, and make every moment of Ramadan count.
          </p>

          {/* Sign-in buttons */}
          <div className="max-w-xs mx-auto space-y-3">
            <a
              href="/.auth/login/google"
              className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-2xl bg-[#1d1d1f] text-white font-medium text-sm shadow-lg shadow-[#1d1d1f]/20 hover:shadow-xl hover:shadow-[#1d1d1f]/25 transition-all active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </a>

            <a
              href="/.auth/login/microsoft"
              className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-2xl bg-[#FFFEFA] border border-[#E8E4DE] text-[#1d1d1f] font-medium text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <svg viewBox="0 0 23 23" className="w-5 h-5" aria-hidden="true">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              Continue with Microsoft
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-lg mx-auto px-8">
        <div className="border-t border-[#E8E4DE]" />
      </div>

      {/* Features Section */}
      <section className="px-4 py-12">
        <div className="max-w-lg mx-auto">
          <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-[#1B6B4A] mb-8">
            Everything you need for Ramadan
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {/* Feature 1: Daily Planner */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#FFFEFA] border border-[#E8E4DE]/60">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-xl">
                📋
              </div>
              <div>
                <h3 className="font-semibold text-[#1d1d1f] text-sm mb-0.5">Daily Planner</h3>
                <p className="text-[#1d1d1f]/60 text-xs leading-relaxed">
                  Deeds organized by time — from Suhoor to bedtime. Each with Hadith sources, rewards, and practical tips.
                </p>
              </div>
            </div>

            {/* Feature 2: Habit Tracker */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#FFFEFA] border border-[#E8E4DE]/60">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-xl">
                ✅
              </div>
              <div>
                <h3 className="font-semibold text-[#1d1d1f] text-sm mb-0.5">20+ Daily Habits</h3>
                <p className="text-[#1d1d1f]/60 text-xs leading-relaxed">
                  Track Fajr on time, Sunnah Rawatib, Sadaqah, Istighfar 100x, Taraweeh, Quran recitation, and more.
                </p>
              </div>
            </div>

            {/* Feature 3: Progress Dashboard */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#FFFEFA] border border-[#E8E4DE]/60">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xl">
                📊
              </div>
              <div>
                <h3 className="font-semibold text-[#1d1d1f] text-sm mb-0.5">30-Day Progress</h3>
                <p className="text-[#1d1d1f]/60 text-xs leading-relaxed">
                  Visual heatmap, streaks, and stats to see your consistency. Know your strongest habits and where to improve.
                </p>
              </div>
            </div>

            {/* Feature 4: Special Nights */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#FFFEFA] border border-[#E8E4DE]/60">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-xl">
                🌙
              </div>
              <div>
                <h3 className="font-semibold text-[#1d1d1f] text-sm mb-0.5">Friday & Last 10 Nights</h3>
                <p className="text-[#1d1d1f]/60 text-xs leading-relaxed">
                  Special sections unlock for Jumu'ah Sunnah and the blessed last 10 nights of Ramadan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hadith Section */}
      <section className="px-4 pb-12">
        <div className="max-w-lg mx-auto">
          <div className="relative p-6 rounded-2xl bg-[#1B6B4A] text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <p className="text-white/90 text-sm leading-relaxed italic mb-3">
                "Whoever fasts Ramadan out of faith and seeking reward, his previous sins will be forgiven."
              </p>
              <p className="text-white/60 text-xs">
                — Sahih al-Bukhari 38
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 pb-12">
        <div className="max-w-lg mx-auto">
          <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-[#1B6B4A] mb-8">
            How it works
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#1B6B4A] text-white flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h3 className="font-semibold text-[#1d1d1f] text-sm">Sign in with Google or Microsoft</h3>
                <p className="text-[#1d1d1f]/60 text-xs mt-0.5">Your progress syncs across all your devices.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#1B6B4A] text-white flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h3 className="font-semibold text-[#1d1d1f] text-sm">Check off your daily deeds</h3>
                <p className="text-[#1d1d1f]/60 text-xs mt-0.5">Use the planner or habit tracker — whichever suits your flow.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#1B6B4A] text-white flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h3 className="font-semibold text-[#1d1d1f] text-sm">Watch your consistency grow</h3>
                <p className="text-[#1d1d1f]/60 text-xs mt-0.5">The 30-day heatmap and stats keep you motivated all month.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-xs mx-auto text-center">
          <p className="text-[#1d1d1f]/70 text-sm mb-4">Ready to begin?</p>
          <a
            href="/.auth/login/google"
            className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-2xl bg-[#1B6B4A] text-white font-medium text-sm shadow-lg shadow-[#1B6B4A]/20 hover:shadow-xl hover:shadow-[#1B6B4A]/25 transition-all active:scale-[0.98] mb-3"
          >
            Get Started
          </a>
          <p className="text-[#1d1d1f]/40 text-xs">
            Free to use — no ads, no tracking
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 pb-8">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-[#1d1d1f]/30 text-xs" style={{ fontFamily: 'Amiri, serif' }}>
            رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ
          </p>
          <p className="text-[#1d1d1f]/30 text-[10px] mt-1">
            Our Lord, accept from us. Indeed You are the All-Hearing, the All-Knowing.
          </p>
        </div>
      </footer>
    </div>
  );
}
