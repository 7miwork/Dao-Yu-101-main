// Demo accounts for testing
export const DEMO_ACCOUNTS: Record<string, any> = {
  student: {
    id: "student-001",
    email: "student@demo.com",
    password: "demo1234",
    firstName: "John",
    lastName: "Student",
    role: "student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    xp: 2450,
    level: 5,
    streak: 12,
  },
  teacher: {
    id: "teacher-001",
    email: "teacher@demo.com",
    password: "demo1234",
    firstName: "Sarah",
    lastName: "Teacher",
    role: "teacher",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    classes: 3,
    students: 85,
  },
  parent: {
    id: "parent-001",
    email: "parent@demo.com",
    password: "demo1234",
    firstName: "Michael",
    lastName: "Parent",
    role: "parent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    children: 2,
  },
  admin: {
    id: "admin-001",
    email: "admin@demo.com",
    password: "demo1234",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    totalUsers: 5000,
    totalCourses: 150,
  },
};

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "teacher" | "parent" | "admin";
  avatar: string;
  xp?: number;
  level?: number;
  streak?: number;
  classes?: number;
  students?: number;
  children?: number;
  totalUsers?: number;
  totalCourses?: number;
  [key: string]: any;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Simulated authentication service
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check against demo accounts
    const account = Object.values(DEMO_ACCOUNTS).find(
      (acc) => acc.email === email && acc.password === password
    );

    if (account) {
      const user: User = {
        id: account.id,
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
        role: account.role as "student" | "teacher" | "parent" | "admin",
        avatar: account.avatar,
      };

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_user", JSON.stringify(user));
        localStorage.setItem("auth_token", `token_${account.id}_${Date.now()}`);
      }

      return { success: true, user: { ...user, ...account } };
    }

    return {
      success: false,
      error: "Invalid email or password",
    };
  },

  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ): Promise<AuthResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      firstName,
      lastName,
      role: (role as "student" | "teacher" | "parent" | "admin") || "student",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`,
    };

    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_user", JSON.stringify(newUser));
      localStorage.setItem("auth_token", `token_${newUser.id}_${Date.now()}`);
    }

    return { success: true, user: newUser };
  },

  logout: async (): Promise<void> => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("auth_user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("auth_token");
  },

  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  },
};
