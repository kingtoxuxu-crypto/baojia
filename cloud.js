(function () {
  const appApi = () => window.quoteApp;
  const DB_NAME = "sanitary-offline-quote-db";
  const DB_VERSION = 1;
  const SETTINGS_KEY = "sanitary-offline-quote-settings";
  const historyStorageKey = "toilet-bom-quote-history-v7";

  const erpPageMeta = {
    dashboard: { eyebrow: "Offline Dashboard", title: "离线经营驾驶舱", desc: "报价数据保存在本机浏览器，可备份、恢复和导出正式报价单。" },
    quote: { eyebrow: "Quote Module", title: "报价管理", desc: "马桶与台盆离线报价工作台，支持本机保存、版本和统一导出。" },
    factory: { eyebrow: "Factory Center", title: "工厂中心", desc: "集中维护工厂费率、人员工资与分摊规则，并实时驱动报价系统中的人工与制造成本。" },
    sales: { eyebrow: "Sales", title: "销售管理", desc: "沉淀报价到订单的销售链路，后续可继续扩展客户跟进、成交转化与回款管理。" },
    purchase: { eyebrow: "Purchase", title: "采购管理", desc: "从报价 BOM 向供应商价格、采购申请和外购件协同延伸，形成供应链闭环。" },
    production: { eyebrow: "Production", title: "生产管理", desc: "打通标准配置、工艺路线和排产计划，为报价后的工厂执行预留入口。" },
    finance: { eyebrow: "Finance", title: "财务管理", desc: "围绕成本、汇率、安全垫和利润分析做统一管理，承接报价到交付的数据口径。" },
    master: { eyebrow: "Master Data", title: "基础资料", desc: "集中维护客户、产品模板、价格规则和主数据，是报价系统持续演进的底座。" },
    system: { eyebrow: "Offline Data", title: "离线数据", desc: "管理本机 IndexedDB 数据、JSON 备份与客户报价默认条款。" }
  };
  const quotePageMeta = {
    workbench: { eyebrow: "Quote Workspace", title: "报价工作台", desc: "用于快速配置马桶/台盆报价参数、成本结构和正式报价结果。" },
    quotes: { eyebrow: "Offline Quote Center", title: "离线报价中心", desc: "搜索、打开、复制、版本化和备份本机报价单。" }
  };
  const systemPageMeta = {
    account: { eyebrow: "Offline Data", title: "离线数据", desc: "纯浏览器离线版，无需账号登录；请定期导出 JSON 备份。" }
  };
  const factoryPageMeta = {
    rates: { eyebrow: "Factory Rates", title: "工厂费率中心", desc: "维护原料成本和月度制造费率，作为报价中陶瓷成本与制造公摊的统一口径。" },
    process: { eyebrow: "Factory Process", title: "工序中心", desc: "维护核心工序的标准节拍和工序系数，把工艺难度真实映射到人工、能耗与质检成本。" },
    packaging: { eyebrow: "Factory Packaging", title: "包装中心", desc: "维护包装等级、外箱面积规则和产品包装外扩参数，让包装成本和装柜测算口径统一。" },
    personnel: { eyebrow: "Factory Personnel", title: "工厂人员中心", desc: "维护班组人数、工资与分摊比例，把人工成本从经验值升级为可维护的工厂参数。" }
  };

  const refs = {
    authStatusBadge: document.getElementById("authStatusBadge"),
    authOpenBtn: document.getElementById("authOpenBtn"),
    signOutBtn: document.getElementById("signOutBtn"),
    authModal: document.getElementById("authModal"),
    actionModal: document.getElementById("actionModal"),
    actionForm: document.getElementById("actionForm"),
    actionCloseBtn: document.getElementById("actionCloseBtn"),
    actionCancelBtn: document.getElementById("actionCancelBtn"),
    actionSubmitBtn: document.getElementById("actionSubmitBtn"),
    actionMessage: document.getElementById("actionMessage"),
    actionDialogEyebrow: document.getElementById("actionDialogEyebrow"),
    actionDialogTitle: document.getElementById("actionDialogTitle"),
    actionDialogDesc: document.getElementById("actionDialogDesc"),
    actionTextInputWrap: document.getElementById("actionTextInputWrap"),
    actionTextInputLabel: document.getElementById("actionTextInputLabel"),
    actionTextInput: document.getElementById("actionTextInput"),
    actionTextareaWrap: document.getElementById("actionTextareaWrap"),
    actionTextareaLabel: document.getElementById("actionTextareaLabel"),
    actionTextareaInput: document.getElementById("actionTextareaInput"),
    cloudStatus: document.getElementById("cloudStatus"),
    cloudSearchInput: document.getElementById("cloudSearchInput"),
    cloudSearchBtn: document.getElementById("cloudSearchBtn"),
    cloudRefreshBtn: document.getElementById("cloudRefreshBtn"),
    cloudSaveBtn: document.getElementById("cloudSaveBtn"),
    cloudQuoteList: document.getElementById("cloudQuoteList"),
    accountStatus: document.getElementById("accountStatus"),
    currentUserEmail: document.getElementById("currentUserEmail"),
    currentUserName: document.getElementById("currentUserName"),
    currentUserRole: document.getElementById("currentUserRole"),
    passwordForm: document.getElementById("passwordForm"),
    currentPasswordInput: document.getElementById("currentPasswordInput"),
    newPasswordInput: document.getElementById("newPasswordInput"),
    confirmPasswordInput: document.getElementById("confirmPasswordInput"),
    passwordMessage: document.getElementById("passwordMessage"),
    userAdminPanel: document.getElementById("userAdminPanel"),
    userCreateForm: document.getElementById("userCreateForm"),
    userTableBody: document.getElementById("userTableBody"),
    historyList: document.getElementById("historyList"),
    erpPageTitle: document.getElementById("erpPageTitle"),
    dashboardQuoteCount: document.getElementById("dashboardQuoteCount"),
    dashboardPendingCount: document.getElementById("dashboardPendingCount"),
    dashboardApprovedCount: document.getElementById("dashboardApprovedCount"),
    dashboardUserCount: document.getElementById("dashboardUserCount"),
    dashboardRecentList: document.getElementById("dashboardRecentList")
  };

  let dbPromise = null;
  let offlineQuotes = [];
  let quoteVersionsMap = new Map();
  let expandedQuoteVersionIds = new Set();
  let currentQuoteMeta = null;
  let actionDialogState = null;
  let currentErpPage = "dashboard";
  let currentPage = "workbench";
  let currentSystemPage = "account";
  let currentFactoryPage = "rates";

  function hasIndexedDb() {
    return Boolean(window.indexedDB);
  }

  function openDb() {
    if (!hasIndexedDb()) {
      return Promise.reject(new Error("当前浏览器不支持 IndexedDB，无法使用离线报价中心。"));
    }
    if (dbPromise) {
      return dbPromise;
    }
    dbPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("quotes")) {
          const store = db.createObjectStore("quotes", { keyPath: "id" });
          store.createIndex("quote_code", "quote_code", { unique: false });
          store.createIndex("quote_group_code", "quote_group_code", { unique: false });
          store.createIndex("updated_at", "updated_at", { unique: false });
          store.createIndex("status", "status", { unique: false });
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains("priceLibrary")) {
          db.createObjectStore("priceLibrary", { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains("productTemplates")) {
          db.createObjectStore("productTemplates", { keyPath: "key" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("IndexedDB 初始化失败"));
    });
    return dbPromise;
  }

  async function withStore(storeName, mode, callback) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      let result;
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error || new Error("本机数据库操作失败"));
      tx.onabort = () => reject(tx.error || new Error("本机数据库操作已中止"));
      result = callback(store);
    });
  }

  function requestToPromise(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("本机数据库请求失败"));
    });
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function uid() {
    return window.crypto?.randomUUID ? window.crypto.randomUUID() : `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function escapeHtml(text) {
    return String(text ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function getQuoteStatusLabel(status) {
    return {
      draft: "草稿",
      cost_reviewing: "待核价",
      pending_approval: "待审批",
      approved: "已批准",
      issued: "已外发",
      accepted: "客户接受",
      rejected: "客户拒绝",
      converted: "已转订单",
      expired: "已过期",
      cancelled: "已作废",
      pending: "待审批",
      sent: "已外发",
      final: "已转订单",
      archived: "已作废"
    }[status] || status || "-";
  }

  function getQuoteGroupCode(quoteCode = "") {
    return String(quoteCode || "").replace(/-V\d+$/i, "");
  }

  function normalizeQuoteStatus(status = "draft") {
    return {
      pending: "pending_approval",
      sent: "issued",
      final: "converted",
      archived: "cancelled"
    }[status] || status || "draft";
  }

  function formatVersionLabel(versionNo) {
    return `V${Number(versionNo || 1)}`;
  }

  function formatDateTime(value) {
    if (!value) {
      return "-";
    }
    return new Date(value).toLocaleString("zh-CN");
  }

  function formatCount(value) {
    return Number(value || 0).toLocaleString("zh-CN");
  }

  function getLocalQuoteHistory() {
    try {
      const raw = window.localStorage.getItem(historyStorageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  }

  function setCloudStatus(message, tone = "info") {
    const palette = {
      info: { bg: "#f0f9ff", border: "#bae6fd", color: "#0369a1" },
      success: { bg: "#f0fdf4", border: "#bbf7d0", color: "#15803d" },
      warn: { bg: "#fffbeb", border: "#fde68a", color: "#b45309" },
      error: { bg: "#fef2f2", border: "#fecaca", color: "#b91c1c" }
    }[tone] || {};
    refs.cloudStatus.style.background = palette.bg;
    refs.cloudStatus.style.borderColor = palette.border;
    refs.cloudStatus.style.color = palette.color;
    refs.cloudStatus.innerHTML = message;
  }

  function setInlineMessage(target, message = "", isError = true) {
    if (!target) {
      return;
    }
    target.textContent = message;
    target.style.color = isError ? "#dc2626" : "#0284c7";
  }

  function getSettings() {
    try {
      return {
        companyName: "Gold King Sanitaryware Co., Ltd.",
        paymentTerms: "T/T 30% deposit, balance before shipment.",
        quoteNote: "Prices are valid within quotation validity and subject to final order confirmation.",
        ...(JSON.parse(window.localStorage.getItem(SETTINGS_KEY) || "{}"))
      };
    } catch (error) {
      return {};
    }
  }

  async function saveSettings(settings) {
    const next = { ...getSettings(), ...settings };
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    await withStore("settings", "readwrite", (store) => store.put({ key: "customerQuote", value: next, updated_at: nowIso() }));
    renderAccountInfo();
    setInlineMessage(refs.passwordMessage, "默认设置已保存，将用于客户版 PDF/打印。", false);
    appApi().showToast("离线设置已保存");
  }

  async function getAllQuotesRaw() {
    return withStore("quotes", "readonly", (store) => requestToPromise(store.getAll()));
  }

  async function getAllStoreRows(storeName) {
    return withStore(storeName, "readonly", (store) => requestToPromise(store.getAll()));
  }

  async function putQuote(record) {
    return withStore("quotes", "readwrite", (store) => store.put(record));
  }

  async function getQuote(id) {
    return withStore("quotes", "readonly", (store) => requestToPromise(store.get(id)));
  }

  async function deleteQuoteRecord(id) {
    return withStore("quotes", "readwrite", (store) => store.delete(id));
  }

  function normalizeQuoteRow(record) {
    const now = nowIso();
    const quoteCode = record.quote_code || appApi().createQuoteCode();
    return {
      id: record.id || uid(),
      quote_code: quoteCode,
      quote_group_code: record.quote_group_code || getQuoteGroupCode(quoteCode),
      version_no: Number(record.version_no || 1),
      parent_quote_id: record.parent_quote_id || null,
      customer_name: record.customer_name || "",
      project_name: record.project_name || "",
      product_name: record.product_name || "",
      model_code: record.model_code || "",
      trade_term: record.trade_term || "",
      destination_market: record.destination_market || "",
      order_quantity: Number(record.order_quantity || 0),
      calc_mode: record.calc_mode || "unit",
      status: normalizeQuoteStatus(record.status || "draft"),
      approval_note: record.approval_note || "",
      form_json: record.form_json || {},
      rows_json: record.rows_json || [],
      budget_rows_json: record.budget_rows_json || [],
      summary_json: record.summary_json || {},
      price_library_json: record.price_library_json || {},
      collapsed_categories_json: record.collapsed_categories_json || {},
      totals_json: record.totals_json || {},
      created_at: record.created_at || now,
      updated_at: now
    };
  }

  function buildQuoteRecord() {
    const payload = appApi().buildQuotePayload();
    const currentStatus = currentQuoteMeta?.quoteCode === payload.quoteCode ? currentQuoteMeta?.status : "draft";
    const quoteCode = payload.quoteCode || appApi().createQuoteCode();
    return normalizeQuoteRow({
      id: currentQuoteMeta?.id || null,
      quote_code: quoteCode,
      quote_group_code: currentQuoteMeta?.quoteGroupCode || getQuoteGroupCode(quoteCode),
      version_no: currentQuoteMeta?.versionNo || 1,
      parent_quote_id: currentQuoteMeta?.parentQuoteId || null,
      customer_name: payload.form.customerName || "",
      project_name: payload.form.projectName || "",
      product_name: payload.form.productName || "",
      model_code: payload.form.modelCode || "",
      trade_term: payload.form.tradeTerm || "",
      destination_market: payload.form.destinationMarket || "",
      order_quantity: Number(payload.form.orderQuantity) || 0,
      calc_mode: payload.form.calcMode || "unit",
      status: currentStatus || "draft",
      approval_note: currentQuoteMeta?.approvalNote || "",
      form_json: payload.form,
      rows_json: payload.rows,
      budget_rows_json: payload.budgetRows,
      summary_json: payload.summary,
      price_library_json: payload.priceLibrary,
      collapsed_categories_json: payload.collapsedCategories,
      totals_json: payload.totals,
      created_at: currentQuoteMeta?.createdAt
    });
  }

  function toQuoteSummary(row, allRows) {
    const groupCode = row.quote_group_code || getQuoteGroupCode(row.quote_code || "");
    const versions = allRows.filter((item) => (item.quote_group_code || getQuoteGroupCode(item.quote_code || "")) === groupCode);
    return {
      ...row,
      version_count: versions.length || 1,
      latest_version_no: Math.max(...versions.map((item) => Number(item.version_no || 1)), 1),
      version_label: formatVersionLabel(row.version_no)
    };
  }

  function listLatestQuotes(allRows, keyword = "") {
    const clean = String(keyword || "").trim().toLowerCase();
    const filtered = clean
      ? allRows.filter((row) => [
        row.quote_code,
        row.quote_group_code,
        row.customer_name,
        row.project_name,
        row.product_name,
        row.model_code
      ].some((value) => String(value || "").toLowerCase().includes(clean)))
      : allRows;
    const latestByGroup = new Map();
    filtered.forEach((row) => {
      const groupCode = row.quote_group_code || getQuoteGroupCode(row.quote_code || "");
      const current = latestByGroup.get(groupCode);
      if (!current || Number(row.version_no || 1) > Number(current.version_no || 1) || new Date(row.updated_at || 0) > new Date(current.updated_at || 0)) {
        latestByGroup.set(groupCode, row);
      }
    });
    return [...latestByGroup.values()]
      .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
      .map((row) => toQuoteSummary(row, allRows));
  }

  function renderVersionList(quoteId) {
    const rows = quoteVersionsMap.get(quoteId) || [];
    if (!rows.length) {
      return `<div class="quote-version-empty">点击“查看版本”后，这里会展示当前报价主单下的全部历史版本。</div>`;
    }
    return rows.map((row) => `
      <article class="quote-version-item">
        <div class="quote-version-main">
          <strong>${escapeHtml(row.quote_code)}</strong>
          <div class="cloud-quote-meta">
            <span>版本：${escapeHtml(row.version_label || formatVersionLabel(row.version_no))}</span>
            <span>状态：<span class="status-chip ${escapeHtml(row.status || "draft")}">${escapeHtml(getQuoteStatusLabel(row.status || "draft"))}</span></span>
            <span>更新时间：${escapeHtml(formatDateTime(row.updated_at))}</span>
          </div>
          ${row.approval_note ? `<p class="quote-version-note">审批备注：${escapeHtml(row.approval_note)}</p>` : ""}
        </div>
        <div class="cloud-quote-actions">
          <button class="secondary quote-action-btn quote-action-secondary" type="button" data-action="open-cloud-quote" data-id="${escapeHtml(row.id)}">打开该版本</button>
          <button class="delete-btn quote-action-btn" type="button" data-action="delete-cloud-quote" data-id="${escapeHtml(row.id)}">删除版本</button>
        </div>
      </article>
    `).join("");
  }

  function getQuoteActionButtons(row) {
    const actions = [
      `<button class="primary quote-action-btn quote-action-primary" type="button" data-action="open-cloud-quote" data-id="${escapeHtml(row.id)}">打开编辑</button>`,
      `<button class="secondary quote-action-btn quote-action-secondary" type="button" data-action="toggle-quote-versions" data-id="${escapeHtml(row.id)}">${expandedQuoteVersionIds.has(row.id) ? "收起版本" : "查看版本"}</button>`,
      `<button class="secondary quote-action-btn quote-action-secondary" type="button" data-action="create-quote-version" data-id="${escapeHtml(row.id)}">新建版本</button>`,
      `<button class="secondary quote-action-btn quote-action-secondary" type="button" data-action="copy-cloud-quote" data-id="${escapeHtml(row.id)}">复制主单</button>`
    ];
    if (["draft", "cost_reviewing", "rejected", "expired"].includes(row.status)) {
      actions.push(`<button class="secondary quote-action-btn quote-action-secondary" type="button" data-action="submit-quote-approval" data-id="${escapeHtml(row.id)}">提交审批</button>`);
    }
    if (row.status === "pending_approval") {
      actions.push(`<button class="secondary quote-action-btn quote-action-approve" type="button" data-action="approve-quote" data-id="${escapeHtml(row.id)}">批准</button>`);
      actions.push(`<button class="secondary quote-action-btn quote-action-danger" type="button" data-action="reject-quote" data-id="${escapeHtml(row.id)}">驳回</button>`);
    }
    if (row.status === "approved") {
      actions.push(`<button class="secondary quote-action-btn quote-action-secondary" type="button" data-action="mark-quote-sent" data-id="${escapeHtml(row.id)}">标记已外发</button>`);
    }
    if (row.status === "issued" || row.status === "accepted") {
      actions.push(`<button class="secondary quote-action-btn quote-action-secondary" type="button" data-action="mark-quote-final" data-id="${escapeHtml(row.id)}">转订单</button>`);
    }
    actions.push(`<button class="delete-btn quote-action-btn" type="button" data-action="delete-cloud-quote" data-id="${escapeHtml(row.id)}">删除</button>`);
    return actions.join("");
  }

  function renderCloudList(rows) {
    if (!rows.length) {
      refs.cloudQuoteList.innerHTML = `<div class="empty-state">暂无离线报价单。点击“保存到本机”，即可把当前报价保存到 IndexedDB。</div>`;
      return;
    }
    refs.cloudQuoteList.innerHTML = rows.map((row) => `
      <article class="cloud-quote-item">
        <div class="cloud-quote-main">
          <strong>${escapeHtml(row.quote_code)}</strong>
          <p>${escapeHtml(row.customer_name || "未命名客户")} ｜ ${escapeHtml(row.project_name || "未命名项目")} ｜ ${escapeHtml(row.product_name || "未命名产品")}</p>
          <div class="cloud-quote-meta">
            <span>主单：${escapeHtml(row.quote_group_code || getQuoteGroupCode(row.quote_code || ""))}</span>
            <span>版本：${escapeHtml(row.version_label || formatVersionLabel(row.version_no))} / 共 ${escapeHtml(String(row.version_count || 1))} 版</span>
            <span>型号：${escapeHtml(row.model_code || "-")}</span>
            <span>数量：${escapeHtml(String(row.order_quantity || 0))} 件</span>
            <span>状态：<span class="status-chip ${escapeHtml(row.status || "draft")}">${escapeHtml(getQuoteStatusLabel(row.status || "draft"))}</span></span>
            <span>更新时间：${escapeHtml(formatDateTime(row.updated_at))}</span>
          </div>
          ${row.approval_note ? `<p class="quote-version-note">审批备注：${escapeHtml(row.approval_note)}</p>` : ""}
        </div>
        <div class="cloud-quote-actions">${getQuoteActionButtons(row)}</div>
        ${expandedQuoteVersionIds.has(row.id) ? `
          <div class="quote-version-panel">
            <div class="quote-version-head">
              <strong>版本历史</strong>
              <span>当前主单下共 ${escapeHtml(String(row.version_count || 1))} 个版本</span>
            </div>
            <div class="quote-version-list">${renderVersionList(row.id)}</div>
          </div>
        ` : ""}
      </article>
    `).join("");
  }

  function buildDashboardRecentRows() {
    const localRows = getLocalQuoteHistory().map((entry) => ({
      id: `quick-${entry.quoteCode || Math.random()}`,
      source: "快速保存",
      status: "local",
      title: entry.quoteCode || "未命名报价",
      summary: `${entry.form?.customerName || "未命名客户"} ｜ ${entry.form?.productName || "未命名产品"} ｜ ${entry.form?.orderQuantity || 0} 件`,
      meta: `保存时间：${formatDateTime(entry.savedAt)}`,
      sortTime: new Date(entry.savedAt || 0).getTime()
    }));
    const indexedRows = offlineQuotes.map((row) => ({
      id: `offline-${row.id}`,
      source: "离线库",
      status: row.status || "draft",
      title: row.quote_code || "未命名报价",
      summary: `${row.customer_name || "未命名客户"} ｜ ${row.project_name || "未命名项目"} ｜ ${row.product_name || "未命名产品"}`,
      meta: `更新时间：${formatDateTime(row.updated_at)}`,
      sortTime: new Date(row.updated_at || row.created_at || 0).getTime()
    }));
    return [...indexedRows, ...localRows].sort((a, b) => b.sortTime - a.sortTime).slice(0, 6);
  }

  function renderDashboard() {
    const allVersionsCount = offlineQuotes.length;
    const pendingCount = offlineQuotes.filter((row) => row.status === "pending").length;
    const approvedCount = offlineQuotes.filter((row) => ["approved", "sent", "final"].includes(row.status)).length;
    refs.dashboardQuoteCount.textContent = formatCount(allVersionsCount);
    refs.dashboardPendingCount.textContent = formatCount(pendingCount);
    refs.dashboardApprovedCount.textContent = formatCount(approvedCount);
    refs.dashboardUserCount.textContent = formatCount(allVersionsCount + 1);

    const recentRows = buildDashboardRecentRows();
    if (!recentRows.length) {
      refs.dashboardRecentList.innerHTML = `<div class="empty-state">暂无最近动态。保存报价后，这里会显示最新变化。</div>`;
      return;
    }
    refs.dashboardRecentList.innerHTML = recentRows.map((item) => `
      <article class="dashboard-list-item">
        <div class="dashboard-list-head">
          <strong>${escapeHtml(item.title)}</strong>
          <div class="dashboard-badges">
            <span class="dashboard-chip local">${escapeHtml(item.source)}</span>
            ${item.status === "local" ? "" : `<span class="status-chip ${escapeHtml(item.status)}">${escapeHtml(getQuoteStatusLabel(item.status))}</span>`}
          </div>
        </div>
        <p>${escapeHtml(item.summary)}</p>
        <div class="dashboard-list-meta">${escapeHtml(item.meta)}</div>
      </article>
    `).join("");
  }

  function renderAccountInfo() {
    const settings = getSettings();
    refs.currentUserEmail.textContent = "纯浏览器离线";
    refs.currentUserName.textContent = hasIndexedDb() ? "IndexedDB" : "不可用";
    refs.currentUserRole.textContent = "本机完全控制";
    refs.accountStatus.innerHTML = hasIndexedDb()
      ? `离线报价中心已启用。当前报价只保存在本机浏览器，请定期点击右上角 <strong>导出备份</strong>。`
      : `当前浏览器不支持 IndexedDB，请更换最新版 Chrome / Edge。`;
    refs.currentPasswordInput.value = settings.companyName || "";
    refs.newPasswordInput.value = settings.paymentTerms || "";
    refs.confirmPasswordInput.value = settings.quoteNote || "";
    refs.userAdminPanel?.classList.add("hidden");
  }

  function syncErpHeader() {
    const baseMeta = erpPageMeta[currentErpPage] || erpPageMeta.dashboard;
    const activeMeta = currentErpPage === "quote"
      ? (quotePageMeta[currentPage] || baseMeta)
      : currentErpPage === "system"
        ? (systemPageMeta[currentSystemPage] || baseMeta)
        : currentErpPage === "factory"
          ? (factoryPageMeta[currentFactoryPage] || baseMeta)
          : baseMeta;
    refs.erpPageTitle.textContent = activeMeta.title;
  }

  function switchPage(page) {
    currentPage = page;
    document.querySelectorAll("[data-quote-page-tab]").forEach((button) => button.classList.toggle("active", button.dataset.quotePageTab === page));
    document.querySelectorAll(".page-section").forEach((section) => section.classList.toggle("active", section.dataset.page === page));
    syncErpHeader();
  }

  function syncQuotePageUi() {
    document.querySelectorAll("[data-quote-page-tab]").forEach((button) => button.classList.toggle("active", button.dataset.quotePageTab === currentPage));
    document.querySelectorAll('[data-erp-parent-tab="quote"]').forEach((button) => button.classList.toggle("active", currentErpPage === "quote"));
    document.querySelectorAll('.erp-nav-tree[data-erp-nav-group="quote"]').forEach((tree) => tree.classList.toggle("open", currentErpPage === "quote"));
  }

  function syncSystemPageUi() {
    document.querySelectorAll("[data-system-page-tab]").forEach((button) => button.classList.toggle("active", button.dataset.systemPageTab === currentSystemPage));
    document.querySelectorAll(".system-subpage").forEach((section) => section.classList.toggle("active", section.dataset.systemPage === currentSystemPage));
    document.querySelectorAll('[data-erp-parent-tab="system"]').forEach((button) => button.classList.toggle("active", currentErpPage === "system"));
    document.querySelectorAll('.erp-nav-tree[data-erp-nav-group="system"]').forEach((tree) => tree.classList.toggle("open", currentErpPage === "system"));
  }

  function syncFactoryPageUi() {
    document.querySelectorAll(".factory-subpage").forEach((section) => section.classList.toggle("active", section.dataset.factoryPage === currentFactoryPage));
    document.querySelectorAll("[data-factory-page-tab]").forEach((button) => button.classList.toggle("active", button.dataset.factoryPageTab === currentFactoryPage));
    document.querySelectorAll('[data-erp-parent-tab="factory"]').forEach((button) => button.classList.toggle("active", currentErpPage === "factory"));
    document.querySelectorAll('.erp-nav-tree[data-erp-nav-group="factory"]').forEach((tree) => tree.classList.toggle("open", currentErpPage === "factory"));
  }

  function switchFactoryPage(page) {
    currentFactoryPage = factoryPageMeta[page] ? page : "rates";
    syncFactoryPageUi();
    syncErpHeader();
  }

  function switchSystemPage(page) {
    currentSystemPage = systemPageMeta[page] ? page : "account";
    syncSystemPageUi();
    syncErpHeader();
  }

  function switchErpPage(page, quotePage = currentPage, factoryPage = currentFactoryPage, systemPage = currentSystemPage) {
    currentErpPage = page;
    document.querySelectorAll(".erp-nav-item").forEach((button) => button.classList.toggle("active", button.dataset.erpPageTab === page));
    document.querySelectorAll(".erp-page").forEach((section) => section.classList.toggle("active", section.dataset.erpPage === page));
    if (page === "quote") {
      switchPage(quotePage);
    }
    if (page === "factory") {
      switchFactoryPage(factoryPage);
    }
    if (page === "system") {
      switchSystemPage(systemPage);
    }
    syncQuotePageUi();
    syncFactoryPageUi();
    syncSystemPageUi();
    syncErpHeader();
  }

  function closeActionDialog(result = null) {
    refs.actionModal.classList.add("hidden");
    refs.actionForm.dataset.mode = "";
    refs.actionForm.dataset.required = "";
    refs.actionMessage.textContent = "";
    refs.actionTextInputWrap.classList.add("hidden");
    refs.actionTextareaWrap.classList.add("hidden");
    refs.actionTextInput.value = "";
    refs.actionTextareaInput.value = "";
    const resolver = actionDialogState?.resolve;
    actionDialogState = null;
    if (typeof resolver === "function") {
      resolver(result);
    }
  }

  function openActionDialog(options = {}) {
    const {
      eyebrow = "Offline Workflow",
      title = "处理操作",
      desc = "请确认本次操作内容。",
      submitText = "确认",
      inputMode = "none",
      label = "内容",
      placeholder = "",
      required = false
    } = options;
    refs.actionDialogEyebrow.textContent = eyebrow;
    refs.actionDialogTitle.textContent = title;
    refs.actionDialogDesc.textContent = desc;
    refs.actionSubmitBtn.textContent = submitText;
    refs.actionForm.dataset.mode = inputMode;
    refs.actionForm.dataset.required = required ? "true" : "false";
    refs.actionMessage.textContent = "";
    refs.actionTextInputWrap.classList.toggle("hidden", inputMode !== "input");
    refs.actionTextareaWrap.classList.toggle("hidden", inputMode !== "textarea");
    refs.actionTextInputLabel.textContent = label;
    refs.actionTextareaLabel.textContent = label;
    refs.actionTextInput.placeholder = placeholder;
    refs.actionTextareaInput.placeholder = placeholder;
    refs.actionModal.classList.remove("hidden");
    return new Promise((resolve) => {
      actionDialogState = { resolve };
    });
  }

  async function refreshOfflineQuotes() {
    try {
      const allRows = await getAllQuotesRaw();
      offlineQuotes = [...allRows].sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
      const rows = listLatestQuotes(offlineQuotes, refs.cloudSearchInput.value);
      renderCloudList(rows);
      renderDashboard();
      setCloudStatus(`已加载 <strong>${rows.length}</strong> 张主报价单，共 <strong>${offlineQuotes.length}</strong> 个版本。`, "success");
    } catch (error) {
      offlineQuotes = [];
      renderCloudList([]);
      renderDashboard();
      setCloudStatus(`离线库加载失败：${escapeHtml(error.message)}`, "error");
    }
  }

  async function refreshQuoteVersions(quoteId) {
    const quote = await getQuote(quoteId);
    if (!quote) {
      quoteVersionsMap.set(quoteId, []);
      return;
    }
    const groupCode = quote.quote_group_code || getQuoteGroupCode(quote.quote_code || "");
    const rows = offlineQuotes
      .filter((row) => (row.quote_group_code || getQuoteGroupCode(row.quote_code || "")) === groupCode)
      .sort((a, b) => Number(b.version_no || 1) - Number(a.version_no || 1))
      .map((row) => toQuoteSummary(row, offlineQuotes));
    quoteVersionsMap.set(quoteId, rows);
  }

  function isFrozenQuoteStatus(status) {
    return ["approved", "issued", "accepted", "converted", "cancelled", "final", "sent", "archived"].includes(String(status || "").toLowerCase());
  }

  async function createQuoteVersion(quoteId, useCurrentPayload = false) {
    const source = await getQuote(quoteId);
    if (!source) {
      throw new Error("源报价单不存在");
    }
    const groupCode = source.quote_group_code || getQuoteGroupCode(source.quote_code || "");
    const versions = offlineQuotes.filter((row) => (row.quote_group_code || getQuoteGroupCode(row.quote_code || "")) === groupCode);
    const nextVersionNo = Math.max(...versions.map((row) => Number(row.version_no || 1)), 1) + 1;
    const currentPayload = useCurrentPayload ? appApi().buildQuotePayload() : null;
    const nextRecord = normalizeQuoteRow({
      ...source,
      id: uid(),
      quote_code: `${groupCode}-V${nextVersionNo}`,
      quote_group_code: groupCode,
      version_no: nextVersionNo,
      parent_quote_id: source.parent_quote_id || source.id,
      status: "draft",
      approval_note: "",
      form_json: currentPayload?.form || source.form_json,
      rows_json: currentPayload?.rows || source.rows_json,
      budget_rows_json: currentPayload?.budgetRows || source.budget_rows_json,
      summary_json: currentPayload?.summary || source.summary_json,
      price_library_json: currentPayload?.priceLibrary || source.price_library_json,
      collapsed_categories_json: currentPayload?.collapsedCategories || source.collapsed_categories_json,
      totals_json: currentPayload?.totals || source.totals_json,
      created_at: nowIso()
    });
    await putQuote(nextRecord);
    await refreshOfflineQuotes();
    return nextRecord;
  }

  async function ensureEditableQuoteBeforeSave() {
    if (!currentQuoteMeta?.id || !isFrozenQuoteStatus(currentQuoteMeta.status)) {
      return true;
    }
    const confirmed = await openActionDialog({
      title: "已确认版本不能直接覆盖",
      desc: "当前单据已批准或最终确认。系统会新建一个本地版本保存你的修改，原版本保持冻结。",
      submitText: "新建版本并保存"
    });
    if (!confirmed) {
      setCloudStatus("已取消保存。原版本未被覆盖。", "warn");
      return false;
    }
    const nextRecord = await createQuoteVersion(currentQuoteMeta.id, true);
    currentQuoteMeta = {
      id: nextRecord.id,
      quoteCode: nextRecord.quote_code,
      quoteGroupCode: nextRecord.quote_group_code,
      versionNo: nextRecord.version_no,
      parentQuoteId: nextRecord.parent_quote_id || null,
      approvalNote: "",
      status: nextRecord.status,
      createdAt: nextRecord.created_at
    };
    appApi().applyQuotePayload({
      quoteCode: nextRecord.quote_code,
      form: nextRecord.form_json,
      rows: nextRecord.rows_json,
      budgetRows: nextRecord.budget_rows_json,
      summary: nextRecord.summary_json,
      priceLibrary: nextRecord.price_library_json,
      collapsedCategories: nextRecord.collapsed_categories_json
    });
    return false;
  }

  async function saveCurrentQuoteOffline() {
    refs.cloudSaveBtn.disabled = true;
    refs.cloudSaveBtn.textContent = "保存中...";
    try {
      const canContinue = await ensureEditableQuoteBeforeSave();
      if (!canContinue) {
        await refreshOfflineQuotes();
        return;
      }
      const record = buildQuoteRecord();
      await putQuote(record);
      await withStore("priceLibrary", "readwrite", (store) => store.put({ key: "current", value: record.price_library_json || {}, updated_at: nowIso() }));
      const templateOptions = [...document.querySelectorAll("#templateSelect option")].map((option) => ({ id: option.value, label: option.textContent }));
      await withStore("productTemplates", "readwrite", (store) => store.put({ key: "selectable", value: templateOptions, updated_at: nowIso() }));
      currentQuoteMeta = {
        id: record.id,
        quoteCode: record.quote_code,
        quoteGroupCode: record.quote_group_code,
        versionNo: record.version_no,
        parentQuoteId: record.parent_quote_id || null,
        approvalNote: record.approval_note || "",
        status: record.status,
        createdAt: record.created_at
      };
      appApi().showToast("当前报价已保存到本机");
      setCloudStatus(`报价单 <strong>${escapeHtml(record.quote_code)}</strong> 已保存到本机 IndexedDB。`, "success");
      await refreshOfflineQuotes();
    } catch (error) {
      setCloudStatus(`保存失败：${escapeHtml(error.message || "未知错误")}`, "error");
      appApi().showToast("离线保存失败");
    } finally {
      refs.cloudSaveBtn.disabled = false;
      refs.cloudSaveBtn.textContent = "保存到本机";
    }
  }

  async function openOfflineQuote(id) {
    const data = await getQuote(id);
    if (!data) {
      setCloudStatus("报价单不存在，可能已被删除。", "error");
      return;
    }
    currentQuoteMeta = {
      id: data.id,
      quoteCode: data.quote_code,
      quoteGroupCode: data.quote_group_code,
      versionNo: data.version_no,
      parentQuoteId: data.parent_quote_id || null,
      approvalNote: data.approval_note || "",
      status: data.status,
      createdAt: data.created_at
    };
    appApi().applyQuotePayload({
      version: data.version || "bom-v7",
      quoteCode: data.quote_code,
      form: data.form_json || {},
      rows: data.rows_json || [],
      budgetRows: data.budget_rows_json || [],
      summary: data.summary_json || {},
      priceLibrary: data.price_library_json || {},
      collapsedCategories: data.collapsed_categories_json || {}
    });
    switchErpPage("quote", "workbench");
    setCloudStatus(`已打开离线报价单 <strong>${escapeHtml(data.quote_code)}</strong>。`, "success");
    appApi().showToast("离线报价单已加载");
  }

  async function updateQuoteStatus(quoteId, status, approvalNote = "") {
    const row = await getQuote(quoteId);
    if (!row) {
      throw new Error("报价单不存在");
    }
    const next = normalizeQuoteRow({
      ...row,
      id: row.id,
      status,
      approval_note: approvalNote || row.approval_note || "",
      created_at: row.created_at
    });
    await putQuote(next);
    if (currentQuoteMeta?.id === quoteId) {
      currentQuoteMeta.status = next.status;
      currentQuoteMeta.approvalNote = next.approval_note;
    }
    await refreshOfflineQuotes();
    appApi().showToast("报价状态已更新");
  }

  async function copyQuote(quoteId) {
    const source = await getQuote(quoteId);
    if (!source) {
      throw new Error("源报价单不存在");
    }
    const nextCode = appApi().createQuoteCode();
    const copy = normalizeQuoteRow({
      ...source,
      id: uid(),
      quote_code: nextCode,
      quote_group_code: nextCode,
      version_no: 1,
      parent_quote_id: null,
      status: "draft",
      approval_note: "",
      created_at: nowIso()
    });
    await putQuote(copy);
    await refreshOfflineQuotes();
    await openOfflineQuote(copy.id);
    appApi().showToast("报价单已复制");
  }

  async function deleteQuote(quoteId) {
    await deleteQuoteRecord(quoteId);
    if (currentQuoteMeta?.id === quoteId) {
      currentQuoteMeta = null;
    }
    await refreshOfflineQuotes();
    appApi().showToast("报价单已删除");
  }

  function downloadBlob(fileName, blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function exportBackup() {
    const payload = {
      exportedAt: nowIso(),
      app: "sanitary-offline-quote",
      version: 1,
      settings: getSettings(),
      quotes: await getAllQuotesRaw(),
      settingsStore: await getAllStoreRows("settings"),
      priceLibrary: await getAllStoreRows("priceLibrary"),
      productTemplates: await getAllStoreRows("productTemplates"),
      localHistory: getLocalQuoteHistory()
    };
    downloadBlob(`offline-quotes-backup-${new Date().toISOString().slice(0, 10)}.json`, new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" }));
    appApi().showToast("离线备份已导出");
  }

  function importBackup() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) {
        return;
      }
      try {
        const payload = JSON.parse(await file.text());
        if (!Array.isArray(payload.quotes)) {
          throw new Error("备份文件中没有 quotes 数组");
        }
        const confirmed = window.confirm("导入备份会覆盖当前离线报价库。是否继续？");
        if (!confirmed) {
          return;
        }
        await withStore("quotes", "readwrite", (store) => {
          const clearRequest = store.clear();
          clearRequest.onsuccess = () => payload.quotes.forEach((row) => store.put(normalizeQuoteRow(row)));
          return clearRequest;
        });
        if (Array.isArray(payload.priceLibrary)) {
          await withStore("priceLibrary", "readwrite", (store) => {
            const clearRequest = store.clear();
            clearRequest.onsuccess = () => payload.priceLibrary.forEach((row) => store.put(row));
            return clearRequest;
          });
        }
        if (Array.isArray(payload.productTemplates)) {
          await withStore("productTemplates", "readwrite", (store) => {
            const clearRequest = store.clear();
            clearRequest.onsuccess = () => payload.productTemplates.forEach((row) => store.put(row));
            return clearRequest;
          });
        }
        if (payload.settings) {
          await saveSettings(payload.settings);
        }
        if (Array.isArray(payload.localHistory)) {
          window.localStorage.setItem(historyStorageKey, JSON.stringify(payload.localHistory));
        }
        await refreshOfflineQuotes();
        setCloudStatus(`已导入 <strong>${payload.quotes.length}</strong> 条报价版本。`, "success");
        appApi().showToast("备份导入完成");
      } catch (error) {
        setCloudStatus(`导入失败：${escapeHtml(error.message)}`, "error");
      }
    });
    input.click();
  }

  function bindEvents() {
    refs.authOpenBtn.addEventListener("click", importBackup);
    refs.signOutBtn.addEventListener("click", () => exportBackup().catch((error) => setCloudStatus(`导出失败：${escapeHtml(error.message)}`, "error")));
    refs.cloudSaveBtn.addEventListener("click", saveCurrentQuoteOffline);
    refs.cloudSearchBtn.addEventListener("click", refreshOfflineQuotes);
    refs.cloudRefreshBtn.addEventListener("click", refreshOfflineQuotes);
    refs.cloudSearchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        refreshOfflineQuotes();
      }
    });
    appApi()?.refs?.saveQuoteBtn?.addEventListener("click", () => window.setTimeout(renderDashboard, 0));
    appApi()?.refs?.loadTemplateBtn?.addEventListener("click", () => window.setTimeout(() => switchErpPage("quote", "workbench"), 0));

    refs.actionCloseBtn.addEventListener("click", () => closeActionDialog(null));
    refs.actionCancelBtn.addEventListener("click", () => closeActionDialog(null));
    refs.actionModal.addEventListener("click", (event) => {
      if (event.target === refs.actionModal) {
        closeActionDialog(null);
      }
    });
    refs.actionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const mode = refs.actionForm.dataset.mode;
      const required = refs.actionForm.dataset.required === "true";
      const value = mode === "textarea" ? refs.actionTextareaInput.value : mode === "input" ? refs.actionTextInput.value : true;
      if (required && !String(value || "").trim()) {
        refs.actionMessage.textContent = "请先填写必填内容。";
        return;
      }
      closeActionDialog(value);
    });

    document.addEventListener("click", (event) => {
      const erpParentButton = event.target.closest("[data-erp-parent-tab]");
      if (erpParentButton) {
        const tree = erpParentButton.closest(".erp-nav-tree");
        const page = erpParentButton.dataset.erpParentTab;
        if (currentErpPage === page) {
          tree?.classList.toggle("open");
        } else {
          switchErpPage(page, currentPage, currentFactoryPage, currentSystemPage);
          tree?.classList.add("open");
        }
        return;
      }
      const quoteButton = event.target.closest("[data-quote-page-tab]");
      if (quoteButton) {
        switchErpPage("quote", quoteButton.dataset.quotePageTab, currentFactoryPage, currentSystemPage);
        return;
      }
      const factoryButton = event.target.closest("[data-factory-page-tab]");
      if (factoryButton) {
        switchErpPage("factory", currentPage, factoryButton.dataset.factoryPageTab, currentSystemPage);
        return;
      }
      const systemButton = event.target.closest("[data-system-page-tab]");
      if (systemButton) {
        switchErpPage("system", currentPage, currentFactoryPage, systemButton.dataset.systemPageTab);
        return;
      }
      const erpButton = event.target.closest("[data-erp-page-tab]");
      if (erpButton) {
        switchErpPage(erpButton.dataset.erpPageTab, currentPage, erpButton.dataset.factoryPageTab || currentFactoryPage, erpButton.dataset.systemPageTab || currentSystemPage);
        return;
      }
      const quickButton = event.target.closest("[data-open-erp-page]");
      if (quickButton) {
        switchErpPage(
          quickButton.dataset.openErpPage,
          quickButton.dataset.openQuotePage || currentPage,
          quickButton.dataset.openFactoryPage || currentFactoryPage,
          quickButton.dataset.openSystemPage || currentSystemPage
        );
        return;
      }
      if (event.target.closest(".history-item")) {
        window.setTimeout(() => {
          switchErpPage("quote", "workbench");
          renderDashboard();
        }, 0);
      }
    });

    refs.cloudQuoteList.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) {
        return;
      }
      const action = button.dataset.action;
      const quoteId = button.dataset.id;
      try {
        if (action === "open-cloud-quote") {
          await openOfflineQuote(quoteId);
        } else if (action === "copy-cloud-quote") {
          await copyQuote(quoteId);
        } else if (action === "toggle-quote-versions") {
          if (expandedQuoteVersionIds.has(quoteId)) {
            expandedQuoteVersionIds.delete(quoteId);
          } else {
            expandedQuoteVersionIds.add(quoteId);
            await refreshQuoteVersions(quoteId);
          }
          renderCloudList(listLatestQuotes(offlineQuotes, refs.cloudSearchInput.value));
        } else if (action === "create-quote-version") {
          const created = await createQuoteVersion(quoteId);
          expandedQuoteVersionIds.add(quoteId);
          await openOfflineQuote(created.id);
        } else if (action === "submit-quote-approval") {
          await updateQuoteStatus(quoteId, "pending_approval");
        } else if (action === "approve-quote") {
          const note = await openActionDialog({ title: "批准报价", desc: "可填写审批备注，也可以留空直接批准。", submitText: "确认批准", inputMode: "textarea", label: "审批备注" });
          if (note !== null) await updateQuoteStatus(quoteId, "approved", note);
        } else if (action === "reject-quote") {
          const note = await openActionDialog({ title: "驳回报价", desc: "驳回时必须填写原因，便于修改后重新提交。", submitText: "确认驳回", inputMode: "textarea", label: "驳回原因", required: true });
          if (note !== null) await updateQuoteStatus(quoteId, "rejected", note);
        } else if (action === "mark-quote-sent") {
          await updateQuoteStatus(quoteId, "issued");
        } else if (action === "mark-quote-final") {
          await updateQuoteStatus(quoteId, "converted");
        } else if (action === "delete-cloud-quote") {
          if (window.confirm("确认删除这张报价单吗？删除后不可恢复。")) {
            await deleteQuote(quoteId);
          }
        }
      } catch (error) {
        setCloudStatus(`操作失败：${escapeHtml(error.message)}`, "error");
      }
    });

    refs.passwordForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await saveSettings({
        companyName: refs.currentPasswordInput.value.trim(),
        paymentTerms: refs.newPasswordInput.value.trim(),
        quoteNote: refs.confirmPasswordInput.value.trim()
      });
    });

    refs.userCreateForm?.addEventListener("submit", (event) => event.preventDefault());
    refs.userTableBody?.addEventListener("click", (event) => event.preventDefault());
  }

  async function initOffline() {
    document.body.classList.remove("auth-required", "role-viewer");
    document.body.classList.add("role-admin");
    refs.authModal?.classList.add("hidden");
    refs.actionModal?.classList.add("hidden");
    refs.authStatusBadge.textContent = "离线模式 / 本机保存";
    refs.authOpenBtn.textContent = "导入备份";
    refs.signOutBtn.textContent = "导出备份";
    refs.signOutBtn.hidden = false;
    refs.cloudSaveBtn.disabled = false;
    refs.cloudSearchBtn.disabled = false;
    refs.cloudRefreshBtn.disabled = false;
    refs.cloudSearchInput.disabled = false;
    bindEvents();
    renderAccountInfo();
    switchErpPage("dashboard");
    if (!hasIndexedDb()) {
      setCloudStatus("当前浏览器不支持 IndexedDB，请使用最新版 Edge / Chrome。", "error");
      renderDashboard();
      return;
    }
    await openDb();
    await refreshOfflineQuotes();
  }

  initOffline().catch((error) => {
    setCloudStatus(`离线系统初始化失败：${escapeHtml(error.message)}`, "error");
  });
})();
