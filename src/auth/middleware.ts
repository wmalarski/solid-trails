import type { RequestMiddleware } from "@solidjs/start/middleware";
import { getRequestSession } from "./services";

export const authMiddleware: RequestMiddleware = async (event) => {
  try {
    const session = await getRequestSession(event.nativeEvent);
    event.locals.session = session;
  } catch {
    event.locals.session = null;
  }
};
