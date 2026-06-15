"use client";

import { SiteHeader } from "@/components/site-header";
import { formatCurrency, formatUnits } from "@/lib/i18n/format";
import { interpolate } from "@/lib/i18n/interpolate";
import { useTranslation } from "@/lib/i18n/language-context";
import { useMemo, useState } from "react";

function parseAmount(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseCount(value: string): number {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function parseHistoryList(value: string): number[] {
  return value
    .split(/[\s,，]+/)
    .map((item) => parseAmount(item))
    .filter((item) => item > 0);
}

const AVERAGE_DEMO_DATA = {
  monthlyRevenueTarget: "100000",
  monthlyVolumeTarget: "2000",
  stores: "3",
  staff: "5",
  workingDays: "25",
};

const WEIGHTED_DEMO_DATA = {
  ...AVERAGE_DEMO_DATA,
  storeRevenueHistory: "120000, 95000, 85000",
  storeVolumeHistory: "2400, 1900, 1700",
  staffRevenueHistory: "68000, 56000, 52000, 46000, 38000",
  staffVolumeHistory: "1360, 1120, 1040, 920, 760",
};

export default function SalesTargetCalculatorPage() {
  const { t, language } = useTranslation();
  const copy = t.salesTargetCalculator;

  const [monthlyRevenueTarget, setMonthlyRevenueTarget] = useState("");
  const [monthlyVolumeTarget, setMonthlyVolumeTarget] = useState("");
  const [stores, setStores] = useState("");
  const [staff, setStaff] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [allocationMode, setAllocationMode] = useState<"average" | "weighted">("average");
  const [storeRevenueHistory, setStoreRevenueHistory] = useState("");
  const [storeVolumeHistory, setStoreVolumeHistory] = useState("");
  const [staffRevenueHistory, setStaffRevenueHistory] = useState("");
  const [staffVolumeHistory, setStaffVolumeHistory] = useState("");

  const values = useMemo(
    () => ({
      monthlyRevenueTarget: parseAmount(monthlyRevenueTarget),
      monthlyVolumeTarget: parseAmount(monthlyVolumeTarget),
      stores: parseCount(stores),
      staff: parseCount(staff),
      workingDays: parseCount(workingDays),
    }),
    [monthlyRevenueTarget, monthlyVolumeTarget, stores, staff, workingDays],
  );

  const hasInput =
    monthlyRevenueTarget !== "" ||
    monthlyVolumeTarget !== "" ||
    stores !== "" ||
    staff !== "" ||
    workingDays !== "";

  const canCalculateBase =
    values.stores > 0 &&
    values.staff > 0 &&
    values.workingDays > 0;
  const canCalculateRevenue = canCalculateBase && monthlyRevenueTarget !== "";
  const canCalculateVolume = canCalculateBase && monthlyVolumeTarget !== "";
  const canCalculate = canCalculateRevenue || canCalculateVolume;

  const revenuePerStore = canCalculateRevenue ? values.monthlyRevenueTarget / values.stores : null;
  const revenuePerStaff = canCalculateRevenue ? values.monthlyRevenueTarget / values.staff : null;
  const revenuePerDay = canCalculateRevenue ? values.monthlyRevenueTarget / values.workingDays : null;

  const volumePerStore = canCalculateVolume ? values.monthlyVolumeTarget / values.stores : null;
  const volumePerStaff = canCalculateVolume ? values.monthlyVolumeTarget / values.staff : null;
  const volumePerDay = canCalculateVolume ? values.monthlyVolumeTarget / values.workingDays : null;

  const fmtCurrency = (value: number) => formatCurrency(value, language);
  const fmtUnits = (value: number) => `${formatUnits(Math.round(value), language)} ${t.common.units}`;
  const storeRevenueWeights = parseHistoryList(storeRevenueHistory);
  const storeVolumeWeights = parseHistoryList(storeVolumeHistory);
  const staffRevenueWeights = parseHistoryList(staffRevenueHistory);
  const staffVolumeWeights = parseHistoryList(staffVolumeHistory);

  function buildWeightedRows(
    count: number,
    history: number[],
    target: number,
    format: (value: number) => string,
    labelPrefix: string,
  ) {
    const safeCount = Math.max(count, 0);
    const totalHistory = history.reduce((sum, value) => sum + value, 0);
    return Array.from({ length: safeCount }, (_, index) => {
      const historyValue = history[index] ?? 0;
      const share =
        totalHistory > 0
          ? historyValue / totalHistory
          : safeCount > 0
            ? 1 / safeCount
            : 0;
      const allocatedTarget = target * share;

      return {
        label: `${labelPrefix} ${index + 1}`,
        historyValue,
        share,
        target: allocatedTarget,
        formattedTarget: format(allocatedTarget),
      };
    });
  }

  const targetGroups = [
    {
      key: "revenue",
      title: copy.results.revenueTarget,
      value: monthlyRevenueTarget !== "" ? fmtCurrency(values.monthlyRevenueTarget) : t.common.emDash,
      canCalculate: canCalculateRevenue,
      accent: "from-blue-600 to-blue-700 border-blue-200 shadow-blue-200",
      storeRows: buildWeightedRows(values.stores, storeRevenueWeights, values.monthlyRevenueTarget, fmtCurrency, copy.results.storePrefix),
      staffRows: buildWeightedRows(values.staff, staffRevenueWeights, values.monthlyRevenueTarget, fmtCurrency, copy.results.staffPrefix),
      cards: [
        { label: copy.results.revenuePerStore, value: revenuePerStore, hint: copy.results.perStoreHint, format: fmtCurrency },
        { label: copy.results.revenuePerStaff, value: revenuePerStaff, hint: copy.results.perStaffHint, format: fmtCurrency },
        { label: copy.results.revenuePerDay, value: revenuePerDay, hint: copy.results.perDayHint, format: fmtCurrency },
      ],
    },
    {
      key: "volume",
      title: copy.results.volumeTarget,
      value: monthlyVolumeTarget !== "" ? fmtUnits(values.monthlyVolumeTarget) : t.common.emDash,
      canCalculate: canCalculateVolume,
      accent: "from-sky-500 to-cyan-600 border-sky-200 shadow-sky-100",
      storeRows: buildWeightedRows(values.stores, storeVolumeWeights, values.monthlyVolumeTarget, fmtUnits, copy.results.storePrefix),
      staffRows: buildWeightedRows(values.staff, staffVolumeWeights, values.monthlyVolumeTarget, fmtUnits, copy.results.staffPrefix),
      cards: [
        { label: copy.results.volumePerStore, value: volumePerStore, hint: copy.results.perStoreHint, format: fmtUnits },
        { label: copy.results.volumePerStaff, value: volumePerStaff, hint: copy.results.perStaffHint, format: fmtUnits },
        { label: copy.results.volumePerDay, value: volumePerDay, hint: copy.results.perDayHint, format: fmtUnits },
      ],
    },
  ];

  function loadDemoData() {
    const demoData =
      allocationMode === "weighted" ? WEIGHTED_DEMO_DATA : AVERAGE_DEMO_DATA;

    setMonthlyRevenueTarget(demoData.monthlyRevenueTarget);
    setMonthlyVolumeTarget(demoData.monthlyVolumeTarget);
    setStores(demoData.stores);
    setStaff(demoData.staff);
    setWorkingDays(demoData.workingDays);

    if (allocationMode === "weighted") {
      setStoreRevenueHistory(WEIGHTED_DEMO_DATA.storeRevenueHistory);
      setStoreVolumeHistory(WEIGHTED_DEMO_DATA.storeVolumeHistory);
      setStaffRevenueHistory(WEIGHTED_DEMO_DATA.staffRevenueHistory);
      setStaffVolumeHistory(WEIGHTED_DEMO_DATA.staffVolumeHistory);
    } else {
      setStoreRevenueHistory("");
      setStoreVolumeHistory("");
      setStaffRevenueHistory("");
      setStaffVolumeHistory("");
    }
  }

  function resetForm() {
    setMonthlyRevenueTarget("");
    setMonthlyVolumeTarget("");
    setStores("");
    setStaff("");
    setWorkingDays("");
    setStoreRevenueHistory("");
    setStoreVolumeHistory("");
    setStaffRevenueHistory("");
    setStaffVolumeHistory("");
  }

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
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 pb-10 pt-0 sm:px-6 sm:pb-12">
          <div className="grid gap-8 lg:grid-cols-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900">{copy.inputsTitle}</h2>
              <p className="mt-1 text-sm text-slate-500">{copy.inputsSubtitle}</p>

              <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:grid-cols-2">
                {[
                  { id: "average", label: copy.allocation.average, hint: copy.allocation.averageHint },
                  { id: "weighted", label: copy.allocation.weighted, hint: copy.allocation.weightedHint },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAllocationMode(option.id as "average" | "weighted")}
                    className={`rounded-[22px] px-4 py-3 text-left transition-all duration-200 ${
                      allocationMode === option.id
                        ? "bg-white text-blue-700 shadow-sm ring-1 ring-blue-100"
                        : "text-slate-600 hover:bg-white/70"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{option.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">{option.hint}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="monthlyRevenueTarget" className="block text-sm font-medium text-slate-700">
                    {copy.inputs.monthlyRevenueTarget}
                  </label>
                  <div className="relative mt-1.5">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                      {t.common.currencySymbol}
                    </span>
                    <input id="monthlyRevenueTarget" type="number" min="0" step="0.01" placeholder="0.00" value={monthlyRevenueTarget} onChange={(e) => setMonthlyRevenueTarget(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>
                <div>
                  <label htmlFor="monthlyVolumeTarget" className="block text-sm font-medium text-slate-700">
                    {copy.inputs.monthlyVolumeTarget}
                  </label>
                  <div className="relative mt-1.5">
                    <input id="monthlyVolumeTarget" type="number" min="0" step="1" placeholder="0" value={monthlyVolumeTarget} onChange={(e) => setMonthlyVolumeTarget(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                      {t.common.units}
                    </span>
                  </div>
                </div>
                {[
                  { id: "stores", label: copy.inputs.stores, value: stores, setter: setStores },
                  { id: "staff", label: copy.inputs.staff, value: staff, setter: setStaff },
                  { id: "workingDays", label: copy.inputs.workingDays, value: workingDays, setter: setWorkingDays },
                ].map((input) => (
                  <div key={input.id}>
                    <label htmlFor={input.id} className="block text-sm font-medium text-slate-700">
                      {input.label}
                    </label>
                    <input id={input.id} type="number" min="1" step="1" placeholder="0" value={input.value} onChange={(e) => input.setter(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                  </div>
                ))}
              </div>

              {allocationMode === "weighted" && (
                <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">{copy.weightedInputs.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{copy.weightedInputs.description}</p>
                  <div className="mt-4 space-y-4">
                    {[
                      { id: "storeRevenueHistory", label: copy.weightedInputs.storeRevenue, value: storeRevenueHistory, setter: setStoreRevenueHistory },
                      { id: "storeVolumeHistory", label: copy.weightedInputs.storeVolume, value: storeVolumeHistory, setter: setStoreVolumeHistory },
                      { id: "staffRevenueHistory", label: copy.weightedInputs.staffRevenue, value: staffRevenueHistory, setter: setStaffRevenueHistory },
                      { id: "staffVolumeHistory", label: copy.weightedInputs.staffVolume, value: staffVolumeHistory, setter: setStaffVolumeHistory },
                    ].map((input) => (
                      <div key={input.id}>
                        <label htmlFor={input.id} className="block text-xs font-semibold text-slate-700">
                          {input.label}
                        </label>
                        <textarea
                          id={input.id}
                          rows={2}
                          value={input.value}
                          onChange={(event) => input.setter(event.target.value)}
                          placeholder={copy.weightedInputs.placeholder}
                          className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
              {targetGroups.map((group) => (
                <div key={group.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className={`rounded-2xl border bg-gradient-to-br p-6 text-white shadow-lg ${group.accent}`}>
                    <p className="text-sm font-medium text-white/80">{group.title}</p>
                    <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
                      {group.value}
                    </p>
                    {group.canCalculate && (
                      <p className="mt-3 text-sm text-white/80">
                        {interpolate(copy.results.distributed, {
                          stores: values.stores,
                          staff: values.staff,
                          workingDays: values.workingDays,
                        })}
                      </p>
                    )}
                  </div>
                  {allocationMode === "average" ? (
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      {group.cards.map((card) => (
                        <div key={card.label} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md hover:shadow-blue-100">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{card.label}</p>
                          <p className="mt-2 text-xl font-bold tracking-tight text-blue-600 sm:text-2xl">
                            {card.value !== null ? card.format(card.value) : t.common.emDash}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">{card.hint}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                      {[
                        { title: copy.results.storeAllocation, rows: group.storeRows },
                        { title: copy.results.staffAllocation, rows: group.staffRows },
                      ].map((table) => (
                        <div key={table.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-slate-900">{table.title}</p>
                            <p className="text-xs text-slate-500">{copy.results.byHistoryShare}</p>
                          </div>
                          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
                            {table.rows.map((row) => (
                              <div key={row.label} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-sm font-medium text-slate-800">{row.label}</p>
                                  <p className="text-sm font-semibold text-blue-700">{row.formattedTarget}</p>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="h-1.5 flex-1 rounded-full bg-slate-200">
                                    <div
                                      className="h-full rounded-full bg-blue-500"
                                      style={{ width: `${Math.min(row.share * 100, 100)}%` }}
                                    />
                                  </div>
                                  <span className="w-12 text-right text-xs text-slate-500">
                                    {(row.share * 100).toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md sm:p-8">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {copy.summary.title}
                </p>
                {canCalculate ? (
                  <div className="mt-4 space-y-3 text-base leading-relaxed text-slate-700">
                    <p className="font-medium text-slate-900">{copy.summary.heading}</p>
                    {allocationMode === "weighted" && (
                      <p className="text-sm text-slate-600">{copy.summary.weightedNote}</p>
                    )}
                    <ul className="space-y-2">
                      {canCalculateRevenue && (
                        <li>{interpolate(copy.summary.revenueLine, {
                          storeAmount: fmtCurrency(revenuePerStore!),
                          staffAmount: fmtCurrency(revenuePerStaff!),
                          dailyAmount: fmtCurrency(revenuePerDay!),
                        })}</li>
                      )}
                      {canCalculateVolume && (
                        <li>{interpolate(copy.summary.volumeLine, {
                          storeAmount: fmtUnits(volumePerStore!),
                          staffAmount: fmtUnits(volumePerStaff!),
                          dailyAmount: fmtUnits(volumePerDay!),
                        })}</li>
                      )}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {hasInput ? copy.summary.invalid : copy.summary.empty}
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
