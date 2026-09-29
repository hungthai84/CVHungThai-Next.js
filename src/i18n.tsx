import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './data/translations';
import { getSavedProductionDefaults } from './services/systemSettingsService';

export type { Language };

interface LanguageContextType {
  lang: Language;
  language: Language;
  setLang: (lang: Language) => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_lang");
      if (saved === "vi" || saved === "en") return saved;
      const prodDefaults = getSavedProductionDefaults();
      if (prodDefaults?.lang === "vi" || prodDefaults?.lang === "en") return prodDefaults.lang;
    }
    return 'vi';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("portfolio_lang", newLang);
      } catch {}
    }
  };

  useEffect(() => {
    const handleDefaultsUpdated = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.lang === "vi" || detail?.lang === "en") {
        setLangState(detail.lang);
      }
    };
    window.addEventListener("thai_portfolio_defaults_updated", handleDefaultsUpdated);
    return () => window.removeEventListener("thai_portfolio_defaults_updated", handleDefaultsUpdated);
  }, []);

  const t = (key: string) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, language: lang, setLang, setLanguage: setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

const fallbackLanguageContext: LanguageContextType = {
  lang: 'vi',
  language: 'vi',
  setLang: () => {},
  setLanguage: () => {},
  t: (key: string) => translations['vi']?.[key] || key,
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context || fallbackLanguageContext;
}

