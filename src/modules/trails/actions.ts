import { query } from "@solidjs/router";
import { fetchAuthorizedStrava } from "~/integrations/strava/api";
import type { Activity, Athlete, Photo } from "~/integrations/strava/types";
import { getAuthorizedRequestEventOrThrow } from "~/utils/get-request-event-or-throw";

type ListAthleteActivitiesArgs = {
  before?: number;
  after?: number;
  page?: number;
  perPage?: number;
};

export const listAthleteActivitiesServerQuery = query(
  (args: ListAthleteActivitiesArgs) => {
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

type GetActivityPhotosArgs = {
  activityId: number;
  size: number;
};

export const getActivityPhotosServerQuery = query(
  (args: GetActivityPhotosArgs) => {
    "use server";

    const { auth } = getAuthorizedRequestEventOrThrow();

    return fetchAuthorizedStrava<Photo[]>({
      accessToken: auth.accessToken,
      init: { method: "GET" },
      path: `activities/${args.activityId}/photos`,
      query: { size: args.size },
    });
  },
  "getActivityPhotos",
);

export const getAthleteServerQuery = query(() => {
  "use server";

  const { auth } = getAuthorizedRequestEventOrThrow();

  return fetchAuthorizedStrava<Athlete>({
    accessToken: auth.accessToken,
    init: { method: "GET" },
    path: "athlete",
  });
}, "getAthlete");
