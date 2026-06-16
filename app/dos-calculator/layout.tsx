import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

const description =
  "Assess current inventory, inventory days, stock movement, replenishment gaps, and suggested order quantity.";

export const metadata: Metadata = {
  title: "Inventory Replenishment Guidance",
  description,
  alternates: {
    canonical: "/dos-calculator",
  },
  openGraph: {
    title: "Inventory Replenishment Guidance | Store Management Toolkit",
    description,
    url: absoluteUrl("/dos-calculator"),
  },
};

export default function InventoryPlanningCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
