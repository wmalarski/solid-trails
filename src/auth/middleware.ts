import type { RequestMiddleware } from "@solidjs/start/middleware";
import { initAuth } from "./init";

export const authMiddleware: RequestMiddleware = async (event) => {
  const auth = initAuth(event);
  event.locals.auth = auth;

  try {
    const headers = event.request.headers;
    const session = await auth.api.getSession({ headers });
    event.locals.session = session?.session ?? null;
    event.locals.user = session?.user ?? null;
  } catch {
    event.locals.session = null;
    event.locals.user = null;
  }
};
