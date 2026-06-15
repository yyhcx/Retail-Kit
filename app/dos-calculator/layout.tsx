import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Replenishment Guidance | Retail Kit",
  description:
    "Assess inventory health, identify stock movement, and recommend replenishment.",
};

export default function InventoryPlanningCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
