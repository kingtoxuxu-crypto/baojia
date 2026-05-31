import { buildClearSessionCookie, destroySession } from "../../_lib/auth.js";
import { json, serverError } from "../../_lib/http.js";

export const onRequestPost = async ({ request }) => {
  try {
    await destroySession(request);
    return json({ message: "已退出登录" }, 200, {
      "Set-Cookie": buildClearSessionCookie()
    });
  } catch (error) {
    return serverError(error);
  }
};
