import { action, query, redirect } from "@solidjs/router";
import { removeSessionCookies, UNAUTHORIZED_STATE } from "~/auth/cookies";
import {
  getAuthorizedRequestEventOrThrow,
  getRequestEventOrThrow,
} from "~/utils/get-request-event-or-throw";
import { paths } from "~/utils/paths";

export const getAthleteServerQuery = query(async () => {
  "use server";

  const { auth } = getAuthorizedRequestEventOrThrow();

  return auth.athlete;
}, "getAthlete");

export const signOutServerAction = action(async () => {
  "use server";

  const event = getRequestEventOrThrow();

  removeSessionCookies(event.nativeEvent);
  event.locals.auth = UNAUTHORIZED_STATE;

  throw redirect(paths.signIn, { revalidate: getAthleteServerQuery.key });
});
