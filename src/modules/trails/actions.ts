import { query } from "@solidjs/router";
import { getAuthorizedRequestEventOrThrow } from "~/utils/get-request-event-or-throw";
import { fetchAuthorizedStrava } from "~/utils/strava";
import type { Activity } from "./types";

type ListAthleteActivitiesArgs = {
  before?: number;
  after?: number;
  page?: number;
  perPage?: number;
};

export const listAthleteActivitiesServerQuery = query(
  async (args: ListAthleteActivitiesArgs) => {
    "use server";

    const { auth } = getAuthorizedRequestEventOrThrow();

    const { perPage: per_page, ...rest } = args;

    return fetchAuthorizedStrava<Activity[]>({
      accessToken: auth.accessToken,
      init: { method: "GET" },
      path: "athlete/activities",
      query: { ...rest, per_page },
    });
  },
  "listAthleteActivities",
);
