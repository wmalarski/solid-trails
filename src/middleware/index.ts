import { createMiddleware } from "@solidjs/start/middleware";
import { authMiddleware } from "~/integrations/auth/middleware";

export default createMiddleware({
  onRequest: [authMiddleware],
});
