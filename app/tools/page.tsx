"use client";

import { SiteHeader } from "@/components/site-header";
import { ToolLibrary } from "@/components/tool-library";
import { useTranslation } from "@/lib/i18n/language-context";

export default function ToolsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-full flex-col bg-[#f5f8fc] font-sans text-slate-800">
      <SiteHeader variant="library" />

      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pb-0 pt-8 sm:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  {t.home.gateway.library.badge}
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  {t.home.gateway.library.title}
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base lg:max-w-4xl">
                  {t.home.gateway.library.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <ToolLibrary variant="full" />
      </main>
    </div>
  );
}
