"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useTranslation } from "@/lib/i18n/language-context";

export default function Home() {
  const { t } = useTranslation();
  const gateway = t.home.gateway;

  return (
    <div className="flex min-h-full flex-col bg-[#f5f8fc] font-sans text-slate-800">
      <SiteHeader variant="home" />

      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-20 lg:pt-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(186,230,253,0.55),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(226,232,240,0.7),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                {gateway.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {gateway.subtitle}
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <Link
                href="/diagnose"
                className="group flex h-full flex-col rounded-[30px] border border-sky-200 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(223,242,255,0.92))] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {gateway.diagnose.badge}
                  </span>
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                  {gateway.diagnose.title}
                </h2>
                <p className="mt-4 min-h-[72px] max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                  {gateway.diagnose.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                  {gateway.diagnose.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 rounded-2xl bg-white/80 px-4 py-3 transition-all duration-200 group-hover:bg-white group-hover:shadow-sm"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                  {gateway.diagnose.cta}
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </Link>

              <Link
                href="/tools"
                className="group flex h-full flex-col rounded-[30px] border border-slate-200 bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(241,245,249,0.94))] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.11)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {gateway.library.badge}
                  </span>
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                  {gateway.library.title}
                </h2>
                <p className="mt-4 min-h-[72px] max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                  {gateway.library.description}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {gateway.library.categories.map((category) => (
                    <div
                      key={category}
                      className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 group-hover:border-sky-100 group-hover:bg-white group-hover:shadow-sm"
                    >
                      {category}
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                  {gateway.library.cta}
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/70 px-6 py-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} {t.common.brand}. {t.common.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}
