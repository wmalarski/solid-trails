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
  const session = event.locals.session;

  if (!session) {
    throw redirect(paths.signIn, { status: 401 });
  }

  return { event, session };
};
