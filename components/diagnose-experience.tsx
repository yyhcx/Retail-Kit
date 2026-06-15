"use client";

import { formatCurrency, formatPercent, formatUnits } from "@/lib/i18n/format";
import { useTranslation } from "@/lib/i18n/language-context";
import {
  DEFAULT_BENCHMARK,
  DEFAULT_CURRENT,
  METRIC_ORDER,
  type ComparisonPeriod,
  type MetricKey,
  type MetricValues,
} from "@/lib/retail-kit";
import { useMemo, useState } from "react";

function parseAmount(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMetricValue(metric: MetricKey, value: number, language: "en" | "zh") {
  if (metric === "traffic") {
    return formatUnits(value, language);
  }

  if (metric === "asp") {
    return formatCurrency(value, language);
  }

  return formatPercent(value);
}

function formatMetricDelta(metric: MetricKey, delta: number, language: "en" | "zh") {
  const sign = delta > 0 ? "+" : delta < 0 ? "-" : "";
  const absolute = Math.abs(delta);

  if (metric === "traffic") {
    return `${sign}${formatUnits(absolute, language)}`;
  }

  if (metric === "asp") {
    return `${sign}${formatCurrency(absolute, language)}`;
  }

  const points = new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(absolute);

  return language === "zh" ? `${sign}${points} 个百分点` : `${sign}${points} pts`;
}

function formatRelativeChange(value: number | null) {
  if (value === null) {
    return "—";
  }

  return formatPercent(value);
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function getComparisonLabel(
  period: ComparisonPeriod,
  copy: { periodOptions: Record<ComparisonPeriod, string> },
) {
  return copy.periodOptions[period];
}

export function DiagnoseExperience() {
  const { t, language } = useTranslation();
  const copy = t.home.diagnosis;
  const gateway = t.home.gateway;

  const [comparisonPeriod, setComparisonPeriod] = useState<ComparisonPeriod>("week");
  const [currentMetrics, setCurrentMetrics] = useState<MetricValues>(DEFAULT_CURRENT);
  const [benchmarkMetrics, setBenchmarkMetrics] = useState<MetricValues>(DEFAULT_BENCHMARK);

  const comparisonLabel = getComparisonLabel(comparisonPeriod, copy);
  const currentPeriodLabel = copy.currentPeriodOptions[comparisonPeriod];

  const analysis = useMemo(() => {
    const currentValues = {
      traffic: parseAmount(currentMetrics.traffic),
      entryRate: parseAmount(currentMetrics.entryRate),
      conversionRate: parseAmount(currentMetrics.conversionRate),
      asp: parseAmount(currentMetrics.asp),
    };
    const benchmarkValues = {
      traffic: parseAmount(benchmarkMetrics.traffic),
      entryRate: parseAmount(benchmarkMetrics.entryRate),
      conversionRate: parseAmount(benchmarkMetrics.conversionRate),
      asp: parseAmount(benchmarkMetrics.asp),
    };

    const currentRevenue =
      currentValues.traffic *
      (currentValues.entryRate / 100) *
      (currentValues.conversionRate / 100) *
      currentValues.asp;
    const benchmarkRevenue =
      benchmarkValues.traffic *
      (benchmarkValues.entryRate / 100) *
      (benchmarkValues.conversionRate / 100) *
      benchmarkValues.asp;

    const salesChange =
      benchmarkRevenue > 0
        ? ((currentRevenue - benchmarkRevenue) / benchmarkRevenue) * 100
        : null;

    const drivers = METRIC_ORDER.map((metric) => {
      const current = currentValues[metric];
      const benchmark = benchmarkValues[metric];
      const absoluteDelta = current - benchmark;
      const relativeDelta =
        benchmark > 0 ? ((current - benchmark) / benchmark) * 100 : null;

      return {
        key: metric,
        label: copy.metrics[metric],
        current,
        benchmark,
        absoluteDelta,
        relativeDelta,
      };
    });

    const comparableDrivers = drivers.filter(
      (driver) => driver.relativeDelta !== null,
    );

    const sortedDrivers = [...comparableDrivers].sort((left, right) => {
      const leftScore = left.relativeDelta ?? 0;
      const rightScore = right.relativeDelta ?? 0;

      if (salesChange === null) {
        return Math.abs(rightScore) - Math.abs(leftScore);
      }

      if (salesChange < 0) {
        return leftScore - rightScore;
      }

      if (salesChange > 0) {
        return rightScore - leftScore;
      }

      return Math.abs(rightScore) - Math.abs(leftScore);
    });

    const rootDriver = sortedDrivers[0] ?? null;
    const direction: "declining" | "improving" | "stable" | "awaiting" =
      salesChange === null
        ? "awaiting"
        : Math.abs(salesChange) < 0.5
          ? "stable"
          : salesChange < 0
            ? "declining"
            : "improving";

    return {
      currentRevenue,
      benchmarkRevenue,
      salesChange,
      drivers,
      rootDriver,
      direction,
    };
  }, [benchmarkMetrics, copy.metrics, currentMetrics]);

  const recommendedActions = analysis.rootDriver
    ? copy.actions[analysis.rootDriver.key]
    : [];
  const recommendedTools = analysis.rootDriver
    ? copy.toolSuggestions[analysis.rootDriver.key]
    : [];

  function updateCurrentMetric(metric: MetricKey, value: string) {
    setCurrentMetrics((previous) => ({ ...previous, [metric]: value }));
  }

  function updateBenchmarkMetric(metric: MetricKey, value: string) {
    setBenchmarkMetrics((previous) => ({ ...previous, [metric]: value }));
  }

  function loadSampleDiagnosis() {
    setCurrentMetrics(DEFAULT_CURRENT);
    setBenchmarkMetrics(DEFAULT_BENCHMARK);
    setComparisonPeriod("week");
  }

  function resetDiagnosis() {
    setCurrentMetrics({
      traffic: "",
      entryRate: "",
      conversionRate: "",
      asp: "",
    });
    setBenchmarkMetrics({
      traffic: "",
      entryRate: "",
      conversionRate: "",
      asp: "",
    });
  }

  const statusLabel = {
    declining: copy.statuses.declining,
    improving: copy.statuses.improving,
    stable: copy.statuses.stable,
    awaiting: copy.statuses.awaiting,
  }[analysis.direction];
  const rootCauseTitle = analysis.rootDriver
    ? formatTemplate(copy.rootCauseTitles[analysis.direction], {
        metric: analysis.rootDriver.label,
      })
    : copy.statuses.awaiting;
  const rootCauseDetail = analysis.rootDriver
    ? formatTemplate(copy.rootCauseMovement, {
        metric: analysis.rootDriver.label,
        benchmark: formatMetricValue(
          analysis.rootDriver.key,
          analysis.rootDriver.benchmark,
          language,
        ),
        current: formatMetricValue(
          analysis.rootDriver.key,
          analysis.rootDriver.current,
          language,
        ),
      })
    : copy.emptyState;
  const isSalesDeclining =
    analysis.salesChange !== null && analysis.salesChange < -0.5;

  return (
    <section
      id="diagnose"
      className="relative overflow-hidden border-b border-slate-200 px-4 pb-10 pt-8 sm:px-6 lg:pb-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              {gateway.diagnose.badge}
            </div>

            <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
              {gateway.diagnose.title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base lg:max-w-4xl">
              {gateway.diagnose.description}
            </p>
          </div>
        </div>

        <section
          id="diagnosis-workspace"
          className="rounded-[28px] border border-slate-200 bg-white/92 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-6"
        >
          <div className="mb-5 grid gap-5 md:grid-cols-2">
            <select
              aria-label={copy.comparisonPeriod}
              value={comparisonPeriod}
              onChange={(event) =>
                setComparisonPeriod(event.target.value as ComparisonPeriod)
              }
              className="w-full rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-colors focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
            >
              <option value="week">{copy.comparisonModeOptions.week}</option>
              <option value="month">{copy.comparisonModeOptions.month}</option>
              <option value="year">{copy.comparisonModeOptions.year}</option>
            </select>
            <div className="hidden md:block" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <MetricPanel
              title={currentPeriodLabel}
              metrics={METRIC_ORDER}
              values={currentMetrics}
              onChange={updateCurrentMetric}
              labels={copy.metrics}
              helpers={copy.helpers}
              language={language}
              currencySymbol={t.common.currencySymbol}
            />
            <MetricPanel
              title={comparisonLabel}
              metrics={METRIC_ORDER}
              values={benchmarkMetrics}
              onChange={updateBenchmarkMetric}
              labels={copy.metrics}
              helpers={copy.helpers}
              language={language}
              currencySymbol={t.common.currencySymbol}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-start">
            <button
              type="button"
              onClick={resetDiagnosis}
              className="pill-button-secondary sm:min-w-36"
            >
              {copy.buttons.reset}
            </button>
            <button
              type="button"
              onClick={loadSampleDiagnosis}
              className="pill-button sm:min-w-40"
            >
              {copy.buttons.loadSample}
            </button>
          </div>
        </section>

        <div className="mt-8 grid gap-6">
          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="grid gap-px bg-slate-200/80 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.5fr)]">
              <div className="flex min-h-[180px] flex-col justify-center bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(232,242,255,0.92))] p-6 lg:px-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                  {copy.summary.primaryRootCause}
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                  {rootCauseTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {rootCauseDetail}
                </p>
                <div className="mt-6 flex">
                  <div
                    className={`inline-flex min-w-[220px] items-center overflow-hidden whitespace-nowrap rounded-full border text-sm font-semibold shadow-sm ${
                      isSalesDeclining
                        ? "border-rose-200 bg-rose-50/90 shadow-rose-100/70"
                        : "border-sky-200 bg-white/90 shadow-sky-100/70"
                    }`}
                  >
                    <p
                      className={`flex-1 border-r px-5 py-2.5 text-center ${
                        isSalesDeclining
                          ? "border-rose-100 text-rose-700"
                          : "border-sky-100 text-sky-700"
                      }`}
                    >
                      {copy.summary.salesChange}
                    </p>
                    <p
                      className={`flex-1 px-5 py-2.5 text-center ${
                        isSalesDeclining ? "text-rose-800" : "text-slate-950"
                      }`}
                    >
                      {analysis.salesChange === null
                        ? "—"
                        : formatRelativeChange(analysis.salesChange)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-px bg-slate-200/80 sm:grid-cols-3">
                {[
                  {
                    label: copy.currentPeriod,
                    value: formatCurrency(analysis.currentRevenue, language),
                    detail: copy.summary.salesRevenue,
                  },
                  {
                    label: comparisonLabel,
                    value: formatCurrency(analysis.benchmarkRevenue, language),
                    detail: copy.summary.salesRevenue,
                  },
                  {
                    label: statusLabel,
                    value:
                      analysis.rootDriver && analysis.rootDriver.relativeDelta !== null
                        ? formatRelativeChange(analysis.rootDriver.relativeDelta)
                        : "—",
                    detail: analysis.rootDriver?.label ?? copy.statuses.awaiting,
                  },
                ].map((item) => (
                  <div key={`${item.label}-${item.detail}`} className="flex min-h-[180px] flex-col justify-center bg-white px-6 py-8 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                      {item.value}
                    </p>
                    <p className="mt-2 text-base text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">
                  {copy.summary.breakdown}
                </h3>
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                {language === "zh" ? "4 项指标" : "4 metrics"}
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {analysis.drivers.map((driver) => (
                <div
                  key={driver.key}
                  className={`rounded-2xl border p-4 transition-colors ${
                    driver.relativeDelta !== null && driver.relativeDelta < 0
                      ? "border-rose-200 bg-rose-50/80"
                      : analysis.rootDriver?.key === driver.key
                      ? "border-sky-200 bg-sky-50/80"
                      : "border-slate-200 bg-slate-50/80"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {driver.label}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {formatMetricValue(driver.key, driver.benchmark, language)} →{" "}
                    {formatMetricValue(driver.key, driver.current, language)}
                  </p>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                      {formatMetricDelta(driver.key, driver.absoluteDelta, language)}
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        driver.relativeDelta === null
                          ? "text-slate-500"
                          : driver.relativeDelta < 0
                            ? "text-rose-600"
                            : driver.relativeDelta > 0
                              ? "text-emerald-600"
                              : "text-slate-500"
                      }`}
                    >
                      {formatRelativeChange(driver.relativeDelta)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {copy.summary.nextActions}
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                {recommendedActions.length > 0 ? (
                  recommendedActions.map((action) => (
                    <li key={action} className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                      <span>{action}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500">
                    {copy.emptyActions}
                  </li>
                )}
              </ul>
            </section>

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {copy.summary.toolRecommendations}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {recommendedTools.length > 0 ? (
                  recommendedTools.map((toolName) => (
                    <span
                      key={toolName}
                      className="inline-flex items-center rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] px-4 py-3 text-sm font-medium text-slate-700"
                    >
                      {toolName}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">
                    {copy.emptyTools}
                  </span>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricPanel({
  title,
  metrics,
  values,
  onChange,
  labels,
  helpers,
  language,
  currencySymbol,
}: {
  title: string;
  metrics: MetricKey[];
  values: MetricValues;
  onChange: (metric: MetricKey, value: string) => void;
  labels: Record<MetricKey, string>;
  helpers: Record<MetricKey, string>;
  language: "en" | "zh";
  currencySymbol: string;
}) {
  return (
    <section className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#fbfdff,#f4f8fc)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
      <div>
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
          {title}
        </h3>
      </div>

      <div className="mt-5 space-y-4">
        {metrics.map((metric) => {
          const hasPrefix = metric === "asp";
          const hasSuffix = metric === "entryRate" || metric === "conversionRate";
          const needsRightUnit = hasSuffix || metric === "traffic";
          const unitSuffix = metric === "traffic" ? (language === "zh" ? "人" : "") : "%";

          return (
            <div key={metric} className="rounded-2xl border border-slate-200/80 bg-white/85 p-4">
              <label
                htmlFor={`${title}-${metric}`}
                className="block text-sm font-medium text-slate-700"
              >
                {labels[metric]}
              </label>
              <div className="relative mt-2">
                {hasPrefix && (
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    {currencySymbol}
                  </span>
                )}
                <input
                  id={`${title}-${metric}`}
                  type="number"
                  min="0"
                  step={metric === "traffic" ? "1" : metric === "asp" ? "0.01" : "0.1"}
                  inputMode="decimal"
                  placeholder={metric === "traffic" ? "1200" : metric === "asp" ? "49.00" : "40.0"}
                  value={values[metric]}
                  onChange={(event) => onChange(metric, event.target.value)}
                  className={`w-full rounded-xl border border-slate-200 bg-white py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-50 ${
                    hasPrefix
                      ? "pl-8 pr-10"
                      : needsRightUnit
                        ? "px-4 pr-10"
                        : "px-4"
                  }`}
                />
                {hasSuffix && (
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                    %
                  </span>
                )}
                {metric === "traffic" && (
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                    {unitSuffix}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{helpers[metric]}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
