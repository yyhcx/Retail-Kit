import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Target Breakdown | Retail Kit",
  description:
    "Break down sales targets across stores, staff and working days.",
};

export default function SalesTargetCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
