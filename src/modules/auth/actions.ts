import { action, query, redirect } from "@solidjs/router";
import { deauthorizeTokens, removeSessionCookies } from "~/auth/services";
import { getRequestEventOrThrow } from "~/utils/get-request-event-or-throw";
import { paths } from "~/utils/paths";

export const getUserServerQuery = query(async () => {
  "use server";

  const event = getRequestEventOrThrow();

  const user = event.locals.user;

  if (!user) {
    throw redirect(paths.signIn);
  }

  return user;
}, "user");

export const getAnonServerQuery = query(async () => {
  "use server";

  const event = getRequestEventOrThrow();

  const user = event.locals.user;

  if (user) {
    throw redirect(paths.home);
  }

  return null;
}, "anon");

export const signOutServerAction = action(async () => {
  "use server";

  const event = getRequestEventOrThrow();

  const accessToken = event.locals.session?.accessToken;

  if (accessToken) {
    await deauthorizeTokens({ accessToken });
    removeSessionCookies(event.nativeEvent);

    event.locals.session = null;
  }

  throw redirect(paths.signIn, {
    revalidate: [getUserServerQuery.key, getAnonServerQuery.key],
  });
});
