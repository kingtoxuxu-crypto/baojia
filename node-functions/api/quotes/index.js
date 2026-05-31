import { requireUser } from "../../_lib/auth.js";
import { query } from "../../_lib/db.js";
import { badRequest, json, serverError } from "../../_lib/http.js";

export const onRequestGet = async ({ request }) => {
  try {
    const auth = await requireUser(request);
    if (auth.error) {
      return auth.error;
    }

    const url = new URL(request.url);
    const keyword = String(url.searchParams.get("keyword") || "").trim();
    let rows;

    if (keyword) {
      const like = `%${keyword}%`;
      rows = await query(
        `select id, quote_code, customer_name, project_name, product_name, model_code, order_quantity, status, updated_at
         from quotes
         where quote_code like ? or customer_name like ? or project_name like ? or product_name like ? or model_code like ?
         order by updated_at desc
         limit 30`,
        [like, like, like, like, like]
      );
    } else {
      rows = await query(
        `select id, quote_code, customer_name, project_name, product_name, model_code, order_quantity, status, updated_at
         from quotes
         order by updated_at desc
         limit 30`
      );
    }

    return json({ data: rows });
  } catch (error) {
    return serverError(error);
  }
};

export const onRequestPost = async ({ request }) => {
  try {
    const auth = await requireUser(request);
    if (auth.error) {
      return auth.error;
    }

    const body = await request.json();
    if (!body.quote_code) {
      return badRequest("缺少报价单号");
    }

    await query(
      `insert into quotes (
        quote_code, customer_name, project_name, product_name, model_code, trade_term, destination_market,
        order_quantity, calc_mode, status, form_json, rows_json, budget_rows_json, summary_json,
        price_library_json, collapsed_categories_json, totals_json, created_by, updated_by
      ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      on duplicate key update
        customer_name = values(customer_name),
        project_name = values(project_name),
        product_name = values(product_name),
        model_code = values(model_code),
        trade_term = values(trade_term),
        destination_market = values(destination_market),
        order_quantity = values(order_quantity),
        calc_mode = values(calc_mode),
        status = values(status),
        form_json = values(form_json),
        rows_json = values(rows_json),
        budget_rows_json = values(budget_rows_json),
        summary_json = values(summary_json),
        price_library_json = values(price_library_json),
        collapsed_categories_json = values(collapsed_categories_json),
        totals_json = values(totals_json),
        updated_by = values(updated_by)`,
      [
        body.quote_code,
        body.customer_name || "",
        body.project_name || "",
        body.product_name || "",
        body.model_code || "",
        body.trade_term || "",
        body.destination_market || "",
        Number(body.order_quantity) || 0,
        body.calc_mode || "unit",
        body.status || "draft",
        JSON.stringify(body.form_json || {}),
        JSON.stringify(body.rows_json || []),
        JSON.stringify(body.budget_rows_json || []),
        JSON.stringify(body.summary_json || {}),
        JSON.stringify(body.price_library_json || {}),
        JSON.stringify(body.collapsed_categories_json || {}),
        JSON.stringify(body.totals_json || {}),
        auth.user.id,
        auth.user.id
      ]
    );

    return json({ message: "报价单已保存到云端" });
  } catch (error) {
    return serverError(error);
  }
};
