import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

const description =
  "Evaluate campaign ROI, total cost, profit, expected return, and the main cost pressure behind a retail marketing activity.";

export const metadata: Metadata = {
  title: "Campaign ROI Analysis",
  description,
  alternates: {
    canonical: "/roi-calculator",
  },
  openGraph: {
    title: "Campaign ROI Analysis | Store Management Toolkit",
    description,
    url: absoluteUrl("/roi-calculator"),
  },
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
