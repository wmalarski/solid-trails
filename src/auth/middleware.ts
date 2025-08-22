import type { RequestMiddleware } from "@solidjs/start/middleware";
import { getRequestSession } from "./services";

export const authMiddleware: RequestMiddleware = async (event) => {
  try {
    console.log("[authMiddleware]");
    const session = await getRequestSession(event.nativeEvent);
    console.log("[authMiddleware]", { session });
    event.locals.session = session;
    console.log("[authMiddleware]", { current: event.locals.session });
  } catch {
    console.log("[authMiddleware-null]");
    event.locals.session = null;
  }
};
