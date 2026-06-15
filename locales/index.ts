import en, { type Locale } from "./en";
import zh from "./zh";

export type Language = "en" | "zh";

export const locales: Record<Language, Locale> = {
  en,
  zh,
};

export const defaultLanguage: Language = "en";

export const LANGUAGE_STORAGE_KEY = "retailkit-locale";

export type { Locale };
