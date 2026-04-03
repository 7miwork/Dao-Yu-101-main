'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { i18nContextType } from '@/types';
import { translations } from '@/lib/i18n';

const i18nContext = createContext<i18nContextType | undefined>(undefined);

export const i18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'de' | 'zh-TW'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize language from localStorage or browser preference
    const storedLanguage = localStorage.getItem('dao_yu_language');
    if (storedLanguage === 'en' || storedLanguage === 'de' || storedLanguage === 'zh-TW') {
      setLanguageState(storedLanguage);
    } else {
      const browserLang = navigator.language;
      if (browserLang.startsWith('de')) {
        setLanguageState('de');
      } else if (browserLang.startsWith('zh')) {
        setLanguageState('zh-TW');
      }
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: 'en' | 'de' | 'zh-TW') => {
    setLanguageState(lang);
    localStorage.setItem('dao_yu_language', lang);
  };

  const t = (key: string): string => {
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
  };

  if (!mounted) {
    return <>{children}</>;
  }

  const contextValue: i18nContextType = {
    language,
    setLanguage,
    t,
  };

  return <i18nContext.Provider value={contextValue}>{children}</i18nContext.Provider>;
};

export const usei18n = (): i18nContextType => {
  const context = useContext(i18nContext);
  if (context === undefined) {
    throw new Error('usei18n must be used within an i18nProvider');
  }
  return context;
};
