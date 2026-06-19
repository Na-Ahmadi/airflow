'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'fa' | 'en';
export type Dir = 'rtl' | 'ltr';

interface LanguageContextValue {
  lang: Lang;
  dir: Dir;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'fa',
  dir: 'rtl',
  setLang: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fa');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null;
    const initial: Lang = stored === 'en' ? 'en' : 'fa';
    applyLang(initial);
    setLangState(initial);
  }, []);

  const setLang = (next: Lang) => {
    localStorage.setItem('lang', next);
    applyLang(next);
    setLangState(next);
  };

  const dir: Dir = lang === 'en' ? 'ltr' : 'rtl';

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

function applyLang(lang: Lang) {
  const dir = lang === 'en' ? 'ltr' : 'rtl';
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', dir);
}
