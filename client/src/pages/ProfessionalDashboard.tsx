import { useState } from "react";
import { useLocation } from "wouter";
import { LogOut, Menu, X, BarChart3, Users, Settings, Bell, TrendingUp, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
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

const performanceData = [
  { name: "Excellent", value: 45, color: "#10b981" },
  { name: "Good", value: 30, color: "#3b82f6" },
  { name: "Average", value: 15, color: "#f59e0b" },
  { name: "Needs Help", value: 10, color: "#ef4444" },
];

export default function ProfessionalDashboard({ user }: { user: User }) {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n();

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      teacher: "Teacher Dashboard",
      parent: "Parent Portal",
      admin: "Admin Console",
      school: "School Management",
    };
    return roleLabels[role] || "Dashboard";
  };

  const getMenuItems = (role: string) => {
    const baseItems = [
      { icon: "📊", label: "Overview", active: true },
      { icon: "👥", label: "Users", active: false },
      { icon: "📈", label: "Analytics", active: false },
      { icon: "⚙️", label: "Settings", active: false },
    ];
    return baseItems;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
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
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#3b82f6" }}
            >
              📚
            </div>
            <span className="text-xl font-bold text-gray-900">Dao-Yu-101</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mb-8">
            {getMenuItems(user.role).map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-gray-700 hover:bg-gray-50"
                style={{
                  backgroundColor: item.active ? "#f3f4f6" : "transparent",
                  borderLeft: item.active ? "3px solid #3b82f6" : "3px solid transparent",
                }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition"
              style={{
                backgroundColor: "#fee2e2",
                color: "#dc2626",
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
        {/* Top Navigation */}
        <nav
          className="sticky top-0 z-40 border-b"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#e5e7eb",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-700 hover:text-gray-900"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{getRoleLabel(user.role)}</h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.firstName}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-6 md:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Students", value: "2,450", icon: "👥", color: "#3b82f6" },
              { label: "Active Courses", value: "12", icon: "📚", color: "#10b981" },
              { label: "Avg. Performance", value: "78%", icon: "📈", color: "#f59e0b" },
              { label: "Completion Rate", value: "85%", icon: "✓", color: "#8b5cf6" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 border transition hover:shadow-lg"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e5e7eb",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    +12%
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Weekly Activity */}
            <div
              className="lg:col-span-2 rounded-xl p-6 border"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#e5e7eb",
              }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Distribution */}
            <div
              className="rounded-xl p-6 border"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#e5e7eb",
              }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {performanceData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#e5e7eb",
            }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: "New assignment created", time: "2 hours ago", icon: "📝" },
                { action: "Student completed quiz", time: "4 hours ago", icon: "✓" },
                { action: "Course updated", time: "1 day ago", icon: "📚" },
                { action: "New student enrolled", time: "2 days ago", icon: "👤" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{activity.icon}</span>
                    <div>
                      <p className="text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
