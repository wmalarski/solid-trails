import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import * as v from "valibot";
import { exchangeCode, setSessionCookies } from "~/auth/services";
import { getAthleteServerQuery } from "~/modules/auth/actions";
import { paths } from "~/utils/paths";

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);

  const parsed = await v.safeParseAsync(
    v.object({ code: v.string(), scope: v.literal("read") }),
    Object.fromEntries(url.searchParams.entries()),
  );

  if (!parsed.success) {
    // error page
    return redirect(paths.notFound, { status: 400 });
  }

  const tokensResponse = await exchangeCode(parsed.output);

  if (!tokensResponse.success) {
    // error page
    return redirect(paths.notFound, { status: 400 });
  }

  const session = setSessionCookies(event.nativeEvent, tokensResponse.data);

  event.locals.session = session;

  return redirect(paths.home, { revalidate: getAthleteServerQuery.key });
}
