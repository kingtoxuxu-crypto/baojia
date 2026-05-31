import crypto from "crypto";
import { query } from "./db.js";
import { readCookie, unauthorized } from "./http.js";

const SESSION_COOKIE = "quote_session";

function getSessionSecret() {
  return process.env.APP_SESSION_SECRET || "change-me-in-edgeone-env";
}

export function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const digest = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${digest}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }
  const [salt, digest] = storedHash.split(":");
  const inputDigest = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(digest, "hex"), Buffer.from(inputDigest, "hex"));
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
    if (!payload?.userId || !payload?.sessionId) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(user) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  await query(
    "insert into sessions (id, user_id, expires_at) values (?, ?, ?)",
    [sessionId, user.id, expiresAt]
  );
  const token = signSessionToken({
    sessionId,
    userId: user.id,
    expiresAt: expiresAt.toISOString()
  });
  return {
    token,
    expiresAt
  };
}

export function buildSessionCookie(token, expiresAt) {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}`;
}

export function buildClearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export async function getCurrentUser(request) {
  const token = readCookie(request, SESSION_COOKIE);
  const payload = verifySessionToken(token);
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

export async function requireUser(request) {
  const user = await getCurrentUser(request);
  if (!user) {
    return { error: unauthorized(), user: null };
  }
  return { error: null, user };
}

export async function destroySession(request) {
  const token = readCookie(request, SESSION_COOKIE);
  const payload = verifySessionToken(token);
  if (!payload) {
    return;
  }
  await query("delete from sessions where id = ?", [payload.sessionId]);
}
