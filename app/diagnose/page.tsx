"use client";

import Link from "next/link";
import { DiagnoseExperience } from "@/components/diagnose-experience";
import { SiteHeader } from "@/components/site-header";
import { useTranslation } from "@/lib/i18n/language-context";

export default function DiagnosePage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-full flex-col bg-[#f5f8fc] font-sans text-slate-800">
      <SiteHeader variant="diagnose" />

      <main className="flex-1">
        <DiagnoseExperience />

        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[28px] border border-slate-200 bg-white/92 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1 lg:pr-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {t.home.gateway.library.badge}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                    {t.home.gateway.library.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base lg:text-[15px]">
                    {t.home.gateway.library.description}
                  </p>
                </div>
                <Link
                  href="/tools"
                  className="pill-button shrink-0 self-start whitespace-nowrap lg:self-center"
                >
                  {t.home.gateway.library.cta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
