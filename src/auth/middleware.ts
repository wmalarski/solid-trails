import type { RequestMiddleware } from "@solidjs/start/middleware";
import { getRequestAuth, UNAUTHORIZED_STATE } from "./cookies";

export const authMiddleware: RequestMiddleware = async (event) => {
  try {
    console.log("[auth-0]");
    const auth = await getRequestAuth(event);
    console.log("[auth-1]");
    event.locals.auth = auth;
    console.log("[auth-2]");
    // getRequestEventOrThrow().locals.auth = auth;
    console.log("[auth-3]");
  } catch (error) {
    console.log("[auth-4]", error);
    event.locals.auth = UNAUTHORIZED_STATE;
    console.log("[auth-5]");
    // getRequestEventOrThrow().locals.auth = UNAUTHORIZED_STATE;
    console.log("[auth-6]");
  }
  console.log("[auth-7]");
};
