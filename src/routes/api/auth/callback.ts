import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import * as v from "valibot";
import { STRAVA_SCOPE } from "~/auth/constants";
import { getAuthStateFromTokens, setAuthCookies } from "~/auth/cookies";
import { exchangeCode } from "~/auth/services";
import { paths } from "~/utils/paths";

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);

  const parsed = await v.safeParseAsync(
    v.object({ code: v.string(), scope: v.literal(STRAVA_SCOPE) }),
    Object.fromEntries(url.searchParams.entries()),
  );

  if (!parsed.success) {
    return redirect(paths.error, { status: 400 });
  }

  const tokensResponse = await exchangeCode(parsed.output);

  if (!tokensResponse.success) {
    return redirect(paths.error, { status: 400 });
  }

  const authState = getAuthStateFromTokens(tokensResponse.data);
  setAuthCookies(event.nativeEvent, { authState, tokens: tokensResponse.data });
  event.locals.auth = authState;

  return redirect(paths.home);
}
