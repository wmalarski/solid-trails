import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import * as v from "valibot";
import { getTokens, setSessionCookies } from "~/auth/services";
import { paths } from "~/utils/paths";

export async function GET({ request, nativeEvent }: APIEvent) {
  const url = new URL(request.url);

  const parsed = await v.safeParseAsync(
    v.object({ code: v.string(), scope: v.literal("read") }),
    Object.fromEntries(url.searchParams.entries()),
  );

  if (!parsed.success) {
    throw redirect(paths.notFound, { status: 400 });
  }

  const tokens = await getTokens({ code: parsed.output.code });

  setSessionCookies({ event: nativeEvent, tokens });

  return redirect(paths.home);
}
