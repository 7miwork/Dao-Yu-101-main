/**
 * i18n Configuration and Translation Loader
 * 
 * This file loads and manages translations for the application.
 * Translations are loaded from JSON files in the public/i18n directory.
 */

type Language = 'en' | 'de' | 'zh-TW';

interface TranslationData {
  [key: string]: any;
}

interface Translations {
  en: TranslationData;
  de: TranslationData;
  'zh-TW': TranslationData;
}

// Mock translations - in production, these would be loaded from JSON files
export const translations: Translations = {
  en: {
    common: {
      welcome: 'Welcome to Dao-Yu',
      appName: 'Dao-Yu EdTech Platform',
      language: 'Language',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
    },
    auth: {
      loginTitle: 'Login to Dao-Yu',
      registerTitle: 'Create Your Dao-Yu Account',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      invalidCredentials: 'Invalid email or password',
      emailTaken: 'Email already in use',
      passwordTooShort: 'Password must be at least 8 characters',
    },
    navigation: {
      home: 'Home',
      dashboard: 'Dashboard',
      profile: 'Profile',
      courses: 'Courses',
      shop: 'Shop',
      settings: 'Settings',
      admin: 'Admin Panel',
      teacher: 'Teacher Dashboard',
      parent: 'Parent Portal',
    },
    gamification: {
      xp: 'Experience Points',
      level: 'Level',
      streak: 'Learning Streak',
      archipelago: 'Archipelago',
      island: 'Island',
      mission: 'Mission',
      boss: 'Boss Battle',
      unlock: 'Unlock',
      locked: 'Locked',
      completed: 'Completed',
      inProgress: 'In Progress',
    },
    shop: {
      buyNow: 'Buy Now',
      price: 'Price',
      subscription: 'Subscription',
      course: 'Course',
      bundle: 'Bundle',
      addToCart: 'Add to Cart',
      checkout: 'Checkout',
      cart: 'Shopping Cart',
      total: 'Total',
    },
    dashboard: {
      overview: 'Overview',
      recentActivity: 'Recent Activity',
      statistics: 'Statistics',
      progress: 'Progress',
      students: 'Students',
      classes: 'Classes',
      assignments: 'Assignments',
      grades: 'Grades',
    },
  },
  de: {
    common: {
      welcome: 'Willkommen bei Dao-Yu',
      appName: 'Dao-Yu EdTech-Plattform',
      language: 'Sprache',
      logout: 'Abmelden',
      login: 'Anmelden',
      register: 'Registrieren',
      email: 'E-Mail',
      password: 'Passwort',
      firstName: 'Vorname',
      lastName: 'Nachname',
      submit: 'Absenden',
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Zurück',
      loading: 'Wird geladen...',
      error: 'Fehler',
      success: 'Erfolg',
      warning: 'Warnung',
      info: 'Information',
    },
    auth: {
      loginTitle: 'Bei Dao-Yu anmelden',
      registerTitle: 'Erstellen Sie Ihr Dao-Yu-Konto',
      forgotPassword: 'Passwort vergessen?',
      noAccount: 'Haben Sie noch kein Konto?',
      haveAccount: 'Haben Sie bereits ein Konto?',
      invalidCredentials: 'Ungültige E-Mail oder Passwort',
      emailTaken: 'E-Mail wird bereits verwendet',
      passwordTooShort: 'Das Passwort muss mindestens 8 Zeichen lang sein',
    },
    navigation: {
      home: 'Startseite',
      dashboard: 'Dashboard',
      profile: 'Profil',
      courses: 'Kurse',
      shop: 'Shop',
      settings: 'Einstellungen',
      admin: 'Admin-Panel',
      teacher: 'Lehrer-Dashboard',
      parent: 'Elternportal',
    },
    gamification: {
      xp: 'Erfahrungspunkte',
      level: 'Stufe',
      streak: 'Lernsträhne',
      archipelago: 'Archipel',
      island: 'Insel',
      mission: 'Mission',
      boss: 'Boss-Kampf',
      unlock: 'Entsperren',
      locked: 'Gesperrt',
      completed: 'Abgeschlossen',
      inProgress: 'In Bearbeitung',
    },
    shop: {
      buyNow: 'Jetzt kaufen',
      price: 'Preis',
      subscription: 'Abonnement',
      course: 'Kurs',
      bundle: 'Paket',
      addToCart: 'In den Warenkorb',
      checkout: 'Zur Kasse',
      cart: 'Einkaufswarenkorb',
      total: 'Gesamt',
    },
    dashboard: {
      overview: 'Übersicht',
      recentActivity: 'Letzte Aktivität',
      statistics: 'Statistiken',
      progress: 'Fortschritt',
      students: 'Schüler',
      classes: 'Klassen',
      assignments: 'Aufgaben',
      grades: 'Noten',
    },
  },
  'zh-TW': {
    common: {
      welcome: '歡迎來到 Dao-Yu',
      appName: 'Dao-Yu 教育科技平台',
      language: '語言',
      logout: '登出',
      login: '登入',
      register: '註冊',
      email: '電子郵件',
      password: '密碼',
      firstName: '名字',
      lastName: '姓氏',
      submit: '提交',
      cancel: '取消',
      save: '保存',
      delete: '刪除',
      edit: '編輯',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      loading: '載入中...',
      error: '錯誤',
      success: '成功',
      warning: '警告',
      info: '資訊',
    },
    auth: {
      loginTitle: '登入 Dao-Yu',
      registerTitle: '建立您的 Dao-Yu 帳戶',
      forgotPassword: '忘記密碼?',
      noAccount: '還沒有帳戶?',
      haveAccount: '已有帳戶?',
      invalidCredentials: '無效的電子郵件或密碼',
      emailTaken: '電子郵件已被使用',
      passwordTooShort: '密碼必須至少 8 個字符',
    },
    navigation: {
      home: '首頁',
      dashboard: '儀表板',
      profile: '個人資料',
      courses: '課程',
      shop: '商店',
      settings: '設定',
      admin: '管理員面板',
      teacher: '教師儀表板',
      parent: '家長入口',
    },
    gamification: {
      xp: '經驗值',
      level: '等級',
      streak: '學習連勝',
      archipelago: '群島',
      island: '島嶼',
      mission: '任務',
      boss: '首領戰鬥',
      unlock: '解鎖',
      locked: '已鎖定',
      completed: '已完成',
      inProgress: '進行中',
    },
    shop: {
      buyNow: '立即購買',
      price: '價格',
      subscription: '訂閱',
      course: '課程',
      bundle: '套裝',
      addToCart: '加入購物車',
      checkout: '結帳',
      cart: '購物車',
      total: '總計',
    },
    dashboard: {
      overview: '概覽',
      recentActivity: '最近活動',
      statistics: '統計資料',
      progress: '進度',
      students: '學生',
      classes: '班級',
      assignments: '作業',
      grades: '成績',
    },
  },
};

/**
 * Load translations from a specific language
 */
export function loadTranslations(language: Language): TranslationData {
  return translations[language];
}

/**
 * Get a specific translation key
 */
export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
}
