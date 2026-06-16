import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

const description =
  "Compare two periods of store data to identify the core cause behind sales decline, missed targets, or abnormal store performance.";

export const metadata: Metadata = {
  title: "Store Diagnosis",
  description,
  alternates: {
    canonical: "/diagnose",
  },
  openGraph: {
    title: "Store Diagnosis | Store Management Toolkit",
    description,
    url: absoluteUrl("/diagnose"),
  },
};

export default function DiagnoseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
