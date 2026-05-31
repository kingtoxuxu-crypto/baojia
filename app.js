const money = new Intl.NumberFormat("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = new Intl.NumberFormat("zh-CN", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 });

const containerProfiles = {
  "20GP": { cbm: 28, maxWeight: 21500 },
  "40GP": { cbm: 56, maxWeight: 26000 },
  "40HQ": { cbm: 66, maxWeight: 26500 }
};

const productLibrary = [
  {
    code: "WC-2P-001",
    name: "Two-piece toilet set",
    category: "马桶",
    versions: "白色标准釉 / 抗菌釉",
    packaging: "1 set/carton, nested accessory carton optional",
    cbm: 0.115,
    weight: 38
  },
  {
    code: "BAS-CT-480",
    name: "Countertop basin 480mm",
    category: "台盆",
    versions: "单孔 / 无孔 / 带溢水",
    packaging: "1 pc/carton or 2 pcs/carton",
    cbm: 0.038,
    weight: 12
  },
  {
    code: "SC-UF-001",
    name: "UF soft-close seat cover",
    category: "盖板",
    versions: "UF / PP / quick release",
    packaging: "10 pcs/carton",
    cbm: 0.008,
    weight: 2.4
  },
  {
    code: "FIT-KIT-001",
    name: "Flush valve and fitting kit",
    category: "水件",
    versions: "普通 / 升级 / 客户指定",
    packaging: "20 sets/carton",
    cbm: 0.004,
    weight: 1.1
  }
];

const supplierQuotes = [
  { supplier: "Foshan Seat Cover Co.", item: "UF soft-close seat cover", basis: "送仓/进仓价", price: 43, currency: "RMB", validUntil: "2026-06-20", status: "有效" },
  { supplier: "Xiamen Fittings Factory", item: "Flush valve and fitting kit", basis: "中国 EXW", price: 27, currency: "RMB", validUntil: "2026-06-05", status: "临近到期" },
  { supplier: "Lagos Carton Supplier", item: "Outer carton", basis: "尼厂装柜成本", price: 13.5, currency: "RMB", validUntil: "2026-07-10", status: "有效" },
  { supplier: "Manual legacy record", item: "Special drain kit", basis: "手动确认成本", price: 18, currency: "RMB", validUntil: "2026-05-15", status: "过期" }
];

const scenarios = [
  {
    id: "single_toilet_fob",
    label: "单品马桶 / 尼厂自产 / FOB",
    form: { quoteObjectType: "single", displayMode: "set_total", tradeTerm: "FOB", qty: 600 },
    lines: [
      line("toilet", "Two-piece toilet ceramic set", "ng_factory", "ng_ex_factory", "ng_set_shipment", "same_carton", "FOB", 1, 83, 0.115, 38, "NG-SET", true, true, false, true)
    ]
  },
  {
    id: "assembled_china_parts",
    label: "马桶+中国盖板水件 / 到尼厂组装",
    form: { quoteObjectType: "set", displayMode: "set_total", tradeTerm: "FOB", qty: 600 },
    lines: [
      line("toilet", "Two-piece toilet ceramic body", "ng_factory", "ng_ex_factory", "ng_set_shipment", "same_carton", "FOB", 1, 72, 0.102, 35, "NG-SET", true, true, false, true),
      line("seat", "UF soft-close seat cover", "china_supplier", "china_warehouse", "china_to_ng_assembled", "same_carton", "FOB", 1, 43, 0.008, 2.4, "NG-SET", true, false, false, true),
      line("fittings", "Flush valve and fitting kit", "china_supplier", "china_warehouse", "china_to_ng_assembled", "same_carton", "FOB", 1, 27, 0.004, 1.1, "NG-SET", true, false, false, true)
    ]
  },
  {
    id: "unassembled_china_parts",
    label: "马桶+中国配件 / 到尼厂不组装",
    form: { quoteObjectType: "set", displayMode: "split_lines", tradeTerm: "FOB", qty: 600 },
    lines: [
      line("toilet", "Two-piece toilet ceramic body", "ng_factory", "ng_ex_factory", "ng_set_shipment", "separate_carton", "FOB", 1, 72, 0.102, 35, "NG-SET", true, true, false, true),
      line("seat", "UF soft-close seat cover separate carton", "china_supplier", "china_warehouse", "china_to_ng_unassembled", "separate_carton", "FOB", 1, 43, 0.008, 2.4, "NG-SET", true, true, false, true),
      line("fittings", "Fitting kit separate carton", "china_supplier", "china_warehouse", "china_to_ng_unassembled", "separate_carton", "FOB", 1, 27, 0.004, 1.1, "NG-SET", true, true, false, true)
    ]
  },
  {
    id: "china_direct_split",
    label: "尼厂陶瓷 + 中国配件直发客户",
    form: { quoteObjectType: "split", displayMode: "split_lines", tradeTerm: "CFR", qty: 500 },
    lines: [
      line("basin", "Countertop basin 480mm", "ng_factory", "ng_ex_factory", "ng_set_shipment", "none", "CFR", 1, 39, 0.038, 12, "NG-BASIN", true, true, false, true),
      line("drain", "China pop-up drain kit direct shipment", "china_supplier", "china_fob", "china_direct_customer", "direct", "CFR", 1, 19, 0.003, 0.7, "CN-DIRECT", false, true, true, true)
    ]
  },
  {
    id: "basin_optional",
    label: "台盆单品 + 可选下水件",
    form: { quoteObjectType: "main_optional", displayMode: "main_optional", tradeTerm: "FOB", qty: 800 },
    lines: [
      line("basin", "Countertop basin 480mm", "ng_factory", "ng_ex_factory", "ng_set_shipment", "none", "FOB", 1, 39, 0.038, 12, "NG-BASIN", true, true, false, true),
      line("drain", "Optional pop-up drain kit", "china_supplier", "china_warehouse", "customer_separate_quote", "none", "FOB", 1, 18, 0.003, 0.7, "OPTIONAL", false, true, true, false)
    ]
  },
  {
    id: "exw_missing_logistics",
    label: "测试：EXW 中国配件缺物流",
    form: { quoteObjectType: "set", displayMode: "set_total", tradeTerm: "FOB", qty: 300 },
    lines: [
      line("toilet", "Toilet body", "ng_factory", "ng_ex_factory", "ng_set_shipment", "same_carton", "FOB", 1, 72, 0.102, 35, "NG-SET", true, true, false, true),
      line("seat", "Seat cover EXW with no active route", "china_supplier", "china_exw", "customer_separate_quote", "direct", "FOB", 1, 38, 0.008, 2.4, "EXW-MISS", true, true, true, false)
    ]
  },
  {
    id: "landed_duplicate",
    label: "测试：到尼厂入库成本重复加物流",
    form: { quoteObjectType: "set", displayMode: "set_total", tradeTerm: "FOB", qty: 300 },
    lines: [
      line("toilet", "Toilet body", "ng_factory", "ng_ex_factory", "ng_set_shipment", "same_carton", "FOB", 1, 72, 0.102, 35, "NG-SET", true, true, false, true),
      line("seat", "Seat cover landed NG but still routed", "china_supplier", "landed_ng", "china_to_ng_assembled", "same_carton", "FOB", 1, 52, 0.008, 2.4, "NG-SET", true, true, false, true)
    ]
  },
  {
    id: "cif_no_insurance",
    label: "测试：CIF 缺保险",
    form: { quoteObjectType: "single", displayMode: "set_total", tradeTerm: "CIF", qty: 600, insuranceRate: 0, insuranceFixed: 0 },
    lines: [
      line("toilet", "Two-piece toilet set", "ng_factory", "ng_ex_factory", "ng_set_shipment", "same_carton", "CIF", 1, 83, 0.115, 38, "NG-SET", true, true, false, true)
    ]
  }
];

const state = {
  lines: structuredClone(scenarios[1].lines),
  snapshots: []
};

function line(id, name, source, basis, path, assembly, tradeTerm, qtyPerSet, unitCost, cbm, weight, group, included, visible, separate, loading) {
  return {
    id,
    name,
    source,
    basis,
    path,
    assembly,
    tradeTerm,
    qtyPerSet,
    unitCost,
    cbm,
    weight,
    group,
    included,
    visible,
    separate,
    loading
  };
}

const $ = (id) => document.getElementById(id);

function numberValue(id) {
  return Number($(id)?.value || 0);
}

function formatRmb(value) {
  return `RMB ${money.format(value || 0)}`;
}

function formatUsd(value) {
  return `$${money.format(value || 0)}`;
}

function todayCode() {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
}

function init() {
  $("quoteNo").value = `QT-${todayCode()}-001`;
  scenarios.forEach((scenario) => {
    const option = document.createElement("option");
    option.value = scenario.id;
    option.textContent = scenario.label;
    $("scenarioSelect").append(option);
  });
  $("scenarioSelect").value = "assembled_china_parts";
  bindEvents();
  renderStaticPanels();
  renderAll();
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => switchPanel(button.dataset.panel));
  });
  document.querySelectorAll("input, select").forEach((el) => {
    el.addEventListener("input", renderAll);
    el.addEventListener("change", renderAll);
  });
  $("applyScenarioBtn").addEventListener("click", applyScenario);
  $("addLineBtn").addEventListener("click", addLine);
  $("saveSnapshotBtn").addEventListener("click", saveSnapshot);
  $("exportInternalBtn").addEventListener("click", exportInternalWorkbook);
  $("printCustomerBtn").addEventListener("click", printCustomerQuote);
  $("quoteLinesBody").addEventListener("input", handleLineChange);
  $("quoteLinesBody").addEventListener("change", handleLineChange);
  $("quoteLinesBody").addEventListener("click", handleLineAction);
}

function switchPanel(panel) {
  document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.panel === panel));
  document.querySelectorAll(".panel-page").forEach((page) => page.classList.toggle("active", page.dataset.panelPage === panel));
}

function applyScenario() {
  const scenario = scenarios.find((item) => item.id === $("scenarioSelect").value);
  if (!scenario) return;
  state.lines = structuredClone(scenario.lines);
  $("quoteObjectType").value = scenario.form.quoteObjectType;
  $("displayMode").value = scenario.form.displayMode;
  $("defaultTradeTerm").value = scenario.form.tradeTerm;
  $("orderQty").value = scenario.form.qty;
  if (scenario.form.insuranceRate != null) $("insuranceRate").value = scenario.form.insuranceRate;
  if (scenario.form.insuranceFixed != null) $("insuranceFixed").value = scenario.form.insuranceFixed;
  renderAll();
}

function addLine() {
  state.lines.push(line(
    `line-${Date.now()}`,
    "New quote item",
    "china_supplier",
    "china_warehouse",
    "china_to_ng_assembled",
    "same_carton",
    $("defaultTradeTerm").value,
    1,
    10,
    0.01,
    1,
    "NG-SET",
    true,
    true,
    false,
    true
  ));
  renderAll();
}

function handleLineAction(event) {
  const button = event.target.closest("[data-remove-line]");
  if (!button) return;
  state.lines = state.lines.filter((lineItem) => lineItem.id !== button.dataset.removeLine);
  renderAll();
}

function handleLineChange(event) {
  const target = event.target;
  const row = target.closest("[data-line-id]");
  if (!row) return;
  const item = state.lines.find((lineItem) => lineItem.id === row.dataset.lineId);
  if (!item) return;
  const field = target.dataset.field;
  if (!field) return;
  if (["qtyPerSet", "unitCost", "cbm", "weight"].includes(field)) {
    item[field] = Number(target.value || 0);
  } else if (["included", "visible", "separate", "loading"].includes(field)) {
    item[field] = target.checked;
  } else {
    item[field] = target.value;
  }
  renderAll();
}

function renderAll() {
  renderStatus();
  renderLines();
  const result = calculateQuote();
  renderLoading(result);
  renderSummary(result);
  renderRisks(result);
  renderCustomerPreview(result);
  renderInternalPreview(result);
}

function renderStatus() {
  const statusLabels = {
    draft: "草稿",
    cost_reviewing: "待核价",
    pending_approval: "待审批",
    approved: "已批准",
    issued: "已外发",
    accepted: "客户接受",
    rejected: "客户拒绝",
    converted: "已转订单",
    expired: "已过期",
    cancelled: "已作废"
  };
  const status = $("quoteStatus").value;
  $("quoteStatusPill").textContent = statusLabels[status] || status;
  const frozen = ["approved", "issued", "accepted", "converted", "cancelled"].includes(status);
  $("statusNotice").innerHTML = frozen
    ? `<strong class="warning-text">当前状态已锁定关键成本。</strong> 修改客户已收到或已批准的报价时，应生成新版本，不能覆盖旧版本。`
    : `当前为可编辑状态。提交审批后，产品、BOM、供应商报价、物流费率和汇率会保存为快照。`;
}

function renderLines() {
  const body = $("quoteLinesBody");
  body.innerHTML = state.lines.map((item) => `
    <tr data-line-id="${item.id}">
      <td>
        <div class="line-cell">
          <input data-field="name" value="${escapeHtml(item.name)}">
          <input data-field="group" value="${escapeHtml(item.group)}" title="出货组">
        </div>
      </td>
      <td>
        <div class="line-cell">
          ${selectHtml("source", item.source)}
          ${selectHtml("basis", item.basis)}
        </div>
      </td>
      <td>
        <div class="line-cell">
          ${selectHtml("path", item.path)}
          ${selectHtml("assembly", item.assembly)}
        </div>
      </td>
      <td>
        <div class="line-cell">
          ${selectHtml("tradeTerm", item.tradeTerm)}
          <div class="check-row">
            ${checkbox("included", item.included, "进套装")}
            ${checkbox("visible", item.visible, "客户可见")}
            ${checkbox("separate", item.separate, "单独报价")}
            ${checkbox("loading", item.loading, "参与装柜")}
          </div>
        </div>
      </td>
      <td>
        <div class="mini-grid">
          <label>用量<input data-field="qtyPerSet" type="number" min="0" step="0.01" value="${item.qtyPerSet}"></label>
          <label>成本<input data-field="unitCost" type="number" min="0" step="0.01" value="${item.unitCost}"></label>
        </div>
      </td>
      <td>
        <div class="mini-grid">
          <label>CBM/套<input data-field="cbm" type="number" min="0" step="0.001" value="${item.cbm}"></label>
          <label>KG/套<input data-field="weight" type="number" min="0" step="0.1" value="${item.weight}"></label>
        </div>
      </td>
      <td><button class="danger" type="button" data-remove-line="${item.id}">删除</button></td>
    </tr>
  `).join("");
}

function selectHtml(field, value) {
  const templateRoot = document.querySelector("#selectTemplates");
  const template = templateRoot?.content?.querySelector(`select[data-field="${field}"]`);
  if (!template) {
    return "";
  }
  const clone = template.cloneNode(true);
  clone.value = value;
  clone.dataset.field = field;
  return clone.outerHTML;
}

function checkbox(field, checked, label) {
  return `<label><input data-field="${field}" type="checkbox" ${checked ? "checked" : ""}>${label}</label>`;
}

function calculateQuote() {
  const orderQty = numberValue("orderQty") || 1;
  const exchangeRate = numberValue("exchangeRate") || 1;
  const targetMargin = numberValue("targetMargin") / 100;
  const floorMargin = numberValue("floorMargin") / 100;
  const commissionRate = numberValue("commissionRate") / 100;
  const fxRiskRate = numberValue("fxRiskRate") / 100;
  const afterSalesRate = numberValue("afterSalesRate") / 100;
  const defaultTradeTerm = $("defaultTradeTerm").value;
  const profile = containerProfiles[$("containerType").value];
  const efficiency = numberValue("loadingEfficiency") / 100;
  const weightReserve = numberValue("weightReserve");

  const effectiveLines = state.lines.filter((item) => item.included || item.separate);
  const productCost = effectiveLines.reduce((sum, item) => sum + item.unitCost * item.qtyPerSet, 0);
  const loadingGroups = buildLoadingGroups(profile, efficiency, weightReserve, orderQty);
  const logistics = calculateLogistics(loadingGroups, orderQty);
  const baseRisk = productCost * (commissionRate + fxRiskRate + afterSalesRate);
  const surchargePerUnit = (numberValue("specialSurcharge") || 0) / orderQty;
  const fobCost = productCost + logistics.fobPerUnit + baseRisk + surchargePerUnit;
  const cfrCost = fobCost + logistics.oceanPerUnit;
  const insurancePerUnit = defaultTradeTerm === "CIF"
    ? calculateInsurance(cfrCost, orderQty)
    : 0;
  const termCost = defaultTradeTerm === "CIF" ? cfrCost + insurancePerUnit : defaultTradeTerm === "CFR" ? cfrCost : fobCost;
  const suggestedRmb = targetMargin < 0.99 ? termCost / (1 - targetMargin) : termCost;
  const floorRmb = floorMargin < 0.99 ? termCost / (1 - floorMargin) : termCost;
  const suggestedUsd = suggestedRmb / exchangeRate;
  const floorUsd = floorRmb / exchangeRate;
  const risks = evaluateRisks({ termCost, suggestedRmb, floorRmb, loadingGroups, logistics, insurancePerUnit });

  return {
    orderQty,
    exchangeRate,
    targetMargin,
    floorMargin,
    productCost,
    baseRisk,
    fobCost,
    cfrCost,
    insurancePerUnit,
    termCost,
    suggestedRmb,
    suggestedUsd,
    floorRmb,
    floorUsd,
    loadingGroups,
    logistics,
    risks
  };
}

function buildLoadingGroups(profile, efficiency, weightReserve, orderQty) {
  const map = new Map();
  state.lines.filter((item) => item.loading).forEach((item) => {
    const key = item.group || "DEFAULT";
    const group = map.get(key) || { group: key, cbmPerSet: 0, weightPerSet: 0, lines: [] };
    const effectiveCbm = item.assembly === "same_carton" && item.path.includes("assembled")
      ? item.cbm * 0.85
      : item.cbm;
    group.cbmPerSet += effectiveCbm * item.qtyPerSet;
    group.weightPerSet += item.weight * item.qtyPerSet;
    group.lines.push(item);
    map.set(key, group);
  });
  return [...map.values()].map((group) => {
    const volumeCapacity = group.cbmPerSet > 0 ? Math.floor((profile.cbm * efficiency) / group.cbmPerSet) : 0;
    const weightCapacity = group.weightPerSet > 0 ? Math.floor((profile.maxWeight - weightReserve) / group.weightPerSet) : 0;
    const loadQty = Math.max(Math.min(volumeCapacity || Infinity, weightCapacity || Infinity), 0);
    const containers = loadQty > 0 ? Math.ceil(orderQty / loadQty) : 0;
    const usedCbm = group.cbmPerSet * orderQty;
    const loadRate = containers > 0 ? usedCbm / (profile.cbm * containers) : 0;
    const limiting = volumeCapacity < weightCapacity ? "体积限制" : weightCapacity < volumeCapacity ? "重量限制" : "体积/重量接近";
    return { ...group, volumeCapacity, weightCapacity, loadQty, containers, usedCbm, loadRate, limiting };
  });
}

function calculateLogistics(groups, orderQty) {
  let fobTotal = 0;
  let oceanTotal = 0;
  let chinaToNgTotal = 0;
  let chinaDirectTotal = 0;

  groups.forEach((group) => {
    const paths = new Set(group.lines.map((item) => item.path));
    const containers = Math.max(group.containers, 1);
    if (paths.has("ng_set_shipment") || paths.has("ng_local_match") || paths.has("china_to_ng_assembled") || paths.has("china_to_ng_unassembled")) {
      fobTotal += numberValue("ngLocalCharge") * containers;
    }
    if (paths.has("china_to_ng_assembled") || paths.has("china_to_ng_unassembled")) {
      chinaToNgTotal += numberValue("chinaToNgFreight") * containers;
    }
    if (paths.has("china_direct_customer")) {
      chinaDirectTotal += numberValue("chinaDirectFreight") * containers;
    }
    oceanTotal += numberValue("oceanFreight") * containers;
  });

  return {
    fobPerUnit: (fobTotal + chinaToNgTotal + chinaDirectTotal) / orderQty,
    oceanPerUnit: oceanTotal / orderQty,
    chinaToNgPerUnit: chinaToNgTotal / orderQty,
    chinaDirectPerUnit: chinaDirectTotal / orderQty
  };
}

function calculateInsurance(cfrCost, orderQty) {
  const fixed = numberValue("insuranceFixed") / orderQty;
  const rate = numberValue("insuranceRate") / 100;
  return fixed > 0 ? fixed : cfrCost * rate;
}

function evaluateRisks(result) {
  const risks = [];
  const defaultTradeTerm = $("defaultTradeTerm").value;
  const floorMargin = numberValue("floorMargin") / 100;
  const impliedMargin = result.suggestedRmb ? (result.suggestedRmb - result.termCost) / result.suggestedRmb : 0;

  state.lines.forEach((item) => {
    if ((item.included || item.separate) && item.unitCost <= 0) {
      risks.push(risk("blocking", "COST_MISSING", `${item.name} 成本缺失。`));
    }
    if (item.basis === "china_exw" && !["china_to_ng_assembled", "china_to_ng_unassembled", "china_direct_customer"].includes(item.path)) {
      risks.push(risk("blocking", "EXW_LOGISTICS_MISSING", `${item.name} 是 EXW 中国供应商价格，但没有有效后续物流路径。`));
    }
    if (item.basis === "landed_ng" && ["china_to_ng_assembled", "china_to_ng_unassembled"].includes(item.path) && result.logistics.chinaToNgPerUnit > 0) {
      risks.push(risk("blocking", "DUPLICATE_LOGISTICS", `${item.name} 已是到尼厂入库成本，但仍叠加中国到尼厂物流。`));
    }
    if (item.basis === "manual_cost") {
      risks.push(risk("approval", "MANUAL_COST_NOT_APPROVED", `${item.name} 使用手动确认成本，需要主管审批。`));
    }
  });

  if (defaultTradeTerm === "CIF" && numberValue("insuranceRate") <= 0 && numberValue("insuranceFixed") <= 0) {
    risks.push(risk("blocking", "CIF_INSURANCE_MISSING", "CIF 报价缺少保险费率或固定保险金额。"));
  }
  if (defaultTradeTerm === "DDP_MANUAL") {
    risks.push(risk("blocking", "DDP_NOT_APPROVED", "DDP 只能作为手动项目报价并主管审批。"));
  }
  if (impliedMargin < floorMargin) {
    risks.push(risk("blocking", "BELOW_FLOOR_MARGIN", "当前报价低于底线毛利。"));
  }

  result.loadingGroups.forEach((group) => {
    const minRate = numberValue("minLoadRate") / 100;
    if (group.loadRate > 0 && group.loadRate < minRate) {
      const spareCbm = Math.max(group.containers * containerProfiles[$("containerType").value].cbm - group.usedCbm, 0);
      const basin = productLibrary.find((item) => item.category === "台盆");
      const addQty = basin ? Math.floor(spareCbm / basin.cbm) : 0;
      risks.push(risk("notice", "LOW_LOADING_RATE", `${group.group} 装载率 ${pct.format(group.loadRate)}，建议补入约 ${addQty} 件台盆或改用拼柜/手动物流。`));
    }
  });

  supplierQuotes.filter((quote) => quote.status === "过期").forEach((quote) => {
    if (state.lines.some((item) => quote.item.includes(item.name.slice(0, 8)))) {
      risks.push(risk("approval", "SUPPLIER_QUOTE_EXPIRED", `${quote.item} 供应商报价已过期。`));
    }
  });

  if (numberValue("exchangeRate") < 6.4 || numberValue("exchangeRate") > 7.4) {
    risks.push(risk("approval", "CUSTOM_FX_RATE", "当前汇率偏离常规区间，需要财务确认。"));
  }

  return risks.length ? risks : [risk("notice", "READY", "当前报价没有阻断项，可进入核价或审批流程。")];
}

function risk(level, code, message) {
  return { level, code, message };
}

function renderLoading(result) {
  $("loadingCards").innerHTML = result.loadingGroups.map((group) => `
    <article class="loading-card">
      <span>${escapeHtml(group.group)} / ${escapeHtml(group.limiting)}</span>
      <strong>${group.loadQty || 0} 套/柜</strong>
      <footer>
        CBM/套 ${money.format(group.cbmPerSet)} ｜ KG/套 ${money.format(group.weightPerSet)}<br>
        预计 ${group.containers || 0} 柜 ｜ 装载率 ${pct.format(group.loadRate || 0)}
      </footer>
    </article>
  `).join("");
}

function renderSummary(result) {
  $("unitCostKpi").textContent = formatRmb(result.termCost);
  $("suggestedPriceKpi").textContent = `${formatUsd(result.suggestedUsd)} / ${formatRmb(result.suggestedRmb)}`;
  $("floorPriceKpi").textContent = `${formatUsd(result.floorUsd)} / ${formatRmb(result.floorRmb)}`;
  const maxLoadRate = Math.max(0, ...result.loadingGroups.map((item) => item.loadRate || 0));
  $("loadRateKpi").textContent = pct.format(maxLoadRate);

  const tiers = [100, 300, 600, 1000].map((qty) => calculateTier(qty));
  $("tierList").innerHTML = tiers.map((tier) => `
    <article>
      <div><span>${tier.qty} 件</span><strong>${formatUsd(tier.priceUsd)}</strong></div>
      <div class="muted">${formatRmb(tier.costRmb)} / 毛利 ${pct.format(tier.margin)}</div>
    </article>
  `).join("");
}

function calculateTier(qty) {
  const oldQty = $("orderQty").value;
  $("orderQty").value = qty;
  const result = calculateQuote();
  $("orderQty").value = oldQty;
  return {
    qty,
    costRmb: result.termCost,
    priceUsd: result.suggestedUsd,
    margin: result.suggestedRmb ? (result.suggestedRmb - result.termCost) / result.suggestedRmb : 0
  };
}

function renderRisks(result) {
  const labels = { blocking: "阻断", approval: "审批", notice: "提醒" };
  $("riskList").innerHTML = result.risks.map((item) => `
    <article class="risk-card">
      <span class="severity ${item.level}">${labels[item.level]}</span>
      <div>
        <strong>${escapeHtml(item.code)}</strong>
        <p>${escapeHtml(item.message)}</p>
      </div>
    </article>
  `).join("");
}

function renderCustomerPreview(result) {
  const visibleLines = state.lines.filter((item) => item.visible);
  $("customerPreview").innerHTML = `
    <h3>Customer Quotation</h3>
    <p class="muted">This quotation is valid for ${numberValue("quoteValidityDays")} days. Freight is subject to final confirmation at booking date.</p>
    <div class="preview-meta">
      <div>Quote No.: <strong>${escapeHtml($("quoteNo").value)}</strong></div>
      <div>Customer: <strong>${escapeHtml($("customerName").value)}</strong></div>
      <div>Trade Term: <strong>${escapeHtml($("defaultTradeTerm").value)}</strong></div>
      <div>Destination: <strong>${escapeHtml($("destinationPort").value)}</strong></div>
    </div>
    <div class="preview-lines">
      ${visibleLines.map((item) => `
        <div class="preview-line">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <div class="muted">${escapeHtml(item.tradeTerm)} / ${item.separate ? "Separate quote" : "Included in set"}</div>
          </div>
          <strong>${item.separate ? formatUsd(item.unitCost / (numberValue("exchangeRate") || 1)) : formatUsd(result.suggestedUsd)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderInternalPreview(result) {
  $("internalPreview").innerHTML = `
    <div class="snapshot-list">
      <div><span>产品/BOM/包装快照</span><strong>${state.lines.length} 行</strong></div>
      <div><span>供应商报价快照</span><strong>${supplierQuotes.length} 条</strong></div>
      <div><span>物流费率快照</span><strong>${$("containerType").value}</strong></div>
      <div><span>汇率快照</span><strong>${numberValue("exchangeRate")}</strong></div>
      <div><span>阻断风险</span><strong>${result.risks.filter((item) => item.level === "blocking").length}</strong></div>
      <div><span>审批风险</span><strong>${result.risks.filter((item) => item.level === "approval").length}</strong></div>
    </div>
  `;
}

function renderStaticPanels() {
  $("productLibrary").innerHTML = productLibrary.map((item) => `
    <article>
      <strong>${escapeHtml(item.code)} ｜ ${escapeHtml(item.name)}</strong>
      <span>${escapeHtml(item.category)} ｜ ${escapeHtml(item.versions)}<br>${escapeHtml(item.packaging)} ｜ CBM ${item.cbm} ｜ KG ${item.weight}</span>
    </article>
  `).join("");

  $("supplierQuotes").innerHTML = `
    <table>
      <thead><tr><th>供应商</th><th>项目</th><th>价格口径</th><th>价格</th><th>有效期</th><th>状态</th></tr></thead>
      <tbody>
        ${supplierQuotes.map((item) => `
          <tr>
            <td>${escapeHtml(item.supplier)}</td>
            <td>${escapeHtml(item.item)}</td>
            <td>${escapeHtml(item.basis)}</td>
            <td>${item.currency} ${money.format(item.price)}</td>
            <td>${escapeHtml(item.validUntil)}</td>
            <td>${escapeHtml(item.status)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  const permissions = [
    ["业务员", "新建/复制报价、选择产品、生成客户版 PDF"],
    ["采购", "维护供应商报价和采购附件"],
    ["物流/单证", "维护港口、航线、柜型、运价、保险和杂费"],
    ["财务", "维护汇率、付款条款、佣金和汇率风险规则"],
    ["产品/工程", "维护产品规格、包装、BOM 和嵌套规则"],
    ["主管", "审批低毛利、DDP、手动成本、过期报价和高金额报价"],
    ["管理员", "用户权限、基础参数和审计日志"]
  ];
  $("permissionMatrix").innerHTML = `
    <table>
      <thead><tr><th>角色</th><th>权限重点</th></tr></thead>
      <tbody>${permissions.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join("")}</tbody>
    </table>
  `;
}

function saveSnapshot() {
  const result = calculateQuote();
  state.snapshots.unshift({
    at: new Date().toISOString(),
    quoteNo: $("quoteNo").value,
    total: result.suggestedUsd,
    risks: result.risks.length
  });
  $("statusNotice").innerHTML = `<strong class="success-text">快照已保存。</strong> 当前报价、产品行、物流参数、汇率和风险检查已记录在本机内存中。`;
}

function exportInternalWorkbook() {
  const result = calculateQuote();
  const rows = [
    ["Section", "Field", "Value"],
    ["Overview", "Quote No", $("quoteNo").value],
    ["Overview", "Customer", $("customerName").value],
    ["Overview", "Trade Term", $("defaultTradeTerm").value],
    ["Overview", "Suggested USD", result.suggestedUsd],
    ["Overview", "Term Cost RMB", result.termCost],
    ["Snapshot", "Exchange Rate", numberValue("exchangeRate")],
    ["Risk", "Blocking Count", result.risks.filter((item) => item.level === "blocking").length],
    ["Risk", "Approval Count", result.risks.filter((item) => item.level === "approval").length],
    ...state.lines.map((item) => ["Line", item.name, `${item.source}/${item.basis}/${item.path}/${item.unitCost}`]),
    ...result.risks.map((item) => ["Risk Detail", item.code, item.message])
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  download(`internal-quote-${$("quoteNo").value}.csv`, csv, "text/csv;charset=utf-8");
}

function printCustomerQuote() {
  document.querySelector(".customer-preview").closest(".panel").classList.add("print-target");
  window.print();
  window.setTimeout(() => document.querySelector(".print-target")?.classList.remove("print-target"), 300);
}

function download(fileName, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

init();
