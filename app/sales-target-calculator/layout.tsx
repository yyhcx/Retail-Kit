import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

const description =
  "Break down monthly sales amount and sales volume targets across stores, staff, and working days.";

export const metadata: Metadata = {
  title: "Sales Target Breakdown",
  description,
  alternates: {
    canonical: "/sales-target-calculator",
  },
  openGraph: {
    title: "Sales Target Breakdown | Store Management Toolkit",
    description,
    url: absoluteUrl("/sales-target-calculator"),
  },
};

export default function SalesTargetCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
