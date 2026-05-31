import crypto from "crypto";

const password = process.argv[2];

if (!password) {
  console.log("用法: node scripts/create-password-hash.mjs 你的密码");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const digest = crypto.scryptSync(password, salt, 64).toString("hex");

console.log(`${salt}:${digest}`);
