import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator | Retail Kit",
  description: "Calculate retail campaign ROI and profitability.",
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
