import { action, query, redirect } from "@solidjs/router";
import { decode } from "decode-formdata";
import * as v from "valibot";
import { getRequestEventOrThrow } from "~/utils/get-request-event-or-throw";
import { paths } from "~/utils/paths";
import {
  rpcErrorResult,
  rpcHandleError,
  rpcParseIssueResult,
} from "~/utils/rpc";

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

export const signInServerAction = action(async (form: FormData) => {
  "use server";

  const parsed = await v.safeParseAsync(
    v.object({
      email: v.pipe(v.string(), v.email()),
      password: v.pipe(v.string(), v.minLength(3)),
    }),
    decode(form),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const event = getRequestEventOrThrow();

  let headers: Headers;

  try {
    const response = await event.locals.auth.api.signInEmail({
      body: parsed.output,
      returnHeaders: true,
    });

    headers = response.headers;
    event.locals.user = response.response.user;
  } catch (error) {
    return rpcHandleError(error);
  }

  throw redirect(paths.home, {
    headers,
    revalidate: [getUserServerQuery.key, getAnonServerQuery.key],
  });
});

export const signOutServerAction = action(async () => {
  "use server";

  const event = getRequestEventOrThrow();

  let headers: Headers;

  try {
    const response = await event.locals.auth.api.signOut({
      headers: event.request.headers,
      returnHeaders: true,
    });

    if (!response.response.success) {
      return rpcErrorResult({ message: "Something went wrong" });
    }

    headers = response.headers;
    event.locals.user = null;
  } catch (error) {
    return rpcHandleError(error);
  }

  throw redirect(paths.signIn, {
    headers,
    revalidate: [getUserServerQuery.key, getAnonServerQuery.key],
  });
});
