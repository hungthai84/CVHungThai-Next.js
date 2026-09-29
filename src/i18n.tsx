import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from './data/translations';

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
  const [lang, setLang] = useState<Language>('vi');

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

