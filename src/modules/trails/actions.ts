import { query } from "@solidjs/router";
import { getAuthorizedRequestEventOrThrow } from "~/utils/get-request-event-or-throw";
import { fetchAuthorizedStrava } from "~/utils/strava";
import type { Activity } from "./types";

const LIST_ATHLETE_PER_PAGE = 10;

type ListAthleteActivitiesArgs = {
  before?: number;
  after?: number;
  page?: number;
  perPage?: number;
};

export const listAthleteActivitiesServerQuery = query(
  async (args: ListAthleteActivitiesArgs) => {
    "use server";

    const { session } = getAuthorizedRequestEventOrThrow();

    const { perPage: per_page = LIST_ATHLETE_PER_PAGE, ...rest } = args;

    return fetchAuthorizedStrava<Activity[]>({
      accessToken: session.accessToken,
      init: { method: "GET" },
      path: "athlete/activities",
      query: { ...rest, per_page },
    });
  },
  "listAthleteActivities",
);
