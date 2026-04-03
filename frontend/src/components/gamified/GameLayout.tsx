'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usei18n } from '@/contexts/i18nContext';
import Link from 'next/link';

interface GameLayoutProps {
  children: ReactNode;
  xp?: number;
  level?: number;
  streak?: number;
}

export default function GameLayout({ children, xp = 0, level = 1, streak = 0 }: GameLayoutProps) {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = usei18n();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/archipelago" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {t('common.appName')}
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-lg border border-purple-400/30">
              <span className="text-yellow-400 font-bold text-lg">⭐</span>
              <div>
                <p className="text-xs text-purple-300">{t('gamification.xp')}</p>
                <p className="text-lg font-bold text-white">{xp}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-lg border border-blue-400/30">
              <span className="text-blue-400 font-bold text-lg">📊</span>
              <div>
                <p className="text-xs text-blue-300">{t('gamification.level')}</p>
                <p className="text-lg font-bold text-white">{level}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-lg border border-orange-400/30">
              <span className="text-orange-400 font-bold text-lg">🔥</span>
              <div>
                <p className="text-xs text-orange-300">{t('gamification.streak')}</p>
                <p className="text-lg font-bold text-white">{streak}</p>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'de' | 'zh-TW')}
              className="px-3 py-2 bg-purple-600/30 text-white rounded border border-purple-400/30 text-sm"
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="zh-TW">繁體中文</option>
            </select>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-200 rounded border border-red-400/30 transition"
            >
              {t('common.logout')}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-purple-500/30 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-purple-300 text-sm">
          <p>Welcome, {user?.firstName}! Keep learning and earning rewards! 🚀</p>
        </div>
      </footer>
    </div>
  );
}
