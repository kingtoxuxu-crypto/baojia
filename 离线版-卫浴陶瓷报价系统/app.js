const bomCatalog = [
  {
    key: "ceramicBody",
    label: "Ceramic Body 陶瓷坯体",
    items: [
      { id: "body-clay", name: "坐便主体泥料", unit: "set" },
      { id: "tank-clay", name: "水箱 / 副体泥料", unit: "set" },
      { id: "body-additive", name: "胚体辅料与化工", unit: "set" }
    ]
  },
  {
    key: "glaze",
    label: "Glaze 釉料与表面",
    items: [
      { id: "glaze-raw", name: "基础釉料", unit: "set" },
      { id: "glaze-upgrade", name: "纳米釉 / 特殊釉加价", unit: "set" }
    ]
  },
  {
    key: "ceramicProcess",
    label: "Ceramic Process 成型与烧成",
    items: [
      { id: "forming-labor", name: "成型人工", unit: "set" },
      { id: "glazing-labor", name: "施釉人工", unit: "set" },
      { id: "firing-energy", name: "窑炉燃气电耗", unit: "set" },
      { id: "finishing-qc", name: "修补检验与试水", unit: "set" }
    ]
  },
  {
    key: "yieldLoss",
    label: "Yield Loss 合格率与返工",
    items: [
      { id: "yield-reserve", name: "合格率损耗预留", unit: "set" },
      { id: "rework-reserve", name: "返工返修预留", unit: "set" }
    ]
  },
  {
    key: "accessories",
    label: "Accessories 配件系统",
    items: [
      { id: "flush-fitting", name: "水件", unit: "set" },
      { id: "seat-cover", name: "盖板", unit: "set" },
      { id: "install-kit", name: "安装辅件包", unit: "set" },
      { id: "accessory-other", name: "其他五金 / 配套件", unit: "set" }
    ]
  },
  {
    key: "package",
    label: "Package 包装方案",
    items: [
      { id: "inner-pack", name: "内包材 / 泡沫", unit: "set" },
      { id: "outer-carton", name: "外箱", unit: "set" },
      { id: "pallet-protection", name: "托盘 / 护角 / 缠绕膜", unit: "set" },
      { id: "manual-label", name: "说明书 / 标签 / 条码", unit: "set" }
    ]
  },
  {
    key: "compliance",
    label: "Compliance 认证与检测",
    items: [
      { id: "certification-amort", name: "认证费用摊销", unit: "set" },
      { id: "inspection-testing", name: "验货 / 测试费用摊销", unit: "set" }
    ]
  },
  {
    key: "tooling",
    label: "Tooling 模具与开发",
    items: [
      { id: "mold-amort", name: "模具摊销", unit: "set" },
      { id: "sample-development", name: "打样与开发摊销", unit: "set" }
    ]
  },
  {
    key: "indirect",
    label: "Indirect Cost 管理与制造间接",
    items: [
      { id: "management-overhead", name: "管理费用分摊", unit: "set" },
      { id: "utilities-overhead", name: "车间与公用耗费分摊", unit: "set" }
    ]
  }
];

const budgetCatalog = bomCatalog.map((category) => ({
  key: category.key,
  label: `${category.label} 总费用`,
  items: category.items.map((item) => ({
    ...item,
    unit: "batch"
  }))
}));

const costGroups = [
  {
    label: "陶瓷与工艺",
    categories: ["ceramicBody", "glaze", "ceramicProcess", "yieldLoss"]
  },
  {
    label: "配件系统",
    categories: ["accessories"]
  },
  {
    label: "包装与出货",
    categories: ["package"]
  },
  {
    label: "认证与管理",
    categories: ["compliance", "tooling", "indirect"]
  }
];

const customItemPresets = {
  ceramicBody: [
    { name: "高白泥升级", unit: "set" },
    { name: "虹吸管道补料", unit: "set" },
    { name: "加强筋补泥", unit: "set" },
    { name: "色坯辅料", unit: "set" }
  ],
  glaze: [
    { name: "纳米易洁釉升级", unit: "set" },
    { name: "抗菌釉升级", unit: "set" },
    { name: "色釉 / 哑光釉", unit: "set" },
    { name: "补釉材料", unit: "set" }
  ],
  ceramicProcess: [
    { name: "修坯人工", unit: "set" },
    { name: "擦釉人工", unit: "set" },
    { name: "二次烧成能耗", unit: "set" },
    { name: "冲水测试人工", unit: "set" }
  ],
  yieldLoss: [
    { name: "坯裂损耗预留", unit: "set" },
    { name: "烧成变形损耗", unit: "set" },
    { name: "釉面不良损耗", unit: "set" },
    { name: "包装破损损耗", unit: "set" }
  ],
  accessories: [
    { name: "法兰密封圈", unit: "set" },
    { name: "地脚螺丝包", unit: "set" },
    { name: "角阀软管", unit: "set" },
    { name: "隐藏水箱 / 挂架", unit: "set" },
    { name: "冲水按键面板", unit: "set" }
  ],
  package: [
    { name: "珍珠棉内袋", unit: "set" },
    { name: "护角泡沫", unit: "set" },
    { name: "彩印外箱", unit: "set" },
    { name: "跌落测试加强包材", unit: "set" },
    { name: "条码 / 唛头标签", unit: "set" }
  ],
  compliance: [
    { name: "cUPC 认证摊销", unit: "set" },
    { name: "WaterSense 摊销", unit: "set" },
    { name: "EN997 测试摊销", unit: "set" },
    { name: "MAP 测试摊销", unit: "set" },
    { name: "第三方验货摊销", unit: "set" }
  ],
  tooling: [
    { name: "新模费摊销", unit: "set" },
    { name: "改模费摊销", unit: "set" },
    { name: "打样费摊销", unit: "set" },
    { name: "包装版费摊销", unit: "set" }
  ],
  indirect: [
    { name: "仓储分摊", unit: "set" },
    { name: "设备维护分摊", unit: "set" },
    { name: "环保处理分摊", unit: "set" },
    { name: "车间耗材分摊", unit: "set" }
  ]
};

const supplierPriceLibrary = {
  seatCoverGrade: {
    "PP 缓降": { itemId: "seat-cover", unitPrice: 24, note: "PP 缓降盖板标准价" },
    "UF 缓降": { itemId: "seat-cover", unitPrice: 27, note: "UF 缓降盖板标准价" },
    "薄盖快拆": { itemId: "seat-cover", unitPrice: 31, note: "薄盖快拆升级价" },
    "不含盖板": { itemId: "seat-cover", unitPrice: 0, note: "不含盖板" }
  },
  glazeLevel: {
    "标准自洁釉": { itemId: "glaze-upgrade", unitPrice: 6, note: "标准自洁釉口径" },
    "高亮纳米釉": { itemId: "glaze-upgrade", unitPrice: 10, note: "纳米釉升级价" },
    "抗菌易洁釉": { itemId: "glaze-upgrade", unitPrice: 13, note: "抗菌易洁釉升级价" }
  },
  packageGrade: {
    "常规出口 5 层箱": {
      "inner-pack": 8,
      "outer-carton": 14,
      "pallet-protection": 6,
      "manual-label": 3.3
    },
    "加强型 5 层箱": {
      "inner-pack": 10,
      "outer-carton": 17,
      "pallet-protection": 7,
      "manual-label": 3.8
    },
    "彩印箱": {
      "inner-pack": 9,
      "outer-carton": 20,
      "pallet-protection": 6.5,
      "manual-label": 4.5
    },
    "电商抗摔包装": {
      "inner-pack": 13,
      "outer-carton": 24,
      "pallet-protection": 8.5,
      "manual-label": 5.2
    }
  },
  certificationKeywords: [
    { keyword: "CUPC", unitPrice: 1.8, note: "cUPC 认证摊销" },
    { keyword: "WATERSENSE", unitPrice: 0.6, note: "WaterSense 摊销" },
    { keyword: "EN997", unitPrice: 1.2, note: "EN997 摊销" },
    { keyword: "CE", unitPrice: 0.5, note: "CE 摊销" },
    { keyword: "MAP", unitPrice: 0.9, note: "MAP 测试摊销" },
    { keyword: "ISTA", unitPrice: 1.1, note: "跌落测试摊销" },
    { keyword: "SASO", unitPrice: 0.9, note: "SASO 摊销" }
  ],
  tradeTerms: {
    EXW: {
      label: "EXW 出厂价",
      includeExport: false,
      includeOcean: false,
      includeInsurance: false,
      includeDestination: false,
      desc: "仅含工厂产品成本，不含出口与海运段费用"
    },
    FOB: {
      label: "FOB 离岸价",
      includeExport: true,
      includeOcean: false,
      includeInsurance: false,
      includeDestination: false,
      desc: "含出运前费用，不含海运与目的港费用"
    },
    CFR: {
      label: "CFR 成本加运费",
      includeExport: true,
      includeOcean: true,
      includeInsurance: false,
      includeDestination: false,
      desc: "含海运，不含保险与目的港派送"
    },
    CIF: {
      label: "CIF 到港价",
      includeExport: true,
      includeOcean: true,
      includeInsurance: true,
      includeDestination: false,
      desc: "含海运和保险，不含目的港清关派送"
    },
    DDP: {
      label: "DDP 完税后交货",
      includeExport: true,
      includeOcean: true,
      includeInsurance: true,
      includeDestination: true,
      desc: "含从工厂到客户地全部运输与交付口径"
    }
  },
  ceramicMaterialRates: {
    default: { clayCostPerKg: 2.18, glazeCostPerKg: 4.9, additiveCostPerKgClay: 0.2 }
  },
  ceramicProcessProfiles: {
    "two-piece": { clayInputRatio: 1.38, tankClayShare: 0.24, glazeUsePerKgNet: 0.085, formingLaborPerKgNet: 0.34, glazingLaborPerKgNet: 0.18, firingEnergyPerKgNet: 0.43, finishingQcPerUnit: 5.6, yieldLossRate: 0.055, reworkRate: 0.022 },
    "one-piece": { clayInputRatio: 1.43, tankClayShare: 0, glazeUsePerKgNet: 0.092, formingLaborPerKgNet: 0.36, glazingLaborPerKgNet: 0.19, firingEnergyPerKgNet: 0.47, finishingQcPerUnit: 6.4, yieldLossRate: 0.058, reworkRate: 0.024 },
    "wall-hung": { clayInputRatio: 1.33, tankClayShare: 0, glazeUsePerKgNet: 0.082, formingLaborPerKgNet: 0.35, glazingLaborPerKgNet: 0.18, firingEnergyPerKgNet: 0.45, finishingQcPerUnit: 5.8, yieldLossRate: 0.057, reworkRate: 0.022 },
    "pedestal-basin": { clayInputRatio: 1.24, tankClayShare: 0, glazeUsePerKgNet: 0.076, formingLaborPerKgNet: 0.31, glazingLaborPerKgNet: 0.16, firingEnergyPerKgNet: 0.36, finishingQcPerUnit: 4.8, yieldLossRate: 0.048, reworkRate: 0.018 },
    "countertop-basin": { clayInputRatio: 1.2, tankClayShare: 0, glazeUsePerKgNet: 0.074, formingLaborPerKgNet: 0.29, glazingLaborPerKgNet: 0.15, firingEnergyPerKgNet: 0.34, finishingQcPerUnit: 4.4, yieldLossRate: 0.045, reworkRate: 0.017 },
    "undercounter-basin": { clayInputRatio: 1.18, tankClayShare: 0, glazeUsePerKgNet: 0.072, formingLaborPerKgNet: 0.28, glazingLaborPerKgNet: 0.15, firingEnergyPerKgNet: 0.33, finishingQcPerUnit: 4.2, yieldLossRate: 0.044, reworkRate: 0.016 },
    "semi-pedestal-basin": { clayInputRatio: 1.23, tankClayShare: 0, glazeUsePerKgNet: 0.076, formingLaborPerKgNet: 0.31, glazingLaborPerKgNet: 0.16, firingEnergyPerKgNet: 0.36, finishingQcPerUnit: 4.8, yieldLossRate: 0.048, reworkRate: 0.018 },
    "seat-cover": { clayInputRatio: 0, tankClayShare: 0, glazeUsePerKgNet: 0, formingLaborPerKgNet: 0, glazingLaborPerKgNet: 0, firingEnergyPerKgNet: 0, finishingQcPerUnit: 0.6, yieldLossRate: 0.01, reworkRate: 0.005 }
  },
  factoryMonthlyRates: {
    default: { monthlyOutputUnits: 18000, managementMonthly: 126000, utilitiesMonthly: 88000, workshopSupportMonthly: 42000, maintenanceMonthly: 18000 }
  },
  factoryPersonnel: {
    default: {
      forming: { label: "成型班组", linkedRow: "forming-labor", headcount: 18, avgMonthlySalary: 6200, allocationRate: 1 },
      glazing: { label: "施釉班组", linkedRow: "glazing-labor", headcount: 10, avgMonthlySalary: 6000, allocationRate: 1 },
      finishingQc: { label: "修补质检", linkedRow: "finishing-qc", headcount: 8, avgMonthlySalary: 5800, allocationRate: 1 },
      kiln: { label: "窑炉班组", linkedRow: "utilities-overhead", headcount: 6, avgMonthlySalary: 7200, allocationRate: 1 },
      workshopSupport: { label: "车间辅助", linkedRow: "utilities-overhead", headcount: 7, avgMonthlySalary: 5400, allocationRate: 0.9 },
      management: { label: "车间管理", linkedRow: "management-overhead", headcount: 4, avgMonthlySalary: 9800, allocationRate: 1 }
    }
  },
  factoryProcessStages: {
    default: {
      forming: { label: "成型", linkedRow: "forming-labor", standardMinutes: 18, costFactor: 1 },
      glazing: { label: "施釉", linkedRow: "glazing-labor", standardMinutes: 10, costFactor: 1 },
      firing: { label: "烧成", linkedRow: "firing-energy", standardMinutes: 780, costFactor: 1 },
      finishing: { label: "修补质检", linkedRow: "finishing-qc", standardMinutes: 14, costFactor: 1 }
    }
  },
  smartPackaging: {
    templatePadding: {
      "two-piece": { outerPaddingPerSide: 15, innerPaddingPerSide: 5, cartonArealDensityKgPerSqm: 0.82, accessoryWeightPerUnit: 4.2 },
      "one-piece": { outerPaddingPerSide: 15, innerPaddingPerSide: 5, cartonArealDensityKgPerSqm: 0.82, accessoryWeightPerUnit: 5.2 },
      "wall-hung": { outerPaddingPerSide: 15, innerPaddingPerSide: 5, cartonArealDensityKgPerSqm: 0.82, accessoryWeightPerUnit: 3.6 },
      "pedestal-basin": { outerPaddingPerSide: 15, innerPaddingPerSide: 5, cartonArealDensityKgPerSqm: 0.82, accessoryWeightPerUnit: 3.1 },
      "countertop-basin": { outerPaddingPerSide: 14, innerPaddingPerSide: 5, cartonArealDensityKgPerSqm: 0.8, accessoryWeightPerUnit: 2.1 },
      "undercounter-basin": { outerPaddingPerSide: 14, innerPaddingPerSide: 5, cartonArealDensityKgPerSqm: 0.8, accessoryWeightPerUnit: 1.8 },
      "semi-pedestal-basin": { outerPaddingPerSide: 15, innerPaddingPerSide: 5, cartonArealDensityKgPerSqm: 0.82, accessoryWeightPerUnit: 2.8 },
      "seat-cover": { outerPaddingPerSide: 15, innerPaddingPerSide: 5, cartonArealDensityKgPerSqm: 0.82, accessoryWeightPerUnit: 0.18 }
    },
    packageGrade: {
      "常规出口 5 层箱": { cartonRatePerSqm: 4.8, cartonFixed: 1.4, innerPackRatePerSqm: 2.3, innerPackFixed: 2.1, palletRatePerCbm: 18, palletFixed: 2.8, labelFixed: 3.3 },
      "加强型 5 层箱": { cartonRatePerSqm: 5.8, cartonFixed: 2.2, innerPackRatePerSqm: 2.8, innerPackFixed: 2.8, palletRatePerCbm: 22, palletFixed: 3.1, labelFixed: 3.8 },
      "彩印箱": { cartonRatePerSqm: 6.7, cartonFixed: 2.8, innerPackRatePerSqm: 2.4, innerPackFixed: 2.5, palletRatePerCbm: 20, palletFixed: 2.9, labelFixed: 4.5 },
      "电商抗摔包装": { cartonRatePerSqm: 8.1, cartonFixed: 3.8, innerPackRatePerSqm: 3.7, innerPackFixed: 3.6, palletRatePerCbm: 25, palletFixed: 4, labelFixed: 5.2 }
    }
  },
  containerProfiles: {
    "40HQ 常规装柜": { containerType: "40HQ", volumeCbm: 66, effectiveVolumeCbm: 66, maxPayloadKg: 26500 },
    "40HQ 托盘装柜": { containerType: "40HQ", volumeCbm: 68, effectiveVolumeCbm: 58.2, maxPayloadKg: 24000 },
    "20GP 常规装柜": { containerType: "20GP", volumeCbm: 28, effectiveVolumeCbm: 25.8, maxPayloadKg: 21500 }
  },
  freightByMarket: {
    northAmerica: {
      "40HQ": { oceanPerContainer: 17800, insurancePerContainer: 420, destinationPerContainer: 0 },
      "20GP": { oceanPerContainer: 11200, insurancePerContainer: 320, destinationPerContainer: 0 }
    },
    europe: {
      "40HQ": { oceanPerContainer: 15800, insurancePerContainer: 380, destinationPerContainer: 0 },
      "20GP": { oceanPerContainer: 9800, insurancePerContainer: 280, destinationPerContainer: 0 }
    },
    middleEast: {
      "40HQ": { oceanPerContainer: 14200, insurancePerContainer: 320, destinationPerContainer: 0 },
      "20GP": { oceanPerContainer: 9200, insurancePerContainer: 260, destinationPerContainer: 0 }
    },
    default: {
      "40HQ": { oceanPerContainer: 15000, insurancePerContainer: 360, destinationPerContainer: 0 },
      "20GP": { oceanPerContainer: 9600, insurancePerContainer: 280, destinationPerContainer: 0 }
    }
  },
  exportChargeByContainer: {
    "40HQ": { inlandFreightPerContainer: 2600, customsFeePerContainer: 1200, portChargesPerContainer: 1500, inspectionFeePerContainer: 600 },
    "20GP": { inlandFreightPerContainer: 2200, customsFeePerContainer: 1000, portChargesPerContainer: 1200, inspectionFeePerContainer: 500 }
  }
};

const templates = [
  {
    id: "two-piece",
    label: "分体马桶",
    productName: "分体马桶",
    modelCode: "CT-2401",
    orderQuantity: 300,
    formDefaults: {
      destinationMarket: "美国",
      flushingType: "虹吸旋冲",
      trapType: "S-trap",
      roughIn: "300 mm",
      flushVolume: "3/6L",
      productLength: 635,
      productWidth: 410,
      productHeight: 430,
      productNetWeight: 34.5,
      unitsPerCarton: 1,
      glazeLevel: "标准自洁釉",
      seatCoverGrade: "PP 缓降",
      packageGrade: "常规出口 5 层箱",
      loadingMode: "40HQ 常规装柜",
      cbmPerUnit: 0.18,
      grossWeight: 40,
      certificationRequirement: "cUPC / WaterSense 预留"
    },
    defaults: {
      "body-clay": { qty: 1, unitPrice: 116 },
      "tank-clay": { qty: 1, unitPrice: 34 },
      "body-additive": { qty: 1, unitPrice: 10 },
      "glaze-raw": { qty: 1, unitPrice: 20 },
      "glaze-upgrade": { qty: 1, unitPrice: 6 },
      "forming-labor": { qty: 1, unitPrice: 14 },
      "glazing-labor": { qty: 1, unitPrice: 8 },
      "firing-energy": { qty: 1, unitPrice: 16 },
      "finishing-qc": { qty: 1, unitPrice: 6 },
      "yield-reserve": { qty: 1, unitPrice: 10 },
      "rework-reserve": { qty: 1, unitPrice: 5 },
      "flush-fitting": { qty: 1, unitPrice: 39, isExternal: true },
      "seat-cover": { qty: 1, unitPrice: 24, isExternal: true },
      "install-kit": { qty: 1, unitPrice: 9, isExternal: true },
      "accessory-other": { qty: 1, unitPrice: 6.7, isExternal: true },
      "inner-pack": { qty: 1, unitPrice: 8, isExternal: true },
      "outer-carton": { qty: 1, unitPrice: 14, isExternal: true },
      "pallet-protection": { qty: 1, unitPrice: 6, isExternal: true },
      "manual-label": { qty: 1, unitPrice: 3.3, isExternal: true },
      "certification-amort": { qty: 1, unitPrice: 2.2, isExternal: true },
      "inspection-testing": { qty: 1, unitPrice: 1.3, isExternal: true },
      "mold-amort": { qty: 1, unitPrice: 4.2 },
      "sample-development": { qty: 1, unitPrice: 1.8 },
      "management-overhead": { qty: 1, unitPrice: 7.5 },
      "utilities-overhead": { qty: 1, unitPrice: 6.5 }
    }
  },
  {
    id: "one-piece",
    label: "连体马桶",
    productName: "连体马桶",
    modelCode: "CT-3108",
    orderQuantity: 150,
    formDefaults: {
      destinationMarket: "北美",
      flushingType: "虹吸旋冲",
      trapType: "S-trap",
      roughIn: "300 mm",
      flushVolume: "3/4.8L",
      productLength: 690,
      productWidth: 410,
      productHeight: 430,
      productNetWeight: 39.5,
      unitsPerCarton: 1,
      glazeLevel: "高亮纳米釉",
      seatCoverGrade: "UF 缓降",
      packageGrade: "加强型 5 层箱",
      loadingMode: "40HQ 常规装柜",
      cbmPerUnit: 0.2,
      grossWeight: 45,
      certificationRequirement: "cUPC / MAP 1000g"
    },
    defaults: {
      "body-clay": { qty: 1, unitPrice: 141 },
      "tank-clay": { qty: 1, unitPrice: 0 },
      "body-additive": { qty: 1, unitPrice: 13 },
      "glaze-raw": { qty: 1, unitPrice: 24 },
      "glaze-upgrade": { qty: 1, unitPrice: 10 },
      "forming-labor": { qty: 1, unitPrice: 16 },
      "glazing-labor": { qty: 1, unitPrice: 9 },
      "firing-energy": { qty: 1, unitPrice: 19 },
      "finishing-qc": { qty: 1, unitPrice: 7 },
      "yield-reserve": { qty: 1, unitPrice: 12 },
      "rework-reserve": { qty: 1, unitPrice: 5.5 },
      "flush-fitting": { qty: 1, unitPrice: 40, isExternal: true },
      "seat-cover": { qty: 1, unitPrice: 27, isExternal: true },
      "install-kit": { qty: 1, unitPrice: 8.5, isExternal: true },
      "accessory-other": { qty: 1, unitPrice: 5.6, isExternal: true },
      "inner-pack": { qty: 1, unitPrice: 10 },
      "outer-carton": { qty: 1, unitPrice: 17 },
      "pallet-protection": { qty: 1, unitPrice: 7 },
      "manual-label": { qty: 1, unitPrice: 4 },
      "certification-amort": { qty: 1, unitPrice: 2.8, isExternal: true },
      "inspection-testing": { qty: 1, unitPrice: 1.8, isExternal: true },
      "mold-amort": { qty: 1, unitPrice: 5.2 },
      "sample-development": { qty: 1, unitPrice: 2.2 },
      "management-overhead": { qty: 1, unitPrice: 9.8 },
      "utilities-overhead": { qty: 1, unitPrice: 8.4 }
    }
  },
  {
    id: "wall-hung",
    label: "挂墙马桶",
    productName: "挂墙马桶",
    modelCode: "WH-1806",
    orderQuantity: 120,
    formDefaults: {
      destinationMarket: "欧洲",
      flushingType: "虹吸",
      trapType: "Wall outlet",
      roughIn: "Wall outlet",
      flushVolume: "3/6L",
      productLength: 600,
      productWidth: 450,
      productHeight: 500,
      productNetWeight: 30.5,
      unitsPerCarton: 1,
      glazeLevel: "标准自洁釉",
      seatCoverGrade: "UF 缓降",
      packageGrade: "加强型 5 层箱",
      loadingMode: "40HQ 托盘装柜",
      cbmPerUnit: 0.19,
      grossWeight: 36,
      certificationRequirement: "EN997 / CE"
    },
    defaults: {
      "body-clay": { qty: 1, unitPrice: 109 },
      "tank-clay": { qty: 1, unitPrice: 0 },
      "body-additive": { qty: 1, unitPrice: 11 },
      "glaze-raw": { qty: 1, unitPrice: 18 },
      "glaze-upgrade": { qty: 1, unitPrice: 6 },
      "forming-labor": { qty: 1, unitPrice: 15 },
      "glazing-labor": { qty: 1, unitPrice: 8 },
      "firing-energy": { qty: 1, unitPrice: 17 },
      "finishing-qc": { qty: 1, unitPrice: 6 },
      "yield-reserve": { qty: 1, unitPrice: 11 },
      "rework-reserve": { qty: 1, unitPrice: 4.5 },
      "flush-fitting": { qty: 1, unitPrice: 28, isExternal: true },
      "seat-cover": { qty: 1, unitPrice: 20, isExternal: true },
      "install-kit": { qty: 1, unitPrice: 7.5, isExternal: true },
      "accessory-other": { qty: 1, unitPrice: 4.8, isExternal: true },
      "inner-pack": { qty: 1, unitPrice: 8.5 },
      "outer-carton": { qty: 1, unitPrice: 14.8 },
      "pallet-protection": { qty: 1, unitPrice: 6.8 },
      "manual-label": { qty: 1, unitPrice: 3.6 },
      "certification-amort": { qty: 1, unitPrice: 3.2, isExternal: true },
      "inspection-testing": { qty: 1, unitPrice: 1.6, isExternal: true },
      "mold-amort": { qty: 1, unitPrice: 4.8 },
      "sample-development": { qty: 1, unitPrice: 1.9 },
      "management-overhead": { qty: 1, unitPrice: 8.6 },
      "utilities-overhead": { qty: 1, unitPrice: 7.4 }
    }
  },
  {
    id: "pedestal-basin",
    label: "立柱盆 / 半柱盆",
    productName: "立柱盆 / 半柱盆",
    modelCode: "PB-5201",
    orderQuantity: 180,
    formDefaults: {
      destinationMarket: "中东",
      flushingType: "",
      trapType: "",
      roughIn: "",
      flushVolume: "",
      productLength: 450,
      productWidth: 400,
      productHeight: 550,
      productNetWeight: 23.5,
      unitsPerCarton: 1,
      glazeLevel: "标准自洁釉",
      seatCoverGrade: "不含盖板",
      packageGrade: "常规出口 5 层箱",
      loadingMode: "40HQ 常规装柜",
      cbmPerUnit: 0.16,
      grossWeight: 28,
      certificationRequirement: "常规出口测试"
    },
    defaults: {
      "body-clay": { qty: 1, unitPrice: 92 },
      "tank-clay": { qty: 1, unitPrice: 0 },
      "body-additive": { qty: 1, unitPrice: 8 },
      "glaze-raw": { qty: 1, unitPrice: 15 },
      "glaze-upgrade": { qty: 1, unitPrice: 3 },
      "forming-labor": { qty: 1, unitPrice: 12 },
      "glazing-labor": { qty: 1, unitPrice: 6 },
      "firing-energy": { qty: 1, unitPrice: 13 },
      "finishing-qc": { qty: 1, unitPrice: 5 },
      "yield-reserve": { qty: 1, unitPrice: 7 },
      "rework-reserve": { qty: 1, unitPrice: 3.2 },
      "flush-fitting": { qty: 1, unitPrice: 0, isExternal: true },
      "seat-cover": { qty: 1, unitPrice: 0, isExternal: true },
      "install-kit": { qty: 1, unitPrice: 4.5, isExternal: true },
      "accessory-other": { qty: 1, unitPrice: 6.2, isExternal: true },
      "inner-pack": { qty: 1, unitPrice: 7.5 },
      "outer-carton": { qty: 1, unitPrice: 12.4 },
      "pallet-protection": { qty: 1, unitPrice: 5.1 },
      "manual-label": { qty: 1, unitPrice: 2.8 },
      "certification-amort": { qty: 1, unitPrice: 1.6, isExternal: true },
      "inspection-testing": { qty: 1, unitPrice: 0.9, isExternal: true },
      "mold-amort": { qty: 1, unitPrice: 3.5 },
      "sample-development": { qty: 1, unitPrice: 1.2 },
      "management-overhead": { qty: 1, unitPrice: 6.8 },
      "utilities-overhead": { qty: 1, unitPrice: 5.7 }
    }
  },
  {
    id: "countertop-basin",
    label: "台上盆",
    productName: "台上盆",
    modelCode: "CB-4801",
    orderQuantity: 300,
    formDefaults: {
      destinationMarket: "欧洲",
      flushingType: "",
      trapType: "",
      roughIn: "",
      flushVolume: "",
      basinInstallation: "台上安装",
      faucetHole: "无孔",
      overflowHole: "无溢水孔",
      drainKitIncluded: "不含下水",
      productLength: 480,
      productWidth: 370,
      productHeight: 140,
      productNetWeight: 10.8,
      unitsPerCarton: 1,
      glazeLevel: "标准自洁釉",
      seatCoverGrade: "不含盖板",
      packageGrade: "常规出口 5 层箱",
      loadingMode: "40HQ 常规装柜",
      cbmPerUnit: 0.08,
      grossWeight: 13.5,
      certificationRequirement: "EN14688 / CE"
    },
    defaults: {
      "body-clay": { qty: 1, unitPrice: 43 },
      "tank-clay": { qty: 1, unitPrice: 0 },
      "body-additive": { qty: 1, unitPrice: 4.2 },
      "glaze-raw": { qty: 1, unitPrice: 7.2 },
      "glaze-upgrade": { qty: 1, unitPrice: 2.4 },
      "forming-labor": { qty: 1, unitPrice: 7.4 },
      "glazing-labor": { qty: 1, unitPrice: 3.9 },
      "firing-energy": { qty: 1, unitPrice: 7.6 },
      "finishing-qc": { qty: 1, unitPrice: 4.2 },
      "yield-reserve": { qty: 1, unitPrice: 3.3 },
      "rework-reserve": { qty: 1, unitPrice: 1.2 },
      "flush-fitting": { qty: 1, unitPrice: 0, isExternal: true },
      "seat-cover": { qty: 1, unitPrice: 0, isExternal: true },
      "install-kit": { qty: 1, unitPrice: 2.4, isExternal: true },
      "accessory-other": { qty: 1, unitPrice: 3.6, isExternal: true },
      "inner-pack": { qty: 1, unitPrice: 5.2, isExternal: true },
      "outer-carton": { qty: 1, unitPrice: 9.8, isExternal: true },
      "pallet-protection": { qty: 1, unitPrice: 3.8, isExternal: true },
      "manual-label": { qty: 1, unitPrice: 2.2, isExternal: true },
      "certification-amort": { qty: 1, unitPrice: 1.2, isExternal: true },
      "inspection-testing": { qty: 1, unitPrice: 0.8, isExternal: true },
      "mold-amort": { qty: 1, unitPrice: 2.4 },
      "sample-development": { qty: 1, unitPrice: 0.9 },
      "management-overhead": { qty: 1, unitPrice: 4.6 },
      "utilities-overhead": { qty: 1, unitPrice: 3.9 }
    }
  },
  {
    id: "undercounter-basin",
    label: "台下盆",
    productName: "台下盆",
    modelCode: "UB-4301",
    orderQuantity: 300,
    formDefaults: {
      destinationMarket: "北美",
      flushingType: "",
      trapType: "",
      roughIn: "",
      flushVolume: "",
      basinInstallation: "台下安装",
      faucetHole: "无孔",
      overflowHole: "带溢水孔",
      drainKitIncluded: "不含下水",
      productLength: 430,
      productWidth: 350,
      productHeight: 185,
      productNetWeight: 9.6,
      unitsPerCarton: 1,
      glazeLevel: "标准自洁釉",
      seatCoverGrade: "不含盖板",
      packageGrade: "常规出口 5 层箱",
      loadingMode: "40HQ 常规装柜",
      cbmPerUnit: 0.075,
      grossWeight: 12.2,
      certificationRequirement: "cUPC / 常规出口测试"
    },
    defaults: {
      "body-clay": { qty: 1, unitPrice: 39 },
      "tank-clay": { qty: 1, unitPrice: 0 },
      "body-additive": { qty: 1, unitPrice: 3.8 },
      "glaze-raw": { qty: 1, unitPrice: 6.8 },
      "glaze-upgrade": { qty: 1, unitPrice: 2.2 },
      "forming-labor": { qty: 1, unitPrice: 6.8 },
      "glazing-labor": { qty: 1, unitPrice: 3.6 },
      "firing-energy": { qty: 1, unitPrice: 7.1 },
      "finishing-qc": { qty: 1, unitPrice: 4 },
      "yield-reserve": { qty: 1, unitPrice: 3 },
      "rework-reserve": { qty: 1, unitPrice: 1.1 },
      "flush-fitting": { qty: 1, unitPrice: 0, isExternal: true },
      "seat-cover": { qty: 1, unitPrice: 0, isExternal: true },
      "install-kit": { qty: 1, unitPrice: 2, isExternal: true },
      "accessory-other": { qty: 1, unitPrice: 3.2, isExternal: true },
      "inner-pack": { qty: 1, unitPrice: 4.9, isExternal: true },
      "outer-carton": { qty: 1, unitPrice: 9.2, isExternal: true },
      "pallet-protection": { qty: 1, unitPrice: 3.5, isExternal: true },
      "manual-label": { qty: 1, unitPrice: 2, isExternal: true },
      "certification-amort": { qty: 1, unitPrice: 1.5, isExternal: true },
      "inspection-testing": { qty: 1, unitPrice: 0.8, isExternal: true },
      "mold-amort": { qty: 1, unitPrice: 2.2 },
      "sample-development": { qty: 1, unitPrice: 0.8 },
      "management-overhead": { qty: 1, unitPrice: 4.2 },
      "utilities-overhead": { qty: 1, unitPrice: 3.6 }
    }
  },
  {
    id: "semi-pedestal-basin",
    label: "半柱盆套装",
    productName: "半柱盆套装",
    modelCode: "SPB-5601",
    orderQuantity: 200,
    formDefaults: {
      destinationMarket: "中东",
      flushingType: "",
      trapType: "",
      roughIn: "",
      flushVolume: "",
      basinInstallation: "挂墙半柱",
      faucetHole: "单孔",
      overflowHole: "带溢水孔",
      drainKitIncluded: "含普通下水",
      productLength: 560,
      productWidth: 460,
      productHeight: 460,
      productNetWeight: 20.5,
      unitsPerCarton: 1,
      glazeLevel: "标准自洁釉",
      seatCoverGrade: "不含盖板",
      packageGrade: "加强型 5 层箱",
      loadingMode: "40HQ 常规装柜",
      cbmPerUnit: 0.15,
      grossWeight: 24.5,
      certificationRequirement: "常规出口测试"
    },
    defaults: {
      "body-clay": { qty: 1, unitPrice: 82 },
      "tank-clay": { qty: 1, unitPrice: 0 },
      "body-additive": { qty: 1, unitPrice: 7.4 },
      "glaze-raw": { qty: 1, unitPrice: 13.4 },
      "glaze-upgrade": { qty: 1, unitPrice: 3 },
      "forming-labor": { qty: 1, unitPrice: 11 },
      "glazing-labor": { qty: 1, unitPrice: 5.6 },
      "firing-energy": { qty: 1, unitPrice: 11.8 },
      "finishing-qc": { qty: 1, unitPrice: 4.8 },
      "yield-reserve": { qty: 1, unitPrice: 6.4 },
      "rework-reserve": { qty: 1, unitPrice: 2.7 },
      "flush-fitting": { qty: 1, unitPrice: 0, isExternal: true },
      "seat-cover": { qty: 1, unitPrice: 0, isExternal: true },
      "install-kit": { qty: 1, unitPrice: 5.2, isExternal: true },
      "accessory-other": { qty: 1, unitPrice: 6.8, isExternal: true },
      "inner-pack": { qty: 1, unitPrice: 7.2, isExternal: true },
      "outer-carton": { qty: 1, unitPrice: 13.8, isExternal: true },
      "pallet-protection": { qty: 1, unitPrice: 5.8, isExternal: true },
      "manual-label": { qty: 1, unitPrice: 3.2, isExternal: true },
      "certification-amort": { qty: 1, unitPrice: 1.4, isExternal: true },
      "inspection-testing": { qty: 1, unitPrice: 0.9, isExternal: true },
      "mold-amort": { qty: 1, unitPrice: 3.2 },
      "sample-development": { qty: 1, unitPrice: 1.1 },
      "management-overhead": { qty: 1, unitPrice: 6.2 },
      "utilities-overhead": { qty: 1, unitPrice: 5.2 }
    }
  },
  {
    id: "seat-cover",
    label: "马桶盖",
    productName: "马桶盖",
    modelCode: "SC-6006",
    orderQuantity: 1000,
    formDefaults: {
      destinationMarket: "欧洲",
      flushingType: "",
      trapType: "",
      roughIn: "",
      flushVolume: "",
      productLength: 450,
      productWidth: 375,
      productHeight: 55,
      productNetWeight: 2.8,
      unitsPerCarton: 6,
      glazeLevel: "标准自洁釉",
      seatCoverGrade: "UF 缓降",
      packageGrade: "常规出口 5 层箱",
      loadingMode: "40HQ 常规装柜",
      cbmPerUnit: 0.02,
      grossWeight: 18,
      certificationRequirement: "常规出口测试"
    },
    defaults: {
      "body-clay": { qty: 1, unitPrice: 0, isExternal: false },
      "tank-clay": { qty: 1, unitPrice: 0, isExternal: false },
      "body-additive": { qty: 1, unitPrice: 0, isExternal: false },
      "glaze-raw": { qty: 1, unitPrice: 0, isExternal: false },
      "glaze-upgrade": { qty: 1, unitPrice: 0, isExternal: false },
      "forming-labor": { qty: 1, unitPrice: 0, isExternal: false },
      "glazing-labor": { qty: 1, unitPrice: 0, isExternal: false },
      "firing-energy": { qty: 1, unitPrice: 0, isExternal: false },
      "finishing-qc": { qty: 1, unitPrice: 0.6, isExternal: false },
      "yield-reserve": { qty: 1, unitPrice: 0.5, isExternal: false },
      "rework-reserve": { qty: 1, unitPrice: 0.3, isExternal: false },
      "flush-fitting": { qty: 1, unitPrice: 0, isExternal: true },
      "seat-cover": { qty: 1, unitPrice: 32, isExternal: true },
      "install-kit": { qty: 1, unitPrice: 0.8, isExternal: true },
      "accessory-other": { qty: 1, unitPrice: 0.5, isExternal: true },
      "inner-pack": { qty: 1, unitPrice: 1.2, isExternal: true },
      "outer-carton": { qty: 1, unitPrice: 2.6, isExternal: true },
      "pallet-protection": { qty: 1, unitPrice: 0.7, isExternal: true },
      "manual-label": { qty: 1, unitPrice: 0.4, isExternal: true },
      "certification-amort": { qty: 1, unitPrice: 0.4, isExternal: true },
      "inspection-testing": { qty: 1, unitPrice: 0.2, isExternal: true },
      "mold-amort": { qty: 1, unitPrice: 0.8, isExternal: false },
      "sample-development": { qty: 1, unitPrice: 0.3, isExternal: false },
      "management-overhead": { qty: 1, unitPrice: 0.9, isExternal: false },
      "utilities-overhead": { qty: 1, unitPrice: 0.6, isExternal: false }
    }
  }
];

const templateFieldProfiles = {
  default: {
    hideFields: [],
    sectionTitle: "产品规格",
    sectionDesc: "规格参数按同类字段并排录入，判断更直观"
  },
  "two-piece": {
    hideFields: [],
    sectionTitle: "坐便器规格",
    sectionDesc: "保留冲水、排污、坑距和尺寸参数，适合标准马桶报价"
  },
  "one-piece": {
    hideFields: [],
    sectionTitle: "坐便器规格",
    sectionDesc: "保留冲水、排污、坑距和尺寸参数，适合标准马桶报价"
  },
  "wall-hung": {
    hideFields: [],
    sectionTitle: "挂墙规格",
    sectionDesc: "重点关注墙排口径、冲水参数和安装尺寸"
  },
  "pedestal-basin": {
    hideFields: ["flushingType", "trapType", "roughIn", "flushVolume", "seatCoverGrade"],
    sectionTitle: "立柱盆 / 半柱盆规格",
    sectionDesc: "隐藏坐便器专属字段，保留安装方式、孔位、尺寸、净重和包装参数"
  },
  "countertop-basin": {
    hideFields: ["flushingType", "trapType", "roughIn", "flushVolume", "seatCoverGrade"],
    sectionTitle: "台上盆规格",
    sectionDesc: "聚焦安装方式、龙头孔、溢水孔、盆体尺寸、净重和包装参数"
  },
  "undercounter-basin": {
    hideFields: ["flushingType", "trapType", "roughIn", "flushVolume", "seatCoverGrade"],
    sectionTitle: "台下盆规格",
    sectionDesc: "聚焦安装方式、龙头孔、溢水孔、盆体尺寸、净重和包装参数"
  },
  "semi-pedestal-basin": {
    hideFields: ["flushingType", "trapType", "roughIn", "flushVolume", "seatCoverGrade"],
    sectionTitle: "半柱盆规格",
    sectionDesc: "隐藏坐便器专属字段，保留盆体安装、孔位、半柱配套与包装参数"
  },
  "seat-cover": {
    hideFields: ["flushingType", "trapType", "roughIn", "flushVolume", "glazeLevel"],
    sectionTitle: "盖板规格",
    sectionDesc: "隐藏冲水系统字段，聚焦盖板尺寸、净重和装箱参数"
  }
};

const packageMaterialAssumptions = {
  default: { materialLabel: "5层瓦楞纸箱" },
  "常规出口 5 层箱": { materialLabel: "5层瓦楞纸箱" },
  "加强型 5 层箱": { materialLabel: "加强型5层瓦楞纸箱" },
  "彩印箱": { materialLabel: "彩印5层瓦楞纸箱" },
  "电商抗摔包装": { materialLabel: "电商抗摔加强箱" }
};

const packagingAccessoryNotes = {
  default: "按泡沫/EPE、PE袋、标签、胶带和基础防护辅材估算",
  "two-piece": "按泡沫护角、内袋、说明书、打包带及基础配件包估算",
  "one-piece": "按泡沫护角、内袋、说明书、打包带及基础配件包估算",
  "wall-hung": "按EPE护角、内袋、挂墙配件包和封箱辅材估算",
  "pedestal-basin": "按泡沫护角、珍珠棉、内袋和封箱辅材估算",
  "countertop-basin": "按泡沫护角、内袋、台盆保护垫和封箱辅材估算",
  "undercounter-basin": "按泡沫护角、内袋、边沿保护垫和封箱辅材估算",
  "semi-pedestal-basin": "按泡沫护角、珍珠棉、半柱防护和封箱辅材估算",
  "seat-cover": "按PE袋、隔片/纸托、标签和封箱胶带估算"
};

const storageKey = "toilet-bom-quote-state-v7";

const state = {
  version: "bom-v7",
  quoteCode: createQuoteCode(),
  form: createDefaultForm(),
  rows: createRowsFromTemplate("two-piece"),
  budgetRows: createBudgetRowsFromTemplate("two-piece", templates[0].orderQuantity),
  priceLibrary: createDefaultPriceLibrary(),
  summary: {
    inlandFreight: 8,
    customsFee: 4,
    portCharges: 4,
    inspectionFee: 2,
    oceanFreight: 0,
    insuranceFee: 0,
    destinationDelivery: 0,
    internalProfitRate: 15,
    externalProfitRate: 8,
    commissionRate: 0,
    afterSalesRate: 0.5,
    fxSafetyRate: 0,
    smallOrderSurcharge: 0,
    specialPackageSurcharge: 0,
    specialTestingSurcharge: 0,
    trialProductionSurcharge: 0,
    specialLabelSurcharge: 0,
    operatingExpenseRate: 0,
    financeCostRate: 0,
    exchangeRate: 7.15
  },
  rapidQuoteConfig: null,
  collapsedCategories: {}
};

const refs = {
  workbenchSection: document.querySelector('[data-page="workbench"]'),
  customerForm: document.getElementById("customerForm"),
  customerSourceSelect: document.getElementById("customerSourceSelect"),
  customerSourceOtherWrap: document.getElementById("customerSourceOtherWrap"),
  quoteInputTitle: document.getElementById("quoteInputTitle"),
  quoteInputDesc: document.getElementById("quoteInputDesc"),
  calcMode: document.getElementById("calcMode"),
  productionQuantity: document.getElementById("productionQuantity"),
  templateSelect: document.getElementById("templateSelect"),
  loadTemplateBtn: document.getElementById("loadTemplateBtn"),
  customCategorySelect: document.getElementById("customCategorySelect"),
  presetItemSelect: document.getElementById("presetItemSelect"),
  customItemNameInput: document.getElementById("customItemNameInput"),
  addCustomRowBtn: document.getElementById("addCustomRowBtn"),
  modeHint: document.getElementById("modeHint"),
  modeStrategyPanel: document.getElementById("modeStrategyPanel"),
  rapidDecisionPanel: document.getElementById("rapidDecisionPanel"),
  bomModeHint: document.getElementById("bomModeHint"),
  bomOverviewCards: document.getElementById("bomOverviewCards"),
  bomTableBody: document.getElementById("bomTableBody"),
  quickMetricsGrid: document.getElementById("quickMetricsGrid"),
  resultTableBody: document.getElementById("resultTableBody"),
  quoteCodeBadge: document.getElementById("quoteCodeBadge"),
  ceramicTotalCard: document.getElementById("ceramicTotalCard"),
  accessoriesTotalCard: document.getElementById("accessoriesTotalCard"),
  packageTotalCard: document.getElementById("packageTotalCard"),
  otherCostCard: document.getElementById("otherCostCard"),
  operatingTotalCard: document.getElementById("operatingTotalCard"),
  rmbTotalCard: document.getElementById("rmbTotalCard"),
  usdSellingCard: document.getElementById("usdSellingCard"),
  summaryCardLabel1: document.getElementById("summaryCardLabel1"),
  summaryCardLabel2: document.getElementById("summaryCardLabel2"),
  summaryCardLabel3: document.getElementById("summaryCardLabel3"),
  summaryCardLabel4: document.getElementById("summaryCardLabel4"),
  summaryCardLabel5: document.getElementById("summaryCardLabel5"),
  primaryValueHeader: document.getElementById("primaryValueHeader"),
  secondaryValueHeader: document.getElementById("secondaryValueHeader"),
  amountHeader: document.getElementById("amountHeader"),
  inlandFreightInput: document.getElementById("inlandFreightInput"),
  customsFeeInput: document.getElementById("customsFeeInput"),
  portChargesInput: document.getElementById("portChargesInput"),
  inspectionFeeInput: document.getElementById("inspectionFeeInput"),
  oceanFreightInput: document.getElementById("oceanFreightInput"),
  insuranceFeeInput: document.getElementById("insuranceFeeInput"),
  destinationDeliveryInput: document.getElementById("destinationDeliveryInput"),
  internalProfitRateInput: document.getElementById("internalProfitRateInput"),
  externalProfitRateInput: document.getElementById("externalProfitRateInput"),
  commissionRateInput: document.getElementById("commissionRateInput"),
  afterSalesRateInput: document.getElementById("afterSalesRateInput"),
  fxSafetyRateInput: document.getElementById("fxSafetyRateInput"),
  smallOrderSurchargeInput: document.getElementById("smallOrderSurchargeInput"),
  specialPackageSurchargeInput: document.getElementById("specialPackageSurchargeInput"),
  specialTestingSurchargeInput: document.getElementById("specialTestingSurchargeInput"),
  trialProductionSurchargeInput: document.getElementById("trialProductionSurchargeInput"),
  specialLabelSurchargeInput: document.getElementById("specialLabelSurchargeInput"),
  operatingExpenseRateInput: document.getElementById("operatingExpenseRateInput"),
  exchangeRateInput: document.getElementById("exchangeRateInput"),
  targetGrossMarginRateInput: document.getElementById("targetGrossMarginRate"),
  floorGrossMarginRateInput: document.getElementById("floorGrossMarginRate"),
  specialApprovalReasonInput: document.getElementById("specialApprovalReason"),
  saveQuoteBtn: document.getElementById("saveQuoteBtn"),
  exportBtn: document.getElementById("exportBtn"),
  printBtn: document.getElementById("printBtn"),
  fullGovernancePanel: document.getElementById("fullGovernancePanel"),
  rapidConfigPanel: document.getElementById("rapidConfigPanel"),
  rapidConfigResetBtn: document.getElementById("rapidConfigResetBtn"),
  tierTableBody: document.getElementById("tierTableBody"),
  supplierBenchmarkList: document.getElementById("supplierBenchmarkList"),
  priceLibraryEditor: document.getElementById("priceLibraryEditor"),
  factoryRatesOverview: document.getElementById("factoryRatesOverview"),
  factoryRatesEditor: document.getElementById("factoryRatesEditor"),
  factoryProcessOverview: document.getElementById("factoryProcessOverview"),
  factoryProcessEditor: document.getElementById("factoryProcessEditor"),
  factoryPackagingOverview: document.getElementById("factoryPackagingOverview"),
  factoryPackagingEditor: document.getElementById("factoryPackagingEditor"),
  factoryPersonnelOverview: document.getElementById("factoryPersonnelOverview"),
  factoryPersonnelEditor: document.getElementById("factoryPersonnelEditor"),
  quotePreview: document.getElementById("quotePreview"),
  rapidModeBtn: document.getElementById("rapidModeBtn"),
  fullModeBtn: document.getElementById("fullModeBtn"),
  rapidImpactModal: document.getElementById("rapidImpactModal"),
  rapidImpactModalTitle: document.getElementById("rapidImpactModalTitle"),
  rapidImpactModalMeta: document.getElementById("rapidImpactModalMeta"),
  rapidImpactModalBody: document.getElementById("rapidImpactModalBody"),
  rapidImpactModalCloseBtn: document.getElementById("rapidImpactModalCloseBtn"),
  rapidImpactModalCancelBtn: document.getElementById("rapidImpactModalCancelBtn"),
  rapidFormulaModal: document.getElementById("rapidFormulaModal"),
  rapidFormulaModalTitle: document.getElementById("rapidFormulaModalTitle"),
  rapidFormulaModalMeta: document.getElementById("rapidFormulaModalMeta"),
  rapidFormulaModalBody: document.getElementById("rapidFormulaModalBody"),
  rapidFormulaModalCloseBtn: document.getElementById("rapidFormulaModalCloseBtn"),
  rapidFormulaModalCancelBtn: document.getElementById("rapidFormulaModalCancelBtn"),
  rapidConfigModal: document.getElementById("rapidConfigModal"),
  rapidConfigModalCloseBtn: document.getElementById("rapidConfigModalCloseBtn"),
  rapidConfigModalCancelBtn: document.getElementById("rapidConfigModalCancelBtn")
};

function createQuoteCode() {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const suffix = Math.floor(Math.random() * 900 + 100);
  return `QT-${date}-${suffix}`;
}

function getTemplateById(id) {
  return templates.find((template) => template.id === id) || templates[0];
}

function getSelectableTemplates() {
  return templates.filter((template) => template.id !== "seat-cover");
}

function isSelectableTemplate(templateId) {
  return getSelectableTemplates().some((template) => template.id === templateId);
}

function templateSupportsSeatCover(templateId) {
  return ["two-piece", "one-piece", "wall-hung"].includes(templateId);
}

function isBasinTemplate(templateId) {
  return ["pedestal-basin", "countertop-basin", "undercounter-basin", "semi-pedestal-basin"].includes(templateId);
}

function inferIncludeSeatCoverValue(templateOrForm = {}) {
  return templateOrForm?.seatCoverGrade === "不含盖板" ? "no" : "yes";
}

function getTemplateSeatCoverDefault(templateId) {
  const template = getTemplateById(templateId);
  const defaultGrade = template?.formDefaults?.seatCoverGrade;
  return defaultGrade && defaultGrade !== "不含盖板" ? defaultGrade : "PP 缓降";
}

function getSeatCoverHingeDefaultByGrade(grade) {
  return grade === "薄盖快拆" ? "快拆缓降" : "常规缓降";
}

function normalizeSeatCoverState(form = state.form) {
  if (!form || typeof form !== "object") {
    return form;
  }
  const templateId = form.templateSelect && isSelectableTemplate(form.templateSelect)
    ? form.templateSelect
    : "two-piece";
  const supportsSeatCover = templateSupportsSeatCover(templateId);
  if (!supportsSeatCover) {
    form.includeSeatCover = "no";
    form.seatCoverGrade = "不含盖板";
    return form;
  }
  form.includeSeatCover = form.includeSeatCover === "no" ? "no" : "yes";
  if (form.includeSeatCover === "no") {
    form.seatCoverGrade = "不含盖板";
  } else if (!form.seatCoverGrade || form.seatCoverGrade === "不含盖板") {
    form.seatCoverGrade = getTemplateSeatCoverDefault(templateId);
  }
  form.seatCoverModel = form.seatCoverModel || "";
  form.seatCoverLength = Number(form.seatCoverLength) > 0 ? Number(form.seatCoverLength) : "";
  form.seatCoverWidth = Number(form.seatCoverWidth) > 0 ? Number(form.seatCoverWidth) : "";
  form.seatCoverHeight = Number(form.seatCoverHeight) > 0 ? Number(form.seatCoverHeight) : "";
  form.seatCoverNetWeight = Number(form.seatCoverNetWeight) > 0 ? Number(form.seatCoverNetWeight) : "";
  form.seatCoverHinge = form.seatCoverHinge || getSeatCoverHingeDefaultByGrade(form.seatCoverGrade);
  form.seatCoverRemark = form.seatCoverRemark || "";
  return form;
}

function normalizeTemplateSelection(form = state.form) {
  if (!form || typeof form !== "object") {
    return form;
  }
  if (!isSelectableTemplate(form.templateSelect)) {
    form.templateSelect = "two-piece";
    form.productName = getTemplateById("two-piece").productName;
    form.modelCode = getTemplateById("two-piece").modelCode;
  }
  return normalizeSeatCoverState(form);
}

function createDefaultPriceLibrary() {
  return JSON.parse(JSON.stringify(supplierPriceLibrary));
}

function normalizePriceLibrary(priceLibrary) {
  const library = priceLibrary || supplierPriceLibrary;
  const templatePadding = library.smartPackaging?.templatePadding || {};
  Object.values(templatePadding).forEach((item) => {
    if (!item || typeof item !== "object") {
      return;
    }
    if (!(Number(item.cartonArealDensityKgPerSqm) > 0)) {
      item.cartonArealDensityKgPerSqm = 0.82;
    }
    if (!(Number(item.accessoryWeightPerUnit) >= 0)) {
      item.accessoryWeightPerUnit = Math.max(Number(item.packagingWeight) || 0, 0);
    }
  });
  return library;
}

function getPriceLibrary() {
  return normalizePriceLibrary(state.priceLibrary || supplierPriceLibrary);
}

function mergeDeepPriceLibrary(target, source) {
  if (!source || typeof source !== "object") {
    return target;
  }
  Object.entries(source).forEach(([key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      target[key] = mergeDeepPriceLibrary(target[key] || {}, value);
    } else {
      target[key] = value;
    }
  });
  return target;
}

function createDefaultForm() {
  const template = getTemplateById("two-piece");
  return {
    quoteMode: "rapid",
    customerName: "",
    contactName: "",
    contactPhone: "",
    projectName: "",
    quoteDate: new Date().toISOString().slice(0, 10),
    salesName: "",
    calcMode: "unit",
    templateSelect: template.id,
    productName: template.productName,
    modelCode: template.modelCode,
    orderQuantity: template.orderQuantity,
    productionQuantity: template.orderQuantity,
    tradeTerm: "FOB Xiamen",
    shippingPort: "Xiamen",
    destinationPort: "",
    incotermsVersion: "Incoterms 2020",
    destinationMarket: template.formDefaults.destinationMarket,
    customerSource: "",
    customerSourceMode: "preset",
    productLifecycle: "mature",
    complexityLevel: "standard",
    qualityLevel: "standard",
    shippingScenario: "full-container",
    accessoryGrade: "standard",
    specialCertificationLevel: "none",
    specialAccessoryLevel: "none",
    quoteStage: "estimate",
    pricingBasis: "experience",
    sourceQuoteMode: "",
    convertedFromRapidAt: "",
    targetGrossMarginRate: 18,
    floorGrossMarginRate: 10,
    specialApprovalReason: "",
    inheritedRapidQuote: null,
    flushingType: template.formDefaults.flushingType,
    trapType: template.formDefaults.trapType,
    roughIn: template.formDefaults.roughIn,
    flushVolume: template.formDefaults.flushVolume,
    productLength: template.formDefaults.productLength,
    productWidth: template.formDefaults.productWidth,
    productHeight: template.formDefaults.productHeight,
    productNetWeight: template.formDefaults.productNetWeight,
    unitsPerCarton: getTemplateDefaultUnitsPerCarton(template),
    packageLength: 0,
    packageWidth: 0,
    packageHeight: 0,
    cartonArea: 0,
    glazeLevel: template.formDefaults.glazeLevel,
    includeSeatCover: inferIncludeSeatCoverValue(template.formDefaults),
    seatCoverGrade: template.formDefaults.seatCoverGrade,
    seatCoverModel: "",
    seatCoverLength: "",
    seatCoverWidth: "",
    seatCoverHeight: "",
    seatCoverNetWeight: "",
    seatCoverHinge: getSeatCoverHingeDefaultByGrade(template.formDefaults.seatCoverGrade),
    seatCoverRemark: "",
    basinInstallation: template.formDefaults.basinInstallation || "",
    faucetHole: template.formDefaults.faucetHole || "",
    overflowHole: template.formDefaults.overflowHole || "",
    drainKitIncluded: template.formDefaults.drainKitIncluded || "",
    packageGrade: template.formDefaults.packageGrade,
    loadingMode: template.formDefaults.loadingMode,
    cbmPerUnit: template.formDefaults.cbmPerUnit,
    grossWeight: template.formDefaults.grossWeight,
    certificationRequirement: template.formDefaults.certificationRequirement,
    validityDays: 15,
    moq: 100,
    leadTimeDays: 45,
    quoteCurrency: "USD",
    customerRemark: ""
  };
}

function upgradeLegacyTwoPieceDefaults(form) {
  if (!form || form.templateSelect !== "two-piece") {
    return form;
  }

  const upgraded = { ...form };
  const orderQuantity = Number(upgraded.orderQuantity) || 0;
  const productionQuantity = Number(upgraded.productionQuantity) || 0;
  const shouldUpgradeOrderQuantity = !orderQuantity || orderQuantity === 100 || orderQuantity === 200;
  const shouldUpgradeProductionQuantity = !productionQuantity || productionQuantity === 100 || productionQuantity === 200;
  const flushingType = String(upgraded.flushingType || "").trim();
  const shouldUpgradeFlushingType = !flushingType || flushingType === "虹吸";

  if (shouldUpgradeOrderQuantity) {
    upgraded.orderQuantity = 300;
  }
  if (shouldUpgradeProductionQuantity) {
    upgraded.productionQuantity = 300;
  }
  if (shouldUpgradeFlushingType) {
    upgraded.flushingType = "虹吸旋冲";
  }

  return upgraded;
}

function getTemplateDefaultUnitsPerCarton(template) {
  const configured = Number(template?.formDefaults?.unitsPerCarton);
  if (configured > 0) {
    return configured;
  }
  const templateKeyword = `${template?.id || ""} ${template?.label || ""} ${template?.productName || ""}`.toLowerCase();
  return /seat|cover|盖板|马桶盖/.test(templateKeyword) ? 6 : 1;
}

function uid() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `row-${Math.random().toString(16).slice(2)}-${Date.now()}`;
}

function createRowsFromTemplate(templateId) {
  const template = getTemplateById(templateId);
  return bomCatalog.flatMap((category) => category.items.map((item) => {
    const defaults = template.defaults[item.id] || {};
    return {
      rowId: uid(),
      itemId: item.id,
      categoryKey: category.key,
      categoryLabel: category.label,
      name: item.name,
      unit: item.unit,
      qty: defaults.qty ?? 0,
      unitPrice: defaults.unitPrice ?? 0,
      isExternal: defaults.isExternal ?? isExternalEligibleCategory(category.key),
      note: defaults.note ?? "",
      autoPriced: !defaults.manualOnly,
      custom: false
    };
  }));
}

function createBudgetRowsFromTemplate(templateId, productionQuantity) {
  const baseRows = createRowsFromTemplate(templateId);
  const batchQty = Math.max(Number(productionQuantity) || 1, 1);
  return budgetCatalog.flatMap((category) => category.items.map((item) => {
    const baseRow = baseRows.find((row) => row.itemId === item.id);
    const perUnit = baseRow ? getUnitRowPerUnitAmount(baseRow) : 0;
    return {
      rowId: uid(),
      itemId: item.id,
      categoryKey: category.key,
      categoryLabel: category.label,
      name: item.name,
      unit: item.unit,
      totalAmount: Number((perUnit * batchQty).toFixed(2)),
      isExternal: baseRow?.isExternal ?? isExternalEligibleCategory(category.key),
      note: baseRow?.note ?? "",
      autoPriced: baseRow?.autoPriced ?? true,
      custom: false
    };
  }));
}

function parseTradeTermCode(tradeTerm) {
  const upper = String(tradeTerm || "").trim().toUpperCase();
  if (upper.includes("DDP")) {
    return "DDP";
  }
  if (upper.includes("CIF")) {
    return "CIF";
  }
  if (upper.includes("CFR") || upper.includes("CNF")) {
    return "CFR";
  }
  if (upper.includes("EXW")) {
    return "EXW";
  }
  return "FOB";
}

function getTradeTermMeta() {
  return getPriceLibrary().tradeTerms[parseTradeTermCode(state.form.tradeTerm)];
}

function clampRate(value, fallback = 0) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(Math.max(parsed, 0), 100);
}

function calculateTradeLogisticsForQuantity(quantity, smart = calculateSmartQuoteMetrics(), tradeMeta = getTradeTermMeta()) {
  const qty = Math.max(Math.round(Number(quantity) || 1), 1);
  const loadQty = Math.max(Math.round(Number(smart.estimatedLoadQty) || 0), 0);
  const containersNeeded = loadQty ? Math.max(Math.ceil(qty / loadQty), 1) : 1;
  const exportRule = smart.exportChargeRule || {};
  const freightRule = smart.marketFreightRule || {};
  const inlandFreightPerUnit = ((Number(exportRule.inlandFreightPerContainer) || 0) * containersNeeded) / qty;
  const customsFeePerUnit = ((Number(exportRule.customsFeePerContainer) || 0) * containersNeeded) / qty;
  const portChargesPerUnit = ((Number(exportRule.portChargesPerContainer) || 0) * containersNeeded) / qty;
  const inspectionFeePerUnit = ((Number(exportRule.inspectionFeePerContainer) || 0) * containersNeeded) / qty;
  const oceanFreightPerUnit = ((Number(freightRule.oceanPerContainer) || 0) * containersNeeded) / qty;
  const insuranceFeePerUnit = ((Number(freightRule.insurancePerContainer) || 0) * containersNeeded) / qty;
  const destinationDeliveryPerUnit = ((Number(freightRule.destinationPerContainer) || 0) * containersNeeded) / qty;
  const localChargesPerUnit = inlandFreightPerUnit + customsFeePerUnit + portChargesPerUnit + inspectionFeePerUnit;
  const quotedLogisticsPerUnit = (tradeMeta.includeExport ? localChargesPerUnit : 0)
    + (tradeMeta.includeOcean ? oceanFreightPerUnit : 0)
    + (tradeMeta.includeInsurance ? insuranceFeePerUnit : 0)
    + (tradeMeta.includeDestination ? destinationDeliveryPerUnit : 0);
  const allLogisticsPerUnit = localChargesPerUnit + oceanFreightPerUnit + insuranceFeePerUnit + destinationDeliveryPerUnit;
  return {
    containersNeeded,
    loadQty,
    inlandFreightPerUnit: Number(inlandFreightPerUnit.toFixed(2)),
    customsFeePerUnit: Number(customsFeePerUnit.toFixed(2)),
    portChargesPerUnit: Number(portChargesPerUnit.toFixed(2)),
    inspectionFeePerUnit: Number(inspectionFeePerUnit.toFixed(2)),
    oceanFreightPerUnit: Number(oceanFreightPerUnit.toFixed(2)),
    insuranceFeePerUnit: Number(insuranceFeePerUnit.toFixed(2)),
    destinationDeliveryPerUnit: Number(destinationDeliveryPerUnit.toFixed(2)),
    localChargesPerUnit: Number(localChargesPerUnit.toFixed(2)),
    quotedLogisticsPerUnit: Number(quotedLogisticsPerUnit.toFixed(2)),
    excludedChargesPerUnit: Number((allLogisticsPerUnit - quotedLogisticsPerUnit).toFixed(2))
  };
}

function calculatePriceFromTargetMargin(rmbCostPerUnit, exchangeRate, targetMarginRate, deductionRate) {
  const usdCostPerUnit = exchangeRate ? rmbCostPerUnit / exchangeRate : 0;
  const denominator = 1 - ((clampRate(targetMarginRate) + clampRate(deductionRate)) / 100);
  const usdSellingPerUnit = denominator > 0 ? usdCostPerUnit / denominator : 0;
  const rmbSellingPerUnit = usdSellingPerUnit * exchangeRate;
  return {
    denominator,
    usdCostPerUnit,
    usdSellingPerUnit,
    rmbSellingPerUnit
  };
}

function getLoadingModeByShippingScenario(scenario) {
  return {
    "full-container": "40HQ 常规装柜",
    consolidated: "40HQ 托盘装柜",
    lcl: "20GP 常规装柜"
  }[scenario] || "40HQ 常规装柜";
}

const RAPID_QUOTE_CONFIG = {
  markup: {
    lifecycle: {
      mature: 0.02,
      iterating: 0.035,
      new: 0.06
    },
    complexity: {
      standard: 0.008,
      medium: 0.022,
      high: 0.048
    },
    quality: {
      standard: 0.004,
      premium: 0.015,
      "retail-strict": 0.03
    },
    shipping: {
      "full-container": 0,
      consolidated: 0.018,
      lcl: 0.05
    },
    accessoryGrade: {
      standard: 0.005,
      upgraded: 0.018,
      premium: 0.04
    },
    tradeTerm: {
      EXW: 0.005,
      FOB: 0.015,
      CFR: 0.025,
      CIF: 0.03,
      DDP: 0.05
    },
    specialAccessory: {
      none: 0,
      minor: 0.015,
      major: 0.04
    },
    certification: {
      none: 0,
      standard: 0.01,
      custom: 0.03
    },
    quantityBands: [
      { min: 800, rate: -0.018 },
      { min: 300, rate: -0.008 },
      { max: 99, rate: 0.03 }
    ],
    floor: 0.08,
    lowMarkupFloor: 0.04
  },
  confidence: {
    baseScore: 92,
    minScore: 36,
    maxScore: 96,
    highThreshold: 80,
    mediumThreshold: 60,
    penalties: {
      lifecycle: {
        iterating: { score: 8, tag: "当前为改款产品，部分模具和工艺参数仍存在波动" },
        new: { score: 18, tag: "当前为新品开发，模具、良率和认证摊销偏差较大" }
      },
      complexity: {
        medium: { score: 5, tag: "器型复杂度中等，工时和包装难度会略高于模板均值" },
        high: { score: 14, tag: "当前器型复杂，经验模型对成型和损耗的偏差会放大" }
      },
      quality: {
        premium: { score: 5, tag: "中高端质量等级会增加检验和包装要求" },
        "retail-strict": { score: 12, tag: "严格零售标准会放大良率、包装和售后成本波动" }
      },
      shipping: {
        consolidated: { score: 8, tag: "当前为拼柜场景，物流分摊与交付节奏需要额外确认" },
        lcl: { score: 16, tag: "当前为 LCL 小批量场景，单位物流成本偏差通常较大" }
      },
      accessoryGrade: {
        upgraded: { score: 5, tag: "外购件为升级配置，价格需结合当前供应商档位确认" },
        premium: { score: 12, tag: "外购件为高配或定制，采购价与交期稳定性较弱" }
      },
      certification: {
        standard: { score: 6, tag: "存在常规认证要求，当前按标准摊销口径估算" },
        custom: { score: 20, tag: "存在新增或特殊认证，正式报价前需转完整模式核定" }
      },
      specialAccessory: {
        minor: { score: 8, tag: "存在少量特殊配件，当前按经验价快速估算" },
        major: { score: 18, tag: "核心配件非标准配置，采购价和交期需单独确认" }
      },
      tradeTerm: {
        DDP: { score: 12, tag: "DDP 条款费用口径更复杂，尾程和目的港费用需复核" }
      }
    },
    quantityBands: [
      { max: 99, score: 10, tag: "当前为小批量订单，物流和摊销偏差会被放大" },
      { max: 299, score: 4 }
    ],
    estimatedLoadQtyMissing: { score: 8, tag: "包装尺寸或装柜测算不完整，物流均摊可信度下降" },
    noHistory: { score: 8, tag: "未命中相同模板、市场和客户等级的历史报价" },
    fewHistory: { score: 4 }
  }
};

function getRapidMarkupRate(group, key, fallback = 0) {
  return state.rapidQuoteConfig?.markup?.[group]?.[key] ?? RAPID_QUOTE_CONFIG.markup[group]?.[key] ?? fallback;
}

function getRapidQuantityMarkup(orderQty) {
  const qty = Math.max(Number(orderQty) || 0, 0);
  const quantityBands = state.rapidQuoteConfig?.markup?.quantityBands || RAPID_QUOTE_CONFIG.markup.quantityBands;
  const band = quantityBands.find((item) => (item.min == null || qty >= item.min) && (item.max == null || qty <= item.max));
  return band?.rate ?? 0;
}

function getRapidConfidencePenalty(group, key) {
  return state.rapidQuoteConfig?.confidence?.penalties?.[group]?.[key] || RAPID_QUOTE_CONFIG.confidence.penalties[group]?.[key] || null;
}

function getRapidQuoteConfig() {
  return state.rapidQuoteConfig || RAPID_QUOTE_CONFIG;
}

function resetRapidQuoteConfigState() {
  state.rapidQuoteConfig = JSON.parse(JSON.stringify(RAPID_QUOTE_CONFIG));
}

function getRapidFieldOptionLabel(field, value) {
  const optionMaps = {
    productLifecycle: {
      mature: "成熟老款",
      iterating: "常规改款",
      new: "新品开发"
    },
    complexityLevel: {
      standard: "标准器型",
      medium: "中等复杂",
      high: "高复杂器型"
    },
    qualityLevel: {
      standard: "常规出口",
      premium: "中高端",
      "retail-strict": "严格零售"
    },
    shippingScenario: {
      "full-container": "整柜",
      consolidated: "拼柜",
      lcl: "LCL 小批量"
    },
    accessoryGrade: {
      standard: "标准配置",
      upgraded: "升级配置",
      premium: "高配 / 定制"
    },
    specialCertificationLevel: {
      none: "无特殊认证",
      standard: "常规认证沿用",
      custom: "新增 / 特殊认证"
    },
    specialAccessoryLevel: {
      none: "标准配件",
      minor: "少量特殊件",
      major: "核心特殊件"
    },
  };
  return optionMaps[field]?.[value] || value || "-";
}

function getRapidDriverImpactMeta(field, value, context = {}) {
  const {
    totals = {},
    baseCost = 0,
    tradeTermCode = parseTradeTermCode(state.form.tradeTerm),
    markupComponents = {}
  } = context;
  const packageCostPerUnit = getCostGroupTotal(totals.categoryTotals || {}, costGroups[2].categories);
  const usdImpact = (rate) => formatUsd(baseCost * Math.max(rate || 0, 0));
  const percentValue = (rate) => formatPercent((rate || 0) * 100);
  const markupDetail = (rate, label, extraLines = []) => ({
    metric: `${rate >= 0 ? "+" : ""}${percentValue(rate)}`,
    detailLines: [
      `${label} 当前按 ${percentValue(rate)} 计入经验模型。`,
      `按当前单件成本 ${formatUsd(baseCost)} 折算，对中位报价约影响 ${usdImpact(rate)} / 件。`,
      ...extraLines
    ]
  });

  if (field === "productLifecycle") {
    return {
      tag: "风险",
      ...markupDetail(markupComponents.lifecycleMarkup, "生命周期附加", ["新品和改款会放大试产、模具和良率风险。"])
    };
  }
  if (field === "complexityLevel") {
    return {
      tag: "工艺",
      ...markupDetail(markupComponents.complexityMarkup, "器型复杂度附加", ["复杂器型会抬高成型、修坯和包装工时。"])
    };
  }
  if (field === "qualityLevel") {
    return {
      tag: "品质",
      ...markupDetail(markupComponents.qualityMarkup, "品质标准附加", ["更高品质等级会增加检验、良率和售后预留。"])
    };
  }
  if (field === "shippingScenario") {
    return {
      tag: "物流",
      metric: `${markupComponents.shippingMarkup >= 0 ? "+" : ""}${percentValue(markupComponents.shippingMarkup)}`,
      detailLines: [
        `装运场景附加当前按 ${percentValue(markupComponents.shippingMarkup)} 计入经验模型。`,
        `当前报价条款已计入物流 ${formatRmb(totals.quotedLogisticsPerUnit || 0)} / 件。`,
        `${value === "LCL" ? "LCL 会显著抬高单位物流成本，建议优先报区间高位。" : value === "拼柜" ? "拼柜会削弱整柜分摊优势，物流波动会更大。" : "整柜按标准装柜口径估算，单位物流成本最低。"}`
      ]
    };
  }
  if (field === "accessoryGrade") {
    return {
      tag: "外购",
      ...markupDetail(markupComponents.accessoryGradeMarkup, "外购件档次附加", ["外购件档次越高，采购价带和交期波动越大。"])
    };
  }
  if (field === "includeSeatCover") {
    const includeSeatCover = state.form.includeSeatCover !== "no";
    const seatRule = getPriceLibrary().seatCoverGrade[state.form.seatCoverGrade] || { unitPrice: 0 };
    return {
      tag: "盖板",
      metric: includeSeatCover ? `${state.form.seatCoverGrade || "-"} · ${formatRmb(seatRule.unitPrice || 0)} / 套` : "不含盖板",
      detailLines: includeSeatCover
        ? [
            `当前按“${state.form.seatCoverGrade || "-"}”带入盖板采购成本，约 ${formatRmb(seatRule.unitPrice || 0)} / 套。`,
            "盖板作为马桶配套件计入成本，不再作为独立极速模板报价。"
          ]
        : [
            "当前口径为不含盖板，系统会把盖板采购成本自动归零。",
            "适合客户自配盖板或项目明确不含盖的场景。"
          ]
    };
  }
  if (field === "specialCertificationLevel") {
    return {
      tag: "认证",
      ...markupDetail(markupComponents.certificationMarkup, "认证附加", ["特殊认证会同时降低可信度并推高中位报价。"])
    };
  }
  if (field === "specialAccessoryLevel") {
    return {
      tag: "配件",
      ...markupDetail(markupComponents.accessoryMarkup, "特殊配件附加", ["特殊配件越多，采购确认和交期风险越高。"])
    };
  }
  if (field === "packageGrade") {
    return {
      tag: "包装",
      metric: `${formatRmb(packageCostPerUnit)} / 件`,
      detailLines: [
        `当前包装等级为“${value || "-"}”，包装成本约 ${formatRmb(packageCostPerUnit)} / 件。`,
        `该成本来自包装与出货分类，不直接按百分比加价。`,
        `若改为更高等级包装，系统会同步抬高纸箱、防护和标签成本。`
      ]
    };
  }
  if (field === "tradeTerm") {
    return {
      tag: "条款",
      metric: `${tradeTermCode} · +${percentValue(markupComponents.tradeMarkup)}`,
      detailLines: [
        `贸易条款附加当前按 ${percentValue(markupComponents.tradeMarkup)} 计入经验模型。`,
        `当前条款口径已计入物流 ${formatRmb(totals.quotedLogisticsPerUnit || 0)} / 件，未计入 ${formatRmb(totals.excludedChargesPerUnit || 0)} / 件。`,
        `条款越重，客户看到的报价越容易包含更多运输与履约责任。`
      ]
    };
  }

  return {
    tag: "影响",
    metric: "-",
    detailLines: ["该输入会参与经验模型加价和风险判断。"]
  };
}

function getRapidDriverEntries(form = state.form, context = {}) {
  return [
    { key: "productLifecycle", label: "产品阶段", value: getRapidFieldOptionLabel("productLifecycle", form.productLifecycle) },
    { key: "complexityLevel", label: "器型复杂度", value: getRapidFieldOptionLabel("complexityLevel", form.complexityLevel) },
    { key: "qualityLevel", label: "质量等级", value: getRapidFieldOptionLabel("qualityLevel", form.qualityLevel) },
    { key: "shippingScenario", label: "装运场景", value: getRapidFieldOptionLabel("shippingScenario", form.shippingScenario) },
    { key: "includeSeatCover", label: "是否含盖板", value: form.includeSeatCover === "no" ? "不含盖板" : `含盖板 · ${form.seatCoverGrade || "-"}` },
    { key: "tradeTerm", label: "贸易条款", value: form.tradeTerm || "-" }
  ].map((item) => ({
    ...item,
    ...getRapidDriverImpactMeta(item.key, form[item.key] ?? item.value, context)
  }));
}

function getRapidComparisonRows() {
  const inherited = state.form.inheritedRapidQuote;
  if (!inherited?.sourceForm) {
    return [];
  }
  return getRapidDriverEntries(state.form).map((currentRow) => {
    const beforeValue = inherited.sourceForm[currentRow.key];
    const beforeLabel = [
      "packageGrade",
      "tradeTerm"
    ].includes(currentRow.key)
      ? (beforeValue || "-")
      : getRapidFieldOptionLabel(currentRow.key, beforeValue);
    return {
      label: currentRow.label,
      before: beforeLabel,
      after: currentRow.value,
      changed: beforeLabel !== currentRow.value
    };
  }).filter((row) => row.changed);
}

function isRapidMode() {
  return state.form.quoteMode !== "full";
}

function getRapidManualFieldCount() {
  return 7;
}

function getFullManualFieldCount() {
  return 30;
}

function getQuoteHistory() {
  const rows = window.offlineQuoteStore?.getQuoteSnapshots?.();
  return Array.isArray(rows) ? rows : [];
}

function getRapidHistoryMatches() {
  return getQuoteHistory().filter((item) => (
    item?.form?.templateSelect === state.form.templateSelect
    && item?.form?.destinationMarket === state.form.destinationMarket
  ));
}

function getHistoryTotalsSnapshot(entry) {
  return entry?.totalsSnapshot || entry?.totals || null;
}

function getHistoryAgeWeight(savedAt) {
  const timestamp = new Date(savedAt || 0).getTime();
  if (!timestamp) {
    return 0.65;
  }
  const ageDays = Math.max((Date.now() - timestamp) / (1000 * 60 * 60 * 24), 0);
  return Math.max(0.48, 1 - (ageDays / 540));
}

function getRapidPricingFeedback() {
  const templateId = state.form.templateSelect;
  const market = state.form.destinationMarket;
  const tradeTerm = parseTradeTermCode(state.form.tradeTerm);
  const matchedRows = getQuoteHistory().map((entry) => {
    const totals = getHistoryTotalsSnapshot(entry);
    const cost = Number(totals?.usdCostPerUnit) || 0;
    const selling = Number(totals?.usdSellingPerUnit) || 0;
    if (!(cost > 0) || !(selling > 0)) {
      return null;
    }

    const entryForm = entry?.form || {};
    let matchScore = 0;
    if (entryForm.templateSelect === templateId) {
      matchScore += 0.5;
    }
    if (entryForm.destinationMarket === market) {
      matchScore += 0.25;
    }
    if (parseTradeTermCode(entryForm.tradeTerm) === tradeTerm) {
      matchScore += 0.15;
    }
    if (matchScore < 0.55) {
      return null;
    }

    return {
      entry,
      markup: (selling / cost) - 1,
      matchScore,
      totalWeight: matchScore * getHistoryAgeWeight(entry?.savedAt),
      isExact: entryForm.templateSelect === templateId
        && entryForm.destinationMarket === market
        && parseTradeTermCode(entryForm.tradeTerm) === tradeTerm
    };
  }).filter(Boolean).sort((a, b) => b.totalWeight - a.totalWeight).slice(0, 8);

  if (!matchedRows.length) {
    return {
      sampleCount: 0,
      exactCount: 0,
      recommendedMarkup: 0,
      spreadMarkup: 0,
      confidenceWeight: 0,
      sourceLabel: "启发式经验",
      sourceNote: "暂无可用历史样本，当前完全按模板与规则经验估算。"
    };
  }

  const totalWeight = matchedRows.reduce((sum, row) => sum + row.totalWeight, 0) || 1;
  const recommendedMarkup = matchedRows.reduce((sum, row) => sum + (row.markup * row.totalWeight), 0) / totalWeight;
  const variance = matchedRows.reduce((sum, row) => sum + (((row.markup - recommendedMarkup) ** 2) * row.totalWeight), 0) / totalWeight;
  const spreadMarkup = Math.sqrt(Math.max(variance, 0));
  const exactCount = matchedRows.filter((row) => row.isExact).length;
  const sourceLabel = exactCount >= 2
    ? "同模板同市场经验"
    : exactCount === 1
      ? "近似同模板经验"
      : "模板级经验";
  const confidenceWeight = matchedRows.length >= 5 ? 0.58 : matchedRows.length >= 3 ? 0.4 : 0.22;

  return {
    sampleCount: matchedRows.length,
    exactCount,
    recommendedMarkup,
    spreadMarkup,
    confidenceWeight,
    sourceLabel,
    sourceNote: `采用 ${matchedRows.length} 条近似样本，${exactCount} 条完全命中当前模板、市场和条款。`
  };
}

function getRapidConfidence(totals) {
  const rapidConfig = getRapidQuoteConfig();
  let score = rapidConfig.confidence.baseScore;
  const riskTags = [];
  const penalties = [
    getRapidConfidencePenalty("lifecycle", state.form.productLifecycle),
    getRapidConfidencePenalty("complexity", state.form.complexityLevel),
    getRapidConfidencePenalty("quality", state.form.qualityLevel),
    getRapidConfidencePenalty("shipping", state.form.shippingScenario),
    getRapidConfidencePenalty("accessoryGrade", state.form.accessoryGrade),
    getRapidConfidencePenalty("certification", state.form.specialCertificationLevel),
    getRapidConfidencePenalty("specialAccessory", state.form.specialAccessoryLevel),
    getRapidConfidencePenalty("tradeTerm", parseTradeTermCode(state.form.tradeTerm))
  ].filter(Boolean);
  penalties.forEach((penalty) => {
    score -= penalty.score || 0;
    if (penalty.tag) {
      riskTags.push(penalty.tag);
    }
  });

  const orderQty = getOrderQuantity();
  const quantityPenalty = rapidConfig.confidence.quantityBands.find((item) => item.max != null && orderQty <= item.max);
  if (quantityPenalty) {
    score -= quantityPenalty.score || 0;
    if (quantityPenalty.tag) {
      riskTags.push(quantityPenalty.tag);
    }
  }

  if (!(Number(totals.estimatedLoadQty) > 0)) {
    score -= rapidConfig.confidence.estimatedLoadQtyMissing.score;
    riskTags.push(rapidConfig.confidence.estimatedLoadQtyMissing.tag);
  }

  const historyMatches = getRapidHistoryMatches();
  if (!historyMatches.length) {
    score -= rapidConfig.confidence.noHistory.score;
    riskTags.push(rapidConfig.confidence.noHistory.tag);
  } else if (historyMatches.length < 3) {
    score -= rapidConfig.confidence.fewHistory.score;
  }

  score = Math.max(Math.min(score, rapidConfig.confidence.maxScore), rapidConfig.confidence.minScore);
  const level = score >= rapidConfig.confidence.highThreshold ? "高" : score >= rapidConfig.confidence.mediumThreshold ? "中" : "低";
  return {
    score,
    level,
    historyMatches,
    riskTags: riskTags.slice(0, 5)
  };
}

function getRapidDecisionData(totals) {
  const rapidConfig = getRapidQuoteConfig();
  const confidence = getRapidConfidence(totals);
  const feedback = getRapidPricingFeedback();
  const lifecycleMarkup = getRapidMarkupRate("lifecycle", state.form.productLifecycle, 0.02);
  const complexityMarkup = getRapidMarkupRate("complexity", state.form.complexityLevel, 0.008);
  const qualityMarkup = getRapidMarkupRate("quality", state.form.qualityLevel, 0.004);
  const shippingMarkup = getRapidMarkupRate("shipping", state.form.shippingScenario, 0);
  const accessoryGradeMarkup = getRapidMarkupRate("accessoryGrade", state.form.accessoryGrade, 0.005);
  const tradeMarkup = getRapidMarkupRate("tradeTerm", parseTradeTermCode(state.form.tradeTerm), 0.015);
  const accessoryMarkup = getRapidMarkupRate("specialAccessory", state.form.specialAccessoryLevel, 0);
  const certificationMarkup = getRapidMarkupRate("certification", state.form.specialCertificationLevel, 0);
  const quantityMarkup = getRapidQuantityMarkup(getOrderQuantity());
  const heuristicMarkup = Math.max(
    lifecycleMarkup
    + complexityMarkup
    + qualityMarkup
    + shippingMarkup
    + accessoryGradeMarkup
    + tradeMarkup
    + accessoryMarkup
    + certificationMarkup
    + quantityMarkup,
    rapidConfig.markup.floor
  );
  const midMarkup = Math.max((heuristicMarkup * (1 - feedback.confidenceWeight)) + (feedback.recommendedMarkup * feedback.confidenceWeight), 0.08);
  const spreadBase = confidence.score >= rapidConfig.confidence.highThreshold ? 0.03 : confidence.score >= rapidConfig.confidence.mediumThreshold ? 0.055 : 0.085;
  const spread = Math.max(spreadBase, feedback.spreadMarkup * 0.9);
  const baseCost = Math.max(totals.usdCostPerUnit, 0);
  const midPrice = Math.max(baseCost * (1 + midMarkup), 0);
  const lowPrice = Math.max(baseCost * (1 + Math.max(midMarkup - spread, rapidConfig.markup.lowMarkupFloor)), 0);
  const highPrice = Math.max(baseCost * (1 + midMarkup + spread), 0);
  const midMarginRate = midPrice ? ((midPrice - baseCost) / midPrice) * 100 : 0;
  const lowMarginRate = lowPrice ? ((lowPrice - baseCost) / lowPrice) * 100 : 0;
  const highMarginRate = highPrice ? ((highPrice - baseCost) / highPrice) * 100 : 0;
  const action = confidence.level === "低"
    ? "建议先报区间高位，并尽快转完整模式补齐采购、物流和认证。"
    : confidence.level === "中"
      ? "建议先以中位价试探客户，再根据特殊项决定是否转完整模式。"
      : "可直接用中位价快速试单，进入谈判后再按完整模式做正式核价。";
  const markupComponents = {
    lifecycleMarkup,
    complexityMarkup,
    qualityMarkup,
    shippingMarkup,
    accessoryGradeMarkup,
    tradeMarkup,
    accessoryMarkup,
    certificationMarkup,
    quantityMarkup
  };
  const historyWeight = feedback.confidenceWeight;
  const heuristicWeight = 1 - historyWeight;
  const spreadFloor = Math.max(midMarkup - spread, rapidConfig.markup.lowMarkupFloor);

  return {
    confidence,
    costUsdPerUnit: baseCost,
    midPrice,
    lowPrice,
    highPrice,
    midMarginRate,
    lowMarginRate,
    highMarginRate,
    midMarkupRate: midMarkup * 100,
    heuristicMarkupRate: heuristicMarkup * 100,
    historyMarkupRate: feedback.recommendedMarkup * 100,
    historyWeightRate: historyWeight * 100,
    heuristicWeightRate: heuristicWeight * 100,
    spreadRate: spread * 100,
    spreadBaseRate: spreadBase * 100,
    spreadFloorRate: spreadFloor * 100,
    feedback,
    drivers: getRapidDriverEntries(state.form, {
      totals,
      baseCost,
      tradeTermCode: parseTradeTermCode(state.form.tradeTerm),
      markupComponents
    }),
    markupComponents,
    action
  };
}

function openRapidImpactModal(driver) {
  if (!refs.rapidImpactModal || !driver) {
    return;
  }
  refs.rapidImpactModalTitle.textContent = `${driver.label} · ${driver.value}`;
  refs.rapidImpactModalMeta.textContent = `关键影响：${driver.metric || "-"} ｜ 影响类型：${driver.tag || "影响"}`;
  refs.rapidImpactModalBody.innerHTML = `
    <div class="rapid-impact-summary">
      <span class="rapid-impact-summary-label">关键影响数字</span>
      <strong class="rapid-impact-summary-value">${escapeHtml(driver.metric || "-")}</strong>
      <span class="rapid-impact-summary-tag">${escapeHtml(driver.tag || "影响")}</span>
    </div>
    <div class="rapid-impact-detail-list">
      ${(driver.detailLines || []).map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
    </div>
  `;
  refs.rapidImpactModal.classList.remove("hidden");
}

function closeRapidImpactModal() {
  refs.rapidImpactModal?.classList.add("hidden");
}

function getRapidFormulaSections(decision, totals) {
  const componentRows = [
    { label: "产品阶段附加", value: decision.markupComponents.lifecycleMarkup, explain: `当前为 ${getRapidFieldOptionLabel("productLifecycle", state.form.productLifecycle)}，用于反映新品或改款风险。` },
    { label: "器型复杂度附加", value: decision.markupComponents.complexityMarkup, explain: `当前为 ${getRapidFieldOptionLabel("complexityLevel", state.form.complexityLevel)}，用于反映工艺和工时难度。` },
    { label: "质量等级附加", value: decision.markupComponents.qualityMarkup, explain: `当前为 ${getRapidFieldOptionLabel("qualityLevel", state.form.qualityLevel)}，用于反映良率和检验要求。` },
    { label: "装运场景附加", value: decision.markupComponents.shippingMarkup, explain: `当前为 ${getRapidFieldOptionLabel("shippingScenario", state.form.shippingScenario)}，用于反映物流波动。` },
    { label: "外购件档次附加", value: decision.markupComponents.accessoryGradeMarkup, explain: `当前为 ${getRapidFieldOptionLabel("accessoryGrade", state.form.accessoryGrade)}，用于反映采购价格带。` },
    { label: "贸易条款附加", value: decision.markupComponents.tradeMarkup, explain: `当前按 ${parseTradeTermCode(state.form.tradeTerm)} 条款报价，决定报价承担的物流责任。` },
    { label: "特殊配件附加", value: decision.markupComponents.accessoryMarkup, explain: `当前为 ${getRapidFieldOptionLabel("specialAccessoryLevel", state.form.specialAccessoryLevel)}，用于反映特殊件成本和交期风险。` },
    { label: "特殊认证附加", value: decision.markupComponents.certificationMarkup, explain: `当前为 ${getRapidFieldOptionLabel("specialCertificationLevel", state.form.specialCertificationLevel)}，用于反映认证新增成本。` },
    { label: "数量附加", value: decision.markupComponents.quantityMarkup, explain: `当前订单量 ${getOrderQuantity()} 件，小单会上浮，大单会回落。` }
  ];
  const productCostUsd = totals.exchangeRate ? (totals.productCostPerUnit / totals.exchangeRate) : 0;
  const logisticsCostUsd = Math.max(decision.costUsdPerUnit - productCostUsd, 0);
  const maxPrice = Math.max(decision.highPrice, decision.midPrice, decision.lowPrice, 0.01);
  const priceBars = [
    {
      label: "低位报价",
      total: decision.lowPrice,
      totalWidth: (decision.lowPrice / maxPrice) * 100,
      totalLabel: "保守成交位",
      segments: [
        { label: "成本底盘", value: decision.costUsdPerUnit, className: "base" },
        { label: "低位加价", value: Math.max(decision.lowPrice - decision.costUsdPerUnit, 0), className: "low" }
      ]
    },
    {
      label: "中位报价",
      total: decision.midPrice,
      totalWidth: (decision.midPrice / maxPrice) * 100,
      totalLabel: "推荐试探位",
      segments: [
        { label: "成本底盘", value: decision.costUsdPerUnit, className: "base" },
        { label: "中位加价", value: Math.max(decision.midPrice - decision.costUsdPerUnit, 0), className: "mid" }
      ]
    },
    {
      label: "高位报价",
      total: decision.highPrice,
      totalWidth: 100,
      totalLabel: "谈判上限位",
      segments: [
        { label: "成本底盘", value: decision.costUsdPerUnit, className: "base" },
        { label: "中位加价", value: Math.max(decision.midPrice - decision.costUsdPerUnit, 0), className: "mid" },
        { label: "区间上浮", value: Math.max(decision.highPrice - decision.midPrice, 0), className: "spread" }
      ]
    }
  ];

  return {
    headlineFormula: `中位价 = 单件美金成本 × (1 + 中位加价率)`,
    headlineDetail: `${formatUsd(decision.midPrice)} = ${formatUsd(decision.costUsdPerUnit)} × (1 + ${formatPercent(decision.midMarkupRate)})`,
    rangeFormula: `报价区间 = ${formatUsd(decision.lowPrice)} ~ ${formatUsd(decision.highPrice)}`,
    sections: [
      {
        title: "第一步：单件美金成本",
        formula: `单件美金成本 = 人民币总成本 / 汇率`,
        detail: `${formatUsd(decision.costUsdPerUnit)} = ${formatRmb(totals.totalRmbPerUnit)} / ${formatNumber(totals.exchangeRate, 4)}`,
        explain: [
          `人民币总成本 ${formatRmb(totals.totalRmbPerUnit)}，已经包含经营口径成本 ${formatRmb(totals.operatingCostPerUnit)} 与当前条款物流 ${formatRmb(totals.quotedLogisticsPerUnit)}。`,
          `汇率当前取 ${formatNumber(totals.exchangeRate, 4)}，所以折算后单件美金成本为 ${formatUsd(decision.costUsdPerUnit)}。`
        ]
      },
      {
        title: "第二步：经验基准加价率",
        formula: `经验加价率 = 各项经验参数相加`,
        detail: `${formatPercent(decision.heuristicMarkupRate)} = ${componentRows.map((row) => `${row.value >= 0 ? "+" : ""}${formatPercent(row.value * 100)}`).join(" ")}`,
        explain: componentRows.map((row) => `${row.label} ${formatPercent(row.value * 100)}：${row.explain}`)
      },
      {
        title: "第三步：历史反哺混合",
        formula: `中位加价率 = 经验加价率 × 权重 + 历史建议加价 × 权重`,
        detail: `${formatPercent(decision.midMarkupRate)} = ${formatPercent(decision.heuristicMarkupRate)} × ${formatPercent(decision.heuristicWeightRate)} + ${formatPercent(decision.historyMarkupRate)} × ${formatPercent(decision.historyWeightRate)}`,
        explain: [
          `经验模型当前权重 ${formatPercent(decision.heuristicWeightRate)}，历史反哺当前权重 ${formatPercent(decision.historyWeightRate)}。`,
          `历史建议加价来自 ${decision.feedback.sampleCount} 条近似历史样本，当前建议值为 ${formatPercent(decision.historyMarkupRate)}。`,
          `两者混合后得到中位加价率 ${formatPercent(decision.midMarkupRate)}。`
        ]
      },
      {
        title: "第四步：区间宽度",
        formula: `区间宽度 = max(可信度基础宽度, 历史波动宽度 × 0.9)`,
        detail: `${formatPercent(decision.spreadRate)} = max(${formatPercent(decision.spreadBaseRate)}, ${formatPercent(decision.feedback.spreadMarkup * 100)} × 0.9)`,
        explain: [
          `可信度当前为 ${decision.confidence.level} / ${Math.round(decision.confidence.score)} 分，对应基础宽度 ${formatPercent(decision.spreadBaseRate)}。`,
          `历史样本波动宽度为 ${formatPercent(decision.feedback.spreadMarkup * 100)}，系统取其 90% 参与区间宽度判断。`,
          `最终区间宽度取两者较大值，因此本次使用 ${formatPercent(decision.spreadRate)}。`
        ]
      },
      {
        title: "第五步：低位、中位、高位报价",
        formula: `低位 = 成本 × (1 + max(中位加价率 - 区间宽度, 4%))；中位 = 成本 × (1 + 中位加价率)；高位 = 成本 × (1 + 中位加价率 + 区间宽度)`,
        detail: `${formatUsd(decision.lowPrice)} = ${formatUsd(decision.costUsdPerUnit)} × (1 + ${formatPercent(decision.spreadFloorRate)})；${formatUsd(decision.midPrice)} = ${formatUsd(decision.costUsdPerUnit)} × (1 + ${formatPercent(decision.midMarkupRate)})；${formatUsd(decision.highPrice)} = ${formatUsd(decision.costUsdPerUnit)} × (1 + ${formatPercent(decision.midMarkupRate + decision.spreadRate)})`,
        explain: [
          `低位报价不会低于 4% 的最低加价保护；当前低位实际采用 ${formatPercent(decision.spreadFloorRate)}。`,
          `中位报价是当前最推荐的试探价，为 ${formatUsd(decision.midPrice)}。`,
          `高位报价在中位基础上再加一层区间宽度，适合先试探客户接受度。`
        ]
      }
    ],
    componentRows,
    chartData: {
      productCostUsd,
      logisticsCostUsd,
      priceBars
    }
  };
}

function openRapidFormulaModal(totals) {
  if (!refs.rapidFormulaModal) {
    return;
  }
  const decision = getRapidDecisionData(totals);
  const formula = getRapidFormulaSections(decision, totals);
  refs.rapidFormulaModalTitle.textContent = "报价区间计算公式";
  refs.rapidFormulaModalMeta.textContent = `${formatUsd(decision.lowPrice)} - ${formatUsd(decision.highPrice)} ｜ 点击主结论区间后打开`;
  refs.rapidFormulaModalBody.innerHTML = `
    <div class="rapid-formula-hero">
      <span class="rapid-formula-label">核心公式</span>
      <strong class="rapid-formula-main">${escapeHtml(formula.headlineFormula)}</strong>
      <p class="rapid-formula-sub">${escapeHtml(formula.headlineDetail)}</p>
      <p class="rapid-formula-range">${escapeHtml(formula.rangeFormula)}</p>
    </div>
    <div class="rapid-formula-visuals">
      <article class="rapid-visual-card rapid-visual-card--bars">
        <div class="rapid-visual-head">
          <div>
            <span class="rapid-formula-side-label">价格组成图</span>
            <strong class="rapid-visual-title">低位 / 中位 / 高位是如何由成本和加价叠起来的</strong>
          </div>
          <div class="rapid-visual-legend">
            <span><i class="rapid-legend-dot rapid-legend-dot--base"></i>成本底盘</span>
            <span><i class="rapid-legend-dot rapid-legend-dot--mid"></i>中位加价</span>
            <span><i class="rapid-legend-dot rapid-legend-dot--spread"></i>区间上浮</span>
          </div>
        </div>
        <div class="rapid-price-bars">
          ${formula.chartData.priceBars.map((row) => `
            <div class="rapid-price-bar-row">
              <div class="rapid-price-bar-meta">
                <strong>${escapeHtml(row.label)}</strong>
                <span>${escapeHtml(row.totalLabel)}</span>
              </div>
              <div class="rapid-price-bar-track">
                <div class="rapid-price-bar" style="width:${row.totalWidth}%">
                  ${row.segments.map((segment) => `
                    <span class="rapid-price-bar-segment rapid-price-bar-segment--${escapeHtml(segment.className)} ${row.total && ((segment.value / row.total) * 100) < 18 ? "rapid-price-bar-segment--compact" : ""}" style="width:${row.total ? ((segment.value / row.total) * 100) : 0}%" title="${escapeHtml(`${segment.label} ${formatUsd(segment.value)}`)}">
                      <em>${escapeHtml((row.total && ((segment.value / row.total) * 100) < 18) ? "" : segment.label)}</em>
                    </span>
                  `).join("")}
                </div>
              </div>
              <div class="rapid-price-bar-value">${escapeHtml(formatUsd(row.total))}</div>
              <div class="rapid-price-bar-chips">
                ${row.segments.map((segment) => `
                  <span class="rapid-price-chip rapid-price-chip--${escapeHtml(segment.className)}">${escapeHtml(`${segment.label} ${formatUsd(segment.value)}`)}</span>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="rapid-visual-card rapid-visual-card--base">
        <div class="rapid-visual-head">
          <div>
            <span class="rapid-formula-side-label">成本底盘图</span>
            <strong class="rapid-visual-title">单件美金成本由产品成本和条款物流组成</strong>
          </div>
        </div>
        <div class="rapid-base-stack">
          <span class="rapid-base-stack-segment rapid-base-stack-segment--product ${decision.costUsdPerUnit && ((formula.chartData.productCostUsd / decision.costUsdPerUnit) * 100) < 20 ? "rapid-base-stack-segment--compact" : ""}" style="width:${decision.costUsdPerUnit ? ((formula.chartData.productCostUsd / decision.costUsdPerUnit) * 100) : 0}%" title="${escapeHtml(`产品成本 ${formatUsd(formula.chartData.productCostUsd)}`)}">
            <em>${escapeHtml(decision.costUsdPerUnit && ((formula.chartData.productCostUsd / decision.costUsdPerUnit) * 100) < 20 ? "" : `产品成本 ${formatUsd(formula.chartData.productCostUsd)}`)}</em>
          </span>
          <span class="rapid-base-stack-segment rapid-base-stack-segment--logistics ${decision.costUsdPerUnit && ((formula.chartData.logisticsCostUsd / decision.costUsdPerUnit) * 100) < 20 ? "rapid-base-stack-segment--compact" : ""}" style="width:${decision.costUsdPerUnit ? ((formula.chartData.logisticsCostUsd / decision.costUsdPerUnit) * 100) : 0}%" title="${escapeHtml(`条款物流 ${formatUsd(formula.chartData.logisticsCostUsd)}`)}">
            <em>${escapeHtml(decision.costUsdPerUnit && ((formula.chartData.logisticsCostUsd / decision.costUsdPerUnit) * 100) < 20 ? "" : `条款物流 ${formatUsd(formula.chartData.logisticsCostUsd)}`)}</em>
          </span>
        </div>
        <div class="rapid-base-chips">
          <span class="rapid-price-chip rapid-price-chip--product">产品成本 ${escapeHtml(formatUsd(formula.chartData.productCostUsd))}</span>
          <span class="rapid-price-chip rapid-price-chip--logistics">条款物流 ${escapeHtml(formatUsd(formula.chartData.logisticsCostUsd))}</span>
        </div>
        <div class="rapid-base-metrics">
          <div>
            <span>产品成本</span>
            <strong>${escapeHtml(formatUsd(formula.chartData.productCostUsd))}</strong>
          </div>
          <div>
            <span>条款物流</span>
            <strong>${escapeHtml(formatUsd(formula.chartData.logisticsCostUsd))}</strong>
          </div>
          <div>
            <span>成本底盘</span>
            <strong>${escapeHtml(formatUsd(decision.costUsdPerUnit))}</strong>
          </div>
        </div>
      </article>
    </div>
    <div class="rapid-formula-layout">
      <div class="rapid-formula-main-column">
        <div class="rapid-formula-grid">
          ${formula.sections.map((section) => `
            <article class="rapid-formula-card">
              <span class="rapid-formula-step">${escapeHtml(section.title)}</span>
              <strong class="rapid-formula-expression">${escapeHtml(section.formula)}</strong>
              <code class="rapid-formula-numbers">${escapeHtml(section.detail)}</code>
              <div class="rapid-formula-explain">
                ${section.explain.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </div>
      <aside class="rapid-formula-side-column">
        <article class="rapid-formula-side-card rapid-formula-side-card--summary">
          <span class="rapid-formula-side-label">区间摘要</span>
          <div class="rapid-formula-kpis">
            <div class="rapid-formula-kpi">
              <span>单件美金成本</span>
              <strong>${escapeHtml(formatUsd(decision.costUsdPerUnit))}</strong>
            </div>
            <div class="rapid-formula-kpi">
              <span>中位加价率</span>
              <strong>${escapeHtml(formatPercent(decision.midMarkupRate))}</strong>
            </div>
            <div class="rapid-formula-kpi">
              <span>区间宽度</span>
              <strong>${escapeHtml(formatPercent(decision.spreadRate))}</strong>
            </div>
            <div class="rapid-formula-kpi">
              <span>可信度</span>
              <strong>${escapeHtml(`${decision.confidence.level} / ${Math.round(decision.confidence.score)} 分`)}</strong>
            </div>
          </div>
        </article>
        <article class="rapid-formula-side-card">
          <span class="rapid-formula-side-label">经验参数组成</span>
          <div class="rapid-formula-component-list">
            ${formula.componentRows.map((row) => `
              <div class="rapid-formula-component-row">
                <div>
                  <span>${escapeHtml(row.label)}</span>
                  <p>${escapeHtml(row.explain)}</p>
                </div>
                <strong>${escapeHtml(`${row.value >= 0 ? "+" : ""}${formatPercent(row.value * 100)}`)}</strong>
              </div>
            `).join("")}
          </div>
        </article>
        <article class="rapid-formula-side-card">
          <span class="rapid-formula-side-label">历史混合口径</span>
          <div class="rapid-formula-mix-list">
            <div class="rapid-formula-mix-row">
              <span>经验模型权重</span>
              <strong>${escapeHtml(formatPercent(decision.heuristicWeightRate))}</strong>
            </div>
            <div class="rapid-formula-mix-row">
              <span>历史反哺权重</span>
              <strong>${escapeHtml(formatPercent(decision.historyWeightRate))}</strong>
            </div>
            <div class="rapid-formula-mix-row">
              <span>历史建议加价</span>
              <strong>${escapeHtml(formatPercent(decision.historyMarkupRate))}</strong>
            </div>
            <div class="rapid-formula-mix-row">
              <span>命中历史样本</span>
              <strong>${escapeHtml(`${decision.feedback.sampleCount} 条`)}</strong>
            </div>
          </div>
        </article>
      </aside>
    </div>
  `;
  refs.rapidFormulaModal.classList.remove("hidden");
}

function closeRapidFormulaModal() {
  refs.rapidFormulaModal?.classList.add("hidden");
}

function openRapidConfigModal() {
  refs.rapidConfigModal?.classList.remove("hidden");
}

function closeRapidConfigModal() {
  refs.rapidConfigModal?.classList.add("hidden");
}

function renderRapidConfigPanel() {
  if (!refs.rapidConfigPanel) {
    return;
  }
  const rapidConfig = getRapidQuoteConfig();
  const levelRows = [
    ["成熟老款", "mature"],
    ["常规改款", "iterating"],
    ["新品开发", "new"]
  ];
  const complexityRows = [
    ["标准器型", "standard"],
    ["中等复杂", "medium"],
    ["高复杂器型", "high"]
  ];
  const shippingRows = [
    ["整柜", "full-container"],
    ["拼柜", "consolidated"],
    ["LCL", "lcl"]
  ];
  const certificationRows = [
    ["无特殊认证", "none"],
    ["常规认证沿用", "standard"],
    ["新增 / 特殊认证", "custom"]
  ];
  const qualityRows = [
    ["常规出口", "standard"],
    ["中高端", "premium"],
    ["严格零售", "retail-strict"]
  ];
  const accessoryGradeRows = [
    ["标准配置", "standard"],
    ["升级配置", "upgraded"],
    ["高配 / 定制", "premium"]
  ];
  const tradeTermRows = [
    ["EXW", "EXW"],
    ["FOB", "FOB"],
    ["CFR", "CFR"],
    ["CIF", "CIF"],
    ["DDP", "DDP"]
  ];
  const specialAccessoryRows = [
    ["标准配件", "none"],
    ["少量特殊件", "minor"],
    ["核心特殊件", "major"]
  ];
  const confidenceRows = [
    ["高可信阈值", "highThreshold"],
    ["中可信阈值", "mediumThreshold"],
    ["基础分", "baseScore"],
    ["最低分", "minScore"],
    ["最高分", "maxScore"]
  ];
  const renderPercentInput = (label, path, value) => `
    <label>
      <span>${label}</span>
      <input data-rapid-config-path="${path}" type="number" step="0.1" value="${formatNumber((value || 0) * 100, 2)}">
    </label>
  `;
  const renderScoreInput = (label, path, value) => `
    <label>
      <span>${label}</span>
      <input data-rapid-config-path="${path}" type="number" step="1" value="${formatNumber(value || 0, 0)}">
    </label>
  `;

  refs.rapidConfigPanel.innerHTML = `
    <article class="rapid-config-card">
      <div class="rapid-config-head">
        <strong>利润与基线</strong>
        <span>决定极速模式条款附加和最低加价保护</span>
      </div>
      <div class="rapid-config-fields">
        ${tradeTermRows.map(([label, key]) => renderPercentInput(`${label} 条款`, `markup.tradeTerm.${key}`, rapidConfig.markup.tradeTerm[key])).join("")}
        ${renderPercentInput("经验下限", "markup.floor", rapidConfig.markup.floor)}
        ${renderPercentInput("低位保护", "markup.lowMarkupFloor", rapidConfig.markup.lowMarkupFloor)}
      </div>
    </article>
    <article class="rapid-config-card">
      <div class="rapid-config-head">
        <strong>工艺与复杂度</strong>
        <span>决定新品、复杂器型对区间中位价的抬升幅度</span>
      </div>
      <div class="rapid-config-fields">
        ${levelRows.map(([label, key]) => renderPercentInput(label, `markup.lifecycle.${key}`, rapidConfig.markup.lifecycle[key])).join("")}
        ${complexityRows.map(([label, key]) => renderPercentInput(label, `markup.complexity.${key}`, rapidConfig.markup.complexity[key])).join("")}
        ${qualityRows.map(([label, key]) => renderPercentInput(label, `markup.quality.${key}`, rapidConfig.markup.quality[key])).join("")}
        ${accessoryGradeRows.map(([label, key]) => renderPercentInput(label, `markup.accessoryGrade.${key}`, rapidConfig.markup.accessoryGrade[key])).join("")}
      </div>
    </article>
    <article class="rapid-config-card">
      <div class="rapid-config-head">
        <strong>物流与特殊项</strong>
        <span>决定拼柜、认证、特殊配件和数量档对快报区间的拉升</span>
      </div>
      <div class="rapid-config-fields">
        ${shippingRows.map(([label, key]) => renderPercentInput(label, `markup.shipping.${key}`, rapidConfig.markup.shipping[key])).join("")}
        ${certificationRows.map(([label, key]) => renderPercentInput(label, `markup.certification.${key}`, rapidConfig.markup.certification[key])).join("")}
        ${specialAccessoryRows.map(([label, key]) => renderPercentInput(label, `markup.specialAccessory.${key}`, rapidConfig.markup.specialAccessory[key])).join("")}
        ${renderPercentInput("300 件及以上", "markup.quantityBands.1.rate", rapidConfig.markup.quantityBands?.[1]?.rate)}
        ${renderPercentInput("800 件及以上", "markup.quantityBands.0.rate", rapidConfig.markup.quantityBands?.[0]?.rate)}
        ${renderPercentInput("99 件及以下", "markup.quantityBands.2.rate", rapidConfig.markup.quantityBands?.[2]?.rate)}
      </div>
    </article>
    <article class="rapid-config-card">
      <div class="rapid-config-head">
        <strong>可信度规则</strong>
        <span>决定区间宽度的分档和风险判断敏感度</span>
      </div>
      <div class="rapid-config-fields">
        ${confidenceRows.map(([label, key]) => renderScoreInput(label, `confidence.${key}`, rapidConfig.confidence[key])).join("")}
        ${renderScoreInput("小单扣分", "confidence.quantityBands.0.score", rapidConfig.confidence.quantityBands?.[0]?.score)}
        ${renderScoreInput("中小单扣分", "confidence.quantityBands.1.score", rapidConfig.confidence.quantityBands?.[1]?.score)}
        ${renderScoreInput("缺少装柜数据扣分", "confidence.estimatedLoadQtyMissing.score", rapidConfig.confidence.estimatedLoadQtyMissing?.score)}
        ${renderScoreInput("无历史样本扣分", "confidence.noHistory.score", rapidConfig.confidence.noHistory?.score)}
        ${renderScoreInput("历史样本偏少扣分", "confidence.fewHistory.score", rapidConfig.confidence.fewHistory?.score)}
      </div>
    </article>
    <article class="rapid-config-card">
      <div class="rapid-config-head">
        <strong>输入项风险扣分</strong>
        <span>这里控制不同判断项对可信度分的扣减幅度，文案提示仍保持系统默认。</span>
      </div>
      <div class="rapid-config-fields">
        ${renderScoreInput("改款产品", "confidence.penalties.lifecycle.iterating.score", rapidConfig.confidence.penalties.lifecycle.iterating?.score)}
        ${renderScoreInput("新品开发", "confidence.penalties.lifecycle.new.score", rapidConfig.confidence.penalties.lifecycle.new?.score)}
        ${renderScoreInput("中等复杂", "confidence.penalties.complexity.medium.score", rapidConfig.confidence.penalties.complexity.medium?.score)}
        ${renderScoreInput("高复杂器型", "confidence.penalties.complexity.high.score", rapidConfig.confidence.penalties.complexity.high?.score)}
        ${renderScoreInput("中高端质量", "confidence.penalties.quality.premium.score", rapidConfig.confidence.penalties.quality.premium?.score)}
        ${renderScoreInput("严格零售", "confidence.penalties.quality.retail-strict.score", rapidConfig.confidence.penalties.quality["retail-strict"]?.score)}
        ${renderScoreInput("拼柜", "confidence.penalties.shipping.consolidated.score", rapidConfig.confidence.penalties.shipping.consolidated?.score)}
        ${renderScoreInput("LCL", "confidence.penalties.shipping.lcl.score", rapidConfig.confidence.penalties.shipping.lcl?.score)}
        ${renderScoreInput("升级外购件", "confidence.penalties.accessoryGrade.upgraded.score", rapidConfig.confidence.penalties.accessoryGrade.upgraded?.score)}
        ${renderScoreInput("高配外购件", "confidence.penalties.accessoryGrade.premium.score", rapidConfig.confidence.penalties.accessoryGrade.premium?.score)}
        ${renderScoreInput("常规认证沿用", "confidence.penalties.certification.standard.score", rapidConfig.confidence.penalties.certification.standard?.score)}
        ${renderScoreInput("新增特殊认证", "confidence.penalties.certification.custom.score", rapidConfig.confidence.penalties.certification.custom?.score)}
        ${renderScoreInput("少量特殊件", "confidence.penalties.specialAccessory.minor.score", rapidConfig.confidence.penalties.specialAccessory.minor?.score)}
        ${renderScoreInput("核心特殊件", "confidence.penalties.specialAccessory.major.score", rapidConfig.confidence.penalties.specialAccessory.major?.score)}
        ${renderScoreInput("DDP 条款", "confidence.penalties.tradeTerm.DDP.score", rapidConfig.confidence.penalties.tradeTerm.DDP?.score)}
      </div>
    </article>
  `;
}

function renderModeStrategy(totals) {
  if (!refs.modeStrategyPanel) {
    return;
  }
  const rapid = isRapidMode();
  const tradeMeta = getTradeTermMeta();
  const cards = rapid ? [
    {
      title: "当前模式",
      value: "极速报价",
      desc: `聚焦 ${getRapidManualFieldCount()} 个关键输入，优先给客户参考价与谈判区间。`
    },
    {
      title: "字段边界",
      value: "轻字段",
      desc: "录入客户等级、市场、数量、尺寸、净重，以及复杂度、质量、装运和外购件档次，其余按模板和经验库自动带出。"
    },
    {
      title: "输出口径",
      value: "区间报价",
      desc: `当前按 ${tradeMeta.label} 形成参考区间价，适合先快报、后深算。`
    }
  ] : [
    {
      title: "当前模式",
      value: "完整模式",
      desc: `面向正式核价与审批，进入超过 ${getFullManualFieldCount()} 个字段的全口径成本拆解。`
    },
    {
      title: "字段边界",
      value: "全字段",
      desc: "可补录 BOM、物流、认证、联系人、产量和详细利润预留，形成可审批、可追溯结果。"
    },
    {
      title: "输出口径",
      value: "正式核价",
      desc: `当前按 ${tradeMeta.label} 输出正式报价、阶梯价和完整预览，适合提交审批。`
    }
  ];

  refs.modeStrategyPanel.innerHTML = cards.map((card) => `
    <article class="mode-strategy-card">
      <span class="mode-strategy-title">${escapeHtml(card.title)}</span>
      <strong class="mode-strategy-value">${escapeHtml(card.value)}</strong>
      <p class="mode-strategy-desc">${escapeHtml(card.desc)}</p>
    </article>
  `).join("");
}

function getRapidHeaderFacts(totals) {
  const templateLabel = getTemplateById(state.form.templateSelect)?.label || state.form.productName || "未设置模板";
  return [
    { label: "模板 / 型号", value: `${templateLabel} / ${state.form.modelCode || "-"}` },
    { label: "客户 / 来源", value: `${state.form.customerName || "未填"} / ${state.form.customerSource || "未填"}` },
    { label: "市场 / 条款", value: `${state.form.destinationMarket || "-"} / ${parseTradeTermCode(state.form.tradeTerm)}` },
    { label: "数量 / 重量", value: `${formatNumber(getOrderQuantity(), 0)} 件 / ${formatNumber(totals.productNetWeight || state.form.productNetWeight || 0, 2)} KG` },
    { label: "包装测算", value: totals.estimatedLoadQty ? `${totals.estimatedLoadQty} 件/柜` : "待测算" },
    { label: "盖板方案", value: state.form.includeSeatCover === "no" ? "不含盖板" : `含盖板 / ${state.form.seatCoverGrade || "-"}` }
  ];
}

function getShouldCostBreakdownRows(totals) {
  return [
    { label: "材料配件包装", rmb: totals.materialsPackagingPerUnit, usd: totals.exchangeRate ? totals.materialsPackagingPerUnit / totals.exchangeRate : 0, note: "泥料、釉料、配件和包装合并看主材底盘" },
    { label: "直接人工", rmb: totals.directLaborPerUnit, usd: totals.exchangeRate ? totals.directLaborPerUnit / totals.exchangeRate : 0, note: "成型、施釉、修补质检等一线人工" },
    { label: "制造费用", rmb: totals.manufacturingOverheadPerUnit, usd: totals.exchangeRate ? totals.manufacturingOverheadPerUnit / totals.exchangeRate : 0, note: "能耗、损耗、模具、认证和管理分摊" },
    { label: "Order Add-ons 订单附加", rmb: totals.orderSurchargePerUnit, usd: totals.exchangeRate ? totals.orderSurchargePerUnit / totals.exchangeRate : 0, note: "小单、特殊包装、测试、试产与改版附加" },
    { label: "Operating 经营费用", rmb: totals.operatingExpensePerUnit, usd: totals.exchangeRate ? totals.operatingExpensePerUnit / totals.exchangeRate : 0, note: `出厂完全成本 × ${formatNumber(totals.operatingExpenseRate, 2)}%` },
    { label: "Quoted Logistics 报价口径物流", rmb: totals.quotedLogisticsPerUnit, usd: totals.exchangeRate ? totals.quotedLogisticsPerUnit / totals.exchangeRate : 0, note: `${totals.tradeTermCode} 条款已计入部分` },
    { label: "Profit 利润及预留", rmb: totals.profitPerUnit, usd: totals.exchangeRate ? totals.profitPerUnit / totals.exchangeRate : 0, note: "目标净毛利、佣金、售后和汇率风险预留" }
  ];
}

function renderRapidDecision(totals) {
  if (!refs.rapidDecisionPanel) {
    return;
  }
  const rapid = isRapidMode();
  if (!rapid) {
    refs.rapidDecisionPanel.innerHTML = `
      <article class="rapid-decision-card rapid-decision-card--wide">
        <span class="rapid-decision-label">完整模式已启用</span>
        <strong class="rapid-decision-value">当前转入正式核价</strong>
        <p class="rapid-decision-note">请继续在 BOM、物流、认证、价格库和审批参数中补齐正式核价依据。</p>
      </article>
    `;
    return;
  }

  const decision = getRapidDecisionData(totals);
  const headerFacts = getRapidHeaderFacts(totals);
  refs.rapidDecisionPanel.innerHTML = `
    <article class="rapid-decision-card rapid-decision-card--hero rapid-decision-card--wide">
      <div class="rapid-hero-topline">
        <span class="rapid-hero-eyebrow">系统结论</span>
        <span class="rapid-hero-badge">建议报价区间</span>
      </div>
      <button class="rapid-formula-trigger" type="button" data-action="show-rapid-formula" aria-label="查看报价区间计算公式">
        <strong class="rapid-decision-value rapid-decision-value--hero">${escapeHtml(`${formatUsd(decision.lowPrice)} - ${formatUsd(decision.highPrice)}`)}</strong>
        <span class="rapid-formula-trigger-hint">点击查看公式与数字解释</span>
      </button>
      <p class="rapid-decision-note rapid-decision-note--hero">推荐中位价 ${escapeHtml(formatUsd(decision.midPrice))}，当前经验加价率约 ${escapeHtml(formatNumber(decision.midMarkupRate, 2))}% 。</p>
      <div class="rapid-price-meta rapid-price-meta--hero">
        <span>低位毛利 ${escapeHtml(formatNumber(decision.lowMarginRate, 2))}%</span>
        <span>中位毛利 ${escapeHtml(formatNumber(decision.midMarginRate, 2))}%</span>
        <span>高位毛利 ${escapeHtml(formatNumber(decision.highMarginRate, 2))}%</span>
        <span>历史建议加价 ${escapeHtml(formatNumber(decision.feedback.recommendedMarkup * 100, 2))}%</span>
      </div>
      <div class="rapid-hero-footer">
        <div class="rapid-conclusion-callout">
          <span>建议动作</span>
          <p>${escapeHtml(decision.action)}</p>
        </div>
        <div class="rapid-action-row">
          <button class="secondary" type="button" data-action="open-rapid-config">极速报价参数中心</button>
          <button class="secondary dark" type="button" data-action="convert-to-full">转完整模式深算</button>
        </div>
      </div>
    </article>
    <article class="rapid-decision-card">
      <span class="rapid-decision-label">参考完全成本</span>
      <strong class="rapid-decision-value">${escapeHtml(formatUsd(decision.costUsdPerUnit))}</strong>
      <p class="rapid-decision-note">当前成本按模板、默认物流和风险预留自动估算。</p>
    </article>
    <article class="rapid-decision-card">
      <span class="rapid-decision-label">可信度</span>
      <strong class="rapid-decision-value">${escapeHtml(`${decision.confidence.level} / ${Math.round(decision.confidence.score)} 分`)}</strong>
      <p class="rapid-decision-note">命中同类历史报价 ${decision.confidence.historyMatches.length} 条。</p>
    </article>
    <article class="rapid-decision-card">
      <span class="rapid-decision-label">历史反哺</span>
      <strong class="rapid-decision-value">${escapeHtml(decision.feedback.sourceLabel)}</strong>
      <p class="rapid-decision-note">${escapeHtml(decision.feedback.sourceNote)}</p>
    </article>
    <article class="rapid-decision-card rapid-decision-card--wide">
      <span class="rapid-decision-label">快报核价抬头</span>
      <strong class="rapid-decision-value">把旧核价表的一页关键信息翻译成极速摘要</strong>
      <p class="rapid-decision-note">方便业务先确认这是哪一款、报给谁、按什么条款和重量口径在快报。</p>
      <div class="should-cost-fact-grid">
        ${headerFacts.map((item) => `
          <div class="should-cost-fact">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
          </div>
        `).join("")}
      </div>
    </article>
    <article class="rapid-decision-card rapid-decision-card--wide">
      <span class="rapid-decision-label">手动输入项</span>
      <strong class="rapid-decision-value">输入依据如何影响结果</strong>
      <p class="rapid-decision-note">左侧能看到字段本身，这里只解释它们是如何影响区间、风险和可信度的。</p>
      <details class="driver-detail-panel">
        <summary class="driver-detail-summary">
          <span>展开查看 ${decision.drivers.length} 项输入如何影响结果</span>
          <span class="driver-detail-hint">默认折叠，避免和左侧重复</span>
        </summary>
        <div class="driver-impact-list">
          ${decision.drivers.map((driver) => `
            <div class="driver-impact-row">
              <div class="driver-impact-main">
                <span>手动输入 · ${escapeHtml(driver.label)}</span>
                <strong>${escapeHtml(driver.value)}</strong>
              </div>
              <div class="driver-impact-side">
                <em class="decision-driver-tag">${escapeHtml(driver.metric || "-")}</em>
                <button class="ghost-link" type="button" data-action="show-driver-detail" data-driver-key="${escapeHtml(driver.key)}">查看详情</button>
              </div>
            </div>
          `).join("")}
        </div>
      </details>
      <div class="rapid-risk-tags">${decision.confidence.riskTags.length
        ? decision.confidence.riskTags.map((tag) => `<span class="rapid-risk-tag">${escapeHtml(tag)}</span>`).join("")
        : `<span class="rapid-risk-tag rapid-risk-tag--safe">当前命中标准模板与常规参数，风险较低</span>`}
      </div>
    </article>
  `;
}

function getFullGovernanceData(totals) {
  const formalPrice = totals.usdSellingPerUnit;
  const totalCost = totals.usdCostPerUnit;
  const grossMarginRate = totals.netMarginRate ?? (formalPrice ? ((formalPrice - totalCost) / formalPrice) * 100 : 0);
  const targetGrossMarginRate = Math.max(Number(state.form.targetGrossMarginRate) || 0, 0);
  const floorGrossMarginRate = Math.max(Number(state.form.floorGrossMarginRate) || 0, 0);
  const floorDenominator = 1 - ((floorGrossMarginRate + (totals.salesDeductionRate || 0)) / 100);
  const targetDenominator = 1 - ((targetGrossMarginRate + (totals.salesDeductionRate || 0)) / 100);
  const floorPrice = floorDenominator > 0 ? totalCost / floorDenominator : 0;
  const approvalPrice = targetDenominator > 0 ? totalCost / targetDenominator : 0;
  const status = grossMarginRate < floorGrossMarginRate
    ? "需特批"
    : grossMarginRate < targetGrossMarginRate
      ? "需审批"
      : "可直接提交";
  const note = status === "需特批"
    ? "当前正式价低于底线净毛利，必须填写特批原因并走升级审批。"
    : status === "需审批"
      ? "当前正式价未达到目标净毛利，建议走常规审批流程。"
      : "当前正式价满足目标净毛利，可按常规流程提交。";

  return {
    totalCost,
    formalPrice,
    grossMarginRate,
    grossMarginBeforeDeductionsRate: totals.grossMarginRate || grossMarginRate,
    salesDeductionRate: totals.salesDeductionRate || 0,
    targetGrossMarginRate,
    floorGrossMarginRate,
    floorPrice,
    approvalPrice,
    status,
    note
  };
}

function renderFullGovernance(totals) {
  if (!refs.fullGovernancePanel) {
    return;
  }
  if (isRapidMode()) {
    refs.fullGovernancePanel.innerHTML = `
      <article class="governance-card governance-card--wide">
        <span class="governance-label">完整模式未启用</span>
        <strong class="governance-value">当前仍是预估报价阶段</strong>
        <p class="governance-note">切换或转换到完整模式后，这里会展示正式价、审批价、底价和毛利治理结果。</p>
      </article>
    `;
    return;
  }

  const governance = getFullGovernanceData(totals);
  const shouldCostRows = getShouldCostBreakdownRows(totals);
  const toneClass = governance.status === "需特批"
    ? "governance-card--danger"
    : governance.status === "需审批"
      ? "governance-card--warn"
      : "governance-card--safe";

  refs.fullGovernancePanel.innerHTML = `
    <article class="governance-card">
      <span class="governance-label">正式报价</span>
      <strong class="governance-value">${escapeHtml(formatUsd(governance.formalPrice))}</strong>
      <p class="governance-note">当前完整模式下的正式对外报价。</p>
    </article>
    <article class="governance-card">
      <span class="governance-label">审批价</span>
      <strong class="governance-value">${escapeHtml(formatUsd(governance.approvalPrice))}</strong>
      <p class="governance-note">满足目标净毛利 ${escapeHtml(formatNumber(governance.targetGrossMarginRate, 2))}% 且覆盖销售额预留 ${escapeHtml(formatNumber(governance.salesDeductionRate, 2))}% 的建议审批价。</p>
    </article>
    <article class="governance-card">
      <span class="governance-label">底价</span>
      <strong class="governance-value">${escapeHtml(formatUsd(governance.floorPrice))}</strong>
      <p class="governance-note">低于该价格将跌破底线净毛利 ${escapeHtml(formatNumber(governance.floorGrossMarginRate, 2))}% 。</p>
    </article>
    <article class="governance-card ${toneClass}">
      <span class="governance-label">净毛利治理</span>
      <strong class="governance-value">${escapeHtml(`${formatNumber(governance.grossMarginRate, 2)}% / ${governance.status}`)}</strong>
      <p class="governance-note">${escapeHtml(governance.note)}</p>
    </article>
    <article class="governance-card governance-card--wide">
      <span class="governance-label">Should Cost 核价总表</span>
      <strong class="governance-value">把旧 Excel 的成本核价模型翻译成当前完整模式总表</strong>
      <p class="governance-note">先看成本底盘，再看利润和汇率，避免把费用、利润和对客报价混在一起。</p>
      <div class="should-cost-table">
        <div class="should-cost-table-head">
          <span>核价分类</span>
          <span>RMB / 件</span>
          <span>USD / 件</span>
          <span>说明</span>
        </div>
        ${shouldCostRows.map((row) => `
          <div class="should-cost-table-row">
            <span>${escapeHtml(row.label)}</span>
            <strong>${escapeHtml(formatRmb(row.rmb))}</strong>
            <strong>${escapeHtml(formatUsd(row.usd))}</strong>
            <span>${escapeHtml(row.note)}</span>
          </div>
        `).join("")}
        <div class="should-cost-table-row should-cost-table-row--total">
          <span>Total Cost 合计成本</span>
          <strong>${escapeHtml(formatRmb(totals.totalRmbPerUnit))}</strong>
          <strong>${escapeHtml(formatUsd(totals.usdCostPerUnit))}</strong>
          <span>人民币总成本按汇率 ${escapeHtml(formatNumber(totals.exchangeRate, 4))} 折算</span>
        </div>
        <div class="should-cost-table-row should-cost-table-row--total">
          <span>USD Selling 对客报价</span>
          <strong>${escapeHtml(formatRmb(totals.totalRmbPerUnit + totals.profitPerUnit))}</strong>
          <strong>${escapeHtml(formatUsd(totals.usdSellingPerUnit))}</strong>
          <span>成本底盘 + 利润及预留后的正式报价口径</span>
        </div>
      </div>
    </article>
    <article class="governance-card governance-card--wide">
      <span class="governance-label">审批关注点</span>
      <strong class="governance-value">${escapeHtml(state.form.specialApprovalReason || "未填写特批说明")}</strong>
      <p class="governance-note">建议在完整模式下记录低毛利原因、客户战略背景、账期、认证和物流异常等事项。</p>
    </article>
    ${state.form.inheritedRapidQuote ? `
    <article class="governance-card governance-card--wide">
      <span class="governance-label">承接自极速报价</span>
      <strong class="governance-value">${escapeHtml(`${formatUsd(state.form.inheritedRapidQuote.lowPrice || 0)} - ${formatUsd(state.form.inheritedRapidQuote.highPrice || 0)}`)}</strong>
      <p class="governance-note">
        ${escapeHtml(`转完整前的中位价 ${formatUsd(state.form.inheritedRapidQuote.midPrice || 0)}，可信度 ${state.form.inheritedRapidQuote.confidenceLevel || "-"} / ${Math.round(state.form.inheritedRapidQuote.confidenceScore || 0)} 分。`)}
      </p>
      <div class="decision-driver-grid">
        ${(state.form.inheritedRapidQuote.drivers || []).map((driver) => `
          <div class="decision-driver-chip">
            <span>${escapeHtml(driver.label)}</span>
            <strong>${escapeHtml(driver.value)}</strong>
          </div>
        `).join("")}
      </div>
      <div class="rapid-risk-tags">${Array.isArray(state.form.inheritedRapidQuote.riskTags) && state.form.inheritedRapidQuote.riskTags.length
        ? state.form.inheritedRapidQuote.riskTags.map((tag) => `<span class="rapid-risk-tag">${escapeHtml(tag)}</span>`).join("")
        : `<span class="rapid-risk-tag rapid-risk-tag--safe">转完整前未记录额外风险标签</span>`}
      </div>
    </article>
    ${(() => {
      const diffRows = getRapidComparisonRows();
      return `
      <article class="governance-card governance-card--wide">
        <span class="governance-label">快报到核价差异</span>
        <strong class="governance-value">${escapeHtml(diffRows.length ? `${diffRows.length} 项已修正` : "关键判断项未发生偏移")}</strong>
        <p class="governance-note">用于复核哪些极速判断项在正式核价阶段被修正，避免快报依据失真后无人追踪。</p>
        ${diffRows.length ? `
        <div class="comparison-table">
          ${diffRows.map((row) => `
            <div class="comparison-row">
              <span class="comparison-label">${escapeHtml(row.label)}</span>
              <span class="comparison-before">${escapeHtml(row.before)}</span>
              <span class="comparison-arrow">→</span>
              <span class="comparison-after">${escapeHtml(row.after)}</span>
            </div>
          `).join("")}
        </div>
        ` : `<div class="comparison-empty">当前完整模式仍沿用极速模式的关键判断项。</div>`}
      </article>
      `;
    })()}
    ` : ""}
  `;
}

function convertRapidToFullMode() {
  if (!isRapidMode()) {
    return;
  }
  const totals = getSummaryValues();
  const decision = getRapidDecisionData(totals);
  state.form.sourceQuoteMode = "rapid";
  state.form.convertedFromRapidAt = new Date().toISOString();
  state.form.quoteStage = "formal";
  state.form.pricingBasis = "full-cost";
  state.form.inheritedRapidQuote = {
    quoteCode: state.quoteCode,
    convertedAt: state.form.convertedFromRapidAt,
    lowPrice: decision.lowPrice,
    midPrice: decision.midPrice,
    highPrice: decision.highPrice,
    costUsdPerUnit: decision.costUsdPerUnit,
    confidenceLevel: decision.confidence.level,
    confidenceScore: decision.confidence.score,
    historySamples: decision.feedback.sampleCount,
    feedbackSourceLabel: decision.feedback.sourceLabel,
    riskTags: decision.confidence.riskTags,
    drivers: decision.drivers,
    sourceForm: Object.fromEntries(getRapidDriverEntries().map((driver) => [driver.key, state.form[driver.key] || ""]))
  };
  setQuoteMode("full");
  showToast("已从极速模式切换到完整模式，请继续补齐正式核价字段");
}

function findRowByItemId(rows, itemId) {
  return rows.find((row) => row.itemId === itemId && !row.custom);
}

function setRowAutoUnitPrice(row, unitPrice, note) {
  if (!row || row.autoPriced === false) {
    return;
  }
  row.unitPrice = Number(unitPrice || 0);
  if (note) {
    row.note = note;
  }
}

function calculateCertificationUnitPrice() {
  const normalized = String(state.form.certificationRequirement || "").toUpperCase();
  const matched = getPriceLibrary().certificationKeywords.filter((item) => normalized.includes(item.keyword));
  if (!matched.length) {
    return {
      unitPrice: state.form.destinationMarket.includes("美国") || state.form.destinationMarket.includes("北美") ? 2.2 : 1.2,
      note: "按目标市场默认认证口径"
    };
  }
  return {
    unitPrice: matched.reduce((sum, item) => sum + item.unitPrice, 0),
    note: matched.map((item) => item.note).join(" + ")
  };
}

function calculateInspectionUnitPrice() {
  const certificationText = String(state.form.certificationRequirement || "").toUpperCase();
  let inspectionUnitPrice = 1.2;
  if (certificationText.includes("ISTA")) {
    inspectionUnitPrice += 0.8;
  }
  if (certificationText.includes("MAP")) {
    inspectionUnitPrice += 0.5;
  }
  if ((state.form.packageGrade || "").includes("电商")) {
    inspectionUnitPrice += 0.6;
  }
  return {
    unitPrice: Number(inspectionUnitPrice.toFixed(2)),
    note: "按包装与认证测试要求预估"
  };
}

function getCeramicMaterialRate() {
  return getPriceLibrary().ceramicMaterialRates?.default || { clayCostPerKg: 0, glazeCostPerKg: 0, additiveCostPerKgClay: 0 };
}

function getCeramicProcessProfile() {
  return getPriceLibrary().ceramicProcessProfiles?.[getTemplateById(state.form.templateSelect).id]
    || getPriceLibrary().ceramicProcessProfiles?.["two-piece"]
    || { clayInputRatio: 1, tankClayShare: 0, glazeUsePerKgNet: 0, formingLaborPerKgNet: 0, glazingLaborPerKgNet: 0, firingEnergyPerKgNet: 0, finishingQcPerUnit: 0, yieldLossRate: 0, reworkRate: 0 };
}

function getFactoryMonthlyRate() {
  return getPriceLibrary().factoryMonthlyRates?.default || { monthlyOutputUnits: 1, managementMonthly: 0, utilitiesMonthly: 0, workshopSupportMonthly: 0, maintenanceMonthly: 0 };
}

function getFactoryPersonnelConfig() {
  return getPriceLibrary().factoryPersonnel?.default || {};
}

function getFactoryProcessStages() {
  return getPriceLibrary().factoryProcessStages?.default || {};
}

function calculateFactoryPersonnelMetrics() {
  const monthlyOutputUnits = Math.max(Number(getFactoryMonthlyRate().monthlyOutputUnits) || 1, 1);
  const rows = Object.values(getFactoryPersonnelConfig());
  const perUnitByRow = {};
  let totalMonthlyPayroll = 0;
  let totalPerUnitPayroll = 0;

  const teamRows = rows.map((item) => {
    const headcount = Math.max(Number(item.headcount) || 0, 0);
    const avgMonthlySalary = Math.max(Number(item.avgMonthlySalary) || 0, 0);
    const allocationRate = Math.min(Math.max(Number(item.allocationRate) || 0, 0), 1);
    const monthlyPayroll = headcount * avgMonthlySalary * allocationRate;
    const perUnitPayroll = monthlyPayroll / monthlyOutputUnits;
    const linkedRow = item.linkedRow || "";

    if (linkedRow) {
      perUnitByRow[linkedRow] = (perUnitByRow[linkedRow] || 0) + perUnitPayroll;
    }
    totalMonthlyPayroll += monthlyPayroll;
    totalPerUnitPayroll += perUnitPayroll;

    return {
      label: item.label || linkedRow || "未命名班组",
      linkedRow,
      headcount,
      avgMonthlySalary,
      allocationRate,
      monthlyPayroll: Number(monthlyPayroll.toFixed(2)),
      perUnitPayroll: Number(perUnitPayroll.toFixed(2))
    };
  });

  return {
    monthlyOutputUnits,
    teamRows,
    perUnitByRow,
    totalMonthlyPayroll: Number(totalMonthlyPayroll.toFixed(2)),
    totalPerUnitPayroll: Number(totalPerUnitPayroll.toFixed(2))
  };
}

function calculateCeramicCostMetrics() {
  const netWeight = Math.max(Number(state.form.productNetWeight) || 0, 0);
  const materialRate = getCeramicMaterialRate();
  const processProfile = getCeramicProcessProfile();
  const processStages = getFactoryProcessStages();
  const factoryMonthlyRate = getFactoryMonthlyRate();
  const personnel = calculateFactoryPersonnelMetrics();
  const monthlyOutputUnits = Math.max(Number(factoryMonthlyRate.monthlyOutputUnits) || 1, 1);
  const formingProcessFactor = Math.max(Number(processStages.forming?.costFactor) || 1, 0);
  const glazingProcessFactor = Math.max(Number(processStages.glazing?.costFactor) || 1, 0);
  const firingProcessFactor = Math.max(Number(processStages.firing?.costFactor) || 1, 0);
  const finishingProcessFactor = Math.max(Number(processStages.finishing?.costFactor) || 1, 0);

  const clayInputKg = netWeight * Math.max(Number(processProfile.clayInputRatio) || 0, 0);
  const tankClayShare = Math.min(Math.max(Number(processProfile.tankClayShare) || 0, 0), 1);
  const bodyClayKg = clayInputKg * (1 - tankClayShare);
  const tankClayKg = clayInputKg * tankClayShare;
  const glazeKg = netWeight * Math.max(Number(processProfile.glazeUsePerKgNet) || 0, 0);

  const bodyClayCost = bodyClayKg * Math.max(Number(materialRate.clayCostPerKg) || 0, 0);
  const tankClayCost = tankClayKg * Math.max(Number(materialRate.clayCostPerKg) || 0, 0);
  const additiveCost = clayInputKg * Math.max(Number(materialRate.additiveCostPerKgClay) || 0, 0);
  const glazeRawCost = glazeKg * Math.max(Number(materialRate.glazeCostPerKg) || 0, 0);
  const formingLaborBaseCost = netWeight * Math.max(Number(processProfile.formingLaborPerKgNet) || 0, 0) * formingProcessFactor;
  const glazingLaborBaseCost = netWeight * Math.max(Number(processProfile.glazingLaborPerKgNet) || 0, 0) * glazingProcessFactor;
  const firingEnergyCost = netWeight * Math.max(Number(processProfile.firingEnergyPerKgNet) || 0, 0) * firingProcessFactor;
  const finishingQcBaseCost = Math.max(Number(processProfile.finishingQcPerUnit) || 0, 0) * finishingProcessFactor;
  const formingLaborPersonnelCost = Number(personnel.perUnitByRow["forming-labor"] || 0);
  const glazingLaborPersonnelCost = Number(personnel.perUnitByRow["glazing-labor"] || 0);
  const finishingQcPersonnelCost = Number(personnel.perUnitByRow["finishing-qc"] || 0);
  const managementPersonnelCost = Number(personnel.perUnitByRow["management-overhead"] || 0);
  const utilitiesPersonnelCost = Number(personnel.perUnitByRow["utilities-overhead"] || 0);
  const formingLaborCost = formingLaborBaseCost + formingLaborPersonnelCost;
  const glazingLaborCost = glazingLaborBaseCost + glazingLaborPersonnelCost;
  const finishingQcCost = finishingQcBaseCost + finishingQcPersonnelCost;

  const ceramicBeforeYield = bodyClayCost + tankClayCost + additiveCost + glazeRawCost + formingLaborCost + glazingLaborCost + firingEnergyCost + finishingQcCost;
  const yieldReserve = ceramicBeforeYield * Math.max(Number(processProfile.yieldLossRate) || 0, 0);
  const reworkReserve = ceramicBeforeYield * Math.max(Number(processProfile.reworkRate) || 0, 0);
  const managementOverhead = Math.max(Number(factoryMonthlyRate.managementMonthly) || 0, 0) / monthlyOutputUnits + managementPersonnelCost;
  const utilitiesOverhead = (
    Math.max(Number(factoryMonthlyRate.utilitiesMonthly) || 0, 0) +
    Math.max(Number(factoryMonthlyRate.workshopSupportMonthly) || 0, 0) +
    Math.max(Number(factoryMonthlyRate.maintenanceMonthly) || 0, 0)
  ) / monthlyOutputUnits + utilitiesPersonnelCost;

  return {
    netWeight,
    clayInputKg,
    bodyClayKg,
    tankClayKg,
    glazeKg,
    bodyClayCost: Number(bodyClayCost.toFixed(2)),
    tankClayCost: Number(tankClayCost.toFixed(2)),
    additiveCost: Number(additiveCost.toFixed(2)),
    glazeRawCost: Number(glazeRawCost.toFixed(2)),
    formingLaborBaseCost: Number(formingLaborBaseCost.toFixed(2)),
    glazingLaborBaseCost: Number(glazingLaborBaseCost.toFixed(2)),
    finishingQcBaseCost: Number(finishingQcBaseCost.toFixed(2)),
    formingLaborPersonnelCost: Number(formingLaborPersonnelCost.toFixed(2)),
    glazingLaborPersonnelCost: Number(glazingLaborPersonnelCost.toFixed(2)),
    finishingQcPersonnelCost: Number(finishingQcPersonnelCost.toFixed(2)),
    managementPersonnelCost: Number(managementPersonnelCost.toFixed(2)),
    utilitiesPersonnelCost: Number(utilitiesPersonnelCost.toFixed(2)),
    formingLaborCost: Number(formingLaborCost.toFixed(2)),
    glazingLaborCost: Number(glazingLaborCost.toFixed(2)),
    firingEnergyCost: Number(firingEnergyCost.toFixed(2)),
    finishingQcCost: Number(finishingQcCost.toFixed(2)),
    yieldReserve: Number(yieldReserve.toFixed(2)),
    reworkReserve: Number(reworkReserve.toFixed(2)),
    managementOverhead: Number(managementOverhead.toFixed(2)),
    utilitiesOverhead: Number(utilitiesOverhead.toFixed(2)),
    yieldLossRate: Number(processProfile.yieldLossRate || 0),
    reworkRate: Number(processProfile.reworkRate || 0),
    monthlyOutputUnits,
    personnel,
    processStages,
    formingProcessFactor: Number(formingProcessFactor.toFixed(2)),
    glazingProcessFactor: Number(glazingProcessFactor.toFixed(2)),
    firingProcessFactor: Number(firingProcessFactor.toFixed(2)),
    finishingProcessFactor: Number(finishingProcessFactor.toFixed(2))
  };
}

function getContainerProfile() {
  return getPriceLibrary().containerProfiles[state.form.loadingMode] || getPriceLibrary().containerProfiles["40HQ 常规装柜"];
}

function getMarketZone() {
  const market = String(state.form.destinationMarket || "").toUpperCase();
  if (market.includes("美国") || market.includes("北美") || market.includes("US") || market.includes("CANADA")) {
    return "northAmerica";
  }
  if (market.includes("欧洲") || market.includes("欧") || market.includes("EU") || market.includes("UK")) {
    return "europe";
  }
  if (market.includes("中东") || market.includes("沙特") || market.includes("迪拜") || market.includes("阿联酋")) {
    return "middleEast";
  }
  return "default";
}

function chooseCartonArrangement(quantity) {
  const qty = Math.max(Math.round(Number(quantity) || 1), 1);
  let best = { x: qty, y: 1, z: 1, score: Number.POSITIVE_INFINITY };
  for (let x = 1; x <= qty; x += 1) {
    for (let y = 1; y <= qty; y += 1) {
      const z = Math.ceil(qty / (x * y));
      if (z < 1) {
        continue;
      }
      const footprintScore = (x * y * z) + Math.abs(x - y) * 0.2 + Math.abs(y - z) * 0.1;
      if (footprintScore < best.score) {
        best = { x, y, z, score: footprintScore };
      }
      if (x * y >= qty && y > x + 2) {
        break;
      }
    }
  }
  return best;
}

function getTemplateStackingMode(template, unitsPerCarton) {
  if (template?.id === "seat-cover" && unitsPerCarton > 1) {
    return "vertical";
  }
  return "auto";
}

function getPackingLayoutNote(totals) {
  const arrangement = totals.arrangement || { x: 1, y: 1, z: Math.max(Math.round(totals.unitsPerCarton || 1), 1) };
  if (!totals.unitsPerCarton || totals.unitsPerCarton <= 1) {
    return `单件外箱，内箱单边外扩 ${formatNumber(totals.innerPaddingPerSide, 0)} mm，外箱单边外扩 ${formatNumber(totals.outerPaddingPerSide, 0)} mm`;
  }
  if (totals.stackingMode === "vertical") {
    return `每箱 ${Math.round(totals.unitsPerCarton)} 件垂直排布，长宽保持单件展开，高度按件数累加；内箱单边外扩 ${formatNumber(totals.innerPaddingPerSide, 0)} mm，外箱单边外扩 ${formatNumber(totals.outerPaddingPerSide, 0)} mm`;
  }
  return `每箱 ${Math.round(totals.unitsPerCarton)} 件自动排布 ${arrangement.x} × ${arrangement.y} × ${arrangement.z}；内箱单边外扩 ${formatNumber(totals.innerPaddingPerSide, 0)} mm，外箱单边外扩 ${formatNumber(totals.outerPaddingPerSide, 0)} mm`;
}

function getGrossWeightNote(totals) {
  return `${Math.round(totals.unitsPerCarton || 1)} 件净重 ${formatNumber(totals.totalNetWeight || 0, 2)} KG + 纸箱重量 ${formatNumber(totals.cartonBoardWeight || 0, 2)} KG + 辅材估重 ${formatNumber(totals.accessoryPackagingWeight || 0, 2)} KG`;
}

function getPackingLayoutNoteLines(totals) {
  const arrangement = totals.arrangement || { x: 1, y: 1, z: Math.max(Math.round(totals.unitsPerCarton || 1), 1) };
  if (!totals.unitsPerCarton || totals.unitsPerCarton <= 1) {
    return [
      "单件外箱",
      `内箱单边外扩 ${formatNumber(totals.innerPaddingPerSide, 0)} mm，外箱单边外扩 ${formatNumber(totals.outerPaddingPerSide, 0)} mm`
    ];
  }
  if (totals.stackingMode === "vertical") {
    return [
      `每箱 ${Math.round(totals.unitsPerCarton)} 件垂直排布，长宽保持单件展开，高度按件数累加`,
      `内箱单边外扩 ${formatNumber(totals.innerPaddingPerSide, 0)} mm，外箱单边外扩 ${formatNumber(totals.outerPaddingPerSide, 0)} mm`
    ];
  }
  return [
    `每箱 ${Math.round(totals.unitsPerCarton)} 件自动排布 ${arrangement.x} × ${arrangement.y} × ${arrangement.z}`,
    `内箱单边外扩 ${formatNumber(totals.innerPaddingPerSide, 0)} mm，外箱单边外扩 ${formatNumber(totals.outerPaddingPerSide, 0)} mm`
  ];
}

function getGrossWeightNoteLines(totals) {
  return [
    `默认外箱按 ${totals.cartonMaterialLabel || "5层瓦楞纸箱"} 估算，纸箱面积 ${formatNumber(totals.cartonArea || 0, 3)} ㎡ × ${formatNumber(totals.cartonArealDensityKgPerSqm || 0, 2)} KG/㎡ = ${formatNumber(totals.cartonBoardWeight || 0, 2)} KG`,
    `其余辅材估重 ${formatNumber(totals.accessoryPackagingWeight || 0, 2)} KG（每件 ${formatNumber(totals.accessoryWeightPerUnit || 0, 2)} KG × ${Math.round(totals.unitsPerCarton || 1)}），${totals.accessoryPackagingNote || packagingAccessoryNotes.default}`,
    `${Math.round(totals.unitsPerCarton || 1)} 件净重 ${formatNumber(totals.totalNetWeight || 0, 2)} KG + 包装增重 ${formatNumber(totals.totalPackagingWeight || 0, 2)} KG = 单箱毛重 ${formatNumber(totals.grossWeight || 0, 2)} KG`
  ];
}

function calculateSmartQuoteMetrics() {
  const priceLibrary = getPriceLibrary();
  const template = getTemplateById(state.form.templateSelect);
  const packageRule = priceLibrary.smartPackaging.packageGrade[state.form.packageGrade] || priceLibrary.smartPackaging.packageGrade["常规出口 5 层箱"];
  const paddingRule = priceLibrary.smartPackaging.templatePadding[template.id] || priceLibrary.smartPackaging.templatePadding["two-piece"];
  const containerProfile = getContainerProfile();
  const marketFreightRule = (priceLibrary.freightByMarket[getMarketZone()] || priceLibrary.freightByMarket.default)[containerProfile.containerType];
  const exportChargeRule = priceLibrary.exportChargeByContainer[containerProfile.containerType] || priceLibrary.exportChargeByContainer["40HQ"];

  const productLength = Math.max(Number(state.form.productLength) || 0, 0);
  const productWidth = Math.max(Number(state.form.productWidth) || 0, 0);
  const productHeight = Math.max(Number(state.form.productHeight) || 0, 0);
  const productNetWeight = Math.max(Number(state.form.productNetWeight) || 0, 0);
  const unitsPerCarton = Math.max(Math.round(Number(state.form.unitsPerCarton) || getTemplateDefaultUnitsPerCarton(template)), 1);
  const outerPaddingPerSide = Math.max(Number(paddingRule.outerPaddingPerSide) || 15, 0);
  const innerPaddingPerSide = Math.max(Number(paddingRule.innerPaddingPerSide) || 5, 0);
  const packageMaterialAssumption = packageMaterialAssumptions[state.form.packageGrade] || packageMaterialAssumptions.default;
  const accessoryPackagingNote = packagingAccessoryNotes[template.id] || packagingAccessoryNotes.default;
  const stackingMode = getTemplateStackingMode(template, unitsPerCarton);
  const arrangement = stackingMode === "vertical"
    ? { x: 1, y: 1, z: unitsPerCarton, score: 0 }
    : chooseCartonArrangement(unitsPerCarton);

  const innerBoxLength = productLength ? productLength + (innerPaddingPerSide * 2) : 0;
  const innerBoxWidth = productWidth ? productWidth + (innerPaddingPerSide * 2) : 0;
  const innerBoxHeight = productHeight ? productHeight + (innerPaddingPerSide * 2) : 0;
  const stackedUnitLength = innerBoxLength;
  const stackedUnitWidth = innerBoxWidth;
  const stackedUnitHeight = innerBoxHeight;

  const packageLength = unitsPerCarton > 1
    ? (stackedUnitLength ? (stackedUnitLength * arrangement.x) + (outerPaddingPerSide * 2) : 0)
    : (productLength ? productLength + (outerPaddingPerSide * 2) : 0);
  const packageWidth = unitsPerCarton > 1
    ? (stackedUnitWidth ? (stackedUnitWidth * arrangement.y) + (outerPaddingPerSide * 2) : 0)
    : (productWidth ? productWidth + (outerPaddingPerSide * 2) : 0);
  const packageHeight = unitsPerCarton > 1
    ? (stackedUnitHeight ? (stackedUnitHeight * arrangement.z) + (outerPaddingPerSide * 2) : 0)
    : (productHeight ? productHeight + (outerPaddingPerSide * 2) : 0);

  const packageLengthM = packageLength / 1000;
  const packageWidthM = packageWidth / 1000;
  const packageHeightM = packageHeight / 1000;
  const totalNetWeight = productNetWeight * unitsPerCarton;
  const cartonArea = packageLength && packageWidth && packageHeight
    ? 2 * (
      packageLengthM * packageWidthM +
      packageLengthM * packageHeightM +
      packageWidthM * packageHeightM
    )
    : 0;
  const cartonArealDensityKgPerSqm = Math.max(Number(paddingRule.cartonArealDensityKgPerSqm) || 0.82, 0);
  const cartonBoardWeight = cartonArea * cartonArealDensityKgPerSqm;
  const accessoryWeightPerUnit = Math.max(Number(paddingRule.accessoryWeightPerUnit) || 0, 0);
  const accessoryPackagingWeight = accessoryWeightPerUnit * unitsPerCarton;
  const totalPackagingWeight = cartonBoardWeight + accessoryPackagingWeight;
  const packagingWeightPerUnit = unitsPerCarton ? totalPackagingWeight / unitsPerCarton : 0;
  const cbmPerCarton = packageLength && packageWidth && packageHeight
    ? packageLengthM * packageWidthM * packageHeightM
    : Math.max(Number(state.form.cbmPerUnit) || 0, 0);
  const grossWeight = productNetWeight
    ? totalNetWeight + totalPackagingWeight
    : Math.max(Number(state.form.grossWeight) || 0, 0);

  const estimatedCartonsByVolume = cbmPerCarton ? Math.floor(containerProfile.effectiveVolumeCbm / cbmPerCarton) : 0;
  const estimatedLoadQtyByWeight = grossWeight ? Math.floor(containerProfile.maxPayloadKg / grossWeight) : 0;
  const estimatedCartonsPerContainer = estimatedCartonsByVolume && estimatedLoadQtyByWeight
    ? Math.min(estimatedCartonsByVolume, estimatedLoadQtyByWeight)
    : (estimatedCartonsByVolume || estimatedLoadQtyByWeight || 0);
  const estimatedLoadQty = estimatedCartonsPerContainer * unitsPerCarton;

  const cartonDivider = Math.max(unitsPerCarton, 1);
  const innerPackCost = cartonArea
    ? (packageRule.innerPackFixed + (cartonArea * packageRule.innerPackRatePerSqm)) / cartonDivider
    : 0;
  const outerCartonCost = cartonArea
    ? (packageRule.cartonFixed + (cartonArea * packageRule.cartonRatePerSqm)) / cartonDivider
    : 0;
  const palletProtectionCost = cbmPerCarton
    ? (packageRule.palletFixed + (cbmPerCarton * packageRule.palletRatePerCbm)) / cartonDivider
    : 0;
  const manualLabelCost = packageRule.labelFixed / cartonDivider;

  const divider = Math.max(estimatedLoadQty, 1);
  return {
    containerProfile,
    marketFreightRule,
    exportChargeRule,
    productNetWeight,
    unitsPerCarton,
    stackingMode,
    outerPaddingPerSide,
    innerPaddingPerSide,
    arrangement,
    innerBoxLength,
    innerBoxWidth,
    innerBoxHeight,
    cartonMaterialLabel: packageMaterialAssumption.materialLabel,
    cartonArealDensityKgPerSqm,
    cartonBoardWeight,
    accessoryWeightPerUnit,
    accessoryPackagingWeight,
    accessoryPackagingNote,
    packagingWeightPerUnit,
    totalNetWeight,
    totalPackagingWeight,
    packageLength,
    packageWidth,
    packageHeight,
    cartonArea,
    cbmPerUnit: cbmPerCarton,
    grossWeight,
    estimatedLoadQty,
    estimatedLoadQtyByVolume: estimatedCartonsByVolume * unitsPerCarton,
    estimatedLoadQtyByWeight: estimatedLoadQtyByWeight * unitsPerCarton,
    estimatedCartonsByVolume,
    estimatedCartonsByWeight: estimatedLoadQtyByWeight,
    estimatedCartonsPerContainer,
    innerPackCost: Number(innerPackCost.toFixed(2)),
    outerCartonCost: Number(outerCartonCost.toFixed(2)),
    palletProtectionCost: Number(palletProtectionCost.toFixed(2)),
    manualLabelCost: Number(manualLabelCost.toFixed(2)),
    inlandFreightPerUnit: Number((exportChargeRule.inlandFreightPerContainer / divider).toFixed(2)),
    customsFeePerUnit: Number((exportChargeRule.customsFeePerContainer / divider).toFixed(2)),
    portChargesPerUnit: Number((exportChargeRule.portChargesPerContainer / divider).toFixed(2)),
    inspectionFreightPerUnit: Number((exportChargeRule.inspectionFeePerContainer / divider).toFixed(2)),
    oceanFreightPerUnit: Number((marketFreightRule.oceanPerContainer / divider).toFixed(2)),
    insuranceFeePerUnit: Number((marketFreightRule.insurancePerContainer / divider).toFixed(2)),
    destinationDeliveryPerUnit: Number((marketFreightRule.destinationPerContainer / divider).toFixed(2))
  };
}

function applySmartDefaults() {
  const smart = calculateSmartQuoteMetrics();
  const logistics = calculateTradeLogisticsForQuantity(getOrderQuantity(), smart, getTradeTermMeta());
  state.form.packageLength = smart.packageLength ? Number(smart.packageLength.toFixed(0)) : 0;
  state.form.packageWidth = smart.packageWidth ? Number(smart.packageWidth.toFixed(0)) : 0;
  state.form.packageHeight = smart.packageHeight ? Number(smart.packageHeight.toFixed(0)) : 0;
  state.form.cartonArea = Number(smart.cartonArea.toFixed(3));
  state.form.cbmPerUnit = Number(smart.cbmPerUnit.toFixed(4));
  state.form.grossWeight = Number(smart.grossWeight.toFixed(2));
  state.summary.inlandFreight = logistics.inlandFreightPerUnit;
  state.summary.customsFee = logistics.customsFeePerUnit;
  state.summary.portCharges = logistics.portChargesPerUnit;
  state.summary.inspectionFee = logistics.inspectionFeePerUnit;
  state.summary.oceanFreight = logistics.oceanFreightPerUnit;
  state.summary.insuranceFee = logistics.insuranceFeePerUnit;
  state.summary.destinationDelivery = logistics.destinationDeliveryPerUnit;
  updateCarton3D(state.form.packageLength, state.form.packageWidth, state.form.packageHeight);
}

function updateCarton3D(l, w, h) {
  const cartonEl = document.getElementById("carton3d");
  const labelEl = document.getElementById("cartonLabel");
  if (!cartonEl || !labelEl) return;
  if (!l || !w || !h) {
    cartonEl.style.display = "none";
    labelEl.textContent = "";
    return;
  }
  cartonEl.style.display = "block";
  // Normalize visually using a base scale where the longest dimension becomes roughly 80px
  const maxDim = Math.max(l, w, h);
  const scale = 80 / maxDim;
  const pl = l * scale;
  const pw = w * scale;
  const ph = h * scale;

  cartonEl.style.width = `${pl}px`;
  cartonEl.style.height = `${ph}px`;

  const front = document.getElementById("cartonFront");
  const back = document.getElementById("cartonBack");
  const right = document.getElementById("cartonRight");
  const left = document.getElementById("cartonLeft");
  const top = document.getElementById("cartonTop");
  const bottom = document.getElementById("cartonBottom");

  if(front) { front.style.width = `${pl}px`; front.style.height = `${ph}px`; front.style.transform = `translateZ(${pw/2}px)`; }
  if(back) { back.style.width = `${pl}px`; back.style.height = `${ph}px`; back.style.transform = `rotateY(180deg) translateZ(${pw/2}px)`; }
  if(right) { right.style.width = `${pw}px`; right.style.height = `${ph}px`; right.style.left = `${pl/2 - pw/2}px`; right.style.transform = `rotateY(90deg) translateZ(${pl/2}px)`; }
  if(left) { left.style.width = `${pw}px`; left.style.height = `${ph}px`; left.style.left = `${pl/2 - pw/2}px`; left.style.transform = `rotateY(-90deg) translateZ(${pl/2}px)`; }
  if(top) { top.style.width = `${pl}px`; top.style.height = `${pw}px`; top.style.top = `${ph/2 - pw/2}px`; top.style.transform = `rotateX(90deg) translateZ(${ph/2}px)`; }
  if(bottom) { bottom.style.width = `${pl}px`; bottom.style.height = `${pw}px`; bottom.style.top = `${ph/2 - pw/2}px`; bottom.style.transform = `rotateX(-90deg) translateZ(${ph/2}px)`; }

  labelEl.textContent = `${l} × ${w} × ${h} mm`;
}

function applySupplierPricing() {
  const priceLibrary = getPriceLibrary();
  normalizeSeatCoverState(state.form);
  const seatRule = priceLibrary.seatCoverGrade[state.form.seatCoverGrade];
  const glazeRule = priceLibrary.glazeLevel[state.form.glazeLevel];
  const certificationRule = calculateCertificationUnitPrice();
  const inspectionRule = calculateInspectionUnitPrice();
  const smart = calculateSmartQuoteMetrics();
  const ceramic = calculateCeramicCostMetrics();

  setRowAutoUnitPrice(findRowByItemId(state.rows, "body-clay"), ceramic.bodyClayCost, `净重 ${formatNumber(ceramic.netWeight, 1)} kg × 泥料系数 = ${formatNumber(ceramic.bodyClayKg, 2)} kg 主体泥料`);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "tank-clay"), ceramic.tankClayCost, ceramic.tankClayKg ? `副体泥料 ${formatNumber(ceramic.tankClayKg, 2)} kg 自动测算` : "当前产品结构无独立副体泥料");
  setRowAutoUnitPrice(findRowByItemId(state.rows, "body-additive"), ceramic.additiveCost, `按总投泥 ${formatNumber(ceramic.clayInputKg, 2)} kg 带辅料成本`);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "glaze-raw"), ceramic.glazeRawCost, `净重推算基础釉用量 ${formatNumber(ceramic.glazeKg, 2)} kg`);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "forming-labor"), ceramic.formingLaborCost, `工艺基准 ${formatRmb(ceramic.formingLaborBaseCost)}，工序系数 ${formatNumber(ceramic.formingProcessFactor, 2)} + 成型班组工资分摊 ${formatRmb(ceramic.formingLaborPersonnelCost)}`);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "glazing-labor"), ceramic.glazingLaborCost, `工艺基准 ${formatRmb(ceramic.glazingLaborBaseCost)}，工序系数 ${formatNumber(ceramic.glazingProcessFactor, 2)} + 施釉班组工资分摊 ${formatRmb(ceramic.glazingLaborPersonnelCost)}`);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "firing-energy"), ceramic.firingEnergyCost, `按净重折算烧成能耗，工序系数 ${formatNumber(ceramic.firingProcessFactor, 2)}`);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "finishing-qc"), ceramic.finishingQcCost, `工艺基准 ${formatRmb(ceramic.finishingQcBaseCost)}，工序系数 ${formatNumber(ceramic.finishingProcessFactor, 2)} + 修补质检工资分摊 ${formatRmb(ceramic.finishingQcPersonnelCost)}`);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "yield-reserve"), ceramic.yieldReserve, `按陶瓷主体成本 × ${formatNumber(ceramic.yieldLossRate * 100, 1)}%`);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "rework-reserve"), ceramic.reworkReserve, `按陶瓷主体成本 × ${formatNumber(ceramic.reworkRate * 100, 1)}%`);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "management-overhead"), ceramic.managementOverhead, `非人员管理费 + 管理班组工资均摊 ${formatRmb(ceramic.managementPersonnelCost)}`);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "utilities-overhead"), ceramic.utilitiesOverhead, `水电 / 维修 / 车间辅助 + 人员均摊 ${formatRmb(ceramic.utilitiesPersonnelCost)}`);

  setRowAutoUnitPrice(findRowByItemId(state.rows, "seat-cover"), seatRule?.unitPrice, seatRule?.note);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "glaze-upgrade"), glazeRule?.unitPrice, glazeRule?.note);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "certification-amort"), certificationRule.unitPrice, certificationRule.note);
  setRowAutoUnitPrice(findRowByItemId(state.rows, "inspection-testing"), inspectionRule.unitPrice, inspectionRule.note);

  const smartPackageRows = {
    "inner-pack": { unitPrice: smart.innerPackCost, note: `按包装面积 ${formatNumber(smart.cartonArea, 2)} ㎡智能测算` },
    "outer-carton": { unitPrice: smart.outerCartonCost, note: `按纸箱展开面积 ${formatNumber(smart.cartonArea, 2)} ㎡带价` },
    "pallet-protection": { unitPrice: smart.palletProtectionCost, note: `按单件体积 ${formatNumber(smart.cbmPerUnit, 4)} CBM 均摊` },
    "manual-label": { unitPrice: smart.manualLabelCost, note: `按${state.form.packageGrade}默认标签费用` }
  };

  Object.entries(smartPackageRows).forEach(([itemId, config]) => {
    const row = findRowByItemId(state.rows, itemId);
    if (row && row.autoPriced !== false) {
      row.unitPrice = Number(config.unitPrice || 0);
      row.note = config.note;
    }
  });
}

function syncBudgetRowsFromUnitRows() {
  const batchQty = getProductionQuantity();
  state.budgetRows.forEach((budgetRow) => {
    if (budgetRow.autoPriced === false || budgetRow.custom) {
      return;
    }
    const baseRow = state.rows.find((row) => row.itemId === budgetRow.itemId && !row.custom);
    if (!baseRow) {
      return;
    }
    budgetRow.totalAmount = Number((getUnitRowPerUnitAmount(baseRow) * batchQty).toFixed(2));
    budgetRow.note = baseRow.note || "";
    budgetRow.isExternal = baseRow.isExternal;
  });
}

function createCounterpartRow(sourceRow, targetMode) {
  if (targetMode === "budget") {
    return {
      rowId: uid(),
      itemId: sourceRow.itemId,
      categoryKey: sourceRow.categoryKey,
      categoryLabel: sourceRow.categoryLabel,
      name: sourceRow.name,
      unit: "batch",
      totalAmount: Number((getUnitRowPerUnitAmount(sourceRow) * getProductionQuantity()).toFixed(2)),
      isExternal: sourceRow.isExternal,
      note: sourceRow.note || "",
      autoPriced: sourceRow.autoPriced ?? true,
      custom: Boolean(sourceRow.custom)
    };
  }

  const perUnitAmount = (Number(sourceRow.totalAmount) || 0) / getProductionQuantity();
  return {
    rowId: uid(),
    itemId: sourceRow.itemId,
    categoryKey: sourceRow.categoryKey,
    categoryLabel: sourceRow.categoryLabel,
    name: sourceRow.name,
    unit: sourceRow.unit === "batch" ? "set" : sourceRow.unit,
    qty: 1,
    unitPrice: Number(perUnitAmount.toFixed(4)),
    isExternal: sourceRow.isExternal,
    note: sourceRow.note || "",
    autoPriced: sourceRow.autoPriced ?? true,
    custom: Boolean(sourceRow.custom)
  };
}

function reconcileModeRows() {
  const unitItemIds = new Set(state.rows.map((row) => row.itemId));
  const budgetItemIds = new Set(state.budgetRows.map((row) => row.itemId));

  state.rows.forEach((row) => {
    if (!budgetItemIds.has(row.itemId)) {
      state.budgetRows.push(createCounterpartRow(row, "budget"));
    }
  });

  state.budgetRows.forEach((row) => {
    if (!unitItemIds.has(row.itemId)) {
      state.rows.push(createCounterpartRow(row, "unit"));
    }
  });
}

function getSupplierBenchmarkRows() {
  const priceLibrary = getPriceLibrary();
  const tradeMeta = getTradeTermMeta();
  normalizeSeatCoverState(state.form);
  const seatRule = priceLibrary.seatCoverGrade[state.form.seatCoverGrade];
  const glazeRule = priceLibrary.glazeLevel[state.form.glazeLevel];
  const smartPackageRule = priceLibrary.smartPackaging.packageGrade[state.form.packageGrade] || {};
  const certificationRule = calculateCertificationUnitPrice();
  const ceramic = calculateCeramicCostMetrics();
  const materialRate = getCeramicMaterialRate();
  const factoryRate = getFactoryMonthlyRate();
  const personnel = calculateFactoryPersonnelMetrics();
  const processStages = getFactoryProcessStages();
  return [
    { label: "陶瓷主体引擎", value: `净重 ${formatNumber(ceramic.netWeight, 1)} kg`, desc: `投泥 ${formatNumber(ceramic.clayInputKg, 2)} kg，釉料 ${formatNumber(ceramic.glazeKg, 2)} kg` },
    { label: "原料成本库", value: `泥料 ${formatRmb(materialRate.clayCostPerKg || 0)}/kg`, desc: `釉料 ${formatRmb(materialRate.glazeCostPerKg || 0)}/kg，辅料 ${formatRmb(materialRate.additiveCostPerKgClay || 0)}/kg泥料` },
    { label: "工厂月度费率", value: `${Math.round(factoryRate.monthlyOutputUnits || 0)} 件/月`, desc: `管理 ${formatRmb(factoryRate.managementMonthly || 0)}，公辅维保 ${formatRmb((factoryRate.utilitiesMonthly || 0) + (factoryRate.workshopSupportMonthly || 0) + (factoryRate.maintenanceMonthly || 0))}` },
    { label: "工序中心", value: `成型 ${formatNumber(processStages.forming?.costFactor || 1, 2)} / 施釉 ${formatNumber(processStages.glazing?.costFactor || 1, 2)}`, desc: `烧成 ${formatNumber(processStages.firing?.costFactor || 1, 2)} / 修补 ${formatNumber(processStages.finishing?.costFactor || 1, 2)} 系数联动成本` },
    { label: "人员工资分摊", value: `${formatRmb(personnel.totalPerUnitPayroll)} / 件`, desc: `月工资池 ${formatRmb(personnel.totalMonthlyPayroll)}，按 ${Math.round(personnel.monthlyOutputUnits || 0)} 件分摊` },
    { label: "盖板价格库", value: `${state.form.seatCoverGrade} / ${formatRmb(seatRule?.unitPrice || 0)}`, desc: seatRule?.note || "未命中价格库" },
    { label: "釉面价格库", value: `${state.form.glazeLevel} / ${formatRmb(glazeRule?.unitPrice || 0)}`, desc: glazeRule?.note || "未命中价格库" },
    { label: "包装等级规则", value: `${state.form.packageGrade}`, desc: `外箱 ${formatNumber(smartPackageRule.cartonRatePerSqm || 0, 2)}/㎡ + 固定 ${formatRmb(smartPackageRule.cartonFixed || 0)}；内包 ${formatNumber(smartPackageRule.innerPackRatePerSqm || 0, 2)}/㎡` },
    { label: "认证摊销库", value: formatRmb(certificationRule.unitPrice), desc: certificationRule.note },
    { label: "贸易条款口径", value: `${parseTradeTermCode(state.form.tradeTerm)} / ${tradeMeta.label}`, desc: tradeMeta.desc }
  ];
}

function formatRmb(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY"
  }).format(value || 0);
}

function formatUsd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value || 0);
}

function formatNumber(value, digits = 4) {
  return Number(value || 0).toFixed(digits);
}

function getCalcMode() {
  return state.form.calcMode || "unit";
}

function getActiveCatalog() {
  return getCalcMode() === "budget" ? budgetCatalog : bomCatalog;
}

function getActiveRows() {
  return getCalcMode() === "budget" ? state.budgetRows : state.rows;
}

function isExternalEligibleCategory(categoryKey) {
  return ["accessories", "package", "compliance"].includes(categoryKey);
}

function isRowExternal(row) {
  return isExternalEligibleCategory(row.categoryKey) && Boolean(row.isExternal);
}

function getUnitRowPerUnitAmount(row) {
  return (Number(row.qty) || 0) * (Number(row.unitPrice) || 0);
}

function getProductionQuantity() {
  return Math.max(Number(state.form.productionQuantity) || 1, 1);
}

function getOrderQuantity() {
  return Math.max(Number(state.form.orderQuantity) || 1, 1);
}

function getRowPerUnitAmount(row) {
  if (getCalcMode() === "budget") {
    return (Number(row.totalAmount) || 0) / getProductionQuantity();
  }
  return getUnitRowPerUnitAmount(row);
}

function getRowOrderAmount(row) {
  return getRowPerUnitAmount(row) * getOrderQuantity();
}

function getCostGroupTotal(categoryTotals, categoryKeys) {
  return categoryKeys.reduce((sum, key) => sum + (categoryTotals[key] || 0), 0);
}

function getFiveCostBucketValues(activeRows = getActiveRows()) {
  const buckets = {
    materialsPackagingPerUnit: 0,
    directLaborPerUnit: 0,
    manufacturingOverheadPerUnit: 0
  };

  activeRows.forEach((row) => {
    const amount = getRowPerUnitAmount(row);
    if (["ceramicBody", "glaze", "accessories", "package"].includes(row.categoryKey)) {
      buckets.materialsPackagingPerUnit += amount;
      return;
    }
    if (["forming-labor", "glazing-labor", "finishing-qc"].includes(row.itemId)) {
      buckets.directLaborPerUnit += amount;
      return;
    }
    buckets.manufacturingOverheadPerUnit += amount;
  });

  const manufacturingCostPerUnit = buckets.materialsPackagingPerUnit + buckets.directLaborPerUnit + buckets.manufacturingOverheadPerUnit;
  return {
    materialsPackagingPerUnit: Number(buckets.materialsPackagingPerUnit.toFixed(2)),
    directLaborPerUnit: Number(buckets.directLaborPerUnit.toFixed(2)),
    manufacturingOverheadPerUnit: Number(buckets.manufacturingOverheadPerUnit.toFixed(2)),
    manufacturingCostPerUnit: Number(manufacturingCostPerUnit.toFixed(2))
  };
}

function getContainerCapacity() {
  return getContainerProfile().volumeCbm;
}

function getSummaryValues() {
  const smart = calculateSmartQuoteMetrics();
  const activeRows = getActiveRows();
  const categoryTotals = activeRows.reduce((result, row) => {
    const amount = getRowPerUnitAmount(row);
    result[row.categoryKey] = (result[row.categoryKey] || 0) + amount;
    return result;
  }, {});
  const costBuckets = getFiveCostBucketValues(activeRows);

  const productCostPerUnit = activeRows.reduce((sum, row) => sum + getRowPerUnitAmount(row), 0);
  const tradeMeta = getTradeTermMeta();
  const orderQuantity = getOrderQuantity();
  const logistics = calculateTradeLogisticsForQuantity(orderQuantity, smart, tradeMeta);
  const inlandFreightPerUnit = logistics.inlandFreightPerUnit;
  const customsFeePerUnit = logistics.customsFeePerUnit;
  const portChargesPerUnit = logistics.portChargesPerUnit;
  const inspectionFeePerUnit = logistics.inspectionFeePerUnit;
  const oceanFreightPerUnit = logistics.oceanFreightPerUnit;
  const insuranceFeePerUnit = logistics.insuranceFeePerUnit;
  const destinationDeliveryPerUnit = logistics.destinationDeliveryPerUnit;
  const localChargesPerUnit = logistics.localChargesPerUnit;
  const quotedLogisticsPerUnit = logistics.quotedLogisticsPerUnit;
  const excludedChargesPerUnit = logistics.excludedChargesPerUnit;
  const smallOrderSurchargePerUnit = Math.max(Number(state.summary.smallOrderSurcharge) || 0, 0);
  const specialPackageSurchargePerUnit = Math.max(Number(state.summary.specialPackageSurcharge) || 0, 0);
  const specialTestingSurchargePerUnit = Math.max(Number(state.summary.specialTestingSurcharge) || 0, 0);
  const trialProductionSurchargePerUnit = Math.max(Number(state.summary.trialProductionSurcharge) || 0, 0);
  const specialLabelSurchargePerUnit = Math.max(Number(state.summary.specialLabelSurcharge) || 0, 0);
  const orderSurchargePerUnit = smallOrderSurchargePerUnit
    + specialPackageSurchargePerUnit
    + specialTestingSurchargePerUnit
    + trialProductionSurchargePerUnit
    + specialLabelSurchargePerUnit;
  const manufacturingCostPerUnit = costBuckets.manufacturingCostPerUnit;
  const factoryCompleteCostPerUnit = manufacturingCostPerUnit + orderSurchargePerUnit;
  const legacyFinanceCostRate = Math.max(Number(state.summary.financeCostRate) || 0, 0);
  const operatingExpenseRate = Math.max(Number(state.summary.operatingExpenseRate) || 0, 0) + legacyFinanceCostRate;
  const operatingExpensePerUnit = factoryCompleteCostPerUnit * (operatingExpenseRate / 100);
  const operatingCostPerUnit = factoryCompleteCostPerUnit + operatingExpensePerUnit;
  const quotedBaseCostPerUnit = operatingCostPerUnit + quotedLogisticsPerUnit;
  const totalRmbPerUnit = quotedBaseCostPerUnit;
  const internalProfitRate = Math.max(Number(state.summary.internalProfitRate) || 0, 0);
  const externalProfitRate = Math.max(Number(state.summary.externalProfitRate) || 0, 0);
  const commissionRate = Math.max(Number(state.summary.commissionRate) || 0, 0);
  const afterSalesRate = Math.max(Number(state.summary.afterSalesRate) || 0, 0);
  const fxSafetyRate = Math.max(Number(state.summary.fxSafetyRate) || 0, 0);
  const targetGrossMarginRate = clampRate(state.form.targetGrossMarginRate, 18);
  const floorGrossMarginRate = clampRate(state.form.floorGrossMarginRate, 10);
  const salesDeductionRate = commissionRate + afterSalesRate + fxSafetyRate;
  const externalBasePerUnit = activeRows.reduce((sum, row) => sum + (isRowExternal(row) ? getRowPerUnitAmount(row) : 0), 0);
  const internalBasePerUnit = quotedBaseCostPerUnit - externalBasePerUnit;
  const exchangeRate = Math.max(Number(state.summary.exchangeRate) || 0, 0);
  const price = calculatePriceFromTargetMargin(totalRmbPerUnit, exchangeRate, targetGrossMarginRate, salesDeductionRate);
  const usdCostPerUnit = price.usdCostPerUnit;
  const usdSellingPerUnit = price.usdSellingPerUnit;
  const rmbSellingPerUnit = price.rmbSellingPerUnit;
  const commissionPerUnit = rmbSellingPerUnit * (commissionRate / 100);
  const afterSalesPerUnit = rmbSellingPerUnit * (afterSalesRate / 100);
  const fxSafetyPerUnit = rmbSellingPerUnit * (fxSafetyRate / 100);
  const salesDeductionPerUnit = commissionPerUnit + afterSalesPerUnit + fxSafetyPerUnit;
  const netProfitPoolPerUnit = Math.max(rmbSellingPerUnit - totalRmbPerUnit - salesDeductionPerUnit, 0);
  const internalWeight = internalBasePerUnit * (internalProfitRate || 1);
  const externalWeight = externalBasePerUnit * (externalProfitRate || 1);
  const totalProfitWeight = Math.max(internalWeight + externalWeight, 0);
  const internalProfitPerUnit = totalProfitWeight ? netProfitPoolPerUnit * (internalWeight / totalProfitWeight) : netProfitPoolPerUnit;
  const externalProfitPerUnit = Math.max(netProfitPoolPerUnit - internalProfitPerUnit, 0);
  const profitPerUnit = netProfitPoolPerUnit + salesDeductionPerUnit;
  const grossMarginRate = rmbSellingPerUnit ? ((rmbSellingPerUnit - totalRmbPerUnit) / rmbSellingPerUnit) * 100 : 0;
  const netMarginRate = rmbSellingPerUnit ? ((rmbSellingPerUnit - totalRmbPerUnit - salesDeductionPerUnit) / rmbSellingPerUnit) * 100 : 0;
  const cbmPerUnit = smart.cbmPerUnit;
  const grossWeight = smart.grossWeight;
  const containerCapacity = smart.containerProfile.volumeCbm;
  const estimatedLoadQty = smart.estimatedLoadQty;

  return {
    categoryTotals,
    materialsPackagingPerUnit: costBuckets.materialsPackagingPerUnit,
    directLaborPerUnit: costBuckets.directLaborPerUnit,
    manufacturingOverheadPerUnit: costBuckets.manufacturingOverheadPerUnit,
    manufacturingCostPerUnit,
    productCostPerUnit,
    inlandFreightPerUnit,
    customsFeePerUnit,
    portChargesPerUnit,
    inspectionFeePerUnit,
    oceanFreightPerUnit,
    insuranceFeePerUnit,
    destinationDeliveryPerUnit,
    localChargesPerUnit,
    quotedLogisticsPerUnit,
    excludedChargesPerUnit,
    smallOrderSurchargePerUnit,
    specialPackageSurchargePerUnit,
    specialTestingSurchargePerUnit,
    trialProductionSurchargePerUnit,
    specialLabelSurchargePerUnit,
    orderSurchargePerUnit,
    factoryCompleteCostPerUnit,
    operatingCostPerUnit,
    quotedBaseCostPerUnit,
    operatingExpenseRate,
    operatingExpensePerUnit,
    businessSafetyCostPerUnit: operatingCostPerUnit,
    tradeTermCode: parseTradeTermCode(state.form.tradeTerm),
    tradeTermLabel: tradeMeta.label,
    tradeTermDesc: tradeMeta.desc,
    shippingPort: state.form.shippingPort || "Xiamen",
    destinationPort: state.form.destinationPort || "-",
    incotermsVersion: state.form.incotermsVersion || "Incoterms 2020",
    moq: Math.max(Number(state.form.moq) || 0, 0),
    leadTimeDays: Math.max(Number(state.form.leadTimeDays) || 0, 0),
    quoteCurrency: state.form.quoteCurrency || "USD",
    totalRmbPerUnit,
    rmbSellingPerUnit,
    profitPerUnit,
    netProfitPoolPerUnit,
    salesDeductionRate,
    salesDeductionPerUnit,
    priceDenominator: price.denominator,
    targetGrossMarginRate,
    floorGrossMarginRate,
    grossMarginRate,
    netMarginRate,
    internalBasePerUnit,
    externalBasePerUnit,
    internalProfitRate,
    externalProfitRate,
    commissionRate,
    afterSalesRate,
    fxSafetyRate,
    internalProfitPerUnit,
    externalProfitPerUnit,
    commissionPerUnit,
    afterSalesPerUnit,
    fxSafetyPerUnit,
    exchangeRate,
    usdCostPerUnit,
    usdSellingPerUnit,
    orderQuantity,
    productNetWeight: smart.productNetWeight,
    unitsPerCarton: smart.unitsPerCarton,
    stackingMode: smart.stackingMode,
    arrangement: smart.arrangement,
    outerPaddingPerSide: smart.outerPaddingPerSide,
    innerPaddingPerSide: smart.innerPaddingPerSide,
    cartonMaterialLabel: smart.cartonMaterialLabel,
    cartonArealDensityKgPerSqm: smart.cartonArealDensityKgPerSqm,
    cartonBoardWeight: smart.cartonBoardWeight,
    accessoryWeightPerUnit: smart.accessoryWeightPerUnit,
    accessoryPackagingWeight: smart.accessoryPackagingWeight,
    accessoryPackagingNote: smart.accessoryPackagingNote,
    packagingWeightPerUnit: smart.packagingWeightPerUnit,
    totalNetWeight: smart.totalNetWeight,
    totalPackagingWeight: smart.totalPackagingWeight,
    packageLength: smart.packageLength,
    packageWidth: smart.packageWidth,
    packageHeight: smart.packageHeight,
    cartonArea: smart.cartonArea,
    cbmPerUnit,
    grossWeight,
    estimatedLoadQty,
    estimatedLoadQtyByVolume: smart.estimatedLoadQtyByVolume,
    estimatedLoadQtyByWeight: smart.estimatedLoadQtyByWeight,
    estimatedCartonsByVolume: smart.estimatedCartonsByVolume,
    estimatedCartonsByWeight: smart.estimatedCartonsByWeight,
    estimatedCartonsPerContainer: smart.estimatedCartonsPerContainer,
    containerCapacity,
    containerType: smart.containerProfile.containerType,
    containersNeeded: logistics.containersNeeded,
    productCostTotal: productCostPerUnit * orderQuantity,
    inlandFreightTotal: inlandFreightPerUnit * orderQuantity,
    customsFeeTotal: customsFeePerUnit * orderQuantity,
    portChargesTotal: portChargesPerUnit * orderQuantity,
    inspectionFeeTotal: inspectionFeePerUnit * orderQuantity,
    oceanFreightTotal: oceanFreightPerUnit * orderQuantity,
    insuranceFeeTotal: insuranceFeePerUnit * orderQuantity,
    destinationDeliveryTotal: destinationDeliveryPerUnit * orderQuantity,
    localChargesTotal: localChargesPerUnit * orderQuantity,
    quotedLogisticsTotal: quotedLogisticsPerUnit * orderQuantity,
    orderSurchargeTotal: orderSurchargePerUnit * orderQuantity,
    factoryCompleteCostTotal: factoryCompleteCostPerUnit * orderQuantity,
    operatingExpenseTotal: operatingExpensePerUnit * orderQuantity,
    operatingCostTotal: operatingCostPerUnit * orderQuantity,
    businessSafetyCostTotal: operatingCostPerUnit * orderQuantity,
    totalRmbTotal: totalRmbPerUnit * orderQuantity,
    rmbSellingTotal: rmbSellingPerUnit * orderQuantity,
    profitTotal: profitPerUnit * orderQuantity,
    netProfitPoolTotal: netProfitPoolPerUnit * orderQuantity,
    salesDeductionTotal: salesDeductionPerUnit * orderQuantity,
    usdCostTotal: usdCostPerUnit * orderQuantity,
    usdSellingTotal: usdSellingPerUnit * orderQuantity
  };
}

function renderTemplateOptions() {
  refs.templateSelect.innerHTML = getSelectableTemplates().map((template) => `<option value="${template.id}">${template.label}</option>`).join("");
}

function renderCustomCategoryOptions() {
  const currentValue = refs.customCategorySelect.value;
  const catalog = getActiveCatalog();
  refs.customCategorySelect.innerHTML = catalog.map((category) => `<option value="${category.key}">${category.label}</option>`).join("");
  const hasCurrentValue = catalog.some((category) => category.key === currentValue);
  refs.customCategorySelect.value = hasCurrentValue ? currentValue : catalog[0]?.key;
  renderPresetItemOptions();
}

function getPresetItemsByCategory(categoryKey) {
  return customItemPresets[categoryKey] || [];
}

function renderPresetItemOptions() {
  const categoryKey = refs.customCategorySelect.value;
  const presetItems = getPresetItemsByCategory(categoryKey);
  refs.presetItemSelect.innerHTML = [
    `<option value="">常用预设项（可选）</option>`,
    ...presetItems.map((item) => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</option>`)
  ].join("");
}

function fillFormFromState() {
  Object.entries(state.form).forEach(([key, value]) => {
    const element = document.getElementById(key);
    if (element) {
      if (element.type === "checkbox") {
        element.checked = Boolean(value);
        return;
      }
      element.value = value;
    }
  });
  refs.inlandFreightInput.value = state.summary.inlandFreight;
  refs.customsFeeInput.value = state.summary.customsFee;
  refs.portChargesInput.value = state.summary.portCharges;
  refs.inspectionFeeInput.value = state.summary.inspectionFee;
  refs.oceanFreightInput.value = state.summary.oceanFreight;
  refs.insuranceFeeInput.value = state.summary.insuranceFee;
  refs.destinationDeliveryInput.value = state.summary.destinationDelivery;
  refs.internalProfitRateInput.value = state.summary.internalProfitRate;
  refs.externalProfitRateInput.value = state.summary.externalProfitRate;
  refs.commissionRateInput.value = state.summary.commissionRate;
  refs.afterSalesRateInput.value = state.summary.afterSalesRate;
  refs.fxSafetyRateInput.value = state.summary.fxSafetyRate;
  refs.smallOrderSurchargeInput.value = state.summary.smallOrderSurcharge;
  refs.specialPackageSurchargeInput.value = state.summary.specialPackageSurcharge;
  refs.specialTestingSurchargeInput.value = state.summary.specialTestingSurcharge;
  refs.trialProductionSurchargeInput.value = state.summary.trialProductionSurcharge;
  refs.specialLabelSurchargeInput.value = state.summary.specialLabelSurcharge;
  refs.operatingExpenseRateInput.value = state.summary.operatingExpenseRate;
  refs.exchangeRateInput.value = state.summary.exchangeRate;
  refs.targetGrossMarginRateInput.value = state.form.targetGrossMarginRate;
  refs.floorGrossMarginRateInput.value = state.form.floorGrossMarginRate;
  refs.specialApprovalReasonInput.value = state.form.specialApprovalReason || "";
  updateDynamicFormUi();
}

function syncCustomerSourceUi() {
  if (!refs.customerSourceSelect || !refs.customerSourceOtherWrap) {
    return;
  }
  const presetValues = ["老客户", "展会", "平台", "转介绍", "业务开发"];
  const sourceValue = String(state.form.customerSource || "").trim();
  const useOtherInput = state.form.customerSourceMode === "other" || (sourceValue && !presetValues.includes(sourceValue));
  refs.customerSourceSelect.value = useOtherInput ? "other" : (sourceValue || "老客户");
  refs.customerSourceOtherWrap.classList.toggle("template-hidden", !useOtherInput);
  const customerSourceInput = document.getElementById("customerSource");
  if (customerSourceInput) {
    customerSourceInput.value = useOtherInput ? sourceValue : "";
  }
}

function updateDynamicFormUi() {
  const templateId = getTemplateById(state.form.templateSelect)?.id || "two-piece";
  const profile = templateFieldProfiles[templateId] || templateFieldProfiles.default;
  const hiddenFields = new Set(profile.hideFields || []);
  const specTitleEl = document.getElementById("specSectionTitle");
  const specDescEl = document.getElementById("specSectionDesc");
  if (specTitleEl) {
    specTitleEl.textContent = profile.sectionTitle || templateFieldProfiles.default.sectionTitle;
  }
  if (specDescEl) {
    specDescEl.textContent = profile.sectionDesc || templateFieldProfiles.default.sectionDesc;
  }
  const showSeatCoverToggle = templateSupportsSeatCover(templateId);
  const showSeatCoverGrade = showSeatCoverToggle && state.form.includeSeatCover !== "no";
  const showBasinFields = isBasinTemplate(templateId);
  ["flushingType", "trapType", "roughIn", "flushVolume", "glazeLevel"].forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    const wrapper = field?.closest("label");
    if (!wrapper) {
      return;
    }
    wrapper.classList.toggle("template-hidden", hiddenFields.has(fieldId));
  });
  const includeSeatCoverField = document.getElementById("includeSeatCover");
  const includeSeatCoverWrapper = includeSeatCoverField?.closest("label");
  if (includeSeatCoverWrapper) {
    includeSeatCoverWrapper.classList.toggle("template-hidden", !showSeatCoverToggle);
  }
  const seatCoverGradeField = document.getElementById("seatCoverGrade");
  const seatCoverGradeWrapper = seatCoverGradeField?.closest("label");
  if (seatCoverGradeWrapper) {
    seatCoverGradeWrapper.classList.toggle("template-hidden", hiddenFields.has("seatCoverGrade") || !showSeatCoverGrade);
  }
  const seatCoverSection = document.getElementById("seatCoverSection");
  if (seatCoverSection) {
    seatCoverSection.classList.toggle("template-hidden", !showSeatCoverGrade);
  }
  const basinSection = document.getElementById("basinSpecSection");
  if (basinSection) {
    basinSection.classList.toggle("template-hidden", !showBasinFields);
  }
  syncCustomerSourceUi();
}

function renderModeUi() {
  const isBudgetMode = getCalcMode() === "budget";
  const rapid = isRapidMode();
  if (refs.quoteInputTitle) {
    refs.quoteInputTitle.textContent = rapid ? "极速报价输入" : "完整模式录入";
  }
  if (refs.quoteInputDesc) {
    refs.quoteInputDesc.textContent = rapid
      ? "只保留客户、市场、条款、核心尺寸和少量关键判断项，系统自动带出经验成本、建议区间和风险提示。"
      : "进入完整核价口径，逐步补齐 BOM、物流、认证、联系人和审批相关参数。";
  }
  refs.modeHint.innerHTML = isBudgetMode
    ? `<strong>当前方式：总预算均摊</strong>。每个模块录入批次总费用，系统会按“产量 / 分摊数量”自动折算到单台，再乘以订单数量。适合复盘整批生产成本。`
    : rapid
      ? `<strong>当前方式：极速报价</strong>。只保留客户、产品、数量、核心规格和尺寸输入，系统自动完成包装、装柜、物流和默认成本测算。`
      : `<strong>当前方式：完整模式</strong>。可查看并调整 BOM、包装、配件、认证和详细成本参数，适合深度精算。`;
  refs.bomModeHint.innerHTML = isBudgetMode
    ? `<strong>预算逻辑：</strong> 预算总额会先除以产量，得到真实单件摊销，再叠加物流、认证、利润预留。`
    : rapid
      ? `<strong>极速逻辑：</strong> 当前默认按模板带出包装、装柜及多数配套规则，业务只需输入客户、市场、条款、核心尺寸与 4 个关键判断项；盖板仅在选择“含盖板”时补录。`
      : `<strong>智能逻辑：</strong> 输入产品尺寸后，系统会自动推导包装尺寸、纸箱面积、单件体积、毛重、装柜量和运费均摊；外购件、包装与认证也会尽量按默认规则自动带价。`;
  refs.primaryValueHeader.textContent = isBudgetMode ? "预算总额" : "单件用量";
  refs.secondaryValueHeader.textContent = isBudgetMode ? "均摊到单台" : "RMB 单价";
  refs.amountHeader.textContent = isBudgetMode ? "订单金额" : "金额";
  refs.summaryCardLabel1.textContent = costGroups[0].label;
  refs.summaryCardLabel2.textContent = costGroups[1].label;
  refs.summaryCardLabel3.textContent = costGroups[2].label;
  refs.summaryCardLabel4.textContent = costGroups[3].label;
  renderCustomCategoryOptions();
}

function applyQuoteModeUi() {
  const rapid = isRapidMode();
  refs.workbenchSection?.classList.toggle("rapid-quote-mode", rapid);
  refs.workbenchSection?.classList.toggle("full-quote-mode", !rapid);
  refs.rapidModeBtn?.classList.toggle("active", rapid);
  refs.fullModeBtn?.classList.toggle("active", !rapid);
  if (rapid) {
    const priceLibraryPanel = document.getElementById("priceLibraryPanel");
    priceLibraryPanel?.classList.add("collapsed");
  }
}

function getCategoryMeta(categoryKey) {
  const rows = getActiveRows().filter((row) => row.categoryKey === categoryKey);
  return {
    rows,
    itemCount: rows.length,
    subtotalPerUnit: rows.reduce((sum, row) => sum + getRowPerUnitAmount(row), 0)
  };
}

function renderBomOverview() {
  const catalog = getActiveCatalog();
  const orderQuantity = getOrderQuantity();
  refs.bomOverviewCards.innerHTML = catalog.map((category) => {
    const meta = getCategoryMeta(category.key);
    return `
      <article class="overview-card">
        <span>${category.label}</span>
        <strong>${formatRmb(meta.subtotalPerUnit)}</strong>
        <span>${meta.itemCount} 项 ｜ 订单总计 ${formatRmb(meta.subtotalPerUnit * orderQuantity)}</span>
      </article>
    `;
  }).join("");
}

function renderBomTable() {
  if (!getActiveRows().length) {
    refs.bomTableBody.innerHTML = `<tr><td colspan="8"><div class="empty-state">暂无成本明细，请先载入模板或新增自定义项。</div></td></tr>`;
    refs.bomOverviewCards.innerHTML = "";
    renderModeUi();
    return;
  }

  const isBudgetMode = getCalcMode() === "budget";
  const activeCatalog = getActiveCatalog();
  const activeRows = getActiveRows();
  const orderQuantity = getOrderQuantity();
  const html = activeCatalog.map((category) => {
    const categoryRows = activeRows.filter((row) => row.categoryKey === category.key);
    if (!categoryRows.length) {
      return "";
    }

    const subtotalPerUnit = categoryRows.reduce((sum, row) => sum + getRowPerUnitAmount(row), 0);
    const rowsHtml = categoryRows.map((row) => {
      const rowPerUnitAmount = getRowPerUnitAmount(row);
      const rowOrderAmount = getRowOrderAmount(row);
      return `
        <tr data-id="${row.rowId}">
          <td><input class="cell-input" data-field="name" type="text" value="${escapeHtml(row.name)}"></td>
          <td><input class="cell-input" data-field="unit" type="text" value="${escapeHtml(row.unit)}"></td>
          <td>${isBudgetMode
            ? `<input class="cell-input" data-field="totalAmount" type="number" step="0.01" min="0" value="${Number(row.totalAmount) || 0}">`
            : `<input class="cell-input" data-field="qty" type="number" step="0.0001" min="0" value="${Number(row.qty) || 0}">`}</td>
          <td>${isBudgetMode
            ? `<div class="readonly-box per-unit-box">${formatRmb(rowPerUnitAmount)}</div>`
            : `<input class="cell-input" data-field="unitPrice" type="number" step="0.01" min="0" value="${Number(row.unitPrice) || 0}">`}</td>
          <td>
            <div class="amount-text">
              <strong>${isBudgetMode ? formatRmb(rowOrderAmount) : formatRmb(rowPerUnitAmount)}</strong>
              <span>${isBudgetMode ? `均摊单台 ${formatRmb(rowPerUnitAmount)}` : `订单总计 ${formatRmb(rowOrderAmount)}`}</span>
            </div>
          </td>
          <td><textarea class="cell-textarea" data-field="note" rows="2">${escapeHtml(row.note || "")}</textarea></td>
          <td>${isExternalEligibleCategory(row.categoryKey)
            ? `<select class="cell-input outsource-select" data-field="isExternal"><option value="false"${row.isExternal ? "" : " selected"}>否</option><option value="true"${row.isExternal ? " selected" : ""}>是</option></select>`
            : `<div class="readonly-box">内部</div>`}</td>
          <td><button class="delete-btn" data-action="delete" type="button">删除</button></td>
        </tr>
      `;
    }).join("");

    const isCollapsed = state.collapsedCategories[category.key];

    return `
      <tr class="group-header-row">
        <td colspan="8">
          <div class="group-header" data-category="${category.key}" role="button" tabindex="0">
            <div class="group-title">
              <span class="category-chip">${category.label}</span>
              <strong>${categoryRows.length} 个明细项</strong>
            </div>
            <div class="group-summary">
              <strong>${formatRmb(subtotalPerUnit)}</strong>
              <span>订单总计 ${formatRmb(subtotalPerUnit * orderQuantity)}</span>
              <span class="toggle-icon">${isCollapsed ? "▼ 展开" : "▲ 收起"}</span>
            </div>
          </div>
        </td>
      </tr>
      ${isCollapsed ? "" : rowsHtml}
      ${isCollapsed ? "" : `
      <tr class="subtotal-row">
        <td colspan="8">
          <div class="subtotal-box">
            <div class="subtotal-pill">
              <span>${category.label} 小计</span>
              <strong>${formatRmb(subtotalPerUnit)}</strong>
              <span>订单总计 ${formatRmb(subtotalPerUnit * orderQuantity)}</span>
            </div>
          </div>
        </td>
      </tr>
      `}
    `;
  }).join("");

  refs.bomTableBody.innerHTML = html;
  renderModeUi();
  renderBomOverview();
}

function getTierQuoteRows(totals) {
  const tiers = [100, 300, 500, 1000];
  const amortizationBaseQty = getProductionQuantity();
  const smart = calculateSmartQuoteMetrics();
  const tradeMeta = getTradeTermMeta();
  const toolingPool = (totals.categoryTotals.tooling || 0) * amortizationBaseQty;
  const compliancePool = (totals.categoryTotals.compliance || 0) * amortizationBaseQty;
  const fixedPool = toolingPool + compliancePool;
  const variableManufacturingPerUnit = totals.manufacturingCostPerUnit - (totals.categoryTotals.tooling || 0) - (totals.categoryTotals.compliance || 0);

  return tiers.map((quantity) => {
    const tierLogistics = calculateTradeLogisticsForQuantity(quantity, smart, tradeMeta);
    const tierManufacturingCostPerUnit = variableManufacturingPerUnit + (fixedPool / quantity);
    const tierExternalBasePerUnit = Math.max(totals.externalBasePerUnit - (totals.categoryTotals.compliance || 0), 0) + (compliancePool / quantity);
    const tierFactoryCompleteCostPerUnit = tierManufacturingCostPerUnit + totals.orderSurchargePerUnit;
    const tierOperatingExpensePerUnit = tierFactoryCompleteCostPerUnit * (totals.operatingExpenseRate / 100);
    const tierOperatingCostPerUnit = tierFactoryCompleteCostPerUnit + tierOperatingExpensePerUnit;
    const tierTotalRmbPerUnit = tierOperatingCostPerUnit + tierLogistics.quotedLogisticsPerUnit;
    const tierPrice = calculatePriceFromTargetMargin(tierTotalRmbPerUnit, totals.exchangeRate, totals.targetGrossMarginRate, totals.salesDeductionRate);
    return {
      quantity,
      tierProductCostPerUnit: tierTotalRmbPerUnit,
      tierLogisticsPerUnit: tierLogistics.quotedLogisticsPerUnit,
      tierContainersNeeded: tierLogistics.containersNeeded,
      tierUsdSellingPerUnit: tierPrice.usdSellingPerUnit,
      tierOrderAmount: tierPrice.usdSellingPerUnit * quantity
    };
  });
}

function renderTierQuotes(totals) {
  const rows = getTierQuoteRows(totals);
  refs.tierTableBody.innerHTML = rows.map((row) => `
      <tr>
        <td>${row.quantity} 件</td>
        <td>${formatRmb(row.tierProductCostPerUnit)}</td>
        <td>${formatRmb(row.tierLogisticsPerUnit)} / ${row.tierContainersNeeded} 柜</td>
        <td>${formatUsd(row.tierUsdSellingPerUnit)}</td>
        <td>${formatUsd(row.tierOrderAmount)}</td>
      </tr>
    `).join("");
}

function renderSupplierBenchmark() {
  const rows = getSupplierBenchmarkRows();
  refs.supplierBenchmarkList.innerHTML = rows.map((row) => `
      <article class="benchmark-card">
        <strong>${escapeHtml(row.label)}</strong>
        <span>${escapeHtml(row.value)}</span>
        <p>${escapeHtml(row.desc)}</p>
      </article>
    `).join("");
}

function renderPriceLibraryEditor() {
  const priceLibrary = getPriceLibrary();
  const seatRows = Object.entries(priceLibrary.seatCoverGrade).map(([key, item]) => `
      <tr>
        <td>${escapeHtml(key)}</td>
        <td><input class="cell-input" data-lib-group="seatCoverGrade" data-lib-key="${escapeHtml(key)}" data-lib-field="unitPrice" type="number" min="0" step="0.01" value="${Number(item.unitPrice) || 0}"></td>
        <td><input class="cell-input" data-lib-group="seatCoverGrade" data-lib-key="${escapeHtml(key)}" data-lib-field="note" type="text" value="${escapeHtml(item.note || "")}"></td>
      </tr>
    `).join("");
  const glazeRows = Object.entries(priceLibrary.glazeLevel).map(([key, item]) => `
      <tr>
        <td>${escapeHtml(key)}</td>
        <td><input class="cell-input" data-lib-group="glazeLevel" data-lib-key="${escapeHtml(key)}" data-lib-field="unitPrice" type="number" min="0" step="0.01" value="${Number(item.unitPrice) || 0}"></td>
        <td><input class="cell-input" data-lib-group="glazeLevel" data-lib-key="${escapeHtml(key)}" data-lib-field="note" type="text" value="${escapeHtml(item.note || "")}"></td>
      </tr>
    `).join("");
  const certificationRows = priceLibrary.certificationKeywords.map((item, index) => `
      <tr>
        <td>${escapeHtml(item.keyword)}</td>
        <td><input class="cell-input" data-lib-group="certificationKeywords" data-lib-index="${index}" data-lib-field="unitPrice" type="number" min="0" step="0.01" value="${Number(item.unitPrice) || 0}"></td>
        <td><input class="cell-input" data-lib-group="certificationKeywords" data-lib-index="${index}" data-lib-field="note" type="text" value="${escapeHtml(item.note || "")}"></td>
      </tr>
    `).join("");

  refs.priceLibraryEditor.innerHTML = `
    <div class="library-grid">
      <section class="library-section">
        <h3>盖板价格库</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>档次</th><th>单价</th><th>说明</th></tr></thead>
            <tbody>${seatRows}</tbody>
          </table>
        </div>
      </section>
      <section class="library-section">
        <h3>釉面价格库</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>等级</th><th>单价</th><th>说明</th></tr></thead>
            <tbody>${glazeRows}</tbody>
          </table>
        </div>
      </section>
      <section class="library-section full-span">
        <h3>认证摊销价格库</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>关键词</th><th>单价</th><th>说明</th></tr></thead>
            <tbody>${certificationRows}</tbody>
          </table>
        </div>
      </section>
      <section class="library-section full-span">
        <div class="library-tip">工厂原料、工艺、月度费率、人员工资和包装规则已经独立到左侧的 <strong>工厂中心</strong> 中维护，这里只保留报价业务侧常用价格库。</div>
      </section>
    </div>
  `;
}

function renderFactoryRatesEditor() {
  if (!refs.factoryRatesEditor || !refs.factoryRatesOverview) {
    return;
  }
  const materialRate = getCeramicMaterialRate();
  const factoryRate = getFactoryMonthlyRate();

  refs.factoryRatesOverview.innerHTML = `
    <article class="factory-overview-card">
      <strong>月产量基线</strong>
      <span>${Math.round(factoryRate.monthlyOutputUnits || 0)} 件</span>
      <p>所有月度费率和人员工资都按这个月产量分摊到单件。</p>
    </article>
    <article class="factory-overview-card">
      <strong>泥料单价</strong>
      <span>${formatRmb(materialRate.clayCostPerKg || 0)}</span>
      <p>按 kg 计入主体泥料和副体泥料成本。</p>
    </article>
    <article class="factory-overview-card">
      <strong>釉料单价</strong>
      <span>${formatRmb(materialRate.glazeCostPerKg || 0)}</span>
      <p>按净重和釉料系数自动推导釉料消耗。</p>
    </article>
    <article class="factory-overview-card">
      <strong>月度制造费</strong>
      <span>${formatRmb((factoryRate.managementMonthly || 0) + (factoryRate.utilitiesMonthly || 0) + (factoryRate.workshopSupportMonthly || 0) + (factoryRate.maintenanceMonthly || 0))}</span>
      <p>包含管理费、水电燃气、车间支持和维修耗材。</p>
    </article>
  `;

  refs.factoryRatesEditor.innerHTML = `
    <section class="library-section">
      <h3>陶瓷原料成本</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>方案</th><th>泥料单价 / kg</th><th>釉料单价 / kg</th><th>辅料 / kg 泥料</th></tr></thead>
          <tbody>
            <tr>
              <td>default</td>
              <td><input class="cell-input" data-lib-group="ceramicMaterialRates" data-lib-key="default" data-lib-field="clayCostPerKg" type="number" min="0" step="0.01" value="${Number(materialRate.clayCostPerKg) || 0}"></td>
              <td><input class="cell-input" data-lib-group="ceramicMaterialRates" data-lib-key="default" data-lib-field="glazeCostPerKg" type="number" min="0" step="0.01" value="${Number(materialRate.glazeCostPerKg) || 0}"></td>
              <td><input class="cell-input" data-lib-group="ceramicMaterialRates" data-lib-key="default" data-lib-field="additiveCostPerKgClay" type="number" min="0" step="0.01" value="${Number(materialRate.additiveCostPerKgClay) || 0}"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="library-section">
      <h3>工厂月度费率</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>方案</th><th>月产量 / 件</th><th>管理费用 / 月</th><th>水电燃气 / 月</th><th>车间支持 / 月</th><th>维修耗材 / 月</th></tr></thead>
          <tbody>
            <tr>
              <td>default</td>
              <td><input class="cell-input" data-lib-group="factoryMonthlyRates" data-lib-key="default" data-lib-field="monthlyOutputUnits" type="number" min="1" step="1" value="${Number(factoryRate.monthlyOutputUnits) || 0}"></td>
              <td><input class="cell-input" data-lib-group="factoryMonthlyRates" data-lib-key="default" data-lib-field="managementMonthly" type="number" min="0" step="0.01" value="${Number(factoryRate.managementMonthly) || 0}"></td>
              <td><input class="cell-input" data-lib-group="factoryMonthlyRates" data-lib-key="default" data-lib-field="utilitiesMonthly" type="number" min="0" step="0.01" value="${Number(factoryRate.utilitiesMonthly) || 0}"></td>
              <td><input class="cell-input" data-lib-group="factoryMonthlyRates" data-lib-key="default" data-lib-field="workshopSupportMonthly" type="number" min="0" step="0.01" value="${Number(factoryRate.workshopSupportMonthly) || 0}"></td>
              <td><input class="cell-input" data-lib-group="factoryMonthlyRates" data-lib-key="default" data-lib-field="maintenanceMonthly" type="number" min="0" step="0.01" value="${Number(factoryRate.maintenanceMonthly) || 0}"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="library-section full-span">
      <h3>维护口径说明</h3>
      <div class="library-tip">费率中心只维护 <strong>原料价格</strong> 和 <strong>月度费率</strong>。产品工艺模板、标准节拍和工序系数已独立迁移到左侧的 <strong>工序中心</strong> 维护。</div>
    </section>
  `;
}

function renderFactoryProcessEditor() {
  if (!refs.factoryProcessEditor || !refs.factoryProcessOverview) {
    return;
  }
  const priceLibrary = getPriceLibrary();
  const processStages = getFactoryProcessStages();
  const ceramic = calculateCeramicCostMetrics();
  const templateId = getTemplateById(state.form.templateSelect).id;
  const templateLabel = getTemplateById(templateId).label;
  const processProfileRows = Object.entries(priceLibrary.ceramicProcessProfiles).map(([key, item]) => `
    <tr>
      <td>${escapeHtml(getTemplateById(key).label)}</td>
      <td><input class="cell-input" data-lib-group="ceramicProcessProfiles" data-lib-key="${escapeHtml(key)}" data-lib-field="clayInputRatio" type="number" min="0" step="0.001" value="${Number(item.clayInputRatio) || 0}"></td>
      <td><input class="cell-input" data-lib-group="ceramicProcessProfiles" data-lib-key="${escapeHtml(key)}" data-lib-field="glazeUsePerKgNet" type="number" min="0" step="0.001" value="${Number(item.glazeUsePerKgNet) || 0}"></td>
      <td><input class="cell-input" data-lib-group="ceramicProcessProfiles" data-lib-key="${escapeHtml(key)}" data-lib-field="formingLaborPerKgNet" type="number" min="0" step="0.001" value="${Number(item.formingLaborPerKgNet) || 0}"></td>
      <td><input class="cell-input" data-lib-group="ceramicProcessProfiles" data-lib-key="${escapeHtml(key)}" data-lib-field="glazingLaborPerKgNet" type="number" min="0" step="0.001" value="${Number(item.glazingLaborPerKgNet) || 0}"></td>
      <td><input class="cell-input" data-lib-group="ceramicProcessProfiles" data-lib-key="${escapeHtml(key)}" data-lib-field="firingEnergyPerKgNet" type="number" min="0" step="0.001" value="${Number(item.firingEnergyPerKgNet) || 0}"></td>
      <td><input class="cell-input" data-lib-group="ceramicProcessProfiles" data-lib-key="${escapeHtml(key)}" data-lib-field="finishingQcPerUnit" type="number" min="0" step="0.01" value="${Number(item.finishingQcPerUnit) || 0}"></td>
      <td><input class="cell-input" data-lib-group="ceramicProcessProfiles" data-lib-key="${escapeHtml(key)}" data-lib-field="yieldLossRate" type="number" min="0" step="0.001" value="${Number(item.yieldLossRate) || 0}"></td>
      <td><input class="cell-input" data-lib-group="ceramicProcessProfiles" data-lib-key="${escapeHtml(key)}" data-lib-field="reworkRate" type="number" min="0" step="0.001" value="${Number(item.reworkRate) || 0}"></td>
    </tr>
  `).join("");
  const stageRows = Object.entries(processStages).map(([key, item]) => `
    <tr>
      <td>${escapeHtml(item.label || key)}</td>
      <td>${escapeHtml(item.linkedRow || "-")}</td>
      <td><input class="cell-input" data-lib-group="factoryProcessStages" data-lib-key="default" data-lib-subkey="${escapeHtml(key)}" data-lib-field="standardMinutes" type="number" min="0" step="1" value="${Number(item.standardMinutes) || 0}"></td>
      <td><input class="cell-input" data-lib-group="factoryProcessStages" data-lib-key="default" data-lib-subkey="${escapeHtml(key)}" data-lib-field="costFactor" type="number" min="0" step="0.01" value="${Number(item.costFactor) || 0}"></td>
    </tr>
  `).join("");

  refs.factoryProcessOverview.innerHTML = `
    <article class="factory-overview-card">
      <strong>当前报价模板</strong>
      <span>${escapeHtml(templateLabel)}</span>
      <p>工序中心会按当前产品模板口径推导成型、施釉、烧成和修补质检成本。</p>
    </article>
    <article class="factory-overview-card">
      <strong>成型人工</strong>
      <span>${formatRmb(ceramic.formingLaborCost)}</span>
      <p>基准人工 + 工序系数 ${formatNumber(ceramic.formingProcessFactor, 2)} + 人员工资分摊。</p>
    </article>
    <article class="factory-overview-card">
      <strong>烧成能耗</strong>
      <span>${formatRmb(ceramic.firingEnergyCost)}</span>
      <p>按净重和烧成工序系数 ${formatNumber(ceramic.firingProcessFactor, 2)} 自动折算。</p>
    </article>
    <article class="factory-overview-card">
      <strong>修补质检</strong>
      <span>${formatRmb(ceramic.finishingQcCost)}</span>
      <p>已联动修补工序系数 ${formatNumber(ceramic.finishingProcessFactor, 2)} 和质检班组工资。</p>
    </article>
  `;

  refs.factoryProcessEditor.innerHTML = `
    <section class="library-section">
      <h3>核心工序阶段</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>工序</th><th>联动成本项</th><th>标准节拍 / 分钟</th><th>工序系数</th></tr></thead>
          <tbody>${stageRows}</tbody>
        </table>
      </div>
    </section>
    <section class="library-section full-span">
      <h3>产品工艺模板</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>产品类型</th><th>投泥系数</th><th>釉料系数</th><th>成型人工 / kg</th><th>施釉人工 / kg</th><th>烧成能耗 / kg</th><th>修补质检 / 件</th><th>损耗率</th><th>返工率</th></tr></thead>
          <tbody>${processProfileRows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderFactoryPackagingEditor() {
  if (!refs.factoryPackagingEditor || !refs.factoryPackagingOverview) {
    return;
  }
  const priceLibrary = getPriceLibrary();
  const smart = calculateSmartQuoteMetrics();
  const templateId = getTemplateById(state.form.templateSelect).id;
  const templateLabel = getTemplateById(templateId).label;
  const smartPackageRows = Object.entries(priceLibrary.smartPackaging.packageGrade).map(([grade, item]) => `
    <tr>
      <td>${escapeHtml(grade)}</td>
      <td><input class="cell-input" data-lib-group="smartPackagingPackageGrade" data-lib-key="${escapeHtml(grade)}" data-lib-field="cartonRatePerSqm" type="number" min="0" step="0.01" value="${Number(item.cartonRatePerSqm) || 0}"></td>
      <td><input class="cell-input" data-lib-group="smartPackagingPackageGrade" data-lib-key="${escapeHtml(grade)}" data-lib-field="cartonFixed" type="number" min="0" step="0.01" value="${Number(item.cartonFixed) || 0}"></td>
      <td><input class="cell-input" data-lib-group="smartPackagingPackageGrade" data-lib-key="${escapeHtml(grade)}" data-lib-field="innerPackRatePerSqm" type="number" min="0" step="0.01" value="${Number(item.innerPackRatePerSqm) || 0}"></td>
      <td><input class="cell-input" data-lib-group="smartPackagingPackageGrade" data-lib-key="${escapeHtml(grade)}" data-lib-field="innerPackFixed" type="number" min="0" step="0.01" value="${Number(item.innerPackFixed) || 0}"></td>
      <td><input class="cell-input" data-lib-group="smartPackagingPackageGrade" data-lib-key="${escapeHtml(grade)}" data-lib-field="palletRatePerCbm" type="number" min="0" step="0.01" value="${Number(item.palletRatePerCbm) || 0}"></td>
      <td><input class="cell-input" data-lib-group="smartPackagingPackageGrade" data-lib-key="${escapeHtml(grade)}" data-lib-field="palletFixed" type="number" min="0" step="0.01" value="${Number(item.palletFixed) || 0}"></td>
      <td><input class="cell-input" data-lib-group="smartPackagingPackageGrade" data-lib-key="${escapeHtml(grade)}" data-lib-field="labelFixed" type="number" min="0" step="0.01" value="${Number(item.labelFixed) || 0}"></td>
    </tr>
  `).join("");
  const paddingRows = Object.entries(priceLibrary.smartPackaging.templatePadding).map(([key, item]) => `
    <tr>
      <td>${escapeHtml(getTemplateById(key).label)}</td>
      <td><input class="cell-input" data-lib-group="smartPackagingTemplatePadding" data-lib-key="${escapeHtml(key)}" data-lib-field="outerPaddingPerSide" type="number" min="0" step="1" value="${Number(item.outerPaddingPerSide) || 15}"></td>
      <td><input class="cell-input" data-lib-group="smartPackagingTemplatePadding" data-lib-key="${escapeHtml(key)}" data-lib-field="innerPaddingPerSide" type="number" min="0" step="1" value="${Number(item.innerPaddingPerSide) || 5}"></td>
      <td><input class="cell-input" data-lib-group="smartPackagingTemplatePadding" data-lib-key="${escapeHtml(key)}" data-lib-field="cartonArealDensityKgPerSqm" type="number" min="0" step="0.01" value="${Number(item.cartonArealDensityKgPerSqm) || 0.82}"></td>
      <td><input class="cell-input" data-lib-group="smartPackagingTemplatePadding" data-lib-key="${escapeHtml(key)}" data-lib-field="accessoryWeightPerUnit" type="number" min="0" step="0.01" value="${Number(item.accessoryWeightPerUnit) || 0}"></td>
    </tr>
  `).join("");

  refs.factoryPackagingOverview.innerHTML = `
    <article class="factory-overview-card">
      <strong>当前模板</strong>
      <span>${escapeHtml(templateLabel)}</span>
      <p>默认外箱按 ${escapeHtml(smart.cartonMaterialLabel || "5层瓦楞纸箱")} 估算，包装外扩尺寸和重量拆解会按当前产品模板自动推导。</p>
    </article>
    <article class="factory-overview-card">
      <strong>包装外箱</strong>
      <span>${Math.round(smart.packageLength)} × ${Math.round(smart.packageWidth)} × ${Math.round(smart.packageHeight)} mm</span>
      <p>${smart.stackingMode === "vertical" ? "当前按竖向单列堆叠" : `当前按每箱 ${Math.round(smart.unitsPerCarton || 1)} 件自动排布`}，外箱单边 ${formatNumber(smart.outerPaddingPerSide, 0)} mm 计算。</p>
    </article>
    <article class="factory-overview-card">
      <strong>纸箱重量</strong>
      <span>${formatNumber(smart.cartonBoardWeight, 2)} KG</span>
      <p>纸箱面积 ${formatNumber(smart.cartonArea, 2)} ㎡ × 面密度 ${formatNumber(smart.cartonArealDensityKgPerSqm, 2)} KG/㎡。</p>
    </article>
    <article class="factory-overview-card">
      <strong>辅材估重</strong>
      <span>${formatNumber(smart.accessoryPackagingWeight, 2)} KG / 箱</span>
      <p>按每件辅材 ${formatNumber(smart.accessoryWeightPerUnit, 2)} KG × ${Math.round(smart.unitsPerCarton || 1)} 件估算。</p>
    </article>
    <article class="factory-overview-card">
      <strong>单件包装成本</strong>
      <span>${formatRmb(smart.innerPackCost + smart.outerCartonCost + smart.palletProtectionCost + smart.manualLabelCost)}</span>
      <p>多件同箱时会自动按每箱件数折算到单件。</p>
    </article>
  `;

  refs.factoryPackagingEditor.innerHTML = `
    <section class="library-section full-span">
      <h3>包装等级规则</h3>
      <p class="library-helper">系统只保留这一套包装等级参数，报价中的内包、外箱、托盘和标签成本都按这里自动推导，不再维护独立结果价表。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>包装等级</th><th>外箱 / 元/㎡</th><th>外箱固定 / 元</th><th>内包 / 元/㎡</th><th>内包固定 / 元</th><th>托盘 / 元/CBM</th><th>托盘固定 / 元</th><th>标签固定 / 元</th></tr></thead>
          <tbody>${smartPackageRows}</tbody>
        </table>
      </div>
    </section>
    <section class="library-section full-span">
      <h3>模板包装外扩规则</h3>
      <p class="library-helper">这里定义尺寸外扩和重量拆解。纸箱重量 = 纸箱面积 × 面密度；辅材估重按单件经验值 × 每箱件数。</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>产品类型</th><th>外箱单边外扩 / mm</th><th>内箱单边外扩 / mm</th><th>纸箱面密度 / KG/㎡</th><th>辅材估重 / KG/件</th></tr></thead>
          <tbody>${paddingRows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderFactoryPersonnelEditor() {
  if (!refs.factoryPersonnelEditor || !refs.factoryPersonnelOverview) {
    return;
  }
  const personnel = calculateFactoryPersonnelMetrics();
  const teams = Object.entries(getFactoryPersonnelConfig()).map(([key, item]) => {
    const headcount = Math.max(Number(item.headcount) || 0, 0);
    const avgMonthlySalary = Math.max(Number(item.avgMonthlySalary) || 0, 0);
    const allocationRate = Math.min(Math.max(Number(item.allocationRate) || 0, 0), 1);
    const monthlyPayroll = headcount * avgMonthlySalary * allocationRate;
    const perUnitPayroll = monthlyPayroll / Math.max(Number(personnel.monthlyOutputUnits) || 1, 1);
    return `
    <tr>
      <td>${escapeHtml(item.label || key)}</td>
      <td>${escapeHtml(item.linkedRow || "-")}</td>
      <td><input class="cell-input" data-lib-group="factoryPersonnel" data-lib-key="default" data-lib-subkey="${escapeHtml(key)}" data-lib-field="headcount" type="number" min="0" step="1" value="${headcount}"></td>
      <td><input class="cell-input" data-lib-group="factoryPersonnel" data-lib-key="default" data-lib-subkey="${escapeHtml(key)}" data-lib-field="avgMonthlySalary" type="number" min="0" step="0.01" value="${avgMonthlySalary}"></td>
      <td><input class="cell-input" data-lib-group="factoryPersonnel" data-lib-key="default" data-lib-subkey="${escapeHtml(key)}" data-lib-field="allocationRate" type="number" min="0" max="1" step="0.01" value="${allocationRate}"></td>
      <td>${formatRmb(monthlyPayroll)}</td>
      <td>${formatRmb(perUnitPayroll)}</td>
    </tr>
  `;
  }).join("");

  refs.factoryPersonnelOverview.innerHTML = `
    <article class="factory-overview-card">
      <strong>月工资池</strong>
      <span>${formatRmb(personnel.totalMonthlyPayroll)}</span>
      <p>按照人数、平均工资和分摊比例自动汇总。</p>
    </article>
    <article class="factory-overview-card">
      <strong>单件工资分摊</strong>
      <span>${formatRmb(personnel.totalPerUnitPayroll)}</span>
      <p>会自动回写到成型、施釉、质检、管理和车间公摊。</p>
    </article>
    <article class="factory-overview-card">
      <strong>班组数量</strong>
      <span>${personnel.teamRows.length}</span>
      <p>当前按部门管理，后续可继续细化岗位。</p>
    </article>
    <article class="factory-overview-card">
      <strong>当前分摊口径</strong>
      <span>${Math.round(personnel.monthlyOutputUnits || 0)} 件</span>
      <p>与费率中心共用月产量基线，保证成本口径统一。</p>
    </article>
  `;

  refs.factoryPersonnelEditor.innerHTML = `
    <section class="library-section full-span">
      <h3>班组工资分摊表</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>班组</th><th>联动成本项</th><th>人数</th><th>月均工资</th><th>分摊比例</th><th>月工资额</th><th>单件分摊</th></tr></thead>
          <tbody>${teams}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderFactoryCenter() {
  renderFactoryRatesEditor();
  renderFactoryProcessEditor();
  renderFactoryPackagingEditor();
  renderFactoryPersonnelEditor();
}

function updateLibraryByDataset(target) {
  const group = target.dataset.libGroup;
  const field = target.dataset.libField;
  if (!group || !field) {
    return false;
  }

  if (group === "certificationKeywords") {
    const index = Number(target.dataset.libIndex);
    if (Number.isNaN(index) || !state.priceLibrary.certificationKeywords[index]) {
      return false;
    }
    state.priceLibrary.certificationKeywords[index][field] = field === "unitPrice" ? Math.max(Number(target.value) || 0, 0) : target.value;
    return true;
  }

  if (group === "factoryPersonnel") {
    const personKey = target.dataset.libSubkey;
    if (!personKey || !state.priceLibrary.factoryPersonnel?.default?.[personKey]) {
      return false;
    }
    state.priceLibrary.factoryPersonnel.default[personKey][field] = Math.max(Number(target.value) || 0, 0);
    return true;
  }

  if (group === "factoryProcessStages") {
    const stageKey = target.dataset.libSubkey;
    if (!stageKey || !state.priceLibrary.factoryProcessStages?.default?.[stageKey]) {
      return false;
    }
    state.priceLibrary.factoryProcessStages.default[stageKey][field] = Math.max(Number(target.value) || 0, 0);
    return true;
  }

  if (group === "smartPackagingPackageGrade") {
    const packageKey = target.dataset.libKey;
    if (!packageKey || !state.priceLibrary.smartPackaging?.packageGrade?.[packageKey]) {
      return false;
    }
    state.priceLibrary.smartPackaging.packageGrade[packageKey][field] = Math.max(Number(target.value) || 0, 0);
    return true;
  }

  if (group === "smartPackagingTemplatePadding") {
    const templateKey = target.dataset.libKey;
    if (!templateKey || !state.priceLibrary.smartPackaging?.templatePadding?.[templateKey]) {
      return false;
    }
    state.priceLibrary.smartPackaging.templatePadding[templateKey][field] = Math.max(Number(target.value) || 0, 0);
    return true;
  }

  const key = target.dataset.libKey;
  if (!key || !state.priceLibrary[group]?.[key]) {
    return false;
  }
  state.priceLibrary[group][key][field] = field === "note" ? target.value : Math.max(Number(target.value) || 0, 0);
  return true;
}

function getProductTemplateLabel() {
  return getTemplateById(state.form.templateSelect)?.label || state.form.productName || "-";
}

function getProductSpecDisplayRows() {
  if (isBasinTemplate(state.form.templateSelect)) {
    return [
      ["Installation", state.form.basinInstallation || "-"],
      ["Faucet Hole", state.form.faucetHole || "-"],
      ["Overflow", state.form.overflowHole || "-"],
      ["Drain / Fittings", state.form.drainKitIncluded || "-"],
      ["Glaze", state.form.glazeLevel || "-"],
      ["Packing", state.form.packageGrade || "-"]
    ];
  }
  return [
    ["Flushing", state.form.flushingType || "-"],
    ["Trapway", state.form.trapType || "-"],
    ["Rough-in / Outlet", state.form.roughIn || "-"],
    ["Flush Volume", state.form.flushVolume || "-"],
    ["Seat Cover", state.form.includeSeatCover === "no" ? "Not included" : (state.form.seatCoverGrade || "-")],
    ["Packing", state.form.packageGrade || "-"]
  ];
}

function renderQuotePreview(totals) {
  const specRows = getProductSpecDisplayRows();
  refs.quotePreview.innerHTML = `
    <div class="quote-sheet">
      <div class="quote-sheet-header">
        <div>
          <span class="quote-sheet-eyebrow">Quotation Preview</span>
          <h3>${escapeHtml(state.form.productName || "未命名产品")}</h3>
          <p>${escapeHtml(state.form.modelCode || "未设置型号")} ｜ ${escapeHtml(state.form.tradeTerm || "未设置条款")} ｜ ${escapeHtml(state.form.destinationMarket || "未设置市场")}</p>
        </div>
        <div class="quote-sheet-badge">${escapeHtml(state.quoteCode)}</div>
      </div>
      <div class="quote-sheet-grid">
        <article>
          <strong>客户信息</strong>
          <p>客户：${escapeHtml(state.form.customerName || "未填写")}</p>
          <p>项目：${escapeHtml(state.form.projectName || "未填写")}</p>
          <p>联系人：${escapeHtml(state.form.contactPhone || "未填写")}</p>
          <p>客户来源：${escapeHtml(state.form.customerSource || "未填写")}</p>
        </article>
        <article>
          <strong>产品规格</strong>
          ${specRows.slice(0, 4).map(([label, value]) => `<p>${escapeHtml(label)}：${escapeHtml(value)}</p>`).join("")}
        </article>
        <article>
          <strong>报价摘要</strong>
          <p>数量：${escapeHtml(String(state.form.orderQuantity || 0))} 件</p>
          <p>单价：${escapeHtml(formatUsd(totals.usdSellingPerUnit))}</p>
          <p>总额：${escapeHtml(formatUsd(totals.usdSellingTotal))}</p>
          <p>有效期：${escapeHtml(String(state.form.validityDays || 15))} 天</p>
        </article>
      </div>
      <div class="quote-sheet-summary">
        <div><span>第一层 制造成本</span><strong>${escapeHtml(formatRmb(totals.manufacturingCostPerUnit))}</strong></div>
        <div><span>第二层 出厂完全成本</span><strong>${escapeHtml(formatRmb(totals.factoryCompleteCostPerUnit))}</strong></div>
        <div><span>第三层 经营口径成本</span><strong>${escapeHtml(formatRmb(totals.operatingCostPerUnit))}</strong></div>
        <div><span>报价条款</span><strong>${escapeHtml(`${totals.tradeTermCode} / ${totals.tradeTermLabel}`)}</strong></div>
        <div><span>报价基准成本</span><strong>${escapeHtml(formatRmb(totals.totalRmbPerUnit))}</strong></div>
        <div><span>目标净毛利</span><strong>${escapeHtml(`${formatNumber(totals.netMarginRate, 2)}%`)}</strong></div>
        <div><span>单件美金报价</span><strong>${escapeHtml(formatUsd(totals.usdSellingPerUnit))}</strong></div>
      </div>
      <div class="quote-sheet-footer">
        <p>认证要求：${escapeHtml(state.form.certificationRequirement || "无")}</p>
        <p>备注：${escapeHtml(state.form.customerRemark || "无")}</p>
      </div>
    </div>
  `;
}

function renderSummary(options = {}) {
  const { skipRapidConfigPanel = false } = options;
  const totals = getSummaryValues();
  refs.quoteCodeBadge.textContent = state.quoteCode;
  refs.summaryCardLabel1.textContent = "材料配件包装";
  refs.summaryCardLabel2.textContent = "直接人工";
  refs.summaryCardLabel3.textContent = "制造费用";
  refs.summaryCardLabel4.textContent = "订单附加";
  refs.summaryCardLabel5.textContent = "经营费用";
  refs.ceramicTotalCard.textContent = formatRmb(totals.materialsPackagingPerUnit);
  refs.accessoriesTotalCard.textContent = formatRmb(totals.directLaborPerUnit);
  refs.packageTotalCard.textContent = formatRmb(totals.manufacturingOverheadPerUnit);
  refs.otherCostCard.textContent = formatRmb(totals.orderSurchargePerUnit);
  refs.operatingTotalCard.textContent = formatRmb(totals.operatingExpensePerUnit);
  refs.rmbTotalCard.textContent = formatRmb(totals.totalRmbPerUnit);
  refs.usdSellingCard.textContent = formatUsd(totals.usdSellingPerUnit);
  renderBomOverview();
  renderQuickMetrics(totals);
  renderModeStrategy(totals);
  renderRapidDecision(totals);
  renderFullGovernance(totals);
  if (!skipRapidConfigPanel) {
    renderRapidConfigPanel();
  }
  renderTierQuotes(totals);
  renderSupplierBenchmark();
  renderPriceLibraryEditor();
  renderFactoryCenter();
  renderQuotePreview(totals);

  const specSummary = [
    state.form.flushingType || "未设置",
    state.form.trapType || "未设置",
    state.form.roughIn || "未设置",
    state.form.flushVolume || "未设置"
  ].join(" / ");
  const marketSummary = [
    state.form.destinationMarket || "未设置市场",
    state.form.packageGrade || "未设置包装",
    state.form.certificationRequirement || "无额外认证"
  ].join(" ｜ ");

  const sections = [
    {
      key: "summary-cost-buckets",
      title: "一、五栏成本底盘",
      desc: "所有产品先按这五栏看，避免人工、制造费用和订单附加混在一起。",
      summaryPerUnit: formatRmb(totals.manufacturingCostPerUnit),
      summaryTotal: formatRmb(totals.manufacturingCostPerUnit * totals.orderQuantity),
      rows: [
        { label: "材料配件包装", desc: "泥料、釉料、配件、外箱和内包统一归这一栏", perUnit: formatRmb(totals.materialsPackagingPerUnit), total: formatRmb(totals.materialsPackagingPerUnit * totals.orderQuantity) },
        { label: "直接人工", desc: "成型、施釉、修补质检等直接发生在产品上的人工", perUnit: formatRmb(totals.directLaborPerUnit), total: formatRmb(totals.directLaborPerUnit * totals.orderQuantity) },
        { label: "制造费用", desc: "能耗、损耗、模具、认证和车间管理公摊", perUnit: formatRmb(totals.manufacturingOverheadPerUnit), total: formatRmb(totals.manufacturingOverheadPerUnit * totals.orderQuantity) },
        { label: "订单附加", desc: "只对当前订单发生的小单、测试、试产和改版成本", perUnit: formatRmb(totals.orderSurchargePerUnit), total: formatRmb(totals.orderSurchargeTotal) },
        { label: "经营费用", desc: `出厂完全成本 × ${formatNumber(totals.operatingExpenseRate, 2)}%`, perUnit: formatRmb(totals.operatingExpensePerUnit), total: formatRmb(totals.operatingExpenseTotal) }
      ]
    },
    {
      key: "summary-three-layers",
      title: "二、三层算法",
      desc: "先算制造成本，再加订单附加，最后乘经营费用率，形成老板看的底价。",
      summaryPerUnit: formatRmb(totals.operatingCostPerUnit),
      summaryTotal: formatRmb(totals.operatingCostTotal),
      rows: [
        { label: "第一层 制造成本", desc: "材料配件包装 + 直接人工 + 制造费用", perUnit: formatRmb(totals.manufacturingCostPerUnit), total: formatRmb(totals.manufacturingCostPerUnit * totals.orderQuantity) },
        { label: "第二层 出厂完全成本", desc: "制造成本 + 订单附加", perUnit: formatRmb(totals.factoryCompleteCostPerUnit), total: formatRmb(totals.factoryCompleteCostTotal) },
        { label: "第三层 经营口径成本", desc: "出厂完全成本 + 经营费用", perUnit: formatRmb(totals.operatingCostPerUnit), total: formatRmb(totals.operatingCostTotal) }
      ]
    },
    {
      key: "summary-logistics",
      title: "三、报价条款与物流",
      desc: "三层算法先形成工厂口径底价，对外报价时再按条款叠加物流。",
      summaryPerUnit: formatRmb(totals.totalRmbPerUnit),
      summaryTotal: formatRmb(totals.totalRmbTotal),
      rows: [
        { label: "工厂到港运费", desc: "拖车、内陆运输等出运前费用", perUnit: formatRmb(totals.inlandFreightPerUnit), total: formatRmb(totals.inlandFreightTotal) },
        { label: "报关单证", desc: "报关、单证、文件处理等", perUnit: formatRmb(totals.customsFeePerUnit), total: formatRmb(totals.customsFeeTotal) },
        { label: "港杂装卸", desc: "港口操作、码头杂费等", perUnit: formatRmb(totals.portChargesPerUnit), total: formatRmb(totals.portChargesTotal) },
        { label: "验货检测", desc: "出货前验货、抽检或第三方检测", perUnit: formatRmb(totals.inspectionFeePerUnit), total: formatRmb(totals.inspectionFeeTotal) },
        { label: "海运费", desc: "海运主运费，CFR / CIF / DDP 才会计入报价", perUnit: formatRmb(totals.oceanFreightPerUnit), total: formatRmb(totals.oceanFreightTotal) },
        { label: "保险费", desc: "运输保险，CIF / DDP 才会计入报价", perUnit: formatRmb(totals.insuranceFeePerUnit), total: formatRmb(totals.insuranceFeeTotal) },
        { label: "目的港 / 派送", desc: "目的港处理或末端派送，DDP 才会计入报价", perUnit: formatRmb(totals.destinationDeliveryPerUnit), total: formatRmb(totals.destinationDeliveryTotal) },
        { label: "报价口径物流", desc: `${totals.tradeTermCode} 条款已计入部分，未计入部分为 ${formatRmb(totals.excludedChargesPerUnit)} / 件`, perUnit: formatRmb(totals.quotedLogisticsPerUnit), total: formatRmb(totals.quotedLogisticsTotal) },
        { label: "报价基准成本", desc: "经营口径成本 + 当前条款物流", perUnit: formatRmb(totals.totalRmbPerUnit), total: formatRmb(totals.totalRmbTotal) }
      ]
    },
    {
      key: "summary-profit",
      title: "四、利润与风险",
      desc: "按目标毛利反推外销价，佣金、售后和汇率风险按销售额比例预留。",
      summaryPerUnit: formatRmb(totals.profitPerUnit),
      summaryTotal: formatRmb(totals.profitTotal),
      rows: [
        { label: "内部成本基数", desc: "用于分配目标净毛利的内部加价参考基数", perUnit: formatRmb(totals.internalBasePerUnit), total: formatRmb(totals.internalBasePerUnit * totals.orderQuantity) },
        { label: "外购成本基数", desc: "用于分配目标净毛利的外购加价参考基数", perUnit: formatRmb(totals.externalBasePerUnit), total: formatRmb(totals.externalBasePerUnit * totals.orderQuantity) },
        { label: "目标净毛利", desc: `反推目标 ${formatNumber(totals.targetGrossMarginRate, 2)}%，当前净毛利 ${formatNumber(totals.netMarginRate, 2)}%`, perUnit: formatRmb(totals.netProfitPoolPerUnit), total: formatRmb(totals.netProfitPoolTotal) },
        { label: "内部利润分配", desc: `按内部加价参考 ${formatNumber(totals.internalProfitRate, 2)}% 分配目标利润`, perUnit: formatRmb(totals.internalProfitPerUnit), total: formatRmb(totals.internalProfitPerUnit * totals.orderQuantity) },
        { label: "外购利润分配", desc: `按外购加价参考 ${formatNumber(totals.externalProfitRate, 2)}% 分配目标利润`, perUnit: formatRmb(totals.externalProfitPerUnit), total: formatRmb(totals.externalProfitPerUnit * totals.orderQuantity) },
        { label: "业务佣金预留", desc: `销售额 × ${formatNumber(totals.commissionRate, 2)}%`, perUnit: formatRmb(totals.commissionPerUnit), total: formatRmb(totals.commissionPerUnit * totals.orderQuantity) },
        { label: "售后风险预留", desc: `销售额 × ${formatNumber(totals.afterSalesRate, 2)}%`, perUnit: formatRmb(totals.afterSalesPerUnit), total: formatRmb(totals.afterSalesPerUnit * totals.orderQuantity) },
        { label: "汇率风险预留", desc: `销售额 × ${formatNumber(totals.fxSafetyRate, 2)}%`, perUnit: formatRmb(totals.fxSafetyPerUnit), total: formatRmb(totals.fxSafetyPerUnit * totals.orderQuantity) },
        { label: "利润及预留合计", desc: "目标净毛利 + 佣金 + 售后 + 汇率风险", perUnit: formatRmb(totals.profitPerUnit), total: formatRmb(totals.profitTotal) }
      ]
    },
    {
      key: "summary-final-quote",
      title: "五、最终报价",
      desc: "按目标毛利、销售额预留和报价汇率反推最终外销报价。",
      summaryPerUnit: formatUsd(totals.usdSellingPerUnit),
      summaryTotal: formatUsd(totals.usdSellingTotal),
      rows: [
        { label: "报价基准成本", desc: "经营口径成本 + 当前条款物流", perUnit: formatRmb(totals.totalRmbPerUnit), total: formatRmb(totals.totalRmbTotal) },
        { label: "Exchange rate 汇率", desc: "美元报价换算参数", perUnit: formatNumber(totals.exchangeRate, 4), total: formatNumber(totals.exchangeRate, 4) },
        { label: "USD 美金成本", desc: "报价基准成本 / 汇率", perUnit: formatUsd(totals.usdCostPerUnit), total: formatUsd(totals.usdCostTotal) },
        { label: "报价反推分母", desc: `1 - 目标毛利 ${formatNumber(totals.targetGrossMarginRate, 2)}% - 销售额预留 ${formatNumber(totals.salesDeductionRate, 2)}%`, perUnit: formatNumber(totals.priceDenominator, 4), total: formatNumber(totals.priceDenominator, 4) },
        { label: "USD 美金销售价", desc: "USD成本 / 报价反推分母", perUnit: formatUsd(totals.usdSellingPerUnit), total: formatUsd(totals.usdSellingTotal) }
      ]
    },
    {
      key: "summary-delivery-check",
      title: "六、包装与交付复核",
      desc: "最后复核包装尺寸、毛重、装柜与适用规格，避免报价能做但出货难落地。",
      summaryPerUnit: `${formatNumber(totals.grossWeight, 2)} KG / 箱`,
      summaryTotal: totals.estimatedLoadQty ? `${totals.estimatedLoadQty} 件 / 柜` : "待测算",
      rows: [
        { label: "智能包装测算", desc: getPackingLayoutNote(totals), perUnit: `${formatNumber(totals.packageLength, 0)} × ${formatNumber(totals.packageWidth, 0)} × ${formatNumber(totals.packageHeight, 0)} mm`, total: `纸箱面积 ${formatNumber(totals.cartonArea, 3)} ㎡；包装增重 ${formatNumber(totals.totalPackagingWeight || 0, 2)} KG` },
        { label: "装柜测算", desc: `按 ${state.form.loadingMode || "当前装柜方式"} 估算，系统同时考虑体积与载重上限`, perUnit: `${formatNumber(totals.cbmPerUnit, 4)} CBM / ${formatNumber(totals.grossWeight, 2)} KG / 箱`, total: totals.estimatedLoadQty ? `约 ${totals.estimatedLoadQty} 件 / 柜（${totals.estimatedCartonsPerContainer || 0} 箱；体积 ${totals.estimatedLoadQtyByVolume || 0} / 载重 ${totals.estimatedLoadQtyByWeight || 0} 件）` : "请录入产品尺寸" },
        { label: "规格摘要", desc: "用于复核报价适用范围", perUnit: specSummary, total: marketSummary }
      ]
    }
  ];

  refs.resultTableBody.innerHTML = sections.map((section) => `
      ${(() => {
        const isCollapsed = state.collapsedCategories[section.key] !== false;
        return `
      <tr class="result-section-row">
        <td colspan="3">
          <div class="result-section-head" data-summary-section="${escapeHtml(section.key)}" role="button" tabindex="0" aria-expanded="${isCollapsed ? "false" : "true"}">
            <div>
              <div class="result-section-title">${escapeHtml(section.title)}</div>
              <div class="result-section-desc">${escapeHtml(section.desc)}</div>
            </div>
            <div class="result-section-summary">
              <span>单件 / 参数</span>
              <strong>${escapeHtml(section.summaryPerUnit)}</strong>
              <span>订单总计 / 结果</span>
              <strong>${escapeHtml(section.summaryTotal)}</strong>
              <span class="result-section-toggle">${isCollapsed ? "▼ 展开明细" : "▲ 收起明细"}</span>
            </div>
          </div>
        </td>
      </tr>
      ${isCollapsed ? "" : section.rows.map((row) => `
        <tr>
          <td>
            <div class="result-label">${escapeHtml(row.label)}</div>
            <div class="result-sub">${escapeHtml(row.desc)}</div>
          </td>
          <td>${escapeHtml(row.perUnit)}</td>
          <td>${escapeHtml(row.total)}</td>
        </tr>
      `).join("")}
    `;
      })()}
    `).join("");
}

function renderQuickMetrics(totals) {
  if (!refs.quickMetricsGrid) {
    return;
  }

  const cards = [
    {
      label: "第一层 制造成本",
      value: formatRmb(totals.manufacturingCostPerUnit),
      noteLines: ["材料配件包装 + 直接人工 + 制造费用"]
    },
    {
      label: "第三层 经营口径成本",
      value: formatRmb(totals.operatingCostPerUnit),
      noteLines: [
        `订单附加 ${formatRmb(totals.orderSurchargePerUnit)} / 件`,
        `经营费用 ${formatRmb(totals.operatingExpensePerUnit)} / 件`
      ]
    },
    {
      label: "外箱尺寸",
      value: totals.packageLength && totals.packageWidth && totals.packageHeight
        ? `${formatNumber(totals.packageLength, 0)} × ${formatNumber(totals.packageWidth, 0)} × ${formatNumber(totals.packageHeight, 0)} mm`
        : "-",
      noteLines: getPackingLayoutNoteLines(totals)
    },
    {
      label: "单箱毛重",
      value: totals.grossWeight ? `${formatNumber(totals.grossWeight, 2)} KG` : "-",
      noteLines: getGrossWeightNoteLines(totals)
    },
    {
      label: "单箱体积",
      value: totals.cbmPerUnit ? `${formatNumber(totals.cbmPerUnit, 4)} CBM` : "-",
      noteLines: ["用于装柜和物流均摊"]
    },
    {
      label: "纸箱面积",
      value: totals.cartonArea ? `${formatNumber(totals.cartonArea, 3)} ㎡` : "-",
      noteLines: ["用于推导内包和外箱成本"]
    },
    {
      label: "预计装柜量",
      value: totals.estimatedLoadQty ? `${totals.estimatedLoadQty} 件 / 柜` : "-",
      noteLines: totals.estimatedLoadQty
        ? [
          `约 ${totals.estimatedCartonsPerContainer || 0} 箱 / 柜`,
          `体积上限 ${totals.estimatedLoadQtyByVolume || 0} 件 / 载重上限 ${totals.estimatedLoadQtyByWeight || 0} 件`
        ]
        : ["需先录入尺寸和净重"]
    },
    {
      label: "单柜货值",
      value: totals.estimatedLoadQty ? formatUsd(totals.usdSellingPerUnit * totals.estimatedLoadQty) : "-",
      noteLines: totals.estimatedLoadQty
        ? [`${formatUsd(totals.usdSellingPerUnit)} × ${totals.estimatedLoadQty} 件`]
        : ["按当前美元销售价估算"]
    }
  ];

  const visibleCards = isRapidMode()
    ? cards.filter((card) => ["第一层 制造成本", "第三层 经营口径成本", "外箱尺寸", "单箱毛重", "预计装柜量", "单柜货值"].includes(card.label))
    : cards;

  refs.quickMetricsGrid.innerHTML = visibleCards.map((card) => `
    <article class="quick-metric-card">
      <span class="quick-metric-label">${escapeHtml(card.label)}</span>
      <strong class="quick-metric-value">${escapeHtml(card.value)}</strong>
      <div class="quick-metric-note">${(card.noteLines || []).map((line) => `<span class="quick-metric-note-line">${escapeHtml(line)}</span>`).join("")}</div>
    </article>
  `).join("");
}

function syncFormState() {
  const customerSourceInput = document.getElementById("customerSource");
  const customSourceValue = String(customerSourceInput?.value || "").trim();
  const selectedSource = refs.customerSourceSelect?.value || "老客户";
  const formData = new FormData(refs.customerForm);
  state.form = {
    ...state.form,
    ...Object.fromEntries(formData.entries())
  };
  if (refs.customerSourceSelect) {
    state.form.customerSourceMode = selectedSource === "other" ? "other" : "preset";
    state.form.customerSource = selectedSource === "other" ? customSourceValue : selectedSource;
  }
  normalizeTemplateSelection(state.form);
  if (isRapidMode()) {
    state.form.loadingMode = getLoadingModeByShippingScenario(state.form.shippingScenario);
  }
}

function setQuoteMode(mode) {
  state.form.quoteMode = mode === "full" ? "full" : "rapid";
  if (state.form.quoteMode === "rapid") {
    state.form.quoteStage = "estimate";
    state.form.pricingBasis = "experience";
    state.form.calcMode = "unit";
    refs.calcMode.value = "unit";
  } else {
    state.form.quoteStage = "formal";
    state.form.pricingBasis = "full-cost";
  }
  applyQuoteModeUi();
  renderBomTable();
  renderSummary();
  persistDraft();
}

function syncSummaryState() {
  state.summary.internalProfitRate = Math.max(Number(refs.internalProfitRateInput.value) || 0, 0);
  state.summary.externalProfitRate = Math.max(Number(refs.externalProfitRateInput.value) || 0, 0);
  state.summary.commissionRate = Math.max(Number(refs.commissionRateInput.value) || 0, 0);
  state.summary.afterSalesRate = Math.max(Number(refs.afterSalesRateInput.value) || 0, 0);
  state.summary.fxSafetyRate = Math.max(Number(refs.fxSafetyRateInput.value) || 0, 0);
  state.summary.smallOrderSurcharge = Math.max(Number(refs.smallOrderSurchargeInput.value) || 0, 0);
  state.summary.specialPackageSurcharge = Math.max(Number(refs.specialPackageSurchargeInput.value) || 0, 0);
  state.summary.specialTestingSurcharge = Math.max(Number(refs.specialTestingSurchargeInput.value) || 0, 0);
  state.summary.trialProductionSurcharge = Math.max(Number(refs.trialProductionSurchargeInput.value) || 0, 0);
  state.summary.specialLabelSurcharge = Math.max(Number(refs.specialLabelSurchargeInput.value) || 0, 0);
  state.summary.operatingExpenseRate = Math.max(Number(refs.operatingExpenseRateInput.value) || 0, 0);
  state.summary.exchangeRate = Math.max(Number(refs.exchangeRateInput.value) || 0, 0);
  state.form.targetGrossMarginRate = Math.max(Number(refs.targetGrossMarginRateInput.value) || 0, 0);
  state.form.floorGrossMarginRate = Math.max(Number(refs.floorGrossMarginRateInput.value) || 0, 0);
  state.form.specialApprovalReason = refs.specialApprovalReasonInput.value.trim();
}

function persistDraft() {
  syncFormState();
  syncSummaryState();
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function loadDraft() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    resetRapidQuoteConfigState();
    fillFormFromState();
    return;
  }

  try {
    const saved = JSON.parse(raw);
    if (saved.version !== "bom-v7") {
      fillFormFromState();
      return;
    }
    state.quoteCode = saved.quoteCode || state.quoteCode;
    state.form = {
      ...createDefaultForm(),
      ...(saved.form || {})
    };
    normalizeTemplateSelection(state.form);
    state.form = upgradeLegacyTwoPieceDefaults(state.form);
    state.rows = Array.isArray(saved.rows) && saved.rows.length ? saved.rows : createRowsFromTemplate(state.form.templateSelect);
    state.budgetRows = Array.isArray(saved.budgetRows) && saved.budgetRows.length ? saved.budgetRows : createBudgetRowsFromTemplate(state.form.templateSelect, state.form.productionQuantity);
    state.summary = {
      ...state.summary,
      ...(saved.summary || {})
    };
    state.rapidQuoteConfig = mergeDeepPriceLibrary(JSON.parse(JSON.stringify(RAPID_QUOTE_CONFIG)), saved.rapidQuoteConfig || {});
    state.priceLibrary = mergeDeepPriceLibrary(createDefaultPriceLibrary(), saved.priceLibrary || {});
    state.collapsedCategories = saved.collapsedCategories || {};
    reconcileLegacySeatCoverTemplate();
  } catch (error) {
    state.form = createDefaultForm();
    state.rows = createRowsFromTemplate(state.form.templateSelect);
    state.budgetRows = createBudgetRowsFromTemplate(state.form.templateSelect, state.form.productionQuantity);
    resetRapidQuoteConfigState();
    state.priceLibrary = createDefaultPriceLibrary();
    state.collapsedCategories = {};
  }

  reconcileModeRows();
  applySupplierPricing();
  syncBudgetRowsFromUnitRows();
  fillFormFromState();
}

function loadTemplate(templateId) {
  const template = getTemplateById(templateId);
  state.form = {
    ...state.form,
    templateSelect: template.id,
    productName: template.productName,
    modelCode: template.modelCode,
    orderQuantity: template.orderQuantity,
    productionQuantity: template.orderQuantity,
    destinationMarket: template.formDefaults.destinationMarket,
    flushingType: template.formDefaults.flushingType,
    trapType: template.formDefaults.trapType,
    roughIn: template.formDefaults.roughIn,
    flushVolume: template.formDefaults.flushVolume,
    productLength: template.formDefaults.productLength,
    productWidth: template.formDefaults.productWidth,
    productHeight: template.formDefaults.productHeight,
    productNetWeight: template.formDefaults.productNetWeight,
    unitsPerCarton: getTemplateDefaultUnitsPerCarton(template),
    glazeLevel: template.formDefaults.glazeLevel,
    includeSeatCover: inferIncludeSeatCoverValue(template.formDefaults),
    seatCoverGrade: template.formDefaults.seatCoverGrade,
    seatCoverModel: "",
    seatCoverLength: "",
    seatCoverWidth: "",
    seatCoverHeight: "",
    seatCoverNetWeight: "",
    seatCoverHinge: getSeatCoverHingeDefaultByGrade(template.formDefaults.seatCoverGrade),
    seatCoverRemark: "",
    basinInstallation: template.formDefaults.basinInstallation || "",
    faucetHole: template.formDefaults.faucetHole || "",
    overflowHole: template.formDefaults.overflowHole || "",
    drainKitIncluded: template.formDefaults.drainKitIncluded || "",
    packageGrade: template.formDefaults.packageGrade,
    loadingMode: template.formDefaults.loadingMode,
    packageLength: 0,
    packageWidth: 0,
    packageHeight: 0,
    cartonArea: 0,
    cbmPerUnit: 0,
    grossWeight: 0,
    certificationRequirement: template.formDefaults.certificationRequirement
  };
  normalizeSeatCoverState(state.form);
  state.rows = createRowsFromTemplate(template.id);
  state.budgetRows = createBudgetRowsFromTemplate(template.id, template.orderQuantity);
  applySmartDefaults();
  applySupplierPricing();
  syncBudgetRowsFromUnitRows();
  fillFormFromState();
  renderBomTable();
  renderSummary();
  persistDraft();
}

function reconcileLegacySeatCoverTemplate() {
  if (state.form.templateSelect !== "seat-cover") {
    normalizeTemplateSelection(state.form);
    return;
  }
  const fallbackTemplate = getTemplateById("two-piece");
  state.form = {
    ...state.form,
    templateSelect: fallbackTemplate.id,
    productName: fallbackTemplate.productName,
    modelCode: fallbackTemplate.modelCode,
    orderQuantity: state.form.orderQuantity || fallbackTemplate.orderQuantity,
    productionQuantity: state.form.productionQuantity || fallbackTemplate.orderQuantity,
    destinationMarket: state.form.destinationMarket || fallbackTemplate.formDefaults.destinationMarket,
    flushingType: fallbackTemplate.formDefaults.flushingType,
    trapType: fallbackTemplate.formDefaults.trapType,
    roughIn: fallbackTemplate.formDefaults.roughIn,
    flushVolume: fallbackTemplate.formDefaults.flushVolume,
    productLength: fallbackTemplate.formDefaults.productLength,
    productWidth: fallbackTemplate.formDefaults.productWidth,
    productHeight: fallbackTemplate.formDefaults.productHeight,
    productNetWeight: fallbackTemplate.formDefaults.productNetWeight,
    unitsPerCarton: getTemplateDefaultUnitsPerCarton(fallbackTemplate),
    glazeLevel: fallbackTemplate.formDefaults.glazeLevel,
    includeSeatCover: "yes",
    seatCoverGrade: "UF 缓降",
    seatCoverModel: "",
    seatCoverLength: "",
    seatCoverWidth: "",
    seatCoverHeight: "",
    seatCoverNetWeight: "",
    seatCoverHinge: getSeatCoverHingeDefaultByGrade("UF 缓降"),
    seatCoverRemark: "",
    basinInstallation: fallbackTemplate.formDefaults.basinInstallation || "",
    faucetHole: fallbackTemplate.formDefaults.faucetHole || "",
    overflowHole: fallbackTemplate.formDefaults.overflowHole || "",
    drainKitIncluded: fallbackTemplate.formDefaults.drainKitIncluded || "",
    packageGrade: fallbackTemplate.formDefaults.packageGrade,
    loadingMode: fallbackTemplate.formDefaults.loadingMode,
    certificationRequirement: fallbackTemplate.formDefaults.certificationRequirement
  };
  normalizeSeatCoverState(state.form);
  state.rows = createRowsFromTemplate(fallbackTemplate.id);
  state.budgetRows = createBudgetRowsFromTemplate(fallbackTemplate.id, state.form.productionQuantity);
}

function addCustomRow() {
  const activeCatalog = getActiveCatalog();
  const category = activeCatalog.find((item) => item.key === refs.customCategorySelect.value) || activeCatalog[0];
  const inputName = refs.customItemNameInput.value.trim();
  const presetName = refs.presetItemSelect.value.trim();
  const name = inputName || presetName;
  if (!name) {
    showToast("请输入明细项名称或选择常用预设项");
    refs.customItemNameInput.focus();
    return;
  }

  const presetMeta = getPresetItemsByCategory(category.key).find((item) => item.name === presetName);

  const sharedItemId = `custom-${Date.now()}`;
  const activeRow = {
    rowId: uid(),
    itemId: sharedItemId,
    categoryKey: category.key,
    categoryLabel: category.label,
    name,
    unit: presetMeta?.unit || category.items[0]?.unit || (getCalcMode() === "budget" ? "batch" : "set"),
    ...(getCalcMode() === "budget" ? { totalAmount: 0 } : { qty: 1, unitPrice: 0 }),
    isExternal: isExternalEligibleCategory(category.key),
    note: presetMeta ? "来自常用预设项" : "",
    custom: true
  };

  const targetRows = getActiveRows();
  targetRows.push(activeRow);
  if (getCalcMode() === "budget") {
    state.rows.push(createCounterpartRow(activeRow, "unit"));
  } else {
    state.budgetRows.push(createCounterpartRow(activeRow, "budget"));
  }

  refs.customItemNameInput.value = "";
  refs.presetItemSelect.value = "";
  renderBomTable();
  renderSummary();
  persistDraft();
}

function updateRow(rowId, field, value) {
  const row = getActiveRows().find((item) => item.rowId === rowId);
  if (!row) {
    return;
  }

  if (field === "qty" || field === "unitPrice" || field === "totalAmount") {
    row[field] = Math.max(Number(value) || 0, 0);
    if (field !== "qty") {
      row.autoPriced = false;
    }
  } else if (field === "isExternal") {
    row.isExternal = value === "true";
  } else {
    row[field] = value;
  }
}

function removeRow(rowId) {
  const activeRow = getActiveRows().find((row) => row.rowId === rowId);
  if (!activeRow) {
    return;
  }
  state.rows = state.rows.filter((row) => row.itemId !== activeRow.itemId);
  state.budgetRows = state.budgetRows.filter((row) => row.itemId !== activeRow.itemId);
  renderBomTable();
  renderSummary();
  persistDraft();
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function saveCurrentQuote() {
  if (window.offlineQuoteStore?.saveCurrentQuoteOffline) {
    window.offlineQuoteStore.saveCurrentQuoteOffline();
    persistDraft();
    return;
  }
  syncFormState();
  syncSummaryState();
  persistDraft();
  showToast("当前报价草稿已保存");
}

function downloadBlob(fileName, blob) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}

function formatPercent(value) {
  return `${formatNumber(value, 2)}%`;
}

function formatDateText(dateText) {
  const value = String(dateText || "").trim();
  if (!value) {
    return "-";
  }
  return value.replaceAll("-", "/");
}

function buildExportWorkbookHtml(totals) {
  const isBudgetMode = getCalcMode() === "budget";
  const activeCatalog = getActiveCatalog();
  const activeRows = getActiveRows();
  const primaryHeader = isBudgetMode ? "预算总额" : "单件用量";
  const secondaryHeader = isBudgetMode ? "均摊到单台" : "RMB 单价";
  const amountHeader = isBudgetMode ? "订单金额" : "单件金额";
  const templateLabel = getProductTemplateLabel();
  const benchmarkRows = getSupplierBenchmarkRows();
  const tierRows = getTierQuoteRows(totals);
  const exportedAt = formatDateText(new Date().toISOString().slice(0, 10));
  const summaryCards = [
    { label: "材料配件包装", value: formatRmb(totals.materialsPackagingPerUnit) },
    { label: "直接人工", value: formatRmb(totals.directLaborPerUnit) },
    { label: "制造费用", value: formatRmb(totals.manufacturingOverheadPerUnit) },
    { label: "订单附加", value: formatRmb(totals.orderSurchargePerUnit) },
    { label: "经营费用", value: formatRmb(totals.operatingExpensePerUnit) },
    { label: "条款物流", value: formatRmb(totals.quotedLogisticsPerUnit) },
    { label: "报价基准成本", value: formatRmb(totals.totalRmbPerUnit) },
    { label: "USD 销售价", value: formatUsd(totals.usdSellingPerUnit), highlight: true }
  ];
  const basicInfoRows = [
    ["报价单号", state.quoteCode, "报价日期", formatDateText(state.form.quoteDate), "导出日期", exportedAt],
    ["客户名称", state.form.customerName || "-", "项目名称", state.form.projectName || "-", "销售顾问", state.form.salesName || "-"],
    ["联系人/电话", state.form.contactPhone || "-", "客户来源", state.form.customerSource || "-", "报价有效期", `${state.form.validityDays || 15} 天`],
    ["产品模板", templateLabel, "产品名称", state.form.productName || "-", "型号编号", state.form.modelCode || "-"],
    ["订单数量", `${totals.orderQuantity} 件`, "产量/分摊数量", `${getProductionQuantity()} 件`, "计价方式", isBudgetMode ? "总预算均摊" : "BOM 单件成本"],
    ["贸易条款", state.form.tradeTerm || "-", "Incoterms", state.form.incotermsVersion || "Incoterms 2020", "装柜方式", state.form.loadingMode || "-"],
    ["装运港", state.form.shippingPort || "-", "目的港", state.form.destinationPort || "-", "目标市场", state.form.destinationMarket || "-"],
    ["MOQ", totals.moq ? `${totals.moq} 件` : "-", "交期", totals.leadTimeDays ? `${totals.leadTimeDays} 天` : "-", "报价币种", totals.quoteCurrency || "USD"]
  ];
  const productSpecRows = isBasinTemplate(state.form.templateSelect)
    ? [
      ["安装方式", state.form.basinInstallation || "-", "龙头孔", state.form.faucetHole || "-", "溢水孔", state.form.overflowHole || "-"],
      ["下水/安装件", state.form.drainKitIncluded || "-", "釉面等级", state.form.glazeLevel || "-", "包装等级", state.form.packageGrade || "-"],
      ["产品尺寸", `${state.form.productLength || "-"} x ${state.form.productWidth || "-"} x ${state.form.productHeight || "-"} mm`, "净重", `${state.form.productNetWeight || "-"} KG`, "每箱数量", `${state.form.unitsPerCarton || 1} 件`],
      ["单件体积", `${formatNumber(state.form.cbmPerUnit, 4)} CBM`, "单件毛重", `${formatNumber(state.form.grossWeight, 2)} KG`, "估算装柜量", totals.estimatedLoadQty ? `${totals.estimatedLoadQty} 件/柜` : "-"],
      ["认证要求", state.form.certificationRequirement || "-", "备注说明", state.form.customerRemark || "-", "报价口径", totals.tradeTermLabel || "-"]
    ]
    : [
      ["冲水方式", state.form.flushingType || "-", "排污方式", state.form.trapType || "-", "坑距/出水口", state.form.roughIn || "-"],
      ["冲水量", state.form.flushVolume || "-", "釉面等级", state.form.glazeLevel || "-", "盖板档次", state.form.seatCoverGrade || "-"],
      ["盖板尺寸", state.form.includeSeatCover === "no" ? "-" : `${state.form.seatCoverLength || "-"} x ${state.form.seatCoverWidth || "-"} x ${state.form.seatCoverHeight || "-"} mm`, "盖板净重", state.form.includeSeatCover === "no" ? "-" : `${state.form.seatCoverNetWeight || "-"} KG`, "铰链要求", state.form.includeSeatCover === "no" ? "-" : (state.form.seatCoverHinge || "-")],
      ["包装等级", state.form.packageGrade || "-", "单件体积", `${formatNumber(state.form.cbmPerUnit, 4)} CBM`, "单件毛重", `${formatNumber(state.form.grossWeight, 2)} KG`],
      ["认证要求", state.form.certificationRequirement || "-", "备注说明", state.form.customerRemark || "-", "估算装柜量", totals.estimatedLoadQty ? `${totals.estimatedLoadQty} 件/柜` : "-"]
    ];
  const costBreakdownRows = [
    ["材料配件包装", formatRmb(totals.materialsPackagingPerUnit), formatRmb(totals.materialsPackagingPerUnit * totals.orderQuantity), "泥料、釉料、配件和包装"],
    ["直接人工", formatRmb(totals.directLaborPerUnit), formatRmb(totals.directLaborPerUnit * totals.orderQuantity), "成型、施釉、修补质检"],
    ["制造费用", formatRmb(totals.manufacturingOverheadPerUnit), formatRmb(totals.manufacturingOverheadPerUnit * totals.orderQuantity), "能耗、损耗、模具、认证和车间分摊"],
    ["订单附加", formatRmb(totals.orderSurchargePerUnit), formatRmb(totals.orderSurchargeTotal), "小单、特殊包装、测试、试产和改版附加"],
    ["经营费用", formatRmb(totals.operatingExpensePerUnit), formatRmb(totals.operatingExpenseTotal), `出厂完全成本 x ${formatPercent(totals.operatingExpenseRate)}`],
    ["第一层 制造成本", formatRmb(totals.manufacturingCostPerUnit), formatRmb(totals.manufacturingCostPerUnit * totals.orderQuantity), "材料配件包装 + 直接人工 + 制造费用"],
    ["第二层 出厂完全成本", formatRmb(totals.factoryCompleteCostPerUnit), formatRmb(totals.factoryCompleteCostTotal), "制造成本 + 订单附加"],
    ["第三层 经营口径成本", formatRmb(totals.operatingCostPerUnit), formatRmb(totals.operatingCostTotal), "出厂完全成本 + 经营费用"],
    ["报价口径物流", formatRmb(totals.quotedLogisticsPerUnit), formatRmb(totals.quotedLogisticsTotal), `${totals.tradeTermCode} / ${totals.tradeTermLabel}`],
    ["报价基准成本", formatRmb(totals.totalRmbPerUnit), formatRmb(totals.totalRmbTotal), "经营口径成本 + 当前条款物流"],
    ["目标净毛利", formatRmb(totals.netProfitPoolPerUnit), formatRmb(totals.netProfitPoolTotal), `目标 ${formatPercent(totals.targetGrossMarginRate)} / 当前 ${formatPercent(totals.netMarginRate)}`],
    ["内部利润分配", formatRmb(totals.internalProfitPerUnit), formatRmb(totals.internalProfitPerUnit * totals.orderQuantity), `内部加价参考 ${formatPercent(totals.internalProfitRate)}`],
    ["外购利润分配", formatRmb(totals.externalProfitPerUnit), formatRmb(totals.externalProfitPerUnit * totals.orderQuantity), `外购加价参考 ${formatPercent(totals.externalProfitRate)}`],
    ["业务佣金预留", formatRmb(totals.commissionPerUnit), formatRmb(totals.commissionPerUnit * totals.orderQuantity), `销售额 x ${formatPercent(totals.commissionRate)}`],
    ["售后风险预留", formatRmb(totals.afterSalesPerUnit), formatRmb(totals.afterSalesPerUnit * totals.orderQuantity), `销售额 x ${formatPercent(totals.afterSalesRate)}`],
    ["汇率风险预留", formatRmb(totals.fxSafetyPerUnit), formatRmb(totals.fxSafetyPerUnit * totals.orderQuantity), `销售额 x ${formatPercent(totals.fxSafetyRate)}`],
    ["利润及预留合计", formatRmb(totals.profitPerUnit), formatRmb(totals.profitTotal), "目标净毛利 + 佣金 + 售后 + 汇率风险"],
    ["USD 成本", formatUsd(totals.usdCostPerUnit), formatUsd(totals.usdCostTotal), `按汇率 ${formatNumber(totals.exchangeRate, 4)} 折算`],
    ["USD 报价", formatUsd(totals.usdSellingPerUnit), formatUsd(totals.usdSellingTotal), `USD成本 / ${formatNumber(totals.priceDenominator, 4)} 反推`]
  ];
  const bomRowsHtml = activeCatalog.map((category) => {
    const categoryRows = activeRows.filter((row) => row.categoryKey === category.key);
    if (!categoryRows.length) {
      return "";
    }
    const subtotalPerUnit = categoryRows.reduce((sum, row) => sum + getRowPerUnitAmount(row), 0);
    const rowHtml = categoryRows.map((row) => {
      const rowPerUnitAmount = getRowPerUnitAmount(row);
      const rowOrderAmount = getRowOrderAmount(row);
      const primaryValue = isBudgetMode ? formatRmb(row.totalAmount) : formatNumber(row.qty, 4);
      const secondaryValue = isBudgetMode ? formatRmb(rowPerUnitAmount) : formatRmb(row.unitPrice);
      const amountValue = isBudgetMode ? formatRmb(rowOrderAmount) : formatRmb(rowPerUnitAmount);
      return `
        <tr>
          <td>${escapeHtml(category.label)}</td>
          <td>${escapeHtml(row.name)}</td>
          <td>${escapeHtml(row.unit || "-")}</td>
          <td>${escapeHtml(primaryValue)}</td>
          <td>${escapeHtml(secondaryValue)}</td>
          <td>${escapeHtml(amountValue)}</td>
          <td>${escapeHtml(formatRmb(rowOrderAmount))}</td>
          <td>${escapeHtml(isRowExternal(row) ? "是" : "否")}</td>
          <td>${escapeHtml(row.note || "-")}</td>
        </tr>
      `;
    }).join("");
    return `
      <tr class="group-row">
        <td colspan="9">${escapeHtml(category.label)} ｜ 小计 ${escapeHtml(formatRmb(subtotalPerUnit))} ｜ 订单总计 ${escapeHtml(formatRmb(subtotalPerUnit * totals.orderQuantity))}</td>
      </tr>
      ${rowHtml}
    `;
  }).join("");

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="UTF-8">
  <meta name="ProgId" content="Excel.Sheet">
  <meta name="Generator" content="Toilet BOM Quote Pro">
  <title>${escapeHtml(state.quoteCode)} 内部核价表</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", Arial, sans-serif; background: #f4f6f8; color: #0f172a; margin: 0; padding: 24px; }
    .sheet { width: 1200px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; }
    .hero { padding: 28px 32px; background: linear-gradient(135deg, #0f172a, #1e293b, #334155); color: #ffffff; }
    .hero-eyebrow { font-size: 12px; letter-spacing: 1.6px; opacity: 0.82; text-transform: uppercase; font-weight: 700; }
    .hero-title { font-size: 28px; font-weight: 800; margin: 8px 0 6px; letter-spacing: 0; }
    .hero-copy { font-size: 13px; line-height: 1.7; opacity: 0.92; }
    .hero-meta { margin-top: 18px; font-size: 12px; opacity: 0.9; }
    .block { padding: 18px 24px 0; }
    .section-title { font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px; }
    .data-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    .data-table th, .data-table td { border: 1px solid #e2e8f0; padding: 10px 12px; font-size: 12px; vertical-align: top; word-break: break-word; }
    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; font-size: 11px; }
    .label-cell { width: 10%; background: #f8fafc; color: #475569; font-weight: 600; }
    .value-cell { width: 23.33%; }
    .cards { width: 100%; border-collapse: separate; border-spacing: 12px; margin: 0 -12px; }
    .cards td { width: 33.33%; padding: 16px 18px; border-radius: 10px; background: #f8fafc; border: 1px solid #e2e8f0; }
    .card-label { font-size: 12px; color: #64748b; margin-bottom: 8px; font-weight: 600; text-transform: uppercase; }
    .card-value { font-size: 26px; font-weight: 800; color: #0f172a; font-family: monospace; }
    .card-highlight { background: #0284c7 !important; border-color: #0284c7 !important; }
    .card-highlight .card-label { color: rgba(255,255,255,0.8); }
    .card-highlight .card-value { color: #ffffff; }
    .group-row td { background: #f1f5f9; color: #0f172a; font-weight: 700; }
    .note-box { margin: 18px 24px 24px; padding: 14px 16px; background: #f8fafc; border: 1px dashed #cbd5e1; font-size: 12px; line-height: 1.8; color: #475569; border-radius: 8px; }
    .spacer { height: 10px; }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="hero">
      <div class="hero-eyebrow">Offline Sanitaryware Quote Pro</div>
      <div class="hero-title">卫浴陶瓷内部核价表</div>
      <div class="hero-copy">该导出表用于内部成本复核，完整覆盖客户信息、产品规格、BOM 成本、贸易条款、利润策略与数量阶梯价格，不建议直接发送客户。</div>
      <div class="hero-meta">Quote No. ${escapeHtml(state.quoteCode)} ｜ Trade Term ${escapeHtml(state.form.tradeTerm || "-")} ｜ Customer ${escapeHtml(state.form.customerName || "未填写")}</div>
    </div>

    <div class="block">
      <div class="section-title">一、基础信息</div>
      <table class="data-table">
        ${basicInfoRows.map((row) => `
          <tr>
            <td class="label-cell">${escapeHtml(row[0])}</td><td class="value-cell">${escapeHtml(row[1])}</td>
            <td class="label-cell">${escapeHtml(row[2])}</td><td class="value-cell">${escapeHtml(row[3])}</td>
            <td class="label-cell">${escapeHtml(row[4])}</td><td class="value-cell">${escapeHtml(row[5])}</td>
          </tr>
        `).join("")}
      </table>
    </div>

    <div class="block">
      <div class="section-title">二、产品规格与交付要求</div>
      <table class="data-table">
        ${productSpecRows.map((row) => `
          <tr>
            <td class="label-cell">${escapeHtml(row[0])}</td><td class="value-cell">${escapeHtml(row[1])}</td>
            <td class="label-cell">${escapeHtml(row[2])}</td><td class="value-cell">${escapeHtml(row[3])}</td>
            <td class="label-cell">${escapeHtml(row[4])}</td><td class="value-cell">${escapeHtml(row[5])}</td>
          </tr>
        `).join("")}
      </table>
    </div>

    <div class="block">
      <div class="section-title">三、核心报价摘要</div>
      <table class="cards">
        <tr>
          ${summaryCards.map((item) => `
            <td class="${item.highlight ? "card-highlight" : ""}">
              <div class="card-label">${escapeHtml(item.label)}</div>
              <div class="card-value">${escapeHtml(item.value)}</div>
            </td>
          `).join("")}
        </tr>
      </table>
    </div>

    <div class="block">
      <div class="section-title">四、成本与利润分解</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 22%;">项目</th>
            <th style="width: 18%;">单件</th>
            <th style="width: 18%;">订单总计</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          ${costBreakdownRows.map((row) => `
            <tr>
              <td>${escapeHtml(row[0])}</td>
              <td>${escapeHtml(row[1])}</td>
              <td>${escapeHtml(row[2])}</td>
              <td>${escapeHtml(row[3])}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="block">
      <div class="section-title">五、BOM 成本明细</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 16%;">类别</th>
            <th style="width: 18%;">BOM 项目</th>
            <th style="width: 8%;">单位</th>
            <th style="width: 10%;">${primaryHeader}</th>
            <th style="width: 10%;">${secondaryHeader}</th>
            <th style="width: 10%;">${amountHeader}</th>
            <th style="width: 10%;">订单总计</th>
            <th style="width: 8%;">外购</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>${bomRowsHtml}</tbody>
      </table>
    </div>

    <div class="block">
      <div class="section-title">六、数量阶梯报价</div>
      <table class="data-table">
        <thead>
          <tr>
            <th>数量档</th>
            <th>单件人民币成本</th>
            <th>条款物流/柜数</th>
            <th>单件美金报价</th>
            <th>订单总额</th>
          </tr>
        </thead>
        <tbody>
          ${tierRows.map((row) => `
            <tr>
              <td>${row.quantity} 件</td>
              <td>${escapeHtml(formatRmb(row.tierProductCostPerUnit))}</td>
              <td>${escapeHtml(`${formatRmb(row.tierLogisticsPerUnit)} / ${row.tierContainersNeeded} 柜`)}</td>
              <td>${escapeHtml(formatUsd(row.tierUsdSellingPerUnit))}</td>
              <td>${escapeHtml(formatUsd(row.tierOrderAmount))}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="block">
      <div class="section-title">七、价格库与条款命中摘要</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 22%;">模块</th>
            <th style="width: 28%;">当前命中值</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          ${benchmarkRows.map((row) => `
            <tr>
              <td>${escapeHtml(row.label)}</td>
              <td>${escapeHtml(row.value)}</td>
              <td>${escapeHtml(row.desc)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="note-box">
      <strong>说明：</strong>
      1. 本报价表按当前系统参数实时生成，单价已包含当前客户等级、利润策略及贸易条款对应的费用口径。
      2. 认证要求：${escapeHtml(state.form.certificationRequirement || "无")}。
      3. 备注说明：${escapeHtml(state.form.customerRemark || "无")}。
      4. 当前贸易条款说明：${escapeHtml(totals.tradeTermDesc)}。
    </div>
  </div>
</body>
</html>`;
}

function getOfflineQuoteSettings() {
  try {
    return JSON.parse(window.localStorage.getItem("sanitary-offline-quote-settings") || "{}");
  } catch (error) {
    return {};
  }
}

function buildCustomerQuoteHtml(totals) {
  const settings = {
    companyName: "Gold King Sanitaryware Co., Ltd.",
    paymentTerms: "T/T 30% deposit, balance before shipment.",
    quoteNote: "Prices are valid within quotation validity and subject to final order confirmation.",
    ...getOfflineQuoteSettings()
  };
  const tierRows = getTierQuoteRows(totals);
  const specRows = getProductSpecDisplayRows();
  const dimensionText = `${state.form.productLength || "-"} x ${state.form.productWidth || "-"} x ${state.form.productHeight || "-"} mm`;
  const quoteDate = formatDateText(state.form.quoteDate);
  const validityText = `${state.form.validityDays || 15} days`;
  const priceBasis = `${state.form.tradeTerm || totals.tradeTermCode} ${state.form.shippingPort || ""}`.trim();
  const containerType = totals.containerType || "40HQ";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(state.quoteCode)} Customer Quotation</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 28px; color: #172033; font-family: Arial, "Microsoft YaHei", sans-serif; background: #eef2f6; }
    .sheet { width: 960px; margin: 0 auto; background: #fff; border: 1px solid #d8e0e8; }
    .header { display: flex; justify-content: space-between; gap: 24px; padding: 30px 34px; border-bottom: 4px solid #0f766e; }
    .brand h1 { margin: 0; font-size: 28px; color: #0f172a; letter-spacing: 0; }
    .brand p { margin: 8px 0 0; color: #526173; line-height: 1.6; }
    .quote-no { text-align: right; min-width: 220px; }
    .quote-no strong { display: block; font-size: 20px; color: #0f766e; margin-bottom: 8px; }
    .section { padding: 22px 34px 0; }
    .section h2 { margin: 0 0 12px; font-size: 15px; color: #0f172a; text-transform: uppercase; letter-spacing: .04em; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    td, th { border: 1px solid #dce4ec; padding: 10px 12px; font-size: 12px; vertical-align: top; word-break: break-word; }
    th { background: #f4f7fa; color: #475569; text-align: left; }
    .label { background: #f8fafc; color: #64748b; font-weight: 700; width: 15%; }
    .price { color: #0f766e; font-weight: 800; font-size: 15px; }
    .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .summary div { border: 1px solid #dce4ec; background: #f8fafc; padding: 13px; }
    .summary span { display: block; color: #64748b; font-size: 11px; margin-bottom: 6px; }
    .summary strong { font-size: 18px; color: #0f172a; }
    .note { margin: 22px 34px 30px; border: 1px dashed #b7c5d3; background: #f8fafc; padding: 14px 16px; font-size: 12px; line-height: 1.75; color: #475569; }
    @media print {
      body { background: #fff; padding: 0; }
      .sheet { width: 100%; border: none; }
      @page { size: A4; margin: 12mm; }
    }
  </style>
</head>
<body>
  <main class="sheet">
    <header class="header">
      <div class="brand">
        <h1>${escapeHtml(settings.companyName || "Gold King Sanitaryware Co., Ltd.")}</h1>
        <p>Sanitaryware Customer Quotation</p>
      </div>
      <div class="quote-no">
        <strong>${escapeHtml(state.quoteCode)}</strong>
        <div>Date: ${escapeHtml(quoteDate)}</div>
        <div>Valid: ${escapeHtml(validityText)}</div>
      </div>
    </header>

    <section class="section">
      <h2>Customer & Trade</h2>
      <table>
        <tr><td class="label">Customer</td><td>${escapeHtml(state.form.customerName || "-")}</td><td class="label">Project</td><td>${escapeHtml(state.form.projectName || "-")}</td></tr>
        <tr><td class="label">Contact</td><td>${escapeHtml(state.form.contactPhone || "-")}</td><td class="label">Sales</td><td>${escapeHtml(state.form.salesName || "-")}</td></tr>
        <tr><td class="label">Trade Term</td><td>${escapeHtml(priceBasis)}</td><td class="label">Incoterms</td><td>${escapeHtml(state.form.incotermsVersion || "Incoterms 2020")}</td></tr>
        <tr><td class="label">Currency</td><td>${escapeHtml(totals.quoteCurrency || "USD")}</td><td class="label">Market</td><td>${escapeHtml(state.form.destinationMarket || "-")}</td></tr>
        <tr><td class="label">Port of Loading</td><td>${escapeHtml(state.form.shippingPort || "-")}</td><td class="label">Destination Port</td><td>${escapeHtml(state.form.destinationPort || "-")}</td></tr>
      </table>
    </section>

    <section class="section">
      <h2>Product Specification</h2>
      <table>
        <tr><td class="label">Product</td><td>${escapeHtml(state.form.productName || getProductTemplateLabel())}</td><td class="label">Model</td><td>${escapeHtml(state.form.modelCode || "-")}</td></tr>
        <tr><td class="label">Template</td><td>${escapeHtml(getProductTemplateLabel())}</td><td class="label">Dimension</td><td>${escapeHtml(dimensionText)}</td></tr>
        <tr><td class="label">Net Weight</td><td>${escapeHtml(`${state.form.productNetWeight || "-"} KG`)}</td><td class="label">Packing</td><td>${escapeHtml(state.form.packageGrade || "-")}</td></tr>
        ${specRows.map(([label, value], index) => index % 2 === 0 ? `<tr><td class="label">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td><td class="label">${escapeHtml(specRows[index + 1]?.[0] || "")}</td><td>${escapeHtml(specRows[index + 1]?.[1] || "")}</td></tr>` : "").join("")}
      </table>
    </section>

    <section class="section">
      <h2>Quotation Summary</h2>
      <div class="summary">
        <div><span>Quantity</span><strong>${escapeHtml(String(totals.orderQuantity || 0))}</strong></div>
        <div><span>MOQ</span><strong>${escapeHtml(totals.moq ? `${totals.moq} pcs` : "-")}</strong></div>
        <div><span>Load Qty</span><strong>${escapeHtml(totals.estimatedLoadQty ? `${totals.estimatedLoadQty}/${containerType}` : "-")}</strong></div>
        <div><span>Lead Time</span><strong>${escapeHtml(totals.leadTimeDays ? `${totals.leadTimeDays} days` : "-")}</strong></div>
        <div><span>Unit Price</span><strong class="price">${escapeHtml(formatUsd(totals.usdSellingPerUnit))}</strong></div>
        <div><span>Total Amount</span><strong class="price">${escapeHtml(formatUsd(totals.usdSellingTotal))}</strong></div>
      </div>
    </section>

    <section class="section">
      <h2>Quantity Price Tiers</h2>
      <table>
        <thead><tr><th>Quantity</th><th>Unit Price</th><th>Total Amount</th><th>Remark</th></tr></thead>
        <tbody>
          ${tierRows.map((row) => `<tr><td>${escapeHtml(`${row.quantity} pcs`)}</td><td class="price">${escapeHtml(formatUsd(row.tierUsdSellingPerUnit))}</td><td>${escapeHtml(formatUsd(row.tierOrderAmount))}</td><td>${escapeHtml(`${priceBasis}, ${state.form.incotermsVersion || "Incoterms 2020"}`)}</td></tr>`).join("")}
        </tbody>
      </table>
    </section>

    <div class="note">
      <strong>Terms:</strong><br>
      Price Basis: ${escapeHtml(`${priceBasis}, ${state.form.incotermsVersion || "Incoterms 2020"}`)}<br>
      Payment: ${escapeHtml(settings.paymentTerms || "-")}<br>
      MOQ: ${escapeHtml(totals.moq ? `${totals.moq} pcs` : "-")}<br>
      Lead Time: ${escapeHtml(totals.leadTimeDays ? `${totals.leadTimeDays} days after deposit and artwork approval` : "-")}<br>
      Certification / Requirement: ${escapeHtml(state.form.certificationRequirement || "-")}<br>
      Note: ${escapeHtml(settings.quoteNote || state.form.customerRemark || "-")}
    </div>
  </main>
</body>
</html>`;
}

function printCustomerQuote() {
  syncFormState();
  syncSummaryState();
  const totals = getSummaryValues();
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    showToast("浏览器阻止了打印窗口，请允许弹窗后重试");
    return;
  }
  printWindow.document.open();
  printWindow.document.write(buildCustomerQuoteHtml(totals));
  printWindow.document.close();
  printWindow.focus();
  printWindow.setTimeout(() => printWindow.print(), 250);
}

function exportQuoteSheet() {
  syncFormState();
  syncSummaryState();
  const totals = getSummaryValues();
  const workbookHtml = buildExportWorkbookHtml(totals);
  const blob = new Blob(["\ufeff", workbookHtml], { type: "application/vnd.ms-excel;charset=utf-8;" });
  downloadBlob(`${state.quoteCode}-内部核价表.xls`, blob);
  showToast("内部核价表已导出");
}

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function bindEvents() {
  const specDrivenFields = [
    "includeSeatCover",
    "seatCoverGrade",
    "glazeLevel",
    "packageGrade",
    "certificationRequirement",
    "orderQuantity",
    "productionQuantity",
    "productLength",
    "productWidth",
    "productHeight",
    "productNetWeight",
    "loadingMode",
    "destinationMarket",
    "shippingPort",
    "destinationPort",
    "tradeTerm"
  ];

  refs.customerForm.addEventListener("input", (event) => {
    syncFormState();
    if (event.target.id === "customerSource" || event.target.id === "customerSourceSelect") {
      syncCustomerSourceUi();
    }
    if (specDrivenFields.includes(event.target.name)) {
      applySmartDefaults();
      applySupplierPricing();
      syncBudgetRowsFromUnitRows();
      fillFormFromState();
    }
    renderBomTable();
    renderSummary();
    persistDraft();
  });

  refs.customerForm.addEventListener("change", (event) => {
    syncFormState();
    if (event.target.id === "customerSource" || event.target.id === "customerSourceSelect") {
      syncCustomerSourceUi();
    }
    if (specDrivenFields.includes(event.target.name)) {
      applySmartDefaults();
      applySupplierPricing();
      syncBudgetRowsFromUnitRows();
      fillFormFromState();
    }
    renderBomTable();
    renderSummary();
    persistDraft();
  });

  refs.templateSelect.addEventListener("change", (event) => {
    event.stopPropagation();
    const template = getTemplateById(event.target.value);
    loadTemplate(template.id);
    showToast(`已切换为 ${template.label} 模板`);
  });

  [
    refs.inlandFreightInput,
    refs.customsFeeInput,
    refs.portChargesInput,
    refs.inspectionFeeInput,
    refs.oceanFreightInput,
    refs.insuranceFeeInput,
    refs.destinationDeliveryInput,
    refs.internalProfitRateInput,
    refs.externalProfitRateInput,
    refs.commissionRateInput,
    refs.afterSalesRateInput,
    refs.fxSafetyRateInput,
    refs.smallOrderSurchargeInput,
    refs.specialPackageSurchargeInput,
    refs.specialTestingSurchargeInput,
    refs.trialProductionSurchargeInput,
    refs.specialLabelSurchargeInput,
    refs.operatingExpenseRateInput,
    refs.exchangeRateInput
  ].forEach((input) => {
    input.addEventListener("input", () => {
      syncSummaryState();
      renderSummary();
      persistDraft();
    });
  });

  refs.loadTemplateBtn.addEventListener("click", () => {
    loadTemplate(refs.templateSelect.value);
    showToast("已按当前产品模板带出默认参数");
  });

  refs.rapidModeBtn?.addEventListener("click", () => {
    setQuoteMode("rapid");
  });

  refs.fullModeBtn?.addEventListener("click", () => {
    setQuoteMode("full");
  });

  refs.rapidDecisionPanel?.addEventListener("click", (event) => {
    const formulaButton = event.target.closest('[data-action="show-rapid-formula"]');
    if (formulaButton) {
      openRapidFormulaModal(getSummaryValues());
      return;
    }
    const configButton = event.target.closest('[data-action="open-rapid-config"]');
    if (configButton) {
      openRapidConfigModal();
      return;
    }
    const button = event.target.closest('[data-action="convert-to-full"]');
    if (button) {
      convertRapidToFullMode();
      return;
    }
    const detailButton = event.target.closest('[data-action="show-driver-detail"]');
    if (!detailButton) {
      return;
    }
    const decision = getRapidDecisionData(getSummaryValues());
    const driver = decision.drivers.find((item) => item.key === detailButton.dataset.driverKey);
    openRapidImpactModal(driver);
  });

  refs.rapidImpactModalCloseBtn?.addEventListener("click", closeRapidImpactModal);
  refs.rapidImpactModalCancelBtn?.addEventListener("click", closeRapidImpactModal);
  refs.rapidImpactModal?.addEventListener("click", (event) => {
    if (event.target === refs.rapidImpactModal) {
      closeRapidImpactModal();
    }
  });
  refs.rapidFormulaModalCloseBtn?.addEventListener("click", closeRapidFormulaModal);
  refs.rapidFormulaModalCancelBtn?.addEventListener("click", closeRapidFormulaModal);
  refs.rapidFormulaModal?.addEventListener("click", (event) => {
    if (event.target === refs.rapidFormulaModal) {
      closeRapidFormulaModal();
    }
  });
  refs.rapidConfigModalCloseBtn?.addEventListener("click", closeRapidConfigModal);
  refs.rapidConfigModalCancelBtn?.addEventListener("click", closeRapidConfigModal);
  refs.rapidConfigModal?.addEventListener("click", (event) => {
    if (event.target === refs.rapidConfigModal) {
      closeRapidConfigModal();
    }
  });
  refs.rapidConfigPanel?.addEventListener("input", (event) => {
    const input = event.target.closest("[data-rapid-config-path]");
    if (!input) {
      return;
    }
    if (!state.rapidQuoteConfig) {
      resetRapidQuoteConfigState();
    }
    const path = input.dataset.rapidConfigPath.split(".");
    let target = state.rapidQuoteConfig;
    while (path.length > 1) {
      const key = path.shift();
      if (!target[key] || typeof target[key] !== "object") {
        target[key] = {};
      }
      target = target[key];
    }
    const finalKey = path[0];
    const rawValue = Number(input.value);
    const safeValue = Number.isFinite(rawValue) ? rawValue : 0;
    const isPercentField = input.dataset.rapidConfigPath.startsWith("markup.");
    target[finalKey] = isPercentField ? safeValue / 100 : safeValue;
    renderSummary({ skipRapidConfigPanel: true });
    persistDraft();
  });
  refs.rapidConfigResetBtn?.addEventListener("click", () => {
    resetRapidQuoteConfigState();
    renderSummary();
    persistDraft();
    showToast("极速模式经验参数已恢复默认");
  });

  refs.addCustomRowBtn.addEventListener("click", addCustomRow);

  refs.customCategorySelect.addEventListener("change", () => {
    renderPresetItemOptions();
  });

  refs.presetItemSelect.addEventListener("change", () => {
    const presetName = refs.presetItemSelect.value;
    if (presetName) {
      refs.customItemNameInput.value = presetName;
    }
  });

  refs.customItemNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomRow();
    }
  });

  refs.bomTableBody.addEventListener("click", (event) => {
    const header = event.target.closest(".group-header");
    if (header) {
      const categoryKey = header.dataset.category;
      state.collapsedCategories[categoryKey] = !state.collapsedCategories[categoryKey];
      renderBomTable();
      persistDraft();
      return;
    }

    if (event.target.dataset.action === "delete") {
      const rowId = event.target.closest("tr")?.dataset.id;
      if (rowId) {
        removeRow(rowId);
      }
    }
  });

  refs.resultTableBody.addEventListener("click", (event) => {
    const header = event.target.closest(".result-section-head");
    if (!header) {
      return;
    }
    const sectionKey = header.dataset.summarySection;
    if (!sectionKey) {
      return;
    }
    state.collapsedCategories[sectionKey] = !(state.collapsedCategories[sectionKey] !== false);
    renderSummary();
    persistDraft();
  });

  refs.resultTableBody.addEventListener("keydown", (event) => {
    const header = event.target.closest(".result-section-head");
    if (!header || !["Enter", " "].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const sectionKey = header.dataset.summarySection;
    if (!sectionKey) {
      return;
    }
    state.collapsedCategories[sectionKey] = !(state.collapsedCategories[sectionKey] !== false);
    renderSummary();
    persistDraft();
  });

  refs.bomTableBody.addEventListener("input", (event) => {
    const field = event.target.dataset.field;
    const rowId = event.target.closest("tr")?.dataset.id;
    if (!field || !rowId) {
      return;
    }
    updateRow(rowId, field, event.target.value);
    const row = getActiveRows().find((item) => item.rowId === rowId);
    const amountElement = event.target.closest("tr")?.querySelector(".amount-text");
    if (row && amountElement) {
      const strong = amountElement.querySelector("strong");
      const span = amountElement.querySelector("span");
      if (strong) {
        strong.textContent = getCalcMode() === "budget" ? formatRmb(getRowOrderAmount(row)) : formatRmb(getRowPerUnitAmount(row));
      }
      if (span) {
        span.textContent = getCalcMode() === "budget" ? `均摊单台 ${formatRmb(getRowPerUnitAmount(row))}` : `订单总计 ${formatRmb(getRowOrderAmount(row))}`;
      }
      const readonlyBox = event.target.closest("tr")?.querySelector(".per-unit-box");
      if (readonlyBox) {
        readonlyBox.textContent = formatRmb(getRowPerUnitAmount(row));
      }
    }
    renderSummary();
    persistDraft();
  });

  refs.bomTableBody.addEventListener("change", (event) => {
    const field = event.target.dataset.field;
    const rowId = event.target.closest("tr")?.dataset.id;
    if (!field || !rowId) {
      return;
    }
    updateRow(rowId, field, event.target.value);
    renderSummary();
    persistDraft();
  });

  refs.saveQuoteBtn.addEventListener("click", () => {
    saveCurrentQuote();
  });

  refs.exportBtn.addEventListener("click", exportQuoteSheet);
  refs.printBtn.addEventListener("click", printCustomerQuote);

  const handleLibraryChange = (event) => {
    if (!updateLibraryByDataset(event.target)) {
      return;
    }
    applySupplierPricing();
    syncBudgetRowsFromUnitRows();
    renderSummary();
    persistDraft();
  };

  refs.priceLibraryEditor?.addEventListener("change", handleLibraryChange);
  refs.factoryRatesEditor?.addEventListener("change", handleLibraryChange);
  refs.factoryProcessEditor?.addEventListener("change", handleLibraryChange);
  refs.factoryPackagingEditor?.addEventListener("change", handleLibraryChange);
  refs.factoryPersonnelEditor?.addEventListener("change", handleLibraryChange);

  const priceLibraryHeader = document.getElementById("priceLibraryHeader");
  if (priceLibraryHeader) {
    priceLibraryHeader.addEventListener("click", () => {
      const panel = document.getElementById("priceLibraryPanel");
      panel.classList.toggle("collapsed");
    });
  }

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      saveCurrentQuote();
      return;
    }
    if (event.key === "Escape" && refs.rapidImpactModal && !refs.rapidImpactModal.classList.contains("hidden")) {
      closeRapidImpactModal();
      return;
    }
    if (event.key === "Escape" && refs.rapidFormulaModal && !refs.rapidFormulaModal.classList.contains("hidden")) {
      closeRapidFormulaModal();
      return;
    }
    if (event.key === "Escape" && refs.rapidConfigModal && !refs.rapidConfigModal.classList.contains("hidden")) {
      closeRapidConfigModal();
    }
  });
}

function init() {
  resetRapidQuoteConfigState();
  renderTemplateOptions();
  renderCustomCategoryOptions();
  loadDraft();
  applySmartDefaults();
  applySupplierPricing();
  syncBudgetRowsFromUnitRows();
  fillFormFromState();
  applyQuoteModeUi();
  renderBomTable();
  renderSummary();
  bindEvents();
}

function buildQuotePayload() {
  syncFormState();
  syncSummaryState();
  return {
    version: state.version,
    quoteCode: state.quoteCode,
    form: JSON.parse(JSON.stringify(state.form)),
    rows: JSON.parse(JSON.stringify(state.rows)),
    budgetRows: JSON.parse(JSON.stringify(state.budgetRows)),
    priceLibrary: JSON.parse(JSON.stringify(state.priceLibrary)),
    summary: JSON.parse(JSON.stringify(state.summary)),
    collapsedCategories: JSON.parse(JSON.stringify(state.collapsedCategories)),
    totals: getSummaryValues(),
    updatedAt: new Date().toISOString()
  };
}

function applyQuotePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return;
  }
  state.quoteCode = payload.quoteCode || state.quoteCode || createQuoteCode();
  state.form = {
    ...createDefaultForm(),
    ...(payload.form || {})
  };
  reconcileLegacySeatCoverTemplate();
  normalizeTemplateSelection(state.form);
  state.rows = Array.isArray(payload.rows) && payload.rows.length
    ? payload.rows
    : createRowsFromTemplate(state.form.templateSelect);
  state.budgetRows = Array.isArray(payload.budgetRows) && payload.budgetRows.length
    ? payload.budgetRows
    : createBudgetRowsFromTemplate(state.form.templateSelect, state.form.productionQuantity);
  state.summary = {
    ...state.summary,
    ...(payload.summary || {})
  };
  state.priceLibrary = mergeDeepPriceLibrary(createDefaultPriceLibrary(), payload.priceLibrary || {});
  state.collapsedCategories = payload.collapsedCategories || {};
  reconcileModeRows();
  applySupplierPricing();
  syncBudgetRowsFromUnitRows();
  fillFormFromState();
  renderBomTable();
  renderSummary();
  persistDraft();
}

window.quoteApp = {
  refs,
  getState: () => state,
  buildQuotePayload,
  applyQuotePayload,
  getSummaryValues,
  formatRmb,
  formatUsd,
  showToast,
  createQuoteCode
};

init();
