import { action, query, redirect } from "@solidjs/router";
import { removeSessionCookies } from "~/auth/cookies";
import { getRequestEventOrThrow } from "~/utils/get-request-event-or-throw";
import { paths } from "~/utils/paths";

export const getAthleteServerQuery = query(async () => {
  "use server";

  const event = getRequestEventOrThrow();

  const auth = event.locals.auth;

  if (!auth?.authorized) {
    throw redirect(paths.signIn);
  }

  return auth.athlete;
}, "getAthlete");

export const signOutServerAction = action(async () => {
  "use server";

  const event = getRequestEventOrThrow();

  removeSessionCookies(event.nativeEvent);

  event.locals.auth = null;

  throw redirect(paths.signIn, {
    revalidate: getAthleteServerQuery.key,
  });
});
