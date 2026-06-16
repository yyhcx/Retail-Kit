import type { Locale } from "./en";

const zh = {
  common: {
    brand: "店长工具箱",
    getStarted: "开始诊断门店",
    allTools: "← 全部工具",
    loadDemoData: "加载演示数据",
    reset: "重置",
    explore: "探索",
    emDash: "—",
    units: "件",
    days: "天",
    currencySymbol: "¥",
    footer: "为零售团队提供实用的决策支持",
    feedbackPrefix: "如有任何建议，欢迎发送邮件至",
  },
  language: {
    label: "🌐",
    english: "English",
    chinese: "中文",
  },
  home: {
    title: "Retail Kit",
    subtitle: "面向零售经理的门店诊断与管理工具套件",
    gateway: {
      eyebrow: "门店经营入口",
      title: "门店诊断与工具箱",
      subtitle: "先诊断门店问题，快速找到原因；或者直接进入工具箱，按具体任务调用对应工具。",
      diagnose: {
        badge: "推荐",
        highlight: "",
        title: "门店诊断",
        description: "输入两个周期数据，快速定位销售下滑、目标未达成或门店表现异常背后的核心原因",
        points: [
          "问题归因判断",
          "关键指标拆解",
          "动作建议与工具推荐",
        ],
        cta: "进入门店诊断",
      },
      library: {
        badge: "常规",
        highlight: "",
        title: "工具箱",
        description: "按门店运营任务分组，帮助店长更快找到需要的工具",
        categories: ["销售表现", "库存管理", "利润与 ROI", "团队管理"],
        cta: "进入工具箱",
      },
    },
    toolsTitle: "工具箱",
    toolsSubtitle: "按门店运营任务分组，帮助店长更快找到需要的工具",
    diagnosis: {
      eyebrow: "推荐",
      title: "诊断我的门店",
      subtitle: "描述问题、对比基准周期，然后快速看清楚发生了什么、为什么发生、下一步该做什么",
      comparisonLabel: "对比周期",
      comparisonModeOptions: {
        week: "周对比",
        month: "月对比",
        year: "年对比",
      },
      periodOptions: {
        week: "上周",
        month: "上月",
        year: "去年同期",
      },
      currentPeriodOptions: {
        week: "本周",
        month: "本月",
        year: "本年",
      },
      currentPeriod: "当前周期",
      comparisonPeriod: "对比周期",
      metrics: {
        traffic: "店外客流",
        entryRate: "进店率",
        conversionRate: "成交率",
        asp: "平均客单价（ASP）",
      },
      helpers: {
        traffic: "门店外经过人流",
        entryRate: "进店顾客 / 店外客流 * 100%",
        conversionRate: "最终购买顾客 / 进店顾客 * 100%",
        asp: "平均订单金额",
      },
      buttons: {
        loadSample: "加载样例诊断",
        reset: "重置诊断",
      },
      inputBadge: "输入",
      emptyState: "输入两个周期的数据，以定位门店最主要的绩效驱动因素",
      emptyActions: "输入两个周期的数据后，将显示建议动作",
      emptyTools: "输入两个周期的数据后，将推荐相关工具",
      summary: {
        salesRevenue: "销售额",
        salesChange: "销售变化",
        primaryRootCause: "主要根因",
        breakdown: "根因拆解",
        nextActions: "建议动作",
        toolRecommendations: "推荐工具",
      },
      statuses: {
        improving: "改善中",
        declining: "下滑中",
        stable: "稳定",
        awaiting: "等待数据",
      },
      rootCauseTitles: {
        improving: "{metric}提升",
        declining: "{metric}下滑",
        stable: "{metric}变化",
        awaiting: "等待数据",
      },
      rootCauseMovement: "{metric}由 {benchmark} 变为 {current}",
      actions: {
        traffic: [
          "检查本地促销、付费曝光和周边商圈可见度",
          "复核地图列表、评价质量和附近商圈的投放覆盖",
          "按时段对比客流，找到下一次拉动的最佳窗口",
        ],
        entryRate: [
          "审查门头招牌、橱窗陈列和顾客进店前 10 秒体验",
          "检查排队处理、迎宾站位和高峰时段门口阻力",
          "按班次对比进店表现，把最强的开店动作复制到其他时段",
        ],
        conversionRate: [
          "辅导问候、需求挖掘和临门成交动作",
          "把激励对准成交率，而不仅仅是客流",
          "复盘高绩效员工，把最有效的销售动作固化成话术",
        ],
        asp: [
          "在收银和推荐环节推动加购、组合和高客单替代方案",
          "复盘高表现品类的连带率和升级推荐话术",
          "检查折扣是否在拉低 ASP 和毛利",
        ],
      },
      toolSuggestions: {
        traffic: ["门店诊断", "活动 ROI 分析", "销售目标拆解"],
        entryRate: ["门店诊断", "销售目标拆解"],
        conversionRate: ["销售目标拆解", "激励方案测算（未来）", "员工目标分配（未来）"],
        asp: ["连带销售分析（未来）", "活动 ROI 分析"],
      },
    },
    library: {
      title: "工具箱",
      subtitle: "按门店运营任务分组，帮助店长更快找到需要的工具",
      categories: {
        salesPerformance: "销售表现",
        inventoryManagement: "库存管理",
        profitRoi: "利润与 ROI",
        customerExperience: "客户体验",
        crossSelling: "连带销售",
        teamManagement: "团队管理",
      },
      badges: {
        flagship: "推荐",
        active: "可用",
        future: "未来",
      },
      toolCount: "{count} 个工具",
    },
    heroRoi: "活动ROI分析",
    heroSalesTarget: "销售目标拆解",
    heroInventoryPlanning: "库存备货建议",
  },
  tools: {
    salesRevenuePlanner: {
      name: "门店诊断",
      description: "快速定位销售下滑、目标未达成或门店表现异常背后的核心原因",
    },
    roi: {
      name: "活动 ROI 分析",
      description: "评估活动投入产出比",
    },
    inventoryPlanning: {
      name: "库存备货建议",
      description: "判断库存健康状态、库存趋势和补货需求",
      shortName: "库存备货",
    },
    salesTarget: {
      name: "销售目标拆解",
      description: "按门店和员工分解销售目标",
    },
    dailyRunRateTracker: {
      name: "每日销量追踪",
      description: "追踪每日销量进度与目标节奏",
    },
    profitCalculator: {
      name: "门店利润分析",
      description: "衡量门店层面的盈利能力",
    },
    reviewTargetTracker: {
      name: "顾客评价目标",
      description: "追踪客户评价目标与完成进度",
    },
    attachmentRateCalculator: {
      name: "连带销售分析",
      description: "优化连带销售和组合销售表现",
    },
    staffTargetAllocator: {
      name: "员工目标分配",
      description: "按团队结构分配销售目标",
    },
    staffScheduler: {
      name: "店长排班计划",
      description: "按客流高峰、覆盖缺口和员工可用时间安排班次",
    },
    incentiveSimulator: {
      name: "激励方案测算",
      description: "测试佣金和激励方案对销售目标的影响",
    },
  },
  roiCalculator: {
    badge: "活动分析",
    title: "活动ROI分析",
    subtitle: "评估零售营销活动的投入产出比",
    campaignHealth: "活动健康度",
    inputsTitle: "活动成本",
    inputsSubtitle: "输入各类相关成本和预期收益",
    inputs: {
      campaignCost: "营销成本",
      prizeCost: "奖品成本",
      staffCost: "人员成本",
      additionalRevenue: "预期收益",
    },
    results: {
      totalCost: "总成本",
      totalCostHint: "营销 + 奖品 + 人员",
      profit: "利润",
      profitHint: "收入 − 总成本",
      roi: "ROI %",
      roiHint: "利润 ÷ 总成本",
      roiLabel: "ROI",
    },
    performanceRating: "活动 ROI 评级",
    recommendation: "零售建议",
    costRecommendations: {
      campaignCost: {
        lossMaking:
          "本次活动出现亏损，营销成本占比最高，建议审查投放渠道、折扣力度和进店后的转化承接",
        breakEven:
          "本次活动回报有限，营销成本占比最高，建议优先优化投放渠道组合和门店转化承接",
        profitable:
          "本次活动回报健康，营销成本是主要投入，建议保留有效渠道并小幅测试更低成本的引流方式",
        highPerforming:
          "本次活动表现优秀，营销成本是主要投入，建议复制高效渠道并沉淀可复用的投放模板",
      },
      prizeCost: {
        lossMaking:
          "本次活动出现亏损，奖品成本占比最高，建议审查奖品机制、中奖门槛和赠品投入是否带来足够销售增量",
        breakEven:
          "本次活动回报有限，奖品成本占比最高，建议收紧奖品规则并让奖励更直接绑定购买行为",
        profitable:
          "本次活动回报健康，奖品成本是主要投入，建议保留当前权益但测试更轻量的奖励档位",
        highPerforming:
          "本次活动表现优秀，奖品成本是主要投入，建议把有效的奖励结构沉淀为可复用活动方案",
      },
      staffCost: {
        lossMaking:
          "本次活动出现亏损，人员成本占比最高，建议审查排班投入、临促配置和单人销售产出",
        breakEven:
          "本次活动回报有限，人员成本占比最高，建议把人员投入更集中到客流高峰时段",
        profitable:
          "本次活动回报健康，人员成本是主要投入，建议保留覆盖方式并继续提升单人销售效率",
        highPerforming:
          "本次活动表现优秀，人员成本是主要投入，建议在相似客流时段复用这套排班配置",
      },
    },
    ratings: {
      pending: {
        rating: "等待数据",
        health: "—",
        recommendation: "输入营销成本和预期收益以评估活动绩效",
      },
      lossMaking: {
        rating: "亏损",
        health: "亏损",
        recommendation: "本次活动出现亏损，请审查成本结构和转化表现",
      },
      breakEven: {
        rating: "正常",
        health: "正常",
        recommendation:
          "本次活动回报有限，考虑优化成本或提升销售转化率",
      },
      profitable: {
        rating: "正常",
        health: "正常",
        recommendation:
          "本次活动回报健康，可在小幅优化后重复开展",
      },
      highPerforming: {
        rating: "优异",
        health: "优异",
        recommendation:
          "本次活动表现卓越，考虑在更多门店推广复制",
      },
    },
  },
  salesTargetCalculator: {
    badge: "目标规划",
    title: "销售目标拆解",
    subtitle: "按门店、员工和工作日分解销售目标",
    inputsTitle: "数据输入",
    inputsSubtitle: "分别输入销售额目标、销量目标和团队结构",
    inputs: {
      monthlyRevenueTarget: "月度销售额目标",
      monthlyVolumeTarget: "月度销量目标",
      stores: "门店数量",
      staff: "员工数量",
      workingDays: "工作天数",
    },
    allocation: {
      average: "平均拆解",
      averageHint: "按门店、员工和工作日直接平均分配",
      weighted: "精细化拆解",
      weightedHint: "按历史销售能力计算门店和员工目标占比",
    },
    weightedInputs: {
      title: "历史能力数据",
      description:
        "按门店或员工顺序输入近 1-2 个月销售额和销量，用逗号分隔。系统会按历史占比分配新目标。",
      storeRevenue: "门店历史销售额",
      storeVolume: "门店历史销量",
      staffRevenue: "员工历史销售额",
      staffVolume: "员工历史销量",
      placeholder: "例如：120000, 95000, 85000",
    },
    results: {
      revenueTarget: "月度销售额目标",
      volumeTarget: "月度销量目标",
      revenuePerStore: "单店销售额",
      revenuePerStaff: "单人销售额",
      revenuePerDay: "每日销售额",
      volumePerStore: "单店销量",
      volumePerStaff: "单人销量",
      volumePerDay: "每日销量",
      storeAllocation: "门店目标分配",
      staffAllocation: "员工目标分配",
      byHistoryShare: "按历史占比",
      storePrefix: "门店",
      staffPrefix: "员工",
      perStore: "单店目标",
      perStoreHint: "月度目标 ÷ 门店数",
      perStaff: "单人目标",
      perStaffHint: "月度目标 ÷ 员工数",
      perDay: "每日目标",
      perDayHint: "月度目标 ÷ 工作天数",
      distributed:
        "分配至 {stores} 家门店、{staff} 名员工和 {workingDays} 个工作日。",
    },
    summary: {
      title: "摘要",
      heading: "目标拆解结果：",
      revenueLine:
        "销售额：单店 {storeAmount}，单人 {staffAmount}，每日 {dailyAmount}。",
      volumeLine:
        "销量：单店 {storeAmount}，单人 {staffAmount}，每日 {dailyAmount}。",
      weightedNote: "精细化拆解已按历史贡献占比分配门店和员工目标。",
      storeLine: "每家门店需完成 {amount}。",
      staffLine: "每位员工需完成 {amount}。",
      dailyLine: "每日销售目标为 {amount}。",
      empty: "输入销售额目标、销量目标和团队信息以查看个性化分解",
      invalid: "请输入有效的门店、员工和工作天数（大于零）以查看目标分解",
    },
  },
  inventoryPlanning: {
    badge: "库存规划",
    title: "库存备货建议",
    subtitle: "判断库存健康、识别库存趋势并给出补货建议",
    inventoryHealth: "库存健康度",
    inputsTitle: "库存情况",
    inputsSubtitle: "输入当前库存、28天进出库数据和目标库存天数",
    inputs: {
      currentInventory: "当前库存",
      currentInventoryHint: "当前库存件数",
      sellOut: "近28天出货量",
      sellOutHint: "过去28天销售出库总件数",
      sellIn: "近28天入库量",
      sellInHint: "过去28天收货入库总件数",
      targetDos: "目标库存天数",
      targetDosHint: "期望的库存覆盖天数",
    },
    sections: {
      health: "1. 库存判断",
      snapshot: "2. 关键指标",
      trend: "3. 库存趋势",
      targetAnalysis: "4. 目标库存分析",
      recommendedOrder: "5. 建议订货量",
      management: "6. 管理建议",
    },
    snapshot: {
      currentInventory: "当前库存",
      currentInventoryHint: "当前库存件数",
      dailySales: "日均销量",
      dailySalesHint: "出货量 ÷ 28",
      currentDos: "当前库存天数",
      currentDosHint: "库存 ÷ 日均销量",
    },
    health: {
      currentDosStatus: "当前库存天数状态",
    },
    trend: {
      movement: "28天进出库",
      pending: "输入入库和出库数据以分析库存变动",
      increasing: {
        label: "库存上升",
        description:
          "入库量超过出货量，密切监控库存天数，避免库存积压",
      },
      decreasing: {
        label: "库存下降",
        description:
          "出货量超过入库量，审查补货时机以维持货架供应",
      },
      stable: {
        label: "库存稳定",
        description:
          "进出库量平衡，维持当前订货节奏并跟踪每周波动",
      },
    },
    targetAnalysis: {
      targetInventory: "目标库存",
      targetInventoryHint: "目标库存天数 × 日均销量",
      inventoryGap: "库存缺口",
      inventoryGapHint: "当前库存 - 目标库存",
    },
    order: {
      replenishment: "补货订单",
      noOrderNeeded: "当前库存已达到或超过目标 — 无需订货",
      orderNeeded: "按此数量订货以达到目标库存水平",
      enterTarget: "输入目标库存天数以计算建议订货量",
    },
    healthLabels: {
      pending: { label: "等待数据", health: "—" },
      critical: { label: "危急", health: "🔴 危急" },
      healthy: { label: "健康", health: "🟢 健康" },
      slowMoving: { label: "滞销", health: "🟠 滞销" },
      overstock: { label: "积压", health: "🔵 积压" },
    },
    management: {
      pending:
        "输入库存、出货量、入库量和目标库存天数以生成补货和库存管理方案",
      critical: "库存覆盖严重不足，优先紧急补货以防止缺货",
      healthy: "库存水平处于健康库存天数范围内，继续标准补货流程",
      slowMoving:
        "库存周转慢于理想水平，审查在途订单并考虑跨店调拨",
      overstock:
        "检测到库存积压，暂停入库订单，推进促销清货或门店间调拨",
      trendIncreasing: "库存上升趋势表明入库超过需求 — 收紧订货量",
      trendDecreasing:
        "库存下降趋势表明出货强劲 — 在下个补货周期前确认交货周期",
      belowTarget: "低于目标库存 {units} 件",
      aboveTarget: "高于目标库存 {units} 件",
      alignedTarget: "当前库存与目标水平一致",
      placeOrder: "建议订货 {units} 件以达到目标库存",
      noReplenishment: "当前不建议补货订货",
      belowTargetDecreasing:
        "当前库存低于目标 {units} 件，且库存仍在下降，建议优先补货并在下一个高峰前确认到货周期",
      belowTargetIncreasing:
        "当前库存低于目标 {units} 件，但入库已高于出货，建议先跟进已在途库存，再判断是否追加订货",
      belowTargetStable:
        "当前库存低于目标 {units} 件，建议补货至目标库存水平",
      aboveTargetDecreasing:
        "当前库存高于目标 {units} 件，但库存正在下降，建议暂不补货，并在下个补货周期前复核在途订单",
      aboveTargetIncreasing:
        "当前库存高于目标 {units} 件，且库存仍在上升，建议暂停新增入库，并通过促销或跨店调拨降低库存",
      aboveTargetStable:
        "当前库存高于目标 {units} 件，建议暂不补货，持续观察周度出货直到库存回到目标区间",
      alignedDecreasing:
        "当前库存与目标基本一致，但库存正在下降，建议保持现有订货计划并确认下个周期到货时间",
      alignedIncreasing:
        "当前库存与目标基本一致，但库存正在上升，建议控制新增订货并关注积压风险",
      alignedStable:
        "当前库存与目标基本一致，进出库节奏稳定，建议维持当前补货节奏",
    },
  },
} satisfies Locale;

export default zh;
