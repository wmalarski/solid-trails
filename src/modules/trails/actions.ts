import { query } from "@solidjs/router";
import { getAuthorizedRequestEventOrThrow } from "~/utils/get-request-event-or-throw";
import { fetchAuthorizedStrava } from "~/utils/strava";
import type { Activity, ExtendedActivity, Photo } from "./types";

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

type GetActivityPhotosArgs = {
  activityId: number;
  size: number;
};

export const getActivityPhotosServerQuery = query(
  async (args: GetActivityPhotosArgs) => {
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

type GetActivityArgs = {
  activityId: number;
};

export const getActivityServerQuery = query(async (args: GetActivityArgs) => {
  "use server";

  const { auth } = getAuthorizedRequestEventOrThrow();

  return fetchAuthorizedStrava<ExtendedActivity>({
    accessToken: auth.accessToken,
    init: { method: "GET" },
    path: `activities/${args.activityId}`,
  });
}, "getActivity");
