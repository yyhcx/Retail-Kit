import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

const description =
  "Browse retail management tools grouped by store operations tasks, including sales, inventory, campaign ROI, customer experience, and team management.";

export const metadata: Metadata = {
  title: "Tool Library",
  description,
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Tool Library | Store Management Toolkit",
    description,
    url: absoluteUrl("/tools"),
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
