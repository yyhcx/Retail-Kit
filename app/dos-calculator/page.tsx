"use client";

import { SiteHeader } from "@/components/site-header";
import { formatDays, formatUnits } from "@/lib/i18n/format";
import { useTranslation } from "@/lib/i18n/language-context";
import {
  getHealth,
  getManagementRecommendation,
  getTrend,
} from "@/lib/inventory/planning";
import { useMemo, useState } from "react";

const SALES_LOOKBACK_DAYS = 28;

const DEMO_DATA = {
  currentInventory: "300",
  sellOutLast28Days: "140",
  sellInLast28Days: "180",
  targetDos: "30",
};

function parseAmount(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function InventoryPlanningCalculatorPage() {
  const { t, language } = useTranslation();
  const copy = t.inventoryPlanning;

  const [currentInventory, setCurrentInventory] = useState("");
  const [sellOutLast28Days, setSellOutLast28Days] = useState("");
  const [sellInLast28Days, setSellInLast28Days] = useState("");
  const [targetDos, setTargetDos] = useState("");

  const values = useMemo(
    () => ({
      currentInventory: parseAmount(currentInventory),
      sellOutLast28Days: parseAmount(sellOutLast28Days),
      sellInLast28Days: parseAmount(sellInLast28Days),
      targetDos: parseAmount(targetDos),
    }),
    [currentInventory, sellOutLast28Days, sellInLast28Days, targetDos],
  );

  const hasInput =
    currentInventory !== "" ||
    sellOutLast28Days !== "" ||
    sellInLast28Days !== "" ||
    targetDos !== "";

  const hasTrendInput = sellInLast28Days !== "" && sellOutLast28Days !== "";
  const canCalculateDos = hasInput && values.sellOutLast28Days > 0;

  const averageDailySales = canCalculateDos
    ? values.sellOutLast28Days / SALES_LOOKBACK_DAYS
    : null;

  const currentDos =
    canCalculateDos && averageDailySales !== null
      ? values.currentInventory / averageDailySales
      : null;

  const canCalculateTarget =
    canCalculateDos && targetDos !== "" && values.targetDos > 0;

  const targetInventory =
    canCalculateTarget && averageDailySales !== null
      ? values.targetDos * averageDailySales
      : null;

  const inventoryGap =
    canCalculateTarget && targetInventory !== null
      ? values.currentInventory - targetInventory
      : null;

  const recommendedOrder =
    canCalculateTarget && targetInventory !== null
      ? values.currentInventory < targetInventory
        ? targetInventory - values.currentInventory
        : 0
      : null;

  const fmtUnits = (value: number) => formatUnits(value, language);
  const fmtDays = (value: number) => formatDays(value, language);

  const health = getHealth(currentDos ?? 0, currentDos !== null, copy.healthLabels);
  const trend = getTrend(
    values.sellInLast28Days,
    values.sellOutLast28Days,
    hasTrendInput,
    copy.trend,
  );

  const managementRecommendation = getManagementRecommendation(
    health.tier,
    trend.tier,
    recommendedOrder,
    inventoryGap,
    canCalculateTarget,
    copy.management,
    fmtUnits,
  );

  const inputs = [
    { id: "currentInventory", label: copy.inputs.currentInventory, hint: copy.inputs.currentInventoryHint, value: currentInventory, setter: setCurrentInventory },
    { id: "sellOutLast28Days", label: copy.inputs.sellOut, hint: copy.inputs.sellOutHint, value: sellOutLast28Days, setter: setSellOutLast28Days },
    { id: "sellInLast28Days", label: copy.inputs.sellIn, hint: copy.inputs.sellInHint, value: sellInLast28Days, setter: setSellInLast28Days },
    { id: "targetDos", label: copy.inputs.targetDos, hint: copy.inputs.targetDosHint, value: targetDos, setter: setTargetDos },
  ];

  function loadDemoData() {
    setCurrentInventory(DEMO_DATA.currentInventory);
    setSellOutLast28Days(DEMO_DATA.sellOutLast28Days);
    setSellInLast28Days(DEMO_DATA.sellInLast28Days);
    setTargetDos(DEMO_DATA.targetDos);
  }

  function resetForm() {
    setCurrentInventory("");
    setSellOutLast28Days("");
    setSellInLast28Days("");
    setTargetDos("");
  }

  const trendAccent = {
    increasing: "border-amber-200 bg-amber-50 text-amber-800",
    decreasing: "border-violet-200 bg-violet-50 text-violet-800",
    stable: "border-slate-200 bg-slate-50 text-slate-700",
    pending: "border-slate-200 bg-slate-50 text-slate-600",
  }[trend.tier];

  const unitsLabel = t.common.units;
  const daysLabel = t.common.days;

  return (
    <div className="flex min-h-full flex-col bg-[#f5f8fc] font-sans text-slate-800">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pb-0 pt-8 sm:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  {copy.badge}
                </div>
                <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
                  {copy.title}
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base lg:max-w-4xl">
                  {copy.subtitle}
                </p>
              </div>
              {currentDos !== null && (
                <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <span className="text-sm text-slate-500">{copy.inventoryHealth}</span>
                  <span className="text-sm font-semibold text-slate-900">{health.health}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 pb-10 pt-0 sm:px-6 sm:pb-12">
          <div className="grid gap-8 lg:grid-cols-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900">{copy.inputsTitle}</h2>
              <p className="mt-1 text-sm text-slate-500">{copy.inputsSubtitle}</p>

              <div className="mt-6 space-y-5">
                {inputs.map((input) => (
                  <div key={input.id}>
                    <label htmlFor={input.id} className="block text-sm font-medium text-slate-700">
                      {input.label}
                    </label>
                    <input id={input.id} type="number" min="0" step="1" placeholder="0" value={input.value} onChange={(e) => input.setter(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                    <p className="mt-1 text-xs text-slate-400">{input.hint}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={loadDemoData} className="pill-button flex-1">
                  {t.common.loadDemoData}
                </button>
                <button type="button" onClick={resetForm} className="pill-button-secondary flex-1">
                  {t.common.reset}
                </button>
              </div>
            </section>

            <section className="flex flex-col gap-6 lg:col-span-3">
              <Section title={copy.sections.health}>
                <div className={`rounded-[28px] border bg-gradient-to-br p-6 text-white shadow-lg sm:p-8 ${health.accent.gradient} ${health.accent.border}`}>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">{copy.health.currentDosStatus}</p>
                      <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{health.label}</p>
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                        {currentDos !== null
                          ? `${copy.snapshot.currentDos}: ${fmtDays(currentDos)} ${daysLabel}`
                          : copy.management.pending}
                      </p>
                    </div>
                    <span className="inline-flex w-fit shrink-0 rounded-full bg-white/25 px-4 py-2 text-sm font-semibold text-white">
                      {health.health}
                    </span>
                  </div>
                </div>
              </Section>

              <Section title={copy.sections.snapshot}>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: copy.snapshot.currentInventory, value: hasInput ? `${fmtUnits(values.currentInventory)} ${unitsLabel}` : t.common.emDash, hint: copy.snapshot.currentInventoryHint },
                    { label: copy.snapshot.dailySales, value: averageDailySales !== null ? `${fmtUnits(averageDailySales)} ${unitsLabel}` : t.common.emDash, hint: copy.snapshot.dailySalesHint },
                    { label: copy.snapshot.currentDos, value: currentDos !== null ? `${fmtDays(currentDos)} ${daysLabel}` : t.common.emDash, hint: copy.snapshot.currentDosHint, accent: health.accent.text },
                  ].map((card) => (
                    <div key={card.label} className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${health.accent.cardHover}`}>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{card.label}</p>
                      <p className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${card.accent ?? "text-slate-900"}`}>{card.value}</p>
                      <p className="mt-1 text-xs text-slate-400">{card.hint}</p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title={copy.sections.trend}>
                <div className={`rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md ${trendAccent}`}>
                  <p className="text-xs font-medium uppercase tracking-wide opacity-70">{copy.trend.movement}</p>
                  <p className="mt-2 text-2xl font-bold">{trend.label}</p>
                  <p className="mt-2 text-sm leading-relaxed opacity-90">{trend.description}</p>
                </div>
              </Section>

              <Section title={copy.sections.targetAnalysis}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{copy.targetAnalysis.targetInventory}</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-blue-600 sm:text-3xl">
                      {targetInventory !== null ? `${fmtUnits(targetInventory)} ${unitsLabel}` : t.common.emDash}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{copy.targetAnalysis.targetInventoryHint}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{copy.targetAnalysis.inventoryGap}</p>
                    <p className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${inventoryGap === null ? "text-slate-900" : inventoryGap > 0 ? "text-orange-600" : inventoryGap < 0 ? "text-red-600" : "text-emerald-600"}`}>
                      {inventoryGap !== null ? `${inventoryGap > 0 ? "+" : ""}${fmtUnits(inventoryGap)} ${unitsLabel}` : t.common.emDash}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{copy.targetAnalysis.inventoryGapHint}</p>
                  </div>
                </div>
              </Section>

              <Section title={copy.sections.recommendedOrder}>
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md sm:p-8">
                  <p className="text-xs font-medium uppercase tracking-wide text-blue-600">{copy.order.replenishment}</p>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-blue-700 sm:text-5xl">
                    {recommendedOrder !== null ? `${fmtUnits(recommendedOrder)} ${unitsLabel}` : t.common.emDash}
                  </p>
                  <p className="mt-2 text-sm text-blue-600/80">
                    {recommendedOrder !== null && recommendedOrder === 0
                      ? copy.order.noOrderNeeded
                      : recommendedOrder !== null && recommendedOrder > 0
                        ? copy.order.orderNeeded
                        : copy.order.enterTarget}
                  </p>
                </div>
              </Section>

              <Section title={copy.sections.management}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md sm:p-8">
                  <p className="text-base leading-relaxed text-slate-700">{managementRecommendation}</p>
                </div>
              </Section>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      {children}
    </div>
  );
}
