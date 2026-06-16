export const siteUrl = "https://retailkit.vercel.app";

export const siteName = "Store Management Toolkit";

export const defaultDescription =
  "Retail store management toolkit for store diagnosis, sales target breakdown, inventory replenishment planning, and campaign ROI analysis.";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
