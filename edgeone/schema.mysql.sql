create table if not exists users (
  id char(36) primary key default (uuid()),
  email varchar(190) not null unique,
  full_name varchar(100) not null,
  role varchar(20) not null default 'editor',
  password_hash varchar(255) not null,
  is_active tinyint(1) not null default 1,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp
);

create table if not exists sessions (
  id char(36) primary key,
  user_id char(36) not null,
  expires_at datetime not null,
  created_at datetime not null default current_timestamp,
  index idx_sessions_user_id (user_id),
  index idx_sessions_expires_at (expires_at),
  constraint fk_sessions_user foreign key (user_id) references users(id) on delete cascade
);

create table if not exists quotes (
  id char(36) primary key default (uuid()),
  quote_code varchar(80) not null unique,
  quote_group_code varchar(80) null,
  version_no int not null default 1,
  parent_quote_id char(36) null,
  customer_name varchar(255) null,
  project_name varchar(255) null,
  product_name varchar(255) null,
  model_code varchar(100) null,
  trade_term varchar(100) null,
  destination_market varchar(100) null,
  order_quantity int not null default 0,
  calc_mode varchar(20) not null default 'unit',
  status varchar(20) not null default 'draft',
  approval_note text null,
  submitted_at datetime null,
  approved_at datetime null,
  approved_by char(36) null,
  rejected_at datetime null,
  rejected_by char(36) null,
  form_json json not null,
  rows_json json not null,
  budget_rows_json json not null,
  summary_json json not null,
  price_library_json json not null,
  collapsed_categories_json json not null,
  totals_json json not null,
  created_by char(36) null,
  updated_by char(36) null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  index idx_quotes_quote_code (quote_code),
  index idx_quotes_group_code (quote_group_code),
  index idx_quotes_version_no (version_no),
  index idx_quotes_customer_name (customer_name),
  index idx_quotes_project_name (project_name),
  index idx_quotes_product_name (product_name),
  index idx_quotes_model_code (model_code),
  index idx_quotes_updated_at (updated_at),
  constraint fk_quotes_parent_quote foreign key (parent_quote_id) references quotes(id) on delete set null,
  constraint fk_quotes_created_by foreign key (created_by) references users(id) on delete set null,
  constraint fk_quotes_updated_by foreign key (updated_by) references users(id) on delete set null,
  constraint fk_quotes_approved_by foreign key (approved_by) references users(id) on delete set null,
  constraint fk_quotes_rejected_by foreign key (rejected_by) references users(id) on delete set null
);

create table if not exists customers (
  id char(36) primary key default (uuid()),
  customer_code varchar(80) not null unique,
  customer_name varchar(255) not null,
  customer_level varchar(40) not null default 'standard',
  default_currency varchar(10) not null default 'USD',
  default_trade_term varchar(40) null,
  default_destination_port varchar(120) null,
  default_payment_terms varchar(255) null,
  commission_required tinyint(1) not null default 0,
  agent_name varchar(255) null,
  target_margin_rate decimal(8,4) null,
  discount_authority_note text null,
  credit_risk_note text null,
  last_deal_price_json json null,
  rejected_reason_json json null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  index idx_customers_name (customer_name),
  index idx_customers_level (customer_level)
);

create table if not exists products (
  id char(36) primary key default (uuid()),
  product_code varchar(100) not null unique,
  product_name varchar(255) not null,
  product_category varchar(80) not null,
  product_type varchar(80) null,
  lifecycle_status varchar(40) not null default 'active',
  default_supply_source varchar(80) null,
  default_supply_path varchar(120) null,
  image_url varchar(500) null,
  spec_json json not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  index idx_products_category (product_category),
  index idx_products_name (product_name)
);

create table if not exists product_versions (
  id char(36) primary key default (uuid()),
  product_id char(36) not null,
  version_code varchar(80) not null,
  material_version varchar(120) null,
  color_version varchar(120) null,
  status varchar(40) not null default 'active',
  product_cost_valid_until date null,
  spec_snapshot_json json not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  unique key uq_product_versions (product_id, version_code),
  constraint fk_product_versions_product foreign key (product_id) references products(id) on delete cascade
);

create table if not exists packaging_versions (
  id char(36) primary key default (uuid()),
  product_id char(36) not null,
  version_code varchar(80) not null,
  packing_mode varchar(80) not null,
  units_per_carton int not null default 1,
  product_length_mm decimal(12,3) null,
  product_width_mm decimal(12,3) null,
  product_height_mm decimal(12,3) null,
  net_weight_kg decimal(12,3) null,
  carton_length_mm decimal(12,3) null,
  carton_width_mm decimal(12,3) null,
  carton_height_mm decimal(12,3) null,
  gross_weight_kg decimal(12,3) null,
  cbm_per_carton decimal(14,6) null,
  cbm_per_unit decimal(14,6) null,
  nested_cbm_per_set decimal(14,6) null,
  nesting_rule_json json null,
  status varchar(40) not null default 'active',
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  unique key uq_packaging_versions (product_id, version_code),
  constraint fk_packaging_versions_product foreign key (product_id) references products(id) on delete cascade
);

create table if not exists bom_versions (
  id char(36) primary key default (uuid()),
  product_id char(36) not null,
  version_code varchar(80) not null,
  bom_type varchar(60) not null default 'standard',
  status varchar(40) not null default 'active',
  effective_from date null,
  valid_until date null,
  note text null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  unique key uq_bom_versions (product_id, version_code),
  constraint fk_bom_versions_product foreign key (product_id) references products(id) on delete cascade
);

create table if not exists bom_items (
  id char(36) primary key default (uuid()),
  bom_version_id char(36) not null,
  line_no int not null default 1,
  component_product_id char(36) null,
  item_category varchar(100) not null,
  item_name varchar(255) not null,
  qty_per_set decimal(14,4) not null default 1,
  unit varchar(40) not null default 'pcs',
  default_supply_source varchar(80) not null,
  default_cost_basis varchar(80) not null,
  default_supply_path varchar(120) not null,
  default_cost_handling varchar(80) not null,
  is_customer_visible tinyint(1) not null default 1,
  is_optional tinyint(1) not null default 0,
  note text null,
  constraint fk_bom_items_version foreign key (bom_version_id) references bom_versions(id) on delete cascade,
  constraint fk_bom_items_component foreign key (component_product_id) references products(id) on delete set null,
  index idx_bom_items_version (bom_version_id)
);

create table if not exists suppliers (
  id char(36) primary key default (uuid()),
  supplier_code varchar(100) not null unique,
  supplier_name varchar(255) not null,
  supplier_type varchar(80) not null,
  country varchar(80) null,
  contact_name varchar(120) null,
  contact_phone varchar(120) null,
  contact_email varchar(190) null,
  payment_terms varchar(255) null,
  default_lead_time_days int null,
  status varchar(40) not null default 'active',
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  index idx_suppliers_type (supplier_type),
  index idx_suppliers_name (supplier_name)
);

create table if not exists supplier_quotes (
  id char(36) primary key default (uuid()),
  supplier_id char(36) not null,
  product_id char(36) null,
  item_name varchar(255) not null,
  currency varchar(10) not null,
  unit_price decimal(16,4) not null,
  cost_basis varchar(80) not null,
  moq decimal(14,4) null,
  lead_time_days int null,
  valid_from date null,
  valid_until date null,
  attachment_url varchar(500) null,
  approval_status varchar(40) not null default 'draft',
  approved_by char(36) null,
  approved_at datetime null,
  note text null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  constraint fk_supplier_quotes_supplier foreign key (supplier_id) references suppliers(id) on delete cascade,
  constraint fk_supplier_quotes_product foreign key (product_id) references products(id) on delete set null,
  constraint fk_supplier_quotes_approved_by foreign key (approved_by) references users(id) on delete set null,
  index idx_supplier_quotes_item (item_name),
  index idx_supplier_quotes_valid_until (valid_until)
);

create table if not exists logistics_routes (
  id char(36) primary key default (uuid()),
  route_code varchar(100) not null unique,
  route_name varchar(255) not null,
  supply_path varchar(120) not null,
  origin_country varchar(80) null,
  origin_port varchar(120) null,
  destination_country varchar(80) null,
  destination_port varchar(120) null,
  trade_term varchar(40) null,
  status varchar(40) not null default 'active',
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  index idx_logistics_routes_path (supply_path),
  index idx_logistics_routes_ports (origin_port, destination_port)
);

create table if not exists logistics_rates (
  id char(36) primary key default (uuid()),
  route_id char(36) not null,
  container_type varchar(40) not null default '40HQ',
  allocation_method varchar(40) not null,
  currency varchar(10) not null default 'USD',
  freight_amount decimal(16,4) not null default 0,
  local_charge_amount decimal(16,4) not null default 0,
  insurance_rate decimal(10,6) null,
  insurance_fixed_amount decimal(16,4) null,
  valid_from date null,
  valid_until date null,
  min_container_qty decimal(12,4) null,
  surcharge_json json null,
  note text null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  constraint fk_logistics_rates_route foreign key (route_id) references logistics_routes(id) on delete cascade,
  index idx_logistics_rates_valid_until (valid_until)
);

create table if not exists currency_rates (
  id char(36) primary key default (uuid()),
  rate_date date not null,
  from_currency varchar(10) not null,
  to_currency varchar(10) not null,
  exchange_rate decimal(18,8) not null,
  source varchar(80) not null default 'manual',
  valid_until date null,
  created_at datetime not null default current_timestamp,
  unique key uq_currency_rates (rate_date, from_currency, to_currency)
);

create table if not exists quote_items (
  id char(36) primary key default (uuid()),
  quote_id char(36) not null,
  line_no int not null,
  product_id char(36) null,
  product_version_id char(36) null,
  packaging_version_id char(36) null,
  bom_version_id char(36) null,
  item_name varchar(255) not null,
  quote_object_type varchar(80) not null,
  shipment_group_code varchar(80) not null,
  supply_source varchar(80) not null,
  cost_basis varchar(80) not null,
  supply_path varchar(120) not null,
  assembly_mode varchar(80) not null,
  trade_term varchar(40) not null,
  origin_port varchar(120) null,
  destination_port varchar(120) null,
  qty decimal(14,4) not null default 1,
  unit varchar(40) not null default 'set',
  unit_cost_amount decimal(16,4) not null default 0,
  currency varchar(10) not null default 'RMB',
  is_included_in_set_price tinyint(1) not null default 1,
  is_customer_visible tinyint(1) not null default 1,
  is_separate_quote tinyint(1) not null default 0,
  participates_in_container_loading tinyint(1) not null default 1,
  snapshot_json json not null,
  created_at datetime not null default current_timestamp,
  constraint fk_quote_items_quote foreign key (quote_id) references quotes(id) on delete cascade,
  constraint fk_quote_items_product foreign key (product_id) references products(id) on delete set null,
  constraint fk_quote_items_product_version foreign key (product_version_id) references product_versions(id) on delete set null,
  constraint fk_quote_items_packaging_version foreign key (packaging_version_id) references packaging_versions(id) on delete set null,
  constraint fk_quote_items_bom_version foreign key (bom_version_id) references bom_versions(id) on delete set null,
  index idx_quote_items_quote (quote_id),
  index idx_quote_items_shipment_group (shipment_group_code)
);

create table if not exists quote_snapshots (
  id char(36) primary key default (uuid()),
  quote_id char(36) not null,
  snapshot_type varchar(80) not null,
  snapshot_version varchar(80) not null,
  snapshot_at datetime not null default current_timestamp,
  snapshot_json json not null,
  constraint fk_quote_snapshots_quote foreign key (quote_id) references quotes(id) on delete cascade,
  index idx_quote_snapshots_quote (quote_id),
  index idx_quote_snapshots_type (snapshot_type)
);

create table if not exists quote_risk_checks (
  id char(36) primary key default (uuid()),
  quote_id char(36) not null,
  severity varchar(30) not null,
  check_code varchar(100) not null,
  check_name varchar(255) not null,
  status varchar(30) not null,
  message text not null,
  target_ref varchar(255) null,
  created_at datetime not null default current_timestamp,
  constraint fk_quote_risk_checks_quote foreign key (quote_id) references quotes(id) on delete cascade,
  index idx_quote_risk_checks_quote (quote_id),
  index idx_quote_risk_checks_status (severity, status)
);

create table if not exists approvals (
  id char(36) primary key default (uuid()),
  quote_id char(36) not null,
  approval_type varchar(80) not null,
  status varchar(40) not null default 'pending',
  requested_by char(36) null,
  requested_at datetime not null default current_timestamp,
  approved_by char(36) null,
  approved_at datetime null,
  approval_note text null,
  constraint fk_approvals_quote foreign key (quote_id) references quotes(id) on delete cascade,
  constraint fk_approvals_requested_by foreign key (requested_by) references users(id) on delete set null,
  constraint fk_approvals_approved_by foreign key (approved_by) references users(id) on delete set null,
  index idx_approvals_quote (quote_id),
  index idx_approvals_status (status)
);

create table if not exists audit_logs (
  id char(36) primary key default (uuid()),
  actor_user_id char(36) null,
  entity_type varchar(80) not null,
  entity_id char(36) null,
  action varchar(80) not null,
  before_json json null,
  after_json json null,
  created_at datetime not null default current_timestamp,
  constraint fk_audit_logs_actor foreign key (actor_user_id) references users(id) on delete set null,
  index idx_audit_logs_entity (entity_type, entity_id),
  index idx_audit_logs_actor (actor_user_id)
);
