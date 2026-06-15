"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  defaultLanguage,
  LANGUAGE_STORAGE_KEY,
  locales,
  type Language,
  type Locale,
} from "@/locales";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Locale;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_EVENT = "retailkit-language-change";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_STORAGE_KEY) {
      onStoreChange();
    }
  };

  const handleLocalChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(LANGUAGE_EVENT, handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(LANGUAGE_EVENT, handleLocalChange);
  };
}

function getSnapshot(): Language {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
  return stored === "en" || stored === "zh" ? stored : defaultLanguage;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, () => defaultLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    window.dispatchEvent(new Event(LANGUAGE_EVENT));
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: locales[language],
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
