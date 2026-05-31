# 卫浴陶瓷离线报价系统

一个适合外贸业务、跟单、老板和工厂成本核算人员使用的马桶 / 台盆离线报价系统，当前支持：

- 纯浏览器离线报价，不依赖 MySQL、Node API 或云端登录
- IndexedDB 本机保存报价单、版本、状态和报价快照
- JSON 一键备份 / 恢复离线报价库
- 马桶与台盆模板：分体、连体、挂墙、台上盆、台下盆、立柱盆 / 半柱盆
- 客户版 PDF / 打印报价单，以及内部版 Excel 核价表
- 按报价单号 / 客户 / 项目 / 型号搜索本机报价单

## 目录说明

- `index.html`：主界面
- `app.js`：报价、计算、渲染、本地历史逻辑
- `cloud.js`：离线数据层，使用 IndexedDB 管理本机报价中心、备份恢复和默认条款
- `server.mjs`：适合火山引擎 ECS 运行的 Node 服务端
- `.env.example`：服务端环境变量模板
- `config.js`：前端配置，默认走同域 `/api`
- `edgeone/schema.mysql.sql`：MySQL 建表脚本，可直接复用到火山 RDS
- `deploy/nginx.conf`：Nginx 反向代理示例
- `deploy/quote-app.service`：systemd 守护进程示例
- `deploy/deploy.sh`：服务器端部署脚本
- `.github/workflows/deploy-ecs.yml`：GitHub 推送后自动发布到 ECS 的工作流模板
- `scripts/create-password-hash.mjs`：生成登录密码哈希

## 本地使用

### 方式一：直接打开

双击 `index.html` 即可使用。为获得更稳定的 IndexedDB、打印和下载体验，推荐使用最新版 Edge / Chrome。

### 方式二：本地服务预览

如果希望通过 `http://localhost:3000` 访问：

```powershell
npm install
npm run dev
```

然后访问 [http://localhost:3000](http://localhost:3000)。

## 离线数据说明

- 报价中心数据保存在当前浏览器 IndexedDB。
- 右上角“导出备份”会导出 JSON 文件。
- 右上角“导入备份”会覆盖当前本机报价库。
- “保存报价”仍保留轻量本地历史；“保存到本机”会进入正式离线报价中心。

## 数据库初始化

### 1. 创建 MySQL 数据库

- 推荐使用火山引擎 RDS MySQL
- 版本建议 MySQL 8.x

### 2. 执行建表脚本

执行：

```sql
source edgeone/schema.mysql.sql;
```

会创建：

- `users`
- `sessions`
- `quotes`

### 3. 创建首个账号

先生成密码哈希：

```powershell
node scripts/create-password-hash.mjs 你的初始密码
```

然后插入账号：

```sql
insert into users (email, full_name, role, password_hash)
values ('sales@company.com', '销售同事', 'editor', '这里填刚生成的哈希');
```

## 火山引擎一站式部署

### 方案组成

- `ECS`：运行 Node 服务端与静态页面
- `RDS MySQL`：存用户、会话、报价单
- `域名 + DNS`：对外访问入口
- `SSL 证书`：HTTPS

### 部署步骤

#### 1. 购买并准备资源

- 1 台火山引擎 ECS
- 1 个火山引擎 RDS MySQL
- 你的火山引擎域名

#### 2. 上传项目到服务器

建议目录：

```bash
/opt/quote-app
```

把整个项目上传到这个目录。

#### 3. 安装运行环境

在 ECS 上安装：

- Node.js 18+
- Nginx

#### 4. 安装项目依赖

```bash
cd /opt/quote-app
npm install
```

#### 5. 配置环境变量

创建：

```bash
/opt/quote-app/.env
```

按 `.env.example` 填写数据库连接与密钥。

#### 6. 启动 Node 服务

手动测试：

```bash
node server.mjs
```

正式运行建议用 systemd：

```bash
cp deploy/quote-app.service /etc/systemd/system/quote-app.service
systemctl daemon-reload
systemctl enable quote-app
systemctl start quote-app
systemctl status quote-app
```

#### 7. 配置 Nginx

把 `deploy/nginx.conf` 按你的域名修改后放到 Nginx 站点配置中，例如：

- `quote.yourdomain.com`

然后重载：

```bash
nginx -t
systemctl reload nginx
```

#### 8. 域名解析

在火山引擎域名控制台中：

- 将 `quote.yourdomain.com`
- 解析到 ECS 公网 IP

#### 9. 配置 HTTPS

在火山引擎申请证书，安装到 Nginx。

## GitHub 自动部署到 ECS

### 适用方式

推荐流程：

- GitHub 作为源码仓库
- GitHub Actions 作为自动发布入口
- 火山引擎 ECS 作为运行环境

当前仓库已经提供：

- 服务器部署脚本 [deploy.sh](file:///d:/Kingto/Personal/%E6%8A%A5%E4%BB%B7/deploy/deploy.sh)
- GitHub Actions 工作流 [deploy-ecs.yml](file:///d:/Kingto/Personal/%E6%8A%A5%E4%BB%B7/.github/workflows/deploy-ecs.yml)

### 首次准备

#### 1. 把项目上传到 GitHub

- 创建一个 GitHub 仓库
- 把当前项目推到 `main` 分支

#### 2. 服务器先完成首轮初始化

首次仍建议手工完成以下动作：

- 安装 Node.js / Nginx
- 创建 `/opt/quote-app`
- 上传或拉取代码
- 执行 `npm install`
- 配置 `.env`
- 配置 `quote-app.service`
- 配置 Nginx

首次完成后，再启用自动部署最稳。

#### 3. 在 GitHub 仓库配置 Secrets

进入 GitHub 仓库：

- `Settings -> Secrets and variables -> Actions`

新增以下 Secrets：

- `ECS_HOST`：服务器公网 IP
- `ECS_PORT`：SSH 端口，默认 `22`
- `ECS_USER`：SSH 用户，例如 `root`
- `ECS_SSH_KEY`：私钥内容
- `ECS_APP_DIR`：应用目录，例如 `/opt/quote-app`

### 自动部署流程

当你往 `main` 分支推送代码时：

1. GitHub Actions 检出仓库代码
2. 把项目文件上传到 ECS
3. 在服务器执行 `deploy/deploy.sh`
4. 自动安装依赖
5. 自动做语法检查
6. 自动重启 `quote-app`
7. 自动重载 Nginx

### 服务器部署脚本行为

`deploy/deploy.sh` 默认会执行：

- 进入应用目录
- 安装依赖
- 检查 `server.mjs` 与 `cloud.js`
- 重启 `quote-app`
- 检查并重载 Nginx

如果你在服务器本地手工部署，也可以直接运行：

```bash
cd /opt/quote-app
chmod +x deploy/deploy.sh
bash deploy/deploy.sh
```

## 当前接口

服务端已提供以下接口：

- `GET /api/health`
- `GET /api/auth/me`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/quotes`
- `GET /api/quotes/:id`
- `POST /api/quotes`

前端当前已经全部对接这套接口，不需要再改页面结构。

## 当前权限模型

当前已预留：

- 管理员
- 主管
- 业务员
- 采购
- 物流/单证
- 财务
- 产品/工程
- 编辑者（历史兼容）
- 只读查看者

目前代码里已经有 `users.role` 字段，服务端已按报价编辑、审批、外发等动作做第一层角色校验。

## 后续建议

下一步建议继续补：

- 报价状态流转（草稿 / 已确认 / 已作废）
- 用户管理后台
- 修改审计日志
- 版本历史
- 客户版 / 内部版双模板导出
- 细颗粒度权限

## 尼日利亚报价工作台 PRD

多人在线报价工作台的产品边界、字段契约和计算规则已补充到：

- `docs/nigeria-sanitaryware-quote-workbench-prd.md`
- `docs/nigeria-quote-field-and-rule-contract.md`

数据库草案已同步扩展到 `edgeone/schema.mysql.sql`，覆盖客户、产品版本、包装版本、BOM 版本、供应商报价、物流费率、汇率、报价行、快照、风险检查、审批和审计日志。
