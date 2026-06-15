export type MetricKey = "traffic" | "entryRate" | "conversionRate" | "asp";
export type ComparisonPeriod = "week" | "month" | "year";
export type ToolKey =
  | "salesRevenuePlanner"
  | "salesTarget"
  | "dailyRunRateTracker"
  | "inventoryPlanning"
  | "roi"
  | "profitCalculator"
  | "reviewTargetTracker"
  | "attachmentRateCalculator"
  | "staffScheduler"
  | "staffTargetAllocator"
  | "incentiveSimulator";
export type CategoryKey =
  | "salesPerformance"
  | "inventoryManagement"
  | "profitRoi"
  | "customerExperience"
  | "crossSelling"
  | "teamManagement";

export type MetricValues = Record<MetricKey, string>;
export type ToolStatus = "active" | "future";

export type AnalysisDriver = {
  key: MetricKey;
  label: string;
  current: number;
  benchmark: number;
  absoluteDelta: number;
  relativeDelta: number | null;
};

export const DEFAULT_CURRENT: MetricValues = {
  traffic: "1020",
  entryRate: "39",
  conversionRate: "24",
  asp: "49",
};

export const DEFAULT_BENCHMARK: MetricValues = {
  traffic: "1200",
  entryRate: "40",
  conversionRate: "24",
  asp: "49",
};

export const METRIC_ORDER: MetricKey[] = [
  "traffic",
  "entryRate",
  "conversionRate",
  "asp",
];

export const TOOL_LINKS: Record<
  ToolKey,
  { href?: string; status: ToolStatus; flagship?: boolean }
> = {
  salesRevenuePlanner: { href: "/diagnose", status: "active", flagship: true },
  salesTarget: { href: "/sales-target-calculator", status: "active" },
  dailyRunRateTracker: { status: "future" },
  inventoryPlanning: { href: "/dos-calculator", status: "active" },
  roi: { href: "/roi-calculator", status: "active" },
  profitCalculator: { status: "future" },
  reviewTargetTracker: { status: "future" },
  attachmentRateCalculator: { status: "future" },
  staffScheduler: { status: "future" },
  staffTargetAllocator: { status: "future" },
  incentiveSimulator: { status: "future" },
};

export const TOOL_CATEGORIES: Array<{
  key: CategoryKey;
  toolKeys: ToolKey[];
}> = [
  {
    key: "salesPerformance",
    toolKeys: ["salesRevenuePlanner", "salesTarget", "dailyRunRateTracker"],
  },
  {
    key: "inventoryManagement",
    toolKeys: ["inventoryPlanning"],
  },
  {
    key: "profitRoi",
    toolKeys: ["roi", "profitCalculator"],
  },
  {
    key: "customerExperience",
    toolKeys: ["reviewTargetTracker"],
  },
  {
    key: "crossSelling",
    toolKeys: ["attachmentRateCalculator"],
  },
  {
    key: "teamManagement",
    toolKeys: ["staffScheduler", "staffTargetAllocator", "incentiveSimulator"],
  },
];
