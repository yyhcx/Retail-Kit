"use client";

import { SiteHeader } from "@/components/site-header";
import { formatCurrency, formatPercent } from "@/lib/i18n/format";
import { useTranslation } from "@/lib/i18n/language-context";
import { getPerformance } from "@/lib/roi/performance";
import { useMemo, useState } from "react";

function parseAmount(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

const DEMO_DATA = {
  campaignCost: "1000",
  prizeCost: "500",
  staffCost: "500",
  additionalRevenue: "4000",
};

export default function ROICalculatorPage() {
  const { t, language } = useTranslation();
  const copy = t.roiCalculator;

  const [campaignCost, setCampaignCost] = useState("");
  const [prizeCost, setPrizeCost] = useState("");
  const [staffCost, setStaffCost] = useState("");
  const [additionalRevenue, setAdditionalRevenue] = useState("");

  const values = useMemo(
    () => ({
      campaignCost: parseAmount(campaignCost),
      prizeCost: parseAmount(prizeCost),
      staffCost: parseAmount(staffCost),
      additionalRevenue: parseAmount(additionalRevenue),
    }),
    [campaignCost, prizeCost, staffCost, additionalRevenue],
  );

  const hasInput =
    campaignCost !== "" ||
    prizeCost !== "" ||
    staffCost !== "" ||
    additionalRevenue !== "";

  const totalCost =
    values.campaignCost + values.prizeCost + values.staffCost;
  const profit = values.additionalRevenue - totalCost;
  const hasCostData = totalCost > 0;
  const roi = hasCostData ? (profit / totalCost) * 100 : 0;
  const performance = getPerformance(
    roi,
    hasCostData && hasInput,
    copy.ratings,
  );
  type CostDriver = keyof typeof copy.costRecommendations;
  const costDrivers: Array<{ key: CostDriver; value: number }> = [
    { key: "campaignCost", value: values.campaignCost },
    { key: "prizeCost", value: values.prizeCost },
    { key: "staffCost", value: values.staffCost },
  ];
  const primaryCostDriver = costDrivers.reduce((highest, current) =>
    current.value > highest.value ? current : highest,
  );
  const recommendationTier =
    performance.tier === "loss-making"
      ? "lossMaking"
      : performance.tier === "break-even"
        ? "breakEven"
      : performance.tier === "high-performing"
        ? "highPerforming"
        : performance.tier;
  const recommendation =
    hasCostData && hasInput && primaryCostDriver.value > 0 && recommendationTier !== "pending"
      ? copy.costRecommendations[primaryCostDriver.key][recommendationTier]
      : performance.recommendation;

  const inputs = [
    { id: "campaignCost", label: copy.inputs.campaignCost, value: campaignCost, setter: setCampaignCost },
    { id: "prizeCost", label: copy.inputs.prizeCost, value: prizeCost, setter: setPrizeCost },
    { id: "staffCost", label: copy.inputs.staffCost, value: staffCost, setter: setStaffCost },
    { id: "additionalRevenue", label: copy.inputs.additionalRevenue, value: additionalRevenue, setter: setAdditionalRevenue },
  ] as const;

  function loadDemoData() {
    setCampaignCost(DEMO_DATA.campaignCost);
    setPrizeCost(DEMO_DATA.prizeCost);
    setStaffCost(DEMO_DATA.staffCost);
    setAdditionalRevenue(DEMO_DATA.additionalRevenue);
  }

  function resetForm() {
    setCampaignCost("");
    setPrizeCost("");
    setStaffCost("");
    setAdditionalRevenue("");
  }

  const fmt = (value: number) => formatCurrency(value, language);

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
              {hasCostData && hasInput && (
                <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <span className="text-sm text-slate-500">{copy.campaignHealth}</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {performance.health}
                  </span>
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
                    <div className="relative mt-1.5">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                        {t.common.currencySymbol}
                      </span>
                      <input
                        id={input.id}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={input.value}
                        onChange={(e) => input.setter(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
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

            <section className="flex flex-col gap-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
              <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {copy.campaignHealth}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                    {performance.rating}
                  </h2>
                </div>
                <span className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${performance.accent.badge}`}>
                  {performance.health}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard label={copy.results.totalCost} value={hasInput ? fmt(totalCost) : t.common.emDash} hover={performance.accent.cardHover} />
                <ResultCard
                  label={copy.results.profit}
                  value={hasInput ? fmt(profit) : t.common.emDash}
                  hover={performance.accent.cardHover}
                  valueClass={!hasInput ? "" : profit >= 0 ? "text-emerald-600" : "text-red-600"}
                />
              </div>

              <div className={`flex min-h-44 rounded-2xl border bg-gradient-to-br p-6 text-white shadow-lg sm:min-h-48 sm:p-8 ${performance.accent.gradient} ${performance.accent.border}`}>
                <div className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium text-white/80">{copy.results.roiLabel}</p>
                    <p className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
                      {hasCostData && hasInput ? formatPercent(roi) : t.common.emDash}
                    </p>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-white/25 px-4 py-1.5 text-sm font-semibold text-white">
                    {performance.rating}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-white hover:shadow-md sm:p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {copy.recommendation}
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  {recommendation}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function ResultCard({
  label,
  value,
  hover,
  valueClass = "text-slate-900",
}: {
  label: string;
  value: string;
  hover: string;
  valueClass?: string;
}) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${hover}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${valueClass}`}>{value}</p>
    </div>
  );
}
