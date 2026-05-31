#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/quote-app}"
BRANCH="${BRANCH:-main}"
USE_GIT_PULL="${USE_GIT_PULL:-true}"

echo "[1/6] 切换到应用目录: ${APP_DIR}"
cd "${APP_DIR}"

if [ "${USE_GIT_PULL}" = "true" ] && [ -d ".git" ]; then
  echo "[2/6] 拉取 GitHub 最新代码: ${BRANCH}"
  git fetch origin "${BRANCH}"
  git checkout "${BRANCH}"
  git pull origin "${BRANCH}"
else
  echo "[2/6] 跳过 git pull，使用已同步到服务器的代码"
fi

echo "[3/6] 安装依赖"
npm install --omit=dev

echo "[4/6] 检查 Node 语法"
node --check server.mjs
node --check cloud.js

echo "[5/6] 重启应用服务"
systemctl restart quote-app
systemctl status quote-app --no-pager --lines=20

echo "[6/6] 重载 Nginx"
nginx -t
systemctl reload nginx

echo "部署完成"
