import { getCurrentUser } from "../../_lib/auth.js";
import { json, serverError } from "../../_lib/http.js";

export const onRequestGet = async ({ request }) => {
  try {
    const user = await getCurrentUser(request);
    return json({
      user: user ? {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role
      } : null
    });
  } catch (error) {
    return serverError(error);
  }
};
