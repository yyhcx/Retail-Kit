const en = {
  common: {
    brand: "Store Management Toolkit",
    getStarted: "Diagnose My Store",
    allTools: "← All Tools",
    loadDemoData: "Load Demo Data",
    reset: "Reset",
    explore: "Explore",
    emDash: "—",
    units: "units",
    days: "days",
    currencySymbol: "$",
    footer: "Practical decision support for retail teams.",
  },
  language: {
    label: "🌐",
    english: "English",
    chinese: "中文",
  },
  home: {
    title: "Retail Kit",
    subtitle: "A store diagnosis and management toolkit for retail managers.",
    gateway: {
      eyebrow: "Store manager entry",
      title: "What needs attention today?",
      subtitle:
        "Diagnose store issues to find the cause, or go straight into the tool library when the task is already clear.",
      diagnose: {
        badge: "Recommended",
        highlight: "",
        title: "Store Diagnosis",
        description:
          "This is the fastest place to start when sales are down, targets are being missed, or store performance feels off. Compare two periods and isolate the main driver.",
        points: [
          "Identify the primary issue",
          "Break down key store metrics",
          "Recommend actions and tools",
        ],
        cta: "Open Store Diagnosis",
      },
      library: {
        badge: "Standard",
        highlight: "",
        title: "Tool Library",
        description:
          "If the manager already knows what they need to work on, the library provides direct access to tools across sales, inventory, profit, customer experience, and team operations.",
        categories: ["Sales Performance", "Inventory Management", "Profit & ROI", "Team Management"],
        cta: "Open Tool Library",
      },
    },
    toolsTitle: "Tool Library",
    toolsSubtitle:
      "Advanced tools for managers who already know what problem they want to solve.",
    diagnosis: {
      eyebrow: "Recommended",
      title: "Diagnose My Store",
      subtitle:
        "Describe the problem, compare it to a benchmark period, and get a clear read on what changed, why it happened, and what to do next.",
      comparisonLabel: "Compare against",
      comparisonModeOptions: {
        week: "Week Comparison",
        month: "Month Comparison",
        year: "Year Comparison",
      },
      periodOptions: {
        week: "Last Week",
        month: "Last Month",
        year: "Last Year",
      },
      currentPeriodOptions: {
        week: "This Week",
        month: "This Month",
        year: "This Year",
      },
      currentPeriod: "Current Period",
      comparisonPeriod: "Comparison Period",
      metrics: {
        traffic: "Traffic",
        entryRate: "Entry Rate",
        conversionRate: "Conversion Rate",
        asp: "Average Selling Price (ASP)",
      },
      helpers: {
        traffic: "Store visits / shoppers",
        entryRate: "Shoppers entering the store",
        conversionRate: "Buying visitors",
        asp: "Average ticket size",
      },
      buttons: {
        loadSample: "Load Sample Diagnosis",
        reset: "Reset Diagnosis",
      },
      inputBadge: "Inputs",
      emptyState: "Enter both periods to isolate the store's main performance driver.",
      emptyActions: "Enter both periods to see the recommended actions.",
      emptyTools: "Enter both periods to surface suggested tools.",
      summary: {
        salesRevenue: "GMV",
        salesChange: "Sales Change",
        primaryRootCause: "Primary Root Cause",
        breakdown: "Driver Breakdown",
        nextActions: "Recommended Actions",
        toolRecommendations: "Recommended Tools",
      },
      statuses: {
        improving: "Improving",
        declining: "Declining",
        stable: "Stable",
        awaiting: "Awaiting data",
      },
      rootCauseTitles: {
        improving: "{metric} lift",
        declining: "{metric} decline",
        stable: "{metric} movement",
        awaiting: "Awaiting data",
      },
      rootCauseMovement: "{metric} moved from {benchmark} to {current}.",
      actions: {
        traffic: [
          "Review local promotions, paid reach, and neighborhood visibility.",
          "Check map listings, review quality, and campaign distribution in nearby catchments.",
          "Compare traffic by daypart to find the best window for the next push.",
        ],
        entryRate: [
          "Audit storefront signage, window displays, and the first 10-second experience.",
          "Review queue handling, greeter placement, and peak-hour friction at the door.",
          "Benchmark entry by shift so you can copy the strongest open-hour routines.",
        ],
        conversionRate: [
          "Coach greeting, need discovery, and close-rate behaviors on the shop floor.",
          "Align incentives to conversion, not just footfall.",
          "Review the best-performing staff and playbook the moments that move shoppers to buy.",
        ],
        asp: [
          "Push bundles, add-ons, and higher-value alternatives at the point of sale.",
          "Review attachment rate and trade-up scripts in your best categories.",
          "Protect margin by checking whether discounting is pulling ASP down.",
        ],
      },
      toolSuggestions: {
        traffic: [
          "Store Diagnosis",
          "Campaign ROI Analysis",
          "Sales Target Breakdown",
        ],
        entryRate: [
          "Store Diagnosis",
          "Sales Target Breakdown",
        ],
        conversionRate: [
          "Sales Target Breakdown",
          "Incentive Simulator (Future)",
          "Staff Target Allocator (Future)",
        ],
        asp: [
          "Attachment Rate Calculator (Future)",
          "Campaign ROI Analysis",
        ],
      },
    },
    library: {
      title: "Tool Library",
      subtitle:
        "Grouped by the operational job to be done, so managers can get to the right tool faster.",
      categories: {
        salesPerformance: "Sales Performance",
        inventoryManagement: "Inventory Management",
        profitRoi: "Profit & ROI",
        customerExperience: "Customer Experience",
        crossSelling: "Cross-Selling",
        teamManagement: "Team Management",
      },
      badges: {
        flagship: "Recommended",
        active: "Open",
        future: "Future",
      },
      toolCount: "{count} tools",
    },
    heroRoi: "Campaign ROI Analysis",
    heroSalesTarget: "Sales Target Breakdown",
    heroInventoryPlanning: "Inventory Replenishment Guidance",
  },
  tools: {
    salesRevenuePlanner: {
      name: "Store Diagnosis",
      description:
        "Quickly identify the core cause behind sales decline, missed targets, or abnormal store performance",
    },
    roi: {
      name: "Campaign ROI Analysis",
      description: "Evaluate campaign return on investment",
    },
    inventoryPlanning: {
      name: "Inventory Replenishment Guidance",
      description: "Assess inventory health, movement, and replenishment needs",
      shortName: "Inventory Guidance",
    },
    salesTarget: {
      name: "Sales Target Breakdown",
      description: "Break down sales targets by store and staff",
    },
    dailyRunRateTracker: {
      name: "Daily Run Rate Tracker",
      description: "Monitor daily sales pacing against target",
    },
    profitCalculator: {
      name: "Profit Calculator",
      description: "Measure store-level profitability",
    },
    reviewTargetTracker: {
      name: "Review Target Tracker",
      description: "Track customer review targets and progress",
    },
    attachmentRateCalculator: {
      name: "Attachment Rate Calculator",
      description: "Optimize cross-sell and bundle performance",
    },
    staffTargetAllocator: {
      name: "Staff Target Allocator",
      description: "Distribute sales targets across the team",
    },
    staffScheduler: {
      name: "Staff Scheduling Planner",
      description:
        "Match shifts to traffic peaks, coverage gaps, and staff availability",
    },
    incentiveSimulator: {
      name: "Incentive Simulator",
      description: "Test commission and incentive ideas against sales targets",
    },
  },
  roiCalculator: {
    badge: "Campaign Analytics",
    title: "Campaign ROI Analysis",
    subtitle: "Evaluate the return on retail campaign investment",
    campaignHealth: "Campaign Health",
    inputsTitle: "Campaign Costs",
    inputsSubtitle: "Enter related costs and expected return",
    inputs: {
      campaignCost: "Campaign Cost",
      prizeCost: "Prize Cost",
      staffCost: "Staff Cost",
      additionalRevenue: "Expected Return",
    },
    results: {
      totalCost: "Total Cost",
      totalCostHint: "Campaign + Prize + Staff",
      profit: "Profit",
      profitHint: "Revenue − Total Cost",
      roi: "ROI %",
      roiHint: "Profit ÷ Total Cost",
      roiLabel: "ROI",
    },
    performanceRating: "Campaign ROI Rating",
    recommendation: "Campaign Recommendation",
    costRecommendations: {
      campaignCost: {
        lossMaking:
          "This campaign lost money, and campaign cost is the largest spend, so review channel efficiency, discount depth, and store conversion from paid traffic.",
        breakEven:
          "This campaign generated limited returns, and campaign cost is the largest spend, so prioritize channel mix and in-store conversion follow-up.",
        profitable:
          "This campaign delivered healthy returns, and campaign cost is the main investment, so keep the effective channels while testing lower-cost traffic sources.",
        highPerforming:
          "This campaign performed strongly, and campaign cost is the main investment, so replicate the efficient channels and build a reusable campaign playbook.",
      },
      prizeCost: {
        lossMaking:
          "This campaign lost money, and prize cost is the largest spend, so review prize value, reward thresholds, and whether giveaways created enough incremental sales.",
        breakEven:
          "This campaign generated limited returns, and prize cost is the largest spend, so tighten reward rules and connect prizes more directly to purchase behavior.",
        profitable:
          "This campaign delivered healthy returns, and prize cost is the main investment, so preserve the offer but test lighter reward tiers.",
        highPerforming:
          "This campaign performed strongly, and prize cost is the main investment, so package the winning reward structure for repeat campaigns.",
      },
      staffCost: {
        lossMaking:
          "This campaign lost money, and staff cost is the largest spend, so review staffing hours, temporary labor, and sales output per person.",
        breakEven:
          "This campaign generated limited returns, and staff cost is the largest spend, so align staffing more closely with peak traffic windows.",
        profitable:
          "This campaign delivered healthy returns, and staff cost is the main investment, so keep the coverage model while improving sales productivity per person.",
        highPerforming:
          "This campaign performed strongly, and staff cost is the main investment, so reuse the staffing model for similar traffic periods.",
      },
    },
    ratings: {
      pending: {
        rating: "Awaiting Data",
        health: "—",
        recommendation:
          "Enter your campaign costs and additional revenue to evaluate performance.",
      },
      lossMaking: {
        rating: "Loss",
        health: "Loss",
        recommendation:
          "This campaign lost money. Review campaign costs and conversion performance.",
      },
      breakEven: {
        rating: "Normal",
        health: "Normal",
        recommendation:
          "This campaign generated limited returns. Consider optimizing costs or increasing sales conversion.",
      },
      profitable: {
        rating: "Normal",
        health: "Normal",
        recommendation:
          "This campaign delivered healthy returns and can be repeated with minor improvements.",
      },
      highPerforming: {
        rating: "Excellent",
        health: "Excellent",
        recommendation:
          "This campaign achieved outstanding performance. Consider scaling it across more stores.",
      },
    },
  },
  salesTargetCalculator: {
    badge: "Target Planning",
    title: "Sales Target Breakdown",
    subtitle: "Break down sales targets across stores, staff and working days.",
    inputsTitle: "Target Inputs",
    inputsSubtitle: "Enter revenue target, volume target, and team structure separately.",
    inputs: {
      monthlyRevenueTarget: "Monthly GMV Target",
      monthlyVolumeTarget: "Monthly Volume Target",
      stores: "Number of Stores",
      staff: "Number of Staff",
      workingDays: "Working Days",
    },
    allocation: {
      average: "Average Breakdown",
      averageHint: "Split targets evenly by stores, staff, and working days",
      weighted: "Weighted Breakdown",
      weightedHint: "Use historical sales capacity to calculate target share",
    },
    weightedInputs: {
      title: "Historical Capacity Data",
      description:
        "Enter the last 1-2 months of GMV and volume by store or staff member, separated by commas. Targets are allocated by historical share.",
      storeRevenue: "Store Historical GMV",
      storeVolume: "Store Historical Volume",
      staffRevenue: "Staff Historical GMV",
      staffVolume: "Staff Historical Volume",
      placeholder: "Example: 120000, 95000, 85000",
    },
    results: {
      revenueTarget: "Monthly GMV Target",
      volumeTarget: "Monthly Volume Target",
      revenuePerStore: "GMV Per Store",
      revenuePerStaff: "GMV Per Staff",
      revenuePerDay: "Daily GMV",
      volumePerStore: "Volume Per Store",
      volumePerStaff: "Volume Per Staff",
      volumePerDay: "Daily Volume",
      storeAllocation: "Store Target Allocation",
      staffAllocation: "Staff Target Allocation",
      byHistoryShare: "By historical share",
      storePrefix: "Store",
      staffPrefix: "Staff",
      perStore: "Target Per Store",
      perStoreHint: "Monthly Target ÷ Stores",
      perStaff: "Target Per Staff",
      perStaffHint: "Monthly Target ÷ Staff",
      perDay: "Target Per Day",
      perDayHint: "Monthly Target ÷ Working Days",
      distributed:
        "Distributed across {stores} stores, {staff} staff, and {workingDays} working days.",
    },
    summary: {
      title: "Summary",
      heading: "Target breakdown:",
      revenueLine:
        "GMV: {storeAmount} per store, {staffAmount} per staff member, {dailyAmount} per day.",
      volumeLine:
        "Volume: {storeAmount} per store, {staffAmount} per staff member, {dailyAmount} per day.",
      weightedNote:
        "Weighted breakdown allocates store and staff targets by historical contribution share.",
      storeLine: "Each store must generate {amount}.",
      staffLine: "Each staff member must generate {amount}.",
      dailyLine: "Required daily sales is {amount}.",
      empty:
        "Enter revenue target, volume target, and team details to see a personalized breakdown.",
      invalid:
        "Enter valid store, staff, and working day counts (greater than zero) to see your target breakdown.",
    },
  },
  inventoryPlanning: {
    badge: "Inventory Planning",
    title: "Inventory Replenishment Guidance",
    subtitle:
      "Assess inventory health, identify stock movement, and recommend replenishment",
    inventoryHealth: "Inventory Health",
    inputsTitle: "Inventory Status",
    inputsSubtitle: "Enter current inventory, 28-day movement, and target coverage",
    inputs: {
      currentInventory: "Current Inventory",
      currentInventoryHint: "Current inventory units",
      sellOut: "Sell-Out Last 28 Days",
      sellOutHint: "Total units sold in the past 28 days",
      sellIn: "Sell-In Last 28 Days",
      sellInHint: "Total units received in the past 28 days",
      targetDos: "Target DOS",
      targetDosHint: "Desired days of stock coverage",
    },
    sections: {
      health: "1. Inventory Decision",
      snapshot: "2. Key Metrics",
      trend: "3. Inventory Trend",
      targetAnalysis: "4. Target Inventory Analysis",
      recommendedOrder: "5. Recommended Order Quantity",
      management: "6. Management Recommendation",
    },
    snapshot: {
      currentInventory: "Current Inventory",
      currentInventoryHint: "On-hand stock",
      dailySales: "Daily Sales",
      dailySalesHint: "Sell-Out ÷ 28",
      currentDos: "Current DOS",
      currentDosHint: "Inventory ÷ Daily Sales",
    },
    health: {
      currentDosStatus: "Current DOS Status",
    },
    trend: {
      movement: "28-Day Movement",
      pending:
        "Enter sell-in and sell-out data to analyze inventory movement",
      increasing: {
        label: "Inventory Increasing",
        description:
          "Inbound receipts are outpacing sell-through. Monitor DOS closely to avoid overstock buildup.",
      },
      decreasing: {
        label: "Inventory Decreasing",
        description:
          "Sell-through is exceeding inbound supply. Review replenishment timing to maintain shelf availability.",
      },
      stable: {
        label: "Inventory Stable",
        description:
          "Inbound and outbound volumes are balanced. Maintain current ordering patterns and track weekly variance.",
      },
    },
    targetAnalysis: {
      targetInventory: "Target Inventory",
      targetInventoryHint: "Target DOS × Daily Sales",
      inventoryGap: "Inventory Gap",
      inventoryGapHint: "Current Inventory - Target Inventory",
    },
    order: {
      replenishment: "Replenishment Order",
      noOrderNeeded:
        "Current inventory meets or exceeds target — no order needed.",
      orderNeeded: "Order this quantity to reach target inventory level.",
      enterTarget: "Enter target DOS to calculate recommended order",
    },
    healthLabels: {
      pending: { label: "Awaiting Data", health: "—" },
      critical: { label: "Critical", health: "🔴 Critical" },
      healthy: { label: "Healthy", health: "🟢 Healthy" },
      slowMoving: { label: "Slow Moving", health: "🟠 Slow Moving" },
      overstock: { label: "Overstock", health: "🔵 Overstock" },
    },
    management: {
      pending:
        "Enter inventory, sell-through, sell-in, and target DOS to generate a replenishment and inventory management plan",
      critical:
        "Stock coverage is critically low. Prioritize immediate replenishment to prevent stockouts.",
      healthy:
        "Inventory levels are within the healthy DOS range. Continue standard replenishment practices.",
      slowMoving:
        "Inventory is moving slower than ideal. Review open POs and consider reallocating stock across locations.",
      overstock:
        "Overstock detected. Pause inbound orders and focus on promotional sell-down or inter-store transfers.",
      trendIncreasing:
        "Rising inventory trend suggests inbound is exceeding demand — tighten order quantities.",
      trendDecreasing:
        "Declining inventory trend signals strong sell-through — validate lead times before the next reorder cycle.",
      belowTarget: "You are {units} units below target inventory.",
      aboveTarget: "You are {units} units above target inventory.",
      alignedTarget: "Current inventory aligns with your target level.",
      placeOrder:
        "Place a recommended order of {units} units to reach target inventory.",
      noReplenishment: "No replenishment order is recommended at this time.",
      belowTargetDecreasing:
        "Inventory is {units} units below target and still decreasing, prioritize replenishment and confirm lead time before the next peak demand window.",
      belowTargetIncreasing:
        "Inventory is {units} units below target but inbound is already exceeding sell-through, monitor incoming stock before placing additional orders.",
      belowTargetStable:
        "Inventory is {units} units below target, place a replenishment order to restore target coverage.",
      aboveTargetDecreasing:
        "Inventory is {units} units above target but is moving down, do not replenish now and review open inbound orders before the next cycle.",
      aboveTargetIncreasing:
        "Inventory is {units} units above target and still increasing, pause inbound orders and accelerate sell-down or inter-store transfers.",
      aboveTargetStable:
        "Inventory is {units} units above target, do not replenish now and monitor weekly sell-through until stock returns to target.",
      alignedDecreasing:
        "Inventory is aligned with target but trending down, keep the current order plan and confirm lead time before the next cycle.",
      alignedIncreasing:
        "Inventory is aligned with target but trending up, keep replenishment conservative and watch for overstock risk.",
      alignedStable:
        "Inventory is aligned with target and movement is stable, maintain the current replenishment rhythm.",
    },
  },
} as const;

export default en;

type DeepString<T> = {
  [K in keyof T]: T[K] extends object ? DeepString<T[K]> : string;
};

export type Locale = DeepString<typeof en>;
