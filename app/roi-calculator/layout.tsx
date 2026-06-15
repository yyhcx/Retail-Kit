import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign ROI Analysis | Retail Kit",
  description: "Evaluate the return on retail campaign investment.",
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
