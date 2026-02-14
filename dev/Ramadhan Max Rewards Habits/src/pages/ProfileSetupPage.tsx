import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileSetupPage() {
  const { createProfile } = useAuth();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await createProfile(name.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <p className="text-[#1d1d1f]/60 text-lg mb-2" style={{ fontFamily: 'Amiri, serif' }}>
            بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
          </p>
          <h1 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
            Welcome to Ramadan <span className="text-[#1B6B4A]">Max Rewards</span>
          </h1>
          <p className="text-[#86868b] text-sm mt-2">
            What should we call you?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-[#FFFEFA] border border-[#E8E4DE] text-[#1d1d1f] text-sm placeholder:text-[#aeaeb2] focus:outline-none focus:border-[#1B6B4A] focus:ring-1 focus:ring-[#1B6B4A]/20 transition-colors"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1.5">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="w-full px-4 py-3 rounded-xl bg-[#1B6B4A] text-white font-medium text-sm hover:bg-[#155A3E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Setting up...' : 'Get Started'}
          </button>
        </form>

        <p className="text-center text-[#86868b]/60 text-xs mt-8">
          You can change your name later in settings
        </p>
      </div>
    </div>
  );
}
