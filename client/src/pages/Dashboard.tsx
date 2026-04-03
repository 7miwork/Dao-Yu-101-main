import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { BookOpen, Users, TrendingUp, Award, LogOut, Settings, Home, Zap, Target, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { authService, User } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const weeklyData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 200 },
  { name: "Thu", value: 278 },
  { name: "Fri", value: 189 },
  { name: "Sat", value: 239 },
  { name: "Sun", value: 349 },
];

const progressData = [
  { name: "Week 1", progress: 20 },
  { name: "Week 2", progress: 35 },
  { name: "Week 3", progress: 50 },
  { name: "Week 4", progress: 65 },
];

const courseData = [
  { name: "Math", value: 85, color: "#6366f1" },
  { name: "English", value: 60, color: "#06b6d4" },
  { name: "Science", value: 72, color: "#8b5cf6" },
  { name: "History", value: 55, color: "#ec4899" },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      setLocation("/login");
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [setLocation]);

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">{t("dashboard.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dao-Yu</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user.role} Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
              <img src={user.avatar} alt={user.firstName} className="w-10 h-10 rounded-full shadow-md" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user.role}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t("common.logout")}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fadeInUp">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("dashboard.welcome")}, {user.firstName}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("dashboard.subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <Zap className="w-6 h-6" />, label: "XP Earned", value: "2,450", color: "from-amber-500 to-orange-500" },
            { icon: <Target className="w-6 h-6" />, label: "Level", value: "5", color: "from-indigo-500 to-blue-500" },
            { icon: <Calendar className="w-6 h-6" />, label: "Streak", value: "12 Days", color: "from-green-500 to-emerald-500" },
            { icon: <Award className="w-6 h-6" />, label: "Achievements", value: "8", color: "from-purple-500 to-pink-500" },
          ].map((stat, idx) => (
            <div key={idx} className="card-modern p-6 hover:shadow-xl transition-all duration-300 animate-scaleIn" style={{animationDelay: `${idx * 100}ms`}}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Activity */}
          <div className="lg:col-span-2 card-modern p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Activity</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">Last 7 days</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" />
                <YAxis stroke="rgba(0,0,0,0.5)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Course Progress */}
          <div className="card-modern p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Course Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {courseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {courseData.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: course.color}}></div>
                    <span className="text-gray-600 dark:text-gray-400">{course.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{course.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Over Time */}
        <div className="card-modern p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Progress</h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">Monthly view</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" />
              <YAxis stroke="rgba(0,0,0,0.5)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: "#6366f1", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="card-modern p-6 text-left hover:scale-105 transition-transform group">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Continue Learning</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Resume your last course</p>
          </button>

          <button className="card-modern p-6 text-left hover:scale-105 transition-transform group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Achievements</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">View your badges</p>
          </button>

          <button className="card-modern p-6 text-left hover:scale-105 transition-transform group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Leaderboard</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">See top performers</p>
          </button>
        </div>
      </main>
    </div>
  );
}
