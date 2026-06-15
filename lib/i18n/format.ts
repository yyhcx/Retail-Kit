import type { Language } from "@/locales";

export function formatCurrency(value: number, language: Language): string {
  const locale = language === "zh" ? "zh-CN" : "en-US";
  const currency = language === "zh" ? "CNY" : "USD";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatUnits(value: number, language: Language): string {
  const locale = language === "zh" ? "zh-CN" : "en-US";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDays(value: number, language: Language): string {
  const locale = language === "zh" ? "zh-CN" : "en-US";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
