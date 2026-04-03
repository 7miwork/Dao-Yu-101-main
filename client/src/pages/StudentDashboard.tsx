import { useState } from 'react';
import { useLocation } from 'wouter';
import { LogOut, Menu, X, Home, Map, Trophy, Users } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { authService } from '@/lib/auth-service';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface IslandData {
  id: number;
  name: string;
  emoji: string;
  level: number;
  completed: boolean;
  progress: number;
  x: number;
  y: number;
}

const islands: IslandData[] = [
  { id: 1, name: 'Mathematics Kingdom', emoji: '🏝️', level: 1, completed: true, progress: 85, x: 20, y: 30 },
  { id: 2, name: 'English Literature', emoji: '📚', level: 2, completed: true, progress: 60, x: 60, y: 25 },
  { id: 3, name: 'Science Lab', emoji: '🔬', level: 3, completed: false, progress: 40, x: 40, y: 70 },
  { id: 4, name: 'History Voyage', emoji: '⚓', level: 4, completed: false, progress: 20, x: 75, y: 60 },
  { id: 5, name: 'Art Studio', emoji: '🎨', level: 5, completed: false, progress: 0, x: 85, y: 35 },
];

export default function StudentDashboard() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n();
  const user = authService.getCurrentUser();
  const [coins] = useState(145);
  const [level] = useState(3);
  const [xp] = useState(720);
  const [maxXp] = useState(1000);
  const [streak] = useState(12);

  const handleLogout = () => {
    authService.logout();
    setLocation('/');
  };

  const handleNavigateToArchipelago = () => {
    setLocation('/archipelago');
  };

  const xpPercentage = (xp / maxXp) * 100;

  return (
    <div className="minecraft-bg min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 z-50 transform transition-transform md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#1a1a2e', borderRight: '3px solid #ffeb3b' }}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">            <span className="text-xl">⛏️</span>
            <span className="text-xl font-bold text-white" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
              DAO-YU-101
            </span>
          </div>

          <nav className="space-y-2">
            {[
              { icon: '🏠', label: 'Home', href: '/dashboard' },
              { icon: '🗺️', label: 'Archipelago', href: '/archipelago' },
              { icon: '🏆', label: 'Achievements', href: '#' },
              { icon: '👥', label: 'Friends', href: '#' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.href !== '#' && setLocation(item.href)}
                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition"
                style={{ borderLeft: '3px solid transparent' }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-bold">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-white font-bold flex items-center gap-2"
              style={{
                backgroundColor: '#f44336',
                border: '2px solid #ffeb3b',
                boxShadow: '0 4px 0 rgba(0, 0, 0, 0.3)',
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64">
        {/* Top Navigation Bar */}
        <nav className="border-b-4 sticky top-0 z-40" style={{ borderColor: '#ffeb3b', backgroundColor: '#1a1a2e' }}>
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            {/* Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-white text-2xl"
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>

            {/* Center Stats */}
            <div className="flex items-center gap-4 md:gap-6 flex-1 md:flex-none justify-center md:justify-start md:ml-4">
              {/* Coins */}
              <div className="coins-display">
                <span className="coins-icon">🪙</span>
                <span>{coins}</span>
              </div>

              {/* Level */}
              <div className="level-badge">
                <span>{level}</span>
              </div>

              {/* XP Bar */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="xp-progress" style={{ width: '120px' }}>
                  <div
                    className="xp-progress-fill"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-white">{xp}/{maxXp}</span>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-1 px-3 py-1" style={{ backgroundColor: '#ff9800', border: '2px solid #ffeb3b' }}>
                <span className="text-lg">🔥</span>
                <span className="font-bold text-white text-sm">{streak}</span>
              </div>
            </div>

            {/* Right Profile */}
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm md:text-base">🎒 {user?.name || 'Student'}</span>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="minecraft-card mb-8 p-8" style={{ borderColor: '#ffeb3b' }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffeb3b', textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
              🏝️ Welcome to Archipelago
            </h1>
            <p className="text-lg text-white mb-6">
              Your learning journey starts here. Explore islands, complete lessons, and unlock new worlds!
            </p>

            <button
              onClick={handleNavigateToArchipelago}
              className="px-6 py-3 text-lg font-bold"
              style={{
                backgroundColor: '#4caf50',
                border: '3px solid #ffeb3b',
                boxShadow: '0 6px 0 rgba(0, 0, 0, 0.3)',
              }}
            >
              🗺️ EXPLORE ARCHIPELAGO
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Lessons Completed */}
            <div className="minecraft-card p-6" style={{ borderColor: '#4caf50' }}>
              <div className="text-3xl mb-2">📚</div>
              <h3 className="text-xl font-bold text-white mb-2">Lessons Completed</h3>
              <div className="text-4xl font-bold" style={{ color: '#4caf50' }}>42</div>
              <p className="text-sm text-gray-400 mt-2">of 150 total lessons</p>
            </div>

            {/* Islands Unlocked */}
            <div className="minecraft-card p-6" style={{ borderColor: '#2196f3' }}>
              <div className="text-3xl mb-2">🏝️</div>
              <h3 className="text-xl font-bold text-white mb-2">Islands Unlocked</h3>
              <div className="text-4xl font-bold" style={{ color: '#2196f3' }}>3</div>
              <p className="text-sm text-gray-400 mt-2">of 10 islands</p>
            </div>

            {/* Achievements */}
            <div className="minecraft-card p-6" style={{ borderColor: '#ffeb3b' }}>
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-xl font-bold text-white mb-2">Achievements</h3>
              <div className="text-4xl font-bold" style={{ color: '#ffeb3b' }}>8</div>
              <p className="text-sm text-gray-400 mt-2">badges earned</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="minecraft-card p-6 mb-8" style={{ borderColor: '#ffeb3b' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#ffeb3b' }}>📊 Recent Activity</h2>

            <div className="space-y-3">
              <div className="lesson-item">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">✓ Introduction to Variables</span>
                  <span className="xp-badge">+50 XP</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Completed 2 hours ago</p>
              </div>

              <div className="lesson-item">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">✓ Loops & Iteration</span>
                  <span className="xp-badge">+75 XP</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Completed 1 day ago</p>
              </div>

              <div className="lesson-item">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">✓ Functions Basics</span>
                  <span className="xp-badge">+60 XP</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Completed 2 days ago</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={handleNavigateToArchipelago}
              className="minecraft-card p-6 text-left hover:scale-105 transition-transform cursor-pointer"
              style={{ borderColor: '#4caf50' }}
            >
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="text-xl font-bold text-white mb-2">Continue Learning</h3>
              <p className="text-gray-400">Resume your adventure on the archipelago</p>
            </button>

            <button
              onClick={() => setLocation('/leaderboard')}
              className="minecraft-card p-6 text-left hover:scale-105 transition-transform cursor-pointer"
              style={{ borderColor: '#ffeb3b' }}
            >
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">View Leaderboard</h3>
              <p className="text-gray-400">See where you rank among students</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
