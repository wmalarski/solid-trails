import type { RequestMiddleware } from "@solidjs/start/middleware";
import { getRequestAuth, UNAUTHORIZED_STATE } from "./cookies";

export const authMiddleware: RequestMiddleware = async (event) => {
  try {
    const auth = await getRequestAuth(event);
    event.locals.auth = auth;
  } catch {
    event.locals.auth = UNAUTHORIZED_STATE;
  }
};
