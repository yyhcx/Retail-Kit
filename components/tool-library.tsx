"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/language-context";
import { TOOL_CATEGORIES, TOOL_LINKS, type ToolKey } from "@/lib/retail-kit";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export function ToolLibrary({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const { t } = useTranslation();
  const library = t.home.library;
  const isCompact = variant === "compact";

  return (
    <section
      id="tool-library"
      className={
        isCompact
          ? "px-4 py-8 sm:px-6 sm:py-12"
          : "px-4 py-4 sm:px-6 sm:py-8"
      }
    >
      <div className="mx-auto max-w-7xl">
        {isCompact ? (
          <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-sky-700">
                {library.title}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
                {library.title}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {library.subtitle}
            </p>
          </div>
        ) : null}

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {TOOL_CATEGORIES.map((category) => (
            <section
              key={category.key}
              className="rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,251,255,0.94))] p-4 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-100 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)] sm:rounded-[28px] sm:p-5"
            >
              <div className="flex items-end justify-between gap-3 border-b border-slate-200 pb-4 sm:pb-5">
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {library.categories[category.key]}
                  </h3>
                </div>
                <p className="shrink-0 whitespace-nowrap text-sm text-slate-500">
                  {formatTemplate(library.toolCount, {
                    count: category.toolKeys.length,
                  })}
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                {category.toolKeys.map((toolKey) => {
                  const tool = t.tools[toolKey as ToolKey];
                  const link = TOOL_LINKS[toolKey];
                  const isActive = link.status === "active";
                  const card = (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 pr-2">
                          <h4 className="text-[15px] font-semibold leading-6 text-slate-950 sm:text-base">
                            {tool.name}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {tool.description}
                          </p>
                        </div>
                        {(link.flagship || isActive) ? (
                          <span
                            className={`inline-flex min-w-[3.75rem] shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-semibold leading-none sm:min-w-0 ${
                              link.flagship
                                ? "bg-sky-100 text-sky-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {link.flagship
                              ? library.badges.flagship
                              : library.badges.active}
                          </span>
                        ) : null}
                      </div>

                      {isActive ? (
                        <div className="mt-6 flex items-center justify-between">
                          <span className="whitespace-nowrap text-sm font-medium text-slate-500">
                            {library.badges.active}
                          </span>
                          <svg
                            className="h-4 w-4 shrink-0 text-slate-400"
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
                      ) : null}
                    </>
                  );

                  const baseClassName =
                    "group rounded-2xl border p-4 transition-all duration-200";
                  const activeClassName =
                    "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_14px_28px_rgba(15,23,42,0.07)]";
                  const futureClassName =
                    "border-slate-200 bg-white/85";

                  if (link.href?.startsWith("/")) {
                    return (
                      <Link
                        key={toolKey}
                        href={link.href}
                        className={`${baseClassName} ${activeClassName}`}
                      >
                        {card}
                      </Link>
                    );
                  }

                  return (
                    <article
                      key={toolKey}
                      className={`${baseClassName} ${futureClassName} cursor-default`}
                    >
                      {card}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
