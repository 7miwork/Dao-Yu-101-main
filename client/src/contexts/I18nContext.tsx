import React, { createContext, useContext, useState, useEffect } from "react";
import enCommon from "@/locales/en/common.json";
import deCommon from "@/locales/de/common.json";
import zhTwCommon from "@/locales/zh-TW/common.json";

type Language = "en" | "de" | "zh-TW";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
  languages: { code: Language; name: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, any> = {
  en: enCommon,
  de: deCommon,
  "zh-TW": zhTwCommon,
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get from localStorage
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && saved in translations) {
      return saved;
    }
    // Try to get from browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("de")) return "de";
    if (browserLang.startsWith("zh")) return "zh-TW";
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang in translations) {
      setLanguageState(lang);
    }
  };

  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }

    return typeof value === "string" ? value : defaultValue || key;
  };

  const languages: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "zh-TW", name: "繁體中文" },
  ];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
