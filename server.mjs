import "dotenv/config";
import crypto from "crypto";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cookieParser from "cookie-parser";
import mysql from "mysql2/promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SESSION_COOKIE = "quote_session";
const VALID_ROLES = new Set([
  "admin",
  "supervisor",
  "sales",
  "procurement",
  "logistics",
  "finance",
  "product",
  "editor",
  "viewer"
]);
const ROLE_LABELS = {
  admin: "管理员",
  supervisor: "主管",
  sales: "业务员",
  procurement: "采购",
  logistics: "物流/单证",
  finance: "财务",
  product: "产品/工程",
  editor: "编辑者",
  viewer: "只读查看者"
};
const DEV_LOCAL_MODE = process.env.DEV_LOCAL_MODE === "true";
const LOCAL_DATA_DIR = path.join(__dirname, ".local-data");
const LOCAL_DB_FILE = path.join(LOCAL_DATA_DIR, "dev-db.json");

function requiredEnv(name, fallback = "") {
  const value = process.env[name] || fallback;
  if (!value) {
    throw new Error(`缺少环境变量 ${name}`);
  }
  return value;
}

const pool = DEV_LOCAL_MODE ? null : mysql.createPool({
  host: requiredEnv("DB_HOST"),
  port: Number(process.env.DB_PORT || 3306),
  user: requiredEnv("DB_USER"),
  password: requiredEnv("DB_PASSWORD"),
  database: requiredEnv("DB_NAME"),
  connectionLimit: 10,
  charset: "utf8mb4"
});

let localDbCache = null;

function nowIso() {
  return new Date().toISOString();
}

function toMysqlishDate(value) {
  return new Date(value).toISOString().slice(0, 19).replace("T", " ");
}

function makeQuoteCopyCode(sourceCode) {
  const stamp = new Date().toISOString().replaceAll(/[-:TZ.]/g, "").slice(0, 14);
  return `${sourceCode}-COPY-${stamp}`;
}

async function ensureLocalDb() {
  if (!DEV_LOCAL_MODE) {
    return null;
  }
  if (localDbCache) {
    return localDbCache;
  }
  if (!fs.existsSync(LOCAL_DATA_DIR)) {
    fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DB_FILE)) {
    const seedAdminEmail = process.env.DEV_ADMIN_EMAIL || "admin@goldking6.top";
    const seedAdminPassword = process.env.DEV_ADMIN_PASSWORD || "King666";
    const seed = {
      users: [{
        id: crypto.randomUUID(),
        email: seedAdminEmail,
        full_name: "本地管理员",
        role: "admin",
        password_hash: hashPassword(seedAdminPassword),
        is_active: 1,
        created_at: nowIso(),
        updated_at: nowIso()
      }],
      sessions: [],
      quotes: []
    };
    await fsp.writeFile(LOCAL_DB_FILE, JSON.stringify(seed, null, 2), "utf8");
  }
  localDbCache = JSON.parse(await fsp.readFile(LOCAL_DB_FILE, "utf8"));
  return localDbCache;
}

async function persistLocalDb(db) {
  localDbCache = db;
  await fsp.writeFile(LOCAL_DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

async function query(sql, params = []) {
  if (DEV_LOCAL_MODE) {
    const db = await ensureLocalDb();
    const normalized = sql.replace(/\s+/g, " ").trim().toLowerCase();

    if (normalized.startsWith("insert into sessions")) {
      db.sessions.push({
        id: params[0],
        user_id: params[1],
        expires_at: new Date(params[2]).toISOString(),
        created_at: nowIso()
      });
      await persistLocalDb(db);
      return [];
    }

    if (normalized.includes("from sessions s join users u")) {
      const session = db.sessions.find((item) => item.id === params[0] && item.user_id === params[1] && new Date(item.expires_at) > new Date());
      if (!session) {
        return [];
      }
      const user = db.users.find((item) => item.id === session.user_id && Number(item.is_active) === 1);
      if (!user) {
        return [];
      }
      return [{
        session_id: session.id,
        expires_at: session.expires_at,
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        is_active: user.is_active
      }];
    }

    if (normalized.startsWith("select id, email, full_name, role, is_active, password_hash from users where email")) {
      return db.users.filter((item) => item.email === params[0]).slice(0, 1);
    }

    if (normalized.startsWith("select id, password_hash from users where id")) {
      return db.users.filter((item) => item.id === params[0]).map((item) => ({
        id: item.id,
        password_hash: item.password_hash
      })).slice(0, 1);
    }

    if (normalized.startsWith("update users set password_hash = ? where id = ?")) {
      const target = db.users.find((item) => item.id === params[1]);
      if (target) {
        target.password_hash = params[0];
        target.updated_at = nowIso();
        await persistLocalDb(db);
      }
      return [];
    }

    if (normalized.startsWith("delete from sessions where user_id = ? and id <> ?")) {
      db.sessions = db.sessions.filter((item) => !(item.user_id === params[0] && item.id !== params[1]));
      await persistLocalDb(db);
      return [];
    }

    if (normalized.startsWith("select id, email, full_name, role, is_active, created_at, updated_at from users order by created_at asc")) {
      return [...db.users].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((item) => ({
        ...item,
        created_at: toMysqlishDate(item.created_at),
        updated_at: toMysqlishDate(item.updated_at)
      }));
    }

    if (normalized.startsWith("insert into users (id, email, full_name, role, password_hash, is_active)")) {
      if (db.users.some((item) => item.email === params[1])) {
        const error = new Error("Duplicate entry");
        throw error;
      }
      db.users.push({
        id: params[0],
        email: params[1],
        full_name: params[2],
        role: params[3],
        password_hash: params[4],
        is_active: 1,
        created_at: nowIso(),
        updated_at: nowIso()
      });
      await persistLocalDb(db);
      return [];
    }

    if (normalized.startsWith("select id, email, role, is_active from users where id")) {
      return db.users.filter((item) => item.id === params[0]).map((item) => ({
        id: item.id,
        email: item.email,
        role: item.role,
        is_active: item.is_active
      })).slice(0, 1);
    }

    if (normalized.startsWith("update users set ")) {
      const targetId = params[params.length - 1];
      const target = db.users.find((item) => item.id === targetId);
      if (target) {
        let index = 0;
        if (sql.includes("full_name = ?")) {
          target.full_name = params[index++];
        }
        if (sql.includes("role = ?")) {
          target.role = params[index++];
        }
        if (sql.includes("is_active = ?")) {
          target.is_active = params[index++];
        }
        if (sql.includes("password_hash = ?")) {
          target.password_hash = params[index++];
        }
        target.updated_at = nowIso();
        await persistLocalDb(db);
      }
      return [];
    }

    if (normalized.startsWith("delete from sessions where user_id = ?")) {
      db.sessions = db.sessions.filter((item) => item.user_id !== params[0]);
      await persistLocalDb(db);
      return [];
    }

    if (normalized.startsWith("delete from sessions where id = ?")) {
      db.sessions = db.sessions.filter((item) => item.id !== params[0]);
      await persistLocalDb(db);
      return [];
    }

    if (normalized.includes("from quotes where quote_code like ? or customer_name like ?")) {
      const like = String(params[0] || "").replaceAll("%", "").toLowerCase();
      return db.quotes
        .filter((item) => [item.quote_code, item.customer_name, item.project_name, item.product_name, item.model_code]
          .some((field) => String(field || "").toLowerCase().includes(like)))
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 30)
        .map((item) => ({
          id: item.id,
          quote_code: item.quote_code,
          customer_name: item.customer_name,
          project_name: item.project_name,
          product_name: item.product_name,
          model_code: item.model_code,
          order_quantity: item.order_quantity,
          status: item.status,
          updated_at: toMysqlishDate(item.updated_at)
        }));
    }

    if (normalized.startsWith("select id, quote_code, customer_name, project_name, product_name, model_code, order_quantity, status, updated_at from quotes order by updated_at desc")) {
      return db.quotes
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 30)
        .map((item) => ({
          id: item.id,
          quote_code: item.quote_code,
          customer_name: item.customer_name,
          project_name: item.project_name,
          product_name: item.product_name,
          model_code: item.model_code,
          order_quantity: item.order_quantity,
          status: item.status,
          updated_at: toMysqlishDate(item.updated_at)
        }));
    }

    if (normalized.startsWith("select id, quote_code, customer_name, project_name, product_name, model_code, order_quantity, status, updated_at from quotes where quote_code = ?")) {
      return db.quotes
        .filter((item) => item.quote_code === params[0])
        .map((item) => ({
          id: item.id,
          quote_code: item.quote_code,
          customer_name: item.customer_name,
          project_name: item.project_name,
          product_name: item.product_name,
          model_code: item.model_code,
          order_quantity: item.order_quantity,
          status: item.status,
          updated_at: toMysqlishDate(item.updated_at)
        }))
        .slice(0, 1);
    }

    if (normalized.startsWith("update quotes set status = ?, updated_by = ? where id = ?")) {
      const target = db.quotes.find((item) => item.id === params[2]);
      if (target) {
        target.status = params[0];
        target.updated_by = params[1];
        target.updated_at = nowIso();
        await persistLocalDb(db);
      }
      return [];
    }

    if (normalized.startsWith("select id, quote_code, customer_name, project_name, product_name, model_code, order_quantity, status, updated_at from quotes where id = ?")) {
      return db.quotes
        .filter((item) => item.id === params[0])
        .map((item) => ({
          id: item.id,
          quote_code: item.quote_code,
          customer_name: item.customer_name,
          project_name: item.project_name,
          product_name: item.product_name,
          model_code: item.model_code,
          order_quantity: item.order_quantity,
          status: item.status,
          updated_at: toMysqlishDate(item.updated_at)
        }))
        .slice(0, 1);
    }

    if (normalized.startsWith("select id, quote_code, customer_name, project_name, product_name, model_code, trade_term")) {
      return db.quotes
        .filter((item) => item.id === params[0])
        .map((item) => ({ ...item }))
        .slice(0, 1);
    }

    if (normalized.startsWith("select * from quotes where id = ?")) {
      return db.quotes.filter((item) => item.id === params[0]).map((item) => ({ ...item })).slice(0, 1);
    }

    if (normalized.startsWith("insert into quotes (")) {
      const existing = db.quotes.find((item) => item.quote_code === params[0]);
      const payload = {
        id: existing?.id || crypto.randomUUID(),
        quote_code: params[0],
        customer_name: params[1],
        project_name: params[2],
        product_name: params[3],
        model_code: params[4],
        trade_term: params[5],
        destination_market: params[6],
        order_quantity: params[7],
        calc_mode: params[8],
        status: params[9],
        form_json: params[10],
        rows_json: params[11],
        budget_rows_json: params[12],
        summary_json: params[13],
        price_library_json: params[14],
        collapsed_categories_json: params[15],
        totals_json: params[16],
        created_by: existing?.created_by || params[17],
        updated_by: params[18],
        created_at: existing?.created_at || nowIso(),
        updated_at: nowIso()
      };
      if (existing) {
        Object.assign(existing, payload);
      } else {
        db.quotes.push(payload);
      }
      await persistLocalDb(db);
      return [];
    }

    if (normalized.startsWith("select id, quote_code from quotes where id = ?")) {
      return db.quotes
        .filter((item) => item.id === params[0])
        .map((item) => ({ id: item.id, quote_code: item.quote_code }))
        .slice(0, 1);
    }

    if (normalized.startsWith("delete from quotes where id = ?")) {
      db.quotes = db.quotes.filter((item) => item.id !== params[0]);
      await persistLocalDb(db);
      return [];
    }

    throw new Error(`本地开发模式未覆盖该查询: ${sql}`);
  }
  const [rows] = await pool.execute(sql, params);
  return rows;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const digest = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${digest}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }
  const [salt, digest] = storedHash.split(":");
  const nextDigest = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(digest, "hex"), Buffer.from(nextDigest, "hex"));
}

function getSessionSecret() {
  return requiredEnv("APP_SESSION_SECRET");
}

function signSessionToken(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", getSessionSecret()).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verifySessionToken(token) {
  if (!token || !token.includes(".")) {
    return null;
  }
  const [encoded, signature] = token.split(".");
  const expected = crypto.createHmac("sha256", getSessionSecret()).update(encoded).digest("base64url");
  if (signature !== expected) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return payload?.sessionId && payload?.userId ? payload : null;
  } catch {
    return null;
  }
}

async function createSession(user) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  await query(
    "insert into sessions (id, user_id, expires_at) values (?, ?, ?)",
    [sessionId, user.id, expiresAt]
  );
  return {
    token: signSessionToken({
      sessionId,
      userId: user.id,
      expiresAt: expiresAt.toISOString()
    }),
    expiresAt
  };
}

function serializeUser(user) {
  return user ? {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    role: user.role
  } : null;
}

async function getCurrentUser(req) {
  const payload = verifySessionToken(req.cookies?.[SESSION_COOKIE]);
  if (!payload) {
    return null;
  }
  const rows = await query(
    `select s.id as session_id, s.expires_at, u.id, u.email, u.full_name, u.role, u.is_active
     from sessions s
     join users u on u.id = s.user_id
     where s.id = ? and s.user_id = ? and s.expires_at > now() and u.is_active = 1
     limit 1`,
    [payload.sessionId, payload.userId]
  );
  return rows[0] || null;
}

async function requireUser(req, res, next) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      res.status(401).json({ message: "未登录或登录已过期" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "未登录或登录已过期" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "当前账号没有操作权限" });
      return;
    }
    next();
  };
}

function sanitizeKeyword(keyword) {
  return String(keyword || "").trim().replace(/[%(),]/g, " ");
}

function safeJson(value, fallback) {
  if (value == null) {
    return fallback;
  }
  if (typeof value === "object") {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

const QUOTE_STATUS_LABELS = {
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
  // Backward-compatible labels for older saved records.
  pending: "待审批",
  sent: "已外发",
  final: "已转订单",
  archived: "已作废"
};

const QUOTE_STATUSES = new Set(Object.keys(QUOTE_STATUS_LABELS));
const QUOTE_STATUS_ALIASES = {
  pending: "pending_approval",
  sent: "issued",
  final: "converted",
  archived: "cancelled"
};

const QUOTE_STATUS_TRANSITIONS = {
  draft: new Set(["cost_reviewing", "pending_approval", "cancelled"]),
  cost_reviewing: new Set(["draft", "pending_approval", "cancelled"]),
  pending_approval: new Set(["draft", "approved", "rejected", "cancelled"]),
  approved: new Set(["issued", "cancelled"]),
  issued: new Set(["accepted", "rejected", "expired", "converted"]),
  accepted: new Set(["converted", "cancelled"]),
  rejected: new Set(["draft", "cancelled"]),
  converted: new Set([]),
  expired: new Set(["draft", "cancelled"]),
  cancelled: new Set([])
};

const QUOTE_PERMISSION_GROUPS = {
  quoteEditors: new Set(["admin", "supervisor", "sales", "editor"]),
  approvers: new Set(["admin", "supervisor"]),
  masters: new Set(["admin", "supervisor", "procurement", "logistics", "finance", "product"]),
  admins: new Set(["admin"])
};

function normalizeQuoteStatus(status = "draft") {
  const normalized = String(status || "draft").trim();
  return QUOTE_STATUS_ALIASES[normalized] || normalized;
}

function canEditQuote(user) {
  return QUOTE_PERMISSION_GROUPS.quoteEditors.has(user?.role);
}

function canApproveQuote(user) {
  return QUOTE_PERMISSION_GROUPS.approvers.has(user?.role);
}

function getQuoteGroupCode(quoteCode = "") {
  return String(quoteCode || "").replace(/-v\d+$/i, "");
}

function makeVersionQuoteCode(groupCode, versionNo) {
  return `${groupCode}-V${versionNo}`;
}

function normalizeQuoteRow(row = {}) {
  const quoteCode = String(row.quote_code || "");
  const quoteGroupCode = String(row.quote_group_code || getQuoteGroupCode(quoteCode) || quoteCode);
  const versionNo = Number(row.version_no || 1);
  return {
    ...row,
    quote_code: quoteCode,
    quote_group_code: quoteGroupCode,
    version_no: versionNo,
    version_label: `V${versionNo}`,
    status: normalizeQuoteStatus(row.status || "draft"),
    approval_note: row.approval_note || "",
    parent_quote_id: row.parent_quote_id || null,
    submitted_at: row.submitted_at || null,
    approved_at: row.approved_at || null,
    approved_by: row.approved_by || null,
    rejected_at: row.rejected_at || null,
    rejected_by: row.rejected_by || null
  };
}

function buildQuoteResponse(row) {
  if (!row) {
    return null;
  }
  const normalized = normalizeQuoteRow(row);
  return {
    ...normalized,
    form_json: safeJson(normalized.form_json, {}),
    rows_json: safeJson(normalized.rows_json, []),
    budget_rows_json: safeJson(normalized.budget_rows_json, []),
    summary_json: safeJson(normalized.summary_json, {}),
    price_library_json: safeJson(normalized.price_library_json, {}),
    collapsed_categories_json: safeJson(normalized.collapsed_categories_json, {}),
    totals_json: safeJson(normalized.totals_json, {})
  };
}

function buildQuoteSummary(row, groupStats = {}) {
  const normalized = normalizeQuoteRow(row);
  return {
    id: normalized.id,
    quote_code: normalized.quote_code,
    quote_group_code: normalized.quote_group_code,
    version_no: normalized.version_no,
    version_label: normalized.version_label,
    version_count: groupStats.version_count || 1,
    latest_version_no: groupStats.latest_version_no || normalized.version_no,
    customer_name: normalized.customer_name,
    project_name: normalized.project_name,
    product_name: normalized.product_name,
    model_code: normalized.model_code,
    order_quantity: normalized.order_quantity,
    status: normalized.status,
    approval_note: normalized.approval_note,
    updated_at: normalized.updated_at,
    created_at: normalized.created_at,
    submitted_at: normalized.submitted_at,
    approved_at: normalized.approved_at,
    latest_status_label: QUOTE_STATUS_LABELS[normalized.status] || normalized.status
  };
}

function matchQuoteKeyword(row, keyword) {
  if (!keyword) {
    return true;
  }
  const text = keyword.toLowerCase();
  return [
    row.quote_code,
    row.quote_group_code,
    row.customer_name,
    row.project_name,
    row.product_name,
    row.model_code
  ].some((field) => String(field || "").toLowerCase().includes(text));
}

function groupLatestQuotes(rows) {
  const grouped = new Map();
  rows.forEach((rawRow) => {
    const row = normalizeQuoteRow(rawRow);
    const existing = grouped.get(row.quote_group_code);
    if (!existing) {
      grouped.set(row.quote_group_code, {
        latest: row,
        versions: [row]
      });
      return;
    }
    existing.versions.push(row);
    if (
      row.version_no > existing.latest.version_no ||
      (row.version_no === existing.latest.version_no && new Date(row.updated_at || 0) > new Date(existing.latest.updated_at || 0))
    ) {
      existing.latest = row;
    }
  });
  return [...grouped.values()]
    .map((group) => ({
      ...buildQuoteSummary(group.latest, {
        version_count: group.versions.length,
        latest_version_no: group.latest.version_no
      })
    }))
    .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
}

async function fetchAllQuotesRaw(keyword = "") {
  const sanitized = sanitizeKeyword(keyword);
  if (DEV_LOCAL_MODE) {
    const db = await ensureLocalDb();
    return db.quotes
      .map((item) => normalizeQuoteRow({ ...item }))
      .filter((item) => matchQuoteKeyword(item, sanitized))
      .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
  }
  const rows = await query("select * from quotes order by updated_at desc limit 300");
  return rows
    .map((item) => normalizeQuoteRow(item))
    .filter((item) => matchQuoteKeyword(item, sanitized))
    .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
}

async function listLatestQuotes(keyword = "") {
  return groupLatestQuotes(await fetchAllQuotesRaw(keyword));
}

async function getQuoteById(quoteId) {
  if (DEV_LOCAL_MODE) {
    const db = await ensureLocalDb();
    const row = db.quotes.find((item) => item.id === quoteId);
    return row ? normalizeQuoteRow({ ...row }) : null;
  }
  const rows = await query("select * from quotes where id = ? limit 1", [quoteId]);
  return rows[0] ? normalizeQuoteRow(rows[0]) : null;
}

async function listQuoteVersions(quoteId) {
  const target = await getQuoteById(quoteId);
  if (!target) {
    return [];
  }
  const allRows = await fetchAllQuotesRaw("");
  return allRows
    .filter((item) => item.quote_group_code === target.quote_group_code)
    .sort((a, b) => b.version_no - a.version_no || new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
    .map((item, _index, list) => buildQuoteSummary(item, {
      version_count: list.length,
      latest_version_no: list[0]?.version_no || item.version_no
    }));
}

function buildQuotePayloadFromRequest(body = {}, userId, existingRow = null) {
  const quoteCode = String(body.quote_code || existingRow?.quote_code || "").trim();
  const quoteGroupCode = String(body.quote_group_code || existingRow?.quote_group_code || getQuoteGroupCode(quoteCode)).trim();
  const versionNo = Number(body.version_no || existingRow?.version_no || 1);
  const bodyStatus = normalizeQuoteStatus(body.status || "");
  const status = QUOTE_STATUSES.has(bodyStatus) ? bodyStatus : normalizeQuoteStatus(existingRow?.status || "draft");
  return {
    id: existingRow?.id || crypto.randomUUID(),
    quote_code: quoteCode,
    quote_group_code: quoteGroupCode || quoteCode,
    version_no: versionNo > 0 ? versionNo : 1,
    parent_quote_id: body.parent_quote_id ?? existingRow?.parent_quote_id ?? null,
    customer_name: body.customer_name || "",
    project_name: body.project_name || "",
    product_name: body.product_name || "",
    model_code: body.model_code || "",
    trade_term: body.trade_term || "",
    destination_market: body.destination_market || "",
    order_quantity: Number(body.order_quantity) || 0,
    calc_mode: body.calc_mode || "unit",
    status,
    approval_note: String(body.approval_note || existingRow?.approval_note || "").trim(),
    submitted_at: body.submitted_at ?? existingRow?.submitted_at ?? null,
    approved_at: body.approved_at ?? existingRow?.approved_at ?? null,
    approved_by: body.approved_by ?? existingRow?.approved_by ?? null,
    rejected_at: body.rejected_at ?? existingRow?.rejected_at ?? null,
    rejected_by: body.rejected_by ?? existingRow?.rejected_by ?? null,
    form_json: JSON.stringify(body.form_json || {}),
    rows_json: JSON.stringify(body.rows_json || []),
    budget_rows_json: JSON.stringify(body.budget_rows_json || []),
    summary_json: JSON.stringify(body.summary_json || {}),
    price_library_json: JSON.stringify(body.price_library_json || {}),
    collapsed_categories_json: JSON.stringify(body.collapsed_categories_json || {}),
    totals_json: JSON.stringify(body.totals_json || {}),
    created_by: existingRow?.created_by || userId,
    updated_by: userId,
    created_at: existingRow?.created_at || nowIso(),
    updated_at: nowIso()
  };
}

async function saveQuoteRecord(record) {
  const normalized = normalizeQuoteRow(record);
  if (DEV_LOCAL_MODE) {
    const db = await ensureLocalDb();
    const index = db.quotes.findIndex((item) => item.id === normalized.id || item.quote_code === normalized.quote_code);
    const nextRecord = {
      ...normalized,
      updated_at: nowIso()
    };
    if (index >= 0) {
      db.quotes[index] = {
        ...db.quotes[index],
        ...nextRecord
      };
    } else {
      db.quotes.push(nextRecord);
    }
    await persistLocalDb(db);
    return normalizeQuoteRow(nextRecord);
  }

  const params = [
    normalized.id,
    normalized.quote_code,
    normalized.quote_group_code,
    normalized.version_no,
    normalized.parent_quote_id,
    normalized.customer_name,
    normalized.project_name,
    normalized.product_name,
    normalized.model_code,
    normalized.trade_term,
    normalized.destination_market,
    normalized.order_quantity,
    normalized.calc_mode,
    normalized.status,
    normalized.approval_note,
    normalized.submitted_at ? toMysqlishDate(normalized.submitted_at) : null,
    normalized.approved_at ? toMysqlishDate(normalized.approved_at) : null,
    normalized.approved_by,
    normalized.rejected_at ? toMysqlishDate(normalized.rejected_at) : null,
    normalized.rejected_by,
    normalized.form_json,
    normalized.rows_json,
    normalized.budget_rows_json,
    normalized.summary_json,
    normalized.price_library_json,
    normalized.collapsed_categories_json,
    normalized.totals_json,
    normalized.created_by,
    normalized.updated_by
  ];

  await query(
    `insert into quotes (
      id, quote_code, quote_group_code, version_no, parent_quote_id, customer_name, project_name, product_name,
      model_code, trade_term, destination_market, order_quantity, calc_mode, status, approval_note, submitted_at,
      approved_at, approved_by, rejected_at, rejected_by, form_json, rows_json, budget_rows_json, summary_json,
      price_library_json, collapsed_categories_json, totals_json, created_by, updated_by
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    on duplicate key update
      quote_group_code = values(quote_group_code),
      version_no = values(version_no),
      parent_quote_id = values(parent_quote_id),
      customer_name = values(customer_name),
      project_name = values(project_name),
      product_name = values(product_name),
      model_code = values(model_code),
      trade_term = values(trade_term),
      destination_market = values(destination_market),
      order_quantity = values(order_quantity),
      calc_mode = values(calc_mode),
      status = values(status),
      approval_note = values(approval_note),
      submitted_at = values(submitted_at),
      approved_at = values(approved_at),
      approved_by = values(approved_by),
      rejected_at = values(rejected_at),
      rejected_by = values(rejected_by),
      form_json = values(form_json),
      rows_json = values(rows_json),
      budget_rows_json = values(budget_rows_json),
      summary_json = values(summary_json),
      price_library_json = values(price_library_json),
      collapsed_categories_json = values(collapsed_categories_json),
      totals_json = values(totals_json),
      updated_by = values(updated_by)`,
    params
  );
  return getQuoteById(normalized.id);
}

async function createQuoteVersion(sourceId, userId) {
  const source = await getQuoteById(sourceId);
  if (!source) {
    return null;
  }
  const versions = await listQuoteVersions(sourceId);
  const nextVersionNo = (versions[0]?.latest_version_no || source.version_no || 1) + 1;
  const nextRecord = buildQuotePayloadFromRequest({
    quote_code: makeVersionQuoteCode(source.quote_group_code, nextVersionNo),
    quote_group_code: source.quote_group_code,
    version_no: nextVersionNo,
    parent_quote_id: source.id,
    customer_name: source.customer_name,
    project_name: source.project_name,
    product_name: source.product_name,
    model_code: source.model_code,
    trade_term: source.trade_term,
    destination_market: source.destination_market,
    order_quantity: source.order_quantity,
    calc_mode: source.calc_mode,
    status: "draft",
    approval_note: "",
    form_json: safeJson(source.form_json, {}),
    rows_json: safeJson(source.rows_json, []),
    budget_rows_json: safeJson(source.budget_rows_json, []),
    summary_json: safeJson(source.summary_json, {}),
    price_library_json: safeJson(source.price_library_json, {}),
    collapsed_categories_json: safeJson(source.collapsed_categories_json, {}),
    totals_json: safeJson(source.totals_json, {})
  }, userId);
  return saveQuoteRecord(nextRecord);
}

async function createIndependentQuoteCopy(sourceId, userId) {
  const source = await getQuoteById(sourceId);
  if (!source) {
    return null;
  }
  const nextQuoteCode = makeQuoteCopyCode(source.quote_group_code || source.quote_code);
  const nextRecord = buildQuotePayloadFromRequest({
    quote_code: nextQuoteCode,
    quote_group_code: nextQuoteCode,
    version_no: 1,
    parent_quote_id: null,
    customer_name: source.customer_name,
    project_name: source.project_name,
    product_name: source.product_name,
    model_code: source.model_code,
    trade_term: source.trade_term,
    destination_market: source.destination_market,
    order_quantity: source.order_quantity,
    calc_mode: source.calc_mode,
    status: "draft",
    approval_note: "",
    form_json: safeJson(source.form_json, {}),
    rows_json: safeJson(source.rows_json, []),
    budget_rows_json: safeJson(source.budget_rows_json, []),
    summary_json: safeJson(source.summary_json, {}),
    price_library_json: safeJson(source.price_library_json, {}),
    collapsed_categories_json: safeJson(source.collapsed_categories_json, {}),
    totals_json: safeJson(source.totals_json, {})
  }, userId);
  return saveQuoteRecord(nextRecord);
}

async function updateQuoteWorkflowStatus(quoteId, nextStatus, user, approvalNote = "") {
  const quote = await getQuoteById(quoteId);
  if (!quote) {
    return null;
  }
  const currentStatus = normalizeQuoteStatus(quote.status || "draft");
  const status = normalizeQuoteStatus(nextStatus || "");
  if (!QUOTE_STATUSES.has(status)) {
    throw new Error("无效的报价状态");
  }

  const allowedTargets = QUOTE_STATUS_TRANSITIONS[currentStatus] || new Set();
  if (status !== currentStatus && !allowedTargets.has(status)) {
    const error = new Error(`报价状态不能从 ${QUOTE_STATUS_LABELS[currentStatus] || currentStatus} 直接流转到 ${QUOTE_STATUS_LABELS[status] || status}`);
    error.statusCode = 400;
    throw error;
  }

  const approvalStatuses = new Set(["approved", "rejected", "cancelled"]);
  if (approvalStatuses.has(status) && !canApproveQuote(user)) {
    const error = new Error("只有主管或管理员可以执行该审批操作");
    error.statusCode = 403;
    throw error;
  }
  if (status === "issued" && !["admin", "supervisor", "sales", "editor"].includes(user.role)) {
    const error = new Error("只有业务员、主管或管理员可以标记客户外发");
    error.statusCode = 403;
    throw error;
  }

  const payload = {
    ...quote,
    status,
    approval_note: String(approvalNote || "").trim(),
    submitted_at: quote.submitted_at,
    approved_at: quote.approved_at,
    approved_by: quote.approved_by,
    rejected_at: quote.rejected_at,
    rejected_by: quote.rejected_by
  };

  if (status === "pending_approval") {
    payload.submitted_at = nowIso();
    payload.approved_at = null;
    payload.approved_by = null;
    payload.rejected_at = null;
    payload.rejected_by = null;
  }
  if (status === "approved") {
    payload.approved_at = nowIso();
    payload.approved_by = user.id;
    payload.rejected_at = null;
    payload.rejected_by = null;
  }
  if (status === "rejected") {
    payload.rejected_at = nowIso();
    payload.rejected_by = user.id;
    payload.approved_at = null;
    payload.approved_by = null;
  }

  return saveQuoteRecord(buildQuotePayloadFromRequest({
    ...payload,
    form_json: safeJson(payload.form_json, {}),
    rows_json: safeJson(payload.rows_json, []),
    budget_rows_json: safeJson(payload.budget_rows_json, []),
    summary_json: safeJson(payload.summary_json, {}),
    price_library_json: safeJson(payload.price_library_json, {}),
    collapsed_categories_json: safeJson(payload.collapsed_categories_json, {}),
    totals_json: safeJson(payload.totals_json, {})
  }, user.id, quote));
}

async function deleteQuoteRecord(quoteId) {
  if (DEV_LOCAL_MODE) {
    const db = await ensureLocalDb();
    const index = db.quotes.findIndex((item) => item.id === quoteId);
    if (index < 0) {
      return false;
    }
    db.quotes.splice(index, 1);
    await persistLocalDb(db);
    return true;
  }
  await query("delete from quotes where id = ?", [quoteId]);
  return true;
}

const app = express();

app.use(express.json({ limit: "8mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "报价系统服务运行中" });
});

app.get("/api/quote-blueprint", requireUser, (_req, res) => {
  res.json({
    roles: [...VALID_ROLES].map((role) => ({ role, label: ROLE_LABELS[role] || role })),
    statuses: Object.entries(QUOTE_STATUS_LABELS).map(([status, label]) => ({ status, label })),
    statusTransitions: Object.fromEntries(Object.entries(QUOTE_STATUS_TRANSITIONS).map(([from, targets]) => [from, [...targets]])),
    riskLevels: [
      { level: "blocking", label: "阻断类", action: "不能外发，必须修正或审批" },
      { level: "approval", label: "审批类", action: "可提交主管审批" },
      { level: "notice", label: "提醒类", action: "提示复核，不阻断" }
    ],
    tradeTerms: ["FOB", "CFR", "CIF", "DDP_MANUAL"],
    chinaAccessoryPaths: [
      "china_to_ng_assembled",
      "china_to_ng_unassembled",
      "china_direct_to_customer",
      "customer_separate_quote"
    ]
  });
});

app.get("/api/auth/me", async (req, res, next) => {
  try {
    const user = await getCurrentUser(req);
    res.json({ user: serializeUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!email || !password) {
      res.status(400).json({ message: "请输入邮箱和密码" });
      return;
    }
    const rows = await query(
      "select id, email, full_name, role, is_active, password_hash from users where email = ? limit 1",
      [email]
    );
    const user = rows[0];
    if (!user || !user.is_active || !verifyPassword(password, user.password_hash)) {
      res.status(401).json({ message: "邮箱或密码不正确" });
      return;
    }

    const session = await createSession(user);
    res.cookie(SESSION_COOKIE, session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: session.expiresAt,
      path: "/"
    });
    res.json({
      message: "登录成功",
      user: serializeUser(user)
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/logout", async (req, res, next) => {
  try {
    const payload = verifySessionToken(req.cookies?.[SESSION_COOKIE]);
    if (payload?.sessionId) {
      await query("delete from sessions where id = ?", [payload.sessionId]);
    }
    res.clearCookie(SESSION_COOKIE, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/"
    });
    res.json({ message: "已退出登录" });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/change-password", requireUser, async (req, res, next) => {
  try {
    const currentPassword = String(req.body.currentPassword || "");
    const newPassword = String(req.body.newPassword || "");
    if (!currentPassword || !newPassword) {
      res.status(400).json({ message: "请填写当前密码和新密码" });
      return;
    }
    if (newPassword.length < 6) {
      res.status(400).json({ message: "新密码至少 6 位" });
      return;
    }

    const rows = await query(
      "select id, password_hash from users where id = ? limit 1",
      [req.user.id]
    );
    const user = rows[0];
    if (!user || !verifyPassword(currentPassword, user.password_hash)) {
      res.status(400).json({ message: "当前密码不正确" });
      return;
    }

    const nextHash = hashPassword(newPassword);
    await query("update users set password_hash = ? where id = ?", [nextHash, req.user.id]);
    await query("delete from sessions where user_id = ? and id <> ?", [req.user.id, req.user.session_id]);
    res.json({ message: "密码已更新，请使用新密码登录" });
  } catch (error) {
    next(error);
  }
});

app.get("/api/users", requireUser, requireRole("admin"), async (_req, res, next) => {
  try {
    const rows = await query(
      `select id, email, full_name, role, is_active, created_at, updated_at
       from users
       order by created_at asc`
    );
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

app.post("/api/users", requireUser, requireRole("admin"), async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const fullName = String(req.body.fullName || "").trim();
    const role = String(req.body.role || "viewer").trim();
    const password = String(req.body.password || "");
    if (!email || !fullName || !password) {
      res.status(400).json({ message: "请完整填写邮箱、姓名和初始密码" });
      return;
    }
    if (!VALID_ROLES.has(role)) {
      res.status(400).json({ message: "无效的角色类型" });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ message: "初始密码至少 6 位" });
      return;
    }

    const id = crypto.randomUUID();
    const passwordHash = hashPassword(password);
    await query(
      `insert into users (id, email, full_name, role, password_hash, is_active)
       values (?, ?, ?, ?, ?, 1)`,
      [id, email, fullName, role, passwordHash]
    );
    res.json({ message: "用户已创建" });
  } catch (error) {
    if (String(error?.message || "").includes("Duplicate")) {
      res.status(400).json({ message: "该邮箱已存在" });
      return;
    }
    next(error);
  }
});

app.patch("/api/users/:id", requireUser, requireRole("admin"), async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const role = req.body.role != null ? String(req.body.role).trim() : null;
    const fullName = req.body.fullName != null ? String(req.body.fullName).trim() : null;
    const isActive = req.body.isActive;
    const password = req.body.password != null ? String(req.body.password) : "";

    const existingRows = await query(
      "select id, email, role, is_active from users where id = ? limit 1",
      [targetId]
    );
    const targetUser = existingRows[0];
    if (!targetUser) {
      res.status(404).json({ message: "用户不存在" });
      return;
    }
    if (targetUser.id === req.user.id && isActive === false) {
      res.status(400).json({ message: "不能停用当前登录账号" });
      return;
    }
    if (role && !VALID_ROLES.has(role)) {
      res.status(400).json({ message: "无效的角色类型" });
      return;
    }
    if (password && password.length < 6) {
      res.status(400).json({ message: "重置密码至少 6 位" });
      return;
    }

    const fields = [];
    const params = [];
    if (fullName) {
      fields.push("full_name = ?");
      params.push(fullName);
    }
    if (role) {
      fields.push("role = ?");
      params.push(role);
    }
    if (typeof isActive === "boolean") {
      fields.push("is_active = ?");
      params.push(isActive ? 1 : 0);
    }
    if (password) {
      fields.push("password_hash = ?");
      params.push(hashPassword(password));
    }
    if (!fields.length) {
      res.status(400).json({ message: "没有可更新的内容" });
      return;
    }
    params.push(targetId);
    await query(`update users set ${fields.join(", ")} where id = ?`, params);
    if (typeof isActive === "boolean" && !isActive) {
      await query("delete from sessions where user_id = ?", [targetId]);
    }
    if (password) {
      await query("delete from sessions where user_id = ? and id <> ?", [targetId, req.user.session_id]);
    }
    res.json({ message: "用户信息已更新" });
  } catch (error) {
    next(error);
  }
});

app.get("/api/quotes", requireUser, async (req, res, next) => {
  try {
    const keyword = sanitizeKeyword(req.query.keyword || "");
    const rows = await listLatestQuotes(keyword);
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

app.get("/api/quotes/:id", requireUser, async (req, res, next) => {
  try {
    const row = await getQuoteById(req.params.id);
    if (!row) {
      res.status(404).json({ message: "报价单不存在" });
      return;
    }
    res.json({ data: buildQuoteResponse(row) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/quotes", requireUser, async (req, res, next) => {
  try {
    if (!canEditQuote(req.user)) {
      res.status(403).json({ message: "当前角色不能新建或保存报价" });
      return;
    }
    const body = req.body || {};
    if (!body.quote_code) {
      res.status(400).json({ message: "缺少报价单号" });
      return;
    }
    const existing = body.id ? await getQuoteById(body.id) : null;
    const saved = await saveQuoteRecord(buildQuotePayloadFromRequest(body, req.user.id, existing));
    res.json({
      message: "报价单已保存到云端",
      data: buildQuoteSummary(saved, {
        version_count: (await listQuoteVersions(saved.id)).length,
        latest_version_no: saved.version_no
      })
    });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/quotes/:id", requireUser, async (req, res, next) => {
  try {
    const quoteId = req.params.id;
    const status = req.body.status != null ? normalizeQuoteStatus(req.body.status) : null;
    if (!status || !QUOTE_STATUSES.has(status)) {
      res.status(400).json({ message: "无效的报价状态" });
      return;
    }
    const updated = await updateQuoteWorkflowStatus(
      quoteId,
      status,
      req.user,
      String(req.body.approvalNote || "")
    );
    if (!updated) {
      res.status(404).json({ message: "报价单不存在" });
      return;
    }
    res.json({ message: "报价状态已更新", data: buildQuoteSummary(updated) });
  } catch (error) {
    if (error?.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }
    next(error);
  }
});

app.post("/api/quotes/:id/copy", requireUser, async (req, res, next) => {
  try {
    if (!canEditQuote(req.user)) {
      res.status(403).json({ message: "当前角色不能复制报价" });
      return;
    }
    const copied = await createIndependentQuoteCopy(req.params.id, req.user.id);
    if (!copied) {
      res.status(404).json({ message: "源报价单不存在" });
      return;
    }
    res.json({ message: "报价单已复制", data: buildQuoteSummary(copied) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/quotes/:id/versions", requireUser, async (req, res, next) => {
  try {
    const versions = await listQuoteVersions(req.params.id);
    if (!versions.length) {
      res.status(404).json({ message: "报价单不存在" });
      return;
    }
    res.json({ data: versions });
  } catch (error) {
    next(error);
  }
});

app.post("/api/quotes/:id/version", requireUser, async (req, res, next) => {
  try {
    if (!canEditQuote(req.user)) {
      res.status(403).json({ message: "当前角色不能创建报价版本" });
      return;
    }
    const created = await createQuoteVersion(req.params.id, req.user.id);
    if (!created) {
      res.status(404).json({ message: "源报价单不存在" });
      return;
    }
    res.json({ message: "新版本已创建", data: buildQuoteSummary(created) });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/quotes/:id", requireUser, requireRole("admin"), async (req, res, next) => {
  try {
    const row = await getQuoteById(req.params.id);
    if (!row) {
      res.status(404).json({ message: "报价单不存在" });
      return;
    }
    await deleteQuoteRecord(req.params.id);
    res.json({ message: "报价单已删除" });
  } catch (error) {
    next(error);
  }
});

app.use(express.static(__dirname));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    message: error?.message || "服务器内部错误"
  });
});

const port = Number(process.env.PORT || 3000);
const startServer = async () => {
  if (DEV_LOCAL_MODE) {
    await ensureLocalDb();
  }
  app.listen(port, () => {
    console.log(`Quote app server running at http://0.0.0.0:${port}`);
    if (DEV_LOCAL_MODE) {
      console.log(`Local dev mode enabled: ${LOCAL_DB_FILE}`);
    }
  });
};

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
