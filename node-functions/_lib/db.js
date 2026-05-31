import mysql from "mysql2/promise";

let pool;

function requiredEnv(name, fallback = "") {
  const value = process.env[name] || fallback;
  if (!value) {
    throw new Error(`缺少环境变量 ${name}`);
  }
  return value;
}

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: requiredEnv("DB_HOST"),
      port: Number(process.env.DB_PORT || 3306),
      user: requiredEnv("DB_USER"),
      password: requiredEnv("DB_PASSWORD"),
      database: requiredEnv("DB_NAME"),
      connectionLimit: 5,
      charset: "utf8mb4"
    });
  }
  return pool;
}

export async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params);
  return rows;
}
