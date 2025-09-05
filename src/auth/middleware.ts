import type { RequestMiddleware } from "@solidjs/start/middleware";
import { getRequestEventOrThrow } from "~/utils/get-request-event-or-throw";
import { getRequestAuth, UNAUTHORIZED_STATE } from "./cookies";

export const authMiddleware: RequestMiddleware = async (event) => {
  try {
    const auth = await getRequestAuth();
    event.locals.auth = auth;
    getRequestEventOrThrow().locals.auth = auth;
  } catch {
    event.locals.auth = UNAUTHORIZED_STATE;
    getRequestEventOrThrow().locals.auth = UNAUTHORIZED_STATE;
  }
};
