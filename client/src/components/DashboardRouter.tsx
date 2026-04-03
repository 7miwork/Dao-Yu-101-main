import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { authService, User } from "@/lib/auth-service";
import StudentDashboard from "@/pages/StudentDashboard";
import ProfessionalDashboard from "@/pages/ProfessionalDashboard";

export default function DashboardRouter() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      setLocation("/login");
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Route to gamified student interface
  if (user.role === "student") {
    return <StudentDashboard />;
  }

  // Route to professional dashboard for all other roles
  return <ProfessionalDashboard user={user} />;
}
