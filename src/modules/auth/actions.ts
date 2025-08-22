import { action, query, redirect } from "@solidjs/router";
import { deauthorizeTokens, removeSessionCookies } from "~/auth/services";
import { getRequestEventOrThrow } from "~/utils/get-request-event-or-throw";
import { paths } from "~/utils/paths";

export const getAthleteServerQuery = query(async () => {
  "use server";

  const event = getRequestEventOrThrow();

  const athlete = event.locals.session?.athlete;

  if (!athlete) {
    throw redirect(paths.signIn);
  }

  return athlete;
}, "athlete");

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
    revalidate: getAthleteServerQuery.key,
  });
});
