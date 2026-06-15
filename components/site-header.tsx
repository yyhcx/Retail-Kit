"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/i18n/language-context";

type SiteHeaderProps = {
  variant?: "home" | "tool" | "diagnose" | "library";
};

export function SiteHeader({ variant = "tool" }: SiteHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
        >
          <span className="text-lg font-semibold tracking-[0.02em] text-slate-950">
            {t.common.brand}
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <LanguageSwitcher />
          {variant === "home" ? null : variant === "diagnose" ? (
            <a
              href="/tools"
              className="pill-button hidden whitespace-nowrap sm:inline-flex"
            >
              {t.home.library.title}
            </a>
          ) : variant === "library" ? (
            <a
              href="/diagnose"
              className="pill-button hidden whitespace-nowrap sm:inline-flex"
            >
              {t.common.getStarted}
            </a>
          ) : (
            <Link
              href="/tools"
              className="pill-button hidden whitespace-nowrap sm:inline-flex"
            >
              {t.home.library.title}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
