import { useState, useEffect } from 'react';
import type { TelemetryData } from '../services/api';
import { fetchTelemetry } from '../services/api';

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

function heatmapColor(pct: number): string {
  if (pct === 0) return 'bg-[#F3EDE4]';
  if (pct <= 25) return 'bg-[#B8DFCA]';
  if (pct <= 50) return 'bg-[#6DBF8B]';
  if (pct <= 75) return 'bg-[#3A9960]';
  return 'bg-[#1B6B4A]';
}

interface AdminPageProps {
  onClose: () => void;
}

export default function AdminPage({ onClose }: AdminPageProps) {
  const [data, setData] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    setError(null);
    fetchTelemetry()
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'Unknown error');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#FDFAF5]/80 backdrop-blur-xl border-b border-[#E8E4DE]">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={loadData}
                disabled={loading}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E8E4DE] transition-colors cursor-pointer"
                title="Refresh"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-4 h-4 text-[#86868b] ${loading ? 'animate-spin' : ''}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M15.312 11.424a5.5 5.5 0 0 1-9.379 2.624l-1.84 1.072A7.5 7.5 0 0 0 17.3 10.75l-1.988.674ZM4.688 8.576a5.5 5.5 0 0 1 9.379-2.624l1.84-1.072A7.5 7.5 0 0 0 2.7 9.25l1.988-.674Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E8E4DE] transition-colors cursor-pointer"
                title="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-[#86868b]"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>
          </div>
          {data && (
            <p className="text-xs text-[#86868b] mt-1">
              Last updated: {timeAgo(data.queriedAt)}
            </p>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-12">
        {/* LOADING STATE */}
        {loading && !data && (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#1B6B4A] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-[#86868b] text-sm mt-3">Loading telemetry...</p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <p className="text-red-600 text-sm mb-3">{error}</p>
              <button
                onClick={loadData}
                className="px-4 py-2 rounded-full bg-[#1B6B4A] text-white text-sm font-medium hover:bg-[#155A3E] transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* DATA */}
        {data && (
          <div className="mt-4 space-y-4">
            {/* KEY METRICS ROW */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#FFFEFA] border border-[#E8E4DE] rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-[#1d1d1f]">{data.totalUsers}</p>
                <p className="text-xs text-[#86868b] mt-1">Total Users</p>
              </div>
              <div className="bg-[#FFFEFA] border border-[#E8E4DE] rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-[#1B6B4A]">{data.usersActiveToday}</p>
                <p className="text-xs text-[#86868b] mt-1">Active Today</p>
              </div>
              <div className="bg-[#FFFEFA] border border-[#E8E4DE] rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-[#1d1d1f]">{data.usersActiveThisWeek}</p>
                <p className="text-xs text-[#86868b] mt-1">Active This Week</p>
              </div>
            </div>

            {/* USERS BY PROVIDER */}
            <div className="bg-[#FFFEFA] border border-[#E8E4DE] rounded-2xl p-4">
              <p className="text-sm font-semibold text-[#1d1d1f] mb-3">Users by Provider</p>
              <div className="flex gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B6B4A]/10 text-[#1B6B4A] text-sm font-medium">
                  Google <span className="font-bold">{data.usersByProvider.google}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563eb]/10 text-[#2563eb] text-sm font-medium">
                  Microsoft <span className="font-bold">{data.usersByProvider.microsoft}</span>
                </span>
                {data.usersByProvider.other > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#86868b]/10 text-[#86868b] text-sm font-medium">
                    Other <span className="font-bold">{data.usersByProvider.other}</span>
                  </span>
                )}
              </div>
            </div>

            {/* 30-DAY ACTIVITY HEATMAP */}
            <div className="bg-[#FFFEFA] border border-[#E8E4DE] rounded-2xl p-4">
              <p className="text-sm font-semibold text-[#1d1d1f] mb-3">30-Day Activity</p>
              <div className="grid grid-cols-10 gap-1.5">
                {data.dailyActivity.map((d) => {
                  const pct = d.avgCompletion;
                  const textColor = pct > 50 ? 'text-white' : 'text-[#1d1d1f]';
                  return (
                    <div
                      key={d.day}
                      className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-medium ${heatmapColor(pct)} ${textColor}`}
                      title={`Day ${d.day}: ${pct}% avg, ${d.activeUsers} active`}
                    >
                      {d.day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ENGAGEMENT ROW */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#FFFEFA] border border-[#E8E4DE] rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-[#1d1d1f]">{data.totalDeedsCompleted}</p>
                <p className="text-xs text-[#86868b] mt-1">Deeds Completed</p>
              </div>
              <div className="bg-[#FFFEFA] border border-[#E8E4DE] rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-[#1B6B4A]">{data.averageCompletionPercent}%</p>
                <p className="text-xs text-[#86868b] mt-1">Avg Completion</p>
              </div>
              <div className="bg-[#FFFEFA] border border-[#E8E4DE] rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-[#1d1d1f]">{data.averageQuranJuz.toFixed(1)}</p>
                <p className="text-xs text-[#86868b] mt-1">Avg Quran Juz</p>
              </div>
            </div>

            {/* RECENT SIGNUPS */}
            <div className="bg-[#FFFEFA] border border-[#E8E4DE] rounded-2xl p-4">
              <p className="text-sm font-semibold text-[#1d1d1f] mb-3">Recent Signups</p>
              {data.recentSignups.length === 0 ? (
                <p className="text-xs text-[#86868b]">No signups yet.</p>
              ) : (
                <ul className="space-y-2">
                  {data.recentSignups.slice(0, 10).map((u, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-[#1d1d1f] font-medium">{u.displayName}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                            u.provider.toLowerCase().includes('google')
                              ? 'bg-[#1B6B4A]/10 text-[#1B6B4A]'
                              : 'bg-[#2563eb]/10 text-[#2563eb]'
                          }`}
                        >
                          {u.provider.toLowerCase().includes('google') ? 'Google' : 'Microsoft'}
                        </span>
                      </div>
                      <span className="text-xs text-[#86868b]">{timeAgo(u.createdAt)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-[#FFFEFA] border border-[#E8E4DE] rounded-2xl p-4">
              <p className="text-sm font-semibold text-[#1d1d1f] mb-3">Recent Activity</p>
              {data.lastActivityTimes.length === 0 ? (
                <p className="text-xs text-[#86868b]">No activity yet.</p>
              ) : (
                <ul className="space-y-2">
                  {data.lastActivityTimes.slice(0, 10).map((u, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <span className="text-[#1d1d1f] font-medium">{u.displayName}</span>
                      <span className="text-xs text-[#86868b]">{timeAgo(u.updatedAt)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
