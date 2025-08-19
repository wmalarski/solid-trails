import type { FetchEvent } from "@solidjs/start/server";
import { betterAuth } from "better-auth";

export const initAuth = (_event: FetchEvent) => {
  // if (import.meta.env.DEV) {
  //   return betterAuth({
  //     baseURL: import.meta.env.BETTER_AUTH_URL,
  //     database: drizzleAdapter(event.locals.db, { provider: "sqlite" }),
  //     emailAndPassword: { enabled: true },
  //     secret: import.meta.env.BETTER_AUTH_SECRET,
  //   });
  // }

  // const env = getCloudflareEnv(event);

  return betterAuth({
    // baseURL: env.BETTER_AUTH_URL,
    // database: drizzleAdapter(event.locals.db, { provider: "sqlite", schema }),
    // emailAndPassword: { enabled: true },
    // secret: env.BETTER_AUTH_SECRET,
  });
};

export type Auth = ReturnType<typeof initAuth>;
