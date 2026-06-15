"use client";

import { useTranslation } from "@/lib/i18n/language-context";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span aria-hidden className="text-base">
        {t.language.label}
      </span>
      <LanguageButton
        active={language === "en"}
        onClick={() => setLanguage("en")}
        label={t.language.english}
      />
      <span className="text-slate-300">|</span>
      <LanguageButton
        active={language === "zh"}
        onClick={() => setLanguage("zh")}
        label={t.language.chinese}
      />
    </div>
  );
}

function LanguageButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-1.5 py-0.5 font-medium transition-colors ${
        active
          ? "text-sky-700"
          : "text-slate-600 hover:text-sky-700"
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
