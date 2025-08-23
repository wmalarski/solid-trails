import type { RequestMiddleware } from "@solidjs/start/middleware";
import { getRequestAuth } from "./cookies";

export const authMiddleware: RequestMiddleware = async (event) => {
  try {
    const auth = await getRequestAuth(event.nativeEvent);
    event.locals.auth = auth;
  } catch {
    event.locals.auth = null;
  }
};
