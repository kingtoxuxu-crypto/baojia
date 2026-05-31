import { requireUser } from "../../_lib/auth.js";
import { query } from "../../_lib/db.js";
import { json, serverError } from "../../_lib/http.js";

export const onRequestGet = async ({ request, params }) => {
  try {
    const auth = await requireUser(request);
    if (auth.error) {
      return auth.error;
    }

    const rows = await query(
      `select id, quote_code, customer_name, project_name, product_name, model_code, trade_term,
              destination_market, order_quantity, calc_mode, status, form_json, rows_json,
              budget_rows_json, summary_json, price_library_json, collapsed_categories_json,
              totals_json, created_by, updated_by, created_at, updated_at
       from quotes
       where id = ?
       limit 1`,
      [params.id]
    );

    if (!rows.length) {
      return json({ message: "报价单不存在" }, 404);
    }

    const row = rows[0];
    return json({
      data: {
        ...row,
        form_json: safeJson(row.form_json, {}),
        rows_json: safeJson(row.rows_json, []),
        budget_rows_json: safeJson(row.budget_rows_json, []),
        summary_json: safeJson(row.summary_json, {}),
        price_library_json: safeJson(row.price_library_json, {}),
        collapsed_categories_json: safeJson(row.collapsed_categories_json, {}),
        totals_json: safeJson(row.totals_json, {})
      }
    });
  } catch (error) {
    return serverError(error);
  }
};

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
