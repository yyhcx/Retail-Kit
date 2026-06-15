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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="min-w-0 flex-1 shrink transition-opacity hover:opacity-80 sm:flex-none"
        >
          <span className="block max-w-[8.75rem] truncate text-base font-semibold tracking-[0.01em] text-slate-950 sm:max-w-none sm:text-lg">
            {t.common.brand}
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-5">
          <LanguageSwitcher />
          {variant === "home" ? null : variant === "diagnose" ? (
            <a
              href="/tools"
              className="pill-button !hidden whitespace-nowrap lg:!inline-flex"
            >
              {t.home.library.title}
            </a>
          ) : variant === "library" ? (
            <a
              href="/diagnose"
              className="pill-button !hidden whitespace-nowrap lg:!inline-flex"
            >
              {t.common.getStarted}
            </a>
          ) : (
            <Link
              href="/tools"
              className="pill-button !hidden whitespace-nowrap lg:!inline-flex"
            >
              {t.home.library.title}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
