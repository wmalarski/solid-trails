import { redirect } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { paths } from "./paths";

export const getRequestEventOrThrow = () => {
  console.log("[getRequestEventOrThrow-1]");
  const event = getRequestEvent();
  console.log("[getRequestEventOrThrow-2]");

  if (!event) {
    console.log("[getRequestEventOrThrow-3]");
    throw redirect(paths.notFound, { status: 500 });
  }
  console.log("[getRequestEventOrThrow-4]");
  return event;
};

export const getAuthorizedRequestEventOrThrow = () => {
  const event = getRequestEventOrThrow();
  const auth = event.locals.auth;

  if (!auth?.authorized) {
    throw redirect(paths.signIn, { status: 401 });
  }

  return { auth, event };
};
