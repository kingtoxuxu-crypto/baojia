import { createSession, verifyPassword, buildSessionCookie } from "../../_lib/auth.js";
import { query } from "../../_lib/db.js";
import { badRequest, json, serverError, unauthorized } from "../../_lib/http.js";

export const onRequestPost = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return badRequest("请输入邮箱和密码");
    }

    const rows = await query(
      "select id, email, full_name, role, is_active, password_hash from users where email = ? limit 1",
      [String(email).trim().toLowerCase()]
    );
    const user = rows[0];
    if (!user || !user.is_active || !verifyPassword(password, user.password_hash)) {
      return unauthorized("邮箱或密码不正确");
    }

    const session = await createSession(user);
    return json({
      message: "登录成功",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role
      }
    }, 200, {
      "Set-Cookie": buildSessionCookie(session.token, session.expiresAt)
    });
  } catch (error) {
    return serverError(error);
  }
};
