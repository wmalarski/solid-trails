import { redirect } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { paths } from "./paths";

export const getRequestEventOrThrow = () => {
  const event = getRequestEvent();

  if (!event) {
    throw redirect(paths.notFound, { status: 500 });
  }

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
