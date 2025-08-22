import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import * as v from "valibot";
import { exchangeCode, setSessionCookies } from "~/auth/services";
import { getAthleteServerQuery } from "~/modules/auth/actions";
import { paths } from "~/utils/paths";

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);

  console.log("[callback]", { url });

  const parsed = await v.safeParseAsync(
    v.object({ code: v.string(), scope: v.literal("read") }),
    Object.fromEntries(url.searchParams.entries()),
  );

  console.log("[callback]", { parsed });

  if (!parsed.success) {
    return redirect(paths.notFound, { status: 400 });
  }

  const tokens = await exchangeCode(parsed.output);

  console.log("[callback]", { tokens });

  const session = setSessionCookies(event.nativeEvent, tokens);

  console.log("[callback]", { session });

  event.locals.session = session;

  // return new Response(null, {
  //   headers
  // })
  const response = redirect(paths.home, {
    revalidate: getAthleteServerQuery.key,
  });

  console.log("[callback]", { response });

  return response;
}
