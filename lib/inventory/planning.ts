import type { Locale } from "@/locales";
import { interpolate } from "@/lib/i18n/interpolate";

export type HealthTier =
  | "critical"
  | "healthy"
  | "slow-moving"
  | "overstock"
  | "pending";

export type TrendTier = "increasing" | "decreasing" | "stable" | "pending";

const healthAccentMap = {
  pending: {
    border: "border-slate-200",
    bg: "bg-slate-50",
    text: "text-slate-600",
    badge: "bg-slate-100 text-slate-600",
    gradient: "from-slate-500 to-slate-600",
    cardHover: "hover:border-slate-300 hover:shadow-md",
  },
  critical: {
    border: "border-red-200",
    bg: "bg-red-50",
    text: "text-red-700",
    badge: "bg-red-100 text-red-700",
    gradient: "from-red-500 to-red-600",
    cardHover: "hover:border-red-300 hover:shadow-red-100",
  },
  healthy: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
    gradient: "from-emerald-500 to-emerald-600",
    cardHover: "hover:border-emerald-300 hover:shadow-emerald-100",
  },
  "slow-moving": {
    border: "border-orange-200",
    bg: "bg-orange-50",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-700",
    gradient: "from-orange-500 to-orange-600",
    cardHover: "hover:border-orange-300 hover:shadow-orange-100",
  },
  overstock: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
    gradient: "from-blue-500 to-blue-600",
    cardHover: "hover:border-blue-300 hover:shadow-blue-100",
  },
} as const;

function getHealthTier(dos: number, canCalculate: boolean): HealthTier {
  if (!canCalculate) return "pending";
  if (dos < 14) return "critical";
  if (dos < 30) return "healthy";
  if (dos <= 45) return "slow-moving";
  return "overstock";
}

export function getHealth(
  dos: number,
  canCalculate: boolean,
  labels: Locale["inventoryPlanning"]["healthLabels"],
) {
  const tier = getHealthTier(dos, canCalculate);
  const label = labels[tier === "slow-moving" ? "slowMoving" : tier];

  return {
    tier,
    label: label.label,
    health: label.health,
    accent: healthAccentMap[tier],
  };
}

export function getTrend(
  sellIn: number,
  sellOut: number,
  hasTrendInput: boolean,
  trendCopy: Locale["inventoryPlanning"]["trend"],
) {
  if (!hasTrendInput) {
    return {
      tier: "pending" as TrendTier,
      label: "—",
      description: trendCopy.pending,
    };
  }

  if (sellIn > sellOut) {
    return {
      tier: "increasing" as TrendTier,
      label: trendCopy.increasing.label,
      description: trendCopy.increasing.description,
    };
  }

  if (sellIn < sellOut) {
    return {
      tier: "decreasing" as TrendTier,
      label: trendCopy.decreasing.label,
      description: trendCopy.decreasing.description,
    };
  }

  return {
    tier: "stable" as TrendTier,
    label: trendCopy.stable.label,
    description: trendCopy.stable.description,
  };
}

export function getManagementRecommendation(
  healthTier: HealthTier,
  trendTier: TrendTier,
  recommendedOrder: number | null,
  inventoryGap: number | null,
  canCalculateTarget: boolean,
  copy: Locale["inventoryPlanning"]["management"],
  formatUnits: (value: number) => string,
): string {
  if (healthTier === "pending") {
    return copy.pending;
  }

  if (canCalculateTarget && inventoryGap !== null) {
    const units = formatUnits(Math.abs(inventoryGap));

    if (inventoryGap < 0) {
      if (trendTier === "decreasing") {
        return interpolate(copy.belowTargetDecreasing, { units });
      }

      if (trendTier === "increasing") {
        return interpolate(copy.belowTargetIncreasing, { units });
      }

      return interpolate(copy.belowTargetStable, { units });
    }

    if (inventoryGap > 0) {
      if (trendTier === "decreasing") {
        return interpolate(copy.aboveTargetDecreasing, { units });
      }

      if (trendTier === "increasing") {
        return interpolate(copy.aboveTargetIncreasing, { units });
      }

      return interpolate(copy.aboveTargetStable, { units });
    }

    if (trendTier === "decreasing") {
      return copy.alignedDecreasing;
    }

    if (trendTier === "increasing") {
      return copy.alignedIncreasing;
    }

    return copy.alignedStable;
  }

  const parts: string[] = [];

  if (healthTier === "critical") parts.push(copy.critical);
  else if (healthTier === "healthy") parts.push(copy.healthy);
  else if (healthTier === "slow-moving") parts.push(copy.slowMoving);
  else parts.push(copy.overstock);

  if (trendTier === "increasing") parts.push(copy.trendIncreasing);
  else if (trendTier === "decreasing") parts.push(copy.trendDecreasing);

  if (canCalculateTarget && inventoryGap !== null) {
    if (inventoryGap < 0) {
      parts.push(
        interpolate(copy.belowTarget, {
          units: formatUnits(Math.abs(inventoryGap)),
        }),
      );
    } else if (inventoryGap > 0) {
      parts.push(
        interpolate(copy.aboveTarget, { units: formatUnits(inventoryGap) }),
      );
    } else {
      parts.push(copy.alignedTarget);
    }
  }

  if (recommendedOrder !== null) {
    if (recommendedOrder > 0) {
      parts.push(
        interpolate(copy.placeOrder, { units: formatUnits(recommendedOrder) }),
      );
    } else {
      parts.push(copy.noReplenishment);
    }
  }

  return parts.join(" ");
}
