"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function parseAmount(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

const inputs = [
  { id: "campaignCost", label: "Campaign Cost", placeholder: "0.00" },
  { id: "prizeCost", label: "Prize Cost", placeholder: "0.00" },
  { id: "staffCost", label: "Staff Cost", placeholder: "0.00" },
  { id: "additionalRevenue", label: "Additional Revenue", placeholder: "0.00" },
] as const;

export default function ROICalculatorPage() {
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

  const totalCost =
    values.campaignCost + values.prizeCost + values.staffCost;
  const profit = values.additionalRevenue - totalCost;
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  const setters = {
    campaignCost: setCampaignCost,
    prizeCost: setPrizeCost,
    staffCost: setStaffCost,
    additionalRevenue: setAdditionalRevenue,
  };

  const state = {
    campaignCost,
    prizeCost,
    staffCost,
    additionalRevenue,
  };

  return (
    <div className="flex min-h-full flex-col bg-white font-sans text-slate-800">
      <header className="sticky top-0 z-10 border-b border-blue-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 013.75-.615A12.956 12.956 0 0112 6c2.34 0 4.47.881 6.08 2.33a3.001 3.001 0 013.75.615V9.35" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Retail Kit
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            ← All Tools
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <p className="text-sm font-medium text-blue-600">Tool</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              ROI Calculator
            </h1>
            <p className="mt-2 max-w-xl text-slate-600">
              Calculate retail campaign ROI and profitability from your campaign
              costs and additional revenue.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900">Inputs</h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter your campaign costs and expected revenue.
              </p>

              <div className="mt-6 space-y-5">
                {inputs.map((input) => (
                  <div key={input.id}>
                    <label
                      htmlFor={input.id}
                      className="block text-sm font-medium text-slate-700"
                    >
                      {input.label}
                    </label>
                    <div className="relative mt-1.5">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                        $
                      </span>
                      <input
                        id={input.id}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder={input.placeholder}
                        value={state[input.id]}
                        onChange={(e) => setters[input.id](e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-lg shadow-blue-200 sm:p-8">
                <h2 className="text-lg font-semibold text-blue-100">ROI</h2>
                <p
                  className={`mt-2 text-5xl font-bold tracking-tight sm:text-6xl ${
                    profit >= 0 ? "text-white" : "text-red-200"
                  }`}
                >
                  {totalCost > 0 ? formatPercent(roi) : "—"}
                </p>
                <p className="mt-3 text-sm text-blue-100">
                  {totalCost > 0
                    ? profit >= 0
                      ? "Positive return on your campaign investment."
                      : "Campaign costs exceed additional revenue."
                    : "Enter costs above to calculate ROI."}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-semibold text-slate-900">Results</h2>
                <dl className="mt-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                    <dt className="text-sm text-slate-600">Total Cost</dt>
                    <dd className="text-lg font-semibold text-slate-900">
                      {formatCurrency(totalCost)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                    <dt className="text-sm text-slate-600">Profit</dt>
                    <dd
                      className={`text-lg font-semibold ${
                        profit >= 0 ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(profit)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-slate-600">ROI %</dt>
                    <dd
                      className={`text-lg font-semibold ${
                        roi >= 0 ? "text-blue-600" : "text-red-600"
                      }`}
                    >
                      {totalCost > 0 ? formatPercent(roi) : "—"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-blue-50/50 p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Formula
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>Total Cost = Campaign + Prize + Staff</li>
                  <li>Profit = Additional Revenue − Total Cost</li>
                  <li>ROI = Profit ÷ Total Cost × 100</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
