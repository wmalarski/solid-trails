import {
  queryOptions,
  experimental_streamedQuery as streamedQuery,
} from "@tanstack/solid-query";
import { throwOnRpcError } from "~/integrations/strava/throw-on-rpc-error";
import {
  getActivityPhotosServerQuery,
  getAthleteServerQuery,
  listAthleteActivitiesServerQuery,
} from "./actions";
import type { Activity } from "./types";

const LIST_ATHLETE_PER_PAGE = 30;

const NOT_MUTABLE_OPTIONS = {
  gcTime: Number.POSITIVE_INFINITY,
  staleTime: Number.POSITIVE_INFINITY,
};

const fetchDataInChunks = () => {
  return {
    async *[Symbol.asyncIterator]() {
      let page = 1;
      let isFinished = false;

      while (!isFinished) {
        const response = await listAthleteActivitiesServerQuery({
          page,
          perPage: LIST_ATHLETE_PER_PAGE,
        });

        if (!response.success) {
          return;
        }

        const activities = response.data.filter((activity) =>
          Boolean(activity.map),
        );

        yield activities;

        if (response.data.length < LIST_ATHLETE_PER_PAGE) {
          isFinished = true;
        }

        page += 1;
      }
    },
  };
};

export const listAthleteActivitiesQueryOptions = () => {
  return queryOptions({
    ...NOT_MUTABLE_OPTIONS,
    queryFn: streamedQuery({
      streamFn: fetchDataInChunks,
    }),
    queryKey: ["listAthleteActivities"],
    select: (data: Activity[][]) => data.flat(),
  });
};

type GetActivityPhotosQueryOptionsArgs = {
  activityId: number;
  size: number;
};

export const getActivityPhotosQueryOptions = (
  args: GetActivityPhotosQueryOptionsArgs,
) => {
  return queryOptions({
    ...NOT_MUTABLE_OPTIONS,
    queryFn: async (context) => {
      const response = await getActivityPhotosServerQuery(context.queryKey[1]);
      return throwOnRpcError(response);
    },
    queryKey: ["getActivityPhotos", args] as const,
  });
};

export const getAthleteQueryOptions = () => {
  return queryOptions({
    ...NOT_MUTABLE_OPTIONS,
    queryFn: async () => {
      const response = await getAthleteServerQuery();
      return throwOnRpcError(response);
    },
    queryKey: ["getAthlete"],
  });
};
