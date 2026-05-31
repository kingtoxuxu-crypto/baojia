export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers
    }
  });
}

export function badRequest(message) {
  return json({ message }, 400);
}

export function unauthorized(message = "未登录或登录已过期") {
  return json({ message }, 401);
}

export function serverError(error) {
  return json({ message: error?.message || "服务器内部错误" }, 500);
}

export function readCookie(request, name) {
  const cookieHeader = request.headers.get("cookie") || "";
  const pairs = cookieHeader.split(";").map((item) => item.trim()).filter(Boolean);
  for (const pair of pairs) {
    const [key, ...rest] = pair.split("=");
    if (key === name) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return "";
}
