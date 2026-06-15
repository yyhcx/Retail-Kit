import type { Locale } from "@/locales";

export type PerformanceTier =
  | "loss-making"
  | "break-even"
  | "profitable"
  | "high-performing"
  | "pending";

type RatingCopy = {
  rating: string;
  health: string;
  recommendation: string;
};

const accentMap = {
  pending: {
    border: "border-slate-200",
    bg: "bg-slate-50",
    text: "text-slate-600",
    badge: "bg-slate-100 text-slate-600",
    cardHover: "hover:border-slate-300 hover:shadow-md",
    gradient: "from-slate-500 to-slate-600",
  },
  "loss-making": {
    border: "border-red-200",
    bg: "bg-red-50",
    text: "text-red-700",
    badge: "bg-red-100 text-red-700",
    cardHover: "hover:border-red-300 hover:shadow-red-100",
    gradient: "from-red-500 to-red-600",
  },
  "break-even": {
    border: "border-orange-200",
    bg: "bg-orange-50",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-700",
    cardHover: "hover:border-orange-300 hover:shadow-orange-100",
    gradient: "from-orange-500 to-orange-600",
  },
  profitable: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
    cardHover: "hover:border-blue-300 hover:shadow-blue-100",
    gradient: "from-blue-500 to-blue-600",
  },
  "high-performing": {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
    cardHover: "hover:border-emerald-300 hover:shadow-emerald-100",
    gradient: "from-emerald-500 to-emerald-600",
  },
} as const;

function getTier(roi: number, hasData: boolean): PerformanceTier {
  if (!hasData) return "pending";
  if (roi < 0) return "loss-making";
  if (roi <= 3) return "break-even";
  return "high-performing";
}

function getRatingCopy(
  tier: PerformanceTier,
  ratings: Locale["roiCalculator"]["ratings"],
): RatingCopy {
  switch (tier) {
    case "loss-making":
      return ratings.lossMaking;
    case "break-even":
      return ratings.breakEven;
    case "profitable":
      return ratings.profitable;
    case "high-performing":
      return ratings.highPerforming;
    default:
      return ratings.pending;
  }
}

export function getPerformance(
  roi: number,
  hasData: boolean,
  ratings: Locale["roiCalculator"]["ratings"],
) {
  const tier = getTier(roi, hasData);
  const copy = getRatingCopy(tier, ratings);

  return {
    tier,
    ...copy,
    accent: accentMap[tier],
  };
}
