# ERP 报价子系统架构说明

## 1. 定位

当前报价系统的核心价值，不只是生成一张报价单，而是作为 ERP 中的一个“售前核价与报价决策引擎”。

它在 ERP 中的职责应当是：

- 连接客户需求与工厂成本
- 在销售接单前完成成本核算、利润测算和报价决策
- 为后续订单、采购、生产、财务提供可追溯的价格依据

建议将它定义为：

**ERP 一级模块：报价管理**

模块编码建议：

- `QUOTE`

---

## 2. 当前系统能力抽象

结合现有实现，当前系统已具备以下能力：

### 2.1 前端报价引擎

- 客户、项目、型号、市场、贸易条款录入
- BOM 明细录入与分类管理
- 两种计价模式：
  - `BOM 单件成本`
  - `总预算均摊`
- 自动计算：
  - 产品成本
  - 外购/内部利润
  - 售后风险预留
  - 汇率安全垫
  - 美元报价
- 报价预览与导出

### 2.2 协作与数据存储

- 登录能力
- 云端保存报价单
- 搜索报价单
- 打开报价单继续编辑

### 2.3 已有后端基础

- 用户表
- 会话表
- 报价单表
- Node API
- MySQL 存储

这意味着当前系统已经具备 ERP 子系统雏形，不再是单纯工具页面。

---

## 3. ERP 目标架构

建议把报价系统放进 ERP 后，采用下面这套分层架构。

### 3.1 展示层

负责给销售、业务经理、核价人员、管理层提供页面与操作入口。

包含：

- 报价单列表页
- 报价单详情页
- 报价编辑页
- 版本对比页
- 审批页
- 报价分析看板

### 3.2 业务服务层

这是报价系统的核心。

建议拆成以下服务：

- `QuoteService`
  - 创建报价单
  - 保存报价单
  - 提交审批
  - 复制报价单
  - 生成订单草稿

- `PricingEngine`
  - BOM 计算
  - 预算均摊
  - 贸易条款成本计算
  - 利润与风险预留计算
  - 阶梯报价计算

- `QuoteSearchService`
  - 按客户搜索
  - 按报价单号搜索
  - 按型号搜索
  - 按状态搜索
  - 按时间搜索

- `QuoteApprovalService`
  - 提交审批
  - 驳回
  - 审批通过
  - 记录审批意见

- `QuoteExportService`
  - 客户版导出
  - 内部版导出
  - ERP 附件归档

### 3.3 数据访问层

负责报价、明细、版本、日志等数据持久化。

建议与业务服务分离，避免前端计算逻辑直接等同数据库结构。

### 3.4 集成层

负责与 ERP 其他模块打通。

建议通过：

- REST API
- 内部服务调用
- 数据同步任务
- 事件总线

---

## 4. 在 ERP 中的模块边界

为了后面系统不混乱，建议从一开始就明确“报价模块负责什么，不负责什么”。

### 4.1 报价模块负责

- 核价
- 利润测算
- 对外报价生成
- 报价版本管理
- 报价审批
- 报价转订单前的冻结确认

### 4.2 报价模块不直接负责

- 客户主数据最终维护
- 物料主数据最终维护
- 正式生产 BOM 主数据维护
- 库存扣减
- 采购下单
- 财务记账

这些应分别归属于 ERP 的主数据、采购、库存、生产、财务模块。

---

## 5. ERP 里的上下游关系

### 5.1 上游输入模块

报价模块应从以下 ERP 模块获取主数据：

- `客户管理`
  - 客户名称
  - 客户等级
  - 默认贸易条款
  - 默认税费/账期策略

- `产品主数据`
  - 产品编码
  - 产品系列
  - 产品规格模板

- `BOM/工艺主数据`
  - 标准 BOM 模板
  - 工艺路线
  - 标准材料损耗率

- `价格库`
  - 原料单价
  - 配件单价
  - 包装单价
  - 认证费用标准
  - 汇率参数

### 5.2 下游输出模块

报价单审批通过后，可向以下模块输出：

- `销售订单`
  - 生成订单草稿

- `生产管理`
  - 输出报价基准 BOM
  - 输出工艺与配置要求

- `采购管理`
  - 输出外购件预估成本与清单

- `财务管理`
  - 输出收入预测、毛利率、利润结构

- `经营分析`
  - 输出客户报价命中率、报价周期、利润率区间

---

## 6. 建议的 ERP 数据模型

当前数据库已有 `users`、`sessions`、`quotes`，但如果作为 ERP 正式子系统，建议扩展为以下主表。

### 6.1 报价主表 `quote_order`

核心字段建议：

- `id`
- `quote_no`
- `customer_id`
- `project_name`
- `product_id`
- `product_name_snapshot`
- `model_code`
- `quote_type`
- `calc_mode`
- `trade_term`
- `currency`
- `exchange_rate`
- `order_qty`
- `production_qty`
- `status`
- `approval_status`
- `quoted_by`
- `approved_by`
- `effective_date`
- `expire_date`
- `total_rmb_cost`
- `total_usd_price`
- `gross_profit_rate`
- `created_at`
- `updated_at`

### 6.2 报价明细表 `quote_item`

字段建议：

- `id`
- `quote_id`
- `category_key`
- `item_code`
- `item_name`
- `source_type`
- `unit`
- `qty`
- `unit_price`
- `line_amount`
- `is_external`
- `pricing_source`
- `remark`
- `sort_no`

### 6.3 报价版本表 `quote_version`

用于保留每次修改后的快照。

字段建议：

- `id`
- `quote_id`
- `version_no`
- `snapshot_json`
- `changed_by`
- `changed_at`
- `change_reason`

### 6.4 报价审批表 `quote_approval`

字段建议：

- `id`
- `quote_id`
- `node_name`
- `approver_id`
- `action`
- `comment`
- `acted_at`

### 6.5 报价附件表 `quote_attachment`

字段建议：

- `id`
- `quote_id`
- `file_name`
- `file_url`
- `file_type`
- `uploaded_by`
- `uploaded_at`

### 6.6 价格规则表 `pricing_rule`

字段建议：

- `id`
- `rule_type`
- `customer_level`
- `market`
- `trade_term`
- `product_category`
- `formula_json`
- `enabled`

---

## 7. 建议的模块拆分

如果未来真的要并入 ERP，而不是继续单文件扩张，建议拆成下面几个子模块。

### 7.1 报价基础资料

负责：

- 报价模板
- 分类字典
- 常用预设项
- 价格库
- 贸易条款参数

### 7.2 报价单管理

负责：

- 新建报价
- 编辑报价
- 搜索报价
- 复制报价
- 作废报价
- 查看历史版本

### 7.3 核价引擎

负责：

- BOM 成本计算
- 分摊成本计算
- 利润率计算
- 风险预留计算
- 贸易条款价格口径换算

### 7.4 审批流

负责：

- 报价提交审批
- 毛利率低于阈值自动升级审批
- 大客户特殊价审批
- 审批意见记录

### 7.5 报价转订单

负责：

- 将已批准报价生成销售订单草稿
- 锁定报价版本
- 记录订单引用的报价基准

### 7.6 数据分析

负责：

- 报价成功率
- 平均利润率
- 客户询价转化率
- 核价周期
- 高频物料成本波动

---

## 8. 建议的角色与权限

报价作为 ERP 子系统后，建议角色至少分为：

- `销售`
  - 新建报价
  - 查看自己报价
  - 提交审批

- `核价员`
  - 修改 BOM
  - 修改成本与利润参数
  - 维护价格库

- `销售经理`
  - 审批报价
  - 查看团队报价

- `工厂管理`
  - 查看成本结构
  - 校验工艺与生产可行性

- `财务`
  - 查看利润与税费口径

- `系统管理员`
  - 维护角色、模板、参数、日志

---

## 9. 当前代码与 ERP 架构的映射

### 9.1 当前实现

- `index.html`
  - 展示层页面结构

- `styles.css`
  - 展示层样式

- `app.js`
  - 当前承担了：
    - 状态管理
    - 计算引擎
    - 表单处理
    - 渲染逻辑
    - 导出逻辑
  - 这在 ERP 阶段需要逐步拆分

- `cloud.js`
  - 前端协作与接口调用层

- `server.mjs`
  - 轻量 API 层

### 9.2 ERP 化后建议拆分

- `quote-ui`
  - 页面渲染

- `quote-domain`
  - 报价领域对象

- `quote-pricing-engine`
  - 所有核价公式

- `quote-repository`
  - 数据访问

- `quote-approval`
  - 审批流

- `quote-integration`
  - ERP 其他模块接口

---

## 10. 建议的接口边界

ERP 化之后，建议 API 至少按以下资源组织：

### 10.1 报价单接口

- `GET /api/quotes`
- `POST /api/quotes`
- `GET /api/quotes/:id`
- `PUT /api/quotes/:id`
- `POST /api/quotes/:id/copy`
- `POST /api/quotes/:id/void`

### 10.2 报价审批接口

- `POST /api/quotes/:id/submit`
- `POST /api/quotes/:id/approve`
- `POST /api/quotes/:id/reject`

### 10.3 价格库接口

- `GET /api/pricing-rules`
- `POST /api/pricing-rules`
- `PUT /api/pricing-rules/:id`

### 10.4 ERP 联动接口

- `POST /api/quotes/:id/generate-sales-order`
- `GET /api/customers/search`
- `GET /api/products/search`
- `GET /api/bom-templates/:id`

---

## 11. 分阶段演进路线

### 阶段 1：独立报价系统

当前阶段目标：

- 可以登录
- 可以搜索
- 可以保存
- 可以导出

### 阶段 2：ERP 预集成

目标：

- 接客户主数据
- 接产品模板
- 接价格库
- 接用户权限

### 阶段 3：ERP 正式集成

目标：

- 报价审批
- 报价转订单
- 报价版本冻结
- 经营分析报表

### 阶段 4：经营决策系统

目标：

- 成本趋势预测
- 客户价格策略推荐
- 毛利预警
- 材料涨价影响模拟

---

## 12. 结论

从 ERP 视角看，这个系统不应再被定义成“一个报价页面”，而应被定义成：

**一个以成本核算与销售报价为核心的 ERP 报价子系统。**

它未来最合理的位置是：

- 上接客户、产品、BOM、价格主数据
- 中间完成核价、审批、版本控制
- 下接订单、采购、生产、财务与经营分析

如果按这个方向继续演进，当前项目建议优先完成三件事：

1. 将 `app.js` 中的计算引擎与页面渲染拆开
2. 将报价单、版本、审批、价格规则的数据模型标准化
3. 将报价模块正式定义为 ERP 子系统，而不是附属工具页
