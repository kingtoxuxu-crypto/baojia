# 报价字段与规则契约

本文档用于开发拆表、建接口、写测试和做 UI 原型。字段名采用建议命名，前端显示可继续使用中文。

## 1. 主数据字段

### customers

| 字段 | 含义 |
| --- | --- |
| customer_code | 客户编码 |
| customer_name | 客户名称 |
| customer_level | 客户等级 |
| default_currency | 默认报价币种 |
| default_trade_term | 默认贸易条款 |
| default_destination_port | 默认目的港 |
| default_payment_terms | 默认付款方式 |
| commission_required | 是否含佣金 |
| agent_name | 代理/中间商 |
| target_margin_rate | 客户目标毛利规则 |
| credit_risk_note | 信用风险备注 |
| last_deal_price_json | 历史成交价快照 |
| rejected_reason_json | 历史拒单原因 |

### products

| 字段 | 含义 |
| --- | --- |
| product_code | 产品编码 |
| product_name | 产品名称 |
| product_category | 马桶、台盆、盖板、水件、包装等 |
| product_type | 分体、连体、台上盆、台下盆等 |
| default_supply_source | 默认供应来源 |
| default_supply_path | 默认供应路径 |
| spec_json | 产品规格 |

### packaging_versions

| 字段 | 含义 |
| --- | --- |
| version_code | 包装版本号 |
| packing_mode | 1 件/箱、2 件/箱、套装同箱、分箱等 |
| units_per_carton | 每箱数量 |
| net_weight_kg | 净重 |
| gross_weight_kg | 毛重 |
| carton_length_mm / carton_width_mm / carton_height_mm | 外箱尺寸 |
| cbm_per_carton | 单箱 CBM |
| cbm_per_unit | 单件 CBM |
| nested_cbm_per_set | 嵌套后套装 CBM |
| nesting_rule_json | 嵌套规则 |

### bom_items

| 字段 | 含义 |
| --- | --- |
| component_product_id | 组件产品 |
| item_category | 陶瓷、配件、包装、人工、损耗、间接费用等 |
| qty_per_set | 每套用量 |
| default_supply_source | 尼厂、中国供应商、本地供应商、手动确认 |
| default_cost_basis | 成本口径 |
| default_supply_path | 供应路径 |
| default_cost_handling | 计入套装、独立物流、客户单独报价、参考不计入 |
| is_customer_visible | 客户是否可见 |
| is_optional | 是否可选配件 |

### supplier_quotes

| 字段 | 含义 |
| --- | --- |
| supplier_id | 供应商 |
| product_id | 产品，可为空 |
| item_name | 报价物料 |
| currency | 币种 |
| unit_price | 单价 |
| cost_basis | EXW、送仓、FOB 中国港、到尼厂入库等 |
| moq | 最小起订量 |
| lead_time_days | 交期 |
| valid_from / valid_until | 有效期 |
| approval_status | 草稿、待审批、已批准、已过期 |

### logistics_rates

| 字段 | 含义 |
| --- | --- |
| route_id | 物流路线 |
| container_type | 20GP、40GP、40HQ |
| allocation_method | 按柜、按件、按 CBM、按金额比例、手动 |
| freight_amount | 运费 |
| local_charge_amount | 港杂/本地费 |
| insurance_rate | 保险费率 |
| insurance_fixed_amount | 固定保险金额 |
| min_container_qty | 最小起柜量 |
| surcharge_json | 超长、超重、特殊货物附加费 |
| valid_until | 运价有效期 |

## 2. 报价行字段

每条报价行必须至少保存：

| 字段 | 说明 |
| --- | --- |
| quote_object_type | 单品、套装、可选配件、分项报价 |
| shipment_group_code | 出货组，用于分组装柜和分项贸易条款 |
| supply_source | 尼厂、中国供应商、本地供应商、手动确认 |
| cost_basis | 成本口径 |
| supply_path | 尼厂配套、中国直发、发尼厂后配套、本地采购配套 |
| assembly_mode | 组装同箱、到厂不组装随货、直发、不适用 |
| trade_term | FOB、CFR、CIF、DDP 手动 |
| origin_port / destination_port | 出货港和目的港 |
| is_included_in_set_price | 是否进入套装价 |
| is_customer_visible | 客户是否可见 |
| is_separate_quote | 是否客户单独报价 |
| participates_in_container_loading | 是否参与整柜装载 |
| snapshot_json | 产品、包装、BOM、供应商报价、汇率和物流快照 |

## 3. 报价计算顺序

1. 读取客户、产品版本、包装版本、BOM 版本。
2. 判断报价对象：单品、套装、可选配件、分项报价。
3. 判断每个报价行的供应来源、价格口径、配套方式和贸易条款。
4. 判断是否需要补物流、包装、组装人工、检验、损耗和风险预留。
5. 按供应路径和出货组分组。
6. 计算 CBM、毛重、装柜量、柜数、装载率和物流摊销。
7. 计算 FOB 成本。
8. CFR 增加海运费。
9. CIF 增加保险费。
10. 加入佣金、售后、破损、索赔、汇率风险和其他费用。
11. 按目标毛利和底线毛利生成建议销售价。
12. 生成数量阶梯报价并重算物流摊销。
13. 执行风险检查。
14. 保存快照。
15. 输出客户版 PDF 和内部核价 Excel。

## 4. 装柜规则

### 基础公式

```text
单箱 CBM = 外箱长 × 外箱宽 × 外箱高 / 1,000,000,000
单件 CBM = 单箱 CBM / 每箱数量
体积可装量 = 柜型有效 CBM × 装载效率 / 每套 CBM
重量可装量 = (柜型限重 - 安全余量) / 每套毛重
建议装柜量 = min(体积可装量, 重量可装量)
预计柜数 = ceil(订单数量 / 建议装柜量)
装载率 = 实际货物 CBM / (柜型有效 CBM × 预计柜数)
```

### 组合规则

- 组装同箱：使用最终套装包装版本计算。
- 到厂不组装随货：陶瓷与配件分别计算 CBM/毛重，再按出货组合合并。
- 中国直发：不进入尼日利亚出货组，独立计算中国段物流。
- 到尼厂入库成本：默认不再补中国到尼厂物流。
- 嵌套装箱：第一版使用手动维护的 `nested_cbm_per_set`，有值时优先。

装载率低于 `85%` 时生成提醒。第一版只做规则提示，不做智能组合优化。

## 5. 价格规则

```text
FOB 成本 = 产品/BOM成本 + 包装 + 组装/人工 + 检验 + 损耗 + 本地出港费用 + 风险预留
CFR 成本 = FOB 成本 + 海运费
CIF 成本 = CFR 成本 + 保险费
建议售价 = 含条款成本 / (1 - 目标毛利率)
底线售价 = 含条款成本 / (1 - 底线毛利率)
```

风险预留包括陶瓷破损、配件缺件、售后备件、客诉赔付、返工/补发、包装加强、抽检/验货。

## 6. 风险检查代码

| 编码 | 等级 | 规则 |
| --- | --- | --- |
| COST_MISSING | 阻断 | 计入报价的成本行金额为空 |
| BELOW_FLOOR_MARGIN | 阻断 | 当前毛利低于底线毛利 |
| CIF_INSURANCE_MISSING | 阻断 | CIF 缺保险费率或固定保险金额 |
| DDP_NOT_APPROVED | 阻断 | DDP 未主管审批 |
| MANUAL_COST_NOT_APPROVED | 阻断 | 手动成本缺审批 |
| INTERNAL_FIELD_LEAK | 阻断 | 客户版含内部字段 |
| DUPLICATE_LOGISTICS | 阻断 | 已含物流成本又重复加物流 |
| SUPPLIER_QUOTE_EXPIRED | 审批 | 使用过期供应商报价 |
| LOGISTICS_RATE_EXPIRED | 审批 | 使用过期物流费率 |
| BELOW_TARGET_MARGIN | 审批 | 毛利低于目标但高于底线 |
| MANUAL_LOADING_PLAN | 审批 | 手动修改装柜方案 |
| MANUAL_SELLING_PRICE | 审批 | 手动修改销售价 |
| CUSTOM_FX_RATE | 审批 | 使用自定义汇率 |
| HIGH_AMOUNT_QUOTE | 审批 | 高金额报价 |
| LOW_LOADING_RATE | 提醒 | 装载率低 |
| ABOVE_CUSTOMER_HISTORY | 提醒 | 高于客户历史价较多 |
| FX_NEAR_THRESHOLD | 提醒 | 汇率接近复核阈值 |
| QUOTE_VALIDITY_LONGER_THAN_COST | 提醒 | 客户报价有效期长于成本有效期 |

## 7. 第一版接口边界

- 主数据 CRUD：客户、产品、包装版本、BOM 版本、供应商、供应商报价、物流路线、物流费率、汇率。
- 报价：创建、保存草稿、提交核价、提交审批、批准、外发、接受/拒绝、转订单、作废、复制为新草稿、创建新版本。
- 输出：客户版 PDF 数据、内部 Excel 数据。
- 预留：物流接口、汇率接口、CRM/ERP 同步接口。
