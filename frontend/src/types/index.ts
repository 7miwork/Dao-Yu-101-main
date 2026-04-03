// User Types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: number;
  name: 'student' | 'parent' | 'teacher' | 'school_admin' | 'admin' | 'sales' | 'tech_support';
  description?: string;
}

// Course & Learning Types
export interface Course {
  id: number;
  title: string;
  description?: string;
  languageCode: string;
  price: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: number;
  courseId: number;
  title: string;
  description?: string;
  orderIndex: number;
}

export interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  content?: string;
  type: 'text' | 'video' | 'quiz' | 'interactive';
  orderIndex: number;
}

export interface Quiz {
  id: number;
  lessonId?: number;
  moduleId?: number;
  title: string;
  description?: string;
  passScore: number;
}

export interface Question {
  id: number;
  quizId: number;
  text: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
}

export interface Answer {
  id: number;
  questionId: number;
  text: string;
  isCorrect: boolean;
}

// Progress & Gamification Types
export interface UserProgress {
  id: number;
  userId: string;
  lessonId?: number;
  moduleId?: number;
  status: 'started' | 'completed' | 'failed';
  score?: number;
  completedAt?: string;
  xpGained: number;
}

export interface UserGamification {
  userId: string;
  xp: number;
  level: number;
  streak: number;
  lastActive?: string;
}

// School & Class Types
export interface School {
  id: number;
  name: string;
  address?: string;
  contactEmail?: string;
  adminId?: string;
}

export interface Class {
  id: number;
  name: string;
  schoolId: number;
  teacherId: string;
}

// E-commerce Types
export interface Purchase {
  id: number;
  userId: string;
  courseId?: number;
  itemType: 'course' | 'subscription' | 'virtual_item';
  itemId?: number;
  amount: number;
  currency: string;
  purchaseDate: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Subscription {
  id: number;
  userId: string;
  planId: number;
  startDate: string;
  endDate?: string;
  status: 'active' | 'cancelled' | 'expired';
  autoRenew: boolean;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency: string;
  durationMonths?: number;
}

// i18n Types
export interface Translation {
  id: number;
  key: string;
  en?: string;
  de?: string;
  zh_TW?: string;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// i18n Context Types
export interface i18nContextType {
  language: 'en' | 'de' | 'zh-TW';
  setLanguage: (lang: 'en' | 'de' | 'zh-TW') => void;
  t: (key: string) => string;
}
